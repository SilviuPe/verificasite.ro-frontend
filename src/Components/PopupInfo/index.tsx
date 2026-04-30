import { useState, useRef, useEffect } from "react";
import type {PopupInfoPropsI} from "./types.ts";
import InfoIcon from '../../assets/InfoIcon.svg';
import CloseIcon from '../../assets/CloseIcon.svg';
import "../../Styles/PopupInfo.css";

const PopupInfo = (props: PopupInfoPropsI) => {
    const {title, text} = props;
    const [open, setOpen] = useState(false);
    const [positionLeft, setPositionLeft] = useState(false);
    const elRef = useRef(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const rect = (el as HTMLElement).getBoundingClientRect();
        const left = rect.left + window.scrollX;
        const width = document.documentElement.scrollWidth;

        const shouldBeLeft = left < (width / 2);

        setPositionLeft(prev => {
            if (prev === shouldBeLeft) return prev; // evită re-render inutil
            return shouldBeLeft;
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="info-tooltip-wrapper" ref={wrapperRef}>
            <img
                ref={elRef}
                className="info-button"
                src={InfoIcon}
                alt="info"
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div className="info-tooltip-popup" style={{right: positionLeft ? '-460px' : '0'}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h2>INFO - {title}</h2>
                        <img src={CloseIcon} alt="close" width={20} style={{cursor: "pointer"}} onClick={()=> {
                            setOpen(false);
                        }}/>
                    </div>
                    <p style={{whiteSpace: "pre-line"}}>{text}</p>
                </div>
            )}
        </div>
    );
}


export {PopupInfo};

