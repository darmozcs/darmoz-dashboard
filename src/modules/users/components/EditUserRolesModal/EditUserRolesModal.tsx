import type { User } from "@/models";
import { RoleSelectField } from "@/modules/common/components";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditUserRolesForm } from "../../hooks/useEditUserRolesForm/useEditUserRolesForm";

interface EditUserRolesModalProps {
  user: User | null;
  onClose: () => void;
}

export const EditUserRolesModal = ({
  user,
  onClose,
}: EditUserRolesModalProps) => {
  const { t } = useTranslation("users");
  const { form, onSubmit, isLoading } = useEditUserRolesForm(user, onClose);

  return (
    <Modal
      opened={user !== null}
      onClose={onClose}
      title={t("editRolesTitle", "Edit roles")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {user?.email}
          </Text>
          <Controller
            name="roleIds"
            control={form.control}
            render={({ field }) => (
              <RoleSelectField
                multiple
                applicationId={user?.applicationId}
                label={t("master.roles", "Roles")}
                {...field}
                error={form.formState.errors.roleIds?.message}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("editRolesSave", "Save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
