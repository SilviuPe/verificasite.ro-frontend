// src/components/AuditTable.tsx
import { useEffect, useState } from "react";
import type { Audit } from "./types";
import type {SortKey, SortDirection} from "./types";
import {logout, exportAuditsExcelByIds, exportAuditsPDFByIds } from '../../api.ts';

const AuditTable = () => {
    const [audits, setAudits] = useState<Audit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [allAudits, setAllAudits] = useState<Audit[]>([]);
    const [filters, setFilters] = useState({
        id: "",
        ip: "",
        url: "",
        html: "",
        scor: "",
        device: "",
        date: ""
    });
    const filterAudits = (data: Audit[]) => {
        return data.filter(audit => {
            const matchId =
                !filters.id ||
                audit.id === Number(filters.id);

            const matchIp =
                !filters.ip ||
                audit.ip.toLowerCase().includes(filters.ip.toLowerCase());

            const matchUrl =
                !filters.url ||
                audit.url.toLowerCase().includes(filters.url.toLowerCase());

            const matchHtml =
                !filters.html ||
                audit.html.toLowerCase().includes(filters.html.toLowerCase());

            const matchScor =
                !filters.scor ||
                audit.scor === Number(filters.scor);

            const matchDevice =
                !filters.device ||
                String(audit.device) === filters.device;

            const matchDate =
                !filters.date ||
                audit.date.startsWith(filters.date);

            return (
                matchId &&
                matchIp &&
                matchUrl &&
                matchHtml &&
                matchScor &&
                matchDevice &&
                matchDate
            );
        });
    };

    useEffect(() => {
        let result = filterAudits(allAudits);

        if (sortKey) {
            result = sortAudits(result, sortKey, sortDirection);
        }

        setAudits(result);
    }, [filters, sortKey, sortDirection, allAudits, filterAudits]);

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    const sortAudits = (
        data: Audit[],
        key: keyof Audit,
        direction: SortDirection
    ) => {
        return [...data].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue == null || bValue == null) return 0;

            // numeric
            if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
            }

            // string
            return direction === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    };

    const handleSort = (key: keyof Audit) => {
        let direction: SortDirection = "asc";

        if (sortKey === key) {
            direction = sortDirection === "asc" ? "desc" : "asc";
        }

        setSortKey(key);
        setSortDirection(direction);
    };

    const copyAuditsToClipboard = () => {
        if (!audits || audits.length === 0) return;

        // header
        const header = ["Id", "IP", "URL", "HTML", "Scor", "Device", "Data"];

        // randuri
        const rows = audits.map(audit => [
            audit.id,
            audit.ip,
            audit.url,
            audit.html,
            audit.scor,
            audit.device === 1 ? "Desktop" : "Mobile",
            audit.date.split("T")[0] + " " + audit.date.split("T")[1].split(".")[0]
        ]);

        // combinam header + randuri
        const allRows = [header, ...rows];

        // generam string cu tab (\t) intre coloane si newline (\n) intre randuri
        const text = "Exported data\n\n" + allRows.map(r => r.join("\t")).join("\n");

        // copiem in clipboard
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Audits copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy audits: ", err);
            });
    };

    const fetchAudits = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Nu esti logat");

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/allaudits`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                if (token) {
                    localStorage.removeItem("access_token");
                    document.location.reload();
                }
                throw new Error(data?.detail || `Request failed (${res.status})`);
            }

            const data = await res.json();
            setAllAudits(data.audits);
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
    if (loading) return <p>Loading...</p>;

    return (
        <div className="audits-page">
            <div className="audits-options">
                <button onClick={copyAuditsToClipboard}>Copy</button>
                <button onClick={() => exportAuditsExcelByIds(audits.map(audit => audit.id))}>Excel</button>
                <button onClick={() => exportAuditsPDFByIds(audits.map(audit => audit.id))}>PDF</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="audits-filters">
                <input
                    type="number"
                    placeholder="Filter ID"
                    value={filters.id}
                    onChange={e => setFilters({ ...filters, id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Filter IP"
                    value={filters.ip}
                    onChange={e => setFilters({ ...filters, ip: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Filter URL"
                    value={filters.url}
                    onChange={e => setFilters({ ...filters, url: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Filter HTML"
                    value={filters.html}
                    onChange={e => setFilters({ ...filters, html: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Filter Scor"
                    value={filters.scor}
                    onChange={e => setFilters({ ...filters, scor: e.target.value })}
                />
                <select
                    value={filters.device}
                    onChange={e => setFilters({ ...filters, device: e.target.value })}
                >
                    <option value="">All devices</option>
                    <option value="1">Desktop</option>
                    <option value="0">Mobile</option>
                </select>

                <input
                    type="date"
                    value={filters.date}
                    onChange={e => setFilters({ ...filters, date: e.target.value })}
                />
            </div>
            <div className="audits-table-container">
                <table className="audits-table-content">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")} className={sortKey === "id" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>ID</th>
                            <th onClick={() => handleSort("ip")} className={sortKey === "ip" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>IP Address</th>
                            <th onClick={() => handleSort("url")} className={sortKey === "url" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>URL</th>
                            <th onClick={() => handleSort("html")} className={sortKey === "html" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>HTML</th>
                            <th onClick={() => handleSort("scor")} className={sortKey === "scor" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>Scor</th>
                            <th onClick={() => handleSort("device")} className={sortKey === "device" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>Device</th>
                            <th onClick={() => handleSort("date")} className={sortKey === "date" ? sortDirection === "asc" ? "sorted-asc" : "sorted-desc" : ""}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        audits.map((audit: Audit, index: number) => (
                            <tr key={`${audit} -- ${audit.id} -- ${index}`}>
                                <td>{audit.id}</td>
                                <td>{audit.ip}</td>
                                <td>{audit.url}</td>
                                <td className="truncate-html-colon">{audit.html}</td>
                                <td>{audit.scor}</td>
                                <td>{audit.device === 1 ? 'Desktop' : 'Mobile'}</td>
                                <td>{audit.date.split('T')[0]} {audit.date.split('T')[1].split('.')[0]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <p style={{fontFamily: "Inter sans, sans-serif", color: 'rgba(0,0,0,0.65)'}}>Showing {audits.length} of {allAudits.length} entries</p>
        </div>
    )
};

export { AuditTable };
