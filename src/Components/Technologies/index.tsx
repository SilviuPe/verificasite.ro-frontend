import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import TechnologiesIcon from '../../assets/icon-technology.svg';

const Technologies = ({ data }: { data: AnalyzeResponse }) => {

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
            row_type: !data.tech?.google_analytics_detected && !data.tech?.google_tag_manager_detected && !data.tech?.jquery_detected ? 'error' : 'success',
            key_: 'Analytics',
            value: <>
                {
                    data.tech
                        ? <div style={{textAlign: 'start', display: 'flex'}}>
                            {data.tech?.google_analytics_detected ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Analytics</p> : null}
                            {data.tech?.google_tag_manager_detected ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>Google Manager</p> : null}
                            {data.tech?.jquery_detected ? <p style={{margin: 5, padding: '0.75rem 1.25rem', border: '1px solid gray', borderRadius: '10px'}}>jQuery JavaScript library</p> : null}
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Adresa IP nu a putut fi identificata.</p>
                        </div>
                }</>,
            info: "Analytics reprezinta procesul de colectare, masurare si analiza a datelor despre comportamentul utilizatorilor pe un site, oferind informatii despre trafic, surse, interactiuni si performanta, pentru optimizarea conversiilor."
        },
        {
            row_type: data.ssl_ok ? 'success' : 'error',
            key_: 'Certificat securitate SSL',
            value: <>
                {
                    data.ssl_ok
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Site-ul contine un certificat SSL.</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Nu - site-ul nu contine un certificat SSL.</p>
                        </div>
                }</>,
            info: "Certificatul SSL este o dovadă a faptului că datele utilizatorilor sunt protejate atunci când aceștia accesează site-ul și că există un nivel de securitate crescut împotriva atacurilor cibernetice. Certificatul SSL întărește încrederea utilizatorilor în site și în companie."
        },
        {
            row_type: data.tech?.wordpress?.is_wordpress ? 'success' : 'error',
            key_: 'Wordpress',
            value: <>
                {
                    data.tech?.wordpress?.is_wordpress
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Site-ul este construit folosind Wordpress ({data.tech?.wordpress?.version ? `Versiunea: ${data.tech?.wordpress?.version}` : "Versiune nedetectată"}).</p>
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