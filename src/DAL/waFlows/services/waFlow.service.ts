import {
  WA_FLOWS_PATH,
  WA_FLOW_ACTION_PATH,
  WA_FLOW_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type {
  WaFlow,
  WaFlowDefinition,
  WaFlowIssue,
  WaFlowSummary,
} from "@/models";
import type { AxiosResponse } from "axios";

interface FlowRef {
  botId: string;
  flowId: string;
}

export interface WaFlowPublishResult {
  flow: WaFlow;
  warnings: WaFlowIssue[];
}

export const getWaFlowsService = async (
  botId: string,
): Promise<AxiosResponse<WaFlowSummary[]>> =>
  await httpClient.get<WaFlowSummary[]>(WA_FLOWS_PATH({ botId }));

export const getWaFlowService = async (
  ref: FlowRef,
): Promise<AxiosResponse<WaFlow>> =>
  await httpClient.get<WaFlow>(WA_FLOW_DETAIL_PATH(ref));

export const createWaFlowService = async ({
  botId,
  name,
}: {
  botId: string;
  name: string;
}): Promise<AxiosResponse<WaFlow>> =>
  await httpClient.post<WaFlow>(WA_FLOWS_PATH({ botId }), { name });

export const renameWaFlowService = async ({
  name,
  ...ref
}: FlowRef & { name: string }): Promise<AxiosResponse<WaFlow>> =>
  await httpClient.patch<WaFlow>(WA_FLOW_DETAIL_PATH(ref), { name });

export const saveWaFlowDraftService = async ({
  definition,
  ...ref
}: FlowRef & { definition: WaFlowDefinition }): Promise<
  AxiosResponse<WaFlow>
> =>
  await httpClient.put<WaFlow>(
    WA_FLOW_ACTION_PATH({ ...ref, action: "draft" }),
    { definition },
  );

export const validateWaFlowService = async (
  ref: FlowRef,
): Promise<AxiosResponse<WaFlowIssue[]>> =>
  await httpClient.post<WaFlowIssue[]>(
    WA_FLOW_ACTION_PATH({ ...ref, action: "validate" }),
  );

// 422 con { errors: WaFlowIssue[] } si el flujo no se puede publicar.
export const publishWaFlowService = async (
  ref: FlowRef,
): Promise<AxiosResponse<WaFlowPublishResult>> =>
  await httpClient.post<WaFlowPublishResult>(
    WA_FLOW_ACTION_PATH({ ...ref, action: "publish" }),
  );

export const deleteWaFlowService = async (
  ref: FlowRef,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(WA_FLOW_DETAIL_PATH(ref));
