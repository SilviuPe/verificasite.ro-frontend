import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import Compatibility from '../../assets/compatibility.svg';


const MobileAndBrowser = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.screenshots.mobile && data.screenshots.desktop ? 'success' : !data.screenshots.mobile && !data.screenshots.desktop ? 'error' : 'warning',
            key_: 'Test de compatibilitate cu dispozitivele mobile',
            value: <></>,
            info: "Este esențial ca site-ul să fie optimizat pentru dispozitivele mobile pentru a permite utilizatorilor să se conecteze de oriunde. În 2021, conform datelor statistice, peste 90% din utilizatori au folosit dispozitive mobile (smartphone și tabletă) pentru a se conecta la internet."
        },
    ]

    return (
        <>
            <AuditSection title="TEST MOBILE & Browser" image={Compatibility} rows={rows}/>
            <div className='screenshots-preview-container'>
                <img src={`data:image/png;base64,${data.screenshots.mobile}`} alt={'mobile'} width={'30%'} style={{padding: '1rem', border: '1px solid rgba(0,0,0,0.25)', borderRadius: '10px'}}/>
                <img src={`data:image/png;base64,${data.screenshots.desktop}`} alt={'desktop'} width={'60%'} style={{padding: '1rem', border: '1px solid rgba(0,0,0,0.25)', borderRadius: '10px'}}/>
            </div>
        </>
    );
};

export {MobileAndBrowser};