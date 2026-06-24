from datetime import datetime, timedelta, timezone
from typing import Optional
import os
import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
ALGORITHM = "HS256"

SHORT_EXPIRY = timedelta(hours=24)
LONG_EXPIRY = timedelta(days=30)

_bearer = HTTPBearer()


def create_token(user_id: int, remember_me: bool) -> tuple[str, int]:
    expiry = LONG_EXPIRY if remember_me else SHORT_EXPIRY
    expire = datetime.now(timezone.utc) + expiry
    payload = {"sub": str(user_id), "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token, int(expiry.total_seconds())


def decode_token(token: str) -> Optional[int]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload["sub"])
    except jwt.PyJWTError:
        return None


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(_bearer)) -> int:
    user_id = decode_token(credentials.credentials)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_id
