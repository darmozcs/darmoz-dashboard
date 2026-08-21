import { config } from "@/config";
import { MAIL_CLIENT_APPLICATIONS_PATH } from "@/DAL/const";
import type { MailClientApplication } from "@/models";
import { http, HttpResponse } from "msw";
import { MOCK_MAIL_CLIENT_APPLICATIONS } from "../data/mailClientApplications";

const API_URL = config.VITE_API_BASE_URL || "";

export const mailClientApplicationHandlers = [
  http.get(`${API_URL}${MAIL_CLIENT_APPLICATIONS_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const activeParam = url.searchParams.get("active");
    let results = MOCK_MAIL_CLIENT_APPLICATIONS;
    if (activeParam !== null) {
      results = results.filter((a) => a.active === (activeParam === "true"));
    }
    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${MAIL_CLIENT_APPLICATIONS_PATH}`, async ({ request }) => {
    const body = (await request.json()) as { name: string; active?: boolean };
    const now = new Date().toISOString();
    const created: MailClientApplication = {
      id: crypto.randomUUID(),
      name: body.name,
      active: body.active ?? true,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_MAIL_CLIENT_APPLICATIONS.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(
    `${API_URL}${MAIL_CLIENT_APPLICATIONS_PATH}/:id`,
    async ({ params, request }) => {
      const body = (await request.json()) as {
        name?: string;
        active?: boolean;
      };
      const application = MOCK_MAIL_CLIENT_APPLICATIONS.find(
        (a) => a.id === params.id,
      );
      if (!application) {
        return HttpResponse.json(
          { title: "Not Found", status: 404, detail: `No existe una aplicacion con id ${params.id}` },
          { status: 404 },
        );
      }
      if (body.name !== undefined) application.name = body.name;
      if (body.active !== undefined) application.active = body.active;
      application.updatedAt = new Date().toISOString();
      return HttpResponse.json(application);
    },
  ),

  http.delete(`${API_URL}${MAIL_CLIENT_APPLICATIONS_PATH}/:id`, ({ params }) => {
    const index = MOCK_MAIL_CLIENT_APPLICATIONS.findIndex(
      (a) => a.id === params.id,
    );
    if (index === -1) {
      return HttpResponse.json(
        { title: "Not Found", status: 404, detail: `No existe una aplicacion con id ${params.id}` },
        { status: 404 },
      );
    }
    MOCK_MAIL_CLIENT_APPLICATIONS.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
