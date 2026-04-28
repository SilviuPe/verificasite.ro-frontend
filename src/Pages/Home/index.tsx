import {useEffect, useRef, useState} from 'react';
import {CustomBox, AuditResult} from '../../Components';
import "../../Styles/home.css";
import type {homePropsI} from './types.ts';
import Logo from "../../assets/Logo.svg";
import GlobeIcon from "../../assets/GlobeIcon.svg";
import {analyzeWebsite} from '../../api.ts';
import type { AnalyzeResponse} from "../../api.ts";
import "../../Styles/header.css";

const Home = (props: homePropsI) => {
    const {title} = props;

    useEffect(() => {
        document.title = title || "Home";
    }, [title]);

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);


    const onStart = async () => {
        // setError(null);
        setResult(null);

        const trimmed = url.trim();
        if (!trimmed) {
            // setError("Introdu link-ul website-ului tau.");
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
            // setError(null);
        } catch (e: any) {
            if (e?.name === "AbortError") return;
            // setError(e?.message || "A aparut o eroare la analizare.");
        } finally {
            setLoading(false);
        }
    };


    return (<>
        <CustomBox content={
            <div className="header-component">
                <div style={{color:"black"}}>
                    <img src={Logo} width="150px" alt="logo"/>
                </div>
                <div className="input-container">
                    <div className="input-wrapper">
                        <img src={GlobeIcon} alt="globe" className="icon" />
                        <input type="text" className="input" onChange={(e) => setUrl(e.target.value)} value={url} />
                    </div>
                    <button onClick={onStart} disabled={loading}>Analizează acum!</button>
                </div>
            </div>
        }/>
        <AuditResult data={result}/>
    </>);
};

export { Home };
