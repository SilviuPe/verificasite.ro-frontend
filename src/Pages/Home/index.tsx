import { useEffect, useRef, useState } from "react";
import type { homePropsI } from "./types";
import searchIcon from "../../assets/search-icon.svg";
import "../../Styles/home.css";

import { WebsiteReport, Footer } from "../../Components";
import { analyzeWebsite } from "../../api";
import type { AnalyzeResponse } from "../../api";

const Home = (props: homePropsI) => {
    const { title } = props;

    const [url, setUrl] = useState("");
    const [agreed, setAgreed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);

    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        document.title = title || "Home";
    }, [title]);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);

    const onStart = async () => {
        setError(null);
        setResult(null);

        if (!agreed) {
            setError("Trebuie sa fii de acord cu Termeni si conditiile.");
            return;
        }

        const trimmed = url.trim();
        if (!trimmed) {
            setError("Introdu link-ul website-ului tau.");
            return;
        }

        // opreste requestul anterior daca exista
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        try {
            const data = await analyzeWebsite(trimmed, controller.signal);
            setResult(data);
            setError(null);
        } catch (e: any) {
            if (e?.name === "AbortError") return;
            setError(e?.message || "A aparut o eroare la analizare.");
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") onStart();
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="logo-container">
                    <img
                        alt="logo"
                        src="/full_logo.svg"
                        width="300"
                        height="120"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                </div>

                <div className="title-container">
                    <h1>DIAGNOSTIC WEBSITE</h1>
                </div>

                <div className="tool-container">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="introdu link-ul website-ului tau"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={onKeyDown}
                            disabled={loading}
                        />

                        <button onClick={onStart} disabled={loading}>
                            {loading ? "ANALIZEZ..." : "START DIAGNOSTIC"}
                            <img alt="search icon" src={searchIcon} />
                        </button>
                    </div>

                    <div className="agreement-input-container">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            disabled={loading}
                        />
                        <a href="/termeni-si-conditii">Sunt de acord cu Termeni si conditiile</a>
                    </div>

                    {error && <div className="feedback error">{error}</div>}
                </div>

                {/* Zona de continut dintre tool si footer:
            - daca NU ai rezultat: spatiu alb
            - daca ai rezultat: raportul ocupa spatiul */}
                {result ? (
                    <div className="report-wrapper">
                        <WebsiteReport data={result} />
                    </div>
                ) : (
                    <div className="page-spacer" />
                )}
            </div>

            {/* Footer afara din page-content ca sa stea jos natural */}
            <Footer />
        </div>
    );
};

export { Home };
