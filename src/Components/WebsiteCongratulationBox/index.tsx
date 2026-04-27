import type {defaultDataPropsI} from '../../api.ts';

import StarIcon from '../../assets/StarIcon.svg';

import "../../Styles/WebsiteCongratulationBox.css";

const WebsiteCongratulationBox = (props: defaultDataPropsI ) => {

    const {data} = props;

    return (
        <div className="website-congratulation-box">
            <div className="header">
                <div style={{width: 100, height: 100}}></div>
                <div className="website-log">
                    <h2>{
                        data?.fetched_url?.replaceAll("https://", "").replaceAll("http://", "")
                    }</h2>
                    <p >27 aprilie, 2026 - 11:33 AM</p>
                </div>
            </div>
            <div className="message-box">
                <img src={StarIcon} alt="star" width={32}/>
                <div className="message-content">
                    <p style={{margin: 0}}><b style={{color: "var(--success-title-color)"}}>Felicitări!</b></p>
                    <p style={{margin: 0}}>Ești printre <b style={{color: "var(--success-title-color)"}}>10% cele mai performante</b> site-uri din România.</p>
                    <a href="https://head-innovation.com/" target="_blank">Întreabă-ne despre cum te poți menține în top.</a>
                </div>
            </div>
        </div>
    )
}

export {WebsiteCongratulationBox};