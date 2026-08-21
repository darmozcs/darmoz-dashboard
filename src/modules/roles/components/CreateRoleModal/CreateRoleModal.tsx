import { ApplicationSelect } from "@/modules/common/components";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateRoleForm } from "../../hooks/useCreateRoleForm/useCreateRoleForm";

interface CreateRoleModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateRoleModal = ({ opened, onClose }: CreateRoleModalProps) => {
  const { t } = useTranslation("roles");
  const { form, onSubmit, isLoading } = useCreateRoleForm(onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("createTitle", "Create role")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.name", "Name")}
                placeholder="ROLE_NAME"
                {...field}
                error={form.formState.errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.description", "Description")}
                {...field}
                error={form.formState.errors.description?.message}
              />
            )}
          />
          <Controller
            name="applicationId"
            control={form.control}
            render={({ field }) => (
              <ApplicationSelect
                label={t("master.application", "Application")}
                {...field}
                error={form.formState.errors.applicationId?.message}
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
