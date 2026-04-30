import {useState} from 'react';
import {LeadPopup} from '../LeadPopup';
import type {defaultDataPropsI} from '../../api.ts';
import type {leadItemI} from '../LeadPopup/types.ts';

import StarIcon from '../../assets/StarIcon.svg';
import {createLead} from '../../api.ts';
import NoFavicon from "../../assets/NoFavicon.png";
import "../../Styles/WebsiteCongratulationBox.css";

const WebsiteCongratulationBox = (props: defaultDataPropsI ) => {

    const {data} = props;
    const now = new Date();
    const [open, setOpen] = useState(false);

    const handleCreateLead = async (data: leadItemI) => {
        try {
            await createLead(data);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="website-congratulation-box">
            <div className="header">
                <img src={data?.favicon ? data.favicon : NoFavicon} width={72} height={72}/>
                <div className="website-log">
                    <h2>{
                        data?.fetched_url?.replaceAll("https://", "").replaceAll("http://", "")
                    }</h2>
                    <p>
                        {now.toLocaleDateString("ro-RO", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}{" "}
                        -{" "}
                        {now.toLocaleTimeString("ro-RO", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </div>
            <div className="message-box">
                <img src={StarIcon} alt="star" width={32}/>
                <div className="message-content">
                    <p style={{margin: 0}}><b style={{color: "var(--success-title-color)"}}>Felicitări!</b></p>
                    <p style={{margin: 0}}>Ești printre <b style={{color: "var(--success-title-color)"}}>10% cele mai performante</b> site-uri din România.</p>
                    <p style={{textDecoration: "underline", color: "var(--input-text-color)", cursor: "pointer"}} onClick={() => {setOpen(true)}}>Întreabă-ne despre cum te poți menține în top.</p>
                </div>
            </div>
            <LeadPopup
                isOpen={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreateLead}
            />
        </div>
    )
}

export {WebsiteCongratulationBox};