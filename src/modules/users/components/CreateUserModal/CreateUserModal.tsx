import { ApplicationSelect, RoleSelectField } from "@/modules/common/components";
import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateUserForm } from "../../hooks/useCreateUserForm/useCreateUserForm";

interface CreateUserModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ opened, onClose }: CreateUserModalProps) => {
  const { t } = useTranslation("users");
  const { form, onSubmit, isLoading } = useCreateUserForm(onClose);
  const applicationId = form.watch("applicationId");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("createTitle", "Create user")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.email", "Email")}
                {...field}
                error={form.formState.errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <PasswordInput
                label={t("createPassword", "Password")}
                {...field}
                error={form.formState.errors.password?.message}
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
                onChange={(value) => {
                  field.onChange(value);
                  form.setValue("roleIds", []);
                }}
                error={form.formState.errors.applicationId?.message}
              />
            )}
          />
          <Controller
            name="roleIds"
            control={form.control}
            render={({ field }) => (
              <RoleSelectField
                multiple
                applicationId={applicationId || undefined}
                disabled={!applicationId}
                label={t("master.roles", "Roles")}
                {...field}
                error={form.formState.errors.roleIds?.message}
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
