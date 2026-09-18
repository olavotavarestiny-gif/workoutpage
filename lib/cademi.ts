"use client";
import { useSearchParams } from "next/navigation";
import { appConfig } from "./config";
export function useCademiUser() { const params = useSearchParams(); const fullName = params.get("cuser_name") || appConfig.defaults.fullName; return { id: params.get("cuser_id") || "demo", firstName: params.get("cuser_fname") || fullName.split(" ")[0] || appConfig.defaults.firstName, fullName, avatar: safeImageUrl(params.get("cuser_avatar")) }; }
export function currentQuery() { return ""; }
function safeImageUrl(value: string | null) { if (!value) return ""; try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.toString() : ""; } catch { return ""; } }
