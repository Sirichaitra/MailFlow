import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import type { Template } from "../types";

const Templates = () => {
    const [templates, setTemplates] = useState<Template[]>([]);

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const [message, setMessage] = useState("");

    const fetchTemplates = async () => {
        try {
            const response = await api.get("/templates");

            setTemplates(response.data.templates || []);
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch templates"
            );
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/templates", {
                name,
                subject,
                content,
            });

            setMessage(
                response.data.message ||
                "Template created successfully"
            );

            setName("");
            setSubject("");
            setContent("");

            fetchTemplates();
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create template"
            );
        }
    };

    const deleteTemplate = async (id: string) => {
        try {
            await api.delete(`/templates/${id}`);

            fetchTemplates();
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete template"
            );
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Email Templates</h2>

                    <form
                        className="form-card"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Template name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
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
                            placeholder="Email content"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Create Template
                        </button>
                    </form>

                    {message && <p>{message}</p>}

                    <div className="list">
                        {templates.map((template) => (
                            <div
                                className="list-card"
                                key={template._id}
                            >
                                <h3>{template.name}</h3>

                                <p>
                                    <strong>
                                        Subject:
                                    </strong>{" "}
                                    {template.subject}
                                </p>

                                <p>
                                    {template.content}
                                </p>

                                <button
                                    onClick={() =>
                                        deleteTemplate(
                                            template._id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Templates;