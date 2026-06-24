import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  UserInfo,
  UserLoginInput,
  UserLoginInputSchema,
} from "../schemas/User";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/user";
import { useAuth } from "../context/AuthContext";

export default function LoginUser() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(UserLoginInputSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: UserLoginInput) => loginUser(data),
    onSuccess: (data: UserInfo) => {
      login(data);
      navigate("/");
    },
  });

  const onSubmit = (user: UserLoginInput) => {
    mutate(user);
  };
  return (
    <div>
      <h1>Login </h1>
      <form
        onSubmit={handleSubmit(onSubmit, (errs) =>
          console.log("Validation failed:", errs),
        )}
      >
        <div
          style={{
            marginTop: "12px",
          }}
        >
          <label htmlFor="">Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div
          style={{
            marginTop: "12px",
          }}
        >
          <label htmlFor="">Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div style={{ marginTop: "12px" }}>
          <label htmlFor="">Remember me</label>
          <input type="checkbox" {...register("remember_me")} />
        </div>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Logging in" : "Login"}
        </button>
        {status === "success" && <p>Logged in successfully</p>}
        {status === "error" && <p>Could not log in</p>}
      </form>
    </div>
  );
}
