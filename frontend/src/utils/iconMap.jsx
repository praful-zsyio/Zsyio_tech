import * as LucideIcons from "lucide-react";

/**
 * Mapping of common service/tech names to Lucide icons.
 * This ensures that even if the backend icon name is missing or non-existent,
 * we can still show a relevant icon.
 */
export const iconMapping = {
    // Services
    "cloud web hosting": "Cloud",
    "cloud hosting": "Cloud",
    "web development": "Code",
    "frontend development": "Monitor",
    "backend development": "Server",
    "mobile app development": "Smartphone",
    "mobile development": "Smartphone",
    "ui/ux design": "Palette",
    "design": "Palette",
    "digital marketing": "TrendingUp",
    "seo optimization": "Search",
    "e-commerce": "ShoppingBag",

    // Technologies
    "react": "Atom",
    "react.js": "Atom",
    "next.js": "Globe",
    "vue": "Layers",
    "angular": "Shield",
    "django": "Shield",
    "python": "Terminal",
    "nodejs": "Server",
    "node.js": "Server",
    "mongodb": "Database",
    "postgresql": "Database",
    "sql": "Database",
    "aws": "Cloud",
    "azure": "Cloud",
    "docker": "Box",
    "kubernetes": "Cloud",
    "tailwind": "Layout",
    "tailwindcss": "Layout",
    "javascript": "FileJson",
    "typescript": "ShieldCheck",
};

/**
 * Robust icon getter that tries:
 * 1. The provided icon name exactly
 * 2. Capitalized icon name
 * 3. Mapping based on the title/name
 * 4. Fallback to HelpCircle
 */
export const getIcon = (nameOrIcon, title) => {
    if (!nameOrIcon && !title) return LucideIcons.HelpCircle;

    // 1. Try provided icon string directly
    if (nameOrIcon) {
        if (LucideIcons[nameOrIcon]) return LucideIcons[nameOrIcon];

        // 2. Try capitalized
        const capitalized = nameOrIcon.charAt(0).toUpperCase() + nameOrIcon.slice(1);
        if (LucideIcons[capitalized]) return LucideIcons[capitalized];
    }

    // 3. Try mapping by title
    if (title) {
        const lowerTitle = title.toLowerCase().trim();
        // Exact match in mapping
        if (iconMapping[lowerTitle]) {
            const mappedIcon = iconMapping[lowerTitle];
            return LucideIcons[mappedIcon] || LucideIcons.HelpCircle;
        }

        // Partial match in mapping
        for (const [key, icon] of Object.entries(iconMapping)) {
            if (lowerTitle.includes(key)) {
                return LucideIcons[icon] || LucideIcons.HelpCircle;
            }
        }
    }

    return LucideIcons.HelpCircle;
};
