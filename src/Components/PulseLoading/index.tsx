import {CustomBox} from "../CustomBox";

const PulseLoading = () => {
    return (
        <div className="audit-result-component">
            <div className="audit-result-horizontal-container">
                <div className="audit-result-vertical-section left">
                    <CustomBox pulseDelay={0.5} pulse={true} content={<div style={{height: 200}}></div>}/>
                    <CustomBox pulseDelay={1} pulse={true} content={<div style={{height: 500}}></div>}/>
                </div>
                <div className="audit-result-vertical-section right">
                    <CustomBox pulseDelay={0.1} pulse={true} content={<div style={{height: 500}}></div>}/>
                    <CustomBox pulseDelay={.875} pulse={true} content={<div style={{height: 200}}></div>}/>
                </div>
            </div>
            <div className="audit-result-horizontal-container" style={{width: "100%"}}>
                <div className="audit-result-vertical-container" style={{width: "100%"}}>
                    <div className="left" style={{display:"flex"}}>
                        <CustomBox pulseDelay={0.1} pulse={true} content={<div style={{height: 400}}></div>}/>
                    </div>
                    <div className="right" style={{display:"flex"}}>
                        <CustomBox pulseDelay={0.6} pulse={true} content={<div style={{height: 400}}></div>}/>
                    </div>
                </div>
            </div>
            <div className="audit-result-horizontal-container" style={{width: "100%"}}>
                <div className="audit-result-vertical-container" style={{width: "100%"}}>
                    <div style={{display:"flex", width:"100%"}}>
                        <CustomBox pulseDelay={1.5} pulse={true} content={<div style={{height: 300}}></div>}/>
                    </div>
                </div>
            </div>
            <div className="audit-result-horizontal-container" style={{width: "100%"}}>
                <div className="audit-result-vertical-container" style={{width: "100%"}}>
                    <div style={{display:"flex", width:"100%"}}>
                        <CustomBox pulseDelay={0.6} pulse={true} content={<div style={{height: 100}}></div>}/>
                    </div>
                </div>
            </div>
            <div className="audit-result-horizontal-container" style={{width: "100%"}}>
                <div className="audit-result-vertical-container" style={{width: "100%"}}>
                    <div style={{display:"flex", width:"100%"}}>
                        <CustomBox pulseDelay={0.15} pulse={true} content={<div style={{height: 100}}></div>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {PulseLoading};