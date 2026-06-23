import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserLoginInput, UserLoginInputSchema } from "../schemas/User";

export default function LoginUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(UserLoginInputSchema),
  });
  return <div>LoginUser</div>;
}
