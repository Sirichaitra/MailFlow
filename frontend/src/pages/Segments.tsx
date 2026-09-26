import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Segments = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [customerIds, setCustomerIds] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const ids = customerIds
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean);

            const response = await api.post("/segments", {
                name,
                description,
                customerIds: ids,
            });

            setMessage(
                response.data.message ||
                "Segment created successfully"
            );

            setName("");
            setDescription("");
            setCustomerIds("");
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create segment"
            );
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Segments</h2>

                    <form
                        className="form-card"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Segment name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Customer IDs separated by commas"
                            value={customerIds}
                            onChange={(e) =>
                                setCustomerIds(e.target.value)
                            }
                        />

                        <button type="submit">
                            Create Segment
                        </button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </main>
        </div>
    );
};

export default Segments;