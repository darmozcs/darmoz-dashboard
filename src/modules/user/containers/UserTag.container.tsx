import { useUserStore } from "@/store";
import { UserTag } from "../components";

export const UserTagContainer = () => {
  const { email, roles } = useUserStore();
  return <UserTag email={email} roles={roles} />;
};
