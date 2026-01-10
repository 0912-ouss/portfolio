export function StructuredData() {
    const baseUrl = 'https://ouberhayla.com';
    
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "OU BERHAYLA",
        "jobTitle": "UI/UX Designer",
        "url": baseUrl,
        "sameAs": [
            "https://www.linkedin.com/in/ouberhayla",
            "https://www.instagram.com/ouberhayla",
            "https://twitter.com/ouberhayla"
        ],
        "description": "Creative UI & UX Designer specializing in modern and premium digital experiences, web design, and creative solutions for luxury brands.",
        "knowsAbout": ["UI Design", "UX Design", "Web Design", "Creative Design", "Luxury Brand Design"],
        "image": `${baseUrl}/og-image.jpg`
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "OU BERHAYLA Portfolio",
        "url": baseUrl,
        "description": "Modern & Premium UI/UX design portfolio showcasing high-end digital experiences",
        "author": {
            "@type": "Person",
            "name": "OU BERHAYLA"
        }
    };

    const portfolioSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${baseUrl}/#portfolio`,
        "name": "OU BERHAYLA Portfolio",
        "creator": {
            "@type": "Person",
            "name": "OU BERHAYLA"
        },
        "about": {
            "@type": "Thing",
            "name": "UI/UX Design"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
            />
        </>
    );
}
