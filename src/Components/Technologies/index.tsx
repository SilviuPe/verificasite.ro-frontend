import {useEffect, useState} from "react";

import type {defaultDataPropsI} from "../../api.ts";
import TechIcon from "../../assets/TechIcon.svg";
import SuccesIcon from "../../assets/SuccesIcon.svg";
import WarningIcon from "../../assets/WarningIcon.svg";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import {PopupInfo} from "../PopupInfo";
import "../../Styles/Technologies.css";

const Technologies = (props: defaultDataPropsI) => {

    const {data} = props;

    const [latestWpVersion, setLatestWpVersion] = useState<string | null>(null);
    const [isWpUpToDate, setIsWpUpToDate] = useState<boolean | null>(null);

    const hasOutdatedPlugins = data?.plugins?.plugins?.some(
        plugin => plugin.latest_version !== plugin.current_version
    );

    useEffect(() => {
        const fetchWpVersion = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_WORDPRESS_API_URL);
                const json = await res.json();

                const latest = json?.offers?.[0]?.current;
                setLatestWpVersion(latest);

                const current = data?.tech?.wordpress?.version;

                if (latest && current) {
                    // compara simplă de versiuni
                    const isUpToDate = latest === current;
                    setIsWpUpToDate(isUpToDate);
                }
            } catch (err) {
                console.error("Eroare la fetch WordPress API:", err);
            }
        };

        if (data?.tech?.wordpress?.is_wordpress) {
            fetchWpVersion();
        }
    }, [data]);

    return (
        <div className="tech-component">
            <div className="tech-row-container header-title">
                <img src={TechIcon} alt=""/>
                <h2>Technologii</h2>
            </div>
            <div className="tech-row-container">
                <div className="tech-box-container ip-address" style={{flex: 1}}>
                    <img src={data?.ip_address ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.ip_address ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Adresa IP Server</p>
                        <PopupInfo title="Adresa IP Server" text="O adresă de IP validă este importantă pentru a primi și a trimite informațiile corecte pe internet. Adresa de IP direcționează traficul de internet acolo unde trebuie să ajungă și direcționează e-mailurile către căsuța de e-mail asociată cu site-ul companiei"/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>{data?.ip_address ? data.ip_address : "Adresa IP nu a putut fi identificata."}</p>
                </div>

                <div className="tech-box-container ssl-certificate" style={{flex: 1}}>
                    <img src={data?.checks?.ssl_certificate?.present ? SuccesIcon : ErrorIcon} width={22} alt={'ssl-certificate'}/>
                    <div className="box-title">
                        <p style={{color: data?.checks?.ssl_certificate?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Certificat securitate SSL</p>
                        <PopupInfo title="Certificat securitate SSL" text="Certificatul SSL este o dovadă a faptului că datele utilizatorilor sunt protejate atunci când aceștia accesează site-ul și că există un nivel de securitate crescut împotriva atacurilor cibernetice. Certificatul SSL întărește încrederea utilizatorilor în site și în companie."/>
                    </div>
                    <ul>
                        <li style={{color: "var(--input-text-color)"}}>Domeniu certificat: {data?.checks?.ssl_certificate?.common_name ? data.checks.ssl_certificate.common_name : "nedetectat"}</li>
                        <li style={{color: "var(--input-text-color)"}}>Autoritate emitenta: {data?.checks?.ssl_certificate?.raw?.issuer?.organizationName ? data.checks.ssl_certificate.raw.issuer.organizationName : "nedetectat"}</li>
                        <li style={{color: "var(--input-text-color)"}}>Serie emitent: {data?.checks?.ssl_certificate?.issuer ? data.checks.ssl_certificate.issuer : "nedetectat"}</li>
                    </ul>
                </div>
                <div className="tech-box-container wordpress-check" style={{flex: 1}}>
                    <img src={data?.tech?.wordpress?.is_wordpress ? SuccesIcon : WarningIcon} width={22} alt={'wordpress'}/>
                    <div className="box-title">
                        <p style={{color: data?.tech?.wordpress?.is_wordpress ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Wordpress</p>
                        <PopupInfo title="Wordpress" text="WordPress este un sistem de management al continutului open source, folosit pentru crearea de site uri si magazine online, extensibil prin teme si pluginuri customizabile."/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>
                        {
                            data?.tech?.wordpress?.is_wordpress
                                ? (() => {
                                    const version = data.tech.wordpress.version;

                                    if (!version) {
                                        return "Site-ul este construit folosind Wordpress, dar versiunea nu a fost detectată.";
                                    }

                                    if (isWpUpToDate === null) {
                                        return `Site-ul este construit folosind Wordpress versiunea ${version}. Se verifică dacă este la zi...`;
                                    }

                                    return isWpUpToDate
                                        ? `Site-ul este construit folosind Wordpress si foloseste ultima versiune (${version}) .`
                                        : `Site-ul este construit folosind Wordpress versiunea ${version}, care NU este la zi. Ultima versiune disponibilă este ${latestWpVersion}.`;
                                })()
                                : "Site-ul nu a fost detectat ca fiind construit cu Wordpress."
                        }
                    </p>
                </div>
                <div className="tech-box-container analytics" style={{flex: 1}}>
                    <img src={data?.tech?.wordpress?.is_wordpress ? SuccesIcon : WarningIcon} width={22} alt={'wordpress'}/>
                    <div className="box-title">
                        <p style={{color: data?.tech?.wordpress?.is_wordpress ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Analytics</p>
                        <PopupInfo title="Analytics" text="Analytics reprezinta procesul de colectare, masurare si analiza a datelor despre comportamentul utilizatorilor pe un site, oferind informatii despre trafic, surse, interactiuni si performanta, pentru optimizarea conversiilor."/>
                    </div>
                    <div className="tech-list" style={{display: "flex", flexDirection: "row", gap: "calc(var(--spacing-sm)/4)"}}>
                        <div className="tech-item" style={{display: "flex", flexDirection: "row", gap: "var(--spacing-sm)"}}>
                            {
                                   data?.tech?.google_analytics
                                    ? <p style={{color: "var(--input-text-color)", border: "1px solid var(--border-box-gray-color)", borderRadius: "var(--spacing-sm)", padding: "var(--spacing-sm)"}}>Google Analytics</p>
                                    : null
                            }
                        </div>
                        <div className="tech-item" style={{display: "flex", flexDirection: "row", gap: "var(--spacing-sm)"}}>
                            {
                                data?.tech?.google_ads?.present
                                    ? <p style={{color: "var(--input-text-color)", border: "1px solid var(--border-box-gray-color)", borderRadius: "var(--spacing-sm)", padding: "var(--spacing-sm)"}}>Google Ads</p>
                                    : null
                            }
                        </div>
                        <div className="tech-item" style={{display: "flex", flexDirection: "row", gap: "var(--spacing-sm)"}}>
                            {
                                data?.tech?.jquery
                                    ? <p style={{color: "var(--input-text-color)", border: "1px solid var(--border-box-gray-color)", borderRadius: "var(--spacing-sm)", padding: "var(--spacing-sm)"}}>JQuery</p>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="tech-col-container">
                <img src={hasOutdatedPlugins ? WarningIcon : SuccesIcon} alt={'icon'} width={22}/>
                <div className="box-title">
                    <p style={{color: hasOutdatedPlugins ?  "var(--orange-accent-color)" : "var(--success-title-color)"}}>Plugins</p>
                    <PopupInfo title="Plugins" text="Pluginurile sunt extensii software care adauga functionalitati suplimentare unui website WordPress, fara a fi necesara modificarea codului de baza al platformei. Ele permit extinderea capabilitatilor unui site intr-un mod modular si reutilizabil."/>
                </div>
                <div className="plugins-list">
                    {
                        data?.plugins?.plugins?.map((plugin) => (
                            <div className="plugin-item">
                                <img src={plugin.current_version === plugin.latest_version ? SuccesIcon : WarningIcon} alt={'icon'} width={22}/>
                                <p style={{color: plugin.current_version === plugin.latest_version ? "var(--success-title-color)" : "var(--orange-accent-color)"}}>Plugin Detectat</p>
                                <p style={{color: "var(--input-text-color)"}}><b>{plugin.name},</b> {plugin.current_version === plugin.latest_version ? `versiunea este la zi (${plugin.latest_version})` : `dar versiunea este outdated (ultima versiune fiind ${plugin.latest_version}, iar versiunea curenta ${plugin.current_version}).`}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export {Technologies};