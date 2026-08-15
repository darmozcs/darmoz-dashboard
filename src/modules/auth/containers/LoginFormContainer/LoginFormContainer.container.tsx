import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useLoginForm } from "../../hooks/useLoginForm/useLoginForm";

export const LoginFormContainer = () => {
  const { form, onSubmit, isLoading } = useLoginForm();

  return <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
};
