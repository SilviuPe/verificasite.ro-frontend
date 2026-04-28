import type {ScoreBarPropsI} from './types.ts';

const ScoreBar = (props: ScoreBarPropsI) => {

    const {title, value, type} = props;

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "calc(var(--spacing-sm)/2)"}} className="score-bar-component">
            <div className="text" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <p style={{margin: 0, fontSize: '0.875em'}}>{title}</p>
                <p style={{margin: 0, fontSize: '0.875em'}}>{value}%</p>
            </div>
            <div className="bar" style={{border:0, borderRadius: "var(--spacing-sm)", height: 11.25, margin: 0, padding: 0, width: "100%", backgroundColor: type === 'green' ? "var(--green-fade-color)" : type === 'orange' ? "var(--orange-fade-color)" : "var(--red-fade-color)"}}>
                <div className="filled" style={{border:0, borderRadius: "var(--spacing-sm)", height: 11.25,width: `${value}%`, backgroundColor: type === 'green' ? "var(--success-title-color)" : type === 'orange' ? "var(--orange-accent-color)" : "var(--red-accent-color)"}}></div>
            </div>
        </div>
    )
}

export {ScoreBar};