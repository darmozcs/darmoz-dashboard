import { useLoginMutation } from "@/DAL/auth";
import { useUserStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../schemas/login.schema";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const setUser = useUserStore((s) => s.setUser);

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
          const {
            accessToken,
            refreshToken,
            userId,
            email,
            roles,
            permissions,
          } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setUser({ userId, email, roles, permissions });
          navigate({ to: "/dashboard" });
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
