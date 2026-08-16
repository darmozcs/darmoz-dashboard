import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginFormData } from "../../schemas/login.schema";
import classes from "./LoginForm.module.css";

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export const LoginForm = ({ form, onSubmit, isLoading }: LoginFormProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Darmoz admin
        </Title>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label={t("login.email")}
              placeholder={t("login.emailPlaceholder")}
              {...form.register("email")}
              error={form.formState.errors.email?.message}
            />
            <PasswordInput
              label={t("login.password")}
              placeholder={t("login.passwordPlaceholder")}
              {...form.register("password")}
              error={form.formState.errors.password?.message}
            />
            <Button type="submit" fullWidth loading={isLoading}>
              {t("login.submit")}
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
