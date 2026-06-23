import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateInput, UserCreateInputSchema } from "../schemas/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateInput>({
    resolver: zodResolver(UserCreateInputSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: UserCreateInput) => createUser(data),
    onSuccess: () => {},
  });

  const onSubmit = (user: UserCreateInput) => {
    mutate(user);
    navigate("/login");
  };

  return (
    <div>
      <h1>Register </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Submit"}
        </button>
        {status === "success" && <p>User Created successfully</p>}
        {status === "error" && <p>Could not create user</p>}
      </form>
    </div>
  );
}
