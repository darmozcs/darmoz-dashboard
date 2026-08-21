import { useApplicationsQuery } from "@/DAL";
import { Select, type SelectProps } from "@mantine/core";

type ApplicationSelectProps = Omit<SelectProps, "data">;

export const ApplicationSelect = (props: ApplicationSelectProps) => {
  const { data, isLoading } = useApplicationsQuery();
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
