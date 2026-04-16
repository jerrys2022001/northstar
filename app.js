(function () {
  const catalog = window.AI_CATALOG;
  if (!catalog || !Array.isArray(catalog.tools)) {
    return;
  }

  const preferredRankingOrder = [
    "Assistants",
    "Research",
    "Writing",
    "Design",
    "Video",
    "Productivity",
    "Translation",
    "Coding",
    "Audio",
    "Automation",
    "Meetings",
    "Sales"
  ];
  const editorPickIds = [
    "chatgpt", "claude", "perplexity", "cursor",
    "notion", "gamma", "canva", "figma",
    "runway", "elevenlabs", "deepl", "githubcopilot",
    "n8n", "notebooklm"
  ];
  const newAndNotableIds = [
    "deepseek", "lovable", "stitch", "windsurf",
    "bolt", "v0", "genspark", "googleaistudio",
    "ideogram", "recraft", "pika", "krea",
    "luma", "continue", "granola", "lindy"
  ];
  const operatorStackFlows = [
    {
      title: "Research -> Brief -> Deck",
      description: "A clean founder workflow for market scanning, synthesis, and presenting the story.",
      toolIds: ["perplexity", "notebooklm", "chatgpt", "gamma"],
      stepNotes: [
        "Scan the market and collect live signal fast.",
        "Digest sources into structured notes and evidence.",
        "Turn findings into an executive-ready brief.",
        "Package the narrative into a clean presentation."
      ]
    },
    {
      title: "Write -> Edit -> Translate",
      description: "Produce readable copy, tighten tone, and ship multilingual output without context loss.",
      toolIds: ["claude", "grammarly", "deepl", "notion"],
      stepNotes: [
        "Draft the first high-quality version of the content.",
        "Tighten clarity, tone, and grammar before release.",
        "Translate while preserving nuance and intent.",
        "Organize the final copy for team publishing."
      ]
    },
    {
      title: "Design -> Motion -> Avatar",
      description: "Turn visual direction into assets, motion, and spokesperson video for campaigns.",
      toolIds: ["figma", "canva", "runway", "heygen"],
      stepNotes: [
        "Shape the core interface or visual system.",
        "Produce campaign assets and fast creative variations.",
        "Add motion, effects, and scene polish.",
        "Create presenter-led video for delivery."
      ]
    },
    {
      title: "Code -> Ship -> Automate",
      description: "Plan product work, generate code faster, and connect follow-up ops into automation.",
      toolIds: ["cursor", "githubcopilot", "replit", "n8n"],
      stepNotes: [
        "Drive implementation inside the main coding workflow.",
        "Accelerate code generation and inline suggestions.",
        "Prototype, test, and demo quickly in the browser.",
        "Wire the shipped flow into backend automations."
      ]
    },
    {
      title: "Meet -> Capture -> Follow Up",
      description: "Record calls, summarize decisions, and push next steps into the team workflow.",
      toolIds: ["tldv", "fireflies", "otter", "airtable"],
      stepNotes: [
        "Capture the meeting with searchable highlights.",
        "Generate follow-up summaries and action extraction.",
        "Keep a readable transcript and note record.",
        "Track owners, status, and next steps."
      ]
    },
    {
      title: "Script -> Voice -> Edit",
      description: "Draft scripts, create voiceover, and clean up final media for publishing.",
      toolIds: ["chatgpt", "elevenlabs", "descript", "capcut"],
      stepNotes: [
        "Write the script and rough creative direction.",
        "Generate natural voiceover from the approved script.",
        "Edit dialogue, timing, and spoken delivery.",
        "Assemble and export the final social cut."
      ]
    }
  ];
  const newsSourceLadder = [
    {
      tier: "Tier 1",
      title: "Must Watch",
      note: "Highest density for AI tool discovery and product movement.",
      sources: ["The Rundown AI", "Superhuman AI", "Ben's Bites"]
    },
    {
      tier: "Tier 2",
      title: "Context Layer",
      note: "Useful for momentum, broader discussion, and live operator sentiment.",
      sources: ["TLDR AI", "The Neuron", "Hacker News"]
    },
    {
      tier: "Tier 3",
      title: "Authority Layer",
      note: "Best for original technical releases, research, and official product narratives.",
      sources: ["MIT News", "OpenAI Blog", "DeepMind"]
    }
  ];
  const newsFeed = [
  {
    "date": "2026-04-15",
    "label": "April 15, 2026",
    "items": [
      {
        "id": "gemini-personal-intelligence-india-apr15",
        "category": "Product Updates",
        "title": "Gemini Personal Intelligence expands to India",
        "source": "TechCrunch",
        "summary": "Google is bringing Gemini's Personal Intelligence feature to India, letting paid users connect Google services so Gemini can answer with account-aware context.",
        "href": "https://techcrunch.com/2026/04/14/google-brings-its-gemini-personal-intelligence-feature-to-india/",
        "imageUrl": "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
        "excerpt": "Market read: India gives Google a large proving ground for personalized assistant workflows grounded in first-party services."
      },
      {
        "id": "chrome-gemini-skills-apr15",
        "category": "Productivity",
        "title": "Chrome turns Gemini prompts into repeatable Skills",
        "source": "The Verge",
        "summary": "Google is rolling out Chrome Skills so users can save Gemini prompts and reuse them across pages for repeatable browsing, shopping, research, and productivity tasks.",
        "href": "https://www.theverge.com/tech/911658/google-chrome-gemini-ai-skills-availability-launch",
        "imageUrl": "assets/news/source-verge-chrome-skills.webp",
        "excerpt": "Product angle: prompt reuse is moving from power-user habit into browser-native workflow infrastructure."
      },
      {
        "id": "openai-gpt-54-cyber-tac-apr15",
        "category": "Safety",
        "title": "OpenAI opens GPT-5.4-Cyber through a broader trusted-access program",
        "source": "OpenAI Blog",
        "summary": "OpenAI is expanding Trusted Access for Cyber and introducing GPT-5.4-Cyber, a cyber-permissive GPT-5.4 variant for verified defensive security teams.",
        "href": "https://openai.com/index/scaling-trusted-access-for-cyber-defense/",
        "imageUrl": "assets/news/openai-cyber-defense-local.jpg",
        "excerpt": "Signal: OpenAI is moving from blanket restriction toward verified-access deployment for high-capability defensive cyber models."
      },
      {
        "id": "axios-openai-cyber-access-apr15",
        "category": "Safety",
        "title": "OpenAI's cyber model rollout tests the market for verified AI defense access",
        "source": "Axios",
        "summary": "OpenAI's GPT-5.4-Cyber launch gives vetted security vendors, organizations, and researchers access to stronger defensive tooling while keeping the program gated.",
        "href": "https://www.axios.com/2026/04/14/openai-model-cyber-program-release",
        "imageUrl": "assets/news/fallback-axios-openai-cyber.webp",
        "excerpt": "Why it matters: access-control policy is becoming a product feature for frontier cybersecurity models."
      },
      {
        "id": "anthropic-mythos-cisa-response-apr15",
        "category": "Policy",
        "title": "Anthropic Mythos forces a harder government conversation about AI cyber defense",
        "source": "Axios",
        "summary": "Anthropic's Mythos Preview has renewed debate over how public agencies should use frontier AI for critical-infrastructure defense amid CISA staffing and funding pressure.",
        "href": "https://www.axios.com/2026/04/14/anthropic-mythos-trump-administration-cisa-cuts",
        "excerpt": "Policy angle: powerful defensive models are only useful if governments can absorb them operationally."
      },
      {
        "id": "microsoft-copilot-openclaw-like-agents-apr15",
        "category": "Agents",
        "title": "Microsoft tests OpenClaw-like agents for Microsoft 365 Copilot",
        "source": "The Verge",
        "summary": "Microsoft is testing always-on Copilot agents for Microsoft 365 that could watch inboxes, calendars, and role-specific work streams while staying inside enterprise controls.",
        "href": "https://www.theverge.com/tech/911080/microsoft-ai-openclaw-365-businesses",
        "excerpt": "Enterprise angle: Microsoft is trying to turn agent autonomy into a managed workplace feature, not a loose desktop experiment."
      },
      {
        "id": "nvidia-ising-quantum-ai-apr15",
        "category": "Open Models",
        "title": "Nvidia launches open Ising AI models for quantum computing",
        "source": "Nvidia",
        "summary": "Nvidia introduced the Ising open model family to help researchers and enterprises improve quantum processor calibration and error correction.",
        "href": "https://seekingalpha.com/pr/20472509-nvidia-launches-ising-the-world-s-first-open-ai-models-to-accelerate-the-path-to-useful",
        "excerpt": "Infrastructure signal: AI is becoming a control layer for the next generation of quantum-computing hardware."
      },
      {
        "id": "synera-agentic-engineering-funding-apr15",
        "category": "Funding",
        "title": "Synera raises $40M to bring agentic AI into industrial engineering",
        "source": "Business Wire",
        "summary": "Synera raised a $40 million Series B to scale an agentic AI platform that orchestrates engineering workflows across existing design and simulation tools.",
        "href": "https://finance.yahoo.com/sectors/technology/articles/synera-raises-40m-series-b-120000022.html",
        "excerpt": "Funding read: agentic AI is moving into high-value engineering work where integrations and on-prem deployment matter."
      },
      {
        "id": "ranger-ai-industrial-rfp-funding-apr15",
        "category": "Funding",
        "title": "Ranger AI surfaces as another industrial agent workflow bet",
        "source": "AlleyWatch",
        "summary": "Ranger AI, an AI agent platform for industrial RFP response and tendering workflows, reported a $6 million funding round in the April 14 startup funding report.",
        "href": "https://alleywatch.com/2026/04/the-alleywatch-startup-daily-funding-report-4-14-2026/",
        "excerpt": "Startup signal: investors are backing narrower agent platforms that target expensive operational paperwork."
      },
      {
        "id": "bluefish-ai-visibility-series-b-apr15",
        "category": "Funding",
        "title": "Bluefish raises $43M for AI visibility and agentic marketing",
        "source": "citybiz",
        "summary": "Bluefish raised $43 million in Series B funding for a platform that helps brands understand and influence how they appear inside AI-generated discovery surfaces.",
        "href": "https://www.citybiz.co/article/832169/nea-backed-bluefish-raises-43-million-series-b-as-fortune-500-adopts-ai-marketing-platform/",
        "excerpt": "Market signal: enterprises are starting to budget for how brands show up inside LLM answers, not just search pages."
      }
    ]
  },
  {
    "date": "2026-04-14",
    "label": "April 14, 2026",
    "items": [
      {
        "id": "bringing-people-together-at-ai-for-the-economy-f-373936d3-apr14",
        "category": "Product Updates",
        "title": "Bringing people together at AI for the Economy Forum",
        "source": "Google AI Blog",
        "summary": "Google is bringing people together in Washington D.C. at our AI for the Economy Forum.",
        "href": "https://blog.google/company-news/outreach-and-initiatives/creating-opportunity/ai-economy-forum/",
        "imageUrl": "assets/news/fallback-google-ai-economy.webp",
        "excerpt": "Radar signal: Google AI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "human-machine-teaming-dives-underwater-84d4323c-apr14",
        "category": "Research Workflows",
        "title": "Human-machine teaming dives underwater",
        "source": "MIT News AI",
        "summary": "Researchers are developing hardware and algorithms to improve collaboration between divers and autonomous underwater vehicles engaged in maritime missions.",
        "href": "https://news.mit.edu/2026/human-machine-teaming-dives-underwater-0414",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-13",
    "label": "April 13, 2026",
    "items": [
      {
        "id": "cursor-3-1-tiled-agents-apr13",
        "category": "Developer Tools",
        "title": "Cursor 3.1 adds tiled agent views and more reliable voice input",
        "source": "Cursor Changelog",
        "summary": "Cursor's latest release makes multi-agent coding sessions easier to supervise by adding a tiled layout in the Agents Window and upgrading dictation with batch speech-to-text.",
        "href": "https://cursor.com/changelog",
        "excerpt": "Why it matters: coding tools are shifting from single-chat copilots toward parallel agent workspaces that feel closer to an operating console."
      }
    ]
  },
  {
    "date": "2026-04-12",
    "label": "April 12, 2026",
    "items": [
      {
        "id": "gemini-flash-live-apr12",
        "category": "Model Releases",
        "title": "Gemini 3.1 Flash Live becomes Google's clearest push into always-on voice AI",
        "source": "Google Blog",
        "summary": "Google is pushing Gemini deeper into real-time assistant workflows with a lower-latency audio model that feels built for live conversation, demos, and multimodal agent experiences.",
        "href": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/",
        "imageUrl": "assets/news/google-gemini-flash-live-source.webp",
        "excerpt": "Heat read: Gemini still leads this site's traffic ranking, so product moves that improve latency and voice reliability are among the most representative April signals."
      },
      {
        "id": "perplexity-build-challenge-apr12",
        "category": "Agents",
        "title": "Perplexity keeps using Computer to reposition itself as a builder platform",
        "source": "Superhuman AI",
        "summary": "Perplexity is using a public startup challenge to frame Computer as more than a research assistant, pushing it toward an agent platform with broader builder appeal.",
        "href": "https://www.superhuman.ai/p/perplexity-s-billion-dollar-challenge",
        "imageUrl": "assets/news/perplexity-build-challenge-original.jpg",
        "excerpt": "Heat read: Perplexity's traffic is lower than ChatGPT or Gemini, but product momentum remains unusually strong whenever it expands beyond search."
      },
      {
        "id": "chatgpt-100-tier-apr12",
        "category": "Product Updates",
        "title": "ChatGPT's new $100 plan makes Codex-heavy usage feel more mainstream",
        "source": "The Neuron",
        "summary": "OpenAI's new pricing layer widens the on-ramp for heavier ChatGPT and Codex usage, making advanced agent workflows feel less niche than a single premium paywall approach.",
        "href": "https://www.theneurondaily.com/p/chatgpt-gets-a-100-tier#openai-adds-100-tier",
        "imageUrl": "assets/news/chatgpt-100-tier-source.png",
        "excerpt": "Heat read: with ChatGPT still one of the highest-traffic AI products online, pricing moves are effectively market signals about where real demand is concentrating."
      },
      {
        "id": "adobe-firefly-precision-apr12",
        "category": "Creative AI",
        "title": "Adobe Firefly shifts from wow-factor generation toward exact image control",
        "source": "Adobe Blog",
        "summary": "Adobe's latest Firefly release is less about one-click novelty and more about precise editing controls that fit real creative-team revision loops inside an existing production stack.",
        "href": "https://blog.adobe.com/en/publish/2026/04/09/new-image-editing-features-adobe-firefly-get-you-from-almost-there-to-exactly-right",
        "imageUrl": "assets/news/adobe-firefly-precision-flow.jpg",
        "excerpt": "Heat read: Firefly remains one of the biggest design-side AI destinations, so practical editing upgrades matter more than another benchmark-style announcement."
      },
      {
        "id": "claude-managed-agents-apr12",
        "category": "Agents",
        "title": "Claude Managed Agents gives Anthropic a more complete hosted agent stack",
        "source": "Anthropic Engineering",
        "summary": "Anthropic is turning Claude from a strong chat surface into more durable agent infrastructure, with hosted sessions designed for longer-running, recoverable production work.",
        "href": "https://www.anthropic.com/engineering/managed-agents",
        "imageUrl": "assets/news/claude-managed-agents-original.png",
        "excerpt": "Heat read: Claude remains one of the highest-traffic top tools on the site, so managed orchestration is a more meaningful signal than another generic model benchmark."
      }
    ]
  },
  {
    "date": "2026-04-11",
    "label": "April 11, 2026",
    "items": [
      {
        "id": "gemma-4-open-weight-apr11",
        "category": "Open Models",
        "title": "Gemma 4 strengthens Google's open-weight story for AI Studio builders",
        "source": "DeepMind",
        "summary": "DeepMind is framing Gemma 4 around practical capability per parameter, giving Google a stronger open-model narrative that complements Gemini and boosts the AI Studio ecosystem.",
        "href": "https://deepmind.google/discover/blog/gemma-4-byte-for-byte-the-most-capable-open-models/",
        "excerpt": "Tool angle: for Google AI Studio users, Gemma 4 is important because it broadens what the Google stack can offer outside a single closed-model lane."
      },
      {
        "id": "deepseek-v3-open-source-pressure-apr11",
        "category": "Open Models",
        "title": "DeepSeek V3-0324 keeps raising pressure on proprietary model leaders",
        "source": "AI News",
        "summary": "DeepSeek continues to gain attention as one of the few open-model challengers forcing Gemini, Claude, and ChatGPT to respond to faster-moving price and capability pressure.",
        "href": "https://www.artificialintelligence-news.com/news/deepseek-v3-0324-tops-non-reasoning-ai-models-open-source-first/",
        "excerpt": "Tool angle: DeepSeek remains one of the clearest open-model stories inside this site's top-traffic AI stack."
      },
      {
        "id": "codex-3m-weekly-users-apr11",
        "category": "Developer Tools",
        "title": "Codex at 3M weekly users shows coding agents are crossing into the mainstream",
        "source": "The Neuron",
        "summary": "The latest Codex growth milestone suggests AI coding agents are no longer just for early adopters and power users, but are becoming part of the default developer toolkit.",
        "href": "https://www.theneurondaily.com/p/did-zuck-reboot-the-race#codex-3m-users",
        "excerpt": "Tool angle: ChatGPT and Codex are increasingly winning not just on model quality but on repeated, habitual use."
      },
      {
        "id": "claude-mythos-cyber-positioning-apr11",
        "category": "Model Releases",
        "title": "Claude Mythos keeps pushing Anthropic toward a cyber-and-safety-first release posture",
        "source": "Superhuman AI",
        "summary": "Anthropic's Mythos messaging is positioning Claude as a higher-stakes model family, with benchmark gains wrapped in a more defensive release narrative around security risk.",
        "href": "https://www.superhuman.ai/p/anthropic-announces-new-claude-mythos-model",
        "excerpt": "Tool angle: this is less about a single launch and more about how Anthropic wants the market to interpret Claude's next frontier step."
      }
    ]
  },
  {
    "date": "2026-04-10",
    "label": "April 10, 2026",
    "items": [
      {
        "id": "gemini-mental-health-safeguards-apr10",
        "category": "Safety",
        "title": "Google adds stronger mental-health safeguards to Gemini after lawsuits",
        "source": "The Neuron",
        "summary": "Google is widening Gemini's safety posture with crisis hotlines and anti-self-harm design changes, showing how trust and liability are becoming product-level concerns.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#gemini-safeguards",
        "excerpt": "Why it matters: the next competitive layer is not just capability, but whether products can operate safely at consumer scale."
      },
      {
        "id": "gemini-notebooks-persistent-context-apr10",
        "category": "Research Workflows",
        "title": "Notebooks in Gemini brings longer-lived project context into Google's consumer stack",
        "source": "The Neuron",
        "summary": "Google's new notebooks layer makes Gemini feel more useful for recurring research and presentation work by turning one-off chats into reusable, project-based context.",
        "href": "https://www.theneurondaily.com/p/chatgpt-gets-a-100-tier#notebooklm-in-gemini",
        "excerpt": "Why it matters: persistent context is one of the most practical product levers for keeping users inside one AI ecosystem."
      },
      {
        "id": "openai-child-safety-blueprint-apr10",
        "category": "Safety",
        "title": "OpenAI expands its trust narrative with the Child Safety Blueprint",
        "source": "OpenAI Blog",
        "summary": "OpenAI's latest safety framework pushes ChatGPT's public story beyond launches and pricing into reporting systems, enforcement coordination, and safer default behavior.",
        "href": "https://openai.com/index/introducing-child-safety-blueprint/",
        "excerpt": "Why it matters: frontier labs are increasingly competing on visible safety infrastructure as well as model capability."
      },
      {
        "id": "adobe-student-spaces-apr10",
        "category": "Productivity",
        "title": "Adobe pushes Firefly-adjacent study workflows into Acrobat with Student Spaces",
        "source": "The Neuron",
        "summary": "Adobe is extending its AI footprint beyond image generation by turning Acrobat into a study and synthesis tool for notes, flashcards, podcasts, and presentations.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#adobe-student-spaces",
        "excerpt": "Why it matters: Adobe is using existing workflow surfaces, not standalone hype, to deepen AI usage."
      },
      {
        "id": "deepl-agent-rollout-apr10",
        "category": "Translation AI",
        "title": "DeepL is positioning AI Agent as a multilingual workflow layer for business teams",
        "source": "DeepL",
        "summary": "DeepL is framing AI Agent as more than translation, pushing toward a broader business assistant layer for international teams handling support, writing, and operations.",
        "href": "https://www.deepl.com/en/products/ai-agent",
        "excerpt": "Why it matters: DeepL remains one of the most commercially credible AI tools outside the big model labs."
      }
    ]
  },
  {
    "date": "2026-04-09",
    "label": "April 9, 2026",
    "items": [
      {
        "id": "openai-illinois-liability-bill-apr09",
        "category": "Policy",
        "title": "OpenAI's Illinois liability push shows regulation is now a product-adjacent battle",
        "source": "Ben's Bites",
        "summary": "OpenAI's support for an Illinois liability bill highlights how legal definitions around AI responsibility are becoming a meaningful competitive issue for major labs.",
        "href": "https://news.bensbites.co/openai-backs-an-illinois-bill-that-would-limit-when-ai-labs-can-be-held-liable/",
        "excerpt": "Why it matters: regulation is no longer outside the product story; it directly shapes deployment risk."
      },
      {
        "id": "openai-122b-round-apr09",
        "category": "Funding",
        "title": "OpenAI's $122B funding round reset expectations for frontier-AI scale",
        "source": "The Neuron",
        "summary": "OpenAI's enormous raise reinforces that ChatGPT's commercial position is now influencing how the entire market thinks about compute, infrastructure, and capital requirements.",
        "href": "https://www.theneurondaily.com/p/anthropic-accidentally-leaked-claude-code-s-entire-source-code#openai-funding",
        "excerpt": "Why it matters: funding scale now shapes which labs can keep pushing expensive frontier products."
      },
      {
        "id": "grok-translation-photo-editing-apr09",
        "category": "Product Updates",
        "title": "Grok expands inside X with translation and photo-editing features",
        "source": "The Neuron",
        "summary": "X is widening Grok's usefulness with built-in translation and image-editing tools, reinforcing its strategy of making the assistant feel native to the platform rather than separate from it.",
        "href": "https://www.theneurondaily.com/p/did-zuck-reboot-the-race#grok-updates",
        "excerpt": "Why it matters: Grok's scale advantage comes from distribution through X, not just model branding."
      },
      {
        "id": "claude-cowork-ga-apr09",
        "category": "Product Updates",
        "title": "Claude Cowork reaches general availability on desktop for enterprise teams",
        "source": "Anthropic Release Notes",
        "summary": "Anthropic moved Claude Cowork to general availability on macOS and Windows, adding usage analytics, OpenTelemetry support, and tighter enterprise controls around rollout.",
        "href": "https://docs.anthropic.com/en/release-notes/claude-apps",
        "excerpt": "Why it matters: Anthropic is turning Claude from a strong assistant into a more governable workplace product with adoption tracking and admin controls."
      },
      {
        "id": "claude-code-leak-blueprint-apr09",
        "category": "Developer Tools",
        "title": "Claude Code's leak turned Anthropic's harness into a public design reference",
        "source": "The Neuron",
        "summary": "The Claude Code source leak made the orchestration layer behind one of the hottest coding agents unusually legible, giving the market a clearer look at how serious agent harnesses are being built.",
        "href": "https://www.theneurondaily.com/p/anthropic-accidentally-leaked-claude-code-s-entire-source-code#blueprint",
        "excerpt": "Why it matters: the AI coding race increasingly looks like a harness race, not just a model race."
      },
      {
        "id": "perplexity-computer-taxes-apr09",
        "category": "Agents",
        "title": "Perplexity Computer keeps stretching from research into end-to-end task execution",
        "source": "Superhuman AI",
        "summary": "Perplexity's push into tasks like tax prep shows the company wants Computer to be seen as an action-taking agent, not just a better search box.",
        "href": "https://www.superhuman.ai/p/perplexity-computer-does-your-taxes",
        "excerpt": "Why it matters: the market is rewarding products that can actually complete work, not only summarize it."
      }
    ]
  },
  {
    "date": "2026-04-08",
    "label": "April 8, 2026",
    "items": [
      {
        "id": "anti-distillation-frontier-labs-apr08",
        "category": "Policy",
        "title": "OpenAI, Anthropic, and Google align more openly against model-copying pressure",
        "source": "The Neuron",
        "summary": "The leading labs are taking a harder public line on distillation and model copying, a sign that open-model pressure from players like DeepSeek is reshaping the rules of competition.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#anti-distillation",
        "excerpt": "Why it matters: open-model competition is now triggering strategy changes inside the biggest closed-model labs."
      },
      {
        "id": "google-ai-studio-gemma-leverage-apr08",
        "category": "Open Models",
        "title": "Google AI Studio gets a stronger developer story when Gemma and Gemini move together",
        "source": "DeepMind",
        "summary": "Gemma 4 gives Google AI Studio more open-model credibility, making Google's stack feel broader than a single closed Gemini endpoint for developers and prototype teams.",
        "href": "https://deepmind.google/discover/blog/gemma-4-byte-for-byte-the-most-capable-open-models/#google-ai-studio",
        "excerpt": "Why it matters: the most durable platforms usually win by offering multiple lanes, not one monolithic model."
      },
      {
        "id": "project-glasswing-apr08",
        "category": "Safety",
        "title": "Project Glasswing gives defenders early access to Anthropic's unreleased cyber model",
        "source": "The Neuron",
        "summary": "Anthropic is using Project Glasswing to put Mythos Preview in defenders' hands first, signaling a more security-first release strategy for high-risk Claude capabilities.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#project-glasswing",
        "excerpt": "Why it matters: Claude's strongest upcoming capabilities are being framed as a deployment-governance problem, not just a product launch."
      },
      {
        "id": "deepl-agent-enterprise-apr08",
        "category": "Translation AI",
        "title": "DeepL is broadening from translation into agent-style enterprise assistance",
        "source": "DeepL",
        "summary": "DeepL's AI Agent positioning suggests the company wants to own more of the multilingual workflow stack, not just the final translation step.",
        "href": "https://www.deepl.com/en/products/ai-agent#enterprise",
        "excerpt": "Why it matters: specialized AI products can still grow by expanding around one trusted core job."
      },
      {
        "id": "github-copilot-vscode-agents-apr08",
        "category": "Developer Tools",
        "title": "GitHub Copilot expands agent control and browser debugging in VS Code",
        "source": "GitHub Changelog",
        "summary": "GitHub's March releases for Copilot in VS Code added Autopilot sessions, finer agent permissions, integrated browser debugging, and richer media support inside chat.",
        "href": "https://github.blog/changelog/2026-04-08-github-copilot-in-visual-studio-code-march-releases/",
        "excerpt": "Why it matters: GitHub is pushing Copilot further into full-session autonomous development instead of keeping it as a narrow inline completion tool."
      },
      {
        "id": "meta-muse-spark-apr08",
        "category": "Model Releases",
        "title": "Meta launches Muse Spark to upgrade Meta AI across apps and API preview",
        "source": "Meta",
        "summary": "Meta introduced Muse Spark as the first model from Meta Superintelligence Labs, using it to power faster multimodal Meta AI experiences and a private preview API for partners.",
        "href": "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
        "excerpt": "Why it matters: Meta is tying a new flagship model directly to consumer distribution across WhatsApp, Instagram, Facebook, Messenger, and AI glasses."
      }
    ]
  },
  {
    "date": "2026-04-07",
    "label": "April 7, 2026",
    "items": [
      {
        "id": "anthropic-google-broadcom-compute-deal-apr07",
        "category": "Infrastructure",
        "title": "Anthropic's huge TPU deal shows Claude's growth is now gated by infrastructure scale",
        "source": "The Neuron",
        "summary": "Anthropic's expanded compute arrangement with Google and Broadcom makes clear that serving and training Claude at the frontier is now as much an infrastructure story as a model story.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#anthropic-compute-deal",
        "excerpt": "Why it matters: demand for top assistants is increasingly constrained by how much compute can actually be delivered."
      },
      {
        "id": "openai-mini-new-deal-apr07",
        "category": "Policy",
        "title": "OpenAI's policy paper reads like a mini-New Deal for the AI economy",
        "source": "The Neuron",
        "summary": "OpenAI is no longer speaking only as a lab shipping ChatGPT upgrades, but as a company actively trying to shape how governments respond to large-scale AI disruption.",
        "href": "https://www.theneurondaily.com/p/what-does-openai-see-coming#mini-new-deal",
        "excerpt": "Why it matters: AI policy is becoming a direct extension of platform strategy."
      },
      {
        "id": "openai-anthropic-ipo-pressure-apr07",
        "category": "Finance",
        "title": "OpenAI and Anthropic are being discussed more like future IPO companies than labs",
        "source": "The Neuron",
        "summary": "Reporting around IPO pressure shows how quickly the frontier-model race is being financialized as ChatGPT and Claude keep scaling revenue and compute spend at the same time.",
        "href": "https://www.theneurondaily.com/p/what-does-openai-see-coming#ipo-pressure",
        "excerpt": "Why it matters: the market is increasingly evaluating AI leaders as giant infrastructure businesses, not just products."
      },
      {
        "id": "perplexity-arr-growth-apr07",
        "category": "Business",
        "title": "Perplexity's reported ARR momentum suggests research products can still break out",
        "source": "The Neuron",
        "summary": "Reported revenue momentum is reinforcing Perplexity's shift from interesting search startup to one of the few serious consumer AI products with clear commercial pull.",
        "href": "https://www.theneurondaily.com/p/did-zuck-reboot-the-race#perplexity-arr",
        "excerpt": "Why it matters: revenue traction matters because it shows users are paying for a research-native alternative to the biggest general assistants."
      }
    ]
  },
  {
    "date": "2026-03-24",
    "label": "March 24, 2026",
    "items": [
      {
        "id": "figma-canvas-agents-mar24",
        "category": "Design AI",
        "title": "Figma opens its canvas to AI agents with an MCP server beta",
        "source": "Figma Blog",
        "summary": "Figma now lets AI agents create and edit design assets on the canvas through its MCP server beta, with skills used to encode design-system rules and workflow context.",
        "href": "https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/",
        "excerpt": "Why it matters: design tools are becoming part of the agent loop, not just a handoff destination after code is written."
      }
    ]
  },
  {
    "date": "2026-03-23",
    "label": "March 23, 2026",
    "items": [
      {
        "id": "chatgpt-file-library-mar23",
        "category": "Product Updates",
        "title": "ChatGPT adds a File Library for saved uploads and generated assets",
        "source": "OpenAI Help Center",
        "summary": "OpenAI added a persistent Library in ChatGPT so uploaded files and generated assets can be reused later, with recent-file insertion and sidebar browsing across web and mobile surfaces.",
        "href": "https://help.openai.com/en/articles/6825453-chatgpt-browser",
        "excerpt": "Why it matters: persistent files make ChatGPT feel more like an ongoing workspace than a disposable chat window."
      }
    ]
  }
];
  const newsCategories = ["All", ...new Set(newsFeed.flatMap((group) => group.items.map((item) => item.category)))];
  const flatNewsItems = newsFeed.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      date: group.date,
      dateLabel: group.label
    }))
  );
  const sidebarIconMap = {
    All: `
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="6" height="6" rx="1.6"></rect>
        <rect x="14" y="4" width="6" height="6" rx="1.6"></rect>
        <rect x="4" y="14" width="6" height="6" rx="1.6"></rect>
        <rect x="14" y="14" width="6" height="6" rx="1.6"></rect>
      </svg>
    `,
    Assistants: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 4.5L13.8 8.2L17.5 10L13.8 11.8L12 15.5L10.2 11.8L6.5 10L10.2 8.2L12 4.5Z"></path>
        <path d="M18.5 15.5L19.3 17.2L21 18L19.3 18.8L18.5 20.5L17.7 18.8L16 18L17.7 17.2L18.5 15.5Z"></path>
      </svg>
    `,
    Research: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="5.5"></circle>
        <path d="M16 16L20 20"></path>
      </svg>
    `,
    Productivity: `
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="14" rx="3"></rect>
        <path d="M8 10.5L10.3 12.8L15.8 7.8"></path>
      </svg>
    `,
    Automation: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6.5" cy="7" r="2"></circle>
        <circle cx="17.5" cy="7" r="2"></circle>
        <circle cx="12" cy="17" r="2"></circle>
        <path d="M8.2 8.1L10.5 11.2"></path>
        <path d="M15.8 8.1L13.5 11.2"></path>
        <path d="M8.6 17H15.4"></path>
      </svg>
    `,
    Coding: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9.2 7L4.8 12L9.2 17"></path>
        <path d="M14.8 7L19.2 12L14.8 17"></path>
      </svg>
    `,
    Writing: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 7.5H14"></path>
        <path d="M6 11.5H14"></path>
        <path d="M6 15.5H11"></path>
        <path d="M15.5 15.5L18.8 12.2C19.4 11.6 20.4 11.6 21 12.2C21.6 12.8 21.6 13.8 21 14.4L17.7 17.7L14.5 18.5L15.5 15.5Z"></path>
      </svg>
    `,
    Design: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 4.5C7.6 4.5 4 7.8 4 11.9C4 15.4 6.7 17.9 10 17.9H11.4C12.3 17.9 13 18.6 13 19.5C13 20.4 13.7 21 14.5 21C18.6 21 20 16.8 20 13.8C20 8.6 16.6 4.5 12 4.5Z"></path>
        <circle cx="8" cy="11" r="1"></circle>
        <circle cx="11" cy="8.5" r="1"></circle>
        <circle cx="15" cy="9.5" r="1"></circle>
      </svg>
    `,
    Video: `
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="12" height="12" rx="3"></rect>
        <path d="M16 10L20 8V16L16 14"></path>
      </svg>
    `,
    Translation: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7H14"></path>
        <path d="M9 5V7C9 10.2 7.1 12.9 4.4 14.2"></path>
        <path d="M6.5 10.5C7.1 12 8.4 13.5 10 14.6"></path>
        <path d="M15 9H20"></path>
        <path d="M17.5 7V9C17.5 12 16 14.7 13.8 16.5"></path>
        <path d="M14.5 13.5H20.5"></path>
      </svg>
    `,
    Audio: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 14V10"></path>
        <path d="M10 17V7"></path>
        <path d="M14 15V9"></path>
        <path d="M18 13V11"></path>
      </svg>
    `,
    Meetings: `
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="11" rx="3"></rect>
        <path d="M9 20H15"></path>
        <path d="M12 17V20"></path>
        <path d="M8.5 11H15.5"></path>
      </svg>
    `,
    Sales: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 17L10 12L13.5 15.5L19 10"></path>
        <path d="M15.5 10H19V13.5"></path>
      </svg>
    `
  };
  const promptTracks = [
    {
      id: "chatgpt",
      label: "ChatGPT",
      icon: "C",
      toolId: "chatgpt",
      description: "Versatile prompts for research, writing, and operator work.",
      headline: "Flexible prompt patterns for everyday knowledge work",
      bestFor: ["General research", "Planning", "Writing", "Execution support"],
      formula: ["Role", "Context", "Task", "Constraints", "Output format"],
      guidance: "Use ChatGPT when you want broad capability, fast iteration, and clean structured outputs across mixed tasks."
    },
    {
      id: "claude",
      label: "Claude",
      icon: "CL",
      toolId: "claude",
      description: "Structured prompts for calm long-form thinking and editing.",
      headline: "Long-context prompts for thoughtful writing and document work",
      bestFor: ["Memo rewriting", "Document synthesis", "Editing", "Strategy drafts"],
      formula: ["Goal", "Audience", "Source material", "Tone", "Decision-ready summary"],
      guidance: "Claude works best when the brief is document-heavy and the desired output should feel measured, polished, and calm."
    },
    {
      id: "gemini",
      label: "Gemini",
      icon: "G",
      toolId: "gemini",
      description: "Research and synthesis prompts for multimodal planning and fast exploration.",
      headline: "Multimodal prompt patterns for research, planning, and synthesis",
      bestFor: ["Research synthesis", "Notebook planning", "Multimodal input", "Fast comparisons"],
      formula: ["Objective", "Context", "Inputs", "Evaluation lens", "Output structure"],
      guidance: "Gemini gets stronger when you give it mixed inputs, explicit comparison criteria, and a structured format for the final answer."
    },
    {
      id: "midjourney",
      label: "Midjourney",
      icon: "MJ",
      toolId: "midjourney",
      description: "Visual direction prompts for imagery and concept exploration.",
      headline: "Visual prompt building for concept art and campaign imagery",
      bestFor: ["Art direction", "Landing page visuals", "Campaign look-dev", "Moodboards"],
      formula: ["Subject", "Composition", "Lighting", "Material cues", "Aesthetic references"],
      guidance: "Midjourney prompts get better when you define composition, material cues, lighting, and the exact mood before adding style references."
    },
    {
      id: "perplexity",
      label: "Perplexity",
      icon: "P",
      toolId: "perplexity",
      description: "Search-first prompts for source-backed answers, scans, and market checks.",
      headline: "Search-native prompt patterns for source-backed research",
      bestFor: ["Fact finding", "Source-backed summaries", "Market scans", "Rapid Q&A"],
      formula: ["Question", "Scope", "Source expectations", "Decision criteria", "Cited output"],
      guidance: "Perplexity works best when you define the search scope, ask for citations, and state how the answer should be organized for decision-making."
    },
    {
      id: "githubcopilot",
      label: "GitHub Copilot",
      icon: "GH",
      toolId: "githubcopilot",
      description: "Prompt starters for shipping features, fixing bugs, and planning builds.",
      headline: "Engineering prompts for implementation, debugging, and delivery",
      bestFor: ["Feature planning", "Bug triage", "Refactoring", "Rollout checklists"],
      formula: ["Problem statement", "Constraints", "Affected systems", "Test plan", "Risk review"],
      guidance: "GitHub Copilot prompts are stronger when you define the affected modules, constraints, test expectations, and rollout risks up front."
    },
    {
      id: "runway",
      label: "Runway",
      icon: "R",
      toolId: "runway",
      description: "Video-generation prompts for motion, edits, and story-driven creative work.",
      headline: "Prompt building for AI video scenes, edits, and motion direction",
      bestFor: ["Motion concepts", "Storyboard beats", "Video edits", "Creative testing"],
      formula: ["Scene goal", "Subject", "Camera movement", "Style cues", "Output length"],
      guidance: "Runway prompts improve when you specify scene action, camera behavior, style cues, and the exact duration or beat you want."
    },
    {
      id: "jasper",
      label: "Jasper",
      icon: "J",
      toolId: "jasper",
      description: "Campaign, landing page, and positioning prompt patterns for growth teams.",
      headline: "Positioning, campaign, and brand-safe copy prompts",
      bestFor: ["Positioning", "Landing pages", "ICP work", "Campaign planning"],
      formula: ["Audience", "Pain", "Offer", "Proof", "CTA"],
      guidance: "Jasper prompts improve when you define buyer pain, buying trigger, proof, and the exact conversion action you want."
    },
    {
      id: "canva",
      label: "Canva",
      icon: "Ca",
      toolId: "canva",
      description: "Creative brief prompts for social assets, decks, and lightweight design systems.",
      headline: "Prompt structures for design briefs, decks, and social assets",
      bestFor: ["Social content", "Presentation outlines", "Creative briefs", "Brand kits"],
      formula: ["Asset type", "Audience", "Brand cues", "Content blocks", "Format specs"],
      guidance: "Canva prompts work better when you define the asset type, brand mood, required sections, and the platform or format constraints."
    },
    {
      id: "notion",
      label: "Notion",
      icon: "N",
      toolId: "notion",
      description: "Workspace prompts for docs, project planning, and internal operating systems.",
      headline: "Prompt patterns for docs, project plans, and team knowledge",
      bestFor: ["Project docs", "Team wikis", "Meeting notes", "Knowledge organization"],
      formula: ["Workspace goal", "Inputs", "Structure", "Owners", "Next actions"],
      guidance: "Notion AI prompts get more useful when you define the workspace outcome, the exact sections needed, and who will act on the result."
    },
    {
      id: "grammarly",
      label: "Grammarly",
      icon: "Gr",
      toolId: "grammarly",
      description: "Editing prompts for clarity, tone control, and concise professional writing.",
      headline: "Prompt patterns for rewriting, tone adjustment, and clarity",
      bestFor: ["Email editing", "Tone shifts", "Clarity rewrites", "Professional polish"],
      formula: ["Draft", "Audience", "Tone target", "Clarity goal", "Final constraints"],
      guidance: "Grammarly-style prompts are best when you define the audience, target tone, and exactly what should be preserved or cut."
    },
    {
      id: "elevenlabs",
      label: "ElevenLabs",
      icon: "11",
      toolId: "elevenlabs",
      description: "Voice prompts for narration, dialogue style, and audio delivery control.",
      headline: "Prompt patterns for AI voice, narration, and spoken delivery",
      bestFor: ["Voiceovers", "Narration style", "Dialogue pacing", "Audio localization"],
      formula: ["Voice role", "Emotion", "Pacing", "Pronunciation notes", "Output usage"],
      guidance: "ElevenLabs prompts improve when you specify voice intent, pacing, pronunciation notes, and how the audio will actually be used."
    },
    {
      id: "synthesia",
      label: "Synthesia",
      icon: "Sy",
      toolId: "synthesia",
      description: "Avatar-video prompts for training, explainers, and customer-facing walkthroughs.",
      headline: "Prompt structures for AI presenters, explainers, and training videos",
      bestFor: ["Training videos", "Product explainers", "Internal enablement", "Localized video"],
      formula: ["Audience", "Script goal", "On-screen flow", "Visual aids", "Delivery tone"],
      guidance: "Synthesia prompts are clearer when you define the audience, script goal, scene flow, and what should appear on screen with the presenter."
    },
    {
      id: "pictory",
      label: "Pictory",
      icon: "Pi",
      toolId: "pictory",
      description: "Prompt starters for turning scripts, blogs, and summaries into short videos.",
      headline: "Prompt patterns for script-to-video and repurposed content",
      bestFor: ["Blog-to-video", "Repurposing content", "Explainer clips", "Short-form edits"],
      formula: ["Source content", "Audience", "Key beats", "Visual treatment", "Output format"],
      guidance: "Pictory-style prompts work best when you define the source material, visual pacing, key moments, and the target video format."
    },
    {
      id: "copyai",
      label: "Copy.ai",
      icon: "Co",
      toolId: "copyai",
      description: "GTM prompts for outbound, pipeline messaging, and revenue-team workflows.",
      headline: "Prompt structures for GTM copy, outbound, and sales enablement",
      bestFor: ["Outbound messaging", "Sales sequences", "GTM ops", "Pipeline content"],
      formula: ["Persona", "Pain", "Offer", "Proof", "Desired response"],
      guidance: "Copy.ai prompts are stronger when you define the buyer persona, trigger event, business pain, and the exact response you want back."
    },
    {
      id: "deepseek",
      label: "DeepSeek",
      icon: "DS",
      toolId: "deepseek",
      description: "Reasoning-first prompts for analysis and technical problem solving.",
      headline: "Reasoning-first prompts for technical and analytical work",
      bestFor: ["Architecture reviews", "Debugging", "Tradeoff analysis", "Step-by-step reasoning"],
      formula: ["Problem", "Assumptions", "Alternatives", "Evaluation criteria", "Recommended answer"],
      guidance: "DeepSeek prompts perform best when you explicitly ask for assumptions, alternative paths, edge cases, and a final recommendation."
    }
  ];
  const promptLibrary = [
    {
      track: "chatgpt",
      title: "Competitive research sprint",
      summary: "Turn scattered research into a buyer-ready brief.",
      body: "Act as a B2B product strategist. Compare these competitors on ICP, pricing posture, messaging, and differentiation. Return a concise executive brief, a positioning table, and three market gaps we can attack next quarter."
    },
    {
      track: "chatgpt",
      title: "Operator weekly brief",
      summary: "Compress meetings, docs, and open loops into one clear brief.",
      body: "You are my chief of staff. Turn the notes below into a weekly operating brief with: top priorities, blockers, owners, deadlines, and decisions needed from leadership. Keep the tone crisp and businesslike."
    },
    {
      track: "chatgpt",
      title: "Meeting-to-plan converter",
      summary: "Turn loose discussion into an execution-ready plan.",
      body: "Act as an operations lead. Convert the notes below into a plan with goals, workstreams, owner suggestions, deadlines, dependencies, and the next five actions. Flag any missing information before finalizing."
    },
    {
      track: "claude",
      title: "Memo rewrite",
      summary: "Rewrite messy drafts into calm, executive-grade writing.",
      body: "Rewrite this memo for an executive audience. Preserve the meaning, remove repetition, tighten the logic, and improve transitions. Use clear section headings and end with a short decision summary."
    },
    {
      track: "claude",
      title: "Long document synthesis",
      summary: "Pull the signal from long reports and strategy docs.",
      body: "Read the material below and produce: the core thesis, supporting evidence, risks, unresolved questions, and the three most decision-relevant takeaways for a leadership team."
    },
    {
      track: "claude",
      title: "Policy and tone editor",
      summary: "Improve clarity without losing nuance or intent.",
      body: "Edit this policy draft for clarity, consistency, and executive readability. Keep the original intent, remove ambiguity, unify terminology, and end with a short list of sections that still need a human review."
    },
    {
      track: "gemini",
      title: "Research synthesis board",
      summary: "Turn mixed notes and links into a structured brief.",
      body: "Act as a research analyst. Use the notes, links, and screenshots below to produce a synthesis with the main findings, conflicting signals, open questions, and the three actions we should take next."
    },
    {
      track: "gemini",
      title: "Multimodal comparison prompt",
      summary: "Compare screenshots, docs, and notes in one pass.",
      body: "Compare these assets across usability, message clarity, trust signals, and visual hierarchy. Return a ranked comparison, the strongest patterns, the weakest points, and what we should test next."
    },
    {
      track: "gemini",
      title: "Planning notebook starter",
      summary: "Convert scattered context into a workable plan.",
      body: "You are a strategy associate. Turn the material below into a project notebook with goals, assumptions, workstreams, dependencies, questions to resolve, and a recommended order of execution."
    },
    {
      track: "deepseek",
      title: "Reasoning walkthrough",
      summary: "Useful for modeling tradeoffs and technical logic.",
      body: "Solve this problem step by step. State assumptions, evaluate edge cases, explain the tradeoffs between at least two approaches, and end with the most robust recommendation."
    },
    {
      track: "deepseek",
      title: "Architecture decision note",
      summary: "Compare technical paths before implementation starts.",
      body: "Act as a senior software architect. Compare these options across complexity, scalability, delivery speed, operational risk, and future flexibility. Recommend one approach and explain why."
    },
    {
      track: "deepseek",
      title: "Debugging hypothesis map",
      summary: "Build a cleaner debugging flow before you change code.",
      body: "Act as a principal engineer. Given the bug report, logs, and recent changes, list the most likely root causes in priority order. For each one, explain why it fits the symptoms, how to verify it quickly, and what the smallest safe fix would be."
    },
    {
      track: "deepseek",
      title: "Tradeoff analysis brief",
      summary: "Useful when a team must choose between speed and robustness.",
      body: "Compare these options using delivery time, implementation complexity, performance, maintainability, operational risk, and future flexibility. Show where each option wins, where it loses, and end with the best recommendation for this exact context."
    },
    {
      track: "midjourney",
      title: "Campaign art direction",
      summary: "Build more intentional visual prompts for launch work.",
      body: "Create a premium campaign visual for a modern AI product launch, soft studio light, glass UI reflections, restrained color palette, editorial composition, product-first framing, high detail, art direction quality."
    },
    {
      track: "midjourney",
      title: "Product hero image",
      summary: "Sharper prompt base for landing-page visuals.",
      body: "Minimalist product hero scene, floating interface panels, soft volumetric light, metallic details, white and pale blue palette, Apple-like restraint, ultra-clean composition, premium startup website aesthetic."
    },
    {
      track: "midjourney",
      title: "Editorial portrait system",
      summary: "Create a cleaner visual language for campaigns and case studies.",
      body: "Editorial portrait of a modern technology founder, soft natural light, refined composition, neutral wardrobe, glass-and-aluminum environment, premium magazine styling, subtle depth, restrained luxury, realistic texture."
    },
    {
      track: "perplexity",
      title: "Source-backed market scan",
      summary: "Find signal fast and keep the citations attached.",
      body: "Research this topic and return a market scan with key players, the current state of the market, notable shifts in the last 12 months, and cited sources for every major claim."
    },
    {
      track: "perplexity",
      title: "Decision memo with citations",
      summary: "Compress web research into a clean recommendation.",
      body: "Act as an analyst. Answer the question below with a short decision memo including recommendation, evidence, counterpoints, and source links. Prioritize current, primary, and high-signal sources."
    },
    {
      track: "perplexity",
      title: "Competitive fact check",
      summary: "Verify claims before they get into a deck or memo.",
      body: "Fact-check these claims about the company, product, and market. Separate confirmed facts from weak claims, link to the supporting sources, and note where the evidence is thin or outdated."
    },
    {
      track: "githubcopilot",
      title: "Landing page messaging",
      summary: "Turn a request into an implementation-ready build plan.",
      body: "Act as a staff engineer. Convert this feature request into a practical implementation plan with assumptions, affected modules, API changes, UI changes, migration needs, test plan, and rollout risks."
    },
    {
      track: "githubcopilot",
      title: "Bug triage prompt",
      summary: "Faster debugging for reproducible issues.",
      body: "You are debugging a production issue. Given the error, logs, and recent changes, propose the most likely root causes, what to inspect first, and the smallest safe fix path. End with tests to prevent regression."
    },
    {
      track: "githubcopilot",
      title: "Refactor risk review",
      summary: "Evaluate what can break before touching live modules.",
      body: "Act as a senior engineer reviewing a refactor proposal. List the modules most at risk, the behaviors that could regress, the tests that should exist first, and a phased rollout plan with rollback checkpoints."
    },
    {
      track: "runway",
      title: "Scene generation brief",
      summary: "Create cleaner motion prompts before rendering.",
      body: "Generate a short cinematic scene for an AI product launch: sleek interface details, subtle forward camera move, soft atmospheric lighting, premium commercial look, and a restrained futuristic mood."
    },
    {
      track: "runway",
      title: "Storyboard beat planner",
      summary: "Map video beats before you render them.",
      body: "Turn this concept into a five-shot storyboard. For each shot include subject, motion, camera movement, lighting, duration, and transition so the final sequence feels consistent and premium."
    },
    {
      track: "runway",
      title: "Edit extension prompt",
      summary: "Guide AI-assisted edits with tighter creative control.",
      body: "Extend this shot by 4 seconds while preserving subject identity, color palette, and camera continuity. Add subtle environmental motion and keep the pacing smooth enough for a premium product ad."
    },
    {
      track: "jasper",
      title: "Landing page messaging",
      summary: "Turn features into cleaner homepage copy.",
      body: "You are a senior conversion copywriter. Using the product notes below, write a landing page structure with hero headline, subhead, three benefit blocks, proof points, objections, and a CTA that feels premium but clear."
    },
    {
      track: "jasper",
      title: "Audience ICP builder",
      summary: "Sharpen positioning before writing campaigns.",
      body: "Based on this product description, define three high-fit ICPs. For each one, include pains, buying triggers, objections, use cases, and the value proposition angle most likely to convert."
    },
    {
      track: "jasper",
      title: "Campaign angle generator",
      summary: "Generate stronger hooks before ad and launch work begins.",
      body: "Act as a product marketing lead. Based on the product, audience, and current market context, generate five campaign angles. For each one include the core tension, headline direction, proof point, objection to overcome, and the CTA that best fits the angle."
    },
    {
      track: "canva",
      title: "Carousel creative brief",
      summary: "Turn a content idea into a social-ready asset plan.",
      body: "Create a LinkedIn carousel brief with slide-by-slide copy, design direction, visual hierarchy, and CTA. Keep the tone polished, minimal, and optimized for executive readers."
    },
    {
      track: "canva",
      title: "Deck outline builder",
      summary: "Translate a message into a clearer presentation flow.",
      body: "Build a presentation outline from the notes below. Return slide titles, key points, chart ideas, and design cues so the deck feels sharp, modern, and easy to present."
    },
    {
      track: "canva",
      title: "Brand asset prompt",
      summary: "Keep lightweight design work aligned to brand.",
      body: "Using this brand summary, generate a creative brief for a launch graphic set including colors, typography mood, image direction, icon style, and the mandatory content blocks for each asset."
    },
    {
      track: "notion",
      title: "Project hub setup",
      summary: "Convert notes into a practical team workspace.",
      body: "Turn the material below into a project hub structure with overview, goals, timeline, owners, dependencies, meeting cadence, and a running decisions log."
    },
    {
      track: "notion",
      title: "Meeting notes organizer",
      summary: "Make raw notes easier to act on and archive.",
      body: "Reformat these meeting notes into a Notion-ready structure with agenda, decisions, action items, owners, deadlines, and open questions. Keep it concise and easy to scan."
    },
    {
      track: "notion",
      title: "Wiki page builder",
      summary: "Create clearer internal documentation from rough input.",
      body: "Draft an internal wiki page from the source material below. Include purpose, process steps, roles, tools used, common mistakes, and a short FAQ for new team members."
    },
    {
      track: "grammarly",
      title: "Executive email polish",
      summary: "Tighten tone without losing the message.",
      body: "Rewrite this email to sound confident, concise, and executive-friendly. Remove filler, sharpen the ask, preserve the facts, and keep the final version under 180 words."
    },
    {
      track: "grammarly",
      title: "Tone shift editor",
      summary: "Adjust the voice for a new audience quickly.",
      body: "Rewrite this draft for a more professional audience. Keep the meaning intact, reduce casual phrasing, smooth the transitions, and flag any sentence that still sounds too vague."
    },
    {
      track: "grammarly",
      title: "Clarity rewrite",
      summary: "Remove friction from dense or messy writing.",
      body: "Edit the passage below for clarity and readability. Shorten long sentences, remove repetition, simplify awkward phrasing, and preserve any key terminology that must stay exact."
    },
    {
      track: "elevenlabs",
      title: "Voiceover direction",
      summary: "Define delivery before generating narration.",
      body: "Read this script as a calm, confident product narrator. Use natural pacing, clear emphasis on product benefits, and slight warmth without sounding overly promotional."
    },
    {
      track: "elevenlabs",
      title: "Pronunciation-safe read",
      summary: "Reduce misreads on names, brands, and terms.",
      body: "Generate a voice read for this script with careful pronunciation on all product names, acronyms, and technical terms. Add pacing that feels natural for an explainer video."
    },
    {
      track: "elevenlabs",
      title: "Dialogue style pass",
      summary: "Shape the voice to fit a specific scene.",
      body: "Perform this short dialogue with a conversational, grounded tone. Keep the rhythm realistic, the pauses subtle, and the emotional delivery supportive rather than theatrical."
    },
    {
      track: "synthesia",
      title: "Training explainer script",
      summary: "Structure a presenter-led video for clarity.",
      body: "Write a Synthesia-ready training script with opening context, step-by-step instruction, on-screen callouts, and a short recap. Keep the language simple and easy to localize."
    },
    {
      track: "synthesia",
      title: "Product walkthrough video",
      summary: "Turn feature notes into a clean avatar-led flow.",
      body: "Convert these product notes into a 90-second walkthrough script for an AI presenter. Include scene order, on-screen text suggestions, and the moments where the UI should appear."
    },
    {
      track: "synthesia",
      title: "Localization-ready presenter brief",
      summary: "Make the script easier to adapt across markets.",
      body: "Rewrite this presenter script so it is easy to translate and reuse globally. Use plain language, short sentences, and clear visual instructions for each scene."
    },
    {
      track: "pictory",
      title: "Blog-to-video converter",
      summary: "Turn written content into a short video outline.",
      body: "Convert this blog post into a 60-second video plan with hook, key points, suggested scene text, B-roll direction, and closing CTA. Keep the pacing crisp and social-friendly."
    },
    {
      track: "pictory",
      title: "Script highlight edit",
      summary: "Extract the best moments into a tighter clip.",
      body: "Take this long script and build a short highlight video structure with strongest lines first, scene-by-scene captions, simple visual suggestions, and a clear ending beat."
    },
    {
      track: "pictory",
      title: "Repurposing prompt",
      summary: "Reuse source material without losing the core message.",
      body: "Repurpose the content below into a short-form video summary. Identify the main takeaway, supporting moments, ideal caption text, and the visual rhythm that will keep viewers watching."
    },
    {
      track: "copyai",
      title: "Outbound sequence starter",
      summary: "Build a cleaner sales sequence from raw product context.",
      body: "Act as a GTM operator. Create a three-step outbound email sequence for this persona with subject lines, opening hooks, pain framing, proof, and one clear CTA per email."
    },
    {
      track: "copyai",
      title: "Sales enablement brief",
      summary: "Package product context for revenue teams.",
      body: "Turn these product notes into a sales enablement brief with buyer pains, common objections, proof points, competitor contrasts, and the top message each rep should use."
    },
    {
      track: "copyai",
      title: "Pipeline message map",
      summary: "Align GTM copy to buyer stage and intent.",
      body: "Create message variants for awareness, evaluation, and decision stages. For each stage include the buyer problem, value angle, proof to use, and the exact next action we want."
    }
  ];

  const promptQuery = new URLSearchParams(window.location.search);
  const promptTrackIds = new Set(promptTracks.map((track) => track.id));

  const state = {
    query: "",
    activeCategory: "All",
    activePricing: "All",
    activeRanking: "Assistants",
    activeNewsCategory: "All",
    activePromptTrack: promptTrackIds.has(promptQuery.get("track")) ? promptQuery.get("track") : "chatgpt",
    featuredVisibleCounts: {}
  };

  const promptGuideCards = [
    {
      title: "State the role",
      body: "Tell the model who it should act as. Senior architect, conversion copywriter, analyst, or editor is better than a vague ask."
    },
    {
      title: "Add context",
      body: "Include audience, business goal, constraints, and what inputs the model should use. Better prompts start with better context."
    },
    {
      title: "Define the output",
      body: "Specify format, sections, length, and decision criteria. This is the fastest way to reduce generic answers."
    },
    {
      title: "Request tradeoffs",
      body: "For reasoning models, ask for alternatives, edge cases, and final recommendations instead of one straight answer."
    },
    {
      title: "Paste source material",
      body: "The strongest prompt libraries still depend on strong input. Add logs, notes, drafts, screenshots, specs, or product facts whenever possible."
    },
    {
      title: "Define failure cases",
      body: "Tell the model what to avoid such as generic copy, unsupported claims, missing citations, or skipping edge cases."
    }
  ];
  const assetPrefix = document.body?.dataset?.assetPrefix || "";

  function loadIconManifest() {
    try {
      const request = new XMLHttpRequest();
      request.open("GET", `${assetPrefix}assets/tool-icons/manifest.json`, false);
      request.send();
      if (request.status >= 200 && request.status < 300) {
        return JSON.parse(request.responseText);
      }
    } catch (error) {
      return {};
    }
    return {};
  }

  const iconManifest = loadIconManifest();

  function manifestEntry(tool) {
    return iconManifest[tool.id] || null;
  }

  function localIconPath(filename) {
    return `${assetPrefix}assets/tool-icons/${filename}`;
  }

  function primaryIconPath(tool) {
    const entry = manifestEntry(tool);
    if (entry && entry.file && entry.content_type !== "text/html") {
      return localIconPath(entry.file);
    }
    return localIconPath(`${tool.id}.png`);
  }

  function escapeJsString(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  function iconFallbackSources(tool) {
    const entry = manifestEntry(tool);
    const sources = [];
    if (entry && entry.fallback) {
      sources.push(localIconPath(entry.fallback));
    }
    sources.push(localIconPath(`${tool.id}.ico`));
    sources.push(localIconPath(`${tool.id}.svg`));
    sources.push(fallbackIcon(tool));
    return sources.filter((source, index) => source && !sources.slice(0, index).includes(source) && source !== primaryIconPath(tool));
  }

  function iconOnErrorHandler(tool) {
    return iconFallbackSources(tool).reduceRight(
      (script, source) => `this.onerror=function(){${script}};this.src='${escapeJsString(source)}';`,
      "this.onerror=null;"
    );
  }

  const tools = [...catalog.tools]
    .map((tool) => ({
      ...tool,
      iconUrl: primaryIconPath(tool)
    }))
    .sort((left, right) => right.monthlyVisits - left.monthlyVisits);

  const categories = ["All", ...new Set(tools.flatMap((tool) => tool.categories))];
  const pricingOptions = ["All", ...new Set(tools.map((tool) => tool.pricing))];
  const categoryCounts = tools.reduce((accumulator, tool) => {
    tool.categories.forEach((category) => {
      accumulator.set(category, (accumulator.get(category) || 0) + 1);
    });
    return accumulator;
  }, new Map());
  const rankingCategories = preferredRankingOrder.filter((category) => categoryCounts.has(category)).slice(0, 8);

  const ui = {
    sidebarNav: document.getElementById("sidebar-nav"),
    searchInput: document.getElementById("search-input"),
    searchButton: document.getElementById("search-button"),
    releaseTickerTrack: document.getElementById("release-ticker-track"),
    hotFilters: document.getElementById("hot-filters"),
    hotGrid: document.getElementById("hot-grid"),
    newsLeadGrid: document.getElementById("news-lead-grid"),
    newsFeed: document.getElementById("news-feed"),
    newsAds: document.getElementById("news-ads"),
    newsDateBrowser: document.getElementById("news-date-browser"),
    newsHotTools: document.getElementById("news-hot-tools"),
    newsLatestTools: document.getElementById("news-latest-tools"),
    newsLatestArticles: document.getElementById("news-latest-articles"),
    todayList: document.getElementById("today-list"),
    editorList: document.getElementById("editor-list"),
    stackList: document.getElementById("stack-list"),
    rankTabs: document.getElementById("rank-tabs"),
    rankGrid: document.getElementById("rank-grid"),
    categoryWall: document.getElementById("category-wall"),
    laneWall: document.getElementById("lane-wall"),
    usecaseWall: document.getElementById("usecase-wall"),
    deepRankingWall: document.getElementById("deep-ranking-wall"),
    newList: document.getElementById("new-list"),
    promptTabs: document.getElementById("prompt-tabs"),
    promptNavFlyout: document.getElementById("prompt-nav-flyout"),
    promptHeroIntro: document.getElementById("prompt-hero-intro"),
    promptFeatureGrid: document.getElementById("prompt-feature-grid"),
    promptLibraryGrid: document.getElementById("prompt-library-grid"),
    promptGuideGrid: document.getElementById("prompt-guide-grid"),
    categoryFilters: document.getElementById("category-filters"),
    pricingFilters: document.getElementById("pricing-filters"),
    directoryOverviewGrid: document.getElementById("directory-overview-grid"),
    directorySections: document.getElementById("directory-sections"),
    directoryGrid: document.getElementById("directory-grid"),
    resultsCount: document.getElementById("results-count"),
    heroToolsCopy: document.getElementById("hero-tools-copy"),
    heroCategoryCopy: document.getElementById("hero-category-copy"),
    resetFilters: document.getElementById("reset-filters")
  };

  function detailUrl(tool) {
    return `tools/${encodeURIComponent(tool.id)}.html`;
  }

  function fallbackIcon(tool) {
    const label = encodeURIComponent((tool.logoLetter || tool.name.charAt(0) || "A").toUpperCase());
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#fb923c" offset="0%"/>
            <stop stop-color="#16335f" offset="100%"/>
          </linearGradient>
        </defs>
        <rect width="96" height="96" rx="28" fill="url(#g)"/>
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="44" font-family="Arial, sans-serif" font-weight="700" fill="white">${label}</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${svg.replace(/\n+/g, "").replace(/#/g, "%23").replace(/"/g, "'")}`;
  }

  function iconImage(tool) {
    return `<img src="${tool.iconUrl}" alt="${tool.name} icon" loading="lazy" onerror="${iconOnErrorHandler(tool)}">`;
  }

  function promptTrackTool(track) {
    if (!track || !track.toolId) {
      return null;
    }
    return tools.find((tool) => tool.id === track.toolId) || null;
  }

  function promptTrackGlyph(track) {
    if (!track) {
      return "";
    }

    if (track.id === "marketing") {
      return `
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 13.5V10.5"></path>
          <path d="M9 16V8"></path>
          <path d="M13 14.5V9.5"></path>
          <path d="M17 12.5V11.5"></path>
          <path d="M4 19L20 5"></path>
        </svg>
      `;
    }

    if (track.id === "coding") {
      return `
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 7L4.5 12L9 17"></path>
          <path d="M15 7L19.5 12L15 17"></path>
          <path d="M13 5L11 19"></path>
        </svg>
      `;
    }

    return `<span class="prompt-track-monogram">${track.icon}</span>`;
  }

  function promptTrackIcon(track, className) {
    const classes = ["prompt-track-icon", className].filter(Boolean).join(" ");
    const tool = promptTrackTool(track);

    if (tool) {
      return `
        <span class="${classes}" aria-hidden="true">
          <img src="${tool.iconUrl}" alt="" loading="lazy" onerror="${iconOnErrorHandler(tool)}">
        </span>
      `;
    }

    return `<span class="${classes} is-glyph" aria-hidden="true">${promptTrackGlyph(track)}</span>`;
  }

  function promptTrackDestination(track) {
    const tool = promptTrackTool(track);
    return tool ? detailUrl(tool) : promptTrackHref(track.id);
  }

  function promptTrackAnchor(track, options) {
    const settings = options || {};
    const isActive = settings.useActiveClass === false ? false : track.id === state.activePromptTrack;
    const classes = [settings.className, isActive ? "is-active" : ""].filter(Boolean).join(" ");
    const iconClass = settings.iconClassName || "";
    const labelClass = settings.labelClassName ? ` class="${settings.labelClassName}"` : "";
    const href = settings.href || promptTrackHref(track.id);

    return `
      <a class="${classes}" href="${href}" ${settings.dataAttribute || ""}>
        ${promptTrackIcon(track, iconClass)}
        <span${labelClass}>${track.label}</span>
      </a>
    `;
  }

  function renderPromptNavFlyout() {
    if (!ui.promptNavFlyout) {
      return;
    }

    ui.promptNavFlyout.innerHTML = promptTracks
      .map((track) => `
        <a class="nav-flyout-link" href="${promptTrackHref(track.id)}">
          ${promptTrackIcon(track, "nav-flyout-icon")}
          <span class="nav-flyout-label">${track.label} Prompts</span>
        </a>
      `)
      .join("");
  }

  function promptKeywordAccent(text, trackId) {
    if (!text) {
      return "";
    }

    const escapedText = escapeAttribute(text);
    const keywordMap = {
      chatgpt: ["ChatGPT", "research", "writing", "operator"],
      claude: ["Claude", "long-context", "writing", "document"],
      gemini: ["Gemini", "multimodal", "research", "comparison", "synthesis"],
      deepseek: ["DeepSeek", "Reasoning-first", "technical", "analysis", "assumptions", "alternative", "recommendation"],
      midjourney: ["Midjourney", "Visual", "imagery", "concept", "lighting", "mood"],
      perplexity: ["Perplexity", "search", "citations", "sources", "research"],
      githubcopilot: ["GitHub Copilot", "Engineering", "debugging", "delivery", "test", "risk"],
      runway: ["Runway", "video", "motion", "scene", "camera"],
      jasper: ["Jasper", "campaign", "positioning", "copy", "growth", "CTA"],
      canva: ["Canva", "design", "carousel", "deck", "brand"],
      notion: ["Notion", "workspace", "docs", "wiki", "project"],
      grammarly: ["Grammarly", "rewrite", "clarity", "tone", "editing"],
      elevenlabs: ["ElevenLabs", "voice", "narration", "audio", "pacing"],
      synthesia: ["Synthesia", "presenter", "training", "video", "script"],
      pictory: ["Pictory", "video", "repurpose", "script", "summary"],
      copyai: ["Copy.ai", "outbound", "GTM", "sales", "pipeline"]
    };
    const fallbackTrack = promptTrackMeta(trackId);
    const keywords = keywordMap[trackId] || [fallbackTrack.label];

    function accentOne(source, keyword) {
      if (!keyword) {
        return source;
      }

      const needle = keyword.toLowerCase();
      const haystack = source.toLowerCase();
      let cursor = 0;
      let result = "";
      let index = haystack.indexOf(needle, cursor);

      while (index !== -1) {
        result += source.slice(cursor, index);
        result += `<span class="prompt-keyword-accent">${source.slice(index, index + keyword.length)}</span>`;
        cursor = index + keyword.length;
        index = haystack.indexOf(needle, cursor);
      }

      result += source.slice(cursor);
      return result;
    }

    return keywords.reduce((result, keyword) => accentOne(result, keyword), escapedText);
  }

  function formatVisits(visitCount) {
    if (visitCount >= 1000000000) {
      return `${(visitCount / 1000000000).toFixed(1)}B`;
    }
    if (visitCount >= 1000000) {
      return `${(visitCount / 1000000).toFixed(1)}M`;
    }
    return `${visitCount}`;
  }

  function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function escapeAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function shortenText(value, maxLength) {
    if (!value || value.length <= maxLength) {
      return value;
    }
    return `${value.slice(0, maxLength - 1).trim()}...`;
  }

  function tooltipText(tool) {
    return `${tool.name}: ${tool.summary} ${tool.recommendation}`;
  }

  function sidebarIcon(category) {
    return sidebarIconMap[category] || sidebarIconMap.All;
  }

  function iconShell(tool, className) {
    const tooltip = escapeAttribute(tooltipText(tool));
    const extraClass = className ? ` ${className}` : "";
    return `
      <span class="tool-icon-wrap${extraClass}" data-tip="${tooltip}">
        <span class="tool-icon-shell">
          ${iconImage(tool)}
        </span>
      </span>
    `;
  }

  function filteredTools() {
    const query = state.query.trim().toLowerCase();
    const queryTokens = query
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    return tools.filter((tool) => {
      const haystack = [
        tool.id,
        tool.name,
        tool.vendor,
        tool.summary,
        tool.recommendation,
        tool.pricing,
        tool.trafficLabel,
        tool.url,
        ...tool.categories,
        ...tool.audience,
        ...(tool.searchTerms || []),
        ...Object.values(tool.sources || {})
      ]
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ");

      const categoryMatches = state.activeCategory === "All" || tool.categories.includes(state.activeCategory);
      const pricingMatches = state.activePricing === "All" || tool.pricing === state.activePricing;
      const queryMatches = !queryTokens.length || queryTokens.every((token) => haystack.includes(token));
      return categoryMatches && pricingMatches && queryMatches;
    });
  }

  function pickTools(ids) {
    return ids
      .map((id) => tools.find((tool) => tool.id === id))
      .filter(Boolean);
  }

  function promptTrackMeta(trackId) {
    return promptTracks.find((track) => track.id === trackId) || promptTracks[0];
  }

  function promptTrackHref(trackId) {
    return `${assetPrefix}prompt-library.html?track=${encodeURIComponent(trackId)}`;
  }

  function topToolsByCategory(category, limit) {
    return tools
      .filter((tool) => tool.categories.includes(category))
      .slice(0, limit);
  }

  function getFeaturedVisibleCount(key) {
    return state.featuredVisibleCounts[key] || 20;
  }

  function increaseFeaturedVisibleCount(key) {
    state.featuredVisibleCounts[key] = getFeaturedVisibleCount(key) + 20;
  }

  function toolCard(tool, options) {
    const settings = options || {};
    const classes = ["unified-tool-card", settings.className].filter(Boolean).join(" ");
    const rankBadge = settings.rank ? `<span class="tool-rank-badge">${settings.rank}</span>` : "";
    const metaBadge = settings.meta ? `<span class="tool-badge tool-corner-badge">${shortenText(settings.meta, 12)}</span>` : "";
    const idAttr = settings.id ? ` id="${settings.id}"` : "";
    const fullSummary = settings.summary || tool.summary;
    const summary = shortenText(settings.summary || tool.summary, settings.summaryLength || 112);

    return `
      <a class="${classes}" href="${detailUrl(tool)}"${idAttr}>
        ${rankBadge}
        ${metaBadge}
        <span class="tool-card-head">
          ${iconShell(tool)}
          <span class="tool-text">
            <span class="tool-title-line">
              <h3>${tool.name}</h3>
            </span>
            <span class="tool-subtitle">${tool.vendor}</span>
          </span>
        </span>
        <span class="tool-summary" data-tip="${escapeAttribute(fullSummary)}">
          <span class="tool-summary-text">${summary}</span>
        </span>
      </a>
    `;
  }

  function filteredNewsItems() {
    if (state.activeNewsCategory === "All") {
      return flatNewsItems;
    }
    return flatNewsItems.filter((item) => item.category === state.activeNewsCategory);
  }

  function newsToolListMarkup(items, badgeBuilder) {
    return items
      .map((tool, index) => `
        <a class="news-tool-row" href="${detailUrl(tool)}">
          ${iconShell(tool, "is-compact-chip")}
          <span class="news-tool-row-copy">
            <strong>${tool.name}</strong>
            <span>${tool.vendor}</span>
          </span>
          <span class="news-tool-row-badge">${badgeBuilder(tool, index)}</span>
        </a>
      `)
      .join("");
  }

  const NEWS_IMAGE_FALLBACKS = {
    default: "assets/brand-mark.png",
    agents: "assets/news/superhuman-personal-agents.png",
    model: "assets/news/google-gemini-flash-live-source.webp",
    open: "assets/news/deepseek-v3-open-source-first.png",
    funding: "assets/news/perplexity-billion-build.png",
    business: "assets/news/perplexity-billion-build.png",
    finance: "assets/news/neuron-chatgpt-100-tier.png",
    policy: "assets/news/rundown-meta-superintelligence.png",
    safety: "assets/news/mit-compressm.png",
    research: "assets/news/google-gemini-flash-live.png",
    translation: "assets/news/google-gemini-flash-live.png",
    productivity: "assets/news/adobe-firefly-precision-flow.jpg",
    creative: "assets/news/adobe-firefly-precision-flow.jpg",
    developer: "assets/news/chatgpt-100-tier-source.png",
    infrastructure: "assets/news/openai-cyber-defense-local.jpg",
    anthropic: "assets/news/superhuman-claude-mythos.png",
    perplexity: "assets/news/perplexity-billion-build-source.jpg",
    google: "assets/news/google-gemini-flash-live-source-large.webp",
    openai: "assets/news/chatgpt-100-tier-source.png",
    adobe: "assets/news/adobe-firefly-precision-flow.jpg",
    deepseek: "assets/news/deepseek-v3-open-source-first.png",
    claude: "assets/news/superhuman-claude-mythos.png",
    gemini: "assets/news/google-gemini-flash-live-source.webp"
  };
  const NEWS_BRAND_FALLBACK_IMAGE = "assets/brand-mark.png";
  const NEWS_TREE_FALLBACK_ICON = "assets/news/northstar-icon-fallback.svg";
  const NEWS_BRIGHT_IMAGE_FALLBACKS = {
    default: "assets/news/bright-product-updates.svg",
    "Product Updates": "assets/news/bright-product-updates.svg",
    Productivity: "assets/news/bright-productivity.svg",
    Safety: "assets/news/bright-safety.svg"
  };
  const NEWS_PORTRAIT_IMAGE_URLS = new Set([
    "assets/news/gemini-personal-intelligence-local.jpg"
  ]);
  const NEWS_WEEKLY_IMAGE_FALLBACKS = [
    "assets/news/fallback-ai-network-abstract.jpg",
    "assets/news/fallback-ai-datacenter-aerial.jpg",
    "assets/news/fallback-ai-chip-wafer.jpg",
    "assets/news/fallback-google-ai-economy.webp",
    "assets/news/fallback-axios-openai-cyber.webp",
    "assets/news/openai-cyber-defense-local.jpg",
    "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
    "assets/news/source-verge-chrome-skills.webp"
  ];

  function brightNewsImageUrl(item) {
    return NEWS_BRIGHT_IMAGE_FALLBACKS[item.category] || NEWS_BRIGHT_IMAGE_FALLBACKS.default;
  }

  function newsImageUrl(item, options) {
    const settings = options || {};
    if (settings.useBrightFallback) {
      return brightNewsImageUrl(item);
    }

    if (item.imageUrl && !(settings.avoidPortraits && NEWS_PORTRAIT_IMAGE_URLS.has(item.imageUrl))) {
      return item.imageUrl;
    }

    if (!settings.allowFallback) {
      return "";
    }

    if (settings.useBrandFallback) {
      return NEWS_BRAND_FALLBACK_IMAGE;
    }

    const toolMatches = newsToolIds(item);
    const haystack = `${item.category || ""} ${item.title || ""} ${item.summary || ""} ${item.source || ""}`.toLowerCase();

    if (toolMatches.some((tool) => tool.id === "perplexity") || haystack.includes("perplexity")) {
      return NEWS_IMAGE_FALLBACKS.perplexity;
    }
    if (toolMatches.some((tool) => tool.id === "claude") || haystack.includes("anthropic") || haystack.includes("claude")) {
      return NEWS_IMAGE_FALLBACKS.claude;
    }
    if (toolMatches.some((tool) => tool.id === "gemini") || haystack.includes("google") || haystack.includes("gemini")) {
      return NEWS_IMAGE_FALLBACKS.gemini;
    }
    if (toolMatches.some((tool) => tool.id === "chatgpt") || haystack.includes("openai") || haystack.includes("codex")) {
      return NEWS_IMAGE_FALLBACKS.openai;
    }
    if (toolMatches.some((tool) => tool.id === "adobefirefly") || haystack.includes("adobe") || haystack.includes("firefly")) {
      return NEWS_IMAGE_FALLBACKS.adobe;
    }
    if (toolMatches.some((tool) => tool.id === "deepseek") || haystack.includes("deepseek")) {
      return NEWS_IMAGE_FALLBACKS.deepseek;
    }
    if (haystack.includes("agent")) {
      return NEWS_IMAGE_FALLBACKS.agents;
    }
    if (haystack.includes("open model") || haystack.includes("open-weight") || haystack.includes("open source")) {
      return NEWS_IMAGE_FALLBACKS.open;
    }
    if (haystack.includes("funding")) {
      return NEWS_IMAGE_FALLBACKS.funding;
    }
    if (haystack.includes("policy")) {
      return NEWS_IMAGE_FALLBACKS.policy;
    }
    if (haystack.includes("safety")) {
      return NEWS_IMAGE_FALLBACKS.safety;
    }
    if (haystack.includes("research")) {
      return NEWS_IMAGE_FALLBACKS.research;
    }
    if (haystack.includes("translation")) {
      return NEWS_IMAGE_FALLBACKS.translation;
    }
    if (haystack.includes("developer")) {
      return NEWS_IMAGE_FALLBACKS.developer;
    }
    if (haystack.includes("creative")) {
      return NEWS_IMAGE_FALLBACKS.creative;
    }
    if (haystack.includes("infrastructure")) {
      return NEWS_IMAGE_FALLBACKS.infrastructure;
    }
    if (haystack.includes("business")) {
      return NEWS_IMAGE_FALLBACKS.business;
    }
    if (haystack.includes("finance")) {
      return NEWS_IMAGE_FALLBACKS.finance;
    }
    if (haystack.includes("productivity")) {
      return NEWS_IMAGE_FALLBACKS.productivity;
    }
    if (haystack.includes("model")) {
      return NEWS_IMAGE_FALLBACKS.model;
    }

    return NEWS_IMAGE_FALLBACKS.default;
  }

  function uniqueNewsImageUrl(item, options, usedImages) {
    const imageUrl = newsImageUrl(item, options);
    if (imageUrl && !usedImages.has(imageUrl)) {
      usedImages.add(imageUrl);
      return imageUrl;
    }

    const fallbackUrl = NEWS_WEEKLY_IMAGE_FALLBACKS.find((url) => !usedImages.has(url));
    if (fallbackUrl) {
      usedImages.add(fallbackUrl);
      return fallbackUrl;
    }

    return imageUrl || "";
  }

  function newsImageMarkupFromUrl(item, className, imageUrl) {
    if (!imageUrl) {
      return "";
    }
    return `
      <span class="${className}">
        <img src="${imageUrl}" alt="${escapeAttribute(item.title)}" loading="lazy" onerror="const media=this.parentElement; if(media){media.style.display='none';} const card=this.closest('.news-feature-card, .news-list-item, .news-article-row'); if(card){card.classList.remove('has-media');}">
      </span>
    `;
  }

  function newsImageMarkup(item, className, options) {
    const imageUrl = newsImageUrl(item, options);
    if (!imageUrl) {
      return "";
    }
    const settings = options || {};
    if (settings.useBrightFallback) {
      return `<span class="${className} is-bright-news-art" data-news-art="${escapeAttribute(item.category || "default")}"></span>`;
    }
    return newsImageMarkupFromUrl(item, className, imageUrl);
  }

  function shortenWords(value, limit) {
    const text = String(value || "").trim();
    if (!text) {
      return "";
    }
    const words = text.split(/\s+/);
    if (words.length <= limit) {
      return text;
    }
    return `${words.slice(0, limit).join(" ")}...`;
  }

  function normalizeNewsTitle(title) {
    return String(title || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token && token.length > 2 && !["the", "and", "for", "with", "from", "that", "this", "into"].includes(token));
  }

  function areNewsItemsSimilar(left, right) {
    if (!left || !right) {
      return false;
    }
    if (left.id && right.id && left.id === right.id) {
      return true;
    }
    if (left.href && right.href && left.href === right.href) {
      return true;
    }

    const leftTokens = normalizeNewsTitle(left.title);
    const rightTokens = normalizeNewsTitle(right.title);
    if (!leftTokens.length || !rightTokens.length) {
      return false;
    }

    const rightTokenSet = new Set(rightTokens);
    const overlapCount = leftTokens.filter((token) => rightTokenSet.has(token)).length;
    const overlapRatio = overlapCount / Math.min(leftTokens.length, rightTokens.length);
    return overlapRatio >= 0.72;
  }

  function distinctNewsItems(items, limit, excludedItems) {
    const picks = [];
    const blocked = excludedItems || [];

    items.forEach((item) => {
      if (picks.length >= limit) {
        return;
      }
      const seenAlready = blocked.some((other) => areNewsItemsSimilar(item, other)) || picks.some((other) => areNewsItemsSimilar(item, other));
      if (!seenAlready) {
        picks.push(item);
      }
    });

    return picks;
  }

  function latestRecentNewsItems(items, limit) {
    const latestDates = [...new Set(items.map((item) => item.date).filter(Boolean))]
      .sort((left, right) => right.localeCompare(left))
      .slice(0, 2);

    if (!latestDates.length) {
      return [];
    }

    return distinctNewsItems(
      sortNewsItems(items.filter((item) => latestDates.includes(item.date))),
      limit,
      []
    );
  }

  function homeNewsGroups(limit = 18) {
    const selectedItems = [];
    for (const group of newsFeed) {
      for (const item of sortNewsItems(group.items)) {
        if (state.activeNewsCategory !== "All" && item.category !== state.activeNewsCategory) {
          continue;
        }
        selectedItems.push({ group, item });
        if (selectedItems.length >= limit) {
          break;
        }
      }
      if (selectedItems.length >= limit) {
        break;
      }
    }

    return newsFeed
      .map((group) => ({
        ...group,
        items: selectedItems.filter((entry) => entry.group === group).map((entry) => entry.item)
      }))
      .filter((group) => group.items.length);
  }

  function homeNewsItems() {
    return homeNewsGroups().flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        date: group.date,
        dateLabel: group.label
      }))
    );
  }

  function newsToolIds(item, options) {
    const settings = options || {};
    const haystack = `${item.title || ""} ${item.summary || ""} ${item.excerpt || ""} ${item.source || ""}`.toLowerCase();
    const matches = [];
    const pushIfMissing = (toolId) => {
      if (toolId && !matches.includes(toolId) && tools.some((tool) => tool.id === toolId)) {
        matches.push(toolId);
      }
    };

    if (haystack.includes("gemini") || haystack.includes("gemma") || haystack.includes("google")) {
      pushIfMissing("gemini");
      pushIfMissing("googleaistudio");
    }
    if (haystack.includes("claude") || haystack.includes("anthropic")) {
      pushIfMissing("claude");
    }
    if (haystack.includes("chatgpt") || haystack.includes("openai") || haystack.includes("codex")) {
      pushIfMissing("chatgpt");
    }
    if (haystack.includes("perplexity")) {
      pushIfMissing("perplexity");
    }
    if (haystack.includes("deepseek")) {
      pushIfMissing("deepseek");
    }
    if (haystack.includes("adobe")) {
      pushIfMissing("adobefirefly");
    }
    if (haystack.includes("notion")) {
      pushIfMissing("notion");
    }
    if (haystack.includes("deepl")) {
      pushIfMissing("deepl");
    }

    if (!matches.length && settings.allowFallback !== false) {
      pushIfMissing("chatgpt");
    }

    return pickTools(matches).slice(0, 2);
  }

  function newsTreeToolIcons(item) {
    const matchedTools = newsToolIds(item, { allowFallback: false });
    if (matchedTools.length) {
      return matchedTools.map((tool) => {
        const tooltip = escapeAttribute(tooltipText(tool));
        return `
          <span class="tool-icon-wrap news-tree-tool-icon" data-tip="${tooltip}">
            <span class="tool-icon-shell">
              <img src="${tool.iconUrl}" alt="${tool.name} icon" loading="eager" onerror="this.onerror=null;this.closest('.tool-icon-shell').classList.add('is-brand-fallback');this.src='${NEWS_TREE_FALLBACK_ICON}';">
            </span>
          </span>
        `;
      }).join("");
    }
    return `
      <span class="tool-icon-wrap news-tree-tool-icon" data-tip="Northstar signal">
        <span class="tool-icon-shell is-brand-fallback">
          <img src="${NEWS_TREE_FALLBACK_ICON}" alt="Northstar signal icon" loading="lazy">
        </span>
      </span>
    `;
  }

  function newsHeatScore(item) {
    const matchedTools = newsToolIds(item, { allowFallback: false });
    const trafficScore = matchedTools.reduce((score, tool) => Math.max(score, tool.monthlyVisits || 0), 0);
    const categoryScore = {
      "Product Updates": 7000000,
      "Model Releases": 6500000,
      Agents: 6000000,
      "Developer Tools": 5500000,
      Safety: 5000000,
      Policy: 4200000,
      "Open Models": 4000000,
      Funding: 3500000,
      "Creative AI": 3200000,
      Productivity: 3000000,
      "Research Workflows": 2500000
    }[item.category] || 1000000;
    return trafficScore + categoryScore;
  }

  function sortNewsItems(items) {
    return [...items].sort((left, right) => {
      const heatDelta = newsHeatScore(right) - newsHeatScore(left);
      if (heatDelta) {
        return heatDelta;
      }
      return String(right.title || "").localeCompare(String(left.title || ""));
    });
  }

  function fitHomeNewsTreeToSidebar() {
    if (document.body?.dataset?.page === "news" || !ui.newsFeed) {
      return;
    }
    const newsMain = ui.newsFeed.closest(".news-main");
    const sidebar = document.querySelector(".news-sidebar");
    if (!newsMain || !sidebar) {
      return;
    }

    newsMain.style.maxHeight = "";
    newsMain.style.overflow = "";

    const sidebarBox = sidebar.getBoundingClientRect();
    const sidebarChildren = [...sidebar.children];
    const sidebarContentBottom = sidebarChildren.length
      ? Math.max(...sidebarChildren.map((child) => child.getBoundingClientRect().bottom))
      : sidebarBox.bottom;
    const maxHeight = Math.max(0, sidebarContentBottom - sidebarBox.top);
    let guard = 36;
    while (newsMain.getBoundingClientRect().height > maxHeight + 120 && guard > 0) {
      const lastGroup = [...ui.newsFeed.querySelectorAll(".news-day-group")].at(-1);
      if (!lastGroup) {
        break;
      }
      const lastItem = [...lastGroup.querySelectorAll(".news-tree-item")].at(-1);
      if (lastItem) {
        lastItem.remove();
      }
      if (!lastGroup.querySelector(".news-tree-item")) {
        lastGroup.remove();
      }
      guard -= 1;
    }

    newsMain.style.maxHeight = `${Math.ceil(maxHeight)}px`;
    newsMain.style.overflow = "hidden";
  }

  function newsGroupAnchorId(group) {
    return `news-date-${group.date}`;
  }

  function activeNewsDate() {
    const hash = String(window.location.hash || "").replace(/^#/, "");
    const matched = newsFeed.find((group) => newsGroupAnchorId(group) === hash);
    return matched ? matched.date : newsFeed[0]?.date;
  }

  function formatNewsDateLabel(dateValue) {
    const date = new Date(`${dateValue}T12:00:00`);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  function renderNewsDateBrowser() {
    if (!ui.newsDateBrowser || !newsFeed.length) {
      return;
    }

    const selectedDate = activeNewsDate();
    const selectedGroup = newsFeed.find((group) => group.date === selectedDate) || newsFeed[0];
    const selectedDateObject = new Date(`${selectedGroup.date}T12:00:00`);
    const year = selectedDateObject.getFullYear();
    const monthIndex = selectedDateObject.getMonth();
    const monthLabel = selectedDateObject.toLocaleDateString("en-US", { month: "long" });
    const firstDay = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const leadingEmptyDays = firstDay.getDay();
    const weekdayLabels = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    const newsDateMap = new Map(newsFeed.map((group) => [group.date, group]));
    const monthOptions = [...new Set(newsFeed.map((group) => new Date(`${group.date}T12:00:00`).getMonth()))]
      .sort((left, right) => left - right);
    const yearOptions = [...new Set(newsFeed.map((group) => new Date(`${group.date}T12:00:00`).getFullYear()))]
      .sort((left, right) => left - right);
    const dayCells = [];

    for (let index = 0; index < leadingEmptyDays; index += 1) {
      dayCells.push('<span class="news-calendar-day is-empty" aria-hidden="true"></span>');
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const matchingGroup = newsDateMap.get(dateKey);
      const isActive = selectedDate === dateKey;
      if (matchingGroup) {
        dayCells.push(`
          <a class="news-calendar-day is-link ${isActive ? "is-active" : ""}" href="#${newsGroupAnchorId(matchingGroup)}" aria-label="${formatNewsDateLabel(dateKey)}">
            ${day}
          </a>
        `);
      } else {
        dayCells.push(`<span class="news-calendar-day is-disabled">${day}</span>`);
      }
    }

    ui.newsDateBrowser.innerHTML = `
      <div class="news-calendar-shell">
        <div class="news-calendar-selected">${formatNewsDateLabel(selectedGroup.date)}</div>
        <div class="news-calendar-panel">
          <div class="news-calendar-toolbar">
            <span class="news-calendar-nav" aria-hidden="true">&#8249;</span>
            <label class="news-calendar-select">
              <select class="news-calendar-dropdown" data-news-calendar="month" aria-label="Select month">
                ${monthOptions
                  .map((optionMonth) => {
                    const optionLabel = new Date(year, optionMonth, 1).toLocaleDateString("en-US", { month: "long" });
                    return `<option value="${optionMonth}" ${optionMonth === monthIndex ? "selected" : ""}>${optionLabel}</option>`;
                  })
                  .join("")}
              </select>
              <span class="news-calendar-caret">&#9662;</span>
            </label>
            <label class="news-calendar-select is-year">
              <select class="news-calendar-dropdown" data-news-calendar="year" aria-label="Select year">
                ${yearOptions
                  .map((optionYear) => `<option value="${optionYear}" ${optionYear === year ? "selected" : ""}>${optionYear}</option>`)
                  .join("")}
              </select>
              <span class="news-calendar-caret">&#9662;</span>
            </label>
            <span class="news-calendar-nav" aria-hidden="true">&#8250;</span>
          </div>
          <div class="news-calendar-weekdays">
            ${weekdayLabels.map((label) => `<span>${label}</span>`).join("")}
          </div>
          <div class="news-calendar-grid">
            ${dayCells.join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderNewsHub() {
    if (!ui.newsLeadGrid || !ui.newsFeed) {
      return;
    }

    const isNewsPage = document.body?.dataset?.page === "news";
    const items = filteredNewsItems();
    const displayItems = isNewsPage ? items : homeNewsItems();
    const featuredCandidatesWithImages = displayItems.filter((item) => newsImageUrl(item, { allowFallback: true }));
    const featuredItems = distinctNewsItems(featuredCandidatesWithImages, 3, []);
    const visibleGroups = isNewsPage ? newsFeed : homeNewsGroups();

    if (!displayItems.length) {
      ui.newsLeadGrid.innerHTML = "";
      ui.newsFeed.innerHTML = `
        <div class="empty-state">
          <p class="kicker">No News</p>
          <h3>No stories are available for this topic yet. Try another news lane.</h3>
        </div>
      `;
      return;
    }

    const weeklyNewsImages = new Set();

    ui.newsLeadGrid.innerHTML = featuredItems
      .map((item, index) => {
        const isHomePage = !isNewsPage;
        const featureImageOptions = isHomePage ? { allowFallback: true, avoidPortraits: true } : { allowFallback: true };
        const featureImageUrl = uniqueNewsImageUrl(item, featureImageOptions, weeklyNewsImages);
        const title = isHomePage ? shortenWords(item.title, 7) : item.title;
        const summary = isHomePage ? shortenWords(item.summary, 18) : item.summary;
        const excerpt = item.excerpt ? (isHomePage ? shortenWords(item.excerpt, 18) : item.excerpt) : "";
        return `
        <article class="news-feature-card ${index === 0 ? "is-primary" : ""} ${featureImageUrl ? "has-media" : ""}">
          ${newsImageMarkupFromUrl(item, "news-feature-media", featureImageUrl)}
          <div class="news-card-topline">
            <span class="news-topic-badge">${item.category}</span>
            <span class="news-card-date">${item.dateLabel}</span>
          </div>
          <h3><a href="${item.href}" target="_blank" rel="noreferrer">${title}</a></h3>
          <p class="news-summary">${summary}</p>
          ${excerpt ? `<p class="news-excerpt">${excerpt}</p>` : ""}
          <div class="news-card-meta">
            <span>${item.source}</span>
            <a class="news-inline-link" href="${item.href}" target="_blank" rel="noreferrer">View source</a>
          </div>
        </article>
      `;
      })
      .join("");

    const timelineItems = [];
    const groupedMarkup = visibleGroups
      .map((group) => {
        const groupExclusions = isNewsPage ? timelineItems : [...featuredItems, ...timelineItems];
        const groupItems = distinctNewsItems(
          sortNewsItems(group.items.filter((item) => state.activeNewsCategory === "All" || item.category === state.activeNewsCategory)),
          isNewsPage ? group.items.length : 10,
          groupExclusions
        );
        if (!groupItems.length) {
          return "";
        }
        timelineItems.push(...groupItems);
        return `
          <section class="news-day-group" id="${newsGroupAnchorId(group)}">
            <div class="news-day-header">
              <h3>${group.label}</h3>
            </div>
            <div class="news-tree">
              ${groupItems
                .map((item) => `
                  <article class="news-tree-item">
                    <span class="news-tree-node" aria-hidden="true"></span>
                    <div class="news-tree-content">
                      <div class="news-tree-tools">
                        ${newsTreeToolIcons(item)}
                      </div>
                      <p class="news-tree-summary"><a href="${item.href}" target="_blank" rel="noreferrer">${item.summary}</a></p>
                    </div>
                  </article>
                `)
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");

    ui.newsFeed.innerHTML = groupedMarkup;

    if (ui.newsAds) {
      ui.newsAds.innerHTML = `
        <a class="news-ad-card is-primary is-image-only" href="https://velocai.net" target="_blank" rel="noreferrer sponsored">
          <img class="news-ad-image" src="assets/sponsors/velocai.jpg" alt="VelocAI sponsor banner">
        </a>
        <div class="news-ad-card news-ad-card-submit" aria-label="Submit Lane app shortcuts">
          <a class="submit-app-link" href="https://apps.apple.com/app/ai-cleanup-kit/id6757135968" target="_blank" rel="noreferrer" aria-label="Cleanup Pro on the App Store">
            <img class="submit-app-icon" src="assets/submit-lane/cleanup-pro.png" alt="Cleanup Pro">
            <span class="submit-app-name">App Name: Cleanup Pro</span>
          </a>
          <a class="submit-app-link" href="https://apps.apple.com/app/ai-find/id6757230039" target="_blank" rel="noreferrer" aria-label="Find AI on the App Store">
            <img class="submit-app-icon" src="assets/submit-lane/find-ai.png" alt="Find AI">
            <span class="submit-app-name">App Name: Find AI</span>
          </a>
          <a class="submit-app-link" href="https://apps.apple.com/app/bluetooth-explorer-ai-terminal/id6757826313" target="_blank" rel="noreferrer" aria-label="Bluetooth Explorer on the App Store">
            <img class="submit-app-icon" src="assets/submit-lane/bluetooth-explorer.png" alt="Bluetooth Explorer">
            <span class="submit-app-name">App Name: Bluetooth Explorer</span>
          </a>
          <a class="submit-app-link" href="https://apps.apple.com/app/translate-ai-ai-translator/id6757105258" target="_blank" rel="noreferrer" aria-label="AI Translator on the App Store">
            <img class="submit-app-icon" src="assets/submit-lane/ai-translator.png" alt="AI Translator">
            <span class="submit-app-name">App Name: AI Translator</span>
          </a>
          <a class="submit-app-link" href="https://apps.apple.com/app/dualshot-camera-dual-recorder/id6761664966" target="_blank" rel="noreferrer" aria-label="DualShot Camera on the App Store">
            <img class="submit-app-icon" src="assets/submit-lane/watch-companion.png" alt="DualShot Camera">
            <span class="submit-app-name">App Name: DualShot Camera</span>
          </a>
        </div>
      `;
    }

    renderNewsDateBrowser();

    if (ui.newsHotTools) {
      ui.newsHotTools.innerHTML = newsToolListMarkup(tools.slice(0, 5), (tool) => formatVisits(tool.monthlyVisits));
    }

    if (ui.newsLatestTools) {
      ui.newsLatestTools.innerHTML = newsToolListMarkup(pickTools(newAndNotableIds).slice(0, 5), () => "New");
    }

    if (ui.newsLatestArticles) {
      const latestArticleItems = latestRecentNewsItems(items, 5);
      ui.newsLatestArticles.innerHTML = latestArticleItems
        .map((item) => {
          const articleImageUrl = uniqueNewsImageUrl(item, { allowFallback: true, avoidPortraits: true }, weeklyNewsImages);
          return `
          <a class="news-article-row ${articleImageUrl ? "has-media" : ""}" href="${item.href}" target="_blank" rel="noreferrer">
            ${newsImageMarkupFromUrl(item, "news-article-media", articleImageUrl)}
            <span class="news-article-copy">
              <span class="news-card-topline">
                <span class="news-topic-badge">${item.category}</span>
                <span class="news-card-date">${item.dateLabel}</span>
              </span>
              <strong>${shortenWords(item.title, 11)}</strong>
              <span class="news-article-summary">${shortenWords(item.summary, 20)}</span>
              <span class="news-article-meta">${item.source}</span>
            </span>
          </a>
        `;
        })
        .join("");
    }

    fitHomeNewsTreeToSidebar();
  }

  function renderSidebar() {
    if (!ui.sidebarNav) {
      return;
    }
    ui.sidebarNav.innerHTML = categories
      .map((category) => `
        <button class="sidebar-link ${state.activeCategory === category ? "is-active" : ""}" data-category="${category}" type="button">
          <span class="sidebar-glyph" data-sidebar-tone="${category}" aria-hidden="true">${sidebarIcon(category)}</span>
          <span>${category}</span>
        </button>
      `)
      .join("");

    ui.sidebarNav.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeCategory = button.dataset.category;
        renderAll();
        navigateToDirectoryCategory(button.dataset.category);
      });
    });
  }

  function navigateToDirectoryCategory(category) {
    const targetId = directoryCategoryTargetId(category);
    const isDirectoryPage = /(^|\/)directory\.html$/i.test(window.location.pathname || "");

    if (isDirectoryPage && document.getElementById(targetId)) {
      scrollToDirectoryCategory(category);
      return;
    }

    window.location.href = `directory.html#${targetId}`;
  }

  function directoryCategoryTargetId(category) {
    return category === "All" ? "directory" : `directory-section-${slugify(category)}`;
  }

  function scrollToDirectoryCategory(category) {
    const target = document.getElementById(directoryCategoryTargetId(category));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderHeroMetrics() {
    if (ui.heroToolsCopy) {
      ui.heroToolsCopy.textContent = String(tools.length);
    }
    if (ui.heroCategoryCopy) {
      ui.heroCategoryCopy.textContent = String(categories.length - 1);
    }
  }

  function renderReleaseTicker() {
    if (!ui.releaseTickerTrack) {
      return;
    }

    const releaseTools = pickTools(newAndNotableIds).slice(0, 8);
    if (!releaseTools.length) {
      ui.releaseTickerTrack.innerHTML = `
        <div class="release-ticker-empty">
          <span>No new product release notices yet.</span>
        </div>
      `;
      return;
    }

    const releaseMarkup = releaseTools
      .map((tool) => `
        <a class="release-ticker-item" href="${detailUrl(tool)}">
          ${iconShell(tool, "release-ticker-icon")}
          <span class="release-ticker-copy">
            <strong>${tool.name}</strong>
            <span>${tool.vendor} · ${tool.categories.slice(0, 2).join(" / ")}</span>
          </span>
          <span class="release-ticker-badge">New</span>
        </a>
      `)
      .join("");

    ui.releaseTickerTrack.innerHTML = `
      <div class="release-ticker-marquee">
        <div class="release-ticker-lane">
          ${releaseMarkup}
        </div>
        <div class="release-ticker-lane" aria-hidden="true">
          ${releaseMarkup}
        </div>
      </div>
    `;
  }

  function renderHotFilters() {
    if (!ui.hotFilters) {
      return;
    }
    ui.hotFilters.innerHTML = categories
      .map((category) => `<button class="filter-pill ${state.activeCategory === category ? "is-active" : ""}" type="button" data-hot-category="${category}">${category}</button>`)
      .join("");

    ui.hotFilters.querySelectorAll("[data-hot-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeCategory = button.dataset.hotCategory;
        renderAll();
      });
    });
  }

  function renderHotGrid() {
    if (!ui.hotGrid) {
      return;
    }
    const items = filteredTools().slice(0, 8);
    if (!items.length) {
      ui.hotGrid.innerHTML = `
        <div class="empty-state">
          <p class="kicker">No matches</p>
          <h3>Try a broader search or clear the current category.</h3>
        </div>
      `;
      return;
    }

    ui.hotGrid.innerHTML = items
      .map((tool) =>
        toolCard(tool, {
          className: "tool-tile",
          meta: tool.pricing === "Free" ? "Free" : formatVisits(tool.monthlyVisits),
          summary: tool.summary,
          summaryLength: 104
        })
      )
      .join("");
  }

  function miniTool(tool, note) {
    return toolCard(tool, {
      className: "mini-item",
      summary: note,
      summaryLength: 108
    });
  }

  function toolChip(tool, roleText) {
    const note = roleText || tool.summary;
    return `
      <a class="stack-tool-chip" href="${detailUrl(tool)}">
        <span class="stack-tool-chip-head">
          ${iconShell(tool, "is-compact-chip")}
          <span class="stack-tool-chip-text">
            <strong>${tool.name}</strong>
            <span>${tool.vendor}</span>
          </span>
        </span>
        <span class="stack-tool-chip-note tool-summary" data-tip="${escapeAttribute(note)}">
          <span class="tool-summary-text">${note}</span>
        </span>
      </a>
    `;
  }

  function operatorFlowCard(flow) {
    const flowTools = pickTools(flow.toolIds);
    return `
      <article class="stack-flow-card">
        <div class="stack-flow-head">
          <p class="kicker">Workflow Chain</p>
          <h4>${flow.title}</h4>
          <p>${flow.description}</p>
        </div>
        <div class="stack-flow-steps">
          ${flowTools
            .map(
              (tool, index) => `
                <div class="stack-flow-step">
                  <span class="stack-flow-step-index">${index + 1}</span>
                  ${toolChip(tool, flow.stepNotes?.[index])}
                </div>
              `
            )
            .join("")}
        </div>
      </article>
    `;
  }

  function featuredBoardMarkup(items, options) {
    const settings = options || {};
    const key = settings.key;
    const visibleCount = Math.min(items.length, getFeaturedVisibleCount(key));
    const detailedItems = items.slice(0, Math.min(20, items.length));
    const compactItems = items.slice(20, visibleCount);

    const detailedMarkup = detailedItems.length
      ? `
        <div class="featured-card-grid">
          ${detailedItems
            .map((tool, index) =>
              toolCard(tool, {
                className: "tool-tile feature-tool-tile",
                meta: settings.meta ? settings.meta(tool, index, false) : "",
                summary: settings.summary ? settings.summary(tool, index, false) : tool.summary,
                summaryLength: settings.summaryLength || 110
              })
            )
            .join("")}
        </div>
      `
      : "";

    const compactMarkup = compactItems.length
      ? `
        <div class="featured-card-grid featured-card-grid-compact">
          ${compactItems
            .map((tool, index) =>
              toolCard(tool, {
                className: "tool-tile feature-tool-tile is-compact",
                meta: settings.meta ? settings.meta(tool, index + 20, true) : "",
                summary: settings.summary ? settings.summary(tool, index + 20, true) : tool.summary,
                summaryLength: settings.compactSummaryLength || 82
              })
            )
            .join("")}
        </div>
      `
      : "";

    const moreMarkup = visibleCount < items.length
      ? `
        <div class="load-more-row">
          <button class="load-more-button" type="button" data-featured-more="${key}">More +</button>
        </div>
      `
      : "";

    return `${detailedMarkup}${compactMarkup}${moreMarkup}`;
  }

  function renderTodayBoards() {
    const todayHotTools = tools.filter((tool) => tool.monthlyVisits >= 30000000);

    if (ui.todayList) {
      ui.todayList.innerHTML = featuredBoardMarkup(todayHotTools, {
        key: "today",
        meta: (tool) => tool.pricing === "Free" ? "Free" : formatVisits(tool.monthlyVisits),
        summary: (tool, index, isCompact) => isCompact ? tool.summary : `${tool.trafficLabel} | ${tool.categories.join(" | ")}`,
        summaryLength: 116,
        compactSummaryLength: 84
      });
    }

    const editorTools = pickTools(editorPickIds);

    if (ui.editorList) {
      ui.editorList.innerHTML = featuredBoardMarkup(editorTools, {
        key: "editor",
        meta: () => "Editor",
        summary: (tool, index, isCompact) => isCompact ? tool.summary : tool.recommendation,
        summaryLength: 116,
        compactSummaryLength: 84
      });
    }

    if (ui.stackList) {
      ui.stackList.innerHTML = operatorStackFlows.map((flow) => operatorFlowCard(flow)).join("");
    }

    const newest = pickTools(newAndNotableIds);

    if (ui.newList) {
      ui.newList.innerHTML = featuredBoardMarkup(newest, {
        key: "new",
        meta: () => "New",
        summary: (tool, index, isCompact) => isCompact ? tool.summary : tool.recommendation,
        summaryLength: 116,
        compactSummaryLength: 84
      });
    }
  }

  function renderRankTabs() {
    if (!ui.rankTabs) {
      return;
    }
    ui.rankTabs.innerHTML = rankingCategories
      .map((category) => `<button class="rank-pill ${state.activeRanking === category ? "is-active" : ""}" type="button" data-rank-category="${category}">${category} TOP 10</button>`)
      .join("");

    ui.rankTabs.querySelectorAll("[data-rank-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeRanking = button.dataset.rankCategory;
        renderRankTabs();
        renderRankGrid();
      });
    });
  }

  function renderRankGrid() {
    if (!ui.rankGrid) {
      return;
    }
    const leaders = topToolsByCategory(state.activeRanking, 10);
    ui.rankGrid.innerHTML = leaders
      .map((tool, index) =>
        toolCard(tool, {
          className: "rank-item",
          summary: tool.recommendation,
          summaryLength: 104
        })
      )
      .join("");
  }

  function renderCategoryWall() {
    if (!ui.categoryWall) {
      return;
    }
    const spotlightCategories = preferredRankingOrder.filter((category) => categories.includes(category)).slice(0, 6);
    ui.categoryWall.innerHTML = spotlightCategories
      .map((category) => {
        const leaders = topToolsByCategory(category, 4);
        return `
          <article class="category-card">
            <div class="section-header compact-header">
              <div>
                <p class="kicker">Category</p>
                <h3>${category}</h3>
              </div>
            </div>
            <div class="category-mini-grid">
              ${leaders
                .map((tool) =>
                  toolCard(tool, {
                    className: "tool-tile",
                    summary: tool.summary,
                    summaryLength: 92
                  })
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderLaneWall() {
    if (!ui.laneWall) {
      return;
    }
    const lanes = ["Writing", "Design", "Video", "Coding"].filter((lane) => categories.includes(lane));
    ui.laneWall.innerHTML = lanes
      .map((lane) => {
        const leaders = topToolsByCategory(lane, 4);
        return `
          <article class="lane-card">
            <div class="section-header compact-header">
              <div>
                <p class="kicker">Lane</p>
                <h3>${lane}</h3>
              </div>
            </div>
            <div class="lane-list">
              ${leaders
                .map(
                  (tool, index) => `
                    ${toolCard(tool, {
                      className: "lane-item",
                      summary: tool.recommendation,
                      summaryLength: 116
                    })}
                  `
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderUseCaseWall() {
    if (!ui.usecaseWall) {
      return;
    }
    const boards = [
      {
        title: "For founders",
        description: "Research, decks, writing, and quick operator leverage.",
        tools: ["chatgpt", "perplexity", "gamma", "notion"]
      },
      {
        title: "For creators",
        description: "Visuals, narration, presentation, and short-form production.",
        tools: ["midjourney", "heygen", "elevenlabs", "gamma"]
      },
      {
        title: "For builders",
        description: "AI-native coding, prototyping, and model-routing for modern product teams.",
        tools: ["cursor", "lovable", "openrouter", "replit"]
      },
      {
        title: "For global teams",
        description: "Translation, multilingual delivery, and cleaner cross-border communication.",
        tools: ["deepl", "elevenlabs", "synthesia", "claude"]
      }
    ];

    ui.usecaseWall.innerHTML = boards
      .map((board) => {
        const boardTools = board.tools
          .map((id) => tools.find((tool) => tool.id === id))
          .filter(Boolean);
        return `
          <article class="usecase-card">
            <p class="kicker">Use case</p>
            <h3>${board.title}</h3>
            <p>${board.description}</p>
            <div class="usecase-tools">
              ${boardTools
                .map(
                  (tool) => `
                    ${toolCard(tool, {
                      className: "usecase-tool",
                      summary: tool.recommendation,
                      summaryLength: 88
                    })}
                  `
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  function deepRankingBlock(category) {
    const leaders = topToolsByCategory(category, 4);
    return `
      <article class="deep-ranking-card">
        <div class="section-header compact-header">
          <div>
            <p class="kicker">Top tools</p>
            <h3>${category}</h3>
          </div>
        </div>
        <div class="deep-ranking-list">
          ${leaders
            .map(
              (tool, index) => `
                ${toolCard(tool, {
                  className: "deep-ranking-item",
                  summary: tool.summary,
                  summaryLength: 116
                })}
              `
            )
            .join("")}
        </div>
      </article>
    `;
  }

  function renderDeepRankings() {
    if (!ui.deepRankingWall) {
      return;
    }
    const groups = rankingCategories.slice(0, 4);
    ui.deepRankingWall.innerHTML = groups.map((group) => deepRankingBlock(group)).join("");
  }

  function renderNewList() {}

  function renderPromptLibrary() {
    if (!ui.promptTabs || !ui.promptFeatureGrid || !ui.promptLibraryGrid) {
      return;
    }
    ui.promptTabs.innerHTML = promptTracks
      .map((track) => promptTrackAnchor(track, {
        className: "prompt-pill",
        iconClassName: "prompt-pill-icon",
        labelClassName: "prompt-pill-label",
        dataAttribute: `data-prompt-track="${track.id}"`
      }))
      .join("");

    ui.promptTabs.querySelectorAll("[data-prompt-track]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        state.activePromptTrack = button.dataset.promptTrack;
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, "", promptTrackHref(state.activePromptTrack));
        }
        renderPromptLibrary();
      });
    });

    const activeTrack = promptTrackMeta(state.activePromptTrack);
    const prompts = promptLibrary.filter((item) => item.track === state.activePromptTrack);

    if (ui.promptHeroIntro) {
      ui.promptHeroIntro.innerHTML = `
        <div>
          <p class="kicker">Prompt Track</p>
          <h1>${promptKeywordAccent(`${activeTrack.label} Prompt Guide`, activeTrack.id)}</h1>
          <p class="prompt-hero-summary">${promptKeywordAccent(activeTrack.headline, activeTrack.id)}</p>
          <div class="prompt-hero-links">
            ${promptTracks
              .map((track) => promptTrackAnchor(track, {
                className: "prompt-mini-link",
                iconClassName: "prompt-mini-link-icon",
                labelClassName: "prompt-mini-link-label"
              }))
              .join("")}
          </div>
          <p class="prompt-hero-note">Best when you want ${promptKeywordAccent(activeTrack.bestFor.slice(0, 2).join(" and ").toLowerCase(), activeTrack.id)} with cleaner structure and less generic output.</p>
        </div>
        <div class="prompt-hero-meta">
          <div class="prompt-hero-card">
            <span>Best for</span>
            <strong>${promptKeywordAccent(activeTrack.bestFor.join(" / "), activeTrack.id)}</strong>
          </div>
          <div class="prompt-hero-card">
            <span>Prompt formula</span>
            <strong>${promptKeywordAccent(activeTrack.formula.join(" -> "), activeTrack.id)}</strong>
          </div>
          <div class="prompt-hero-card">
            <span>How to use it</span>
            <strong>${promptKeywordAccent(activeTrack.guidance, activeTrack.id)}</strong>
          </div>
        </div>
      `;
    }

    ui.promptFeatureGrid.innerHTML = `
      <article class="prompt-feature-card">
        <p class="kicker">Model focus</p>
        <h3>${promptKeywordAccent(activeTrack.label, activeTrack.id)}</h3>
        <p>${promptKeywordAccent(activeTrack.description, activeTrack.id)}</p>
      </article>
      <article class="prompt-feature-card">
        <p class="kicker">How to prompt</p>
        <h3>${promptKeywordAccent("Ask with structure", activeTrack.id)}</h3>
        <p>${promptKeywordAccent(activeTrack.guidance, activeTrack.id)}</p>
      </article>
      <article class="prompt-feature-card">
        <p class="kicker">Core formula</p>
        <h3>${promptKeywordAccent(`${activeTrack.formula[0]} to ${activeTrack.formula[activeTrack.formula.length - 1]}`, activeTrack.id)}</h3>
        <p>${promptKeywordAccent(activeTrack.formula.join(", "), activeTrack.id)}</p>
      </article>
      <article class="prompt-feature-card">
        <p class="kicker">Prompt pack</p>
        <h3>${prompts.length} ready prompts</h3>
        <p>Use these as starter templates, then add your real context, source material, and target output format.</p>
      </article>
    `;

    ui.promptLibraryGrid.innerHTML = prompts
      .map(
        (item) => `
          <article class="prompt-card">
            <div class="prompt-card-head">
              <a class="prompt-track-chip" href="${promptTrackDestination(activeTrack)}">
                ${promptTrackIcon(activeTrack, "prompt-track-chip-icon")}
                <span>${activeTrack.label}</span>
              </a>
              <button class="link-button prompt-copy-button" type="button" data-copy-prompt="${escapeAttribute(item.body)}">Copy</button>
            </div>
            <h3>${promptKeywordAccent(item.title, activeTrack.id)}</h3>
            <p class="prompt-card-summary">${promptKeywordAccent(item.summary, activeTrack.id)}</p>
            <p class="prompt-card-body">${promptKeywordAccent(item.body, activeTrack.id)}</p>
          </article>
        `
      )
      .join("");

    ui.promptLibraryGrid.querySelectorAll("[data-copy-prompt]").forEach((button) => {
      button.addEventListener("click", async () => {
        const promptText = button.dataset.copyPrompt || "";
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(promptText);
            button.textContent = "Copied";
          } else {
            button.textContent = "Select";
          }
        } catch (error) {
          button.textContent = "Select";
        }
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1200);
      });
    });

    if (ui.promptGuideGrid) {
      ui.promptGuideGrid.innerHTML = promptGuideCards
        .map(
          (card) => `
            <article class="prompt-guide-card">
              <h3>${card.title}</h3>
              <p>${card.body}</p>
            </article>
          `
        )
        .join("");
    }
  }

  function buildDirectoryPill(label, currentValue, key) {
    const className = key === "category" ? "directory-pill" : "directory-pill";
    return `<button class="${className} ${currentValue === label ? "is-active" : ""}" type="button" data-${key}="${label}">${label}</button>`;
  }

  function directoryCountMarkup(toolCount, categoryCount, categoryLabel) {
    return `<span class="count-emphasis">${toolCount}</span> filtered tools across <span class="count-emphasis">${categoryCount}</span> ${categoryLabel}`;
  }

  function renderDirectoryFilters() {
    if (!ui.categoryFilters || !ui.pricingFilters) {
      return;
    }
    ui.categoryFilters.innerHTML = categories
      .map((category) => buildDirectoryPill(category, state.activeCategory, "category"))
      .join("");

    ui.pricingFilters.innerHTML = pricingOptions
      .map((pricing) => buildDirectoryPill(pricing, state.activePricing, "pricing"))
      .join("");

    ui.categoryFilters.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeCategory = button.dataset.category;
        renderAll();
        scrollToDirectoryCategory(button.dataset.category);
      });
    });

    ui.pricingFilters.querySelectorAll("[data-pricing]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activePricing = button.dataset.pricing;
        renderAll();
      });
    });
  }

  function renderDirectory() {
    if (!ui.directoryGrid || !ui.resultsCount) {
      return;
    }
    const items = filteredTools();
    const visibleCategories = categories
      .filter((category) => category !== "All")
      .map((category) => ({
        category,
        items: items.filter((tool) => tool.categories.includes(category))
      }))
      .filter((entry) => entry.items.length);

    const categoryLabel = visibleCategories.length === 1 ? "category" : "categories";
    ui.resultsCount.innerHTML = directoryCountMarkup(items.length, visibleCategories.length, categoryLabel);

    if (!items.length) {
      if (ui.directoryOverviewGrid) {
        ui.directoryOverviewGrid.innerHTML = "";
      }
      if (ui.directorySections) {
        ui.directorySections.innerHTML = "";
      }
      ui.directoryGrid.innerHTML = `
        <div class="empty-state">
          <p class="kicker">No matches</p>
          <h3>Nothing matches your current search and filter combination.</h3>
        </div>
      `;
      return;
    }

    if (ui.directoryOverviewGrid) {
      ui.directoryOverviewGrid.innerHTML = `
        <section class="directory-overview-panel">
          <div class="directory-overview-header">
            <div>
              <p class="kicker">Category Snapshot</p>
              <h3>Scroll through every active AI lane</h3>
            </div>
            <p class="directory-overview-summary">${directoryCountMarkup(items.length, visibleCategories.length, `active ${categoryLabel}`)}</p>
          </div>
          <div class="directory-overview-scroll" role="list">
            ${visibleCategories
              .map(({ category, items: categoryItems }) => {
                const topNames = categoryItems
                  .slice(0, 4)
                  .map((tool) => tool.name)
                  .join(" · ");
                const lead = categoryItems[0];
                return `
                  <button class="directory-overview-row" type="button" data-category="${category}" role="listitem">
                    <span class="directory-overview-row-main">
                      <span class="directory-overview-row-title">${category}</span>
                      <span class="directory-overview-row-copy">${topNames}</span>
                    </span>
                    <span class="directory-overview-row-count">${categoryItems.length} tools</span>
                    <span class="directory-overview-row-meta">${lead.trafficLabel} leader · ${lead.name}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      `;

      ui.directoryOverviewGrid.querySelectorAll("[data-category]").forEach((button) => {
        button.addEventListener("click", () => {
          state.activeCategory = button.dataset.category;
          renderAll();
          scrollToDirectoryCategory(button.dataset.category);
        });
      });
    }

    if (ui.directorySections) {
      ui.directorySections.innerHTML = visibleCategories
        .map(({ category, items: categoryItems }) => `
          <section class="directory-category-section" id="directory-section-${slugify(category)}" data-directory-category="${category}">
            <div class="section-header compact-header">
              <div class="section-header-copy">
                <p class="kicker">${category}</p>
                <h3>${category} picks</h3>
                <p class="section-lead">${categoryItems.length} tools currently match this lane.</p>
              </div>
            </div>
            <div class="directory-category-grid">
              ${categoryItems
                .map((tool) =>
                  toolCard(tool, {
                    className: "directory-item",
                    id: slugify(`${category}-${tool.name}`),
                    meta: tool.pricing,
                    summary: tool.summary,
                    summaryLength: 96
                  })
                )
                .join("")}
            </div>
          </section>
        `)
        .join("");
    }

    ui.directoryGrid.innerHTML = items
      .slice(0, 12)
      .map((tool) =>
        toolCard(tool, {
          className: "directory-item",
          id: slugify(tool.name),
          meta: tool.pricing,
          summary: tool.recommendation,
          summaryLength: 102
        })
      )
      .join("");
  }

  function bindSidebarWheelScroll() {
    if (!ui.sidebarNav) {
      return;
    }

    ui.sidebarNav.addEventListener(
      "wheel",
      (event) => {
        const maxScroll = ui.sidebarNav.scrollHeight - ui.sidebarNav.clientHeight;
        if (maxScroll <= 0) {
          return;
        }

        ui.sidebarNav.scrollTop += event.deltaY;
        event.preventDefault();
      },
      { passive: false }
    );
  }

  const TOOLTIP_VIEWPORT_MARGIN = 12;
  const TOOLTIP_BUBBLE_GAP = 10;
  const TOOLTIP_ARROW_EDGE_PADDING = 14;
  const TOOLTIP_BOUNDARY_PADDING = 10;
  let tooltipMeasure = null;

  function ensureTooltipMeasure() {
    if (tooltipMeasure && document.body.contains(tooltipMeasure)) {
      return tooltipMeasure;
    }

    tooltipMeasure = document.createElement("span");
    tooltipMeasure.className = "tool-summary tool-summary-measure";
    document.body.appendChild(tooltipMeasure);
    return tooltipMeasure;
  }

  function tooltipBoundaryRect(summary) {
      const scopedBoundary = summary.closest(".mini-item, .tool-tile, .rank-item, .directory-item, .lane-item, .usecase-tool, .deep-ranking-item, .stack-card, .stack-tool-chip");
    const panelBoundary = summary.closest(".feature-panel, .section-card");
    const boundary = scopedBoundary || panelBoundary;
    return boundary ? boundary.getBoundingClientRect() : null;
  }

  function tooltipMaxWidth(summary) {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    const boundaryRect = tooltipBoundaryRect(summary);
    const viewportMax = Math.max(0, Math.min(300, viewportWidth * 0.7));

    if (!boundaryRect) {
      return viewportMax;
    }

    const boundaryMax = Math.max(
      0,
      Math.min(
        viewportMax,
        boundaryRect.width - TOOLTIP_BOUNDARY_PADDING * 2
      )
    );

    return boundaryMax || viewportMax;
  }

  function measureTooltip(summary, maxWidth) {
    const measure = ensureTooltipMeasure();

    measure.textContent = summary.dataset.tip || "";
    measure.style.maxWidth = `${maxWidth}px`;

    const rect = measure.getBoundingClientRect();
    return {
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height)
    };
  }

  function applyTooltipDirection(summary) {
    if (!summary || !summary.dataset.tip) {
      return;
    }

    const rect = summary.getBoundingClientRect();
    const maxWidth = tooltipMaxWidth(summary);
    const tooltipRect = measureTooltip(summary, maxWidth);
    const boundaryRect = tooltipBoundaryRect(summary);
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

    const spaceAbove = rect.top - TOOLTIP_BUBBLE_GAP - TOOLTIP_VIEWPORT_MARGIN;
    const spaceBelow = viewportHeight - rect.bottom - TOOLTIP_BUBBLE_GAP - TOOLTIP_VIEWPORT_MARGIN;
    const fitsAbove = spaceAbove >= tooltipRect.height;
    const fitsBelow = spaceBelow >= tooltipRect.height;

    let direction = "up";
    if (!fitsAbove && fitsBelow) {
      direction = "down";
    } else if (!fitsBelow && fitsAbove) {
      direction = "up";
    } else if (!fitsAbove && !fitsBelow) {
      direction = spaceBelow > spaceAbove ? "down" : "up";
    } else {
      direction = spaceBelow > spaceAbove ? "down" : "up";
    }

    const minBoundaryLeft = boundaryRect ? boundaryRect.left + TOOLTIP_BOUNDARY_PADDING : TOOLTIP_VIEWPORT_MARGIN;
    const maxBoundaryRight = boundaryRect ? boundaryRect.right - TOOLTIP_BOUNDARY_PADDING : viewportWidth - TOOLTIP_VIEWPORT_MARGIN;
    const minLeft = Math.max(TOOLTIP_VIEWPORT_MARGIN, minBoundaryLeft);
    const maxLeft = Math.max(
      minLeft,
      Math.min(
        viewportWidth - TOOLTIP_VIEWPORT_MARGIN - tooltipRect.width,
        maxBoundaryRight - tooltipRect.width
      )
    );
    const desiredLeft = Math.min(Math.max(rect.left, minLeft), maxLeft);
    const offsetX = desiredLeft - rect.left;

    let horizontal = "center";
    if (offsetX > 1) {
      horizontal = "right";
    } else if (offsetX < -1) {
      horizontal = "left";
    }

    const anchorX = rect.width / 2 - offsetX;
    const arrowLeft = Math.min(
      Math.max(anchorX, TOOLTIP_ARROW_EDGE_PADDING),
      Math.max(TOOLTIP_ARROW_EDGE_PADDING, tooltipRect.width - TOOLTIP_ARROW_EDGE_PADDING)
    );

    summary.dataset.tipDirection = direction;
    summary.dataset.tipShift = horizontal;
    summary.style.setProperty("--tip-max-width", `${Math.round(maxWidth)}px`);
    summary.style.setProperty("--tip-offset-x", `${Math.round(offsetX)}px`);
    summary.style.setProperty("--tip-arrow-left", `${Math.round(arrowLeft)}px`);
  }

  function refreshTooltipDirections() {
    document.querySelectorAll(".tool-summary[data-tip]").forEach((summary) => {
      applyTooltipDirection(summary);
    });
  }

  function bindNavFlyouts() {
    const navItems = Array.from(document.querySelectorAll(".nav-item-with-panel"));
    if (!navItems.length) {
      return;
    }

    const openDelay = 70;
    const closeDelay = 220;

    navItems.forEach((item) => {
      let openTimer = null;
      let closeTimer = null;

      const clearTimers = () => {
        if (openTimer) {
          window.clearTimeout(openTimer);
          openTimer = null;
        }
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
      };

      const openMenu = () => {
        clearTimers();
        navItems.forEach((navItem) => {
          if (navItem !== item) {
            navItem.classList.remove("is-open");
          }
        });
        item.classList.add("is-open");
      };

      const closeMenu = () => {
        clearTimers();
        item.classList.remove("is-open");
      };

      const scheduleOpen = () => {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
        if (item.classList.contains("is-open")) {
          return;
        }
        openTimer = window.setTimeout(openMenu, openDelay);
      };

      const scheduleClose = () => {
        if (openTimer) {
          window.clearTimeout(openTimer);
          openTimer = null;
        }
        closeTimer = window.setTimeout(closeMenu, closeDelay);
      };

      item.addEventListener("pointerenter", scheduleOpen);
      item.addEventListener("pointerleave", scheduleClose);
      item.addEventListener("focusin", openMenu);
      item.addEventListener("focusout", () => {
        window.setTimeout(() => {
          if (!item.contains(document.activeElement)) {
            scheduleClose();
          }
        }, 0);
      });
    });

    document.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".nav-item-with-panel")) {
        return;
      }
      navItems.forEach((item) => item.classList.remove("is-open"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }
      navItems.forEach((item) => item.classList.remove("is-open"));
    });
  }

  function handleSearchSubmit() {
    if (!ui.searchInput) {
      return;
    }
    state.query = ui.searchInput.value;
    renderHotGrid();
    renderDirectory();
    const hotTools = document.getElementById("hot-tools");
    if (hotTools) {
      hotTools.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function bindStaticEvents() {
    bindSidebarWheelScroll();
    bindNavFlyouts();

    document.addEventListener("mouseenter", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      applyTooltipDirection(summary);
    }, true);

    document.addEventListener("focusin", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      applyTooltipDirection(summary);
    });

    window.addEventListener("resize", refreshTooltipDirections);
    window.addEventListener("scroll", refreshTooltipDirections, { passive: true });

    if (ui.searchInput) {
      ui.searchInput.addEventListener("input", function (event) {
        state.query = event.target.value;
        renderHotGrid();
        renderDirectory();
      });

      ui.searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          handleSearchSubmit();
        }
      });
    }

    if (ui.searchButton) {
      ui.searchButton.addEventListener("click", handleSearchSubmit);
    }

    if (ui.resetFilters) {
      ui.resetFilters.addEventListener("click", () => {
        state.query = "";
        state.activeCategory = "All";
        state.activePricing = "All";
        state.activeRanking = "Assistants";
        state.activeNewsCategory = "All";
        if (ui.searchInput) {
          ui.searchInput.value = "";
        }
        if (window.history && window.history.replaceState && /(^|\/)directory\.html$/i.test(window.location.pathname || "")) {
          window.history.replaceState({}, "", "directory.html#directory");
        }
        renderAll();
        document.getElementById("directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollTarget);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    document.addEventListener("click", (event) => {
      const newsCalendarLink = event.target.closest(".news-calendar-day.is-link");
      if (newsCalendarLink) {
        window.setTimeout(() => {
          renderNewsDateBrowser();
        }, 0);
      }

      const button = event.target.closest("[data-featured-more]");
      if (!button) {
        return;
      }
      increaseFeaturedVisibleCount(button.dataset.featuredMore);
      renderTodayBoards();
    });

    document.addEventListener("change", (event) => {
      const dropdown = event.target.closest(".news-calendar-dropdown");
      if (!dropdown) {
        return;
      }

      const monthSelect = document.querySelector('.news-calendar-dropdown[data-news-calendar="month"]');
      const yearSelect = document.querySelector('.news-calendar-dropdown[data-news-calendar="year"]');
      if (!monthSelect || !yearSelect) {
        return;
      }

      const selectedMonth = Number(monthSelect.value);
      const selectedYear = Number(yearSelect.value);
      const matchingGroup = newsFeed.find((group) => {
        const groupDate = new Date(`${group.date}T12:00:00`);
        return groupDate.getMonth() === selectedMonth && groupDate.getFullYear() === selectedYear;
      });

      if (matchingGroup) {
        window.location.hash = newsGroupAnchorId(matchingGroup);
      } else {
        renderNewsDateBrowser();
      }
    });

    window.addEventListener("hashchange", () => {
      renderNewsDateBrowser();
    });
  }

  function renderAll() {
    renderPromptNavFlyout();
    renderReleaseTicker();
    renderSidebar();
    renderNewsHub();
    renderHeroMetrics();
    renderHotFilters();
    renderHotGrid();
    renderTodayBoards();
    renderRankTabs();
    renderRankGrid();
    renderCategoryWall();
    renderLaneWall();
    renderUseCaseWall();
    renderDeepRankings();
    renderNewList();
    renderPromptLibrary();
    renderDirectoryFilters();
    renderDirectory();
    refreshTooltipDirections();
  }

  bindStaticEvents();
  renderAll();
})();
