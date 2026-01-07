// Shared TypeScript interfaces for Fitness Demo

export interface Trainer {
    id: string;
    name: string;
    specialty: string;
    bio?: string;
    image: string;
    status: 'Active' | 'Inactive';
    rating?: number;
    sessionsCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    membership: 'Platinum' | 'Infinity';
    status: 'Active' | 'Suspended' | 'Cancelled';
    joinDate: string;
    avatar?: string;
    phone?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Session {
    id: string;
    name: string;
    day: string;
    time: string;
    activity: string;
    gender: 'Hommes' | 'Femmes' | 'Mixte';
    trainerId: string;
    trainer?: Trainer;
    capacity: number;
    booked?: number;
    _count?: {
        bookings: number;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    hours: string;
    image?: string;
    mapUrl?: string;
    status: 'Active' | 'Inactive';
    createdAt?: string;
    updatedAt?: string;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'New' | 'Read' | 'Replied' | 'Archived';
    createdAt: string;
    updatedAt?: string;
}

export interface Booking {
    id: string;
    userId: string;
    sessionId: string;
    session?: Session;
    status: 'Confirmed' | 'Cancelled' | 'Completed';
    createdAt: string;
}

export interface AdminStats {
    totalMembers: number;
    activeSessions: number;
    newInquiries: number;
    revenue: number;
    recentActivity?: Member[];
}
