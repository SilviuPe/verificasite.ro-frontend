import type {ReactNode} from "react";
import type {defaultDataPropsI} from "../../api.ts";
import OptimizationIcon from '../../assets/OptimizationIcon.svg';

import "../../Styles/Optimizations.css";
import SuccesIcon from '../../assets/SuccesIcon.svg';
import WarningIcon from '../../assets/WarningIcon.svg';
import ErrorIcon from '../../assets/ErrorIcon.svg';

import {PopupInfo} from "../PopupInfo";

const Optimizations = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="optimizations-component">
            <div className="optimization-row-container header-title">
                <img src={OptimizationIcon} alt=""/>
                <h2>Optimizări</h2>
            </div>
            <div className="optimization-row-container">
                <div className="optimization-box-container page-title">
                    <img src={data?.seo?.title?.value ? data.seo.title.length < 70 ? SuccesIcon : WarningIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.title?.value ? data.seo.title.length < 70 ? "var(--success-title-color)" : "var(--orange-accent-color)" : "var(--red-accent-color)"}}>Titlu paginii</p>
                        <PopupInfo title="Titlul paginii" text="Titlul este primul element vizibil în rezultatele căutărilor pe Google. Menține titlul site-ului sub 70 de caractere pentru o afișare optimă în Google. Atunci când scrii titlul, ține seama de cuvintele cheie importante pentru activitatea companiei!"/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>{data?.seo?.title?.value ? data.seo.title.value : "Titlul nu a fost gasit."}</p>
                    {data?.seo?.title?.value ? <p style={{color: "var(--input-text-color)"}}><b>Length:</b> {data?.seo?.title?.length}</p> : null}
                </div>

                <div className="optimization-box-container description-page">
                    <img src={data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? SuccesIcon : WarningIcon : ErrorIcon} width={22} alt={'meta_description'}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? "var(--success-title-color)" : "var(--orange-accent-color)" : "var(--red-accent-color)"}}>Descriere Meta</p>
                        <PopupInfo title="Descriere Meta" text="Descrierea Meta oferă utilizatorilor informații esențiale despre companie și îmbunătățește locul în clasamentul Google. Recomandăm ca descrierea meta să se încadreze între 50 - 160 caractere. Ține seama de nevoile clienților potențiali atunci când scrii descrierea meta."/>
                    </div>
                    <p style={{color: "var(--input-text-color)"}}>{data?.seo?.meta_description?.value ? data.seo.meta_description.value : "Descrierea nu a fost gasita."}</p>
                </div>
                <div className="optimization-box-container headings">
                    <img src={data?.seo?.headings ? data.seo.headings.h1 > 1 ? WarningIcon : SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.headings ? data.seo.headings.h1 > 1 ? "var(--orange-accent-color)" : "var(--success-title-color)" : "var(--red-accent-color)"}}>Heading-uri</p>
                        <PopupInfo title="Heading-uri" text="Reprezintă numărul de titluri și subtitluri prezente în website. Folosirea titlurilor și subtitlurilor pentru structurarea conținutului de pe website favorizează o experiență plăcută pentru utilizatori și scade rata indexare.
                                                            Headers (H1, H2, H3) organize your content and help Google understand what your page is about.

                                                            Rules:
                                                            Use exactly ONE H1 per page (your main title)
                                                             2. Use H2s for main sections
                                                             3. Use H3s for subsections within H2s
                                                             4. Include keywords naturally in some headers (not all)

                                                            Example structure:
                                                            H1: Home Workouts for Beginners: Complete Guide
                                                            H2: Why Home Workouts Work
                                                            H2: Equipment You Need (Hint: Almost Nothing)
                                                            H2: 20 Best Home Exercises for Beginners H3: Upper Body Exercises
                                                            H3: Lower Body Exercises
                                                            H3: Core Exercises
                                                            H3: Cardio Exercises
                                                            H2: Sample 4-Week Workout Plan
                                                            H2: Common Mistakes to Avoid"/>
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
                <div className="optimization-box-container" style={{width: "100%"}}>
                    <img src={data?.seo?.title && data?.seo.meta_description ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.title && data?.seo.meta_description ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Previzualizare rezultat in Google</p>
                        <PopupInfo title="Previzualizare rezultat in Google" text="„Previzualizare rezultat în Google” este o secțiune care îți arată cum va apărea pagina ta în rezultatele de căutare Google. Include titlul, meta descrierea și URL-ul, pentru a verifica și optimiza modul în care site-ul este afișat înainte de publicare sau indexare."/>
                    </div>
                    <div style={{textAlign: 'start', padding: '1rem', border: '1px solid rgba(0,0,0,0.2)', marginTop: '0.5rem'}}>
                        <p style={{margin: 5, color: "#008CFF", textDecoration: 'underline'}}>{data?.seo?.title?.value}</p>
                        <p style={{margin: 5, color: "#078F00"}}>{data?.final_url.replace('www.', '')}</p>
                        <p style={{margin: 5, color: "var(--input-text-color)", opacity: 0.5}}>{data?.seo.meta_description?.value}</p>
                    </div>
                </div>
                <div className="optimization-box-container" style={{width: "100%"}}>
                    <img src={data?.seo?.links ? data?.seo?.links?.broken_pages?.broken && data.seo.links.broken_pages.broken > 0 ? WarningIcon : SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.links ? data?.seo?.links?.broken_pages?.broken && data.seo.links.broken_pages.broken > 0 ? "var(--orange-accent-color)" : "var(--success-title-color)" : "var(--red-accent-color)"}}>Link-uri Nefuncționale</p>
                        <PopupInfo title="Link-uri Nefuncționale" text="Orice link nefuncțional are un efect negativ asupra performanței site-ului. Asigurați-vă că orice link către o pagină internă sau externă site-ului funcționează perfect."/>
                    </div>
                    <div className="links-list-container">
                        <p style={{color: "var(--input-text-color)"}} className="subtitle">{data?.seo?.links?.broken_pages?.broken && data.seo.links.broken_pages.broken > 0 ? `Am gasit ${data.seo.links.broken_pages.broken} link-uri nefuncționale` : "Toate link-urile sunt functionale"}</p>
                        {
                            data?.seo?.links && data?.seo?.links?.broken_pages?.broken && data.seo.links.broken_pages.broken > 0
                            ? <div className="list-container">
                                <ul style={{display: "flex", flexDirection: 'column' ,gap: "var(--spacing-sm)"}}>
                                    <li>
                                        <span className="clamp-text">
                                            <a href={data?.seo?.links?.broken_pages?.broken_samples?.[0]?.url} target="_blank">{data?.seo?.links?.broken_pages?.broken_samples?.[0]?.url}</a>
                                        </span>
                                    </li>
                                    {
                                        data.seo.links.broken_pages.broken > 1
                                        ? <li>
                                                <span className="clamp-text">
                                                    <a href={data?.seo?.links?.broken_pages?.broken_samples?.[1]?.url} target="_blank">{data?.seo?.links?.broken_pages?.broken_samples?.[0]?.url}</a>
                                                </span>
                                            </li>
                                            : null
                                    }
                                </ul>
                            </div>
                                : null
                        }
                    </div>
                </div>
            </div>
            <div className="optimization-row-container">
                <div className="optimization-box-container" style={{width: "100%"}}>
                    <img src={data?.seo?.www_resolve?.supported ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo?.www_resolve?.supported ? "var(--success-title-color)" : "var(--red-accent-color)"}}>WWW Resolve</p>
                        <PopupInfo title="WWW Resolve" text="WWW Resolve permite redirecționarea și accesarea site-ului indiferent dacă utilizatorul scrie în bara de căutare www.websitename.com sau doar websitename.com. Activați modul de redirecționare pentru a facilita accesul ușor la site-ul companiei."/>
                    </div>
                    <div className="www-resolve-info" style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.www_resolve?.supported ? "Se face redirect la subdomeniul \"www\" cu succes." : "Nu se face redirect la subdomeniul \"www\"."}</p>
                    </div>
                </div>
                <div className="optimization-box-container" style={{width: "100%"}}>
                    <img src={data?.seo.robots_txt?.present ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo.robots_txt?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Robots.txt</p>
                        <PopupInfo title="Robots.txt" text="Robots.txt este un fișier text simplu care se află în directorul rădăcină (root) al site-ului. Acesta informează roboții de indexare, ce pagini să acceseze și pe care să le omită în diferite circumstanțe. Prezența fișierului Robots.txt favorizează o poziție mai bună în clasamentul Google."/>
                    </div>
                    <div className="robots-txt-info" style={{display: "flex", flexDirection: "column", gap: "var(--spacing-sm)"}}>
                        <p style={{color: "var(--input-text-color)"}}>{data?.seo?.robots_txt?.present ? "Fișierul tău Robots.txt este setat." : "Fișierul tău Robots.txt nu este setat."}</p>
                        <a style={{color: "var(--input-text-color)"}} href={data?.seo?.robots_txt?.url ? data.seo.robots_txt.url : undefined} target="_blank"><b>{data?.seo?.robots_txt?.url ? (data.seo.robots_txt.url) as ReactNode : null}</b></a>
                    </div>
                </div>
                <div className="optimization-box-container" style={{width: "100%"}}>
                    <img src={data?.seo.sitemap?.present ? SuccesIcon : ErrorIcon} alt={'icon'} width={22}/>
                    <div className="box-title">
                        <p style={{color: data?.seo.sitemap?.present ? "var(--success-title-color)" : "var(--red-accent-color)"}}>Sitemap XML</p>
                        <PopupInfo title="Sitemap XML" text="Sitemap XML este o hartă a site-ului care ajută motoarele de căutare precum Google să înțeleagă mai ușor structura site-ului companiei și organizarea paginilor. Sitemap XML favorizează accesul ușor la diferite secțiuni ale site-ului, în funcție de intenția utilizatorului."/>
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