import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SendEmail = () => {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [html, setHtml] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/email/send", {
                to,
                subject,
                html,
            });

            setMessage(
                response.data.message ||
                "Email sent successfully"
            );

            setTo("");
            setSubject("");
            setHtml("");
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to send email"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Send Email</h2>

                    <form
                        className="form-card"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Recipient email"
                            value={to}
                            onChange={(e) =>
                                setTo(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                            required
                        />

                        <textarea
                            placeholder="HTML email content"
                            value={html}
                            onChange={(e) =>
                                setHtml(e.target.value)
                            }
                            rows={10}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Email"}
                        </button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </main>
        </div>
    );
};

export default SendEmail;