import type {defaultDataPropsI} from "../../api.ts";
import DiagnosticIcon from '../../assets/DiagnosticIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';
import "../../Styles/GeneralScore.css";

import {ScoreBar} from './subcomponents';

const GeneralScore = (props: defaultDataPropsI) => {
    const {data} = props;
    console.log(data);
    return (
        <div className="general-score-component">
            <div className="header-wrapper">
                <img src={DiagnosticIcon} alt="Diagnostic icon" width={72}/>
                <h2>Diagnostic</h2>
            </div>
            <div className="score-overall-wrapper">
                <div className="score-value">68</div>
                <div className="subtitle">Your general score</div>
                <div className="last-update">Updated Nov 24, 2022</div>
            </div>
            <div className="score-splitted-wrapper">
                <ScoreBar title={"Implementat"} type={'green'} value={76}/>
                <ScoreBar title={"De îmbunătățit"} type={'orange'} value={48}/>
                <ScoreBar title={"Erori"} type={'red'} value={24}/>
            </div>
            <div className="cta-button-wrapper">
                <button>Scapă acum de erorile din site <img src={ArrowRightIcon} alt="arrow-right-icon"/></button>
            </div>
        </div>
    )
}

export {GeneralScore};