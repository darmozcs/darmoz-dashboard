export interface EmailTemplate {
  id: number;
  code: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
