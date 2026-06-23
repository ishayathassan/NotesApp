from datetime import datetime, timedelta, timezone
from typing import Optional
import os
import jwt
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
ALGORITHM = "HS256"

SHORT_EXPIRY = timedelta(hours=24)
LONG_EXPIRY = timedelta(days=30)


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
