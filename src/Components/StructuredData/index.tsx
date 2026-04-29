import type {defaultDataPropsI} from "../../api.ts";
import DiagnosticIcon from "../../assets/DiagnosticIcon.svg";
import SuccesIcon from "../../assets/SuccesIcon.svg";
import ErrorIcon from "../../assets/ErrorIcon.svg";

import "../../Styles/StructuredData.css";
import {PopupInfo} from "../PopupInfo";

const StructuredData = (props: defaultDataPropsI) => {
    const {data} = props;

    return (
        <div className="structured-data-component">
            <div className="structured-data-row-container header-title">
                <img src={DiagnosticIcon} alt=""/>
                <h2>Date structurate</h2>
            </div>
            <div className="structured-data-row-container">
                <div className="structured-data-box-container" style={{flex: 1}}>
                    <img src={  data?.structured_data?.schema_org?.formats?.detected?.json_ld ||
                                data?.structured_data?.schema_org?.formats?.detected?.rdfa ||
                                data?.structured_data?.schema_org?.formats?.detected?.microdata ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color:   data?.structured_data?.schema_org?.formats?.detected?.json_ld ||
                                            data?.structured_data?.schema_org?.formats?.detected?.rdfa ||
                                            data?.structured_data?.schema_org?.formats?.detected?.microdata ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Schema.org</p>
                        <PopupInfo title="Schema.org" text="Marcajul Schema.org, este o formă de microdata ce generează o descriere îmbunătățită care apare în rezultatele căutării în Google. Lipsa marcajului pe site determină o poziție slabă în clasamentul Google."/>
                    </div>
                    <div className="sitemap-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.sitemap?.present ? `Schema.org găsit. FORMAT: ${
                            data?.structured_data?.schema_org?.formats?.detected?.json_ld ? "JSON_LD" 
                                : data?.structured_data?.schema_org?.formats?.detected?.rdfa ? "RDFA" 
                                    : data?.structured_data?.schema_org?.formats?.detected?.microdata ? "MicroData" 
                                        : null }` : "Schema.org nu a fost găsit."}</p>
                    </div>
                </div>
                <div className="structured-data-box-container" style={{flex: 1}}>
                    <img src={data?.social?.opengraph?.present ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.social?.opengraph?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>OpenGraph Protocol</p>
                        <PopupInfo title="OpenGraph Protocol" text="OpenGraph Protocol presupune un grup de tag-uri care favorizează distribuirea site-ului pe platformele de social media, precum Facebook sau Linkedin. Tag-urile OpenGraph permit rețelelor sociale să afișeze o previzualizare eficientă a conținutului site-ului."/>
                    </div>
                    <div className="sitemap-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{`Open Graph ${!data?.seo?.sitemap?.present ? "nu" : ""} este prezent pe pagina web analizată.`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { StructuredData };