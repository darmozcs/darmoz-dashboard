import { config } from "@/config";
import "@mantine/core/styles.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "mantine-datatable/styles.layer.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, basepath: import.meta.env.BASE_URL });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (import.meta.env.MODE !== "development" || !config.VITE_ENABLE_MOCKS) {
    return;
  }
  const { startMocking } = await import("./mocks");
  return startMocking();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
