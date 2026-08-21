import { USER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserService } from "../services/user.service";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_LIST] });
    },
  });
};
