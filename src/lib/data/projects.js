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
import ThrowbackVid from '$lib/assets/channels/Throwback.mp4';
import ThrowbackPoster from '$lib/assets/channels/Throwback.jpg';
import DashboardVid from '$lib/assets/channels/Dashboard3DW.mp4';
import DashboardPoster from '$lib/assets/channels/Dashboard3DW.jpg';
import WebsiteVid from '$lib/assets/channels/Website3DW.mp4';
import WebsitePoster from '$lib/assets/channels/Website3DW.jpg';

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
        slug: "about",
        name: "About Mii",
        preview: { video: AboutMiiVid, poster: AboutMiiPoster },
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
        slug: "3dw-dashboard",
        name: "3DW Dashboard",
        tagline: "Turning an unfinished member dashboard into one clear place for Western students to submit and track their 3D prints.",
        coverImage: "/projects/3dw-dashboard/cover.webp",
        preview: { video: DashboardVid, poster: DashboardPoster },
        description: "Redesigning and rebuilding 3D Western's member dashboard so students always know what stage their print is in and what to do next. In progress.",
        role: "UI/UX Designer & Front-End Developer",
        timeline: "Oct 2026 – ongoing · pre-launch",
        tools: ["Figma", "FigJam", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],

        overview: "The 3D Western dashboard is where Western students submit and track 3D print jobs at the makerspace. I joined its front-end team in October 2026, just before launch, to fix an experience that was never finished. I'm redesigning and rebuilding it around one question: does a student know what stage their print is in, and what to do next?",

        sections: [
            {
                heading: "The Problem",
                blocks: [
                    {
                        type: "list",
                        items: [
                            "Three job pages, two of which showed the same data in different ways.",
                            "A job flow that skipped the real process. Jobs went straight from \"uploaded\" to \"in queue\", even though staff review every print first.",
                            "A create-job form with a red rate-limit warning that made it look like you weren't allowed to submit.",
                            "A look that didn't match the 3D Western website, so the brand felt like two products."
                        ]
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/before-print-history.webp", caption: "Before: Print History" },
                            { src: "/projects/3dw-dashboard/before-my-jobs.webp", caption: "Before: My Jobs, the same data as a table" }
                        ]
                    }
                ]
            },
            {
                heading: "Designing the Job Flow Around Reality",
                blocks: [
                    { type: "text", content: "I ran a FigJam board with the team to map how a print actually moves through the makerspace: Draft → Submitted for review → In queue → Printing → Ready for pickup, with a Declined branch where staff explain what to fix.\n\nThen I checked every stage and feature against what the backend could support. Much of it didn't exist yet, like the review stage, drafts, priority requests and status emails." },
                    { type: "image", src: "/projects/3dw-dashboard/figjam-lifecycle.webp", caption: "The FigJam board mapping every job stage, what each one needs to show, and ideas for the dashboard home." },
                    {
                        type: "decision",
                        decision: "Turned missing features into backend requests instead of cutting them",
                        why: "I wrote a shared requirements doc with 29 requests for the backend team, each with why the interface needs it. I built every job stage as its own piece of the interface, so a new stage is a small change in one place, not a redesign.",
                        tradeoff: "Some of the designed flow can't launch on day one, but none of it is faked, and it can ship as the backend catches up."
                    }
                ]
            },
            {
                heading: "One Jobs Page, and a Page for Every Job",
                blocks: [
                    { type: "text", content: "I merged the three job pages into one. Every job is a card with a status colour, a plain-English line like \"Your design is printing,\" and one obvious next action." },
                    { type: "image", src: "/projects/3dw-dashboard/my-jobs-list.webp", caption: "The unified My Jobs page." },
                    {
                        type: "decision",
                        decision: "A card list with page numbers, plus a table for power users",
                        why: "Students with 3 jobs never see page numbers, and students with 200 keep their place when they open a job and go back, which \"Load more\" can't do. Heavy users like entrepreneur accounts can switch to a compact table.",
                        tradeoff: "Two layouts to maintain for the same data."
                    },
                    { type: "image", src: "/projects/3dw-dashboard/my-jobs-table.webp", caption: "The compact table view, for students who print a lot." },
                    {
                        type: "decision",
                        decision: "A dedicated page for each job instead of a popup",
                        why: "There's too much per job for a popup on a phone. A real page also gives every job a link that future \"your print is ready\" emails can point to. Its top panel changes with the stage: a progress bar while printing, pickup details when ready, and the reason plus next steps when declined.",
                        tradeoff: "Opening a job is a full page change instead of a quick peek."
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/details-printing.webp", caption: "A job that's printing" },
                            { src: "/projects/3dw-dashboard/details-failed.webp", caption: "A failed print, with what went wrong and what to do next" }
                        ]
                    }
                ]
            },
            {
                heading: "A Form That Says Yes",
                blocks: [
                    { type: "text", content: "Every student used to see a red warning that their project was \"subject to heavy rate limiting.\" I replaced it with a neutral meter (\"3 of 5 prints left this month\") so students know where they stand before they start. I also turned form labels into plain questions like \"What's it for?\", with options you tap instead of a dropdown and jargon-heavy radio buttons." },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/form-before-top.webp", caption: "Before: the top of the form" },
                            { src: "/projects/3dw-dashboard/form-before-bottom.webp", caption: "Before: a red rate-limit warning, a dropdown and dense radio options" }
                        ]
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/form-top.webp", caption: "After: the usage meter, shown here for a student who's out of prints" },
                            { src: "/projects/3dw-dashboard/form-bottom.webp", caption: "After: plain questions with tappable choices" }
                        ]
                    }
                ]
            },
            {
                heading: "One Brand Across Two Products",
                blocks: [
                    { type: "text", content: "I brought the design system from my 3D Western website redesign into the dashboard, with the same colours, typefaces, buttons and logos, and added a light mode built from the same palette. I also gave every job stage its own colour, used everywhere a job appears, with text shades adjusted so they stay readable in both modes." },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/brand-website.webp", caption: "The 3D Western website" },
                            { src: "/projects/3dw-dashboard/brand-dashboard.webp", caption: "The dashboard, in the same visual language" }
                        ]
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-dashboard/login-dark.webp", caption: "Dark mode, the default, matching the website" },
                            { src: "/projects/3dw-dashboard/login-light.webp", caption: "Light mode, built from the same palette" }
                        ]
                    }
                ]
            },
            {
                heading: "Where It Stands",
                blocks: [
                    {
                        type: "list",
                        items: [
                            "3 job pages became 1, with a clear stage and next step for every job.",
                            "One visual system across the website and dashboard.",
                            "Thumb-friendly controls from testing the whole flow on a real phone.",
                            "29 backend requests that let the review stage, priority requests and status emails ship next."
                        ]
                    },
                    { type: "text", content: "The biggest lesson: check the design against real data before building it. Doing that early is why the popup became a page and the \"top xx% user\" badge waited (it would have told new users they were in the top 92%). It also turned \"we can't do that yet\" into a plan instead of a dead end." }
                ]
            }
        ]
    },
    {
        slug: "3dwestern",
        name: "3DW Website",
        tagline: "Redesigning 3D Western's website to get students to training and the dashboard fast, while showing sponsors what the makerspaces make possible.",
        coverImage: "/projects/3dw-website/cover.webp",
        preview: { video: WebsiteVid, poster: WebsitePoster },
        description: "A full redesign of the 3D Western Makerspaces website, built to route students to training and the dashboard and to show sponsors the community's impact. Launching soon.",
        role: "UI/UX Designer & Front-End Developer",
        timeline: "Summer 2026 – ongoing · launching soon",
        tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],

        overview: "3D Western started as a student 3D printing club and has grown into two makerspaces at Western University, partnered with Morrissette Entrepreneurship, where any student can use 3D printers, laser cutters, CNC machines, a waterjet and woodworking tools for free. Its website hadn't grown with it. I redesigned every page and built the site's front end, guided by the president's vision and bi-weekly syncs with the VPs, while a teammate set up the content management system. It launches alongside the new member dashboard.",

        sections: [
            {
                heading: "The Problem",
                blocks: [
                    { type: "text", content: "The old site was visually unpolished, slow to load and didn't give visitors a clear path anywhere. It also had to serve two audiences who want almost opposite things:" },
                    {
                        type: "list",
                        items: [
                            "Students need to get to mandatory safety training and the job dashboard, both of which live on separate platforms, as quickly as possible.",
                            "Sponsors and the university need to see what the makerspaces actually produce, so they keep supporting them."
                        ]
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-website/before-hero.webp", caption: "Before: a 3D model hero that was slow to load" },
                            { src: "/projects/3dw-website/after-hero.webp", caption: "After: a video hero of the machines, with clear next steps" }
                        ]
                    }
                ]
            },
            {
                heading: "A Clear Path for Students",
                blocks: [
                    {
                        type: "decision",
                        decision: "Signposted training and the dashboard instead of rebuilding them",
                        why: "Training lives on Western's learning platform (OWL Brightspace) and print jobs live in the dashboard. Instead of copying either into a marketing site, I made them the two buttons that are always in the header, \"Training\" and \"Go To Dashboard\", so students are one click from where they need to go on every page.",
                        tradeoff: "Students leave the website to finish those tasks, so each destination has to make sense on its own."
                    },
                    { type: "text", content: "I also restructured the navigation around what visitors come for (About Us, Explore, Events, Blog and Projects) and designed a Training page that lays out the path step by step: complete the required Level 1 safety training first, then choose a certification track." },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-website/training.webp", caption: "The Training page: Level 1 first, then pick a track" },
                            { src: "/projects/3dw-website/events.webp", caption: "The events calendar, which the dashboard links to" }
                        ]
                    }
                ]
            },
            {
                heading: "Showing Impact Without Metrics",
                blocks: [
                    { type: "text", content: "Sponsors want proof of impact, but the club didn't have hard data yet. So I designed the Explore, Projects and Blog pages to make the case with stories: student project showcases that pair builds with their makers, a rotating student spotlight, announcements and a social feed. I also built a sponsor carousel that sits alongside the projects sponsors help fund. It's ready to fill as the club signs more sponsors." },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-website/explore-showcase.webp", caption: "The Projects Showcase on the Explore page" },
                            { src: "/projects/3dw-website/explore-spotlight.webp", caption: "Student Spotlight, telling the story behind a project" }
                        ]
                    }
                ]
            },
            {
                heading: "A Tech-Forward Identity",
                blocks: [
                    {
                        type: "decision",
                        decision: "Moved from a light theme to a dark, tech-forward one",
                        why: "The partnership with Morrissette Entrepreneurship turned a passion club into an official university makerspace, and the site needed to look the part. I built a dark component library from the branding team's colours, with purple accents and three typefaces, that the member dashboard now shares.",
                        tradeoff: "Dark themes make contrast easy to get wrong, so I checked text and buttons against WCAG contrast guidelines throughout."
                    },
                    {
                        type: "decision",
                        decision: "Replaced the 3D model hero with a video of the real machines",
                        why: "The 3D model was a fun novelty, but it delayed the page loading, which is the opposite of what a student trying to reach training needs. A lazy-loaded video loads faster and shows the actual equipment.",
                        tradeoff: "We gave up a memorable interaction in exchange for speed and a more honest picture of the space."
                    },
                    {
                        type: "imageRow",
                        images: [
                            { src: "/projects/3dw-website/before-makerspaces.webp", caption: "Before: The Makerspaces section" },
                            { src: "/projects/3dw-website/after-makerspaces.webp", caption: "After: the same content in the new identity" }
                        ]
                    }
                ]
            },
            {
                heading: "Where It Stands",
                blocks: [
                    {
                        type: "list",
                        items: [
                            "Every page redesigned, from the homepage to new Explore, Events, Blog, Projects and Training pages.",
                            "Training and the dashboard are one click away from every page.",
                            "A design system shared with the member dashboard, so both feel like one brand.",
                            "Built from reusable components so the team can keep updating it through the school year. The site launches together with the dashboard."
                        ]
                    },
                    { type: "text", content: "The biggest lesson was designing through indirect communication. I rarely spoke with the president who set the vision, so I worked through bi-weekly syncs with the VPs. High-fidelity prototypes became my best tool: instead of debating abstract ideas, a concrete Figma screen let us test assumptions quickly, scrap what didn't work, and balance what leadership imagined with what was practical to build." }
                ]
            }
        ]
    },
    {
        slug: "throwback",
        name: "Throwback",
        tagline: "A mobile app concept for reconnecting with friends from every school you've been to, from elementary to university, even when their names, faces and handles have changed.",
        coverImage: "/projects/throwback/cover.webp",
        preview: { video: ThrowbackVid, poster: ThrowbackPoster },
        description: "A 24-hour mobile app concept for reconnecting with old school friends. Won Most Accessible at Western Founders Network's Product Design Sprint.",
        role: "Product Designer · Team of 3",
        timeline: "24-hour design sprint · March 2026",
        tools: ["Framer"],
        award: "Most Accessible by Telus, Western Founders Network Product Design Sprint",
        liveLink: "https://beloved-gecko-707341.framer.app/",
        liveLinkLabel: "View Presentation Site",

        overview: "At Western Founders Network's Product Design Sprint, my team had 24 hours to answer an open-ended brief: recapture what made the internet of 2016 feel so alive, in a way that works for people today. We designed Throwback, a free mobile app that helps people find old classmates through the schools and graduating years they shared, not the names and handles they may have changed since, with layered verification so reconnecting stays safe. As the team's designer, I sketched and designed the low-fidelity screens and set the direction, then built the high-fidelity Framer prototype together with my two teammates, who came from development backgrounds. Throwback won the Most Accessible award, presented by Telus, at an event of about 150 participants.",

        sections: [
            {
                heading: "The Brief: Bring Back 2016",
                blocks: [
                    { type: "text", content: "The sprint's brief was intentionally open. 2016 had a distinct texture, and today's internet, smoother, faster and more personalized, has sanded a lot of it away. Our job was to turn that feeling into a how-might-we problem and design a product that brings some of it back for people today. The brief offered threads to pull on, from lo-fi imperfection to serendipity to the archive of our past selves, but we kept coming back to community.\n\nWhen my teammates and I thought back to 2016, we all landed on the same thing: the friends we saw every day in elementary school. Most of us went on to different high schools and slowly lost touch. Nobody had a falling out. We just drifted. And it doesn't stop at elementary school: it happens again between high school and university, and every time someone switches schools or moves.\n\nWhen we talked about actually finding those people again, the problem became clear. Social platforms assume you already know who you're looking for. Ten years later, people look different, they've changed their handles, and some have changed their last names. The thing we still share with them, the school and the year, is the one thing no search bar lets you search by.\n\nWe weren't alone in this. In a 2024 study by psychologists at the University of Sussex and Simon Fraser University, 90% of participants had lost touch with a friend they still cared about, yet most felt hesitant about reaching back out. That told us finding people was only half the problem. Reaching out also had to feel less awkward." },
                    { type: "quote", content: "How might we help people find and reconnect with friends they've lost touch with, when their names, faces and social handles may all have changed?", attribution: "Our problem statement" }
                ]
            },
            {
                heading: "Who We Designed For",
                blocks: [
                    { type: "text", content: "We built our persona, Julie Ferazzo, a 20-year-old second-year Biology student at Western University in London, Ontario. She misses the community she grew up with, but between classes and a busy schedule, she doesn't have the time or nerve for awkward one-off messages to people she hasn't talked to in years." },
                    { type: "image", src: "/projects/throwback/persona.webp", caption: "Julie's needs, goals, pains and concerns." },
                    { type: "text", content: "Each of Julie's needs became a feature we had to answer for:" },
                    {
                        type: "list",
                        items: [
                            "School-specific filtering → Find suggests people by school, graduating class and area.",
                            "Customizable organization → the Throwback Board, a home screen she arranges herself.",
                            "Low-commitment engagement → automatic school group chats and pinned friends, so reconnecting can start in a group instead of a cold message.",
                            "Event transparency → every event shows its host, location, date and who's attending before she RSVPs, which also answers her worry about showing up to an empty party."
                        ]
                    }
                ]
            },
            {
                heading: "The Concern That Reshaped the Brief",
                blocks: [
                    { type: "text", content: "Writing out Julie's concerns surfaced a problem we hadn't planned for: safety and creeps. An app that matches you with people from your past works a lot like a matchmaking app, and that makes it attractive to stalkers and to people who fake an identity to get close to someone. If users couldn't trust that the person messaging them was really their old classmate, the whole idea fell apart.\n\nSo safety became a design requirement, not a feature. We looked at how schools already verify students, and found that every option on its own had a gap. School emails get deleted after you graduate (several of ours, like our old TVDSB accounts, were already gone). Not everyone kept their old student card. Photos alone are easy to fake. We worked through those edge cases on paper, from schools that aren't in our list to names that can't be found in school records." },
                    { type: "image", narrow: true, src: "/projects/throwback/sketch-edge-cases.webp", caption: "Early notes on edge cases: a school that can't be found, a name that isn't in school records, and checking age with ID." },
                    { type: "text", content: "Instead of relying on one check, we layered them:" },
                    {
                        type: "list",
                        items: [
                            "Prove you're you: a government ID, like a driver's licence, confirms a user's real name and age.",
                            "Prove you were there: an old student card or a school email that still works ties a user to the schools on their profile.",
                            "Let people recognize you: every profile pairs a \"then\" photo with a \"now\" photo, so classmates can recognize each other the way they actually remember one another."
                        ]
                    },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/lofi-profile.webp", caption: "Lo-fi profile with the then-and-now photo slots" },
                            { src: "/projects/throwback/profile.webp", caption: "Final profile: then-and-now photos, schools, contacts and polaroid snapshots" }
                        ]
                    }
                ]
            },
            {
                heading: "From Sketches to Structure",
                blocks: [
                    { type: "text", content: "With 24 hours, we kept everything rough until it had to be real. We started on paper with logo directions, account creation, messaging and group chats, then I designed low-fidelity wireframes in GoodNotes on my iPad for the five core screens: the Throwback Board, Friends, Groups, Events and Profile. From there, I handed screens to my teammates to build out in high fidelity while I kept designing, and we brought everything together in Framer.\n\nThe core idea stayed steady through the sprint, so most of our iteration went into making each screen feel familiar enough that nobody would need to learn it." },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/sketch-logo.webp", caption: "Logo sketches: the rewind symbol that became the home button" },
                            { src: "/projects/throwback/sketch-account-messages.webp", caption: "Account creation and messaging" },
                            { src: "/projects/throwback/sketch-group-chats.webp", caption: "Creating and searching for group chats by school" }
                        ]
                    }
                ]
            },
            {
                heading: "The Product",
                blocks: [
                    { type: "subheading", content: "The Throwback Board" },
                    { type: "text", content: "The home screen is a dashboard users make their own. They pin friends for one-tap chats, jump into their school group chats, and see upcoming reunions with a countdown, so the people and plans they care about are the first thing they see." },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/lofi-board.webp", caption: "Lo-fi board" },
                            { src: "/projects/throwback/board.webp", caption: "Final board: group chats, pinned friends and event countdowns" }
                        ]
                    },
                    { type: "subheading", content: "Find" },
                    { type: "text", content: "The heart of the app. Users list every school they've attended, including more than one elementary school if they moved, plus high school and university. Instead of making you search by name, Find suggests people and groups that share your history: the same school, the same graduating class, or people in your area. You can still search for anyone directly, and a hint nudges users to add more profile details for better matches. Unlike a feed's recommendations, every suggestion points back to your own past: someone who may have shared your classroom, your grade or your neighbourhood." },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/lofi-discover.webp", caption: "Lo-fi discovery by school, city and club" },
                            { src: "/projects/throwback/lofi-groups.webp", caption: "Lo-fi groups" },
                            { src: "/projects/throwback/groups.webp", caption: "Final Find Groups: by class, by area, or your own" }
                        ]
                    },
                    { type: "subheading", content: "Events" },
                    { type: "text", content: "A school or any verified former student can organize a reunion, with RSVPs handled in the app and pinned straight to attendees' boards. Organizers decide who's invited by school, location or name, and can make an event invite-only. Before RSVPing, anyone can see the host, place, date and who else is going." },
                    { type: "image", narrow: true, src: "/projects/throwback/lofi-events-flow.webp", caption: "Lo-fi events flow, with my notes on deciding who can see and join an event." },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/events.webp", caption: "Your Events: pinned, invited and discover" },
                            { src: "/projects/throwback/create-event.webp", caption: "Create an Event, with invite-only and audience controls" },
                            { src: "/projects/throwback/event-details.webp", caption: "Event details: host, location, date and attendees" }
                        ]
                    },
                    { type: "subheading", content: "Friends & Chat" },
                    { type: "text", content: "One-on-one messages, custom group chats, and school group chats that are created automatically, so new members have a way into a conversation with their old class from day one. A recommended friends shortcut sits right under the chat list." },
                    {
                        type: "imageRow",
                        compact: true,
                        images: [
                            { src: "/projects/throwback/lofi-chats.webp", caption: "Lo-fi friends and chats" },
                            { src: "/projects/throwback/friends.webp", caption: "Final Friends: recent chats, search and 28 recommended friends" }
                        ]
                    }
                ]
            },
            {
                heading: "Key Design Decisions",
                blocks: [
                    {
                        type: "decision",
                        decision: "Search by shared history, not by name",
                        why: "The people you've lost touch with are exactly the people whose current names and handles you might not know. Schools, graduating years and neighbourhoods are what you still have in common.",
                        tradeoff: "Suggestions are only as good as the school history users enter, so a sparse profile means weaker matches."
                    },
                    {
                        type: "decision",
                        decision: "Layered verification instead of a single check",
                        why: "Every check had a gap on its own: deleted school emails, lost student cards, fakeable photos. Combining ID, school proof and then-and-now photos covers the gaps each one leaves.",
                        tradeoff: "Verification adds friction to sign-up, which pulls against Julie's need for low-commitment engagement. We accepted that cost because trust is what makes the rest of the app work."
                    },
                    {
                        type: "decision",
                        decision: "Made personal details optional",
                        why: "Old names, social handles, age, relationship status and pets all help people recognize each other, but requiring them would make sign-up feel invasive for an app that depends on trust.",
                        tradeoff: "Less required information means less to match on. We made schools the core of every profile and let everything else add context."
                    },
                    {
                        type: "decision",
                        decision: "Let organizers control who sees each event",
                        why: "A public reunion listing tells anyone where someone will be and when. Inviting by school, location or name, with an invite-only option, keeps that information with the people it's meant for.",
                        tradeoff: "Creating an event takes a few more decisions, since organizers have to choose an audience."
                    },
                    {
                        type: "decision",
                        decision: "Chose familiar patterns over a novel interface",
                        why: "Messaging someone after ten years is already a little awkward, and the interface shouldn't add to it. A consistent bottom bar, labeled forms and simple lists meant there was nothing new to learn.",
                        tradeoff: "The brief celebrated 2016's rough, lo-fi charm, and a clean, conventional layout works against that. We put the nostalgia into the content instead: then-and-now photos, polaroid snapshots with handwritten captions, school names and the rewind logo. The interface stays easy, and the experience still feels like 2016."
                    }
                ]
            },
            {
                heading: "Designing for Accessibility",
                blocks: [
                    { type: "text", content: "Our goal was that nobody should have to learn Throwback before using it. Here's what that looked like in the final screens:" },
                    {
                        type: "list",
                        items: [
                            "High-contrast text: body text uses a dark brown on white, light grey and pastel backgrounds, measuring between 9.8:1 and 20:1, well above the WCAG AAA target of 7:1. Dark brown buttons with white text measure 13.8:1.",
                            "Color is never the only signal: group chats and events are color-coded to tell them apart at a glance, but every item is also labeled with text.",
                            "Visible labels: every form field keeps its label above the input, with helper text where the input could be unclear, like inviting people \"by schools, locations, names\".",
                            "Consistent navigation: the same four-item bottom bar (back, home, profile, settings) appears on every screen, so users always know how to get back.",
                            "Large touch targets: list items, chats and events span the full width of the screen."
                        ]
                    }
                ]
            },
            {
                heading: "Presenting the Work",
                blocks: [
                    { type: "text", content: "A big part of my role was the presentation. Our submission was a Framer site that walks through our process, from the problem and persona to early sketches, wireframes and the final interactive prototype. We had five minutes to pitch it to the judges, followed by their questions and feedback, at an event of about 150 participants.\n\nOut of ten award categories, Throwback won Most Accessible, presented by Telus, which recognized the team that best prioritized inclusive design: easy to use, easy to understand and welcoming for users of all abilities. For us, that came straight from our early decision that nobody should have to learn Throwback before using it." }
                ]
            },
            {
                heading: "Reflection",
                blocks: [
                    { type: "text", content: "Twenty-four hours forces you to decide what matters. For us, that turned out to be trust. The moment we wrote down Julie's concerns, safety stopped being an edge case and started shaping the whole product, from sign-up to who can see an event.\n\nAuditing the screens afterwards, I also found two places we fell short of our own accessibility standard. The white header text sits on an orange gradient that drops to about 2:1 contrast at its lighter end, below the 3:1 minimum for large text, and our secondary grey text, like event details and helper notes, measures about 2.3:1. Next time I'd switch the headers to our dark brown, which passes across the whole gradient, and darken the greys to at least 4.5:1.\n\nIf we took Throwback further, I'd start by testing it with people trying to find real old classmates. Julie came from our own experiences, which let us move fast but also means we designed for people like us. I'd want to learn whether our verification feels reassuring or like a hurdle, explore options like having verified classmates vouch for people who no longer have an old ID, and find out how much people are willing to share before matching starts to feel invasive." }
                ]
            }
        ]
    },
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

/**
 * Case studies don't all share the same optional fields (award, liveLinkLabel, …),
 * so this returns `any` rather than the narrow union TypeScript would infer.
 * @param {string} slug
 * @returns {any}
 */
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
