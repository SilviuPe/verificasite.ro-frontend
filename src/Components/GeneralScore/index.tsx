import {createLead, type defaultDataPropsI} from "../../api.ts";
import DiagnosticIcon from '../../assets/DiagnosticIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';
import "../../Styles/GeneralScore.css";

import {ScoreBar} from './subcomponents';
import {LeadPopup} from "../LeadPopup";
import {useState} from "react";

import type {leadItemI} from "../LeadPopup/types.ts";

const GeneralScore = (props: defaultDataPropsI) => {

    const [open, setOpen] = useState(false);
    const {data} = props;

    const handleCreateLead = async (data: leadItemI) => {
        try {
            await createLead(data);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="general-score-component">
            <div className="header-wrapper">
                <img src={DiagnosticIcon} alt="Diagnostic icon" width={72}/>
                <h2>Diagnostic</h2>
            </div>
            <div className="score-overall-wrapper">
                <div className="score-value">{data?.score?.general_score}</div>
                <div className="subtitle">Your general score</div>
                <div className="last-update">Updated Nov 24, 2022</div>
            </div>
            <div className="score-splitted-wrapper">
                <ScoreBar title={"Implementat"} type={'green'} value={data?.score?.implemented_percent ? data.score.implemented_percent : 0}/>
                <ScoreBar title={"De îmbunătățit"} type={'orange'} value={data?.score?.improvement_percent ? data.score.improvement_percent : 0}/>
                <ScoreBar title={"Erori"} type={'red'} value={data?.score?.missing_or_errors_percent ? data.score.missing_or_errors_percent : 0}/>
            </div>
            <div className="cta-button-wrapper">
                <button onClick={() => {
                    setOpen(true);
                }}>Scapă acum de erorile din site <img src={ArrowRightIcon} alt="arrow-right-icon"/></button>
            </div>
            <LeadPopup
                isOpen={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreateLead}
            />
        </div>
    )
}

export {GeneralScore};