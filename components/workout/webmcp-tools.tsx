"use client";
import { useEffect } from "react";

type ModelContext = { registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> };

export function WebMcpTools() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "complete_today_workout",
      title: "Concluir treino de hoje",
      description: "Marca o treino do dia 12 como concluído neste dispositivo.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) { if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).length) throw new Error("Este comando não aceita parâmetros."); localStorage.setItem("samora-workout:day-12", "done"); window.dispatchEvent(new StorageEvent("storage", { key: "samora-workout:day-12", newValue: "done" })); return { day: 12, status: "completed" }; },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);
  return null;
}
