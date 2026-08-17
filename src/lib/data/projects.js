export const projects = [
    {
        slug: "3dwestern",
        name: "3D Western",
        tagline: "A club website rebuilt around one question: what does a visitor actually need in the first 5 seconds?",
        coverImage: "/placeholder.png",
        role: "UI/UX Designer & Frontend Developer",
        timeline: "Summer 2026 · 6 weeks",
        tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
        liveLink: "https://3dwestern.example.com",

        overview: "The club's old site tried to be an all-in-one tool — booking, blog, events, and equipment info competing for the same homepage real estate. New visitors couldn't tell what to do first.",

        // Each section is a heading + a flexible list of blocks.
        sections: [
            {
                heading: "The Problem",
                blocks: [
                    { type: "text", content: "The president's feedback kept circling back to the same complaint: 'people don't know where to click.' I audited every homepage section against one question — does a first-time visitor need this in the first 5 seconds?" },
                    { type: "image", src: "/placeholder.png", caption: "The old homepage — six competing sections above the fold, no clear entry point." }
                ]
            },
            {
                heading: "Early Brainstorming",
                blocks: [
                    { type: "text", content: "I started with rough sketches exploring three different homepage philosophies: an all-in-one dashboard, a magazine-style feed, and a simple navigator. I threw away the dashboard idea almost immediately — it was just the old site with better spacing." },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/placeholder.png", caption: "Dashboard concept — rejected" },
                            { src: "/placeholder.png", caption: "Navigator concept — chosen direction" }
                        ]
                    },
                    { type: "text", content: "The navigator concept won because it answered a different question than the old site did. Instead of 'how do I fit everything,' it asked 'what does someone do first.'" }
                ]
            },
            {
                heading: "Wireframes & Iteration",
                blocks: [
                    { type: "text", content: "First wireframe pass merged blog and project showcase into a single feed — this came from noticing both sections were answering the same visitor question ('what is this club doing lately')." },
                    { type: "image", src: "/placeholder.png", caption: "Wireframe v1 — merged 'Latest from 3D Western' section" },
                    { type: "text", content: "Feedback from the president's review: the calendar felt buried. I moved it up, even though it cost homepage height." },
                    { type: "image", src: "/placeholder.png", caption: "Wireframe v2 — calendar promoted above equipment section" }
                ]
            },
            {
                heading: "Key Decisions",
                blocks: [
                    {
                        type: "decision",
                        decision: "Merged the blog and project showcase into one section",
                        why: "Both were competing for the same homepage slot and told a similar story. Splitting them forced visitors to check two places for one idea.",
                        tradeoff: "Blog posts and major project features now share visual weight."
                    },
                    {
                        type: "decision",
                        decision: "Kept the calendar section non-negotiable",
                        why: "User and stakeholder feedback both flagged 'when can I show up' as the #1 unanswered question.",
                        tradeoff: "Pushed the equipment/booking section further down the page."
                    },
                    {
                        type: "decision",
                        decision: "Added contextual booking CTAs directly on equipment cards",
                        why: "Reduced the path from 'I want to use the laser cutter' to 'booked' from 3 clicks to 1.",
                        tradeoff: "Required syncing live booking state into what was originally a static card."
                    }
                ]
            },
            {
                heading: "Final Design",
                blocks: [
                    { type: "image", src: "/placeholder.png", caption: "Final homepage — single scan path from hero to calendar to equipment." },
                    { type: "quote", content: "This finally feels like people know where to click." , attribution: "Club president, after review" }
                ]
            },
            {
                heading: "Outcome",
                blocks: [
                    { type: "text", content: "The recurring 'where do I click' complaint stopped coming up in review. The homepage now reads as a map rather than a control panel." }
                ]
            },
            {
                heading: "Reflection",
                blocks: [
                    { type: "text", content: "The trickiest part wasn't the layout — it was letting go of sections I'd already built. Cutting the standalone workshops section felt like wasted work at the time, but the homepage got measurably clearer once it was gone. Next time, I'd user-test the wireframe stage instead of relying only on stakeholder review." }
                ]
            }
        ],

        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"]
    }
];

export function getProjectBySlug(slug) {
    return projects.find(p => p.slug === slug);
}

export function getAdjacentProjects(slug) {
    const i = projects.findIndex(p => p.slug === slug);
    if (i === -1) return { prev: null, next: null };
    return {
        prev: projects[(i - 1 + projects.length) % projects.length],
        next: projects[(i + 1) % projects.length]
    };
}