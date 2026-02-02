import type {AuditRowPropsI, AuditRowStateI} from "./types";
import AuditInfoRowImgError from '../../assets/audit_info_row_image_error.png';
import AuditInfoRowImgWarning from '../../assets/audit_info_row_image_warning.png';
import AuditInfoRowImgSuccess from '../../assets/audit_info_row_image_success.png';
import InfoImg from '../../assets/InfoIcon.png';
import {useState} from "react";

const row_img_types = {
    'error': AuditInfoRowImgError,
    'warning': AuditInfoRowImgWarning,
    'success': AuditInfoRowImgSuccess,
}

const defaultState: AuditRowStateI = {
    dropdownInfo: {
        open: false
    }
}

const AuditRow = (props: AuditRowPropsI) => {

    const { row_type, key_, value, info } = props;
    const [state, setState] = useState<AuditRowStateI>(defaultState);

    const toggleInfoDropdown = () => {
        setState((prevState: AuditRowStateI) => ({
            ...prevState,
            dropdownInfo: {
                open: !prevState.dropdownInfo.open,
            }
        }))
    }

    return <div className='audit-row-container'>
        <div className='audit-row-content'>
            <div className='audit-row-icon-title-info-container'>
                <img className='row-type-message-image' alt={row_type} src={row_img_types[row_type]} />
                <h2 className='row-title'>{key_}</h2>
            </div>
            <div className='row-value-container'>
                {value}
            </div>
            <div className='row-info-image-container'>
                <img alt='Info' src={InfoImg} onClick={toggleInfoDropdown}/>
            </div>
        </div>
        <div
            className={`info-dropdown-container ${
                state.dropdownInfo.open ? "open" : ""
            }`}
        >
            <h2>INFO - {key_}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{info}</p>
        </div>
    </div>
}

export {AuditRow};