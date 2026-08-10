# PRD — vKreatify Immersive Website Prototype

## Original Problem Statement
Build a premium, immersive website prototype with a design language very close to the interactive experience of blueyard.com — reproducing the feel, motion quality, spatial experience, interaction patterns, and polish — with a completely original brand. Brand confirmed by user: **vKreatify — Vkreatify Digital Solutions Private Limited**, a creative digital solutions company in Coimbatore, India (reels, posters, visual branding, social content, brand communication). Visual identity chosen by user: a golden particle sphere with glitter pouring outward, glowing in near-black space with deep blue/white atmospheric glow. Award-level (Awwwards SOTD) ambition: framer-motion scroll reveals, lenis momentum scrolling, kinetic hero, numbered manifesto chapters, slow editorial marquee, custom cursor.

## Architecture
- Frontend: React 19 (CRA/craco), Three.js (plain, custom GLSL shaders) for the particle universe, framer-motion for reveals/micro-interactions, lenis for smooth scrolling, Tailwind CSS, sonner toasts.
- Backend: FastAPI + MongoDB — POST /api/contact stores project inquiries in `contact_messages`.
- Key files: `frontend/src/components/ParticleField.js` (signature 3D system), `Cursor.js`, `Nav.js`, `Hero.js`, `Statement.js`, `Services.js`, `Work.js`, `Marquee.js`, `About.js`, `Process.js`, `People.js`, `Insights.js`, `Contact.js`, `Footer.js`.

## User Personas
- Local business owner in Coimbatore exploring a creative partner for reels/posters/branding.
- Brand/marketing manager evaluating the studio's craft and taste.
- Referral visitor arriving from Instagram (@vkreatify.digital).

## Core Requirements (static)
- Immersive near-black golden-particle universe; cinematic hero entrance; scroll-as-journey with the sphere evolving per section; typographic editorial sections; custom cursor; hover reveals following cursor; mobile redesign; performance + prefers-reduced-motion support; working contact form; verified company legal details in footer.

## Implemented (2026-08-10, iteration 3)
- Ambient Shimmer sound toggle: generative Web Audio (brown-noise air bed, warm detuned pad, randomized pentatonic glitter chimes with stereo pan), bottom-right floating button, starts only on visitor tap, EN/TA labels.
- Decision log: official WhatsApp number — user chose "skip", placeholder stays. Real client work — keep specimen showcase until assets approved. Real quotes — keep (sample) quotes until permission granted.

## Implemented (2026-08-10, iteration 2)
- CrystalSphere replaced the particle blob: glass fresnel rim-glow shell (gold front / ice-blue back), ~3,800 gold+blue star-dust particles inside with 4-point sparkle flares, ~2,600 glitter particles pouring outward AND raining down to a glowing pool below, swirl motion, mouse gravity; same scroll-evolution anchors.
- Case-study system: every portfolio row opens a full-screen case study (portal-rendered, lenis-paused) with scope/industry/year, gallery, overview/challenge/approach, deliverables, next-project navigation. 5 studio specimen projects + 1 genuine self-initiated project (vKreatify Launch).
- Voices: slow auto-scrolling client-words marquee (pauses on hover), 6 quotes visibly marked (sample) pending real client permission.
- Full EN/TA (Tamil) language system: i18n.js dictionary covering every section incl. case studies + form + toasts; nav toggle (desktop + mobile), Noto Sans Tamil, localStorage persistence.
- WhatsApp float: appears after hero, wa.me deep link with prefilled bilingual message. Number from REACT_APP_WHATSAPP_NUMBER — currently PLACEHOLDER 919999999999 until official number is shared.

## Implemented (2026-08-10)
- Three.js particle system: ~5,600-particle golden sphere + 1,500 glitter particles pouring outward + blue-white dust; mouse gravitational displacement + rotation-to-cursor; scroll-driven evolution (sphere → spread → network lines → dissolve at footer); mobile/lowfx density modes; reduced-motion static frame.
- Cinematic hero: masked line-by-line reveal "WE MAKE / BRANDS / UNIGNORABLE.", staged 2.5s entrance, scroll indicator, dual CTAs.
- Statement section "ATTENTION IS EARNED IN THE FIRST SECOND." with scroll-driven per-line reveals.
- Services: 5 editorial rows with cursor-tracking glow, expansion, deliverable chips.
- Portfolio: 5 concept rows with cursor-following blur-to-sharp image preview (concept showcase — no real client work published).
- About: manifesto chapters (Mission / Vision / Values), masked headline.
- Process: 5 numbered steps. People: 3 directors with grayscale portrait reveals. Insights: 3 journal rows.
- Slow editorial marquee incl. "Making Your Brand Into Braaaand".
- Contact: full inquiry form wired to POST /api/contact with success toast; footer with CIN U62090TZ2026PTC038392, registered locality, Instagram.
- Custom cursor: dot + lerped ring, VIEW/EXPLORE/OPEN/READ labels, glowing orb over the 3D visual; hidden on touch.
- Lenis smooth scrolling, noise overlay, Fontshare Clash Display + Cabinet Grotesk + Manrope + IBM Plex Mono.

## Verified
- curl: GET /api/ OK; POST /api/contact OK (persists).
- Screenshots: hero, statement, services hover, work hover preview, contact submit + toast, mobile hero + mobile menu.

## Backlog
- P0: Official phone/WhatsApp/email once provided by vKreatify team; real portfolio images + client permissions; final logo files.
- P1: WhatsApp click-to-chat button (needs official number); testimonials section (real, permitted); Privacy Policy / Terms pages.
- P2: Case-study detail overlays; insights article pages; multi-language (Tamil) toggle; domain + SEO/OG assets; Google Business Profile link.
