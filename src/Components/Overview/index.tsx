import type {AnalyzeResponse} from "../../api.ts";

const Overview = ({ data }: { data: AnalyzeResponse }) => {
    return (
        <section className="card">
            <h2>Overview</h2>

            <ul className="kv">
                <li><span>Final URL</span><strong>{data.final_url}</strong></li>
                <li><span>Status code</span><strong>{data.status_code}</strong></li>
                <li><span>SSL</span><strong>{data.ssl_ok ? "OK" : "Not secure"}</strong></li>
                <li><span>IP</span><strong>{data.ip_address || "N/A"}</strong></li>
            </ul>
        </section>
    );
};

export { Overview };