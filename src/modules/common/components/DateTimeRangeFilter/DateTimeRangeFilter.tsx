import { Group } from "@mantine/core";
import { DateTimePicker, type DateTimePickerProps } from "@mantine/dates";

interface DateTimeRangeFilterProps {
  from: string | null;
  to: string | null;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  fromProps?: Partial<DateTimePickerProps>;
  toProps?: Partial<DateTimePickerProps>;
}

export const DateTimeRangeFilter = ({
  from,
  to,
  onFromChange,
  onToChange,
  fromPlaceholder,
  toPlaceholder,
  fromProps,
  toProps,
}: DateTimeRangeFilterProps) => {
  return (
    <Group wrap="wrap" gap="sm">
      <DateTimePicker
        placeholder={fromPlaceholder}
        value={from}
        onChange={onFromChange}
        clearable
        w={200}
        {...fromProps}
      />
      <DateTimePicker
        placeholder={toPlaceholder}
        value={to}
        onChange={onToChange}
        clearable
        w={200}
        {...toProps}
      />
    </Group>
  );
};
