import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import UsabilityIcon from '../../assets/icon-utilizabilitate.svg';

const Usability = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.seo.favicon?.has_declared_icon ? 'success' : 'error',
            key_: 'Favicon',
            value: <>
                {
                    data.seo.favicon?.has_declared_icon
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Website-ul analizat are un Favicon setat.</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Website-ul analizat nu are un Favicon setat.</p>
                        </div>
                }</>,
            info: "Favicon este iconița care apare în tab-ul browser-ului de internet, atunci când un utilizator accesează site-ul. Favicon-ul este de obicei logo-ul și întărește imaginea brand-ului și a companiei în conștiința utilizatorului."
        },
        {
            row_type: data.seo.custom_404?.has_404 ? 'success' : 'error',
            key_: 'Pagina 404 personalizată',
            value: <>
                {
                    data.seo.favicon?.has_declared_icon
                        ? <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Super, website-ul analizat are o pagină 404 personalizată.</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Website-ul analizat nu are o pagină 404 personalizată.</p>
                        </div>
                }</>,
            info: "O pagină 404 personalizată elimină confuzia utilizatorului atunci când întâmpină o eroare la accesarea site-ului. În funcție de cauză, URL greșit, pagina este temporar indisponibilă pentru update sau pagina nu mai există, o pagină 404 personalizată poate fi folosită cu scopul de a redirecționa utilizatorii."
        },
    ]

    return (
        <AuditSection title="USABILITY" image={UsabilityIcon} rows={rows}/>
    );
};

export {Usability};