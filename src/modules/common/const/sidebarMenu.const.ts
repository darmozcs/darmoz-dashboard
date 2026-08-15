const HOVER_TRANSITION = "all 150ms ease";

const COMMON_NAVBAR_LINK_STYLES = {
  transition: HOVER_TRANSITION,
};

export const NAVBAR_LINK_ROOT_STYLES = {
  ...COMMON_NAVBAR_LINK_STYLES,
  color: "white",
  // "&[data-active]": {
  //   backgroundColor: "var(--mantine-color-red-6)",
  // },
  "&:hover": {
    backgroundColor: "var(--mantine-color-primary-6)",
  },
};

export const NAVBAR_LINK_PARENT_ROOT_STYLES = {
  ...COMMON_NAVBAR_LINK_STYLES,
  // "&[data-active]": {
  //   backgroundColor: "var(--mantine-color-red-6)",
  //   color: "white",
  // },
  // "&:hover": {},
};
