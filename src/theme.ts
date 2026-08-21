import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#f6eeff",
      "#e7d9f7",
      "#cab1ea",
      "#ad86dd",
      "#9462d2",
      "#854bcb",
      "#7d3fc9",
      "#6b31b2",
      "#5f2ba0",
      "#52238d",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",

  components: {
    Title: {
      styles: {
        root: {
          color: "var(--mantine-primary-color-9)",
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: "sm",
      },
    },
    Card: {
      defaultProps: {
        radius: "sm",
      },
    },
    Button: {
      defaultProps: {
        radius: "sm",
        size: "md",
      },
    },
    BaseInput: {
      defaultProps: {
        radius: "sm",
        size: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "sm",

        size: "md",
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: "sm",

        size: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        size: "md",
      },
    },
    ActionIcon: {
      defaultProps: {
        size: "md",
      },
    },
    Select: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    MultiSelect: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    Textarea: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    Switch: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    Radio: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    DatePickerInput: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
    DateTimePicker: {
      defaultProps: {
        size: "md",
        radius: "sm",
      },
    },
  },
});
