import type {defaultDataPropsI} from "../../api.ts";
import DiagnosticIcon from '../../assets/DiagnosticIcon.svg';

import "../../Styles/Optimizations.css";
import SuccesIcon from '../../assets/SuccesIcon.svg';
import WarningIcon from '../../assets/WarningIcon.svg';
import ErrorIcon from '../../assets/ErrorIcon.svg';
import InfoIcon from '../../assets/InfoIcon.svg';
import type {ReactNode} from "react";

const Optimizations = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="optimizations-component">
            <div className="optimization-row-container header-title">
                <img src={DiagnosticIcon} alt=""/>
                <h2>Optimizări</h2>
            </div>
            <div className="optimization-row-container">
                <div className="optimization-box-container" style={{width:"25%"}}>
                    <img src={data?.seo?.title?.value ? data.seo.title.length < 70 ? SuccesIcon : WarningIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.title?.value ? data.seo.title.length < 70 ? "var(--success-title-color)" : "var(--orange-accent-color)" : "var(--red-accent-color)"}}>Titlu paginii</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>{data?.seo?.title?.value ? data.seo.title.value : "Titlul nu a fost gasit."}</p>
                    {data?.seo?.title?.value ? <p style={{color: "var(--input-text-color)"}}><b>Length:</b> {data?.seo?.title?.length}</p> : null}
                </div>

                <div className="optimization-box-container" style={{width:"25%"}}>
                    <img src={data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? SuccesIcon : WarningIcon : ErrorIcon} width={22} alt={'meta_description'}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? "var(--success-title-color)" : "var(--orange-accent-color)" : "var(--red-accent-color)"}}>Descriere Meta</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>{data?.seo?.meta_description?.value ? data.seo.meta_description.value : "Descrierea nu a fost gasita."}</p>
                </div>
                <div className="optimization-box-container" style={{width:"50%"}}>
                    <img src={data?.seo?.headings ? data.seo.headings.h1 > 1 ? WarningIcon : SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.headings ? data.seo.headings.h1 > 1 ? "var(--orange-accent-color)" : "var(--success-title-color)" : "var(--red-accent-color)"}}>Headinguri</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div className="headers-list">
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H1</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h1}</p>
                        </div>
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H2</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h2}</p>
                        </div>
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H3</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h3}</p>
                        </div>
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H4</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h4}</p>
                        </div>
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H5</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h5}</p>
                        </div>
                        <div className="header-item">
                            <p style={{color: "var(--input-text-color)"}} className="subtitle">H6</p>
                            <p style={{color: "var(--input-text-color)"}}>{data?.seo?.headings?.h6}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="optimization-row-container">
                <div className="optimization-box-container" style={{width: "50%"}}>
                    <img src={data?.seo?.title && data?.seo.meta_description ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.title && data?.seo.meta_description ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Previzualizare rezultat in Google</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div style={{textAlign: 'start', padding: '1rem', border: '1px solid rgba(0,0,0,0.2)', marginTop: '0.5rem'}}>
                        <p style={{margin: 5, color: "#008CFF", textDecoration: 'underline'}}>{data?.seo?.title?.value}</p>
                        <p style={{margin: 5, color: "#078F00"}}>{data?.final_url.replace('www.', '')}</p>
                        <p style={{margin: 5, color: "var(--input-text-color)", opacity: 0.5}}>{data?.seo.meta_description?.value}</p>
                    </div>
                </div>
                <div className="optimization-box-container" style={{width: "50%"}}>
                    <img src={data?.seo?.links ? data?.seo?.links?.broken_links?.broken && data.seo.links.broken_links.broken > 0 ? WarningIcon : SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.links ? data?.seo?.links?.broken_links?.broken && data.seo.links.broken_links.broken > 0 ? "var(--orange-accent-color)" : "var(--success-title-color)" : "var(--red-accent-color)"}}>Link-uri Nefuncționale</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div className="links-list-container">
                        <p style={{color: "var(--input-text-color)"}} className="subtitle">{data?.seo?.links?.broken_links?.broken && data.seo.links.broken_links.broken > 0 ? `Am gasit ${data.seo.links.broken_links.broken} link-uri nefuncționale` : "Toate link-urile sunt functionale"}</p>
                        <div className="list-container">
                            <ul style={{display: "flex", flexDirection: 'column' ,gap: "var(--spacing-sm)"}}>
                                <li>
                                    <span className="clamp-text">
                                        <a href={data?.seo?.links?.broken_links?.broken_samples?.[0]?.url} target="_blank">{data?.seo?.links?.broken_links?.broken_samples?.[0]?.url}</a>
                                    </span>
                                </li>
                                <li>
                                    <span className="clamp-text">
                                        <a href="https://head-innovation.com" target="_blank">Descopera mai multe</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="optimization-row-container">
                <div className="optimization-box-container" style={{flex: 1}}>
                    <img src={data?.seo?.www_resolve?.supported ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.www_resolve?.supported ? "var(--success-title-color)" : "var(--red-accent-color)"}}>WWW Resolve</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div className="www-resolve-info" style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.www_resolve?.supported ? "Se face redirect la subdomeniul \"www\" cu succes." : "Nu se face redirect la subdomeniul \"www\"."}</p>
                    </div>
                </div>
                <div className="optimization-box-container" style={{flex: 1}}>
                    <img src={data?.seo.robots_txt?.present ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo.robots_txt?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Robots.txt</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div className="robots-txt-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.robots_txt?.present ? "Fișierul tău Robots.txt este setat." : "Fișierul tău Robots.txt nu este setat."}</p>
                        <a style={{color: "var(--input-text-color)"}} href={data?.seo?.robots_txt?.url ? data.seo.robots_txt.url : undefined} target="_blank"><b>{data?.seo?.robots_txt?.url ? (data.seo.robots_txt.url) as ReactNode : null}</b></a>
                    </div>
                </div>
                <div className="optimization-box-container" style={{flex: 1}}>
                    <img src={data?.seo.sitemap?.present ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo.sitemap?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Robots.txt</p>
                        <img className="info-button" src={InfoIcon} alt={'icon'}/>
                    </div>
                    <div className="sitemap-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.sitemap?.present ? "Sitemap găsit." : "Sitemap nu a fost găsit."}</p>
                        <a style={{color: "var(--input-text-color)"}} href={data?.seo?.sitemap?.url} target="_blank"><b>{data?.seo?.sitemap?.url}</b></a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export { Optimizations };