import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | OU BERHAYLA',
    description: 'Explore my portfolio of web design projects, UI/UX designs, and creative digital solutions.',
    alternates: {
        canonical: 'https://ouberhayla.com/projects',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
