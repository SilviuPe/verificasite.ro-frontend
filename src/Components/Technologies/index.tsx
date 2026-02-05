import {useState, useEffect} from 'react';

import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import TechnologiesIcon from '../../assets/icon-technology.svg';
import type {TechnologiesStateI} from './types';

const Technologies = ({ data }: { data: AnalyzeResponse }) => {

    const [state, setState] = useState<TechnologiesStateI>({
        last_version_of_wp: undefined
    });
    const fetchLatestWordPressVersion = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WORDPRESS_API_URL}`,);

            if (!res.ok) {
                setState({last_version_of_wp: undefined})
            }

            const data = await res.json();

            if (data && data.offers) {
                const last_version = data.offers[0];
                if (last_version && last_version.version) {
                    setState({last_version_of_wp: last_version.version});
                }
            }
            else {
                setState({last_version_of_wp: undefined})
            }

        } catch (err: unknown) {
            console.error(err);
            setState({last_version_of_wp: undefined})
        }
    }

    useEffect(() => {
        fetchLatestWordPressVersion();
    }, []);

    const check_if_no_tech = () => {
        if (data.tech?.google_analytics) return true;
        if (data.tech?.google_tag_manager) return true;
        if (data.tech?.jquery) return true;
        if (data.tech?.google_maps) return true;
        if (data.tech?.google_fonts) return true;
        if (data.tech?.cloudflare) return true;
        if (data.tech?.hotjar) return true;
        if (data.tech?.rechapta) return true;
        if (data.tech?.google_ads) return true;

        return false;
    }

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.ip_address ? 'success' : 'error',
            key_: 'Adresa IP Server',
            value: <>
                {
                    data.ip_address
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5, fontWeight: 'bold'}}>{data.ip_address}</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Adresa IP nu a putut fi identificata.</p>
                        </div>
                }</>,
            info: "O adresă de IP validă este importantă pentru a primi și a trimite informațiile corecte pe internet. Adresa de IP direcționează traficul de internet acolo unde trebuie să ajungă și direcționează e-mailurile către căsuța de e-mail asociată cu site-ul companiei"
        },
        {
            row_type: check_if_no_tech() ? 'success' : 'error',
            key_: 'Analytics',
            value: <>
                {
                    data.tech
                        ? <div style={{textAlign: 'start', display: 'flex'}}>
                            {data.tech?.google_analytics ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Analytics</p> : null}
                            {data.tech?.google_tag_manager ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Manager</p> : null}
                            {data.tech?.google_maps ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Maps</p> : null}
                            {data.tech?.google_fonts ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Fonts</p> : null}
                            {data.tech?.google_ads ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Ads</p> : null}
                            {data.tech?.jquery ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>jQuery JavaScript</p> : null}
                            {data.tech?.cloudflare ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Cloudflare</p> : null}
                            {data.tech?.hotjar ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Hotjar</p> : null}
                            {data.tech?.rechapta ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>ReChapta</p> : null}
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Nicio technologie nu a fost identificata pe website.</p>
                        </div>
                }</>,
            info: "Analytics reprezinta procesul de colectare, masurare si analiza a datelor despre comportamentul utilizatorilor pe un site, oferind informatii despre trafic, surse, interactiuni si performanta, pentru optimizarea conversiilor."
        },
        {
            row_type: data.checks?.ssl_certificate ? 'success' : 'error',
            key_: 'Certificat securitate SSL',
            value: <>
                {
                    data.checks?.ssl_certificate
                        ? <div style={{textAlign: 'start'}}>
                            <ul>
                                <li><p style={{margin: 5}}>Domeniu certificat: {data.checks?.ssl_certificate?.common_name ? data.checks?.ssl_certificate?.common_name : "neidentificat"}</p></li>
                                <li><p style={{margin: 5}}>Autoritate emitenta: {data.checks?.ssl_certificate?.raw?.issuer?.organizationName ? data.checks?.ssl_certificate?.raw?.issuer?.organizationName : "neidentificat"}</p></li>
                                <li><p style={{margin: 5}}>Serie emitent: {data.checks?.ssl_certificate?.raw?.issuer?.commonName ? data.checks?.ssl_certificate?.raw?.issuer?.commonName : "neidentificat"}</p></li>
                            </ul>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Nu - site-ul nu contine un certificat SSL.</p>
                        </div>
                }</>,
            info: "Certificatul SSL este o dovadă a faptului că datele utilizatorilor sunt protejate atunci când aceștia accesează site-ul și că există un nivel de securitate crescut împotriva atacurilor cibernetice. Certificatul SSL întărește încrederea utilizatorilor în site și în companie."
        },
        {
            row_type: data.tech?.wordpress?.is_wordpress ? data.tech?.wordpress?.version ? data.tech?.wordpress?.version === state.last_version_of_wp ? 'success' : 'error' : 'success' : 'error',
            key_: "Wordpress",
            value: <>
                {
                    data.tech?.wordpress?.is_wordpress
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Site-ul este construit folosind Wordpress {data.tech?.wordpress?.version ? `${data.tech?.wordpress?.version === state.last_version_of_wp ? `si foloseste ultima versiune (${state.last_version_of_wp})` : `dar foloseste versiunea ${data.tech?.wordpress?.version}. Ultima versiune fiind ${state.last_version_of_wp}. Va recomandam sa faceti update in ceea ce priveste versiunea Wordpress-ului.`}` : "(Versiune nedetectată)"}</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Site-ul nu a fost detectat ca folosind Wordpress.</p>
                        </div>
                }</>,
            info: "WordPress este un sistem de management al continutului open source, folosit pentru crearea de site uri si magazine online, extensibil prin teme si pluginuri customizabile."
        },
    ]

    return (
        <AuditSection title="TEHNOLOGII" image={TechnologiesIcon} rows={rows}/>
    );
};

export {Technologies};