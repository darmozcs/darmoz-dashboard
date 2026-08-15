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
    Button: {
      defaultProps: {
        size: "md",
      },
    },
  },
});
