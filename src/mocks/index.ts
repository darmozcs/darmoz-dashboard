export async function startMocking() {
  const { worker } = await import("./browser");
  console.log("[MSW] Starting worker...");
  return worker.start({ onUnhandledRequest: "warn" });
}
