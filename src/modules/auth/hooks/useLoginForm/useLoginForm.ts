import { useLoginMutation } from "@/DAL/auth";
import { applySuperGatedSession } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../schemas/login.schema";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          if (applySuperGatedSession(response.data)) {
            navigate({ to: "/dashboard" });
          }
        },
        onError: (error: unknown) => {
          const message =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Login failed";
          notifications.show({
            color: "red",
            title: "Error",
            message,
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: loginMutation.isPending,
  };
};
