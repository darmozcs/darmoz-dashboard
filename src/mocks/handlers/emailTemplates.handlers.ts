import { config } from "@/config";
import { MAIL_TEMPLATES_PATH } from "@/DAL/const";
import type { EmailTemplate } from "@/models";
import { http, HttpResponse } from "msw";
import { MOCK_EMAIL_TEMPLATES } from "../data/emailTemplates";

const API_URL = config.VITE_API_BASE_URL || "";

let nextId = MOCK_EMAIL_TEMPLATES.length + 1;

export const emailTemplateHandlers = [
  http.get(`${API_URL}${MAIL_TEMPLATES_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const activeParam = url.searchParams.get("active");
    let results = MOCK_EMAIL_TEMPLATES;
    if (activeParam !== null) {
      results = results.filter((t) => t.active === (activeParam === "true"));
    }
    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${MAIL_TEMPLATES_PATH}`, async ({ request }) => {
    const body = (await request.json()) as Omit<
      EmailTemplate,
      "id" | "createdAt" | "updatedAt"
    >;
    const code = body.code.toUpperCase();

    if (MOCK_EMAIL_TEMPLATES.some((t) => t.code === code)) {
      return HttpResponse.json(
        { title: "Conflict", status: 409, detail: `Ya existe un template con codigo ${code}` },
        { status: 409 },
      );
    }

    const now = new Date().toISOString();
    const created: EmailTemplate = {
      ...body,
      code,
      id: nextId++,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_EMAIL_TEMPLATES.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put(`${API_URL}${MAIL_TEMPLATES_PATH}/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<
      EmailTemplate,
      "id" | "createdAt" | "updatedAt"
    >;
    const template = MOCK_EMAIL_TEMPLATES.find((t) => t.id === id);
    if (!template) {
      return HttpResponse.json(
        { title: "Not Found", status: 404, detail: `No existe un template con id ${id}` },
        { status: 404 },
      );
    }
    const code = body.code.toUpperCase();
    if (MOCK_EMAIL_TEMPLATES.some((t) => t.code === code && t.id !== id)) {
      return HttpResponse.json(
        { title: "Conflict", status: 409, detail: `Ya existe un template con codigo ${code}` },
        { status: 409 },
      );
    }
    Object.assign(template, body, { code, updatedAt: new Date().toISOString() });
    return HttpResponse.json(template);
  }),

  http.delete(`${API_URL}${MAIL_TEMPLATES_PATH}/:id`, ({ params }) => {
    const id = Number(params.id);
    const index = MOCK_EMAIL_TEMPLATES.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { title: "Not Found", status: 404, detail: `No existe un template con id ${id}` },
        { status: 404 },
      );
    }
    MOCK_EMAIL_TEMPLATES.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
