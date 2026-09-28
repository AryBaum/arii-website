import { caseStudyTemplate } from './caseStudyTemplate.js';
import RushHourVid from '$lib/assets/channels/RushHour.mp4';
import RushHourPoster from '$lib/assets/channels/RushHour.jpg';
import PunchInVid from '$lib/assets/channels/PunchIn.mp4';
import PunchInPoster from '$lib/assets/channels/PunchIn.jpg';
import AboutMiiVid from '$lib/assets/channels/AboutMii.mp4';
import AboutMiiPoster from '$lib/assets/channels/AboutMii.jpg';
import SliderVid from '$lib/assets/channels/Slider.mp4';
import SliderPoster from '$lib/assets/channels/Slider.jpg';
import LoadingIconVid from '$lib/assets/channels/LoadingIcon.mp4';
import LoadingIconPoster from '$lib/assets/channels/LoadingIcon.jpg';
import DontDieVid from '$lib/assets/channels/DontDie.mp4';
import DontDiePoster from '$lib/assets/channels/DontDie.jpg';
import ResumeVid from '$lib/assets/channels/Resume.mp4';
import ResumePoster from '$lib/assets/channels/Resume.jpg';

// Every channel on the Wii Menu, in order. This is the single source of truth:
// the grid, the channel popup ("Details") and the case-study pages all read from here.
//
// - preview:     looping video + poster frame shown on the tile and in the popup
// - description: short blurb shown under "Details" in the popup
// - route:       optional custom page (e.g. /resume). Otherwise, a channel with
//                `sections` opens its case study at /projects/<slug>, and a channel
//                without `sections` shows "Coming soon" when you press Start.
export const projects = [
    {
        slug: "rushhour",
        name: "Rush Hour",
        preview: { video: RushHourVid, poster: RushHourPoster },
        description: ""
    },
    {
        slug: "punch-in",
        name: "Punch-In",
        preview: { video: PunchInVid, poster: PunchInPoster },
        description: ""
    },
    {
        slug: "about",
        name: "About Mii",
        preview: { video: AboutMiiVid, poster: AboutMiiPoster },
        description: ""
    },
    {
        slug: "slider",
        name: "Slider",
        preview: { video: SliderVid, poster: SliderPoster },
        description: ""
    },
    {
        slug: "loadingicon",
        name: "Loading Icon",
        preview: { video: LoadingIconVid, poster: LoadingIconPoster },
        description: ""
    },
    {
        slug: "dontdie",
        name: "Don't Die",
        preview: { video: DontDieVid, poster: DontDiePoster },
        description: ""
    },
    {
        slug: "resume",
        name: "Resume",
        preview: { video: ResumeVid, poster: ResumePoster },
        description: "My resume. View it here or download the PDF.",
        route: "/resume"
    },
    {
        slug: "3dwestern",
        name: "3D Western",
        tagline: "Designing a website for 3D Western that serves as a daily resource hub for students and a community showcase for sponsors.",
        coverImage: "/placeholder.png",
        preview: { video: RushHourVid, poster: RushHourPoster },
        description: "A resource hub for students and a community showcase for sponsors, designed for 3D Western.",
        role: "Lead UI/UX Designer & Frontend Developer",
        timeline: "Summer 2026 – Present (Ongoing Iteration)",
        tools: ["Figma", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
        liveLink: "https://3dwestern.ca",

        overview: "3D Western is a university-backed organization providing free access to manufacturing tools like 3D printing and CNC. The website acts as the critical entry gate for the organization. My ongoing role is to continuously design and develop a platform that successfully routes students into mandatory safety training and operational dashboards, while simultaneously serving as a compelling, mixed-media showcase to secure institutional sponsors.",

        sections: [
            {
                heading: "The Problem: The Dual-Audience Gateway",
                blocks: [
                    { type: "text", content: "The original 3D Western website was visually unpolished and lacked clear user journeys. Based on a high-level vision document from the club's president, the site needed to serve two distinct, almost opposing functions. First, it had to act as a strict funnel, directing students to external OWL Brightspace training and dashboard logins. Second, it had to act as a rich portfolio to prove community impact to potential and current sponsors. The UX challenge was balancing strict utility with visual storytelling." },
                    { type: "image", src: "/placeholder.png", caption: "The original website, which struggled to clearly direct users to their required destinations." }
                ]
            },
            {
                heading: "Information Architecture: Signposting the Funnel",
                blocks: [
                    { type: "text", content: "Rather than building complex, custom authentication flows directly on the marketing site, I focused on strategic signposting. I designed a clear hierarchy of Calls to Action (CTAs) that act as the front door. By designing distinct, highly visible entry points for 'Training' and 'Dashboard Login', the website effectively catches student traffic and cleanly routes them to the correct external platforms without overwhelming them with text." },
                    { type: "image", src: "/placeholder.png", caption: "The UI layout showing the strategic placement of Brightspace and Dashboard routing buttons." }
                ]
            },
            {
                heading: "The Explore Page: Proving Impact to Sponsors",
                blocks: [
                    { type: "text", content: "To satisfy the sponsorship requirement without having hard data metrics available yet, I designed a modular 'Explore' page. This page aggregates the club's qualitative impact. I structured the layout to seamlessly blend different types of content: student project showcases (pairing written experiences with build photos), club blogs, and a dynamic Instagram feed carousel. A dedicated sponsor carousel was integrated natively into this page to give existing backers visibility alongside the very projects they helped fund." },
                    { type: "image", src: "/placeholder.png", caption: "The Explore page layout, combining student stories, blogs, and the sponsor carousel." }
                ]
            },
            {
                heading: "Key Design Decisions",
                blocks: [
                    {
                        type: "decision",
                        decision: "Pivoted to a 'Tech-Forward' Dark Theme",
                        why: "To elevate the organization from a 'passion club' to an official Morrissette partner, I utilized the branding team's colors to build a sleek, dark-themed component library.",
                        tradeoff: "Required strict adherence to WCAG contrast ratios to ensure typography and CTAs remained accessible and legible to all students."
                    },
                    {
                        type: "decision",
                        decision: "Removed the 3D Lottie animation from the Hero Section",
                        why: "The original site relied on a 3D model that caused severe loading delays. I replaced it with an optimized, lazy-loaded video hero showcasing the physical machinery.",
                        tradeoff: "Sacrificed a novelty interaction in favor of a massive boost to page load speeds (Core Web Vitals), getting students to the information they needed faster."
                    },
                    {
                        type: "decision",
                        decision: "Modular Component Design for a 'Living' Site",
                        why: "Because this website is an ongoing, evolving project throughout the school year, I designed the UI using highly modular, reusable components in Figma.",
                        tradeoff: "Required more upfront setup time in Figma and Next.js, but ensures my teammate and I can rapidly push updates as the club's requirements change."
                    }
                ]
            },
            {
                heading: "The Final Polish",
                blocks: [
                    { type: "image", src: "/placeholder.png", caption: "The final homepage, establishing a tech-forward identity while quickly routing users to their goals." },
                    { type: "image", src: "/placeholder.png", caption: "The mixed-media Explore gallery." }
                ]
            },
            {
                heading: "Reflection: Navigating Indirect Communication",
                blocks: [
                    { type: "text", content: "This project has been a massive learning experience in real-world stakeholder management and designing through ambiguity. Because our club operates in silos, direct communication with the President—who set the original vision—is rare. Instead, I rely on bi-weekly syncs with the VP team to translate high-level, sometimes shifting requirements into tangible UI.\n\nI learned that in environments with indirect communication, high-fidelity prototypes are your best tool. Instead of debating abstract ideas, putting a concrete Figma screen in front of the VPs allowed us to quickly test assumptions, scrap what didn't work, and find the right balance between what leadership envisioned and what is actually practical to build." }
                ]
            }
        ], 
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"]
    }
];

/** @param {any} p */
export const hasCaseStudy = (p) => Array.isArray(p?.sections) && p.sections.length > 0;

/**
 * Where pressing Start on a channel goes, or null if it's still coming soon.
 * @param {any} p
 */
export function getChannelRoute(p) {
    if (p.route) return p.route;
    return hasCaseStudy(p) ? `/projects/${p.slug}` : null;
}

/** @param {string} slug */
export function getProjectBySlug(slug) {
    if (slug === caseStudyTemplate.slug) return caseStudyTemplate;
    return projects.find(p => p.slug === slug && hasCaseStudy(p));
}

// Prev/next on a case study only cycles through channels that have a case study.
/** @param {string} slug */
export function getAdjacentProjects(slug) {
    const studies = projects.filter(p => hasCaseStudy(p) && !p.route);
    const i = studies.findIndex(p => p.slug === slug);
    if (i === -1 || studies.length < 2) return { prev: null, next: null };
    return {
        prev: studies[(i - 1 + studies.length) % studies.length],
        next: studies[(i + 1) % studies.length]
    };
}
