import { config } from "@/config";
import { MAIL_SCHEDULED_EMAILS_PATH } from "@/DAL/const";
import type { ScheduledEmail } from "@/models";
import { http, HttpResponse } from "msw";
import { MOCK_SCHEDULED_EMAILS } from "../data/scheduledEmails";

const API_URL = config.VITE_API_BASE_URL || "";

let nextId = MOCK_SCHEDULED_EMAILS.length + 1;

export const scheduledEmailHandlers = [
  http.get(`${API_URL}${MAIL_SCHEDULED_EMAILS_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    let results = MOCK_SCHEDULED_EMAILS;
    if (status) {
      results = results.filter((e) => e.status === status);
    }
    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${MAIL_SCHEDULED_EMAILS_PATH}`, async ({ request }) => {
    const body = (await request.json()) as {
      recipient: string;
      subject?: string;
      templateCode?: string;
      variables?: Record<string, string>;
      bodyOverride?: string;
      scheduledAt: string;
      clientId: string;
    };

    if (!body.templateCode && !body.bodyOverride) {
      return HttpResponse.json(
        { title: "Bad Request", status: 400, detail: "Debe indicarse 'templateCode' o 'bodyOverride'" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const created: ScheduledEmail = {
      id: nextId++,
      recipient: body.recipient,
      subject: body.subject ?? null,
      templateCode: body.templateCode ?? null,
      variables: body.variables ?? {},
      bodyOverride: body.bodyOverride ?? null,
      scheduledAt: body.scheduledAt,
      status: "PENDING",
      attempts: 0,
      lastError: null,
      sentAt: null,
      clientId: body.clientId,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_SCHEDULED_EMAILS.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put(
    `${API_URL}${MAIL_SCHEDULED_EMAILS_PATH}/:id`,
    async ({ params, request }) => {
      const id = Number(params.id);
      const scheduledEmail = MOCK_SCHEDULED_EMAILS.find((e) => e.id === id);
      if (!scheduledEmail) {
        return HttpResponse.json(
          { title: "Not Found", status: 404, detail: `No existe un correo agendado con id ${id}` },
          { status: 404 },
        );
      }
      if (scheduledEmail.status !== "PENDING") {
        return HttpResponse.json(
          {
            title: "Conflict",
            status: 409,
            detail: `El correo agendado ${id} no se puede modificar, su estado actual es ${scheduledEmail.status}`,
          },
          { status: 409 },
        );
      }
      const body = (await request.json()) as {
        recipient: string;
        subject?: string;
        templateCode?: string;
        variables?: Record<string, string>;
        bodyOverride?: string;
        scheduledAt: string;
        clientId: string;
      };
      Object.assign(scheduledEmail, {
        recipient: body.recipient,
        subject: body.subject ?? null,
        templateCode: body.templateCode ?? null,
        variables: body.variables ?? {},
        bodyOverride: body.bodyOverride ?? null,
        scheduledAt: body.scheduledAt,
        clientId: body.clientId,
        updatedAt: new Date().toISOString(),
      });
      return HttpResponse.json(scheduledEmail);
    },
  ),

  http.delete(`${API_URL}${MAIL_SCHEDULED_EMAILS_PATH}/:id`, ({ params }) => {
    const id = Number(params.id);
    const scheduledEmail = MOCK_SCHEDULED_EMAILS.find((e) => e.id === id);
    if (!scheduledEmail) {
      return HttpResponse.json(
        { title: "Not Found", status: 404, detail: `No existe un correo agendado con id ${id}` },
        { status: 404 },
      );
    }
    if (scheduledEmail.status === "SENT") {
      return HttpResponse.json(
        {
          title: "Conflict",
          status: 409,
          detail: `El correo agendado ${id} no se puede modificar, su estado actual es SENT`,
        },
        { status: 409 },
      );
    }
    scheduledEmail.status = "CANCELLED";
    scheduledEmail.updatedAt = new Date().toISOString();
    return new HttpResponse(null, { status: 204 });
  }),
];
