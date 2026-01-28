import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import SocialMediaIcon from '../../assets/icon-social-media.svg';


const SocialMedia = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.social?.profiles?.facebook.present ? 'success' : 'error',
            key_: 'Facebook',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.social?.profiles?.facebook.present
                    ? <a style={{margin: 5}} href={data.social?.profiles.facebook.links[0]}>{data.social?.profiles.facebook.links[0].replace('https://','').replace('www.','')}</a>
                    :  <p style={{margin: 5}}>Pagina de Facebook nu a fost gasită.</p>
                }
            </div>,
            info: "Pagină de Facebook permite configurarea de campanii de reclame pe platforma de social media pentru a ajunge la o plajă mai mare de clienți potențiali. Mai mult, conferă credibilitate utilizatorilor și extinde prezența companiei în mediul online."
        },
        {
            row_type: data.social?.profiles?.instagram.present ? 'success' : 'error',
            key_: 'Instagram',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.social?.profiles?.instagram.present
                        ? <a style={{margin: 5}} href={data.social?.profiles.instagram.links[0]}>{data.social?.profiles.instagram.links[0].replace('https://','').replace('www.','')}</a>
                        :  <p style={{margin: 5}}>Pagina de Instagram nu a fost gasită.</p>
                }
            </div>,
            info: "În funcție de industria în care activează compania, contul de Instagram configurat corespunzător poate fi o modalitate de a genera lead-uri noi prin realizarea de campanii pe platformă."
        },
        {
            row_type: data.screenshots.mobile && data.screenshots.desktop ? 'success' : !data.screenshots.mobile && !data.screenshots.desktop ? 'error' : 'warning',
            key_: 'Limba',
            value: <div style={{textAlign: 'start', display: "flex"}}>
                {
                    data.social?.language?.detected
                        ? <div style={{padding: "0.5rem 1rem", border: "1px solid rgba(0,0,0,0.25)", borderRadius: "10px"}}>
                            <p style={{margin: 5}}>{data.social?.language?.language}</p>
                        </div>
                        :  <p style={{margin: 5}}>Limba website-ului nu a putut fi detectată.</p>
                }
            </div>,
            info: "Este esențial ca site-ul să fie configurat și scris în cel puțin 2 limbi, cea nativă și o limbă străină. Astfel se cresc șansele de atracție a clienților potențiali și extindere a activității companiei pe plan internațional."
        },
    ]

    return <AuditSection title="SOCIAL MEDIA" image={SocialMediaIcon} rows={rows}/>;
};

export {SocialMedia};