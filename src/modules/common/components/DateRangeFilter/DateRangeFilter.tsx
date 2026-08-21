import { Group } from "@mantine/core";
import { DatePickerInput, type DatePickerInputProps } from "@mantine/dates";

interface DateRangeFilterProps {
  from: string | null;
  to: string | null;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  fromProps?: Partial<DatePickerInputProps>;
  toProps?: Partial<DatePickerInputProps>;
}

export const DateRangeFilter = ({
  from,
  to,
  onFromChange,
  onToChange,
  fromPlaceholder,
  toPlaceholder,
  fromProps,
  toProps,
}: DateRangeFilterProps) => {
  return (
    <Group wrap="wrap" gap="sm">
      <DatePickerInput
        placeholder={fromPlaceholder}
        value={from}
        onChange={onFromChange}
        clearable
        w={160}
        {...fromProps}
      />
      <DatePickerInput
        placeholder={toPlaceholder}
        value={to}
        onChange={onToChange}
        clearable
        w={160}
        {...toProps}
      />
    </Group>
  );
};
