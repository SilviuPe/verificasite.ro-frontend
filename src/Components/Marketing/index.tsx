import type {defaultDataPropsI} from "../../api.ts";
import MarketingIcon from "../../assets/MarketingIcon.svg";
import SuccessIcon from "../../assets/SuccesIcon.svg";
import {PopupInfo} from "../PopupInfo";
import ErrorIcon from "../../assets/ErrorIcon.svg";

import "../../Styles/Marketing.css";

const Marketing = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="marketing-component">
            <div className="marketing-row-container header-title">
                <img src={MarketingIcon} alt=""/>
                <h2>Marketing</h2>
            </div>
            <div className="marketing-row-container">
                <div className="marketing-box-container pixel-facebook">
                    <img src={data?.tech?.facebook_pixel?.present ? SuccessIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.tech?.facebook_pixel?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Pixelul Facebook</p>
                        <PopupInfo title="Pixelul Facebook" text="Pixelul Facebook garantează că reclamele din cadrul platformei sunt văzute de persoanele care au cea mai mare probabilitate să devină clienți ai companiei. Acest lucru vă permite creșteți rata de conversie a reclamelor Facebook."/>
                    </div>
                    <p>Pixelul Facebook {data?.tech?.facebook_pixel?.present ? "" : "nu"} este instalat.</p>
                </div>

                <div className="marketing-box-container google-tag-manager">
                    <img src={data?.tech?.google_tag_manager ? SuccessIcon : ErrorIcon} width={22} alt={'google-tag-manager'}/>
                    <div className="box-title">
                        <p style={{color: data?.tech?.google_tag_manager ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Google Tag Manager</p>
                        <PopupInfo title="Google Tag Manager" text="Google Tag Manager este un sistem gratuit de gestionare a etichetelor (tag) care vă permite să gestionați și să implementați etichete de marketing (fragmente de cod sau pixeli de urmărire) pe site-ul companiei fără a fi nevoie să modificați codul."/>
                    </div>
                    <p>Google Tag Manager {data?.tech?.google_tag_manager ? "" : "nu"} este instalat.</p>
                </div>

                <div className="marketing-box-container google-analytics">
                    <img src={data?.tech?.google_analytics ? SuccessIcon : ErrorIcon} width={22} alt={'google-tag-manager'}/>
                    <div className="box-title">
                        <p style={{color: data?.tech?.google_analytics ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Google Analytics</p>
                        <PopupInfo title="Google Analytics" text="Google Analytics permite monitorizarea și analiza traficului de pe site. Vă oferă o cantitate enormă de informații despre cine sunt cei care vă vizitează site-ul, ce caută și cum ajung să acceseze site-ul. Generează rapoarte de date care îți permit să crești rata de conversie pe site."/>
                    </div>
                    <p>Google Analytics {data?.tech?.google_analytics ? "" : "nu"} este instalat.</p>
                </div>
            </div>
        </div>
    )
}

export {Marketing};