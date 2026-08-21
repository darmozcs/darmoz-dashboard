import { MAIL_TEMPLATES_PATH, MAIL_TEMPLATE_DETAIL_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { EmailTemplate } from "@/models";
import type { AxiosResponse } from "axios";

export interface EmailTemplateFilters {
  active?: boolean;
}

export interface EmailTemplatePayload {
  code: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  active: boolean;
}

export const getEmailTemplatesService = async (
  filters: EmailTemplateFilters = {},
): Promise<AxiosResponse<EmailTemplate[]>> =>
  await httpClient.get<EmailTemplate[]>(MAIL_TEMPLATES_PATH, {
    params: filters,
  });

export const createEmailTemplateService = async (
  payload: EmailTemplatePayload,
): Promise<AxiosResponse<EmailTemplate>> =>
  await httpClient.post<EmailTemplate>(MAIL_TEMPLATES_PATH, payload);

export const updateEmailTemplateService = async ({
  id,
  payload,
}: {
  id: number;
  payload: EmailTemplatePayload;
}): Promise<AxiosResponse<EmailTemplate>> =>
  await httpClient.put<EmailTemplate>(
    MAIL_TEMPLATE_DETAIL_PATH({ id }),
    payload,
  );

export const deleteEmailTemplateService = async (
  id: number,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(MAIL_TEMPLATE_DETAIL_PATH({ id }));
