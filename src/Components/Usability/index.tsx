import type {defaultDataPropsI} from "../../api.ts";
import UsabilityIcon from "../../assets/UsabilityIcon.svg";
import SuccesIcon from "../../assets/SuccesIcon.svg";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import {PopupInfo} from "../PopupInfo";
import "../../Styles/Usability.css";

const Usability = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="usability-component">
            <div className="usability-row-container header-title">
                <img src={UsabilityIcon} alt=""/>
                <h2>Usability</h2>
            </div>
            <div className="usability-row-container">
                <div className="usability-box-container" style={{flex: 1}}>
                    <img src={  data?.seo?.favicon ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color:  data?.seo?.favicon ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Favicon</p>
                        <PopupInfo title="Favicon" text="Favicon este iconița care apare în tab-ul browser-ului de internet, atunci când un utilizator accesează site-ul. Favicon-ul este de obicei logo-ul și întărește imaginea brand-ului și a companiei în conștiința utilizatorului."/>
                    </div>
                    <div className="favicon-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.favicon ? "Website-ul analizat are un Favicon setat." : "Website-ul analizat nu are un Favicon setat."}</p>
                    </div>
                </div>
                <div className="usability-box-container" style={{flex: 1}}>
                    <img src={data?.seo?.custom_404 ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.social?.opengraph?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Pagina 404 personalizată</p>
                        <PopupInfo title="Pagina 404 personalizată" text="O pagină 404 personalizată elimină confuzia utilizatorului atunci când întâmpină o eroare la accesarea site-ului. În funcție de cauză, URL greșit, pagina este temporar indisponibilă pentru update sau pagina nu mai există, o pagină 404 personalizată poate fi folosită cu scopul de a redirecționa utilizatorii."/>
                    </div>
                    <div className="404-custom-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{
                            data?.seo?.custom_404 ? "Super, website-ul analizat are o pagină 404 personalizată." : "Website-ul analizat nu are o pagină 404 personalizată."
                        }</p>
                    </div>
                </div>
                <div className="usability-box-container" style={{flex: 1}}>
                    <img src={data?.social?.language?.detected ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.social?.language?.detected ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Limba</p>
                        <PopupInfo title="Limba" text="Este esențial ca site-ul să fie configurat și scris în cel puțin 2 limbi, cea nativă și o limbă străină. Astfel se cresc șansele de atracție a clienților potențiali și extindere a activității companiei pe plan internațional."/>
                    </div>
                    <div className="language-info" style={{display: "flex", flexDirection: "row", gap: "var(--spacing-sm)"}}>
                        {
                            data?.social?.language?.detected
                            ? <p style={{color: "var(--input-text-color)", border: "1px solid var(--border-box-gray-color)", borderRadius: "var(--spacing-sm)", padding: "var(--spacing-sm)"}}>{data?.social?.language?.language}</p>
                                : "Nu a fost detectata limba."
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Usability};