import type {AnalyzeResponse} from "../../api.ts";


const ContentStructure = ({ data }: { data: AnalyzeResponse }) => {
    const h1 = data.seo.headings?.h1;

    return (
        <section className="card">
            <h2>Content structure</h2>

            <ul className="kv">
                <li>
                    <span>H1 tags</span>
                    <strong className={h1 === 1 ? "ok" : "warn"}>
                        {h1}
                    </strong>
                </li>
                <li><span>H2 tags</span><strong>{data.seo.headings?.h2}</strong></li>
                <li><span>H3 tags</span><strong>{data.seo.headings?.h3}</strong></li>
            </ul>

            {h1 !== 1 && (
                <p className="note">
                    A page should normally contain exactly one H1.
                </p>
            )}

            <p className="note">● Use exactly ONE H1 per page (your main title)</p>
            <p className="note">● Use H2s for main sections</p>
            <p className="note">● Use H3s for subsections within H2s</p>
            <p className="note"> ● Include keywords naturally in some headers (not all)</p>
            <p className="note" style={{fontSize:18}}>Example structure:</p>
            <div className="content-structure-table">
                <div>
                    <p className="note">● H1: Home Workouts for Beginners: Complete Guide</p>
                </div>
                <div>
                    <p className="note">● H2: Why Home Workouts Work </p>
                    <p className="note">● H2: Equipment You Need (Hint: Almost Nothing) </p>
                    <p className="note">● H2: 20 Best Home Exercises for Beginners </p>
                    <p className="note">● H2: Sample 4-Week Workout Plan</p>
                    <p className="note">● H2: Common Mistakes to Avoid</p>
                </div>
                <div>
                    <p className="note">● H3: Upper Body Exercises </p>
                    <p className="note">● H3: Lower Body Exercises </p>
                    <p className="note">● H3: Core Exercises </p>
                    <p className="note">● H3: Cardio Exercises </p>
                </div>
            </div>
        </section>
    );
};

export {ContentStructure};