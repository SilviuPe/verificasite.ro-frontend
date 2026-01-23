// src/api.ts
export type WordPressInfo = {
    is_wordpress: boolean;
    version: string | null;
    signals: string[];
    version_reason: string | null;
};

export type AnalyzeResponse = {
    input_url: string;
    normalized_candidates: string[];
    fetched_url: string;
    final_url: string;
    redirect_chain: string[];
    status_code: number;
    ip_address: string | null;
    ssl_ok: boolean;

    seo: {
        title?: { value: string; length: number };
        meta_description?: { value: string; length: number };
        google_snippet_preview?: { title: string; url: string; description: string };
        headings?: Record<string, number>;
        images?: { total: number; missing_alt: number };
        links?: {
            broken_links?: {
                checked: number;
                ok: number;
                broken: number;
                broken_samples: Array<{ url: string; status_code: number | null; error: string | null }>;
                note?: string;
            };
        };
        www_resolve?: Record<string, unknown>;
        robots_txt?: Record<string, unknown>;
        sitemap?: Record<string, unknown>;
        mobile?: Record<string, unknown>;
        favicon?: Record<string, unknown>;
        custom_404?: Record<string, unknown>;
    };

    structured_data?: Record<string, unknown>;
    social?: Record<string, unknown>;
    tech?: {
        google_analytics_detected?: boolean;
        google_tag_manager_detected?: boolean;
        jquery_detected?: boolean;
        note?: string;
        wordpress?: WordPressInfo;
    };
    checks?: Record<string, unknown>;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://51.38.65.188:8000";

export function normalizeWebsiteInput(raw: string): string {
    const s = (raw || "").trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    return `https://${s}`;
}

export async function analyzeWebsite(urlInput: string, signal?: AbortSignal): Promise<AnalyzeResponse> {
    const url = normalizeWebsiteInput(urlInput);
    if (!url) {
        throw new Error("Introdu un URL.");
    }

    const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal,
    });

    if (!res.ok) {
        let msg = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data?.detail) {
                msg = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
            }
        } catch {
            console.error();
        }
        throw new Error(msg);
    }

    return (await res.json()) as AnalyzeResponse;
}
