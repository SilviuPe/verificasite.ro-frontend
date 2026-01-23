import type {AnalyzeResponse} from "../../api.ts";

const Platform = ({ data }: { data: AnalyzeResponse }) => {
    const wp = data.tech?.wordpress;

    return (
        <section className="card">
            <h2>Platform</h2>

            <ul className="kv">
                <li>
                    <span>WordPress</span>
                    <strong>{wp?.is_wordpress ? "Yes" : "No"}</strong>
                </li>
                {wp?.is_wordpress && (
                    <li>
                        <span>Version</span>
                        <strong>{wp?.version || "Not exposed"}</strong>
                    </li>
                )}
            </ul>
        </section>
    );
};

export { Platform };