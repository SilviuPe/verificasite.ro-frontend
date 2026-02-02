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
    ]

    return <AuditSection title="SOCIAL MEDIA" image={SocialMediaIcon} rows={rows}/>;
};

export {SocialMedia};