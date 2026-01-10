/**
 * Utility functions for generating realistic person photos
 */

/**
 * Generate a seed from name for consistent photo generation
 * @param name - Full name of the person
 * @returns Numeric seed
 */
function generateSeedFromName(name: string): string {
    // Convert name to a consistent numeric seed
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        const char = name.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Use absolute value and convert to string seed
    return Math.abs(hash).toString();
}

/**
 * Generate a realistic fitness trainer photo URL using Unsplash
 * @param name - Full name of the person
 * @returns Real person photo URL (consistent for same name)
 */
export function generatePersonPhotoUrl(name: string): string {
    // Generate consistent seed from name
    const seed = generateSeedFromName(name);
    
    // Determine gender and trainer type based on name hash (for variety)
    const isMale = Math.abs(parseInt(seed)) % 2 === 0;
    
    // Use Unsplash Source API with fitness trainer keywords
    // This will return real fitness trainer photos like the ones shown
    const keywords = isMale 
        ? 'fitness-trainer,personal-trainer,gym-instructor,man,gym'
        : 'fitness-trainer,personal-trainer,gym-instructor,woman,gym';
    
    // Use consistent seed to get same photo for same name
    return `https://source.unsplash.com/800x1200/?${keywords}&sig=${seed}`;
}

/**
 * Generate a realistic person photo using Unsplash People API
 * @param name - Full name of the person
 * @returns Real person photo URL
 */
export function generateUnsplashPersonPhoto(name: string): string {
    // Generate consistent seed from name
    const seed = generateSeedFromName(name);
    
    // Use Unsplash Source API for real person photos
    // Using people category with consistent seed
    const photoId = parseInt(seed) % 1000; // Use modulo to get reasonable photo IDs
    return `https://source.unsplash.com/800x1200/?person,portrait&sig=${seed}`;
}

/**
 * Get trainer image URL - uses provided image or generates a real fitness trainer photo
 * @param trainer - Trainer object with name and optional image
 * @returns Image URL
 */
export function getTrainerImageUrl(trainer: { name: string; image?: string | null }): string {
    if (trainer.image && trainer.image.trim() !== '') {
        return trainer.image;
    }
    
    // Generate realistic fitness trainer photo using Unsplash
    // Returns real fitness trainer photos matching the style shown
    return generatePersonPhotoUrl(trainer.name);
}

/**
 * Get initials from a name string
 * @param name - Full name (e.g., "John Doe" or "John")
 * @returns Initials (e.g., "JD" or "J")
 */
export function getInitials(name: string): string {
    if (!name || name.trim() === '') return '?';
    
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
