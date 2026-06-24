import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User, UserLoginInput, UserLoginInputSchema } from "../schemas/User";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { Button, Checkbox, Input } from "antd";

export default function LoginUser() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(UserLoginInputSchema),
    defaultValues: { remember_me: false },
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: UserLoginInput) => loginUser(data),
    onSuccess: (data: User) => {
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
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div
          style={{
            marginTop: "12px",
          }}
        >
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Password" />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div style={{ marginTop: "12px", marginBottom: "12px" }}>
          <Controller
            name="remember_me"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Remember me
              </Checkbox>
            )}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={status === "loading"}
          disabled={status === "loading"}
        >
          Login
        </Button>

        {status === "success" && <p>Logged in successfully</p>}
        {status === "error" && <p>Could not log in</p>}
        <p>
          Don't have an account? <Link to="/register">Sign up</Link> instead
        </p>
      </form>
    </div>
  );
}
