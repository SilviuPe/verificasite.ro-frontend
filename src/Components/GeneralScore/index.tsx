import { useState, useEffect } from 'react';
import {CircleProgress} from '../CircleProgress';
import LightIcon from '../../assets/light-icon.svg';
import type {AnalyzeResponse} from "../../api.ts";
import AuditInfoRowImgError from '../../assets/audit_info_row_image_error.png';
import AuditInfoRowImgWarning from '../../assets/audit_info_row_image_warning.png';
import AuditInfoRowImgSuccess from '../../assets/audit_info_row_image_success.png';
type Props = {
    data: AnalyzeResponse | null;
};

type State = {
    last_version_of_wp : string | undefined;
    errors_percent: number;
    warnings_percent: number;
    success_percent: number;

}

const GeneralScore = ({ data }: Props) => {
    const [state, setState] = useState<State>({
        last_version_of_wp: undefined,
        errors_percent: 0,
        warnings_percent: 0,
        success_percent: 0,
    });

    const fetchLatestWordPressVersion = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WORDPRESS_API_URL}`,);

            if (!res.ok) {
                setState((prevState: State) => ({
                    ...prevState,
                    last_version_of_wp: undefined
                }));
            }

            const data = await res.json();

            if (data && data.offers) {
                const last_version = data.offers[0];
                if (last_version && last_version.version) {
                    setState((prevState: State) => ({
                        ...prevState,
                        last_version_of_wp: last_version.version
                    }));
                }
            }
            else {
                setState((prevState: State) => ({
                    ...prevState,
                    last_version_of_wp: undefined
                }));
            }

        } catch (err: unknown) {
            console.error(err);
            setState((prevState: State) => ({
                    ...prevState,
                    last_version_of_wp: undefined
                }));
        }
    }

    const check_if_no_tech = () => {
        if (data) {
            if (data.tech?.google_analytics) return true;
            if (data.tech?.google_tag_manager) return true;
            if (data.tech?.jquery) return true;
            if (data.tech?.google_maps) return true;
            if (data.tech?.google_fonts) return true;
            if (data.tech?.cloudflare) return true;
            if (data.tech?.hotjar) return true;
            if (data.tech?.rechapta) return true;
            if (data.tech?.google_ads) return true;
        }

        return false;
    }

    const check_plugins = () => {
        if (data && data.plugins && data.plugins.plugins && data.plugins.plugins.length) {
            for (const plugin of data.plugins.plugins) {
                console.log(plugin);
                if (plugin.current_version !== plugin.latest_version && plugin.current_version !== null) {
                    return false;
                }
            }
            return true
        }
        return false;
    }

    const calculate_general_score = () => {
        let warnings = 0;
        let errors = 0;
        let critic = false;
        // Schema.org
        if (data) {
            if (!data.structured_data?.schema_org?.formats?.detected?.json_ld ||
                !data.structured_data?.schema_org?.formats?.detected?.microdata ||
                !data.structured_data?.schema_org?.formats?.detected?.rdfa) {
                errors += 1;
            }
            // Pixelul Facebook
            if (!data.tech?.facebook_pixel.present) {
                errors += 1;
            }
            // Google Tag Manager
            if (!data.tech?.google_tag_manager) {
                errors += 1;
            }
            // Google Analytics
            if (!data.tech?.google_analytics) {
                errors += 1;
            }
            // Desktop & Mobile view
            if (!data.screenshots.mobile && !data.screenshots.desktop) {
                errors += 1;
            } else if (!(data.screenshots.mobile && data.screenshots.desktop)) {
                warnings += 1;
            }
            // Titlul Pagini
            if (!data.seo.title?.length) {
                errors += 1;
            } else if (data.seo.title?.length && data.seo.title?.length > 70) {
                warnings += 1;
            }
            // Descrierea
            if (!data.seo.meta_description?.length) {
                errors += 1;
            } else if (data.seo.meta_description?.length < 70 || data.seo.meta_description?.length > 160) {
                warnings += 1;
            }
            // Heading uri
            if (data.seo.headings?.h1) {
                if (data.seo.headings?.h1 === 0) {
                    errors += 1;
                } else if (data.seo.headings?.h1 > 0) {
                    warnings += 1;
                }
            }
            // Broken Links
            if (data.seo.links && data.seo.links.broken_links && data.seo.links.broken_links.broken > 0) {
                warnings += 1;
            }
            // WWW Resolve
            if (!data.seo.www_resolve?.supported) {
                errors += 1;
            }
            // Robots.txt
            if (!data.seo.robots_txt?.present) {
                warnings += 1;
            }
            // Sitemap XML
            if (!data.seo.sitemap?.present) {
                warnings += 1;
            }
            // Facebook
            if (!data.social?.profiles?.facebook.present) {
                errors += 1;
            }
            // Instagram
            if (!data.social?.profiles?.instagram.present) {
                errors += 1;
            }
            // IP Address
            if (!data.ip_address) {
                errors += 1;
            }
            // Analytics
            if (!check_if_no_tech()) {
                errors += 1;
            }
            // Certificat secutritate SSL
            if (!data.checks?.ssl_certificate) {
                errors += 1;
                critic = true;
            }
            // WordPress
            if (!data.tech?.wordpress?.is_wordpress) {
                errors += 1;
            } else if (data.tech?.wordpress?.version !== state?.last_version_of_wp) {
                errors += 1;
            }
            // Plugins
            if (!check_plugins()) {
                errors += 1;
            }
            // Favicon
            if (!data.seo.favicon?.has_declared_icon) {
                errors += 1;
            }
            // Pagina 404 personalizata
            if (!data.seo.custom_404?.has_404) {
                errors += 1;
            }
            // Limba
            if (!data.social?.language?.detected) {
                errors += 1;
            }
        }

        setState((prevState) => ({
            ...prevState,
            warnings_percent: (warnings/22)*100,
            errors_percent: (errors/22)*100,
            success_percent: critic ? 60 - (errors/22)*100 - (warnings/22)*100 :  100 - (errors/22)*100 - (warnings/22)*100
        }))

    }
    function formatDate(date: Date = new Date()): string {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };

        const formatter = new Intl.DateTimeFormat("ro-RO", options);
        const parts = formatter.formatToParts(date);

        const values: Record<string, string> = {};

        parts.forEach(part => {
            values[part.type] = part.value;
        });

        return `${values.day} ${values.month}, ${values.year} - ${values.hour}:${values.minute} ${values.dayPeriod.replaceAll('.','').toUpperCase()}`;
    }

    useEffect(()=>{
        fetchLatestWordPressVersion();
        calculate_general_score()
    },[])

    return <div className='section-container'>
        <div className='section-content'>
            <div>
                <div className='section-header-container'>
                    <img className='image' src={LightIcon} alt=''/>
                    <h2>DIAGNOSTIC</h2>
                </div>
            </div>
            <div className='header-container'>
                <div className={"header-info-content"}>
                    <p className={"normalized_url"}>{data?.normalized_candidates[0].replaceAll('http://','').replaceAll('https://','')}</p>
                    <p className={"date"}>{formatDate()}</p>
                </div>
                <div className={"header-info-content"}>
                    <div className="congratulation-message">
                        <p><b>Felicitări! </b> Ești printre cele 10% cele mai performante site-uri.</p>
                        <a href="http://head-innovation.com/" target="_blank">Întreabă-ne despre cum te poți menține în top.</a>
                    </div>
                    <div className={"general-score-display"}>
                        <div className="left-side-rating-score">
                            <div className="field">
                                <div className={"icon-message"}>
                                    <img src={AuditInfoRowImgSuccess} alt="success"/>
                                    <p>Implementat</p>
                                </div>
                                <div className={"status-bar"}>
                                    <div style={{width:`${state.success_percent}%`}} className={"filled-success"}></div>
                                </div>
                            </div>
                            <div className="field">
                                <div className={"icon-message"}>
                                    <img src={AuditInfoRowImgWarning} alt="warning"/>
                                    <p>De îmbunătăţit</p>
                                </div>
                                <div className={"status-bar"}>
                                    <div style={{width:`${state.warnings_percent}%`}} className={"filled-warning"}></div>
                                </div>
                            </div>
                            <div className="field">
                                <div className={"icon-message"}>
                                    <img src={AuditInfoRowImgError} alt="error"/>
                                    <p>Erori</p>
                                </div>
                                <div className={"status-bar"}>
                                    <div style={{width:`${state.errors_percent}%`}} className={"filled-error"}></div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side-rating-score">
                            <CircleProgress value={Number(state.success_percent.toFixed())}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export {GeneralScore};