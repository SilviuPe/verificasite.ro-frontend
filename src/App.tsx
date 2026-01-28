import { Routes, Route } from "react-router-dom";
import {Home, TermsAndConditions, Admin} from "./Pages";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home title={'Verifica Site'}/>} />
            <Route path="termeni-si-conditii" element={<TermsAndConditions title="Termeni & Conditii"/>}/>
            <Route path="/admin" element={<Admin/>} />
        </Routes>
    );
}

export default App;