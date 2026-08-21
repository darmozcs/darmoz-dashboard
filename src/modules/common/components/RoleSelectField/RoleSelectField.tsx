import { useRolesQuery } from "@/DAL";
import {
  MultiSelect,
  Select,
  type MultiSelectProps,
  type SelectProps,
} from "@mantine/core";

interface RoleSelectFieldBaseProps {
  applicationId?: string;
  showApplication?: boolean;
}

type SingleProps = RoleSelectFieldBaseProps &
  Omit<SelectProps, "data"> & { multiple?: false };

type MultiProps = RoleSelectFieldBaseProps &
  Omit<MultiSelectProps, "data"> & { multiple: true };

type RoleSelectFieldProps = SingleProps | MultiProps;

// Value is always the role id: Users assigns roles by name and
// Role-Permissions references roles by id, so each consumer resolves
// the id back to whatever shape its own endpoint needs at submit time.
export const RoleSelectField = ({
  applicationId,
  showApplication,
  multiple,
  ...props
}: RoleSelectFieldProps) => {
  const { data, isLoading } = useRolesQuery();
  const roles = data?.data ?? [];
  const filteredRoles = applicationId
    ? roles.filter((role) => role.applicationId === applicationId)
    : roles;

  const options = filteredRoles.map((role) => ({
    value: role.id,
    label: showApplication
      ? `${role.applicationName} / ${role.name}`
      : role.name,
  }));

  if (multiple) {
    return (
      <MultiSelect
        data={options}
        disabled={isLoading}
        searchable
        {...(props as Omit<MultiSelectProps, "data">)}
      />
    );
  }

  return (
    <Select
      data={options}
      disabled={isLoading}
      searchable
      {...(props as Omit<SelectProps, "data">)}
    />
  );
};
