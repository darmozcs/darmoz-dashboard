import type { WaNodeType } from "@/models";
import {
  IconArrowsSplit,
  IconCornerDownRight,
  IconFlag,
  IconHeadset,
  IconList,
  IconMessage,
  IconQuestionMark,
  IconSquareRoundedCheck,
  IconVariable,
  IconWorldUpload,
  type Icon,
} from "@tabler/icons-react";

interface NodeTypeDefinition {
  icon: Icon;
  color: string;
  defaultData: () => Record<string, unknown>;
}

export const NODE_TYPES: Record<WaNodeType, NodeTypeDefinition> = {
  message: { icon: IconMessage, color: "blue", defaultData: () => ({ text: "" }) },
  buttons: {
    icon: IconSquareRoundedCheck,
    color: "teal",
    defaultData: () => ({ text: "", buttons: [{ id: newOptionId(), title: "" }] }),
  },
  list: {
    icon: IconList,
    color: "cyan",
    defaultData: () => ({
      text: "",
      buttonText: "",
      sections: [{ title: "", rows: [{ id: newOptionId(), title: "" }] }],
    }),
  },
  question: {
    icon: IconQuestionMark,
    color: "violet",
    defaultData: () => ({ text: "", saveAs: "", validation: "text" }),
  },
  condition: {
    icon: IconArrowsSplit,
    color: "orange",
    defaultData: () => ({
      rules: [{ id: newOptionId(), variable: "", operator: "eq", value: "" }],
    }),
  },
  http: {
    icon: IconWorldUpload,
    color: "grape",
    defaultData: () => ({ method: "GET", path: "/", saveAs: "api" }),
  },
  set_variable: {
    icon: IconVariable,
    color: "gray",
    defaultData: () => ({ variable: "", value: "" }),
  },
  goto_flow: { icon: IconCornerDownRight, color: "indigo", defaultData: () => ({}) },
  handoff: { icon: IconHeadset, color: "pink", defaultData: () => ({ text: "" }) },
  end: { icon: IconFlag, color: "red", defaultData: () => ({ text: "" }) },
};

export const NODE_TYPE_ORDER = Object.keys(NODE_TYPES) as WaNodeType[];

export const HANDLES = {
  NEXT: "next",
  INVALID: "invalid",
  ELSE: "else",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const LIMITS = {
  BUTTONS: 3,
  BUTTON_TITLE: 20,
  LIST_ROWS: 10,
  ROW_TITLE: 24,
  ROW_DESCRIPTION: 72,
  INTERACTIVE_TEXT: 1024,
  TEXT: 4096,
} as const;

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
export const QUESTION_VALIDATIONS = ["text", "email", "number", "regex"] as const;
export const CONDITION_OPERATORS = [
  "eq",
  "neq",
  "contains",
  "regex",
  "gt",
  "lt",
  "exists",
  "not_exists",
] as const;
export const OPERATORS_WITHOUT_VALUE: string[] = ["exists", "not_exists"];
export const MEDIA_TYPES = ["none", "image", "document"] as const;

export const NODE_SPACING = 60;

// Se pasan como valores de interpolación: escritos en el JSON de traducciones,
// i18next los tomaría como variables propias.
export const VARIABLE_EXAMPLES = {
  contactName: "{{contact.name}}",
  contactPhone: "{{contact.waId}}",
  botVariable: "{{bot.clave}}",
  savedVariable: "{{api.total}}",
} as const;

export function newOptionId(): string {
  return `opt_${Math.random().toString(36).slice(2, 8)}`;
}
