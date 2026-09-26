import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Customers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/customers", {
                name,
                email,
            });

            setMessage(
                response.data.message ||
                "Customer created successfully"
            );

            setName("");
            setEmail("");
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create customer"
            );
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Customers</h2>

                    <form
                        className="form-card"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Customer name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                        <input
                            type="email"
                            placeholder="Customer email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Add Customer
                        </button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </main>
        </div>
    );
};

export default Customers;