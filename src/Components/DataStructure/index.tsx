import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import DataStructureImg from '../../assets/icon-structured.svg';


const DataStructure = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.structured_data?.schema_org?.formats?.detected?.json_ld || data.structured_data?.schema_org?.formats?.detected?.microdata || data.structured_data?.schema_org?.formats?.detected?.rdfa ? 'success' : 'error',
            key_: 'Schema.org',
            value: <>
                {
                    data.structured_data?.schema_org?.formats?.detected?.json_ld || data.structured_data?.schema_org?.formats?.detected?.microdata || data.structured_data?.schema_org?.formats?.detected?.rdfa ?
                        <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Schema.org găsit. Format: <b>{data.structured_data?.schema_org?.formats?.detected?.json_ld ? 'JSON_LD' : data.structured_data?.schema_org?.formats?.detected?.microdata ? 'MicroData' : data.structured_data?.schema_org?.formats?.detected?.rdfa ? "RDFA" : null }</b></p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Schema.org nu a fost găsit.</p>
                        </div>

                }</>,
            info: "Marcajul Schema.org, este o formă de microdata ce generează o descriere îmbunătățită care apare în rezultatele căutării în Google. Lipsa marcajului pe site determină o poziție slabă în clasamentul Google."
        },
        {
            row_type: data.social?.opengraph?.present ? 'success' : 'error',
            key_: 'OpenGraph Protocol',
            value: <>
                {
                    data.social?.opengraph?.present
                        ? <div style={{textAlign: 'start'}}>

                            <p style={{margin: 5}}>Open Graph este prezent pe pagina web analizată.</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Nu am detectat tag-uri Open Graph pe pagina web analizată.</p>
                        </div>
                }</>,
            info: "OpenGraph Protocol presupune un grup de tag-uri care favorizează distribuirea site-ului pe platformele de social media, precum Facebook sau Linkedin. Tag-urile OpenGraph permit rețelelor sociale să afișeze o previzualizare eficientă a conținutului site-ului."
        },
    ]

    return (
        <AuditSection title="DATE STRUCTURATE" image={DataStructureImg} rows={rows}/>
    );
};

export {DataStructure};