// src/components/AuditTable.tsx
import { useEffect, useState } from "react";
import type { Audit } from "./types";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

const AuditTable = () => {
    const [audits, setAudits] = useState<Audit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAudits = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Nu esti logat");

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/admin/audits`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.detail || `Request failed (${res.status})`);
            }

            const data = await res.json();
            setAudits(data.audits);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudits();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className="audits-page">
            <div className="audits-options">
                <button>Copy</button>
                <button>Excel</button>
                <button>PDF</button>
            </div>
        </div>
    )
};

export { AuditTable };
