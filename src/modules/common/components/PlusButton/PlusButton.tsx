import type { ButtonProps } from "@mantine/core";
import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

interface PlusButtonProps extends ButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const PlusButton = ({
  label,
  onClick,
  disabled,
  variant,
  size,
}: PlusButtonProps) => {
  return (
    <>
      <ActionIcon
        hiddenFrom="md"
        color="green"
        variant={variant}
        size={size}
        disabled={disabled}
        aria-label={label}
        onClick={onClick}
      >
        <IconPlus />
      </ActionIcon>
      <Button
        visibleFrom="md"
        color="green"
        leftSection={<IconPlus />}
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};
