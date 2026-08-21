import { modals } from "@mantine/modals";

interface ConfirmDeleteOptions {
  title: string;
  message: string;
  onConfirm: () => void;
}

export const confirmDelete = ({
  title,
  message,
  onConfirm,
}: ConfirmDeleteOptions) => {
  modals.openConfirmModal({
    title,
    children: message,
    confirmProps: { color: "red" },
    onConfirm,
  });
};
