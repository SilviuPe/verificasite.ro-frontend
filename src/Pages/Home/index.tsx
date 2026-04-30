import {useEffect, useRef, useState} from 'react';
import {CustomBox, AuditResult, Footer} from '../../Components';
import "../../Styles/home.css";
import type {homePropsI} from './types.ts';
import Logo from "../../assets/Logo.svg";
import GlobeIcon from "../../assets/GlobeIcon.svg";
import {analyzeWebsite} from '../../api.ts';
import type { AnalyzeResponse} from "../../api.ts";
import "../../Styles/header.css";
import {PulseLoading} from "../../Components/PulseLoading";


const Home = (props: homePropsI) => {
    const {title} = props;

    useEffect(() => {
        document.title = title || "Home";
    }, [title]);
    const [agreed, setAgreed] = useState<boolean | null>(null);
    const [urlError, setUrlError] = useState<boolean | null>(null);
    const [agreedError, setAgreedError] = useState<boolean | null>(false);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);


    const onStart = async () => {
        setResult(null);

        const trimmed = url.trim();

        if (!agreed) {
            setAgreedError(true);
            return;
        }

        if (!trimmed) {
            return;
        }

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        try {
            const data = await analyzeWebsite(trimmed, controller.signal);
            setResult(data);
        } catch (e: any) {
            if (e?.name === "AbortError") return;
            setUrlError(true);
        } finally {
            setLoading(false);
        }
    };


    return (<div style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
        <CustomBox pulse={false} content={
            <div className="header-component">
                <div style={{color:"black"}}>
                    <img src={Logo} width="150px" alt="logo"/>
                </div>
                <div className="input-container">
                    <div className="input-wrapper">
                        <img src={GlobeIcon} alt="globe" className="icon" />
                        <input type="text" style={{color: urlError === true ? "var(--red-accent-color)" : "var(--input-text-color)"}} className="url-input" onChange={(e) => {
                            setUrl(e.target.value);
                            setUrlError(false);
                        }} value={url} />
                    </div>
                    <div className="agreement-input-container">
                        <input
                            type="checkbox"
                            checked={agreed === true}
                            onChange={(e) => {
                                setAgreed(e.target.checked)
                                setAgreedError(false);
                            }}
                            disabled={loading}
                        />
                        <a href="/termeni-si-conditii" style={{color: agreedError ? "var(--red-accent-color)" : ""}}>Sunt de acord cu Termeni si conditiile</a>
                    </div>
                    <button onClick={onStart} disabled={loading}>Analizează acum!</button>
                </div>
            </div>
        }/>
        {
            result ? <AuditResult data={result}/> : loading ? <PulseLoading/> : <div style={{backgroundColor: "var(--box-color)", width: "100%", height: "70vh", borderRadius: "var(--spacing-sm)"}}></div>
        }
        <Footer/>
    </div>);
};

export { Home };
