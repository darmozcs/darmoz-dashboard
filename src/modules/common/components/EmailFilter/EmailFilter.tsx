import { ActionIcon, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface EmailFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EmailFilter = ({
  value,
  onChange,
  placeholder,
}: EmailFilterProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <TextInput
      placeholder={placeholder}
      leftSection={<IconSearch size={16} />}
      rightSection={
        localValue ? (
          <ActionIcon
            size="sm"
            variant="transparent"
            c="dimmed"
            onClick={() => {
              setLocalValue("");
              onChange("");
            }}
          >
            <IconX size={14} />
          </ActionIcon>
        ) : undefined
      }
      value={localValue}
      onChange={(e) => {
        const newValue = e.currentTarget.value;
        setLocalValue(newValue);
        onChange(newValue);
      }}
    />
  );
};
