import { USER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserService } from "../services/user.service";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_LIST] });
    },
  });
};
