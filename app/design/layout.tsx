import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Design Gallery | OU BERHAYLA',
    description: 'Browse my collection of UI/UX designs, creative visuals, and design work.',
    alternates: {
        canonical: 'https://ouberhayla.com/design',
    },
};

export default function DesignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
