import type {AnalyzeResponse} from "../../api.ts";
import {AuditSection} from '../AuditSection';
import type {AuditRowPropsI} from '../AuditRow/types';
import OptimizeIcon from '../../assets/icon-optimization.svg';

const Optimizations = ({ data }: { data: AnalyzeResponse }) => {

    const rows: AuditRowPropsI[] = [
        {
            row_type: data.seo.title?.length ? data.seo.title?.length < 70 ? 'success' : 'warning' : 'error',
            key_: 'Titlul paginii',
            value: <>
                {
                    data.seo.title?.length
                        ? <div style={{textAlign: 'start'}}>

                            <p style={{margin: 5}}>{data.seo.title?.value}</p>
                            <p style={{margin: 5}}>Length: {data.seo.title?.length} character(s)</p>
                        </div>
                        : <div style={{textAlign: 'start'}}>
                            <p style={{margin: 5}}>Titlul nu a fost gasit.</p>
                        </div>
                }</>,
            info: "Titlul este primul element vizibil în rezultatele căutărilor pe Google. Menține titlul site-ului sub 70 de caractere pentru o afișare optimă în Google. Atunci când scrii titlul, ține seama de cuvintele cheie importante pentru activitatea companiei!"
        },
        {
            row_type: data.seo.meta_description?.length ? data.seo.meta_description?.length >= 70 && data.seo.meta_description?.length <= 160 ? 'success' : 'warning' : 'error',
            key_: 'Descriere meta',
            value:
                <>
                    {
                        data.seo.title?.length
                            ? <div style={{textAlign: 'start'}}>
                                <p style={{margin: 5}}>{data.seo.meta_description?.value}</p>
                            </div>
                            : <div style={{textAlign: 'start'}}>
                                <p style={{margin: 5}}>Descrierea Meta nu este afisata.</p>
                            </div>
                    }</>,
            info: "Descrierea Meta oferă utilizatorilor informații esențiale despre companie și îmbunătățește locul în clasamentul Google. Recomandăm ca descrierea meta să se încadreze între 50 - 160 caractere. Ține seama de nevoile clienților potențiali atunci când scrii descrierea meta."
        },
        {
            row_type: 'success',
            key_: 'Previzualizare rezultat in Google',
            value: <div style={{textAlign: 'start', padding: '1rem', border: '1px solid rgba(0,0,0,0.2)', marginTop: '0.5rem'}}>
                <p style={{margin: 5, color: 'blue', textDecoration: 'underline'}}>{data.seo.title?.value}</p>
                <p style={{margin: 5, color: '#00b894'}}>{data.final_url.replace('www.', '')}</p>
                <p style={{margin: 5}}>{data.seo.meta_description?.value}</p>
            </div>,
            info: "Descrierea Meta oferă utilizatorilor informații esențiale despre companie și îmbunătățește locul în clasamentul Google. Recomandăm ca descrierea meta să se încadreze între 50 - 160 caractere. Ține seama de nevoile clienților potențiali atunci când scrii descrierea meta."
        },
        {
            row_type: data.seo.headings?.h1 ? data.seo.headings?.h1 === 0 ? 'error' : data.seo.headings?.h1 === 1 ? 'success' : 'warning' : 'error',
            key_: 'Heading-uri',
            value: <div style={{display: 'flex', gap: '3rem', fontSize: '0.75em', fontWeight: 'bold', textAlign: 'start'}}>
                <div>
                    <p style={{margin: 5}}>H1</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h1}</p>
                </div>
                <div>
                    <p style={{margin: 5}}>H2</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h2}</p>
                </div>
                <div>
                    <p style={{margin: 5}}>H3</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h3}</p>
                </div>
                <div>
                    <p style={{margin: 5}}>H4</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h4}</p>
                </div>
                <div>
                    <p style={{margin: 5}}>H5</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h5}</p>
                </div>
                <div>
                    <p style={{margin: 5}}>H6</p>
                    <p style={{margin: 5}}>{data.seo.headings?.h6}</p>
                </div>
            </div>,
            info: "Reprezintă numărul de titluri și subtitluri prezente în website. Folosirea titlurilor și subtitlurilor pentru structurarea conținutului de pe website favorizează o experiență plăcută pentru utilizatori și scade rata indexare." +
                "Headers (H1, H2, H3) organize your content and help Google understand what your page is about.\n" +
                "\n" +
                "Rules:\n" +
                "\n" +
                "● Use exactly ONE H1 per page (your main title)\n" +
                "● Use H2s for main sections\n" +
                "● Use H3s for subsections within H2s\n" +
                "● Include keywords naturally in some headers (not all)\n\n" +
                "Example structure:\n\n" +
                "H1: Home Workouts for Beginners: Complete Guide\n" +
                "H2: Why Home Workouts Work\n" +
                "H2: Equipment You Need (Hint: Almost Nothing)\n" +
                "H2: 20 Best Home Exercises for Beginners\n" +
                "H3: Upper Body Exercises\n" +
                "H3: Lower Body Exercises\n" +
                "H3: Core Exercises\n" +
                "H3: Cardio Exercises\n" +
                "\n" +
                "H2: Sample 4-Week Workout Plan\n" +
                "H2: Common Mistakes to Avoid"
        },
        {
            row_type: data.seo.links?.broken_links?.broken === 0 ? 'success' : 'warning',
            key_: 'Link-uri nefuncționale',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.seo.links?.broken_links?.broken === 0
                    ? <p style={{margin: 5}}>Toate link-urile sunt funcționale.</p>
                    : <p style={{margin: 5}}>Am gasit {data.seo.links?.broken_links?.broken}  {data.seo.links?.broken_links?.broken === 1 ? 'link nefuncțional' : 'link-uri nefuncționale'}.</p>
                }
            </div>,
            info: "Orice link nefuncțional are un efect negativ asupra performanței site-ului. Asigurați-vă că orice link către o pagină internă sau externă site-ului funcționează perfect."
        },
        {
            row_type: data.seo.www_resolve?.supported ? 'success' : 'error',
            key_: 'WWW Resolve',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.seo.www_resolve?.supported
                        ? <p style={{margin: 5}}>Se face redirect la subdomeniul 'www' cu success.</p>
                        : <p style={{margin: 5}}>Nu se face redirect de la domeniul tau cu "www" la domeniul tau fara "www"</p>
                }
            </div>,
            info: "WWW Resolve permite redirecționarea și accesarea site-ului indiferent dacă utilizatorul scrie în bara de căutare www.websitename.com sau doar websitename.com. Activați modul de redirecționare pentru a facilita accesul ușor la site-ul companiei."
        },
        {
            row_type: data.seo.robots_txt?.present ? 'success' : 'warning',
            key_: 'Robots.txt',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.seo.robots_txt?.present
                        ? <div style={{margin: 5}}>
                            <p style={{margin: 5}}>Fișierul tău Robots.txt este setat.</p>
                            <a style={{margin: 5, textDecoration: 'None'}} href = {typeof data.seo.robots_txt?.url === 'string' ? data.seo.robots_txt?.url : ''}>{typeof data.seo.robots_txt?.url === 'string' ? data.seo.robots_txt?.url.replace('https://', '') : null}</a>
                        </div>
                        : <p style={{margin: 5}}>Fișierul tău Robots.txt nu este setat.</p>
                }
            </div>,
            info: "Robots.txt este un fișier text simplu care se află în directorul rădăcină (root) al site-ului. Acesta informează roboții de indexare, ce pagini să acceseze și pe care să le omită în diferite circumstanțe. Prezența fișierului Robots.txt favorizează o poziție mai bună în clasamentul Google."
        },
        {
            row_type: data.seo.sitemap?.present ? 'success' : 'warning',
            key_: 'Sitemap XML',
            value: <div style={{textAlign: 'start'}}>
                {
                    data.seo.sitemap?.present
                        ? <p style={{margin: 5}}>Sitemap găsit.</p>
                        : <p style={{margin: 5}}>Sitemap nu a fost găsit.</p>
                }
            </div>,
            info: "Sitemap XML este o hartă a site-ului care ajută motoarele de căutare precum Google să înțeleagă mai ușor structura site-ului companiei și organizarea paginilor. Sitemap XML favorizează accesul ușor la diferite secțiuni ale site-ului, în funcție de intenția utilizatorului."
        },
    ]

    return (
        <AuditSection title="OPTIMIZĂRI" image={OptimizeIcon} rows={rows}/>
    );
};

export {Optimizations};