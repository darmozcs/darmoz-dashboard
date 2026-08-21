import { RoleSelectField } from "@/modules/common/components";
import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateRolePermissionForm } from "../../hooks/useCreateRolePermissionForm/useCreateRolePermissionForm";

const HTTP_METHOD_OPTIONS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

interface CreateRolePermissionModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateRolePermissionModal = ({
  opened,
  onClose,
}: CreateRolePermissionModalProps) => {
  const { t } = useTranslation("permissions");
  const { form, onSubmit, isLoading } = useCreateRolePermissionForm(onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("createTitle", "Create permission")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="roleId"
            control={form.control}
            render={({ field }) => (
              <RoleSelectField
                showApplication
                label={t("master.role", "Role")}
                {...field}
                error={form.formState.errors.roleId?.message}
              />
            )}
          />
          <Controller
            name="service"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.service", "Service")}
                {...field}
                error={form.formState.errors.service?.message}
              />
            )}
          />
          <Controller
            name="httpMethod"
            control={form.control}
            render={({ field }) => (
              <Select
                label={t("master.httpMethod", "Method")}
                data={HTTP_METHOD_OPTIONS}
                {...field}
                error={form.formState.errors.httpMethod?.message}
              />
            )}
          />
          <Controller
            name="endpointPattern"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.endpointPattern", "Endpoint pattern")}
                placeholder="/api/products/**"
                {...field}
                error={form.formState.errors.endpointPattern?.message}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("createSave", "Create")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
