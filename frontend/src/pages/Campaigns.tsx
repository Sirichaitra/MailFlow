import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import type { Campaign, Template } from "../types";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [template, setTemplate] = useState("");
    const [recipients, setRecipients] = useState("");

    const [message, setMessage] = useState("");

    const fetchData = async () => {
        try {
            const [campaignResponse, templateResponse] =
                await Promise.all([
                    api.get("/campaigns"),
                    api.get("/templates"),
                ]);

            setCampaigns(campaignResponse.data);
            setTemplates(
                templateResponse.data.templates || []
            );
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to load campaigns"
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const recipientList = recipients
                .split(",")
                .map((email) => email.trim())
                .filter(Boolean);

            await api.post("/campaigns", {
                name,
                subject,
                template,
                recipients: recipientList,
                status: "draft",
            });

            setMessage("Campaign created successfully");

            setName("");
            setSubject("");
            setTemplate("");
            setRecipients("");

            fetchData();
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create campaign"
            );
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Campaigns</h2>

                    <form
                        className="form-card"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Campaign name"
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

                        <select
                            value={template}
                            onChange={(e) =>
                                setTemplate(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select template
                            </option>

                            {templates.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            placeholder="Recipients separated by commas"
                            value={recipients}
                            onChange={(e) =>
                                setRecipients(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Create Campaign
                        </button>
                    </form>

                    {message && <p>{message}</p>}

                    <div className="list">
                        {campaigns.map((campaign) => (
                            <div
                                className="list-card"
                                key={campaign._id}
                            >
                                <h3>{campaign.name}</h3>

                                <p>
                                    Subject:{" "}
                                    {campaign.subject}
                                </p>

                                <p>
                                    Status:{" "}
                                    {campaign.status}
                                </p>

                                <p>
                                    Recipients:{" "}
                                    {campaign.recipients.length}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Campaigns;