// src/pages/AdminPage.tsx
import {useEffect, useState} from "react";
import { login, isLoggedIn } from "../../api.ts";
import {AuditTable} from '../../Components';

import type {adminPropsI} from "./types";

const Admin = (props: adminPropsI) => {

    const {title} = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    const handleLogin = async () => {
        setError("");
        try {
            await login(username, password);
            setLoggedIn(true);
        } catch (err: unknown) {
            //@ts-expect-error err must be any or unknown but the IDE consider it an issue
            setError(err);
        }
    };

    useEffect(() => {
        document.title = title || "Admin";
    }, [title]);

    if (loggedIn) {
        return (
            <AuditTable/>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-card">
                <img src="/full_logo.svg" alt="Logo" className="logo" />
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="parola"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <button onClick={handleLogin} className="btn">
                    LOG IN
                </button>
            </div>
        </div>
    );
}

export {Admin};
