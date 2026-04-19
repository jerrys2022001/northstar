window.AI_CATALOG = {
  generatedAt: "2026-04-10",
  minMonthlyVisits: 1500000,
  sourceSummary: {
    primary: ["https://www.futurepedia.io/ai-tools", "https://www.toolify.ai/Best-trending-AI-Tools"],
    notes: [
      "Traffic values are curated from Toolify ranking snapshots and normalized into a cleaner buyer-facing directory view.",
      "Taxonomy, category framing, and editorial grouping are normalized from Futurepedia plus each tool's official positioning.",
      "Low-signal products are intentionally filtered out so the homepage behaves more like a serious shortlist than an unfiltered dump."
    ]
  },
  collections: [
    {
      name: "For operators",
      description: "General assistants, research tools, and AI workspaces that compress day-to-day knowledge work.",
      categories: ["Assistants", "Research", "Productivity", "Automation"],
      anchor: "Best for founders, chiefs of staff, PMs, and business generalists"
    },
    {
      name: "For creative studios",
      description: "Image, presentation, voice, and video products with enough traction to matter for real teams.",
      categories: ["Design", "Video", "Audio", "Writing"],
      anchor: "Best for marketers, agencies, content teams, and brand builders"
    },
    {
      name: "For global teams",
      description: "Translation, dubbing, avatar video, and multilingual writing tools for North America and Europe.",
      categories: ["Translation", "Writing", "Audio", "Video"],
      anchor: "Best for localization, support, and cross-border growth teams"
    },
    {
      name: "For builders",
      description: "Coding copilots, model routers, and AI-native product builders used by modern product teams.",
      categories: ["Coding", "Automation", "Assistants", "Productivity"],
      anchor: "Best for developers, startup builders, and technical operators"
    },
    {
      name: "For revenue teams",
      description: "Writing, meetings, CRM, and outbound-adjacent AI tools for sales and customer-facing work.",
      categories: ["Sales", "Meetings", "Writing", "Productivity"],
      anchor: "Best for GTM teams, agencies, and support organizations"
    }
  ],
  tools: [
    {
      id: "gemini",
      name: "Google Gemini",
      vendor: "Google",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #2563eb, #8b5cf6)",
      url: "https://gemini.google.com/",
      summary: "A multimodal assistant that fits users already living inside Google products and mobile workflows.",
      categories: ["Assistants", "Research", "Productivity"],
      audience: ["Students", "Knowledge workers", "Google Workspace teams"],
      pricing: "Free / Paid",
      monthlyVisits: 2100000000,
      trafficLabel: "2.1B monthly visits",
      recommendation: "Especially strong when your workflow already depends on Gmail, Docs, Android, or Google Search habits.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/tool/gemini-gemini-advanced"
      }
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      vendor: "OpenAI",
      logoLetter: "C",
      accent: "linear-gradient(145deg, #0f766e, #14b8a6)",
      url: "https://chatgpt.com/",
      summary: "Best overall general-purpose AI workspace for writing, research, coding, and agent-like task execution.",
      categories: ["Assistants", "Research", "Automation", "Coding"],
      audience: ["Founders", "Marketers", "Developers", "Operators"],
      pricing: "Freemium",
      monthlyVisits: 560600000,
      trafficLabel: "560.6M monthly visits",
      recommendation: "Start here if you want one AI product that can cover most day-to-day knowledge work.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/chatgpt",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "claude",
      name: "Claude",
      vendor: "Anthropic",
      logoLetter: "C",
      accent: "linear-gradient(145deg, #c26f2e, #eb984d)",
      url: "https://claude.ai/",
      summary: "A polished AI assistant known for strong reasoning, long-context work, and reliable writing quality.",
      categories: ["Assistants", "Research", "Writing", "Coding"],
      audience: ["Analysts", "Writers", "Developers", "Teams"],
      pricing: "Freemium",
      monthlyVisits: 202900000,
      trafficLabel: "202.9M monthly visits",
      recommendation: "A top pick for document-heavy tasks, calm writing workflows, and higher-trust answers.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/claude",
        toolify: "https://www.toolify.ai/tool/claude-2"
      }
    },
    {
      id: "adobefirefly",
      name: "Adobe Firefly",
      vendor: "Adobe",
      logoLetter: "A",
      accent: "linear-gradient(145deg, #c026d3, #f97316)",
      url: "https://www.adobe.com/products/firefly.html",
      summary: "Adobe's mainstream AI creative layer for image generation, editing, and production-ready brand work.",
      categories: ["Design", "Video", "Productivity"],
      audience: ["Design teams", "Brand marketers", "Creative ops"],
      pricing: "Free / Paid",
      monthlyVisits: 404400000,
      trafficLabel: "404.4M monthly visits",
      recommendation: "A strong pick if your team already lives in Adobe and wants AI added to an established creative stack.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      vendor: "DeepSeek",
      logoLetter: "D",
      accent: "linear-gradient(145deg, #0f172a, #2563eb)",
      url: "https://chat.deepseek.com/",
      summary: "A high-interest reasoning assistant that gained fast traction among global users looking for frontier-model value.",
      categories: ["Assistants", "Research", "Coding"],
      audience: ["Developers", "Researchers", "Power users"],
      pricing: "Free / Paid",
      monthlyVisits: 350800000,
      trafficLabel: "350.8M monthly visits",
      recommendation: "Worth watching if you want strong reasoning value and you are comfortable comparing newer global model providers.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "grok",
      name: "Grok",
      vendor: "xAI",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #111827, #3b82f6)",
      url: "https://grok.com/",
      summary: "A fast-moving consumer assistant tied closely to the X ecosystem and real-time internet culture.",
      categories: ["Assistants", "Research"],
      audience: ["Power users", "Social-first researchers", "Early adopters"],
      pricing: "Free / Paid",
      monthlyVisits: 326300000,
      trafficLabel: "326.3M monthly visits",
      recommendation: "Most relevant if real-time discourse and a more internet-native assistant style matter to you.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "perplexity",
      name: "Perplexity",
      vendor: "Perplexity",
      logoLetter: "P",
      accent: "linear-gradient(145deg, #0f172a, #2dd4bf)",
      url: "https://www.perplexity.ai/",
      summary: "A citation-first AI answer engine built for fast research, comparison, and web-backed discovery.",
      categories: ["Research", "Assistants"],
      audience: ["Researchers", "Consultants", "Journalists", "Students"],
      pricing: "Freemium",
      monthlyVisits: 170100000,
      trafficLabel: "170.1M monthly visits",
      recommendation: "Ideal when you need sources, quick comparisons, and less hallucination-prone browsing support.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/perplexity-ai",
        toolify: "https://www.toolify.ai/tool/perplexity-ai"
      }
    },
    {
      id: "notion",
      name: "Notion AI",
      vendor: "Notion",
      logoLetter: "N",
      accent: "linear-gradient(145deg, #111827, #4b5563)",
      url: "https://www.notion.com/product/ai",
      summary: "An all-in-one workspace that combines docs, wikis, projects, search, and AI productivity in one surface.",
      categories: ["Productivity", "Writing", "Assistants"],
      audience: ["Startups", "Remote teams", "PMs", "Operators"],
      pricing: "Freemium",
      monthlyVisits: 162500000,
      trafficLabel: "162.5M monthly visits",
      recommendation: "A strong fit if you want AI embedded inside the place where your team already writes and plans.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/tool/notion-ai"
      }
    },
    {
      id: "googleaistudio",
      name: "Google AI Studio",
      vendor: "Google",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #2563eb, #38bdf8)",
      url: "https://aistudio.google.com/",
      summary: "A browser-based environment for testing Gemini models, prompts, multimodal flows, and lightweight prototypes.",
      categories: ["Coding", "Research", "Assistants"],
      audience: ["Developers", "Prototype teams", "Technical founders"],
      pricing: "Free / Paid",
      monthlyVisits: 127900000,
      trafficLabel: "127.9M monthly visits",
      recommendation: "One of the easiest ways to prototype Gemini-powered experiences without standing up heavy infrastructure first.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "deepl",
      name: "DeepL",
      vendor: "DeepL",
      logoLetter: "D",
      accent: "linear-gradient(145deg, #0f2d73, #1b62e8)",
      url: "https://www.deepl.com/",
      summary: "The most credible AI translation choice for international business writing, documents, and localization.",
      categories: ["Translation", "Writing"],
      audience: ["Global teams", "Localization managers", "Legal", "Support"],
      pricing: "Freemium",
      monthlyVisits: 119800000,
      trafficLabel: "119.8M monthly visits",
      recommendation: "One of the clearest must-haves for multilingual companies serving Europe and North America.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/tool/deepl"
      }
    },
    {
      id: "freepik",
      name: "Freepik AI",
      vendor: "Freepik",
      logoLetter: "F",
      accent: "linear-gradient(145deg, #2563eb, #22c55e)",
      url: "https://www.freepik.com/ai",
      summary: "A high-traffic creative suite blending stock, design resources, and AI generation for fast campaign production.",
      categories: ["Design", "Productivity"],
      audience: ["Marketers", "Social teams", "Design generalists"],
      pricing: "Freemium",
      monthlyVisits: 107200000,
      trafficLabel: "107.2M monthly visits",
      recommendation: "A smart choice when speed, templates, and reusable commercial design assets matter as much as pure prompt craft.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "suno",
      name: "Suno",
      vendor: "Suno",
      logoLetter: "S",
      accent: "linear-gradient(145deg, #0f172a, #7c3aed)",
      url: "https://suno.com/",
      summary: "The breakout AI music product for fast track generation, hooks, demos, and creative concepting.",
      categories: ["Audio", "Design"],
      audience: ["Creators", "Agencies", "Video editors", "Social teams"],
      pricing: "Freemium",
      monthlyVisits: 75000000,
      trafficLabel: "75.0M monthly visits",
      recommendation: "One of the highest-signal music AI products if your workflow includes soundtrack, demos, or social-first content ideas.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "grammarly",
      name: "Grammarly",
      vendor: "Grammarly",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #0a7a52, #18b977)",
      url: "https://www.grammarly.com/",
      summary: "A mainstream writing layer for polished English, tone adjustment, and safe business communication.",
      categories: ["Writing", "Productivity"],
      audience: ["Professionals", "Sales", "Marketing", "Students"],
      pricing: "Freemium",
      monthlyVisits: 55900000,
      trafficLabel: "55.9M monthly visits",
      recommendation: "Still one of the easiest wins for people who write emails, decks, docs, and customer-facing copy.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/grammarly",
        toolify: "https://www.toolify.ai/tool/grammarly"
      }
    },
    {
      id: "capcut",
      name: "CapCut",
      vendor: "ByteDance",
      logoLetter: "C",
      accent: "linear-gradient(145deg, #111827, #06b6d4)",
      url: "https://www.capcut.com/",
      summary: "A mass-market editing platform with AI-assisted video creation, repurposing, and template-led production.",
      categories: ["Video", "Design"],
      audience: ["Creators", "Social teams", "Performance marketers"],
      pricing: "Freemium",
      monthlyVisits: 53800000,
      trafficLabel: "53.8M monthly visits",
      recommendation: "A practical pick when velocity, repurposing, and short-form social output matter more than premium studio controls.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "quillbot",
      name: "QuillBot",
      vendor: "QuillBot",
      logoLetter: "Q",
      accent: "linear-gradient(145deg, #14532d, #22c55e)",
      url: "https://quillbot.com/",
      summary: "A widely used writing and paraphrasing tool for rewriting, grammar cleanup, and study-heavy workflows.",
      categories: ["Writing", "Productivity"],
      audience: ["Students", "Researchers", "Knowledge workers"],
      pricing: "Freemium",
      monthlyVisits: 49600000,
      trafficLabel: "49.6M monthly visits",
      recommendation: "A good fit when the actual need is paraphrasing and cleanup rather than a full assistant experience.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "jotform",
      name: "Jotform AI Agents",
      vendor: "Jotform",
      logoLetter: "J",
      accent: "linear-gradient(145deg, #1d4ed8, #f97316)",
      url: "https://www.jotform.com/ai/agents/",
      summary: "A no-code agent layer for support, lead capture, forms, and workflow intake on top of Jotform's distribution surface.",
      categories: ["Automation", "Sales", "Productivity"],
      audience: ["Ops teams", "Support", "Lead gen teams"],
      pricing: "Freemium",
      monthlyVisits: 44100000,
      trafficLabel: "44.1M monthly visits",
      recommendation: "A strong choice for teams that want AI agents in front of real operational intake, not just internal demos.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "hubspot",
      name: "HubSpot AI",
      vendor: "HubSpot",
      logoLetter: "H",
      accent: "linear-gradient(145deg, #ea580c, #fb923c)",
      url: "https://www.hubspot.com/artificial-intelligence",
      summary: "AI embedded into CRM, content, sales, and service workflows for go-to-market teams already running on HubSpot.",
      categories: ["Sales", "Automation", "Writing", "Productivity"],
      audience: ["Marketing teams", "Sales teams", "Customer success"],
      pricing: "Paid",
      monthlyVisits: 42500000,
      trafficLabel: "42.5M monthly visits",
      recommendation: "Most useful when your team wants AI where pipeline, campaigns, and service operations already happen.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "lovable",
      name: "Lovable",
      vendor: "Lovable",
      logoLetter: "L",
      accent: "linear-gradient(145deg, #ec4899, #8b5cf6)",
      url: "https://lovable.dev/",
      summary: "An AI-native product builder that turns prompts into working web app scaffolds quickly enough for startup iteration.",
      categories: ["Coding", "Productivity"],
      audience: ["Founders", "Product builders", "Prototype teams"],
      pricing: "Freemium",
      monthlyVisits: 35300000,
      trafficLabel: "35.3M monthly visits",
      recommendation: "One of the highest-traction prompt-to-app tools for fast concept validation and internal tooling.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "miro",
      name: "Miro AI",
      vendor: "Miro",
      logoLetter: "M",
      accent: "linear-gradient(145deg, #facc15, #fb7185)",
      url: "https://miro.com/ai/",
      summary: "AI assistance layered into a familiar collaborative whiteboard for workshops, planning, and synthesis-heavy teamwork.",
      categories: ["Productivity", "Research"],
      audience: ["Product teams", "Workshops", "Consultants"],
      pricing: "Freemium",
      monthlyVisits: 34400000,
      trafficLabel: "34.4M monthly visits",
      recommendation: "A sensible buy when the team already thinks visually and wants AI inside collaborative planning instead of a separate chat box.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      vendor: "ElevenLabs",
      logoLetter: "E",
      accent: "linear-gradient(145deg, #101828, #6366f1)",
      url: "https://elevenlabs.io/",
      summary: "The premium AI voice platform for narration, voice cloning, dubbing, and multilingual audio production.",
      categories: ["Audio", "Translation"],
      audience: ["Creators", "Studios", "App teams", "Publishers"],
      pricing: "Freemium",
      monthlyVisits: 27000000,
      trafficLabel: "27.0M monthly visits",
      recommendation: "Best-in-class if voice quality and multilingual delivery matter more than bargain pricing.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/elevenlabs",
        toolify: "https://www.toolify.ai/tool/elevenlabs-io"
      }
    },
    {
      id: "airtable",
      name: "Airtable AI",
      vendor: "Airtable",
      logoLetter: "A",
      accent: "linear-gradient(145deg, #f59e0b, #ef4444)",
      url: "https://www.airtable.com/platform/ai",
      summary: "AI added to structured workflows, databases, and ops systems where teams need repeatable records and actions.",
      categories: ["Productivity", "Automation"],
      audience: ["Ops teams", "Marketing ops", "PMO"],
      pricing: "Paid",
      monthlyVisits: 26700000,
      trafficLabel: "26.7M monthly visits",
      recommendation: "Best for teams that already operate through Airtable and want AI to touch live business workflows, not standalone notes.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      vendor: "Hugging Face",
      logoLetter: "H",
      accent: "linear-gradient(145deg, #f59e0b, #facc15)",
      url: "https://huggingface.co/",
      summary: "The default open-model hub for discovery, experimentation, demos, and developer-adjacent AI workflows.",
      categories: ["Coding", "Research"],
      audience: ["ML engineers", "Developers", "Researchers"],
      pricing: "Free / Paid",
      monthlyVisits: 26400000,
      trafficLabel: "26.4M monthly visits",
      recommendation: "Essential if your team evaluates open models or wants a broad view of the fast-moving AI tooling ecosystem.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "gamma",
      name: "Gamma",
      vendor: "Gamma",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #5b21b6, #e879f9)",
      url: "https://gamma.app/",
      summary: "A fast AI deck and doc builder for modern presentations, mini-sites, and narrative updates.",
      categories: ["Design", "Productivity", "Writing"],
      audience: ["Founders", "Sales", "Consultants", "Educators"],
      pricing: "Freemium",
      monthlyVisits: 25300000,
      trafficLabel: "25.3M monthly visits",
      recommendation: "A strong fit for teams that need investor decks, client narratives, or polished internal updates quickly.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/tool/gamma-ai-1"
      }
    },
    {
      id: "genspark",
      name: "Genspark",
      vendor: "Genspark",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #3b82f6, #10b981)",
      url: "https://www.genspark.ai/",
      summary: "An AI answer and page-generation experience focused on packaged research outputs and discovery.",
      categories: ["Research", "Assistants"],
      audience: ["Researchers", "Analysts", "General users"],
      pricing: "Freemium",
      monthlyVisits: 20700000,
      trafficLabel: "20.7M monthly visits",
      recommendation: "Worth exploring if you prefer pre-assembled answer pages over a plain chatbot response.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "photoroom",
      name: "Photoroom",
      vendor: "Photoroom",
      logoLetter: "P",
      accent: "linear-gradient(145deg, #111827, #8b5cf6)",
      url: "https://www.photoroom.com/",
      summary: "A practical creative tool for product images, background cleanup, and e-commerce-ready visual editing.",
      categories: ["Design", "Productivity"],
      audience: ["E-commerce teams", "Marketers", "Creators"],
      pricing: "Freemium",
      monthlyVisits: 20400000,
      trafficLabel: "20.4M monthly visits",
      recommendation: "An easy win when your actual problem is product-image speed, not full-spectrum art generation.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "openrouter",
      name: "OpenRouter",
      vendor: "OpenRouter",
      logoLetter: "O",
      accent: "linear-gradient(145deg, #111827, #22c55e)",
      url: "https://openrouter.ai/",
      summary: "A model gateway for routing across frontier and open-source models from one developer-friendly surface.",
      categories: ["Coding", "Automation", "Assistants"],
      audience: ["Developers", "AI builders", "Agencies"],
      pricing: "Usage-based",
      monthlyVisits: 15800000,
      trafficLabel: "15.8M monthly visits",
      recommendation: "A strong infrastructure pick when comparing many models matters more than buying a single chat app.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "midjourney",
      name: "Midjourney",
      vendor: "Midjourney",
      logoLetter: "M",
      accent: "linear-gradient(145deg, #0f172a, #0ea5e9)",
      url: "https://www.midjourney.com/",
      summary: "A benchmark creative engine for high-end AI imagery, concept exploration, and visual art direction.",
      categories: ["Design"],
      audience: ["Designers", "Art directors", "Brand teams", "Creators"],
      pricing: "Paid",
      monthlyVisits: 16000000,
      trafficLabel: "16.0M monthly visits",
      recommendation: "Still one of the strongest picks when image quality and aesthetics matter more than simplicity.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/midjourney",
        toolify: "https://www.toolify.ai/tool/midjourney"
      }
    },
    {
      id: "stitch",
      name: "Stitch",
      vendor: "Google",
      logoLetter: "S",
      accent: "linear-gradient(145deg, #2563eb, #14b8a6)",
      url: "https://stitch.withgoogle.com/",
      summary: "A prompt-first interface builder from Google aimed at quickly turning ideas into UI screens and flows.",
      categories: ["Design", "Coding"],
      audience: ["Product designers", "Prototype teams", "Builders"],
      pricing: "Free / Paid",
      monthlyVisits: 12900000,
      trafficLabel: "12.9M monthly visits",
      recommendation: "Worth adding to a product workflow when you want AI help shaping UI concepts before engineering starts.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "replit",
      name: "Replit AI",
      vendor: "Replit",
      logoLetter: "R",
      accent: "linear-gradient(145deg, #f97316, #fb7185)",
      url: "https://replit.com/ai",
      summary: "An AI coding environment that blends generation, editing, hosting, and collaborative prototyping in one browser workspace.",
      categories: ["Coding", "Productivity"],
      audience: ["Developers", "Students", "Prototype teams"],
      pricing: "Freemium",
      monthlyVisits: 12800000,
      trafficLabel: "12.8M monthly visits",
      recommendation: "A strong fit if you want AI-assisted coding and deployment without switching between five separate tools.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "veed",
      name: "VEED",
      vendor: "VEED",
      logoLetter: "V",
      accent: "linear-gradient(145deg, #111827, #22d3ee)",
      url: "https://www.veed.io/",
      summary: "A browser-native video editor with AI subtitling, cleanup, and marketing-friendly production tools.",
      categories: ["Video", "Audio"],
      audience: ["Marketing teams", "Creators", "Agencies"],
      pricing: "Freemium",
      monthlyVisits: 11800000,
      trafficLabel: "11.8M monthly visits",
      recommendation: "A safe, broad video utility pick when the team needs polished output without a desktop editing stack.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "heygen",
      name: "HeyGen",
      vendor: "HeyGen",
      logoLetter: "H",
      accent: "linear-gradient(145deg, #ef4444, #fb7185)",
      url: "https://www.heygen.com/",
      summary: "A polished AI avatar platform for multilingual business videos, product explainers, and internal training.",
      categories: ["Video", "Translation"],
      audience: ["Marketing", "Sales enablement", "L&D", "Customer success"],
      pricing: "Freemium",
      monthlyVisits: 8700000,
      trafficLabel: "8.7M monthly visits",
      recommendation: "Best suited for companies that need repeatable video production without a traditional studio workflow.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/heygen",
        toolify: "https://www.toolify.ai/tool/heygen"
      }
    },
    {
      id: "semanticscholar",
      name: "Semantic Scholar",
      vendor: "Allen Institute for AI",
      logoLetter: "S",
      accent: "linear-gradient(145deg, #2563eb, #14b8a6)",
      url: "https://www.semanticscholar.org/",
      summary: "A research-focused discovery engine that matters for academic search, literature review, and signal-rich paper triage.",
      categories: ["Research"],
      audience: ["Researchers", "Students", "Analysts"],
      pricing: "Free",
      monthlyVisits: 8700000,
      trafficLabel: "8.7M monthly visits",
      recommendation: "One of the better research add-ons when your work depends on papers, citations, and deeper reading.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "otter",
      name: "Otter AI",
      vendor: "Otter",
      logoLetter: "O",
      accent: "linear-gradient(145deg, #2563eb, #6366f1)",
      url: "https://otter.ai/",
      summary: "A mainstream meeting assistant for transcripts, summaries, and lightweight team recall.",
      categories: ["Meetings", "Productivity", "Writing"],
      audience: ["Managers", "Sales", "Recruiting", "Remote teams"],
      pricing: "Freemium",
      monthlyVisits: 8300000,
      trafficLabel: "8.3M monthly visits",
      recommendation: "Still one of the most practical default buys when meetings are the operational bottleneck.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "zapier",
      name: "Zapier AI",
      vendor: "Zapier",
      logoLetter: "Z",
      accent: "linear-gradient(145deg, #f97316, #facc15)",
      url: "https://zapier.com/ai",
      summary: "AI plus automation orchestration for connecting apps, workflows, and routine business operations.",
      categories: ["Automation", "Productivity"],
      audience: ["Ops teams", "Founders", "Agencies", "No-code teams"],
      pricing: "Freemium",
      monthlyVisits: 7300000,
      trafficLabel: "7.3M monthly visits",
      recommendation: "A staple when you need AI to trigger real business actions instead of stopping at content generation.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "runway",
      name: "Runway",
      vendor: "Runway",
      logoLetter: "R",
      accent: "linear-gradient(145deg, #111827, #22c55e)",
      url: "https://runwayml.com/",
      summary: "A leading AI video and generative media platform for cinematic edits, motion, and production experiments.",
      categories: ["Video", "Design"],
      audience: ["Creative teams", "Studios", "Brand marketers"],
      pricing: "Freemium",
      monthlyVisits: 6200000,
      trafficLabel: "6.2M monthly visits",
      recommendation: "A stronger fit than template tools when the team cares about higher-end creative control and visual ambition.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "kapwing",
      name: "Kapwing",
      vendor: "Kapwing",
      logoLetter: "K",
      accent: "linear-gradient(145deg, #8b5cf6, #ec4899)",
      url: "https://www.kapwing.com/ai",
      summary: "A browser-based content editing platform with AI tooling for subtitles, clips, scripts, and quick social production.",
      categories: ["Video", "Writing"],
      audience: ["Creators", "Social teams", "Small agencies"],
      pricing: "Freemium",
      monthlyVisits: 6100000,
      trafficLabel: "6.1M monthly visits",
      recommendation: "A good fit for lightweight content teams that need editing speed and script-to-video help in one place.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "framer",
      name: "Framer AI",
      vendor: "Framer",
      logoLetter: "F",
      accent: "linear-gradient(145deg, #111827, #60a5fa)",
      url: "https://www.framer.com/ai/",
      summary: "An AI-assisted website builder that matters for landing pages, launches, and visually polished startup sites.",
      categories: ["Design", "Coding", "Productivity"],
      audience: ["Founders", "Marketers", "Design engineers"],
      pricing: "Freemium",
      monthlyVisits: 5800000,
      trafficLabel: "5.8M monthly visits",
      recommendation: "Great for startup teams that want better aesthetics and publishing control than generic no-code site builders.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "consensus",
      name: "Consensus",
      vendor: "Consensus",
      logoLetter: "C",
      accent: "linear-gradient(145deg, #0f766e, #14b8a6)",
      url: "https://consensus.app/",
      summary: "A research-focused AI product aimed at evidence-backed answers from scientific literature.",
      categories: ["Research"],
      audience: ["Researchers", "Healthcare analysts", "Students"],
      pricing: "Freemium",
      monthlyVisits: 5100000,
      trafficLabel: "5.1M monthly visits",
      recommendation: "Useful when the question demands evidence from papers rather than a generic web summary.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "cursor",
      name: "Cursor",
      vendor: "Anysphere",
      logoLetter: "C",
      accent: "linear-gradient(145deg, #111827, #6366f1)",
      url: "https://cursor.com/",
      summary: "A high-traction AI code editor built around pair programming, repo understanding, and fast implementation loops.",
      categories: ["Coding"],
      audience: ["Developers", "Startup engineers", "Technical founders"],
      pricing: "Freemium",
      monthlyVisits: 4600000,
      trafficLabel: "4.6M monthly visits",
      recommendation: "One of the clearest picks if your buying goal is AI-native software development rather than general chat.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "fireflies",
      name: "Fireflies.ai",
      vendor: "Fireflies",
      logoLetter: "F",
      accent: "linear-gradient(145deg, #2563eb, #a855f7)",
      url: "https://fireflies.ai/",
      summary: "A meeting intelligence tool for transcripts, notes, search, and CRM-friendly follow-up workflows.",
      categories: ["Meetings", "Sales", "Productivity"],
      audience: ["Sales teams", "Recruiters", "Managers"],
      pricing: "Freemium",
      monthlyVisits: 4600000,
      trafficLabel: "4.6M monthly visits",
      recommendation: "A strong alternative to Otter when meetings need to feed downstream sales or ops workflows.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "glean",
      name: "Glean",
      vendor: "Glean",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #111827, #06b6d4)",
      url: "https://www.glean.com/",
      summary: "Enterprise search and knowledge access aimed at large organizations with fragmented internal systems.",
      categories: ["Research", "Productivity"],
      audience: ["Enterprise IT", "Knowledge teams", "Large organizations"],
      pricing: "Paid",
      monthlyVisits: 3500000,
      trafficLabel: "3.5M monthly visits",
      recommendation: "Best considered when the real problem is enterprise knowledge retrieval rather than casual chatbot use.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "goodnotes",
      name: "Goodnotes AI",
      vendor: "Goodnotes",
      logoLetter: "G",
      accent: "linear-gradient(145deg, #2563eb, #10b981)",
      url: "https://www.goodnotes.com/ai",
      summary: "AI-assisted note taking and study support layered into one of the most recognizable digital notebook products.",
      categories: ["Productivity", "Writing"],
      audience: ["Students", "Educators", "Note-heavy professionals"],
      pricing: "Freemium",
      monthlyVisits: 3100000,
      trafficLabel: "3.1M monthly visits",
      recommendation: "A practical add-on for note-heavy users who already prefer a notebook workflow over docs and wikis.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "windsurf",
      name: "Windsurf",
      vendor: "Codeium",
      logoLetter: "W",
      accent: "linear-gradient(145deg, #0f172a, #14b8a6)",
      url: "https://windsurf.com/",
      summary: "An AI-native coding environment positioned for flow-state development and repo-aware execution.",
      categories: ["Coding"],
      audience: ["Developers", "Teams exploring AI IDEs"],
      pricing: "Freemium",
      monthlyVisits: 2800000,
      trafficLabel: "2.8M monthly visits",
      recommendation: "A legitimate option to compare if you are shopping specifically for the next generation of AI coding IDEs.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "figma",
      name: "Figma AI",
      vendor: "Figma",
      logoLetter: "F",
      accent: "linear-gradient(145deg, #111827, #6366f1)",
      url: "https://www.figma.com/ai/",
      summary: "Figma's AI layer helps teams generate UI drafts, rewrite copy, and move faster inside an already-standard product design workflow.",
      categories: ["Design", "Productivity"],
      audience: ["Product designers", "Design systems teams", "PMs"],
      pricing: "Free / Paid",
      monthlyVisits: 85000000,
      trafficLabel: "85.0M monthly visits",
      recommendation: "A natural fit if your design workflow already runs through Figma and you want AI without adding another surface area.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "notebooklm",
      name: "NotebookLM",
      vendor: "Google",
      iconFile: "notebooklm.svg",
      logoLetter: "N",
      accent: "linear-gradient(145deg, #2563eb, #0ea5e9)",
      url: "https://notebooklm.google.com/",
      summary: "A source-grounded research workspace for turning documents, transcripts, and links into briefings, notes, and audio overviews.",
      categories: ["Research", "Productivity", "Writing"],
      audience: ["Researchers", "Students", "Analysts", "Operators"],
      pricing: "Free / Paid",
      monthlyVisits: 28700000,
      trafficLabel: "28.7M monthly visits",
      recommendation: "One of the strongest research picks when you want answers anchored to your own uploaded material rather than general web recall.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "bolt",
      name: "bolt.new",
      vendor: "StackBlitz",
      iconFile: "bolt.svg",
      logoLetter: "B",
      accent: "linear-gradient(145deg, #f97316, #facc15)",
      url: "https://bolt.new/",
      summary: "A prompt-to-app builder that is especially good for fast full-stack prototypes and frontend experiments in the browser.",
      categories: ["Coding", "Productivity"],
      audience: ["Founders", "Prototype teams", "Developers"],
      pricing: "Freemium",
      monthlyVisits: 24100000,
      trafficLabel: "24.1M monthly visits",
      recommendation: "Worth testing if your team wants a quick path from idea to runnable product mock without setting up a local stack first.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "v0",
      name: "v0",
      vendor: "Vercel",
      logoLetter: "V",
      accent: "linear-gradient(145deg, #111827, #64748b)",
      url: "https://v0.app/",
      summary: "Vercel's UI generation product is built for teams that want AI-assisted interface scaffolding tied to modern frontend patterns.",
      categories: ["Coding", "Design", "Productivity"],
      audience: ["Frontend developers", "Design engineers", "Startup builders"],
      pricing: "Freemium",
      monthlyVisits: 16700000,
      trafficLabel: "16.7M monthly visits",
      recommendation: "A high-signal option if your output needs to feel closer to production frontend code than pure mockup generation.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "ideogram",
      name: "Ideogram",
      vendor: "Ideogram",
      logoLetter: "I",
      accent: "linear-gradient(145deg, #7c3aed, #ec4899)",
      url: "https://ideogram.ai/",
      summary: "An image model with particular strength around styled visuals, poster-like assets, and text-forward image generation.",
      categories: ["Design"],
      audience: ["Marketers", "Brand teams", "Creative generalists"],
      pricing: "Freemium",
      monthlyVisits: 11200000,
      trafficLabel: "11.2M monthly visits",
      recommendation: "A strong comparison point when your team cares about typography inside generated visuals and more campaign-style outputs.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "recraft",
      name: "Recraft",
      vendor: "Recraft",
      logoLetter: "R",
      accent: "linear-gradient(145deg, #0f766e, #22c55e)",
      url: "https://www.recraft.ai/",
      summary: "A design-focused image tool that leans toward editable brand assets, illustration workflows, and cleaner creative control.",
      categories: ["Design", "Productivity"],
      audience: ["Brand designers", "Agencies", "Creative ops"],
      pricing: "Freemium",
      monthlyVisits: 7600000,
      trafficLabel: "7.6M monthly visits",
      recommendation: "Most relevant when you want a more design-native image workflow instead of a pure text-to-image playground.",
      sources: {
        futurepedia: "https://www.futurepedia.io/ai-tools",
        toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
      }
    },
    {
      id: "synthesia",
      name: "Synthesia",
      vendor: "Synthesia",
      logoLetter: "S",
      accent: "linear-gradient(145deg, #0f766e, #06b6d4)",
      url: "https://www.synthesia.io/",
      summary: "A business-grade AI video platform for training, onboarding, internal communications, and localization.",
      categories: ["Video", "Translation"],
      audience: ["Enterprise teams", "Training", "HR", "Operations"],
      pricing: "Freemium",
      monthlyVisits: 1700000,
      trafficLabel: "1.7M monthly visits",
      recommendation: "A sensible choice when governance, templates, and repeatable business video matter more than flash.",
      sources: {
        futurepedia: "https://www.futurepedia.io/tool/synthesia",
        toolify: "https://www.toolify.ai/tool/synthesia"
      }
    }
  ]
};
