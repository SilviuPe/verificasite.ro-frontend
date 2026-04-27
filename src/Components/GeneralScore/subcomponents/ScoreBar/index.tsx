import type {ScoreBarPropsI} from './types.ts';

const ScoreBar = (props: ScoreBarPropsI) => {

    const {title, value, type} = props;

    return (
        <div className="score-bar-component">
            <div className="text" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <p style={{margin: 0, fontSize: '0.875em'}}>{title}</p>
                <p style={{margin: 0, fontSize: '0.875em'}}>{value}%</p>
            </div>
            <div className="bar" style={{border:0, borderRadius: "var(--spacing-sm)", height: 10, margin: 0, padding: 0, width: "100%", backgroundColor: type === 'green' ? "#E3F4BE" : type === 'orange' ? "#F4E1BE" : "#F4BEBE"}}>
                <div className="filled" style={{border:0, borderRadius: "var(--spacing-sm)", height: 10,width: `${value}%`, backgroundColor: type === 'green' ? "#24820A" : type === 'orange' ? "#F58300" : "#E90808"}}></div>
            </div>
        </div>
    )
}

export {ScoreBar};