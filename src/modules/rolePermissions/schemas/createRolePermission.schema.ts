import * as yup from "yup";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export const createRolePermissionSchema = yup.object({
  roleId: yup.string().required("Role is required"),
  service: yup.string().required("Service is required"),
  httpMethod: yup
    .string()
    .oneOf(HTTP_METHODS, "Invalid method")
    .required("Method is required"),
  endpointPattern: yup.string().required("Endpoint pattern is required"),
});

export type CreateRolePermissionFormData = yup.InferType<
  typeof createRolePermissionSchema
>;
