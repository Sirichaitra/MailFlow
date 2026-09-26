import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import type { Analytics } from "../types";

const Dashboard = () => {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get("/analytics");
                setAnalytics(response.data);
            } catch (error: any) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <div className="page-content">
                    <h2>Dashboard</h2>

                    {loading && <p>Loading...</p>}

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    {analytics && (
                        <div className="dashboard-grid">
                            <div className="stat-card">
                                <h3>Total Campaigns</h3>
                                <p>
                                    {analytics.totalCampaigns}
                                </p>
                            </div>

                            <div className="stat-card">
                                <h3>Total Customers</h3>
                                <p>
                                    {analytics.totalCustomers}
                                </p>
                            </div>

                            <div className="stat-card">
                                <h3>Total Templates</h3>
                                <p>
                                    {analytics.totalTemplates}
                                </p>
                            </div>

                            <div className="stat-card">
                                <h3>Successful Campaigns</h3>
                                <p>
                                    {analytics.successfulCampaigns}
                                </p>
                            </div>

                            <div className="stat-card">
                                <h3>Failed Campaigns</h3>
                                <p>
                                    {analytics.failedCampaigns}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;