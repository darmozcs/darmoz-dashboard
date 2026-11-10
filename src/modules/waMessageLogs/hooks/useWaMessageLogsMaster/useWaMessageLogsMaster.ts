import { useWaMessageLogsQuery, useWaPhoneNumbersQuery } from "@/DAL";
import type { WaMessageDirection, WaMessageLog, WaMessageStatus } from "@/models";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { PAGE_SIZE } from "../../const/waMessageLogs.const";

export const useWaMessageLogsMaster = () => {
  const [page, setPage] = useState(1);
  const [phoneNumberId, setPhoneNumberId] = useState<string | null>(null);
  const [direction, setDirection] = useState<WaMessageDirection | null>(null);
  const [status, setStatus] = useState<WaMessageStatus | null>(null);
  const [contact, setContact] = useState("");
  const [debouncedContact] = useDebouncedValue(contact.trim(), 400);
  const [selected, setSelected] = useState<WaMessageLog | null>(null);

  const logs = useWaMessageLogsQuery({
    page: page - 1,
    size: PAGE_SIZE,
    phoneNumberId: phoneNumberId ?? undefined,
    direction: direction ?? undefined,
    status: status ?? undefined,
    contact: debouncedContact || undefined,
  });
  const phoneNumbers = useWaPhoneNumbersQuery();

  const phoneOptions = (phoneNumbers.data?.data ?? []).map((phone) => ({
    value: phone.id,
    label: phone.displayNumber ?? phone.phoneNumberId,
  }));
  const numberLabels = new Map(phoneOptions.map((option) => [option.value, option.label]));

  // Cada cambio de filtro vuelve a la primera página.
  const withPageReset =
    <T>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return {
    records: logs.data?.data.content ?? [],
    totalRecords: logs.data?.data.totalElements ?? 0,
    isLoading: logs.isLoading,
    page,
    setPage,
    phoneOptions,
    phoneNumberId,
    setPhoneNumberId: withPageReset(setPhoneNumberId),
    direction,
    setDirection: withPageReset(setDirection),
    status,
    setStatus: withPageReset(setStatus),
    contact,
    setContact: withPageReset((value: string) => setContact(value.replace(/[^0-9]/g, ""))),
    numberLabel: (id: string | null) => (id ? (numberLabels.get(id) ?? "—") : "—"),
    selected,
    setSelected,
  };
};

export type WaMessageLogsMaster = ReturnType<typeof useWaMessageLogsMaster>;
