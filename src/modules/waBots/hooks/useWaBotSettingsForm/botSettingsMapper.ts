import type { SaveWaBotPayload } from "@/DAL";
import type { WaBot, WaWeekDay } from "@/models";
import {
  DEFAULT_OPEN_FROM,
  DEFAULT_OPEN_TO,
  DEFAULT_TIMEZONE,
  WEEK_DAYS,
  WORKING_DAYS,
} from "../../const/waBots.const";
import type { WaBotSettingsFormData } from "../../schemas/waBot.schema";

// El backend guarda varios rangos por día; el formulario edita uno por día.
export const toSettingsForm = (bot: WaBot | undefined): WaBotSettingsFormData => {
  const hours = bot?.businessHours;
  return {
    name: bot?.name ?? "",
    applicationId: bot?.applicationId ?? "",
    active: bot?.active ?? true,
    entryFlowId: bot?.entryFlowId ?? null,
    fallbackMessage: bot?.fallbackMessage ?? "",
    sessionTimeoutMinutes: bot?.sessionTimeoutMinutes ?? 60,
    businessHoursEnabled: hours != null,
    timezone: hours?.timezone ?? DEFAULT_TIMEZONE,
    days: WEEK_DAYS.map((day) => {
      const range = hours?.days[day]?.[0];
      return {
        day,
        enabled: hours ? range !== undefined : WORKING_DAYS.includes(day),
        from: range?.from ?? DEFAULT_OPEN_FROM,
        to: range?.to ?? DEFAULT_OPEN_TO,
      };
    }),
    outOfHoursMessage: bot?.outOfHoursMessage ?? "",
    variables: Object.entries(bot?.staticVariables ?? {}).map(([key, value]) => ({
      key,
      value,
    })),
  };
};

export const toSavePayload = (data: WaBotSettingsFormData): SaveWaBotPayload => ({
  name: data.name,
  applicationId: data.applicationId,
  active: data.active,
  entryFlowId: data.entryFlowId || null,
  fallbackMessage: data.fallbackMessage || null,
  sessionTimeoutMinutes: data.sessionTimeoutMinutes,
  businessHours: data.businessHoursEnabled
    ? {
        timezone: data.timezone,
        days: Object.fromEntries(
          data.days
            .filter((day) => day.enabled)
            .map((day) => [day.day as WaWeekDay, [{ from: day.from, to: day.to }]]),
        ),
      }
    : null,
  outOfHoursMessage: data.outOfHoursMessage || null,
  staticVariables: data.variables.length
    ? Object.fromEntries(data.variables.map(({ key, value }) => [key, value]))
    : null,
});
