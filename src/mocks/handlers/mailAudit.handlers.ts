import { config } from "@/config";
import { MAIL_AUDIT_LOGS_PATH } from "@/DAL/const";
import { http, HttpResponse } from "msw";
import { MOCK_MAIL_AUDIT_LOGS } from "../data/mailAuditLogs";

const API_URL = config.VITE_API_BASE_URL || "";

export const mailAuditHandlers = [
  http.get(`${API_URL}${MAIL_AUDIT_LOGS_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const recipient = url.searchParams.get("recipient")?.toLowerCase();
    const clientId = url.searchParams.get("clientId");
    const accion = url.searchParams.get("accion")?.toLowerCase();

    let results = MOCK_MAIL_AUDIT_LOGS;
    if (recipient) {
      results = results.filter((l) => l.recipient.toLowerCase().includes(recipient));
    }
    if (clientId) {
      results = results.filter((l) => l.clientId === clientId);
    }
    if (accion) {
      results = results.filter((l) => l.accion?.toLowerCase().includes(accion));
    }

    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${MAIL_AUDIT_LOGS_PATH}/:id/resend`, ({ params }) => {
    const id = Number(params.id);
    const log = MOCK_MAIL_AUDIT_LOGS.find((l) => l.id === id);
    if (!log) {
      return HttpResponse.json(
        { title: "Not Found", status: 404, detail: `No existe un registro de auditoria con id ${id}` },
        { status: 404 },
      );
    }
    if (!log.resendable) {
      return HttpResponse.json(
        {
          title: "Conflict",
          status: 409,
          detail: `El registro de auditoria ${id} no tiene contenido guardado para reenviar`,
        },
        { status: 409 },
      );
    }
    return new HttpResponse(null, { status: 200 });
  }),
];
