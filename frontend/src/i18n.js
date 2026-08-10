import { createContext, useContext, useEffect, useState } from "react";

export const STR = {
  en: {
    nav: { about: "About", services: "Services", work: "Work", process: "Process", insights: "Insights", contact: "Contact" },
    hero: {
      eyebrow: "Creative Digital Solutions — Coimbatore",
      lines: ["WE MAKE", "BRANDS", "UNIGNORABLE."],
      sub: "vKreatify crafts scroll-stopping reels, posters, and visual identities that help businesses attract attention, communicate clearly, and grow online.",
      ctaStart: "Start Your Project",
      ctaWork: "View Our Work →",
      scroll: "Scroll",
      est: "Est. 17.03.2026 — TN, IN",
    },
    statement: {
      label: "( The First Impression )",
      lines: ["ATTENTION IS", "EARNED IN THE", "FIRST SECOND."],
      para: "From scroll-stopping reels and creative posters to consistent visual branding — we help businesses present themselves with clarity, creativity, and confidence.",
    },
    services: {
      label: "( What We Do )",
      title: "Services",
      items: [
        { title: "Reels & Short-Form Video", tag: "Motion", chips: ["Concept Development", "Script & Planning", "Video Editing", "Motion Graphics", "Platform-Ready Exports"] },
        { title: "Creative Posters", tag: "Static", chips: ["Promotional Posters", "Festival Creatives", "Product Announcements", "Event Posters", "Offer Designs"] },
        { title: "Visual Branding", tag: "Identity", chips: ["Logo Design", "Colour Palette", "Typography", "Social Templates", "Brand Guidelines"] },
        { title: "Social Media Content", tag: "Presence", chips: ["Content Calendars", "Caption Ideas", "Carousel Designs", "Story Creatives", "Campaign Creatives"] },
        { title: "Brand Communication", tag: "Message", chips: ["Brand Messaging", "Campaign Concepts", "Promotional Copy", "Product Communication", "Customer Content"] },
      ],
    },
    work: {
      label: "( Selected Work )",
      title: "Portfolio",
      note: "Studio specimen projects — real client work published only with permission",
      items: [
        {
          name: "Midnight Masala", cat: "Reels & Posters", industry: "Restaurant", year: "2026",
          img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "Reels, Posters, Monthly Content",
          overview: "A specimen engagement for a late-night Coimbatore restaurant — building a crave-worthy social presence from scratch.",
          challenge: "Great food, zero digital presence. The brand needed scroll-stopping content that made people hungry at 11 PM.",
          approach: "A moody, neon-tinged visual system: close-crop food reels, bold-type offer posters, and a weekly content rhythm the kitchen can sustain.",
          deliverables: ["8 reels per month", "12 posters per month", "Offer campaign creatives", "Story templates", "Profile rebrand"],
        },
        {
          name: "Pulse Fitness Studio", cat: "Brand Identity", industry: "Fitness", year: "2026",
          img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          gallery: [
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "Identity, Social Templates",
          overview: "A specimen identity for a boutique gym that refuses to look like every other gym on the feed.",
          challenge: "Fitness branding is a sea of sameness — flames, dumbbells, and gradients. Pulse needed to feel premium, not loud.",
          approach: "High-contrast monochrome with a single electric accent, stencil-inspired typography, and a template system any trainer can use in minutes.",
          deliverables: ["Logo & lockups", "Colour & type system", "Social template pack", "Class schedule creatives", "Launch poster series"],
        },
        {
          name: "Lumen Jewellery", cat: "Product Campaign", industry: "Retail", year: "2026",
          img: "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "Product Reels, Campaign Posters",
          overview: "A specimen product campaign making traditional jewellery feel modern to a younger, scrolling audience.",
          challenge: "Catalogue-style posts were blending into the feed. The pieces deserved cinema, not screenshots.",
          approach: "Macro-detail reels with slow reveals, minimal gold-on-black posters, and festive drops timed to the calendar.",
          deliverables: ["Product macro reels", "Catalogue posters", "Festive campaign set", "Carousel designs", "Story sequences"],
        },
        {
          name: "Nexus Academy", cat: "Content System", industry: "Education", year: "2026",
          img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "Content Calendar, Carousels, Reels",
          overview: "A specimen content engine for an education brand with serious subjects and a distracted audience.",
          challenge: "Dry material, low engagement, and admission seasons that arrived faster than the content did.",
          approach: "Educational carousels that teach in five slides, faculty-spotlight reels, and a calendar built around admission cycles.",
          deliverables: ["Monthly content calendar", "Carousel system", "Faculty spotlight reels", "Admission campaign", "Exam-season creatives"],
        },
        {
          name: "Verde Café", cat: "Launch Creatives", industry: "F&B", year: "2026",
          img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          gallery: [
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "Launch Campaign, Reels, Posters",
          overview: "A specimen launch kit for a new café that needed to open with a bang on a tight budget.",
          challenge: "Two weeks to launch, no audience, and a neighbourhood full of established cafés.",
          approach: "A countdown poster series, a menu-reveal reel, and opening-day templates that turned the launch into a local event.",
          deliverables: ["Countdown poster series", "Menu reveal reel", "Opening-day creatives", "Profile setup kit", "Loyalty card design"],
        },
        {
          name: "vKreatify Launch", cat: "Self-Initiated", industry: "Studio", year: "2026",
          img: "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "Identity, Reels, Posters, Web",
          overview: "Our own launch — the identity, reels, and posters that introduced vKreatify to Coimbatore.",
          challenge: "A brand-new studio with no client portfolio had to prove its craft through its own presence.",
          approach: "We treated ourselves as the first client: a gold-on-ink identity and content built to the standard we sell.",
          deliverables: ["Brand identity", "Launch reel series", "Poster system", "Social profile setup", "This website"],
        },
      ],
    },
    caseStudy: { overview: "Overview", challenge: "The Challenge", approach: "Our Approach", deliverables: "Deliverables", next: "Next Project", close: "Close", scope: "Scope", year: "Year", industry: "Industry" },
    about: {
      label: "( About vKreatify )",
      lines: ["CREATIVE CONTENT", "THAT CONNECTS", "AND CONVERTS."],
      chapters: [
        { title: "Mission", body: "To help businesses communicate their ideas through creative, useful, and memorable digital content." },
        { title: "Vision", body: "To become a trusted creative partner for ambitious brands in Coimbatore and beyond." },
        { title: "Values", body: "Creativity with purpose. Clear communication. Consistent quality. Timely delivery. Long-term relationships." },
      ],
      para: "vKreatify Digital Solutions Private Limited is a Coimbatore-based creative digital solutions company. Every design, reel, and content idea is developed to help a brand communicate better and connect with its audience.",
    },
    process: {
      label: "( How We Work )",
      title: "Process",
      steps: [
        { title: "Understand", body: "We learn about your business, audience, and goals." },
        { title: "Plan", body: "We develop the content direction, creative concept, and delivery plan." },
        { title: "Create", body: "Our team designs, edits, and refines the required content." },
        { title: "Review", body: "You share feedback and approve the final work." },
        { title: "Deliver", body: "We provide high-quality, platform-ready files." },
      ],
    },
    people: { label: "( The People )", title: "Leadership", role: "Director", names: ["Ramesh Babu Pemmasani", "Mohankumar Naveenkumar", "Kamesh"] },
    insights: {
      label: "( Journal )",
      title: "Insights",
      posts: [
        { year: "2026", cat: "Attention", title: "The First Second Decides Everything" },
        { year: "2026", cat: "Branding", title: "Why Consistency Beats Campaigns" },
        { year: "2026", cat: "Craft", title: "Design Is a Business Language" },
      ],
    },
    voices: {
      label: "( Client Words )",
      title: "Voices",
      note: "Sample placeholders — real client stories published only with permission",
      items: [
        { quote: "The reels didn't just look good — people started walking in saying they saw us online.", name: "Café Owner", place: "RS Puram" },
        { quote: "Posters that actually match our brand. Every single time, on time.", name: "Boutique Manager", place: "Gandhipuram" },
        { quote: "They understood our festival campaign in one call. Zero back-and-forth.", name: "Jewellery Retailer", place: "Town Hall" },
        { quote: "Our admissions enquiries doubled this season. The content system works.", name: "Academy Director", place: "Peelamedu" },
        { quote: "Finally a studio that treats a small business like a big brand.", name: "Salon Founder", place: "Saibaba Colony" },
        { quote: "Clear, fast, creative. Our product launch looked premium everywhere.", name: "D2C Founder", place: "Coimbatore" },
      ],
    },
    marquee: { items: ["Reels", "Posters", "Visual Branding", "Brand Content", "Campaigns", "Making Your Brand Into Braaaand"] },
    contact: {
      label: "( Start Something )",
      lines: ["LET'S CREATE", "SOMETHING", "MEMORABLE."],
      para: "Have a project, campaign, or brand idea? Tell us what you need, and the vKreatify team will get back to you.",
      instagramLabel: "Instagram",
      studioLabel: "Studio",
      contactLabel: "Phone / WhatsApp / Email",
      contactValue: "Shared on project inquiry",
      form: {
        name: "Name *", company: "Company Name", phone: "Phone Number", email: "Email Address *",
        service: "Service Required *", budget: "Project Budget", details: "Project Details *",
        services: ["Reels & Short-Form Video", "Creative Posters", "Visual Branding", "Social Media Content", "Brand Communication", "Something Else"],
        budgets: ["Under ₹25,000", "₹25,000 — ₹75,000", "₹75,000 — ₹2,00,000", "Above ₹2,00,000"],
        submit: "Send Inquiry", sending: "Sending...",
        success: "Message received. The vKreatify team will get back to you.",
        error: "Could not send right now. Please try again.",
      },
    },
    footer: { back: "Back to top" },
    whatsapp: { tip: "Chat on WhatsApp", msg: "Hi vKreatify! I'd like to discuss a project." },
    sound: { tip: "Ambient Shimmer", on: "Turn ambient sound on", off: "Turn ambient sound off" },
    lang: { toggle: "தமிழ்" },
  },
  ta: {
    nav: { about: "எங்களைப் பற்றி", services: "சேவைகள்", work: "படைப்புகள்", process: "செயல்முறை", insights: "சிந்தனைகள்", contact: "தொடர்பு" },
    hero: {
      eyebrow: "கிரியேட்டிவ் டிஜிட்டல் சொல்யூஷன்ஸ் — கோயம்புத்தூர்",
      lines: ["மறுக்க முடியாத", "பிராண்டுகளை", "உருவாக்குகிறோம்."],
      sub: "ஸ்க்ரால் நிறுத்தும் ரீல்ஸ், போஸ்டர்கள் மற்றும் visual identity மூலம் உங்கள் business கவனம் பெறவும், தெளிவாகத் தகவல் பரிமாறவும், ஆன்லைனில் வளரவும் vKreatify உதவுகிறது.",
      ctaStart: "திட்டத்தைத் தொடங்குங்கள்",
      ctaWork: "படைப்புகளைப் பார்க்க →",
      scroll: "ஸ்க்ரால்",
      est: "தொடக்கம் 17.03.2026 — TN, IN",
    },
    statement: {
      label: "( முதல் பார்வை )",
      lines: ["கவனம் என்பது", "முதல் வினாடியில்", "வெல்லப்படுகிறது."],
      para: "ஸ்க்ரால் நிறுத்தும் ரீல்ஸ் மற்றும் கிரியேட்டிவ் போஸ்டர்கள் முதல் நிலையான visual branding வரை — உங்கள் business-ஐ தெளிவாகவும், படைப்பாற்றலுடனும், நம்பிக்கையுடனும் முன்வைக்க நாங்கள் உதவுகிறோம்.",
    },
    services: {
      label: "( நாங்கள் செய்வது )",
      title: "சேவைகள்",
      items: [
        { title: "ரீல்ஸ் & குறும் வீடியோ", tag: "மோஷன்", chips: ["கான்செப்ட் உருவாக்கம்", "ஸ்கிரிப்ட் & திட்டமிடல்", "வீடியோ எடிட்டிங்", "மோஷன் கிராஃபிக்ஸ்", "பிளாட்ஃபாம்-ரெடி எக்ஸ்போர்ட்"] },
        { title: "கிரியேட்டிவ் போஸ்டர்கள்", tag: "ஸ்டாட்டிக்", chips: ["விளம்பர போஸ்டர்கள்", "திருவிழா கிரியேட்டிவ்கள்", "புராடக்ட் அறிவிப்புகள்", "நிகழ்வு போஸ்டர்கள்", "சலுகை டிசைன்கள்"] },
        { title: "விஷுவல் பிராண்டிங்", tag: "அடையாளம்", chips: ["லோகோ டிசைன்", "நிறத் தேர்வு", "எழுத்துரு தேர்வு", "சோஷியல் டெம்ப்ளேட்டுகள்", "பிராண்ட் வழிகாட்டுதல்"] },
        { title: "சோஷியல் மீடியா கண்டென்ட்", tag: "இருப்பு", chips: ["கண்டென்ட் காலெண்டர்", "கேப்ஷன் ஐடியாக்கள்", "கேரோசல் டிசைன்கள்", "ஸ்டோரி கிரியேட்டிவ்கள்", "கேம்பெயின் கிரியேட்டிவ்கள்"] },
        { title: "பிராண்ட் கம்யூனிகேஷன்", tag: "செய்தி", chips: ["பிராண்ட் மெசேஜிங்", "கேம்பெயின் கான்செப்ட்", "புரோமோ காப்பி", "புராடக்ட் கம்யூனிகேஷன்", "கஸ்டமர் கண்டென்ட்"] },
      ],
    },
    work: {
      label: "( தேர்ந்தெடுக்கப்பட்ட படைப்புகள் )",
      title: "போர்ட்ஃபோலியோ",
      note: "ஸ்டுடியோ மாதிரி திட்டங்கள் — உண்மையான client படைப்புகள் அனுமதியுடன் மட்டுமே வெளியிடப்படும்",
      items: [
        {
          name: "Midnight Masala", cat: "ரீல்ஸ் & போஸ்டர்கள்", industry: "உணவகம்", year: "2026",
          img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "ரீல்ஸ், போஸ்டர்கள், மாதாந்திர கண்டென்ட்",
          overview: "கோயம்புத்தூரின் இரவு நேர உணவகத்திற்கான மாதிரி திட்டம் — புதிதாக ஒரு சுவையான சோஷியல் இருப்பை உருவாக்குதல்.",
          challenge: "சிறந்த உணவு, ஆனால் டிஜிட்டல் இருப்பு இல்லை. இரவு 11 மணிக்கும் பசியை கிளப்பும் கண்டென்ட் தேவைப்பட்டது.",
          approach: "க்ளோஸ்-கிராப் உணவு ரீல்ஸ், போல்ட் ஆஃபர் போஸ்டர்கள், மற்றும் வாராந்திர கண்டென்ட் ரிதம் கொண்ட ஒரு மோச்சர்ன் visual system.",
          deliverables: ["மாதம் 8 ரீல்ஸ்", "மாதம் 12 போஸ்டர்கள்", "ஆஃபர் கேம்பெயின் கிரியேட்டிவ்கள்", "ஸ்டோரி டெம்ப்ளேட்டுகள்", "புரோஃபைல் ரீபிராண்ட்"],
        },
        {
          name: "Pulse Fitness Studio", cat: "பிராண்ட் ஐடென்டிட்டி", industry: "ஃபிட்னஸ்", year: "2026",
          img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          gallery: [
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "ஐடென்டிட்டி, சோஷியல் டெம்ப்ளேட்டுகள்",
          overview: "மற்ற ஜிம்களைப் போல இல்லாமல் தனித்துவமாகத் தெரியும் ஒரு boutique ஜிம்மிற்கான மாதிரி identity.",
          challenge: "ஃபிட்னஸ் பிராண்டிங் எங்கும் ஒரே மாதிரி. Pulse பிரீமியமாக உணர வேண்டும், சத்தமாக அல்ல.",
          approach: "ஒரே ஒரு எலக்ட்ரிக் accent உடன் high-contrast monochrome, stencil typography, மற்றும் நிமிடங்களில் பயன்படுத்தக்கூடிய டெம்ப்ளேட் system.",
          deliverables: ["லோகோ & லாக்அப்கள்", "நிற & எழுத்துரு system", "சோஷியல் டெம்ப்ளேட் பேக்", "கிளாஸ் ஷெட்யூல் கிரியேட்டிவ்கள்", "லாஞ்ச் போஸ்டர் தொடர்"],
        },
        {
          name: "Lumen Jewellery", cat: "புராடக்ட் கேம்பெயின்", industry: "சில்லறை", year: "2026",
          img: "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "புராடக்ட் ரீல்ஸ், கேம்பெயின் போஸ்டர்கள்",
          overview: "பாரம்பரிய நகைகளை இளம், ஸ்க்ரால் செய்யும் பார்வையாளர்களுக்கு நவீனமாக்கும் மாதிரி product campaign.",
          challenge: "கேட்டலாக் போஸ்டுகள் feed-இல் மறைந்துவிட்டன. நகைகளுக்கு screenshot அல்ல, cinema தேவை.",
          approach: "மெதுவான reveal உடன் macro-detail ரீல்ஸ், கருப்பில் தங்க minimal போஸ்டர்கள், திருவிழா கால drops.",
          deliverables: ["புராடக்ட் macro ரீல்ஸ்", "கேட்டலாக் போஸ்டர்கள்", "திருவிழா கேம்பெயின் செட்", "கேரோசல் டிசைன்கள்", "ஸ்டோரி sequences"],
        },
        {
          name: "Nexus Academy", cat: "கண்டென்ட் சிஸ்டம்", industry: "கல்வி", year: "2026",
          img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "கண்டென்ட் காலெண்டர், கேரோசல்கள், ரீல்ஸ்",
          overview: "கவனிக்க முடியாத பார்வையாளர்களைக் கொண்ட கல்வி brand-க்கான மாதிரி content engine.",
          challenge: "உலர்ந்த பாடங்கள், குறைந்த engagement, மற்றும் content-ஐ விட வேகமாக வரும் admission seasons.",
          approach: "ஐந்து slides-இல் கற்பிக்கும் educational கேரோசல்கள், faculty spotlight ரீல்ஸ், admission cycle-ஐ மையமாகக் கொண்ட காலெண்டர்.",
          deliverables: ["மாதாந்திர கண்டென்ட் காலெண்டர்", "கேரோசல் சிஸ்டம்", "faculty spotlight ரீல்ஸ்", "admission கேம்பெயின்", "exam-season கிரியேட்டிவ்கள்"],
        },
        {
          name: "Verde Café", cat: "லாஞ்ச் கிரியேட்டிவ்கள்", industry: "உணவு & பானம்", year: "2026",
          img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          gallery: [
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          ],
          scope: "லாஞ்ச் கேம்பெயின், ரீல்ஸ், போஸ்டர்கள்",
          overview: "குறைந்த budget-இல் பெரிய தாக்கத்துடன் திறக்க வேண்டிய புதிய கஃபேவிற்கான மாதிரி launch kit.",
          challenge: "லாஞ்சுக்கு இரண்டு வாரங்கள், audience இல்லை, சுற்றிலும் நிறைய established கஃபேக்கள்.",
          approach: "கவுண்ட்டவுன் போஸ்டர் தொடர், menu reveal ரீல், மற்றும் லாஞ்சை ஒரு local event ஆக்கிய opening-day டெம்ப்ளேட்டுகள்.",
          deliverables: ["கவுண்ட்டவுன் போஸ்டர் தொடர்", "menu reveal ரீல்", "opening-day கிரியேட்டிவ்கள்", "புரோஃபைல் setup kit", "loyalty card டிசைன்"],
        },
        {
          name: "vKreatify Launch", cat: "சுய முயற்சி", industry: "ஸ்டுடியோ", year: "2026",
          img: "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85",
            "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg",
          ],
          scope: "ஐடென்டிட்டி, ரீல்ஸ், போஸ்டர்கள், வெப்",
          overview: "எங்கள் சொந்த லாஞ்ச் — vKreatify-ஐ கோயம்புத்தூருக்கு அறிமுகப்படுத்திய identity, ரீல்ஸ் மற்றும் போஸ்டர்கள்.",
          challenge: "client portfolio இல்லாத புதிய ஸ்டுடியோ, தன் சொந்த இருப்பின் மூலமே திறமையை நிரூபிக்க வேண்டியிருந்தது.",
          approach: "எங்களையே முதல் client ஆக நடத்தினோம்: கருப்பில் தங்க நிற identity மற்றும் நாங்கள் விற்கும் தரத்திற்கான கண்டென்ட்.",
          deliverables: ["பிராண்ட் ஐடென்டிட்டி", "லாஞ்ச் ரீல் தொடர்", "போஸ்டர் சிஸ்டம்", "சோஷியல் புரோஃபைல் setup", "இந்த வெப்சைட்"],
        },
      ],
    },
    caseStudy: { overview: "மேலோட்டம்", challenge: "சவால்", approach: "எங்கள் அணுகுமுறை", deliverables: "வழங்கல்கள்", next: "அடுத்த படைப்பு", close: "மூடு", scope: "ஸ்கோப்", year: "வருடம்", industry: "துறை" },
    about: {
      label: "( vKreatify பற்றி )",
      lines: ["கிரியேட்டிவ் கண்டென்ட்:", "இணைக்கிறது,", "மாற்றுகிறது."],
      chapters: [
        { title: "நோக்கம்", body: "படைப்பாற்றலான, பயனுள்ள, நினைவில் நிற்கும் டிஜிட்டல் கண்டென்ட் மூலம் business-கள் தங்கள் யோசனைகளைப் பகிர உதவுவது." },
        { title: "பார்வை", body: "கோயம்புத்தூர் மற்றும் அதற்கு அப்பால் உள்ள முன்னேறும் பிராண்டுகளுக்கு நம்பகமான கிரியேட்டிவ் பார்ட்னராக இருப்பது." },
        { title: "மதிப்புகள்", body: "நோக்கமுடைய படைப்பாற்றல். தெளிவான தகவல் தொடர்பு. நிலையான தரம். சரியான நேர டெலிவரி. நீண்ட கால உறவுகள்." },
      ],
      para: "vKreatify Digital Solutions Private Limited என்பது கோயம்புத்தூரைச் சேர்ந்த கிரியேட்டிவ் டிஜிட்டல் சொல்யூஷன்ஸ் நிறுவனம். ஒவ்வொரு டிசைன், ரீல் மற்றும் கண்டென்ட் ஐடியாவும் brand சிறப்பாகத் தகவல் பரிமாறவும், பார்வையாளர்களுடன் இணையவும் உருவாக்கப்படுகிறது.",
    },
    process: {
      label: "( நாங்கள் வேலை செய்யும் முறை )",
      title: "செயல்முறை",
      steps: [
        { title: "புரிதல்", body: "உங்கள் business, பார்வையாளர்கள் மற்றும் இலக்குகளை நாங்கள் அறிந்து கொள்கிறோம்." },
        { title: "திட்டமிடல்", body: "கண்டென்ட் திசை, கிரியேட்டிவ் கான்செப்ட் மற்றும் டெலிவரி திட்டத்தை உருவாக்குகிறோம்." },
        { title: "படைத்தல்", body: "எங்கள் டீம் தேவையான கண்டென்ட்டை டிசைன் செய்து, எடிட் செய்து, சீரமைக்கிறது." },
        { title: "மதிப்பாய்வு", body: "உங்கள் கருத்தைப் பகிர்ந்து இறுதி வேலையை அங்கீகரிக்கிறீர்கள்." },
        { title: "டெலிவரி", body: "உயர் தரமான, platform-ready ஃபைல்களை வழங்குகிறோம்." },
      ],
    },
    people: { label: "( டீம் )", title: "தலைமை", role: "இயக்குநர்", names: ["ரமேஷ் பாபு பெம்மசானி", "மோகன்குமார் நவீன்குமார்", "கமேஷ்"] },
    insights: {
      label: "( ஜர்னல் )",
      title: "சிந்தனைகள்",
      posts: [
        { year: "2026", cat: "கவனம்", title: "முதல் வினாடியே எல்லாவற்றையும் தீர்மானிக்கிறது" },
        { year: "2026", cat: "பிராண்டிங்", title: "நிலைத்தன்மையே கேம்பெயின்களை வெல்கிறது" },
        { year: "2026", cat: "கைவினை", title: "டிசைன் ஒரு வியாபார மொழி" },
      ],
    },
    voices: {
      label: "( வாடிக்கையாளர் குரல்கள் )",
      title: "குரல்கள்",
      note: "மாதிரி இடம்பிடிகள் — உண்மையான client கருத்துகள் அனுமதியுடன் மட்டுமே வெளியிடப்படும்",
      items: [
        { quote: "ரீல்ஸ் அழகாக இருந்தது மட்டுமல்ல — ஆன்லைனில் பார்த்ததாகச் சொல்லி ஆட்கள் நேரில் வரத் தொடங்கினர்.", name: "கஃபே உரிமையாளர்", place: "RS Puram" },
        { quote: "எங்கள் brand-க்கு உண்மையாகப் பொருந்தும் போஸ்டர்கள். ஒவ்வொரு முறையும், சரியான நேரத்தில்.", name: "புட்டிக் மேனேஜர்", place: "Gandhipuram" },
        { quote: "ஒரே அழைப்பில் எங்கள் திருவிழா கேம்பெயினைப் புரிந்து கொண்டார்கள். எந்த பின்னடைவும் இல்லை.", name: "நகை வியாபாரி", place: "Town Hall" },
        { quote: "இந்த சீசனில் எங்கள் admission விசாரணைகள் இரட்டிப்பாயின. கண்டென்ட் சிஸ்டம் வேலை செய்கிறது.", name: "அகாடமி இயக்குநர்", place: "Peelamedu" },
        { quote: "சிறிய business-ஐ பெரிய brand போல நடத்தும் ஸ்டுடியோ கிடைத்துவிட்டது.", name: "சலூன் நிறுவனர்", place: "Saibaba Colony" },
        { quote: "தெளிவு, வேகம், படைப்பாற்றல். எங்கள் புராடக்ட் லாஞ்ச் எல்லா இடங்களிலும் premium ஆகத் தெரிந்தது.", name: "D2C நிறுவனர்", place: "Coimbatore" },
      ],
    },
    marquee: { items: ["ரீல்ஸ்", "போஸ்டர்கள்", "விஷுவல் பிராண்டிங்", "பிராண்ட் கண்டென்ட்", "கேம்பெயின்கள்", "Making Your Brand Into Braaaand"] },
    contact: {
      label: "( ஏதாவது தொடங்குங்கள் )",
      lines: ["நினைவில் நிலைக்கும்", "படைப்பை", "உருவாக்குவோம்."],
      para: "ஒரு திட்டம், கேம்பெயின் அல்லது brand ஐடியா உள்ளதா? உங்களுக்கு என்ன தேவை என்று சொல்லுங்கள், vKreatify டீம் உங்களைத் தொடர்பு கொள்ளும்.",
      instagramLabel: "இன்ஸ்டாகிராம்",
      studioLabel: "ஸ்டுடியோ",
      contactLabel: "ஃபோன் / வாட்ஸ்அப் / மின்னஞ்சல்",
      contactValue: "திட்ட விசாரணையில் பகிரப்படும்",
      form: {
        name: "பெயர் *", company: "நிறுவனத்தின் பெயர்", phone: "தொலைபேசி எண்", email: "மின்னஞ்சல் முகவரி *",
        service: "தேவையான சேவை *", budget: "திட்ட பட்ஜெட்", details: "திட்ட விவரங்கள் *",
        services: ["ரீல்ஸ் & குறும் வீடியோ", "கிரியேட்டிவ் போஸ்டர்கள்", "விஷுவல் பிராண்டிங்", "சோஷியல் மீடியா கண்டென்ட்", "பிராண்ட் கம்யூனிகேஷன்", "வேறு ஏதாவது"],
        budgets: ["₹25,000-க்குக் கீழ்", "₹25,000 — ₹75,000", "₹75,000 — ₹2,00,000", "₹2,00,000-க்கு மேல்"],
        submit: "விசாரணையை அனுப்புக", sending: "அனுப்புகிறது...",
        success: "செய்தி பெறப்பட்டது. vKreatify டீம் விரைவில் தொடர்பு கொள்ளும்.",
        error: "இப்போது அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      },
    },
    footer: { back: "மேலே செல்" },
    whatsapp: { tip: "வாட்ஸ்அப்-இல் பேசுங்கள்", msg: "வணக்கம் vKreatify! ஒரு திட்டம் பற்றிப் பேச விரும்புகிறேன்." },
    sound: { tip: "மெல்லிய ஒலி", on: "ஒலியை இயக்கு", off: "ஒலியை நிறுத்து" },
    lang: { toggle: "EN" },
  },
};

const LangCtx = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("vk-lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("vk-lang", lang);
    } catch {}
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    let cur = STR[lang];
    for (const p of key.split(".")) {
      cur = cur?.[p];
    }
    return cur ?? key;
  };

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
