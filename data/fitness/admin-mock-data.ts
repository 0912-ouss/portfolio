// Mock data for admin dashboard
// This will be replaced with database queries later

export const mockMembers = [
    {
        id: "1",
        firstName: "Jean-Pierre",
        lastName: "Dubois",
        email: "jp.dubois@email.com",
        membership: "Infinity",
        status: "Active",
        joinDate: "2024-01-15",
        avatar: "JP"
    },
    {
        id: "2",
        firstName: "Marie",
        lastName: "Laurent",
        email: "m.laurent@email.com",
        membership: "Platinum",
        status: "Active",
        joinDate: "2024-02-20",
        avatar: "ML"
    },
    {
        id: "3",
        firstName: "Alexandre",
        lastName: "Moreau",
        email: "a.moreau@email.com",
        membership: "Infinity",
        status: "Active",
        joinDate: "2024-03-10",
        avatar: "AM"
    },
    {
        id: "4",
        firstName: "Sophie",
        lastName: "Bernard",
        email: "s.bernard@email.com",
        membership: "Platinum",
        status: "Suspended",
        joinDate: "2024-01-05",
        avatar: "SB"
    },
    {
        id: "5",
        firstName: "Lucas",
        lastName: "Petit",
        email: "l.petit@email.com",
        membership: "Infinity",
        status: "Active",
        joinDate: "2024-04-01",
        avatar: "LP"
    }
];

export const mockSessions = [
    {
        id: "1",
        name: "Power Lifting Avancé",
        activity: "Force",
        trainer: "Marcus Steiner",
        day: "Lundi",
        time: "07:00 - 08:30",
        capacity: 12,
        booked: 10,
        gender: "Mixte"
    },
    {
        id: "2",
        name: "Yoga Flow Matinal",
        activity: "Yoga",
        trainer: "Elise Fontaine",
        day: "Mardi",
        time: "06:30 - 07:30",
        capacity: 20,
        booked: 18,
        gender: "Mixte"
    },
    {
        id: "3",
        name: "HIIT Cardio Blast",
        activity: "Cardio",
        trainer: "Marcus Steiner",
        day: "Mercredi",
        time: "18:00 - 19:00",
        capacity: 15,
        booked: 15,
        gender: "Mixte"
    },
    {
        id: "4",
        name: "Pilates Precision",
        activity: "Pilates",
        trainer: "Kenji Yamamoto",
        day: "Jeudi",
        time: "12:00 - 13:00",
        capacity: 10,
        booked: 6,
        gender: "Femmes"
    }
];

export const mockTrainers = [
    {
        id: "1",
        name: "Marcus Steiner",
        specialty: "Force & Conditionnement",
        sessions: 24,
        rating: 4.9,
        status: "Active",
        image: "/images/fitness/trainer1.jpg"
    },
    {
        id: "2",
        name: "Elise Fontaine",
        specialty: "Yoga & Méditation",
        sessions: 18,
        rating: 4.8,
        status: "Active",
        image: "/images/fitness/trainer2.jpg"
    },
    {
        id: "3",
        name: "Kenji Yamamoto",
        specialty: "Arts Martiaux & Mobilité",
        sessions: 12,
        rating: 4.95,
        status: "Active",
        image: "/images/fitness/trainer3.jpg"
    }
];

export const mockStats = {
    totalMembers: 847,
    activeMembers: 789,
    monthlyRevenue: "€124,500",
    sessionsToday: 18,
    newSignups: 23,
    attendanceRate: "94%"
};
