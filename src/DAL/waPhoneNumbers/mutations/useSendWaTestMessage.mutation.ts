import { useMutation } from "@tanstack/react-query";
import { sendWaTestMessageService } from "../services/waPhoneNumber.service";

export const useSendWaTestMessageMutation = () =>
  useMutation({
    mutationFn: sendWaTestMessageService,
  });
