import { Routes, Route } from "react-router-dom";
import {Home, TermsAndConditions} from "./Pages";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home title={'Verifica Site'}/>} />
            <Route path="termeni-si-conditii" element={<TermsAndConditions title="Termeni & Conditii"/>}/>
        </Routes>
    );
}

export default App;