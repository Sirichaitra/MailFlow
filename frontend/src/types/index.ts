export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Template {
    _id: string;
    userId: string;
    name: string;
    subject: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Customer {
    _id: string;
    userId: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Segment {
    _id: string;
    name: string;
    description: string;
    customerIds: string[];
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Campaign {
    _id: string;
    name: string;
    subject: string;
    template: Template | string;
    recipients: string[];
    status: string;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Analytics {
    totalCampaigns: number;
    totalCustomers: number;
    totalTemplates: number;
    successfulCampaigns: number;
    failedCampaigns: number;
}