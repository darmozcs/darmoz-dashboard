import { LogoutButton } from "../../components";
import { useLogoutButton } from "../../hooks";

export const LogoutButtonContainer = () => {
  const { handleLogout } = useLogoutButton();
  return <LogoutButton onClick={handleLogout} />;
};
