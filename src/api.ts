// src/api.ts
export type WordPressInfo = {
    is_wordpress: boolean;
    version: string | null;
    signals: string[];
    version_reason: string | null;
};

export type WordPressPlugin = {
    name: string;
    current_version: string | undefined;
    latest_version: string | undefined;
}

export type AnalyzeResponse = {
    input_url: string;
    normalized_candidates: string[];
    fetched_url: string;
    final_url: string;
    redirect_chain: string[];
    status_code: number;
    ip_address: string | null;
    ssl_ok: boolean;
    screenshots: {
        desktop: string;
        mobile: string;
    };
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

    structured_data?: {
        schema_org : {
            formats: {
                detected: {
                    json_ld: boolean;
                    microdata: boolean;
                    rdfa: boolean;
                };
            }
        }
    }
    social?: {
        opengraph?: {
            present: boolean;
            count?: number;
        },
        profiles?: {
            facebook: {
                present: boolean,
                links: string[],
            },
            instagram: {
                present: boolean,
                links: string[]
            },
        },
        language: {
            detected: boolean,
            language: string,
            language_code: string,
            source: string,
        }
    }
    tech?: {
        google_ads?: boolean;
        google_analytics?: boolean;
        google_tag_manager?: boolean;
        jquery?: boolean;
        google_maps?: boolean;
        google_fonts?: boolean;
        cloudflare: boolean;
        hotjar: boolean;
        rechapta: boolean;
        note?: string;
        wordpress?: WordPressInfo;
        facebook_pixel: {
            present: boolean;
        }
    };
    checks?: {
        ssl_certificate?: {
            common_name?: string;
            issuer?: string;
            present?: boolean;
            raw?: {
                issuer?: {
                    commonName?: string;
                    countryName?: string;
                    organizationName?: string;
                },
                subject?: {
                    commonName?: string;
                }
            },
            valid_to: string;
        }
    };
    plugins?: {
        plugins?: WordPressPlugin[];
    }
};


export type LoginResponse = {
    access_token: string;
    token_type: "bearer";
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function login(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        let msg = `Login failed (${res.status})`;
        try {
            const data = await res.json();
            if (data?.detail) {
                msg = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
            }
        } catch {
            console.log()
        }
        throw new Error(msg);
    }

    const data = (await res.json()) as LoginResponse;
    // salvare token in localStorage
    localStorage.setItem("access_token", data.access_token);
    return data;
}

// Verifica daca userul este logat
export function isLoggedIn(): boolean {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    try {
        // decode simplu fara verificare criptografica
        const payload = JSON.parse(atob(token.split(".")[1]));
        return !!payload.sub; // sub = username
    } catch {
        return false;
    }
}

// optional: functie pentru logout
export function logout() {
    localStorage.removeItem("access_token");
}

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


export async function exportAuditsExcelByIds(ids: number[]) {
    if (!ids || ids.length === 0) return;

    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Nu esti logat");

    // Construim query params din ID-uri
    const params = new URLSearchParams();
    ids.forEach(id => params.append("ids", id.toString()));

    const res = await fetch(`${API_BASE}/export_xlsx?${params.toString()}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || `Request failed (${res.status})`);
    }

    // Preluam blob-ul XLSX
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    // Cream link pentru download
    const a = document.createElement("a");
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "_");
    a.download = `audits_${timestamp}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}


export async function exportAuditsPDFByIds(ids: number[]) {
    if (!ids || ids.length === 0) return;

    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Nu esti logat");

    // Construim query params din ID-uri
    const params = new URLSearchParams();
    ids.forEach(id => params.append("ids", id.toString()));

    const res = await fetch(`${API_BASE}/export_pdf?${params.toString()}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || `Request failed (${res.status})`);
    }

    // Preluam blob-ul XLSX
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    // Cream link pentru download
    const a = document.createElement("a");
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "_");
    a.download = `audits_${timestamp}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}