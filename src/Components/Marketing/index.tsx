import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import MarketingIcon from '../../assets/icon-marketing.svg';


const Marketing = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.tech?.facebook_pixel.present ? 'success' : 'error',
            key_: 'Pixelul Facebook',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.tech?.facebook_pixel.present
                        ? <p style={{margin: 5}}>Pixelul Facebook este instalat.</p>
                        :  <p style={{margin: 5}}>Pixelul Facebook nu este instalat.</p>
                }
            </div>,
            info: "Pixelul Facebook garantează că reclamele din cadrul platformei sunt văzute de persoanele care au cea mai mare probabilitate să devină clienți ai companiei. Acest lucru vă permite creșteți rata de conversie a reclamelor Facebook."
        },
        {
            row_type: data.tech?.google_tag_manager_detected ? 'success' : 'error',
            key_: 'Google Tag Manager',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.tech?.google_tag_manager_detected
                        ? <p style={{margin: 5}}>Google Tag Manager este instalat.</p>
                        :  <p style={{margin: 5}}>Google Tag Manager nu este instalat.</p>
                }
            </div>,
            info: "Google Tag Manager este un sistem gratuit de gestionare a etichetelor (tag) care vă permite să gestionați și să implementați etichete de marketing (fragmente de cod sau pixeli de urmărire) pe site-ul companiei fără a fi nevoie să modificați codul."
        },
        {
            row_type: data.tech?.google_analytics_detected ? 'success' : 'error',
            key_: 'Google Analytics',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.tech?.google_analytics_detected
                        ? <p style={{margin: 5}}>Google Analytics este instalat.</p>
                        :  <p style={{margin: 5}}>Google Analytics nu este instalat.</p>
                }
            </div>,
            info: "Google Analytics permite monitorizarea și analiza traficului de pe site. Vă oferă o cantitate enormă de informații despre cine sunt cei care vă vizitează site-ul, ce caută și cum ajung să acceseze site-ul. Generează rapoarte de date care îți permit să crești rata de conversie pe site."
        },
    ]

    return <AuditSection title="MARKETING" image={MarketingIcon} rows={rows}/>;
};

export {Marketing};