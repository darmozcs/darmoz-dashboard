import { USER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserService } from "../services/user.service";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_LIST] });
    },
  });
};
