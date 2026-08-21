import { useMailClientApplicationsQuery } from "@/DAL";
import { Select, type SelectProps } from "@mantine/core";

type MailClientApplicationSelectProps = Omit<SelectProps, "data"> & {
  activeOnly?: boolean;
};

export const MailClientApplicationSelect = ({
  activeOnly,
  ...props
}: MailClientApplicationSelectProps) => {
  const { data, isLoading } = useMailClientApplicationsQuery(
    activeOnly ? { active: true } : {},
  );
  const applications = data?.data ?? [];

  return (
    <Select
      data={applications.map((application) => ({
        value: application.id,
        label: application.name,
      }))}
      disabled={isLoading}
      searchable
      {...props}
    />
  );
};
