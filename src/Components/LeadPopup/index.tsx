import { useState} from "react";
import type { CSSProperties, FormEvent} from "react";
import type {LeadPopupPropsI} from './types.ts';
const LeadPopup = (props: LeadPopupPropsI) => {
    const { isOpen, onClose, onSubmit } = props;
    const [website, setWebsite] = useState("");
    const [date, setDate] = useState("");
    const [companyName, setCompanyName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({
            website,
            date,
            company_name: companyName,
        });

        setWebsite("");
        setDate("");
        setCompanyName("");
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>Trimite Website-ul Tau</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <input
                        type="text"
                        placeholder="Numele companiei"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <div style={styles.actions}>
                        <button style={styles.buttonSend} type="submit">Trimite</button>
                        <button style={styles.buttonCancel} type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "320px",
    },
    input: {
        width: "100%",
        marginBottom: "10px",
        padding: "8px",
        border: "1px solid var(--input-text-color)",
        borderRadius: "calc(var(--spacing-sm)/2)",
        color: "var(--input-text-color)",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    buttonSend: {
        backgroundColor: "var(--success-title-color)",
        border: 0,
        padding: "calc(var(--spacing-sm)/2) var(--spacing-sm)",
        color: "#FFF",
        borderRadius: "calc(var(--spacing-sm)/2)",
        cursor: "pointer"
    },
    buttonCancel: {
        backgroundColor: "var(--red-accent-color)",
        border: 0,
        padding: "calc(var(--spacing-sm)/2) var(--spacing-sm)",
        color: "#FFF",
        borderRadius: "calc(var(--spacing-sm)/2)",
        cursor: "pointer"
    },
    title: {
        fontSize: "1.25em",
        color: "var(--input-text-color)"
    }
};

export {LeadPopup};