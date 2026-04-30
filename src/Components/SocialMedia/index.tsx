import type {defaultDataPropsI} from "../../api.ts";
import SocialMediaIcon from "../../assets/SocialMediaIcon.svg";
import SuccesIcon from "../../assets/SuccesIcon.svg";
import WarningIcon from "../../assets/WarningIcon.svg";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import {PopupInfo} from "../PopupInfo";

import "../../Styles/SocialMedia.css";

const SocialMedia = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="social-media-component">
            <div className="social-media-row-container header-title">
                <img src={SocialMediaIcon} alt=""/>
                <h2>Social Media</h2>
            </div>
            <div className="social-media-row-container">
                <div className="social-media-box-container facebook">
                    <img src={data?.social?.profiles?.facebook?.present ? SuccesIcon : WarningIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.social?.profiles?.facebook?.present ? "var(--success-title-color)" : "var(--orange-accent-color)"}}>Facebook</p>
                        <PopupInfo title="Facebook" text="Pagină de Facebook permite configurarea de campanii de reclame pe platforma de social media pentru a ajunge la o plajă mai mare de clienți potențiali. Mai mult, conferă credibilitate utilizatorilor și extinde prezența companiei în mediul online."/>
                    </div>
                    {
                        data?.social?.profiles?.facebook?.present
                        ? <a style={{color: "var(--input-text-color)"}} href={data.social.profiles.facebook.links[0]} target="_blank">{data.social.profiles.facebook?.links[0].replaceAll("https://",'').replaceAll("http://", '')}</a>
                            : <p style={{color: "var(--input-text-color)"}}>Nu am gasit link pentru pagina de Facebook.</p>
                    }
                </div>

                <div className="social-media-box-container instagram">
                    <img src={data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? SuccesIcon : WarningIcon : ErrorIcon} width={22} alt={'meta_description'}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? "var(--success-title-color)" : "var(--orange-accent-color)" : "var(--red-accent-color)"}}>Instagram</p>
                        <PopupInfo title="Instagram" text="În funcție de industria în care activează compania, contul de Instagram configurat corespunzător poate fi o modalitate de a genera lead-uri noi prin realizarea de campanii pe platformă."/>
                    </div>
                    {
                        data?.social?.profiles?.instagram?.present
                            ? <a style={{color: "var(--input-text-color)"}} href={data.social.profiles.instagram.links[0]} target="_blank">{data.social.profiles.instagram?.links[0].replaceAll("https://",'').replaceAll("http://", '')}</a>
                            : <p style={{color: "var(--input-text-color)"}}>Nu am gasit link pentru pagina de Instagram.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export {SocialMedia};