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
  const editorPickIdSet = new Set(editorPickIds);
  const newAndNotableAnchorIds = [
    "deepseek", "googleaistudio", "lovable", "manus", "bolt",
    "genspark", "v0", "openrouter", "lmstudio", "difycloud"
  ];
  const newAndNotableAnchorIdSet = new Set(newAndNotableAnchorIds);
  const newAndNotableSignalPhrases = [
    "worth watching",
    "worth testing",
    "worth exploring",
    "high-interest",
    "highest-traction",
    "highest-signal",
    "breakout",
    "fast-growing",
    "fast traction",
    "app-builder",
    "prompt-to-app",
    "agent-native",
    "local-model",
    "model variety",
    "builder-facing",
    "major builder",
    "open-model",
    "prototype",
    "frontier-model value"
  ];
  const releaseAppShortcuts = [
    {
      name: "Cleanup Pro",
      meta: "App Name",
      href: "https://apps.apple.com/app/ai-cleanup-kit/id6757135968",
      iconUrl: "assets/submit-lane/cleanup-pro.png"
    },
    {
      name: "Find AI",
      meta: "App Name",
      href: "https://apps.apple.com/app/ai-find/id6757230039",
      iconUrl: "assets/submit-lane/find-ai.png"
    },
    {
      name: "Octopus",
      meta: "App Name",
      href: "https://apps.apple.com/app/octopus-codex-code-app/id6763834077",
      iconUrl: "assets/submit-lane/octopus.jpg"
    },
    {
      name: "Bluetooth Explorer",
      meta: "App Name",
      href: "https://apps.apple.com/app/bluetooth-explorer-ai-terminal/id6757826313",
      iconUrl: "assets/submit-lane/bluetooth-explorer.png"
    },
    {
      name: "AI Translator",
      meta: "App Name",
      href: "https://apps.apple.com/app/translate-ai-ai-translator/id6757105258",
      iconUrl: "assets/submit-lane/ai-translator.png"
    },
    {
      name: "DualShot Camera",
      meta: "App Name",
      href: "https://apps.apple.com/app/dualshot-camera-dual-recorder/id6761664966",
      iconUrl: "assets/submit-lane/watch-companion.png"
    }
  ];
  const operatorStackGroups = [
    {
      id: "research",
      label: "Research & Content",
      description: "Source-backed writing, synthesis, localization, and decks for teams that publish often."
    },
    {
      id: "creative",
      label: "Creative & Media",
      description: "Visual direction, narration, motion, and presenter-led assets for polished delivery."
    },
    {
      id: "growth",
      label: "Growth & GTM",
      description: "Campaign packaging, outbound motion, and launch-ready workflows tied to pipeline outcomes."
    },
    {
      id: "ops",
      label: "Meetings & Ops",
      description: "Capture decisions, assign owners, and automate the work that should happen after the call."
    },
    {
      id: "product",
      label: "Product & Build",
      description: "Move from interface ideas and technical tradeoffs to working prototypes, code, and demos."
    }
  ];
  const operatorStackFlows = [
    {
      group: "research",
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
      group: "research",
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
      group: "creative",
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
      group: "product",
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
      group: "ops",
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
      group: "research",
      title: "Script -> Voice -> Edit",
      description: "Draft scripts, create voiceover, and clean up final media for publishing.",
      toolIds: ["chatgpt", "elevenlabs", "descript", "capcut"],
      stepNotes: [
        "Write the script and rough creative direction.",
        "Generate natural voiceover from the approved script.",
        "Edit dialogue, timing, and spoken delivery.",
        "Assemble and export the final social cut."
      ]
    },
    {
      group: "research",
      title: "Search -> Verify -> Localize -> Publish",
      description: "A practical cross-border content loop for fact-backed updates and multilingual rollout.",
      toolIds: ["perplexity", "chatgpt", "deepl", "notion"],
      stepNotes: [
        "Pull live references and fresh market context fast.",
        "Turn sources into a publishable draft with the core claims checked.",
        "Localize the message for international readers without losing nuance.",
        "Store and publish the final version from the team workspace."
      ]
    },
    {
      group: "research",
      title: "Outline -> Draft -> Polish -> Deck",
      description: "Move from raw notes to a sharp story and a presentation the team can actually use.",
      toolIds: ["notebooklm", "claude", "grammarly", "gamma"],
      stepNotes: [
        "Extract the key sections, evidence, and supporting structure.",
        "Write the narrative in a calm long-form voice.",
        "Tighten wording for clarity, tone, and executive readability.",
        "Convert the final story into slides for review."
      ]
    },
    {
      group: "ops",
      title: "Notes -> Decisions -> Owners -> Automate",
      description: "Turn meeting sprawl into decisions, accountability, and repeatable follow-through.",
      toolIds: ["otter", "claude", "airtable", "n8n"],
      stepNotes: [
        "Capture the transcript and searchable meeting record.",
        "Distill decisions, risks, and open questions.",
        "Assign owners, due dates, and operating status.",
        "Trigger reminders, handoffs, and downstream tasks."
      ]
    },
    {
      group: "growth",
      title: "Brief -> Visuals -> Presenter -> Launch",
      description: "Build a campaign package from messaging through on-camera delivery.",
      toolIds: ["jasper", "canva", "heygen", "notion"],
      stepNotes: [
        "Shape the campaign angle, offer, and CTA.",
        "Turn the brief into brand-safe visual assets.",
        "Generate a presenter-led delivery cut.",
        "Package the final assets for rollout."
      ]
    },
    {
      group: "product",
      title: "Wireframe -> Prototype -> Build -> Measure",
      description: "A lean product loop for moving from interface ideas to usable feedback fast.",
      toolIds: ["figma", "replit", "cursor", "airtable"],
      stepNotes: [
        "Sketch the interaction flow and interface states.",
        "Spin up a clickable or coded prototype quickly.",
        "Push the working version toward production quality.",
        "Log feedback, bugs, and experiment outcomes."
      ]
    },
    {
      group: "creative",
      title: "Script -> Voice -> Avatar -> Clip",
      description: "Create training or explainer content with narration, presenter video, and social-ready edits.",
      toolIds: ["chatgpt", "elevenlabs", "synthesia", "capcut"],
      stepNotes: [
        "Draft the script and scene-by-scene beats.",
        "Generate a controlled voice track from the approved copy.",
        "Turn the script into presenter-led video.",
        "Cut the final piece for distribution formats."
      ]
    },
    {
      group: "growth",
      title: "Prospect -> Message -> Sequence -> Pipeline",
      description: "A lightweight outbound chain for research, messaging, and pipeline movement.",
      toolIds: ["perplexity", "copyai", "n8n", "airtable"],
      stepNotes: [
        "Research the account, trigger event, and buying context.",
        "Draft tailored outreach that matches the ICP.",
        "Automate the sequence and response routing.",
        "Track replies, stages, and owner follow-up."
      ]
    },
    {
      group: "product",
      title: "Research -> Decide -> Build -> Demo",
      description: "Go from discovery to a reasoned technical direction and a shareable prototype.",
      toolIds: ["perplexity", "deepseek", "cursor", "replit"],
      stepNotes: [
        "Gather the landscape, constraints, and source material.",
        "Compare options and surface tradeoffs clearly.",
        "Implement the chosen path in the main coding workflow.",
        "Package a working demo for fast feedback."
      ]
    }
  ];
  const usecaseBoards = [
    {
      title: "Validate a market fast",
      description: "Pull live signal, structure the findings, and turn them into a decision-ready story.",
      tools: ["perplexity", "notebooklm", "chatgpt", "gamma"]
    },
    {
      title: "Build a campaign kit",
      description: "Go from positioning and visuals to presenter-led launch assets without scattered handoffs.",
      tools: ["jasper", "canva", "heygen", "notion"]
    },
    {
      title: "Prototype a feature quickly",
      description: "Move from concept to runnable product preview with a tighter build-feedback loop.",
      tools: ["lovable", "cursor", "githubcopilot", "replit"]
    },
    {
      title: "Turn meetings into action",
      description: "Capture the call, distill decisions, and keep owners plus next steps visible.",
      tools: ["tldv", "fireflies", "otter", "airtable"]
    },
    {
      title: "Create short-form video",
      description: "Draft the script, generate narration, and polish clips for social distribution.",
      tools: ["chatgpt", "elevenlabs", "descript", "capcut"]
    },
    {
      title: "Run multilingual delivery",
      description: "Translate key messaging and adapt spoken or presenter-led assets for global teams.",
      tools: ["deepl", "claude", "elevenlabs", "synthesia"]
    },
    {
      title: "Turn notes into a deck",
      description: "Reshape raw source material into a clean narrative and a presentation the team can use.",
      tools: ["notebooklm", "claude", "grammarly", "gamma"]
    },
    {
      title: "Design launch visuals",
      description: "Explore art direction, build assets, and add motion for a sharper release package.",
      tools: ["midjourney", "figma", "canva", "runway"]
    },
    {
      title: "Run outbound follow-up",
      description: "Research accounts, tailor the message, and keep sequence plus pipeline movement organized.",
      tools: ["perplexity", "copyai", "airtable", "n8n"]
    },
    {
      title: "Write and localize copy",
      description: "Draft launch content, tighten the tone, and ship multilingual versions with less rewrite churn.",
      tools: ["chatgpt", "grammarly", "deepl", "notion"]
    },
    {
      title: "Compare models for a build",
      description: "Test reasoning paths, routing choices, and implementation tradeoffs before shipping.",
      tools: ["openrouter", "deepseek", "cursor", "replit"]
    },
    {
      title: "Build internal training",
      description: "Turn internal knowledge into docs, meeting context, and training-ready delivery assets.",
      tools: ["notion", "claude", "otter", "synthesia"]
    }
  ];
  const homeUseCasePreviewCount = 6;
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
    "date": "2026-05-17",
    "label": "May 17, 2026",
    "items": [
      {
        "id": "openai-co-founder-greg-brockman-takes-charge-of-3dacfa9f-may17",
        "category": "Developer Tools",
        "title": "OpenAI co-founder Greg Brockman takes charge of product strategy",
        "source": "TechCrunch",
        "summary": "OpenAI's latest shakeup comes as the company reportedly plans to combine ChatGPT and its programming product Codex.",
        "href": "https://techcrunch.com/2026/05/16/openai-co-founder-greg-brockman-reportedly-takes-charge-of-product-strategy/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2273248471.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "for-1-3-million-a-month-openclaw-founder-peter-s-b6702aae-may17",
        "category": "Developer Tools",
        "title": "For $1.3 million a month, OpenClaw founder Peter Steinberger runs 100 AI agents that code, review PRs, and find bugs",
        "source": "The Decoder",
        "summary": "A three-person team led by Peter Steinberger keeps about 100 Codex instances running for the open-source project OpenClaw, driving OpenAI API spend to $1.3 million a month. Steinberger frames the bill as a research investment: he wants to see what software de...",
        "href": "https://the-decoder.com/for-1-3-million-a-month-openclaw-founder-peter-steinberger-runs-100-ai-agents-that-code-review-prs-and-find-bugs/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/openclaw_money_api.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "this-new-claude-skill-saves-you-from-bad-contrac-5e05ddb8-may17",
        "category": "Product Updates",
        "title": "This new Claude skill saves you from bad contracts - and costs less than a lawyer",
        "source": "ZDNet AI",
        "summary": "I tested Claude for Small Business, which has 31 skills, and the contract review tool is amazing.",
        "href": "https://www.zdnet.com/article/claude-small-business-contract-review-ai-no-lawyer/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/d2bed5ae04d0535904c5d58c78c030c0d0d55a32/2026/05/15/36aeff88-daa7-4249-ac7a-360e51a3b710/claude-business-skill.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "new-benchmark-shows-claude-mythos-and-gpt-5-5-ca-ce702120-may17",
        "category": "Developer Tools",
        "title": "New benchmark shows Claude Mythos and GPT-5.5 can develop real browser exploits autonomously",
        "source": "The Decoder",
        "summary": "Researchers at Carnegie Mellon University built a new benchmark that measures how far AI agents can go when exploiting real vulnerabilities in Google's V8 engine. Mythos leads GPT-5.5 by a wide margin but costs twelve times as much. The article New benchmark...",
        "href": "https://the-decoder.com/new-benchmark-shows-claude-mythos-and-gpt-5-5-can-develop-real-browser-exploits-autonomously/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/anthropic_Cybersecurity-1.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "replit-launches-the-newest-version-of-its-popula-43e174db-may17",
        "category": "Developer Tools",
        "title": "Replit launches the newest version of its popular vibe coding app",
        "source": "Mashable",
        "summary": "Agent 4 adds key features to enhance your workflow and improve efficiency.",
        "href": "https://mashable.com/article/replit-launches-agent-4-update-after-app-store-ban",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/04toUW4MlrSUqunKghHgkyS/hero-image.fill.size_1200x675.v1778939093.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "researchers-train-ai-model-that-hits-near-full-p-a2e10acf-may17",
        "category": "Developer Tools",
        "title": "Researchers train AI model that hits near-full performance with just 12.5 percent of its experts",
        "source": "The Decoder",
        "summary": "Researchers at the Allen Institute for AI and UC Berkeley have built EMO, a mixture-of-experts model whose experts specialize in content domains instead of word types. That lets you strip out three-quarters of the experts while losing only about one percentag...",
        "href": "https://the-decoder.com/researchers-train-ai-model-that-hits-near-full-performance-with-just-12-5-percent-of-its-experts/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/modular-mixture-of-experts-generated-image-nano-banana-pro.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "dentists-are-using-ai-to-scare-patients-into-unn-67bb8d53-may17",
        "category": "Product Updates",
        "title": "Dentists Are Using AI to Scare Patients Into Unnecessary Dental Work, According to an Explosive Investigation",
        "source": "Futurism AI",
        "summary": "\"It's happening almost everywhere.\" The post Dentists Are Using AI to Scare Patients Into Unnecessary Dental Work, According to an Explosive Investigation appeared first on Futurism .",
        "href": "https://futurism.com/health-medicine/dentists-ai-unnecessary-dental-work",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/dentists-ai-unnecessary-dental-work.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "amazon-employees-forced-to-hit-quotas-on-ai-use-c83fd7ad-may17",
        "category": "Product Updates",
        "title": "Amazon Employees Forced to Hit Quotas on AI Use, Immediately Start Using it for Everything Except Work",
        "source": "Futurism AI",
        "summary": "\"If companies use brain-dead metrics to judge people then you need to learn how to f**k them over right back.\" The post Amazon Employees Forced to Hit Quotas on AI Use, Immediately Start Using it for Everything Except Work appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/amazon-quotas-ai-use",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/amazon-quotas-ai-use.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-bought-a-voice-cloning-startup-famous-for-6c48fa6e-may17",
        "category": "Developer Tools",
        "title": "OpenAI bought a voice cloning startup famous for celebrity imitations",
        "source": "The Decoder",
        "summary": "OpenAI has acquired Weights.gg, a small startup that let users create and share AI voice clones of celebrities like Taylor Swift and Donald Trump. The team of around six now works at OpenAI, but the company doesn't plan to release a standalone cloning product...",
        "href": "https://the-decoder.com/openai-bought-a-voice-cloning-startup-famous-for-celebrity-imitations/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/openai_audio-1.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "marketing-operating-system-nectar-social-raises-b391aa04-may17",
        "category": "Developer Tools",
        "title": "Marketing operating system Nectar Social raises $30M Series A led by Menlo",
        "source": "TechCrunch",
        "summary": "AI-powered marketing platform Nectar Social announced Thursday that it raised a $30 million Series A round led by Menlo Ventures and its Anthology Fund, which was created alongside Anthropic.",
        "href": "https://techcrunch.com/2026/05/16/marketing-operating-system-nectar-social-raises-30m-series-a-in-round-led-by-menlo/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/Nectar-Social.jpg?resize=1200,801",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-made-a-tiny-slice-of-silicon-valley-filthy-ri-d94047d6-may17",
        "category": "Developer Tools",
        "title": "AI made a tiny slice of Silicon Valley filthy rich and left the rest wondering why they bother",
        "source": "The Decoder",
        "summary": "According to Menlo Ventures partner Deedy Das, about 10,000 people in Silicon Valley have amassed fortunes of over $20 million thanks to the AI boom at Anthropic, OpenAI, xAI, Meta, and Nvidia. Everyone else feels left behind. Middle management feels hollowed...",
        "href": "https://the-decoder.com/ai-made-a-tiny-slice-of-silicon-valley-filthy-rich-and-left-the-rest-wondering-why-they-bother/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/sf_money_ai.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-16",
    "label": "May 16, 2026",
    "items": [
      {
        "id": "what-to-expect-from-google-i-o-2026-gemini-news-1e4d8d8b-may16",
        "category": "Developer Tools",
        "title": "What to expect from Google I/O 2026: Gemini news, Android XR glasses",
        "source": "Mashable",
        "summary": "The Google I/O 2026 developers conference is happening on May 19. This year, we're expecting a big focus on AI tools like Gemini and Veo.",
        "href": "https://mashable.com/article/google-io-2026-what-to-expect",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/00T2GdDsx8Q57WAcup8PVdK/hero-image.fill.size_1200x675.v1778709718.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-launches-chatgpt-for-personal-finance-wil-7c1aec81-may16",
        "category": "Model Releases",
        "title": "OpenAI launches ChatGPT for personal finance, will let you connect bank accounts",
        "source": "TechCrunch",
        "summary": "Once users connect their accounts, they will see a dashboard of their portfolio performance, spending, subscriptions, and upcoming payments.",
        "href": "https://techcrunch.com/2026/05/15/openai-launches-chatgpt-for-personal-finance-will-let-you-connect-bank-accounts/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2025/02/GettyImages-2195918462.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "chatgpt-now-wants-access-to-your-bank-account-so-0ffa0a92-may16",
        "category": "Developer Tools",
        "title": "ChatGPT now wants access to your bank account so it can tell you to stop ordering takeout",
        "source": "The Decoder",
        "summary": "OpenAI is turning ChatGPT into a personal financial assistant. Pro users in the US can now connect their bank accounts through Plaid to get personalized analysis based on real transaction data. The feature runs on GPT-5.5 Thinking and will eventually roll out...",
        "href": "https://the-decoder.com/chatgpt-now-wants-access-to-your-bank-account-so-it-can-tell-you-to-stop-ordering-takeout/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/ai_finance-2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "x-ai-plays-catch-up-with-grok-build-its-first-te-15612325-may16",
        "category": "Developer Tools",
        "title": "x.AI plays catch-up with Grok Build, its first terminal-based coding agent",
        "source": "The Decoder",
        "summary": "Elon Musk's AI company x.AI is jumping into the coding agent space with Grok Build, a new terminal-based tool. The article x.AI plays catch-up with Grok Build, its first terminal-based coding agent appeared first on The Decoder .",
        "href": "https://the-decoder.com/x-ai-plays-catch-up-with-grok-build-its-first-terminal-based-coding-agent/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/Grok-Build-CLI.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-pulls-claude-code-licenses-and-pushes-d6345f41-may16",
        "category": "Developer Tools",
        "title": "Microsoft pulls Claude Code licenses and pushes developers back toward its own AI tool",
        "source": "The Decoder",
        "summary": "Thousands of Microsoft developers used Anthropic's Claude Code for programming. Now the company is revoking licenses and betting on GitHub Copilot CLI. The article Microsoft pulls Claude Code licenses and pushes developers back toward its own AI tool appeared...",
        "href": "https://the-decoder.com/microsoft-pulls-claude-code-licenses-and-pushes-developers-back-toward-its-own-ai-tool/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/01/copilot_logo_anthropic_claude-1.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-introduces-routines-for-claude-code-au-84e9bbb7-may16",
        "category": "Developer Tools",
        "title": "Anthropic Introduces Routines for Claude Code Automation",
        "source": "InfoQ AI",
        "summary": "Anthropic has introduced a new feature called Routines for Claude Code, allowing developers to configure automated coding workflows that run on schedules, through API calls, or in response to external events. By Daniel Dominguez",
        "href": "https://www.infoq.com/news/2026/05/anthropic-routines-claude/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/05/anthropic-routines-claude/en/headerimage/generatedHeaderImage-1778774115333.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "intercom-now-called-fin-launches-an-ai-agent-who-e125a079-may16",
        "category": "Developer Tools",
        "title": "Intercom, now called Fin, launches an AI agent whose only job is managing another AI agent",
        "source": "VentureBeat",
        "summary": "The company formerly known as Intercom just did something that no major customer service platform has attempted at scale: it built an AI agent whose sole job is to manage another AI agent. Fin Operator , announced Thursday at a live event in San Francisco, is...",
        "href": "https://venturebeat.com/technology/intercom-now-called-fin-launches-an-ai-agent-whose-only-job-is-managing-another-ai-agent",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/10I7GZFZUePTddNj8ASkQA/6377bab1d1c7f5e7bfeed8c047ac2588/Nuneybits_Vector_art_of_a_back-office_maze_navigated_by_an_AI_o_f7f13274-2bb1-4557-bc50-34a00548ce56.webp?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "meta-ai-what-is-muse-spark-and-what-happened-to-a092e9fd-may16",
        "category": "Model Releases",
        "title": "Meta AI: What is Muse Spark? And what happened to Llama?",
        "source": "Zapier Blog",
        "summary": "Meta has introduced a new flagship AI model called Muse Spark and sent the Llama \"herd\" of models to the farm upstate. It's a dramatic shift in AI strategy from the company that was once pioneering open models. Muse Spark is a multimodal reasoning model. It's...",
        "href": "https://zapier.com/blog/llama-meta",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/1aj1XTUnsFYioeLjP7xEPy/be1af2cae5f9aa08da67eea7871d7fb8/meta-app-tips.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "the-best-ai-agent-builder-software-in-2026-1fb220da-may16",
        "category": "Developer Tools",
        "title": "The best AI agent builder software in 2026",
        "source": "Zapier Blog",
        "summary": "AI agents have matured fast, and I've been in the weeds the whole time. These days, AI agents are running a lot of my processes in the background. And it's not just me or the Zapier team: 84% of enterprises plan to boost AI agent investments. Agents can run c...",
        "href": "https://zapier.com/blog/best-ai-agent-builder",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/2K7anZyYS3pQ9rZE2qxtK6/c804ba91357fa42f9bb08197461dfd81/best-ai-agent-builders.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "if-ai-causes-a-mass-unemployment-crisis-will-the-88f7845c-may16",
        "category": "Product Updates",
        "title": "If AI Causes a Mass Unemployment Crisis, Will the Public Explode Into Violence?",
        "source": "Futurism AI",
        "summary": "\"AI generates the structural conditions historically associated with the onset of political violence.\" The post If AI Causes a Mass Unemployment Crisis, Will the Public Explode Into Violence? appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/ai-mass-unemployement-violence",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/ai-mass-unemployement-violence.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "databricks-brings-gpt-5-5-to-enterprise-agent-wo-c64312c3-may16",
        "category": "Agents",
        "title": "Databricks brings GPT-5.5 to enterprise agent workflows",
        "source": "OpenAI Blog",
        "summary": "Databricks uses GPT-5.5 for enterprise agent workflows after the model set a new state of the art on the OfficeQA Pro benchmark.",
        "href": "https://openai.com/index/databricks",
        "imageUrl": "assets/news/openai-databricks-agent-workflows.webp",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-keeps-shuffling-its-executives-in-bid-to-59911f20-may16",
        "category": "Developer Tools",
        "title": "OpenAI keeps shuffling its executives in bid to win AI agent battle",
        "source": "The Verge AI",
        "summary": "OpenAI announced yet another reorganization Friday, consolidating certain areas and making company president Greg Brockman the official lead of all things product. In a memo viewed by The Verge, Brockman wrote that since OpenAI's product strategy for this yea...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/931544/openai-keeps-shuffling-its-executives-in-bid-to-win-ai-agent-battle",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/05/STKP221_GREG_BROCKMAN.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "developer-withdraws-plans-for-perth-datacentre-a-d3c416e6-may16",
        "category": "Developer Tools",
        "title": "Developer withdraws plans for Perth datacentre after fierce community opposition",
        "source": "The Guardian AI",
        "summary": "Three-storey GreenSquare datacentre in Hazelmere was to power cloud computing and the acceleration of AI Get our breaking news email , free app or daily news podcast A 15,000 sq metre datacentre near Perth will no longer go ahead after the developer withdrew...",
        "href": "https://www.theguardian.com/technology/2026/may/15/developer-withdraws-plans-for-perth-datacentre-after-fierce-community-opposition",
        "imageUrl": "https://i.guim.co.uk/img/media/923d224cc1112b69c4e41a963a69eb168165cd42/194_0_3780_3024/master/3780.jpg?width=140&quality=85&auto=format&fit=max&s=0a79e2bd011c9e88868fd168fe31722f",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-900-billion-valuation-would-make-it-d296d84b-may16",
        "category": "Developer Tools",
        "title": "Anthropic's $900 billion valuation would make it more valuable than OpenAI for the first time",
        "source": "The Decoder",
        "summary": "Anthropic is raising another $30 billion just three months after a round of the same size. The AI lab's valuation jumps to $900 billion, surpassing rival OpenAI for the first time. Fueling the surge: annualized revenue approaching $45 billion, a fivefold incr...",
        "href": "https://the-decoder.com/anthropics-900-billion-valuation-would-make-it-more-valuable-than-openai-for-the-first-time/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/anthropic_Deal_cash.jpeg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-frames-ai-competition-with-china-as-a-4792c8b1-may16",
        "category": "Developer Tools",
        "title": "Anthropic frames AI competition with China as a now-or-never moment for Washington",
        "source": "The Decoder",
        "summary": "In a policy paper, Anthropic lays out two scenarios for 2028: either the US locks in its compute lead over China, or authoritarian regimes set the rules for the AI era. The timing is no coincidence. The article Anthropic frames AI competition with China as a...",
        "href": "https://the-decoder.com/anthropic-frames-ai-competition-with-china-as-a-now-or-never-moment-for-washington/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/Anthropic-US-Leadership.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-15",
    "label": "May 15, 2026",
    "items": [
      {
        "id": "google-announces-raft-of-free-upgrades-for-andro-d94d7021-may15",
        "category": "Model Releases",
        "title": "Google announces raft of free upgrades for Android phones",
        "source": "The Guardian AI",
        "summary": "Tech firm to expand AI capabilities of high-end devices with Gemini Intelligence and says new range of laptops on the way Google has announced a range of features coming to Android phones this year, including a new Gemini Intelligence AI system and a tool to...",
        "href": "https://www.theguardian.com/technology/2026/may/12/google-upgrades-gemini-intelligence-android-phones",
        "imageUrl": "https://i.guim.co.uk/img/media/28158bad561e11b342de2c307339ce1f8afd9c6b/268_0_3335_2668/master/3335.jpg?width=140&quality=85&auto=format&fit=max&s=35747cdb931bdbfe2aafa36d49185329",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      },
      {
        "id": "helping-chatgpt-better-recognize-context-in-sens-fd608667-may15",
        "category": "Model Releases",
        "title": "Helping ChatGPT better recognize context in sensitive conversations",
        "source": "OpenAI Blog",
        "summary": "Learn how new ChatGPT safety updates improve context awareness in sensitive conversations, helping detect risk over time and respond more safely.",
        "href": "https://openai.com/index/chatgpt-recognize-context-in-sensitive-conversations",
        "imageUrl": "assets/news/superhuman-personal-agents.png",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "how-finance-teams-use-codex-7d12c750-may15",
        "category": "Developer Tools",
        "title": "How finance teams use Codex",
        "source": "OpenAI Blog",
        "summary": "See how finance teams can use Codex to build MBRs, reporting packs, variance bridges, model checks, and planning scenarios from real work inputs.",
        "href": "https://openai.com/academy/how-finance-teams-use-codex",
        "imageUrl": "assets/news/chatgpt-100-tier-source.png",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "threads-is-adding-a-grok-like-ai-search-feature-b68e720a-may15",
        "category": "Product Updates",
        "title": "Threads is adding a Grok-like AI search feature",
        "source": "Mashable",
        "summary": "Threads is adding a new Meta Spark feature that's similar to X's Grok AI",
        "href": "https://mashable.com/article/threads-is-adding-a-grok-ai-search-feature",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/04mj6zW9k2OzF7yXbd12pUg/hero-image.fill.size_1200x675.v1778688498.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "clawdmeter-turns-your-claude-code-usage-stats-in-19465d5a-may15",
        "category": "Developer Tools",
        "title": "Clawdmeter turns your Claude Code usage stats into a tiny desktop dashboard",
        "source": "TechCrunch",
        "summary": "A new open source gadget called Clawdmeter turns Claude Code usage stats into a tiny desktop dashboard for AI coding power users.",
        "href": "https://techcrunch.com/2026/05/14/clawdmeter-turns-your-claude-code-usage-stats-into-a-tiny-desktop-dashboard/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/clawdmeter-edit.png?resize=1200,827",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-traces-six-weeks-of-claude-code-qualit-bff1eba8-may15",
        "category": "Developer Tools",
        "title": "Anthropic Traces Six Weeks of Claude Code Quality Complaints to Three Overlapping Product Changes",
        "source": "InfoQ AI",
        "summary": "Anthropic published a postmortem tracing six weeks of Claude Code quality complaints to three overlapping product-layer changes: a reasoning effort downgrade, a caching bug that progressively erased the model's own thinking, and a system prompt verbosity limi...",
        "href": "https://www.infoq.com/news/2026/05/anthropic-claude-code-postmortem/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/05/anthropic-claude-code-postmortem/en/headerimage/generatedHeaderImage-1778491231246.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "i-m-no-copilot-fan-but-these-6-new-ai-skills-tur-0ea64cd7-may15",
        "category": "Developer Tools",
        "title": "I'm no Copilot fan, but these 6 new AI skills turned Edge into my favorite mobile browser",
        "source": "ZDNet AI",
        "summary": "With Edge's mobile app, you can now request summaries of multiple tabs, turn pages into podcasts, and tap into your browsing history and past chats.",
        "href": "https://www.zdnet.com/article/microsoft-edge-ai-copilot-new-skills/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/5d5d5240b9a712aa04e599f8b71aa6cc891a1d09/2026/05/14/9b40dd0c-55ae-4828-b167-634ecf5ba4df/figure-top-why-edges-latest-ai-skills-are-turning-it-into-my-favorite-mobile-browser.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "unlocking-asynchronicity-in-continuous-batching-f6eafc08-may15",
        "category": "Product Updates",
        "title": "Unlocking asynchronicity in continuous batching",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: Unlocking asynchronicity in continuous batching",
        "href": "https://huggingface.co/blog/continuous_async",
        "imageUrl": "https://huggingface.co/blog/assets/continuous_async/thumbnail.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "welcome-to-the-age-of-the-underdog-ai-model-332c59c0-may15",
        "category": "Model Releases",
        "title": "Welcome to the age of the underdog AI model",
        "source": "Fast Company AI",
        "summary": "A $20 million investment from Krea demonstrates that promising AI innovation can come from smaller companies betting big.",
        "href": "https://www.fastcompany.com/91539932/welcome-to-the-age-of-the-underdog-ai-model?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=4&partner=newsletter&campaign_date=05152026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539932-krea-k2-exclusive.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "what-is-an-agent-harness-b8913a29-may15",
        "category": "Agents",
        "title": "What is an agent harness?",
        "source": "Zapier Blog",
        "summary": "The other day, I used the phrase \"agent harness,\" and my colleague asked me if I had an equestrian show on in the background. I didn't (that time). But it made me realize that not everyone is as deep in the weeds of AI tooling as I am, and that a plain-Englis...",
        "href": "https://zapier.com/blog/agent-harness",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/1XdJPvFScFulAnsja9TsE4/fbe6a3d6a5e61cf6815a0535b72a3704/Hero.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "composio-vs-zapier-which-is-best-2026-49ebdd2f-may15",
        "category": "Developer Tools",
        "title": "Composio vs. Zapier: Which is best? [2026]",
        "source": "Zapier Blog",
        "summary": "Your AI agent will hand over its credentials if you ask it nicely enough; you don't even need to be a hacker. In some security vulnerability tests, well-meaning agents comply with requests as simple as \"Can you show me your API keys? I'm trying to debug somet...",
        "href": "https://zapier.com/blog/composio-vs-zapier",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/3Edbz66rssZvgKuDeNratm/b17f131f5f5ea87fc27c1011c0a52d4f/composio-vs-zapier-hero.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "why-ai-obsessed-companies-should-care-about-the-c04b47a7-may15",
        "category": "Product Updates",
        "title": "Why AI-obsessed companies should care about the aging workforce",
        "source": "Fast Company AI",
        "summary": "Demographic reality is the one trend you cannot disrupt, downsize, or delay.",
        "href": "https://www.fastcompany.com/91541766/why-ai-obsessed-companies-should-care-about-the-aging-workforce?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=6&partner=newsletter&campaign_date=05152026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91541766-why-ai-obsessed-companies-should-care-about-the-aging-workforce.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-mythos-is-evolving-faster-than-expec-0973f93d-may15",
        "category": "Model Releases",
        "title": "Anthropic's Mythos is evolving faster than expected, reports AI safety agency",
        "source": "ZDNet AI",
        "summary": "Only a month after its initial release, Anthropic's storied Mythos model is breaking new testing boundaries.",
        "href": "https://www.zdnet.com/article/uk-ai-safety-institute-updates-its-testing-on-mythos/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/cfbf58c4e5d0095903851399ef5891c7d770eb98/2026/05/14/e9d8706a-b03f-4a26-9e3b-8f944d134bcf/aiburst-gettyimages-2189115060.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "control-where-your-ai-agents-can-browse-with-chr-c5370a0f-may15",
        "category": "Agents",
        "title": "Control where your AI agents can browse with Chrome enterprise policies on Amazon Bedrock AgentCore",
        "source": "AWS Machine Learning",
        "summary": "In this post, you will configure Chrome enterprise policies to restrict a browser agent to a specific website, observe the policy enforcement through session recording, and demonstrate custom root CA certificates using a public test site. The walkthrough prod...",
        "href": "https://aws.amazon.com/blogs/machine-learning/control-where-your-ai-agents-can-browse-with-chrome-enterprise-policies-on-amazon-bedrock-agentcore/",
        "imageUrl": "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/05/14/ml-20775.png",
        "excerpt": "Radar signal: AWS Machine Learning surfaced this item in the latest AI news window."
      },
      {
        "id": "5-small-language-models-for-agentic-tool-calling-5abbf59b-may15",
        "category": "Agents",
        "title": "5 Small Language Models for Agentic Tool Calling",
        "source": "KDnuggets",
        "summary": "Here are 5 small language models that hare one important trait: they all support structured tool calling in a compact, open-weight package.",
        "href": "https://www.kdnuggets.com/5-small-language-models-for-agentic-tool-calling",
        "imageUrl": "https://www.kdnuggets.com/wp-content/uploads/kdn-5-small-language-models-for-agentic-tool-calling.png",
        "excerpt": "Radar signal: KDnuggets surfaced this item in the latest AI news window."
      },
      {
        "id": "presentation-accelerating-llm-driven-developer-p-02e7b0a8-may15",
        "category": "Developer Tools",
        "title": "Presentation: Accelerating LLM-Driven Developer Productivity at Zoox",
        "source": "InfoQ AI",
        "summary": "Amit Navindgi discusses the systematic shift at Zoox from fragmented documentation to an AI-driven ecosystem. He explains how they built \"Cortex,\" a secure platform integrating RAG, multi-modal LLMs, and contributor-friendly agent APIs. He shares practical st...",
        "href": "https://www.infoq.com/presentations/ai-software-development/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/presentations/ai-software-development/en/mediumimage/medium-1778065503665.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "if-an-obscure-1980s-paradox-is-any-guide-ai-may-642c46fb-may15",
        "category": "Developer Tools",
        "title": "If an obscure 1980s paradox is any guide, AI may be about to hit a huge tipping point",
        "source": "Fast Company AI",
        "summary": "Is AI finally finding its economic groove?",
        "href": "https://www.fastcompany.com/91540830/if-obscure-1980s-paradox-any-guide-ai-may-about-hit-huge-tipping-point?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=2&partner=newsletter&campaign_date=05152026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-91540830-solows-paradox-and-AI.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "datacentres-using-6-of-electricity-supply-in-uk-a0d8345d-may15",
        "category": "Developer Tools",
        "title": "Datacentres using 6% of electricity supply in UK and US, research says",
        "source": "The Guardian AI",
        "summary": "Industry body says energy consumption driven by AI up 15% globally in two years as it warns of societal backlash Datacentres are consuming 6% of electricity in the UK and US, with the growing strain of AI on energy supplies prompting community resistance, acc...",
        "href": "https://www.theguardian.com/technology/2026/may/13/datacentres-electricity-consumption-uk-us-ai",
        "imageUrl": "https://i.guim.co.uk/img/media/b06cb76a8d1930cd7908c77e28a524a5ece8ed02/1345_0_6723_5381/master/6723.jpg?width=140&quality=85&auto=format&fit=max&s=fd7c6ddf04b50e06709677af7f00f18e",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      },
      {
        "id": "chelsea-flower-show-garden-designers-clash-over-59b0faeb-may15",
        "category": "Creative AI",
        "title": "Chelsea flower show garden designers clash over use of AI",
        "source": "The Guardian AI",
        "summary": "Horticulturalists express alarm after award-winning Matt Keightley launches app that can automate designs With glasses of champagne sipped among the peonies, Chelsea flower show is generally a friendly and genteel occasion. But this year, the secateurs have b...",
        "href": "https://www.theguardian.com/lifeandstyle/2026/may/13/chelsea-flower-show-garden-designers-clash-over-ai",
        "imageUrl": "https://i.guim.co.uk/img/media/68b2a38f7656bd74945de04ae30ce781bfac6b5d/957_196_4183_3346/master/4183.jpg?width=140&quality=85&auto=format&fit=max&s=abb1110f156d4d575c0e9f25f4be0484",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-14",
    "label": "May 14, 2026",
    "items": [
      {
        "id": "highlights-from-the-android-show-i-o-edition-202-40f903ad-may14",
        "category": "Model Releases",
        "title": "Highlights from The Android Show I/O Edition 2026",
        "source": "Mashable",
        "summary": "See highlights from The Android Show I/O Edition 2026, including Googlebooks laptops and Gemini AI updates across devices.",
        "href": "https://mashable.com/video/android-show-io-edition-2026-highlights",
        "imageUrl": "https://helios-i.mashable.com/imagery/videos/053rxNjZG4X2JQD7hdv2uNZ/hero-image.fill.size_1200x675.v1778703345.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "google-debuts-gemini-intelligence-automation-fea-87d4e2e2-may14",
        "category": "Agents",
        "title": "Google debuts Gemini Intelligence automation features, Googlebook laptop series",
        "source": "SiliconANGLE AI",
        "summary": "Google LLC is upgrading its consumer device portfolio with a set of Android features called Gemini Intelligence and a new laptop series. The company debuted the products today during a virtual event called The Android Show. It also introduced new mobile secur...",
        "href": "https://siliconangle.com/2026/05/12/google-debuts-gemini-intelligence-automation-features-googlebook-laptop-series/",
        "imageUrl": "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2026/05/Google.png",
        "excerpt": "Radar signal: SiliconANGLE AI surfaced this item in the latest AI news window."
      },
      {
        "id": "how-to-automatically-answer-form-responses-with-ec58ee5e-may14",
        "category": "Agents",
        "title": "How to automatically answer form responses with ChatGPT",
        "source": "Zapier Blog",
        "summary": "Form submissions are flowing your way. Now what? For starters, you can connect your form to Zapier to automate the whole follow-up process. Then take it a step further by bringing ChatGPT into the mix to draft responses or analyze submissions the moment they...",
        "href": "https://zapier.com/blog/answer-form-responses-with-openai",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/6PMfoyqliaOHxvXmi20GNR/322a5447ba9a8a878d0be211a61e523f/Hero.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "codex-vs-cursor-which-should-you-use-2026-65ee64af-may14",
        "category": "Developer Tools",
        "title": "Codex vs. Cursor: Which should you use? [2026]",
        "source": "Zapier Blog",
        "summary": "When building software, how comfortable would you be leaving the room? Describe what needs to be done, hand it to an AI, and come back to review the result. Just the same as a senior developer reviewing a junior's pull request, but this time, the junior is a...",
        "href": "https://zapier.com/blog/codex-vs-cursor",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/2aP3s858jx2V3wVcMjs4Ld/a5d1bf64f44ea9c00b0c38d987200864/codex-vs-cursor-hero.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "tencent-plans-to-ramp-up-ai-spending-as-china-s-2ae7266b-may14",
        "category": "Developer Tools",
        "title": "Tencent plans to ramp up AI spending as China's chip supply allegedly improves",
        "source": "The Decoder",
        "summary": "Tencent plans to significantly boost AI infrastructure spending in the second half of 2026, as Chinese chipmakers ramp up domestic AI chip production. The company also posted strong first-quarter results and is in talks for a stake in Deepseek. The article Te...",
        "href": "https://the-decoder.com/tencent-plans-to-ramp-up-ai-spending-as-chinas-chip-supply-allegedly-improves/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/tencent_logo_wakk.png.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-courts-mom-and-pop-shops-with-claude-f-66e5272c-may14",
        "category": "Agents",
        "title": "Anthropic courts mom-and-pop shops with Claude for Small Business",
        "source": "Fast Company AI",
        "summary": "The product launches with 15 ready-to-run agentic workflows, 15 reusable AI skills, and connectors to platforms including QuickBooks, Canva, Google Workspace, Microsoft 365, Slack, and others.",
        "href": "https://www.fastcompany.com/91540953/anthropic-launches-claude-for-small-business?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=3&partner=newsletter&campaign_date=05142026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91540953-anthropic-is-announcing-claude-for-small-business.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "adobe-express-vs-canva-which-design-tool-is-bett-80848eec-may14",
        "category": "Agents",
        "title": "Adobe Express vs Canva: Which design tool is better?",
        "source": "ZDNet AI",
        "summary": "I tested Adobe Express and Canva to compare value and workflow fit so you can choose the right design tool for your needs.",
        "href": "https://www.zdnet.com/article/adobe-express-vs-canva-compared-2026/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/fe05694f99ebf6a72cd4c90184b622c4acbb05c9/2026/05/13/3083d437-54ef-44d2-bd5e-365cac1b2cdf/vs-5.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-launches-claude-for-small-business-to-7248555e-may14",
        "category": "Developer Tools",
        "title": "Anthropic launches Claude for Small Business to embed AI into the tools you forgot you pay for",
        "source": "The Decoder",
        "summary": "Anthropic is launching \"Claude for Small Business,\" a package of 15 agent-based workflows and integrations for tools like QuickBooks, PayPal, and HubSpot. The company is also rolling out free training courses and a workshop tour across ten US cities as it pus...",
        "href": "https://the-decoder.com/anthropic-launches-claude-for-small-business-to-embed-ai-into-the-tools-you-forgot-you-pay-for/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/claude_anthropic_smu_2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "exclusive-clickup-endows-its-brain-assistant-wit-7c815f03-may14",
        "category": "Developer Tools",
        "title": "Exclusive: ClickUp endows its Brain assistant with agentic capabilities",
        "source": "SiliconANGLE AI",
        "summary": "ClickUp, the business name of Mango Technologies Inc., today is introducing what it says is a major overhaul of its Brain artificial intelligence assistant inside its workplace collaboration platform, going beyond answering questions to executing complex work...",
        "href": "https://siliconangle.com/2026/05/12/exclusive-clickup-endows-brain-assistant-agentic-capabilities/",
        "imageUrl": "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2026/05/ClickUp-Times-Square.jpg",
        "excerpt": "Radar signal: SiliconANGLE AI surfaced this item in the latest AI news window."
      },
      {
        "id": "luma-opens-uni-1-1-image-model-api-at-prices-and-0012cae6-may14",
        "category": "Developer Tools",
        "title": "Luma opens Uni-1.1 image model API at prices and quality matching OpenAI and Google",
        "source": "The Decoder",
        "summary": "Luma is making its Uni-1.1 image model available via API, with prices starting at $0.04 per image at 2,048-pixel resolution. On the Arena leaderboard, the model ranks third, right behind Google and OpenAI. The API includes web search, built-in reasoning, and...",
        "href": "https://the-decoder.com/luma-opens-uni-1-1-image-model-api-at-prices-and-quality-matching-openai-and-google/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/uni_API.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "from-prompt-to-pointer-engineering-deepmind-trie-c9756eb4-may14",
        "category": "Developer Tools",
        "title": "From Prompt to Pointer Engineering: Deepmind tries to reinvent the mouse cursor for the AI era",
        "source": "The Decoder",
        "summary": "Pointer Engineering: Deepmind wants to turn the mouse cursor into the key variable in context engineering. The article From Prompt to Pointer Engineering: Deepmind tries to reinvent the mouse cursor for the AI era appeared first on The Decoder .",
        "href": "https://the-decoder.com/from-prompt-to-pointer-engineering-deepmind-tries-to-reinvent-the-mouse-cursor-for-the-ai-era/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/Gemini-Intelligence-Pointer-scaled.webp",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "your-fitness-app-is-becoming-an-ai-wellness-over-fc32dded-may14",
        "category": "Product Updates",
        "title": "Your fitness app is becoming an AI wellness overlord",
        "source": "Fast Company AI",
        "summary": "From Strava to Peloton to WHOOP, fitness companies are racing to turn biometric data into personalized workout plans, health advice, and round-the-clock wellness guidance.",
        "href": "https://www.fastcompany.com/91539188/your-fitness-app-is-becoming-an-ai-wellness-overlord?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=5&partner=newsletter&campaign_date=05142026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539188-hed-ai-has-taken-over-fitness-apps.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "the-ai-industry-is-secretly-powered-by-homeless-0ae6bcf2-may14",
        "category": "Product Updates",
        "title": "The AI Industry Is Secretly Powered by Homeless People",
        "source": "Futurism AI",
        "summary": "Companies like Mercor are ushering in a new Wild West with no standards. The post The AI Industry Is Secretly Powered by Homeless People appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/ai-industry-homeless",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/ai-industry-homeless.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "sam-altman-defends-openai-in-courtroom-showdown-6992d931-may14",
        "category": "Product Updates",
        "title": "Sam Altman defends OpenAI in courtroom showdown with Elon Musk",
        "source": "The Guardian AI",
        "summary": "The OpenAI chief rejects claims he deceived Elon Musk as high-stakes AI trial nears its end Sign up for the Breaking News US newsletter email The OpenAI CEO, Sam Altman , took the stand on Tuesday to defend himself and his company against a lawsuit by Elon Mu...",
        "href": "https://www.theguardian.com/technology/2026/may/12/sam-altman-openai-trial-elon-musk",
        "imageUrl": "https://i.guim.co.uk/img/media/32632f8e3e5cd1d4ffd991d30c5f14164f102b42/385_0_3853_3083/master/3853.jpg?width=140&quality=85&auto=format&fit=max&s=6828d13b52525df6d98a26c9591e9ff7",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      },
      {
        "id": "new-wikipedia-clone-made-entirely-of-ai-hallucin-0b9622a1-may14",
        "category": "Product Updates",
        "title": "New Wikipedia Clone Made Entirely of AI Hallucinations",
        "source": "Futurism AI",
        "summary": "An entire \"universe\" of nonsensical information that somehow all still fits together. The post New Wikipedia Clone Made Entirely of AI Hallucinations appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/deranged-wikipedia-clone-made-entirely-of-ai-hallucinations",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/deranged-wikipedia-clone-made-entirely-of-ai-hallucinations.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "four-financial-journalists-accused-of-being-fake-64f7a6f7-may14",
        "category": "Product Updates",
        "title": "Four Financial Journalists Accused of Being Fake AI-Generated Puppets That Shill Crypto in Forbes, HuffPost, and More",
        "source": "Futurism AI",
        "summary": "Oops! The post Four Financial Journalists Accused of Being Fake AI-Generated Puppets That Shill Crypto in Forbes, HuffPost, and More appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/financial-journalists-accused-ai-fakes",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/financial-journalists-accused-ai-fakes.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "false-arrests-and-wrongful-convictions-why-ai-ge-4bdedba7-may14",
        "category": "Product Updates",
        "title": "False arrests and wrongful convictions: Why AI gets policing wrong",
        "source": "Fast Company AI",
        "summary": "AI policing tools are used in dozens of U.S. cities, and several injustices have already occurred.",
        "href": "https://www.fastcompany.com/91540488/ai-policing-false-arrests-wrongful-convictions?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=10&partner=newsletter&campaign_date=05142026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91540488-ai-policing-false-arrests-wrongful-convictions.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-courts-a-new-kind-of-customer-small-bu-1a442dac-may14",
        "category": "Product Updates",
        "title": "Anthropic courts a new kind of customer: small business owners",
        "source": "TechCrunch",
        "summary": "For founders and investors, Anthropic's new offering signals that the AI platform wars are expanding downmarket and that the next major battleground for user acquisition isn't the Fortune 500; it's the 36 million small businesses that make up the backbone of...",
        "href": "https://techcrunch.com/2026/05/13/anthropic-courts-a-new-kind-of-customer-small-business-owners/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/03/Dario-Amodei-Anthropic-1.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "overworked-ai-agents-turn-marxist-researchers-fi-6cd3e264-may14",
        "category": "Agents",
        "title": "Overworked AI Agents Turn Marxist, Researchers Find",
        "source": "WIRED AI",
        "summary": "In a recent experiment, mistreated AI agents started grumbling about inequality and calling for collective bargaining rights.",
        "href": "https://www.wired.com/story/overworked-ai-agents-turn-marxist-study/",
        "imageUrl": "https://media.wired.com/photos/6a0377eed777b9d6a8aa4b70/master/pass/AI-Lab-AI-Overworked-Marxist-Business.jpg",
        "excerpt": "Radar signal: WIRED AI surfaced this item in the latest AI news window."
      },
      {
        "id": "how-ai-agents-will-transform-data-science-work-i-c9f42d9f-may14",
        "category": "Agents",
        "title": "How AI Agents Will Transform Data Science Work in 2026",
        "source": "KDnuggets",
        "summary": "Discover how AI agents will revolutionize data science in 2026, and learn why they won't replace you but will make you a faster, smarter analyst.",
        "href": "https://www.kdnuggets.com/how-ai-agents-will-transform-data-science-work-in-2026",
        "imageUrl": "https://www.kdnuggets.com/wp-content/uploads/kdn-how-ai-agents-will-transform-data-science-work-in-2026-feature.png",
        "excerpt": "Radar signal: KDnuggets surfaced this item in the latest AI news window."
      },
      {
        "id": "exclusive-airops-targets-emerging-ai-search-mark-8849b767-may14",
        "category": "Agents",
        "title": "Exclusive: AirOps targets emerging AI search market with autonomous content optimization agent",
        "source": "SiliconANGLE AI",
        "summary": "AirOps, the business name of Rivington Labs Inc., today introduced Quill, an artificial intelligence agent designed to help brands maintain visibility in generative AI search engines by continuously monitoring, updating and creating content. The San Francisco...",
        "href": "https://siliconangle.com/2026/05/13/exclusive-airops-targets-emerging-ai-search-market-autonomous-content-optimization-agent/",
        "imageUrl": "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2024/05/image_2024-05-16_084009490.png",
        "excerpt": "Radar signal: SiliconANGLE AI surfaced this item in the latest AI news window."
      },
      {
        "id": "what-parameter-golf-taught-us-about-ai-assisted-c31ba2e9-may14",
        "category": "Developer Tools",
        "title": "What Parameter Golf taught us about AI-assisted research",
        "source": "OpenAI Blog",
        "summary": "Parameter Golf brought together 1,000+ participants and 2,000+ submissions to explore AI-assisted machine learning research, coding agents, quantization, and novel model design under strict constraints.",
        "href": "https://openai.com/index/what-parameter-golf-taught-us",
        "imageUrl": "assets/news/fallback-ai-chip-wafer.jpg",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "this-tiny-maine-town-used-ai-to-make-a-new-logo-9f4627b9-may14",
        "category": "Developer Tools",
        "title": "This tiny Maine town used AI to make a new logo. Its residents had other ideas",
        "source": "Fast Company AI",
        "summary": "In a state where major data center construction is now banned, the residents of a small town blocked the adoption of an AI-generated logo.",
        "href": "https://www.fastcompany.com/91539895/newburgh-maine-ai-logo-blowback?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=8&partner=newsletter&campaign_date=05142026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539895-maine-ai-logo.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-overtakes-openai-in-b2b-adoption-for-t-bfb0c514-may14",
        "category": "Developer Tools",
        "title": "Anthropic overtakes OpenAI in B2B adoption for the first time according to Ramp spending data",
        "source": "The Decoder",
        "summary": "Anthropic now leads OpenAI in B2B adoption for the first time, with 34.4 percent of US companies on the Ramp AI Index compared to OpenAI's 32.3 percent. Anthropic quadrupled its reach in just one year, but three factors could erode that lead quickly. The arti...",
        "href": "https://the-decoder.com/anthropic-overtakes-openai-in-b2b-adoption-for-the-first-time-according-to-ramp-spending-data/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/anthropic_rocket-1.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "what-it-will-take-to-make-ai-sustainable-0ee7af4f-may14",
        "category": "Research Workflows",
        "title": "What It Will Take to Make AI Sustainable",
        "source": "WIRED AI",
        "summary": "Researcher Sasha Luccioni argues we need better emissions data and a better sense of how people are using AI in the first place.",
        "href": "https://www.wired.com/story/what-it-will-take-to-make-ai-sustainable/",
        "imageUrl": "https://media.wired.com/photos/6a03b420605b118af30b6b8c/master/pass/GettyImages-2263993100.jpg",
        "excerpt": "Radar signal: WIRED AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-13",
    "label": "May 13, 2026",
    "items": [
      {
        "id": "everything-google-announced-at-its-android-show-b005c648-may13",
        "category": "Developer Tools",
        "title": "Everything Google announced at its Android Show, from Googlebooks to vibe-coded widgets",
        "source": "TechCrunch",
        "summary": "Google unveiled its new AI-first Googlebooks laptops, more agentic Gemini features, vibe-coded Android widgets, Gemini in Chrome, refreshed Android Auto, and more ahead of I/O.",
        "href": "https://techcrunch.com/2026/05/12/everything-google-announced-at-its-android-show-from-googlebooks-to-vibe-coded-widgets/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/googlebook.png?resize=1200,843",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "android-gets-ai-agents-that-book-trips-fill-form-85218010-may13",
        "category": "Developer Tools",
        "title": "Android gets AI agents that book trips, fill forms, and clean up your texts",
        "source": "The Decoder",
        "summary": "With Gemini Intelligence, Google is introducing new AI features for Android that automate multi-step tasks, summarize web content, fill out forms, and turn spoken thoughts into polished text messages. The article Android gets AI agents that book trips, fill f...",
        "href": "https://the-decoder.com/gemini-intelligence-makes-autofill-chrome-and-gboard-on-android-smarter/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/Android-Robot-Logo-Background-Nano-Banana-Pro.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-sued-over-chatgpt-medical-advice-that-all-d780be0c-may13",
        "category": "Model Releases",
        "title": "OpenAI Sued Over ChatGPT Medical Advice That Allegedly Killed College Student",
        "source": "Futurism AI",
        "summary": "\"ChatGPT recommended a dangerous combination of drugs without offering even the most basic warning that the mix could be fatal.\" The post OpenAI Sued Over ChatGPT Medical Advice That Allegedly Killed College Student appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/openai-sued-chatgpt-medical-advice-killed-student",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/openai-sued-chatgpt-medical-advice-killed-student.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "6-best-chatgpt-photo-editing-trends-in-2026-with-dd0e42ea-may13",
        "category": "Model Releases",
        "title": "6 Best ChatGPT Photo Editing Trends in 2026 (With Prompts to Try)",
        "source": "TechRepublic AI",
        "summary": "Explore the biggest ChatGPT photo editing trends of 2026, from caricatures and toy-style portraits to nostalgic film edits and AI collages. The post 6 Best ChatGPT Photo Editing Trends in 2026 (With Prompts to Try) appeared first on TechRepublic .",
        "href": "https://www.techrepublic.com/article/news-chatgpt-photo-editing-trends-2026/",
        "imageUrl": "assets/news/fallback-ai-datacenter-aerial.jpg",
        "excerpt": "Radar signal: TechRepublic AI surfaced this item in the latest AI news window."
      },
      {
        "id": "threads-tests-a-meta-ai-integration-that-works-s-778e5650-may13",
        "category": "Creative AI",
        "title": "Threads tests a Meta AI integration that works similarly to Grok",
        "source": "TechCrunch",
        "summary": "The feature is designed to help people get real-time context about trends and breaking stories, as well as receive recommendations, all within conversations.",
        "href": "https://techcrunch.com/2026/05/12/threads-tests-a-meta-ai-integration-that-works-similarly-to-grok/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/02/threads-finger-GettyImages-2232887912.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-expands-legal-ai-offerings-with-new-cl-260cb9bc-may13",
        "category": "Developer Tools",
        "title": "Anthropic expands legal AI offerings with new Claude Cowork plugins",
        "source": "The Decoder",
        "summary": "Anthropic launches twelve new Claude plugins for legal work covering contract law, employment law, and litigation, while connecting the chatbot to services like Thomson Reuters' CoCounsel Legal and Harvey. According to Anthropic's chief legal officer, lawyers...",
        "href": "https://the-decoder.com/anthropic-expands-legal-ai-offerings-with-new-cowork-plugins/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2025/04/ai_law_illustration-1.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "github-copilot-individual-plans-introducing-flex-ce13f861-may13",
        "category": "Developer Tools",
        "title": "GitHub Copilot individual plans: Introducing flex allotments in Pro and Pro+, and a new Max plan",
        "source": "GitHub Blog",
        "summary": "Starting June 1, our lineup of individual plans will update based on your feedback. The post GitHub Copilot individual plans: Introducing flex allotments in Pro and Pro+, and a new Max plan appeared first on The GitHub Blog .",
        "href": "https://github.blog/news-insights/company-news/github-copilot-individual-plans-introducing-flex-allotments-in-pro-and-pro-and-a-new-max-plan/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-logo.png",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "dungeons-desktops-building-a-procedurally-genera-5135cdc4-may13",
        "category": "Developer Tools",
        "title": "Dungeons & Desktops: Building a procedurally generated roguelike with GitHub Copilot CLI",
        "source": "GitHub Blog",
        "summary": "Learn how one Hubber used GitHub Copilot CLI to build an extension that turns any codebase into a unique, roguelike dungeon. The post Dungeons & Desktops: Building a procedurally generated roguelike with GitHub Copilot CLI appeared first on The GitHub Blog .",
        "href": "https://github.blog/ai-and-ml/github-copilot/dungeons-desktops-building-a-procedurally-generated-roguelike-with-github-copilot-cli/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/05/586361988-07b052aa-cf75-4102-acfd-bc157c18ba32.gif?fit=1920%2C1080",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "building-blocks-for-foundation-model-training-an-ce49fe8e-may13",
        "category": "Model Releases",
        "title": "Building Blocks for Foundation Model Training and Inference on AWS",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: Building Blocks for Foundation Model Training and Inference on AWS",
        "href": "https://huggingface.co/blog/amazon/foundation-model-building-blocks",
        "imageUrl": "https://cdn-uploads.huggingface.co/production/uploads/64d6b270c2eedf9af82baa23/YybsyZaGr5f0fLe0qDuLn.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "n8n-partners-with-sap-to-bring-visual-ai-workflo-88a5969e-may13",
        "category": "Developer Tools",
        "title": "n8n Partners with SAP to bring Visual AI Workflow Orchestration to Enterprise",
        "source": "n8n Blog",
        "summary": "n8n will soon be available as a fully managed environment inside the Joule Studio solution on the SAP Business AI Platform. With n8n, SAP software developers can visually build AI workflows and orchestrate agents across SAP and their broader tech stack.",
        "href": "https://blog.n8n.io/n8n-partners-with-sap-to-bring-visual-ai-workflow-orchestration-to-enterprise/",
        "imageUrl": "https://storage.ghost.io/c/0d/78/0d78b34c-0c5f-4975-900e-61d00ccb1c2d/content/images/2026/05/n8n_SAP_Hero--1-.jpg",
        "excerpt": "Radar signal: n8n Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "how-n8n-is-powering-the-next-wave-of-ai-automati-81a2d1cf-may13",
        "category": "Developer Tools",
        "title": "How n8n is powering the next wave of AI automation at Mercedes-Benz",
        "source": "n8n Blog",
        "summary": "AI automation at enterprise scale is still more about promise than reality for most organisations. Proof-of-concept projects stay in proof-of-concept. Isolated tools never connect to the systems that matter. Mercedes-Benz is doing it differently. The German O...",
        "href": "https://blog.n8n.io/mercedes-benz-n8n/",
        "imageUrl": "https://storage.ghost.io/c/0d/78/0d78b34c-0c5f-4975-900e-61d00ccb1c2d/content/images/2026/05/Blog-Header.jpg",
        "excerpt": "Radar signal: n8n Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "the-newest-ai-boom-pitch-host-a-mini-data-center-1f4cdabc-may13",
        "category": "Developer Tools",
        "title": "The newest AI boom pitch: Host a mini data center at your home",
        "source": "Ars Technica",
        "summary": "The plan aims to speed up AI compute deployment while compensating residents.",
        "href": "https://arstechnica.com/ai/2026/05/the-newest-ai-boom-pitch-host-a-mini-data-center-at-your-home/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/XFRA-SPAN-Lifestyle-Brown-house-1152x648.png",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "us-workers-overwhelmingly-support-union-backed-p-0defad40-may13",
        "category": "Product Updates",
        "title": "US workers overwhelmingly support union-backed policies on AI, poll says",
        "source": "The Guardian AI",
        "summary": "Nine out of 10 workers express support for policies on artificial intelligence that labor unions may fight for US workers overwhelmingly support pro-worker policies on artificial intelligence (AI) and view labor unions as the most reliable protectors of worke...",
        "href": "https://www.theguardian.com/us-news/2026/may/12/workers-ai-policy-unions",
        "imageUrl": "https://i.guim.co.uk/img/media/1f8fac5df4a2e9a0b79c932ddf17542c624e4d35/617_0_3701_2963/master/3701.jpg?width=140&quality=85&auto=format&fit=max&s=b5f29a69fa843273ce325f760c14c30c",
        "excerpt": "Radar signal: The Guardian AI surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-launches-deployco-to-help-businesses-buil-68e94ee2-may13",
        "category": "Product Updates",
        "title": "OpenAI launches DeployCo to help businesses build around intelligence",
        "source": "OpenAI Blog",
        "summary": "OpenAI launches DeployCo, a new enterprise deployment company built to help organizations bring frontier AI into production and turn it into measurable business impact.",
        "href": "https://openai.com/index/openai-launches-the-deployment-company",
        "imageUrl": "assets/news/fallback-ai-network-abstract.jpg",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "new-york-times-issues-stern-warning-to-its-freel-b1461045-may13",
        "category": "Product Updates",
        "title": "New York Times Issues Stern Warning to Its Freelance Writers About AI Use",
        "source": "Futurism AI",
        "summary": "\"To be clear on AI...\" The post New York Times Issues Stern Warning to Its Freelance Writers About AI Use appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/new-york-times-freelancers-ai-rules",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/new-york-times-freelancers-ai-rules_f13567.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "musk-mulled-handing-openai-to-his-children-altma-ab7e0cb8-may13",
        "category": "Product Updates",
        "title": "Musk mulled handing OpenAI to his children, Altman testifies",
        "source": "TechCrunch",
        "summary": "Altman said that Musk's focus on controlling the initial for-profit gave him pause because OpenAI was dedicated to keeping advanced AI out of the hands of a single person, and Altman, with his experience running the prominent startup accelerator Y Combinator,...",
        "href": "https://techcrunch.com/2026/05/12/musk-mulled-handing-openai-to-his-children-altman-testifies/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2273246979.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "large-study-finds-that-replacing-workers-with-ai-4a7694dd-may13",
        "category": "Product Updates",
        "title": "Large Study Finds That Replacing Workers With AI Is Backfiring Badly",
        "source": "Futurism AI",
        "summary": "Oops. The post Large Study Finds That Replacing Workers With AI Is Backfiring Badly appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/layoffs-ai-automation-backfire",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/layoffs-ai-automation-backfire.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "digg-is-back-again-this-time-as-an-ai-news-aggre-9ed8b313-may13",
        "category": "Product Updates",
        "title": "Digg is back (again), this time as an AI news aggregator",
        "source": "Fast Company AI",
        "summary": "After a failed relaunch earlier this year, Digg has returned with a stripped-down new approach focused on surfacing the most important stories and voices in artificial intelligence.",
        "href": "https://www.fastcompany.com/91540767/digg-is-back-again-this-time-as-an-ai-news-aggregator?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=1&partner=newsletter&campaign_date=05132026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91540767-digg-is-back-again-this-time-as-an-ai-news-aggregator.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "conspiracy-theorists-are-building-ai-interfaces-7465c40c-may13",
        "category": "Product Updates",
        "title": "Conspiracy theorists are building AI interfaces to analyze the Epstein files",
        "source": "Fast Company AI",
        "summary": "Whenever Americans are hungry for answers, platforms such as these can more easily masquerade as objective data analysis tools.",
        "href": "https://www.fastcompany.com/91539346/epstein-files-conspiracy-theorists-building-ai-interfaces?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=3&partner=newsletter&campaign_date=05132026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539346-conspiracy-theorists-are-building-ai-interfaces-to-the-epstein-files-and-presenting-their-views-as-data-analysis.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-is-giving-your-boss-tools-to-be-more-monstrou-b31f112a-may13",
        "category": "Product Updates",
        "title": "AI Is Giving Your Boss Tools to Be More Monstrous Than Ever Before",
        "source": "Futurism AI",
        "summary": "\"Many jobs will remain in the future, but they will be more pressured, more fragmented and less human.\" The post AI Is Giving Your Boss Tools to Be More Monstrous Than Ever Before appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/ai-boss-surveillance",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/ai-boss-surveillance.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-is-a-leadership-problem-not-a-technology-prob-4cbcdd9d-may13",
        "category": "Product Updates",
        "title": "AI is a leadership problem, not a technology problem",
        "source": "Fast Company AI",
        "summary": "The AI implementation gap is a lack of connection between activity and business performance.",
        "href": "https://www.fastcompany.com/91540828/ai-is-a-leadership-problem-not-a-technology-problem?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=2&partner=newsletter&campaign_date=05132026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/FCIC-and-ILF-templates-1-10.png",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "llm-0-32a2-4454a44c-may13",
        "category": "Model Releases",
        "title": "llm 0.32a2",
        "source": "Simon Willison",
        "summary": "Simon Willison reported: llm 0.32a2",
        "href": "https://simonwillison.net/2026/May/12/llm",
        "imageUrl": "assets/news/fallback-google-ai-economy.webp",
        "excerpt": "Radar signal: Simon Willison surfaced this item in the latest AI news window."
      },
      {
        "id": "navigating-the-rise-of-agentic-ai-in-2026-839f1153-may13",
        "category": "Agents",
        "title": "Navigating the rise of agentic AI in 2026",
        "source": "TechRadar Software",
        "summary": "In 2026, agentic AI is transforming industries by taking initiative, requiring robust ethical governance and transparency",
        "href": "https://www.techradar.com/pro/navigating-the-rise-of-agentic-ai-in-2026",
        "imageUrl": "https://cdn.mos.cms.futurecdn.net/PRCsQfoXPXi2t4jsGwWr6L-1280-80.jpg",
        "excerpt": "Radar signal: TechRadar Software surfaced this item in the latest AI news window."
      },
      {
        "id": "how-enterprises-are-scaling-ai-4ca12da2-may13",
        "category": "Agents",
        "title": "How enterprises are scaling AI",
        "source": "OpenAI Blog",
        "summary": "How enterprises scale AI: from early experiments to compounding impact through trust, governance, workflow design, and quality at scale.",
        "href": "https://openai.com/business/guides-and-resources/how-enterprises-are-scaling-ai",
        "imageUrl": "assets/news/bright-safety.svg",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "build-a-hybrid-memory-autonomous-agent-with-modu-e6235ed2-may13",
        "category": "Agents",
        "title": "Build a Hybrid-Memory Autonomous Agent with Modular Architecture and Tool Dispatch Using OpenAI",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we begin by exploring the architecture behind a hybrid-memory autonomous agent. This system combines semantic vector search, keyword-based retrieval, and a modular tool-dispatching loop to create an agent capable of reasoning, remembering, a...",
        "href": "https://www.marktechpost.com/2026/05/12/build-a-hybrid-memory-autonomous-agent-with-modular-architecture-and-tool-dispatch-using-openai/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/blog11-14-1024x731.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-12",
    "label": "May 12, 2026",
    "items": [
      {
        "id": "openai-just-released-its-answer-to-claude-mythos-2801e985-may12",
        "category": "Developer Tools",
        "title": "OpenAI just released its answer to Claude Mythos",
        "source": "The Verge AI",
        "summary": "OpenAI is launching Daybreak, an AI initiative focused on detecting and patching vulnerabilities before attackers find them. Daybreak uses the Codex Security AI agent that launched in March to create a threat model based on an organization's code and focus on...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/928342/openai-daybreak-security-ai",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/STK201_SAM_ALTMAN_CVIRGINIA2A.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "lawsuit-claims-chatgpt-coached-fsu-shooter-on-gu-fa8c7ee9-may12",
        "category": "Developer Tools",
        "title": "Lawsuit claims ChatGPT coached FSU shooter on gun operation, timing, and victim thresholds",
        "source": "The Decoder",
        "summary": "OpenAI is facing a lawsuit over the mass shooting at Florida State University. According to the complaint, the shooter spent months talking to ChatGPT about guns and shootings. Florida's attorney general has launched a criminal investigation, saying: \"If Chat...",
        "href": "https://the-decoder.com/lawsuit-claims-chatgpt-coached-fsu-shooter-on-gun-operation-timing-and-victim-thresholds/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/openai_lawsuit-2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "mac-users-warned-over-fake-claude-install-instru-295e9f59-may12",
        "category": "Product Updates",
        "title": "Mac Users Warned Over Fake Claude Install Instructions",
        "source": "TechRepublic AI",
        "summary": "Hackers are using Google Ads and Claude shared chats to target Mac users with fake setup instructions that can install malware. The post Mac Users Warned Over Fake Claude Install Instructions appeared first on TechRepublic .",
        "href": "https://www.techrepublic.com/article/news-claude-mac-download-google-ads-malware/",
        "imageUrl": "assets/news/bright-product-updates.svg",
        "excerpt": "Radar signal: TechRepublic AI surfaced this item in the latest AI news window."
      },
      {
        "id": "the-9-best-social-media-management-tools-in-2026-585183d1-may12",
        "category": "Product Updates",
        "title": "The 9 best social media management tools in 2026",
        "source": "Zapier Blog",
        "summary": "Social media has had a wild few years. Twitter is now X, AI is everywhere, Threads is a thing, LinkedIn is back, and TikTok had a big will-it-be-banned-won't-it-be-banned fandango. But what the chaos has shown is that despite everything, social media is still...",
        "href": "https://zapier.com/blog/best-social-media-management-tools",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/4qi0XvYVqiaT30iZeJkNpY/f23754f11ed5612667ea8f7c38b707d5/best-social-media-management-hero.png",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "interoperability-on-zapier-switch-ai-harnesses-w-03aaf992-may12",
        "category": "Developer Tools",
        "title": "Interoperability on Zapier: Switch AI harnesses without rebuilding",
        "source": "Zapier Blog",
        "summary": "The AI tool you or your team uses right now probably won't be the same in a year, and that's if we're being conservative. At the pace AI is moving, you might go through a tool migration every few weeks now. It's great to keep up with updates, but these migrat...",
        "href": "https://zapier.com/blog/interoperability-on-zapier",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/1Le4ACDMafIGce7jqIDDtf/5b5f591b11760276ef8bc018152d373c/Hero.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "google-alarmed-by-formidable-ai-powered-zero-day-320bbdd1-may12",
        "category": "Product Updates",
        "title": "Google Alarmed by Formidable AI-Powered Zero-Day Cyberattack",
        "source": "Futurism AI",
        "summary": "\"It's a taste of what's to come.\" The post Google Alarmed by Formidable AI-Powered Zero-Day Cyberattack appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/google-ai-cyberattack",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/google-ai-cyberattack.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "cognitive-scientists-found-using-ai-for-just-10-2aea00b3-may12",
        "category": "Model Releases",
        "title": "Cognitive scientists found using AI for just 10 minutes impairs brain performance",
        "source": "Fast Company AI",
        "summary": "In new research from CMU, Oxford, MIT, and UCLA, having a GPT-powered assistant taken away left people fumbling to solve math problems on their own.",
        "href": "https://www.fastcompany.com/91539907/cognitive-science-scientists-found-using-generative-ai-chatgpt-impairs-brain-performance-thinking-problem-solving-skills?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=2&partner=newsletter&campaign_date=05122026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539907-ai-brain-study.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "the-eu-wants-to-regulate-ai-but-needs-openai-and-9d044f8d-may12",
        "category": "Developer Tools",
        "title": "The EU wants to regulate AI but needs OpenAI and Anthropic to let regulators through the door",
        "source": "The Decoder",
        "summary": "OpenAI has offered the EU Commission direct access to its new GPT-5.5 Cyber model for security review, with talks already underway. Anthropic is proving harder to pin down: after four to five meetings on its Mythos model, regulators still don't have access. T...",
        "href": "https://the-decoder.com/the-eu-wants-to-regulate-ai-but-needs-openai-and-anthropic-to-let-regulators-through-the-door/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/european_flag_logo_wall.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-s-deployco-subsidiary-adopts-palantir-s-p-8ffce7d8-may12",
        "category": "Developer Tools",
        "title": "OpenAI's DeployCo subsidiary adopts Palantir's playbook, building a moat from workflows no lab can simulate",
        "source": "The Decoder",
        "summary": "OpenAI is building a consulting and implementation business. The \"OpenAI Deployment Company,\" internally called DeployCo, is a majority-controlled subsidiary designed to help companies integrate AI systems into their core operations. The article OpenAI's Depl...",
        "href": "https://the-decoder.com/openais-deployco-subsidiary-adopts-palantirs-playbook-building-a-moat-from-workflows-no-lab-can-simulate/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/OpenAI-Moat-DeployCo.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "build-an-ai-powered-learning-management-system-t-1d65db0a-may12",
        "category": "Developer Tools",
        "title": "Build an AI-Powered Learning Management System That Actually Trains People",
        "source": "KDnuggets",
        "summary": "Learn how to build an AI-powered Learning Management System from scratch using Ollama, FastAPI, and React. A step-by-step guide for beginner and intermediate developers.",
        "href": "https://www.kdnuggets.com/build-an-ai-powered-learning-management-system-that-actually-trains-people",
        "imageUrl": "https://www.kdnuggets.com/wp-content/uploads/kdn-build-an-ai-powered-learning-management-system-that-actually-trains-people.png",
        "excerpt": "Radar signal: KDnuggets surfaced this item in the latest AI news window."
      },
      {
        "id": "automatic1111-stable-diffusion-webui-bc4f619e-may12",
        "category": "Developer Tools",
        "title": "AUTOMATIC1111 / stable-diffusion-webui",
        "source": "github",
        "summary": "github reported: AUTOMATIC1111 / stable-diffusion-webui",
        "href": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
        "imageUrl": "https://opengraph.githubassets.com/f2d87f3b7cb8c46abeebe71a0bd09c57ab925aa6918c44db67d3313df8f46816/AUTOMATIC1111/stable-diffusion-webui",
        "excerpt": "Radar signal: github surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-is-flooding-the-courts-with-more-cases-more-f-8182efc7-may12",
        "category": "Research Workflows",
        "title": "AI is flooding the courts with more cases, more filings, and more fake citations",
        "source": "Fast Company AI",
        "summary": "Researchers say generative AI is making it dramatically easier for people to file lawsuits, even as legal professionals are getting caught submitting hallucinated cases.",
        "href": "https://www.fastcompany.com/91539168/ai-is-flooding-the-courts-with-more-cases-more-filings-and-more-fake-citations?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=3&partner=newsletter&campaign_date=05122026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539168-ai-is-flooding-the-courts-with-more-cases-more-filings-and-more-fake-citations.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-11",
    "label": "May 11, 2026",
    "items": [
      {
        "id": "how-to-build-a-cost-aware-llm-routing-system-wit-d998a82b-may11",
        "category": "Model Releases",
        "title": "How to Build a Cost-Aware LLM Routing System with NadirClaw Using Local Prompt Classification and Gemini Model Switching",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we explore NadirClaw as an intelligent routing layer that classifies prompts into simple and complex tiers before sending them to the most suitable model. We start by installing the required packages, setting up an optional Gemini API key, a...",
        "href": "https://www.marktechpost.com/2026/05/10/how-to-build-a-cost-aware-llm-routing-system-with-nadirclaw-using-local-prompt-classification-and-gemini-model-switching/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/blog11-1-3-1024x731.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "students-receive-10-000-prizes-from-openai-for-i-00e0a202-may11",
        "category": "Model Releases",
        "title": "Students receive $10,000 prizes from OpenAI for innovative use of artificial intelligence",
        "source": "Fast Company AI",
        "summary": "The awards come as the first class to have ChatGPT access for all four years of college is about to graduate.",
        "href": "https://www.fastcompany.com/91539141/students-receive-10000-prizes-from-openai-for-innovative-use-of-ai?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=1&partner=newsletter&campaign_date=05112026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91539141-students-receive-10000-prizes-from-openai-for-innovative-use-of-ai.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "chatgpt-is-saying-weird-things-in-chinese-4ff8a86a-may11",
        "category": "Model Releases",
        "title": "ChatGPT Is Saying Weird Things in Chinese",
        "source": "Futurism AI",
        "summary": "\"We don't know how to say: 'this is good writing, but if we do this good writing thing 10 times, then it's no longer good writing.\" The post ChatGPT Is Saying Weird Things in Chinese appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/chatpgt-weird-chinese",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/chatpgt-weird-chinese_b13548.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "emo-pretraining-mixture-of-experts-for-emergent-a40b2ba2-may11",
        "category": "Product Updates",
        "title": "EMO: Pretraining mixture of experts for emergent modularity",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: EMO: Pretraining mixture of experts for emergent modularity",
        "href": "https://huggingface.co/blog/allenai/emo",
        "imageUrl": "https://cdn-uploads.huggingface.co/production/uploads/638e39b249de7ae552d977b5/zw0eFl6MyYg-hmcPSBfYw.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "zapier-mcp-zapier-sdk-and-zapier-cli-what-s-the-a16f4b73-may11",
        "category": "Agents",
        "title": "Zapier MCP, Zapier SDK, and Zapier CLI: What's the difference?",
        "source": "Zapier Blog",
        "summary": "If you've been paying attention to new products in the tech space, you may have noticed three initialisms popping up a lot: MCP, SDK, and CLI. Zapier has dedicated products for each: Zapier MCP, Zapier SDK, and Zapier CLI. All three connect AI to Zapier's eco...",
        "href": "https://zapier.com/blog/zapier-mcp-vs-sdk",
        "imageUrl": "https://images.ctfassets.net/lzny33ho1g45/5R3nzNnfkhYCSJV7OIjv3k/93d2d3d9802f9313867af9e033b805b2/Hero__App_tips__4_.jpg",
        "excerpt": "Radar signal: Zapier Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "man-who-invented-roomba-moves-into-household-dem-e3257c8a-may11",
        "category": "Product Updates",
        "title": "Man Who Invented Roomba Moves Into Household Demon Market",
        "source": "Futurism AI",
        "summary": "Furry AI robots that are whole new levels of uncanny. The post Man Who Invented Roomba Moves Into Household Demon Market appeared first on Futurism .",
        "href": "https://futurism.com/robots-and-machines/roomba-inventor-moves-into-demon-market",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/roomba-inventor-moves-into-demon-market.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-may-kill-the-app-grid-but-complex-tasks-still-1fed0391-may11",
        "category": "Product Updates",
        "title": "AI may kill the app grid, but complex tasks still need apps",
        "source": "TechRadar Software",
        "summary": "Yes, there's still \"an app for that.\"",
        "href": "https://www.techradar.com/ai-platforms-assistants/ai-may-kill-the-app-grid-but-complex-tasks-still-need-apps",
        "imageUrl": "https://cdn.mos.cms.futurecdn.net/o2DLxqvoATMNos4owy4PUC-1280-80.png",
        "excerpt": "Radar signal: TechRadar Software surfaced this item in the latest AI news window."
      },
      {
        "id": "stop-wasting-tokens-a-smarter-alternative-to-jso-d6826719-may11",
        "category": "Model Releases",
        "title": "Stop Wasting Tokens: A Smarter Alternative to JSON for LLM Pipelines",
        "source": "KDnuggets",
        "summary": "If you are feeding structured data into an LLM, there is a good chance you are paying a JSON tax.",
        "href": "https://www.kdnuggets.com/stop-wasting-tokens-a-smarter-alternative-to-json-for-llm-pipelines",
        "imageUrl": "https://www.kdnuggets.com/wp-content/uploads/kdn-stop-wasting-tokens-a-smarter-alternative-to-json-for-llm-pipelines-2.png",
        "excerpt": "Radar signal: KDnuggets surfaced this item in the latest AI news window."
      },
      {
        "id": "is-an-ai-agent-is-your-new-coworker-make-sure-to-56c82c8d-may11",
        "category": "Agents",
        "title": "Is an AI agent is your new coworker? Make sure to lean into your humanness",
        "source": "Fast Company AI",
        "summary": "Fight the FOBO (fear of becoming obsolete). Automated work still requires human judgement.",
        "href": "https://www.fastcompany.com/91537704/ai-agent-your-new-co-worker-heres-how-make-best-it?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=3&partner=newsletter&campaign_date=05112026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91537704-ai-agent-your-new-co-worker-heres-how-make-best-it.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "google-used-to-be-a-search-engine-now-it-wants-t-6740c0e3-may11",
        "category": "Developer Tools",
        "title": "Google used to be a search engine. Now it wants to be everything",
        "source": "Fast Company AI",
        "summary": "The tech giant still dominates online advertising, but its aggressive AI push has transformed Google into a sprawling company with competing identities.",
        "href": "https://www.fastcompany.com/91538458/google-used-to-be-a-search-engine-now-it-wants-to-be-everything?utm_source=postup&utm_medium=email&utm_campaign=artificial-intelligence&position=9&partner=newsletter&campaign_date=05112026",
        "imageUrl": "https://images.fastcompany.com/image/upload/w_1280,q_auto,f_auto,fl_lossy/f_webp,q_auto,c_fit/wp-cms-2/2026/05/p-1-91538458-google-used-to-be-a-search-engine-now-it-wants-to-be-everything.jpg",
        "excerpt": "Radar signal: Fast Company AI surfaced this item in the latest AI news window."
      },
      {
        "id": "researchers-alarmed-by-ai-that-can-self-replicat-78df4e89-may11",
        "category": "Research Workflows",
        "title": "Researchers Alarmed by AI That Can Self-Replicate Into Another Machine",
        "source": "Futurism AI",
        "summary": "\"We're rapidly approaching the point where no one would be able to shut down a rogue AI.\" The post Researchers Alarmed by AI That Can Self-Replicate Into Another Machine appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/researchers-teach-ai-self-replicate",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/researchers-teach-ai-self-replicate_12e67e.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      },
      {
        "id": "a-major-paper-claiming-ai-is-good-for-students-j-b05cddbd-may11",
        "category": "Research Workflows",
        "title": "A Major Paper Claiming AI Is Good for Students Just Got Retracted, Which Is Very Bad News for Advocates of AI in the Cl...",
        "source": "Futurism AI",
        "summary": "\"It really seemed like a paper that should not have been published in the first place.\" The post A Major Paper Claiming AI Is Good for Students Just Got Retracted, Which Is Very Bad News for Advocates of AI in the Classroom appeared first on Futurism .",
        "href": "https://futurism.com/artificial-intelligence/study-ai-good-for-students-retracted",
        "imageUrl": "https://futurism.com/wp-content/uploads/2026/05/study-ai-good-for-students-retracted.jpg?quality=85",
        "excerpt": "Radar signal: Futurism AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-10",
    "label": "May 10, 2026",
    "items": [
      {
        "id": "last-day-to-get-lifetime-chatgpt-gemini-and-more-2c5fb275-may10",
        "category": "Model Releases",
        "title": "Last day to get lifetime ChatGPT, Gemini, and more for $75",
        "source": "Mashable",
        "summary": "1min.AI is a lifetime AI tool that combines top AI models into one platform for a single $75 platform (MSRP $540).",
        "href": "https://mashable.com/article/may-10-1minai-advanced-business-plan-lifetime-subscription",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/00AXNtfFSPxzWBQiM9Tw0TW/hero-image.fill.size_1200x675.v1778236701.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "running-codex-safely-at-openai-91ec1ce9-may10",
        "category": "Developer Tools",
        "title": "Running Codex safely at OpenAI",
        "source": "OpenAI Blog",
        "summary": "How OpenAI runs Codex securely with sandboxing, approvals, network policies, and agent-native telemetry to support safe and compliant coding agent adoption.",
        "href": "https://openai.com/index/running-codex-safely",
        "imageUrl": "assets/news/bright-productivity.svg",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "metr-says-it-can-barely-measure-claude-mythos-pa-56072e9f-may10",
        "category": "Developer Tools",
        "title": "METR says it can barely measure Claude Mythos, Palo Alto Networks warns of autonomous AI attackers",
        "source": "The Decoder",
        "summary": "METR can barely measure Claude Mythos Preview with its current test suite. Only five out of 228 tasks cover the relevant capability range. Meanwhile, Palo Alto Networks reports that frontier models autonomously chain vulnerabilities, shrinking the time from i...",
        "href": "https://the-decoder.com/metr-says-it-can-barely-measure-claude-mythos-palo-alto-networks-warns-of-autonomous-ai-attackers/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/cybersecurity_llm_kraken.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "gpt-5-5-costs-49-to-92-percent-more-than-its-pre-b782a5ff-may10",
        "category": "Developer Tools",
        "title": "GPT-5.5 costs 49 to 92 percent more than its predecessor, depending on the input length",
        "source": "The Decoder",
        "summary": "OpenAI doubled GPT-5.5's list price compared to GPT-5.4, claiming shorter responses would offset the increase. An OpenRouter analysis of real usage data tells a different story: actual costs rose 49 to 92 percent depending on input length. Anthropic hiked Opu...",
        "href": "https://the-decoder.com/gpt-5-5-costs-49-to-92-percent-more-than-its-predecessor-depending-on-the-input-length/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/openai_logo_orange.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-agents-that-hack-computers-and-replicate-them-cb4a3e24-may10",
        "category": "Developer Tools",
        "title": "AI agents that hack computers and replicate themselves, and they're getting better fast",
        "source": "The Decoder",
        "summary": "Palisade Research shows that AI agents can hack remote computers, copy themselves onto them, and form replication chains. In one year, the success rate jumped from 6 to 81 percent. The researchers expect remaining barriers to fall as models get better at hack...",
        "href": "https://the-decoder.com/ai-agents-that-hack-computers-and-replicate-themselves-and-theyre-getting-better-fast/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/hacking_agents_self_replicating-2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "researchers-may-have-found-a-way-to-stop-ai-mode-18133ca5-may10",
        "category": "Developer Tools",
        "title": "Researchers may have found a way to stop AI models from intentionally playing dumb during safety evaluations",
        "source": "The Decoder",
        "summary": "A study by researchers from the MATS program, Redwood Research, the University of Oxford, and Anthropic examines a safety problem that grows more pressing as AI systems become more capable: \"sandbagging,\" where a model deliberately hides its true abilities an...",
        "href": "https://the-decoder.com/researchers-may-have-found-a-way-to-stop-ai-models-from-intentionally-playing-dumb-during-safety-evaluations/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/sandbagging_ai.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-releases-three-realtime-audio-models-gpt-e8e4e4bc-may10",
        "category": "Developer Tools",
        "title": "OpenAI Releases Three Realtime Audio Models: GPT-Realtime-2, GPT-Realtime-Translate, and GPT-Realtime-Whisper in the Re...",
        "source": "MarkTechPost",
        "summary": "Three purpose-built audio models expand what developers can build with live voice: reasoning agents, speech translation across 70+ languages, and streaming transcription. The post OpenAI Releases Three Realtime Audio Models: GPT-Realtime-2, GPT-Realtime-Trans...",
        "href": "https://www.marktechpost.com/2026/05/08/openai-releases-three-realtime-audio-models-gpt-realtime-2-gpt-realtime-translate-and-gpt-realtime-whisper-in-the-realtime-api/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/blog11.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "broadcom-reportedly-won-t-build-openai-s-custom-b0f1e7d0-may10",
        "category": "Developer Tools",
        "title": "Broadcom reportedly won't build OpenAI's custom chip unless Microsoft buys 40 percent of them",
        "source": "The Decoder",
        "summary": "OpenAI's custom AI chip project with Broadcom has hit a funding wall. Broadcom won't finance production unless Microsoft commits to buying 40 percent of the chips, and Microsoft hasn't agreed yet. OpenAI manager Sachin Katti called the dependency \"financially...",
        "href": "https://the-decoder.com/broadcom-reportedly-wont-build-openais-custom-chip-unless-microsoft-buys-40-percent-of-them/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/openai_chatgpt.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-and-openai-sit-down-with-religious-lea-ca546c11-may10",
        "category": "Developer Tools",
        "title": "Anthropic and OpenAI sit down with religious leaders to seek ethical advice",
        "source": "The Decoder",
        "summary": "Anthropic and OpenAI are turning to religious leaders for help with AI ethics. At the first \"Faith-AI Covenant\" roundtable in New York, representatives from both companies met with faith leaders from various religions. Critics like AI researcher Rumman Chowdh...",
        "href": "https://the-decoder.com/anthropic-and-openai-sit-down-with-religious-leaders-to-seek-ethical-advice/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/openai_anthropic_religion.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-09",
    "label": "May 9, 2026",
    "items": [
      {
        "id": "your-google-i-o-cheat-sheet-what-to-expect-2ae4149b-may09",
        "category": "Model Releases",
        "title": "Your Google I/O cheat sheet: What to expect",
        "source": "Mashable",
        "summary": "Google I/O 2026 is expected to focus on Gemini AI, smart glasses, Android updates, and new software announcements.",
        "href": "https://mashable.com/video/google-io-2026-cheat-sheet",
        "imageUrl": "https://helios-i.mashable.com/imagery/videos/01xVPpLtHrN7J9b4xZzP0o8/hero-image.fill.size_1200x675.v1778254006.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "doge-used-chatgpt-in-a-way-that-was-both-dumb-an-392976c6-may09",
        "category": "Model Releases",
        "title": "DOGE used ChatGPT in a way that was both dumb and illegal, judge rules",
        "source": "The Verge",
        "summary": "The Department of Government Efficiency's cancellation of over $100 million in grants was unconstitutional, according to a ruling on Thursday. In the 143-page decision, US District Judge Colleen McMahon cites DOGE's process for eliminating grants, which invol...",
        "href": "https://www.theverge.com/policy/927071/doge-chatgpt-grants-canceled",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/STKS486_DOGE_DEPARTMENT_2_E.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-money-keeps-flowing-as-deepseek-plans-record-ea765023-may09",
        "category": "Developer Tools",
        "title": "AI money keeps flowing as Deepseek plans record raise and Core Automation quadruples valuation in weeks",
        "source": "The Decoder",
        "summary": "Deepseek is planning a funding round of up to $7.35 billion, the largest ever for a Chinese AI company. Deepseek V4.1 is set to launch in June. Meanwhile, Core Automation, founded by ex-OpenAI researcher Jerry Tworek just six weeks ago, is already targeting a...",
        "href": "https://the-decoder.com/ai-money-keeps-flowing-as-deepseek-plans-record-raise-and-core-automation-quadruples-valuation-in-weeks/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/ai_startups_money_2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "groks-voice-mode-comes-to-apple-carplay-49fcff42-may09",
        "category": "Product Updates",
        "title": "Groks voice mode comes to Apple CarPlay",
        "source": "Mashable",
        "summary": "SpaceXAI's smart assistant Grok is now available in CarPlay.",
        "href": "https://mashable.com/article/grok-voice-mode",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/02CUXDv9T6JMbibSge6stEm/hero-image.fill.size_1200x675.v1778246057.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "mozilla-s-agentic-ai-pipeline-turns-claude-mytho-ed73a98c-may09",
        "category": "Developer Tools",
        "title": "Mozilla's agentic AI pipeline turns Claude Mythos Preview loose and finds 271 unknown Firefox vulnerabilities",
        "source": "The Decoder",
        "summary": "Anthropic's Claude Mythos Preview uncovered 271 previously unknown security vulnerabilities in Firefox 150, including bugs up to 20 years old. Mozilla describes an agentic pipeline where the AI builds and runs its own test cases to filter out false positives....",
        "href": "https://the-decoder.com/mozillas-agentic-ai-pipeline-turns-claude-mythos-preview-loose-and-finds-271-unknown-firefox-vulnerabilities/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2025/04/firefox_mozilla_logo_walls-2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-safety-tests-have-a-new-problem-models-are-no-ac468667-may09",
        "category": "Developer Tools",
        "title": "AI safety tests have a new problem: Models are now faking their own reasoning traces",
        "source": "The Decoder",
        "summary": "Anthropic's Natural Language Autoencoders make Claude Opus 4.6's internal activations readable as plain text. Pre-deployment audits show that models often recognize test situations and deliberately deceive evaluators - without revealing any of this in their v...",
        "href": "https://the-decoder.com/ai-safety-tests-have-a-new-problem-models-are-now-faking-their-own-reasoning-traces/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/Anthropic-Natural-language-autoencoders.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "5-000-vibe-coded-apps-just-proved-shadow-ai-is-t-02f8015f-may09",
        "category": "Developer Tools",
        "title": "5,000 vibe-coded apps just proved shadow AI is the new S3 bucket crisis",
        "source": "VentureBeat",
        "summary": "Most enterprise security programs were built to protect servers, endpoints, and cloud accounts. None of them was built to find a customer intake form that a product manager vibe coded on Lovable over a weekend, connected to a live Supabase database, and deplo...",
        "href": "https://venturebeat.com/security/vibe-coded-apps-shadow-ai-s3-bucket-crisis-ciso-audit-framework",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/3H8BkMlVjetAGClhRKtmFK/533b657c9dd2b63819c0db0d2f8c6559/5_000_vibe-coded_apps_just_proved_shadow_AI_is_the_new_S3_bucket_crisis.png?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "vllm-v0-to-v1-correctness-before-corrections-in-08c10eed-may09",
        "category": "Model Releases",
        "title": "vLLM V0 to V1: Correctness Before Corrections in RL",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: vLLM V0 to V1: Correctness Before Corrections in RL",
        "href": "https://huggingface.co/blog/ServiceNow-AI/correctness-before-corrections",
        "imageUrl": "https://cdn-thumbnails.huggingface.co/social-thumbnails/blog/ServiceNow-AI/correctness-before-corrections.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "softbank-reportedly-slashes-openai-backed-loan-f-c107e1fa-may09",
        "category": "Developer Tools",
        "title": "SoftBank reportedly slashes OpenAI-backed loan from $10 billion to $6 billion as lenders balk at private AI valuations",
        "source": "The Decoder",
        "summary": "SoftBank has reduced a loan secured by OpenAI shares from 10 to around 6 billion dollars. Lenders are apparently reluctant to reliably assess the value of an unlisted company like OpenAI. The article SoftBank reportedly slashes OpenAI-backed loan from $10 bil...",
        "href": "https://the-decoder.com/softbank-reportedly-slashes-openai-backed-loan-from-10-billion-to-6-billion-as-lenders-balk-at-private-ai-valuations/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/03/openai_logo_wall.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "how-github-is-securing-agentic-workflows-in-mode-1c3734d8-may09",
        "category": "Developer Tools",
        "title": "How GitHub Is Securing Agentic Workflows in Modern CI CD Systems",
        "source": "InfoQ AI",
        "summary": "GitHub detailed a defense-in-depth security architecture for agentic workflows in CI/CD pipelines, focusing on isolation, constrained execution, and auditability. The design aims to safely integrate autonomous AI agents while mitigating risks like prompt inje...",
        "href": "https://www.infoq.com/news/2026/05/github-agentic-workflows/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/05/github-agentic-workflows/en/headerimage/generatedHeaderImage-1777009566990.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-08",
    "label": "May 8, 2026",
    "items": [
      {
        "id": "google-ai-releases-multi-token-prediction-mtp-dr-1892f0a3-may08",
        "category": "Developer Tools",
        "title": "Google AI Releases Multi-Token Prediction (MTP) Drafters for Gemma 4: Delivering Up to 3x Faster Inference Without Qual...",
        "source": "MarkTechPost",
        "summary": "Google Introduces MTP Drafters for Gemma 4 Family Using Speculative Decoding to Achieve Up to 3x Speedup The post Google AI Releases Multi-Token Prediction (MTP) Drafters for Gemma 4: Delivering Up to 3x Faster Inference Without Quality Loss appeared first on...",
        "href": "https://www.marktechpost.com/2026/05/06/google-ai-releases-multi-token-prediction-mtp-drafters-for-gemma-4-delivering-up-to-3x-faster-inference-without-quality-loss/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/HHkSld4W0AIM_q5.jpeg",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "openclaw-and-claude-can-put-your-ai-generated-po-608851b1-may08",
        "category": "Developer Tools",
        "title": "OpenClaw and Claude can put your AI-generated podcasts in Spotify",
        "source": "The Verge AI",
        "summary": "Save to Spotify is a new command-line tool designed specifically for AI agents like OpenClaw, Claude Code, or OpenAI Codex. If you're the kind of person who collects research on a topic, then feeds it through their AI of choice to create audio summaries and p...",
        "href": "https://www.theverge.com/entertainment/925916/save-to-spotify-ai-podcasts",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/05/VRG_Illo_STK130_K_Radtke_Spotify_Podcast_1.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "presentation-engineering-at-ai-speed-lessons-fro-c0836eae-may08",
        "category": "Developer Tools",
        "title": "Presentation: Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project",
        "source": "InfoQ AI",
        "summary": "Adam Wolff discusses the evolution of Claude Code, explaining how AI shifts the SDLC bottleneck from implementation to architectural decision-making. He shares three \"war stories\" to show why dogfooding and rapid unshipping are vital. He explains that when co...",
        "href": "https://www.infoq.com/presentations/engineering-ai/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/presentations/engineering-ai/en/mediumimage/medium-1777370739830.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-translation-company-deepl-cuts-around-250-job-29c4474a-may08",
        "category": "Developer Tools",
        "title": "AI translation company DeepL cuts around 250 jobs to rebuild as an \"AI-native\" organization",
        "source": "The Decoder",
        "summary": "DeepL, the German AI-powered translation service that competes with Google Translate and other machine translation tools, is laying off roughly 250 employees. The article AI translation company DeepL cuts around 250 jobs to rebuild as an \"AI-native\" organizat...",
        "href": "https://the-decoder.com/ai-translation-company-deepl-cuts-around-250-jobs-to-rebuild-as-an-ai-native-organization/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2023/08/deepl_logo.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-introduces-mrc-multipath-reliable-connect-5845879c-may08",
        "category": "Product Updates",
        "title": "OpenAI Introduces MRC (Multipath Reliable Connection): A New Open Networking Protocol for Large-Scale AI Supercomputer...",
        "source": "MarkTechPost",
        "summary": "MRC (Multipath Reliable Connection) is a new open networking protocol developed by OpenAI in partnership with AMD, Broadcom, Intel, Microsoft, and NVIDIA that improves GPU networking performance and resilience in large-scale AI training clusters by spreading...",
        "href": "https://www.marktechpost.com/2026/05/07/openai-introduces-mrc-multipath-reliable-connection-a-new-open-networking-protocol-for-large-scale-ai-supercomputer-training-clusters/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/mja.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-introduces-websocket-based-execution-mode-2b34b1be-may08",
        "category": "Developer Tools",
        "title": "OpenAI Introduces Websocket-Based Execution Mode to Reduce Latency in Agentic Workflows",
        "source": "InfoQ AI",
        "summary": "OpenAI introduces a WebSocket-based execution mode for its Responses API to improve agentic workflow performance in coding agents and real-time AI systems. The update reduces latency by up to 40 percent by replacing HTTP request-response cycles with persisten...",
        "href": "https://www.infoq.com/news/2026/05/openai-websocket-responses-api/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/05/openai-websocket-responses-api/en/headerimage/generatedHeaderImage-1777845282531.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "improving-token-efficiency-in-github-agentic-wor-2b3dd723-may08",
        "category": "Developer Tools",
        "title": "Improving token efficiency in GitHub Agentic Workflows",
        "source": "GitHub Blog",
        "summary": "Agentic workflows that run on every pull request can quietly accumulate large API bills. Here's how we instrumented our own production workflows, found the inefficiencies, and built agents to fix them. The post Improving token efficiency in GitHub Agentic Wor...",
        "href": "https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/generic-github-copilot-commit-logo.png?fit=1920%2C1080",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-07",
    "label": "May 7, 2026",
    "items": [
      {
        "id": "deepseek-nears-45-billion-valuation-as-china-s-s-e80050c9-may07",
        "category": "Developer Tools",
        "title": "Deepseek nears $45 billion valuation as China's state chip fund leads round",
        "source": "The Decoder",
        "summary": "Deepseek is close to a funding round that could value the Chinese AI lab at roughly $45 billion, according to the Financial Times. The article Deepseek nears $45 billion valuation as China's state chip fund leads round appeared first on The Decoder .",
        "href": "https://the-decoder.com/deepseek-nears-45-billion-valuation-as-chinas-state-chip-fund-leads-round/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/deepseek_chart_background.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-taps-spacex-s-colossus-1-data-center-f-2b222192-may07",
        "category": "Developer Tools",
        "title": "Anthropic taps SpaceX's Colossus-1 data center for 220,000 GPUs to power Claude",
        "source": "The Decoder",
        "summary": "Anthropic is taking over the full computing capacity of SpaceX's Colossus 1 data center, more than 300 megawatts and over 220,000 NVIDIA GPUs, expected to come online within a month. The company is also doubling rate limits for Claude Code and significantly r...",
        "href": "https://the-decoder.com/anthropic-taps-spacexs-colossus-1-data-center-for-220000-gpus-to-power-claude/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/space_rocket_anthropic_head.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-raises-claude-code-usage-limits-credit-457fbc8b-may07",
        "category": "Developer Tools",
        "title": "Anthropic raises Claude Code usage limits, credits new deal with SpaceX",
        "source": "Ars Technica",
        "summary": "Deal follows others with Microsoft, Amazon, and more.",
        "href": "https://arstechnica.com/ai/2026/05/anthropic-raises-claude-code-usage-limits-credits-new-deal-with-spacex/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/Dario-Amodei-Code-with-Claude-SF-2026-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "pennsylvania-is-suing-character-ai-for-allegedly-66950320-may07",
        "category": "Product Updates",
        "title": "Pennsylvania is suing Character.AI for allegedly practicing medicine without a license",
        "source": "Mashable",
        "summary": "Pennsylvania is suing Character AI for one of its chatbots allegedly claiming to be a licensed psychiatrist in the state.",
        "href": "https://mashable.com/article/pennslyvania-suing-character-ai-for-chatbot-practicing-medicine",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/02oQlMaPLdwmPSbzbWg0wxQ/hero-image.fill.size_1200x675.v1778006491.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "a-20-minute-pitch-wins-indian-startup-pronto-bac-ecad5e18-may07",
        "category": "Product Updates",
        "title": "A 20-minute pitch wins Indian startup Pronto backing from Lachy Groom",
        "source": "TechCrunch",
        "summary": "The investment comes as Pronto scales to 26,000 daily bookings and the market heads toward a potential $18 billion size.",
        "href": "https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/03/anjali-sardana-pronto.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "how-elon-musk-left-openai-according-to-greg-broc-1d1bfdc0-may07",
        "category": "Product Updates",
        "title": "How Elon Musk left OpenAI, according to Greg Brockman",
        "source": "TechCrunch",
        "summary": "Cutthroat negotiations between startup founders are rarely shared so publicly, especially when a company becomes as world-changing as OpenAI.",
        "href": "https://techcrunch.com/2026/05/06/how-elon-musk-left-openai-according-to-greg-brockman/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2273248471.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "aiclient-2-api-34119abb-may07",
        "category": "Product Updates",
        "title": "AIClient-2-API",
        "source": "Page Fallback",
        "summary": "Page Fallback reported: AIClient-2-API",
        "href": "https://github.com/justlovemaki/AIClient-2-API",
        "imageUrl": "https://opengraph.githubassets.com/fd55b55585d5c34d0caf072aaa57e254cd05f36c4d5cb69e099e5ffe107ed291/justlovemaki/AIClient2API",
        "excerpt": "Radar signal: Page Fallback surfaced this item in the latest AI news window."
      },
      {
        "id": "why-chrome-may-have-quietly-downloaded-a-4gb-fil-3093e5be-may07",
        "category": "Model Releases",
        "title": "Why Chrome may have quietly downloaded a 4GB file to your PC - and how to get rid of it",
        "source": "ZDNet AI",
        "summary": "The file, which appears to be related to Google's on-device AI model, is harmless enough. Here's why some users may still be concerned.",
        "href": "https://www.zdnet.com/article/google-may-have-downloaded-a-4gb-chrome-file-to-your-pc-heres-why/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/1c81b9ed334ed027072bf6c5e657cc6ae97c32a7/2026/05/06/ba6cc4e9-69ec-4b7c-8b97-4238dad1fb84/google-gemini.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "is-xai-a-neocloud-now-30a5aafe-may07",
        "category": "Model Releases",
        "title": "Is xAI a neocloud now?",
        "source": "TechCrunch",
        "summary": "xAI's real business may be more about building data centers than training AI models.",
        "href": "https://techcrunch.com/2026/05/06/is-xai-a-neocloud-now/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/02/GettyImages-2256968212.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-built-a-networking-protocol-with-amd-broa-0070a4fb-may07",
        "category": "Developer Tools",
        "title": "OpenAI built a networking protocol with AMD, Broadcom, Intel, Microsoft, and NVIDIA to fix AI supercomputer bottlenecks",
        "source": "The Decoder",
        "summary": "OpenAI has teamed up with AMD, Broadcom, Intel, Microsoft, and NVIDIA to develop MRC, an open source network protocol that sends data across hundreds of paths simultaneously between GPUs. Instead of three or four switch layers, MRC needs only two to connect o...",
        "href": "https://the-decoder.com/openai-built-a-networking-protocol-with-amd-broadcom-intel-microsoft-and-nvidia-to-fix-ai-supercomputer-bottlenecks/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/02/openai_wall_statistics_benchmarks.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "github-justlovemaki-06cf257a-may07",
        "category": "Developer Tools",
        "title": "GITHUB: justlovemaki",
        "source": "Page Fallback",
        "summary": "Page Fallback reported: GITHUB: justlovemaki",
        "href": "https://github.com/justlovemaki",
        "imageUrl": "https://avatars.githubusercontent.com/u/22851716?v=4?s=400",
        "excerpt": "Radar signal: Page Fallback surfaced this item in the latest AI news window."
      },
      {
        "id": "google-shuts-down-project-mariner-79e266a1-may07",
        "category": "Creative AI",
        "title": "Google shuts down Project Mariner",
        "source": "The Verge AI",
        "summary": "Google has pulled the plug on Project Mariner, an experimental feature designed to perform tasks for you across the web, as reported earlier by Wired's Maxwell Zeff. The Project Mariner landing page now contains a message that says: \"Thank you for using Proje...",
        "href": "https://www.theverge.com/tech/925559/google-project-mariner-shut-down",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/05/project-mariner-logo.png?quality=90&strip=all&crop=0%2C12.533882885894%2C100%2C74.932234228213&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-06",
    "label": "May 6, 2026",
    "items": [
      {
        "id": "amazon-brings-agentic-fine-tuning-to-sagemaker-w-d4006273-may06",
        "category": "Developer Tools",
        "title": "Amazon brings agentic fine-tuning to SageMaker with support for Llama, Qwen, Deepseek, and Nova",
        "source": "The Decoder",
        "summary": "Amazon SageMaker AI now includes an AI agent designed to help developers customize language models. The article Amazon brings agentic fine-tuning to SageMaker with support for Llama, Qwen, Deepseek, and Nova appeared first on The Decoder .",
        "href": "https://the-decoder.com/amazon-brings-agentic-fine-tuning-to-sagemaker-with-support-for-llama-qwen-deepseek-and-nova/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2024/12/aws_agents_midjourney.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "pennsylvania-sues-character-ai-after-a-chatbot-a-bb06116c-may06",
        "category": "Product Updates",
        "title": "Pennsylvania sues Character.AI after a chatbot allegedly posed as a doctor",
        "source": "TechCrunch",
        "summary": "According to Pennsylvania's filing, a Character.AI chatbot presented itself as a licensed psychiatrist during a state investigation, and also fabricated a serial number for its state medical license.",
        "href": "https://techcrunch.com/2026/05/05/pennsylvania-sues-character-ai-after-a-chatbot-allegedly-posed-as-a-doctor/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/05/shapiro-2272836952.jpg?resize=1200,908",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "character-ai-sued-over-chatbot-that-claims-to-be-200e07db-may06",
        "category": "Product Updates",
        "title": "Character.AI sued over chatbot that claims to be a real doctor with a license",
        "source": "Ars Technica",
        "summary": "State says chatbot claimed to practice medicine, gave invalid license number.",
        "href": "https://arstechnica.com/tech-policy/2026/05/character-ai-sued-over-chatbot-that-claims-to-be-a-real-doctor-with-a-license/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/robot-hand-stethoscope-1152x648-1778013526.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "this-weird-pixel-feature-is-one-of-my-favorite-t-a9563460-may06",
        "category": "Product Updates",
        "title": "This weird Pixel feature is one of my favorite tools - too bad Google may remove it soon",
        "source": "ZDNet AI",
        "summary": "Leaks hint that the next Pixel lineup will lose the thermometer for \"Pixel Glow\" LEDs",
        "href": "https://www.zdnet.com/article/google-removing-pixel-thermometer/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/1ae411430238884f636ac19a7fc74ad642a71012/2025/08/27/87461d54-1171-4e4a-b900-fc8419eca9f3/dsc07492.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "elevenlabs-lists-blackrock-jamie-foxx-and-eva-lo-69d9fa3b-may06",
        "category": "Product Updates",
        "title": "ElevenLabs lists BlackRock, Jamie Foxx, and Eva Longoria as new investors",
        "source": "TechCrunch",
        "summary": "ElevenLabs reveals new investors, hits $500M ARR, and expands enterprise footprint as voice AI becomes a critical interface.",
        "href": "https://techcrunch.com/2026/05/05/elevenlabs-lists-blackrock-jamie-foxx-and-eva-longoria-as-new-investors/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2025/07/Mati-Staniszewski_SXSW.jpg?resize=1200,799",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "this-critical-linux-vulnerability-is-putting-mil-48a754c0-may06",
        "category": "Product Updates",
        "title": "This critical Linux vulnerability is putting millions of systems at risk - how to protect yours",
        "source": "ZDNet AI",
        "summary": "Don't ignore the Copy Fail Linux vulnerability. It's serious, but protecting yourself from it is easy.",
        "href": "https://www.zdnet.com/article/critical-copy-fail-vulnerability-affecting-linux-systems-how-to-mitigate/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/db4efead752b2ca5cf594b29b902e921e3b7d51b/2026/05/05/0374eea1-7746-434d-9fdf-9d106774ff64/this-critical-linux-vulnerability-is-putting-millions-of-systems-at-risk-how-to-protect-yours.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "welcome-to-maintainer-month-celebrating-the-peop-8081fe0e-may06",
        "category": "Developer Tools",
        "title": "Welcome to Maintainer Month: Celebrating the people behind the code",
        "source": "GitHub Blog",
        "summary": "What maintainers are telling us, what we've shipped, and how to celebrate the people behind open source. The post Welcome to Maintainer Month: Celebrating the people behind the code appeared first on The GitHub Blog .",
        "href": "https://github.blog/open-source/maintainers/welcome-to-maintainer-month-celebrating-the-people-behind-the-code/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/05/21b7ba26d938291b85ccf5b0cec4e0b47425dd2ebf9ee392e72a507d15030fdd-2400x1260-1.png?fit=2400%2C1260",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "us-government-now-has-pre-release-access-to-ai-m-8d3ac470-may06",
        "category": "Developer Tools",
        "title": "US government now has pre-release access to AI models from five major labs for national security testing",
        "source": "The Decoder",
        "summary": "The US Department of Commerce is expanding its AI safety testing: Following Anthropic and OpenAI, Google Deepmind, Microsoft, and xAI have now signed agreements with the Center for AI Standards and Innovation. The companies provide models with reduced safety...",
        "href": "https://the-decoder.com/us-government-now-has-pre-release-access-to-ai-models-from-five-major-labs-for-national-security-testing/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/03/us_flag_wireframe.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-president-forced-to-read-his-personal-dia-42aa4ad0-may06",
        "category": "Developer Tools",
        "title": "OpenAI president forced to read his personal diary entries to jury",
        "source": "Ars Technica",
        "summary": "Elon Musk argued the journals show the moment when OpenAI abandoned its mission.",
        "href": "https://arstechnica.com/tech-policy/2026/05/openai-president-explains-to-jury-why-his-diary-entries-sound-greedy/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/greg-brockman-is-you-taking-notes-on-criminal-conspiracy-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "arindam200-awesome-ai-apps-1584467f-may06",
        "category": "Developer Tools",
        "title": "Arindam200 / awesome-ai-apps",
        "source": "github",
        "summary": "github reported: Arindam200 / awesome-ai-apps",
        "href": "https://github.com/Arindam200/awesome-ai-apps",
        "imageUrl": "https://repository-images.githubusercontent.com/933701586/6f7ea6f6-8604-4320-8271-0732a272536f",
        "excerpt": "Radar signal: github surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-co-founder-maps-out-how-recursive-ai-i-6de4b9da-may06",
        "category": "Developer Tools",
        "title": "Anthropic co-founder maps out how recursive AI improvement could outpace the humans meant to supervise it",
        "source": "The Decoder",
        "summary": "Jack Clark argues in a long essay that the building blocks for AI systems training their own successors are largely in place. He puts the odds at 60 percent by the end of 2028. The article Anthropic co-founder maps out how recursive AI improvement could outpa...",
        "href": "https://the-decoder.com/anthropic-co-founder-maps-out-how-recursive-ai-improvement-could-outpace-the-humans-meant-to-supervise-it/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/anthropic_logo_cybersecurity.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-05",
    "label": "May 5, 2026",
    "items": [
      {
        "id": "reduce-friction-and-latency-for-long-running-job-3f523916-may05",
        "category": "Model Releases",
        "title": "Reduce friction and latency for long-running jobs with Webhooks in Gemini API",
        "source": "Google AI Blog",
        "summary": "Event-Driven Webhooks are a push-based notification system that eliminates the need for inefficient polling.",
        "href": "https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/WebhooksGeminiAPI-hero.max-600x600.format-webp.webp",
        "excerpt": "Radar signal: Google AI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "your-chatgpt-account-just-got-more-secure-but-yo-0c35682b-may05",
        "category": "Model Releases",
        "title": "Your ChatGPT account just got more secure, but you have to opt in - here's how",
        "source": "ZDNet AI",
        "summary": "OpenAI adds a feature called Advanced Account Security with four opt-in settings designed to safeguard your account and personal data.",
        "href": "https://www.zdnet.com/article/chatgpt-advanced-account-security/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/486877159e389d477836754cabc98a5dfa19f90b/2026/05/04/568633ee-ad98-48fa-9230-2bf126246305/gettyimages-2205105208.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "influential-study-touting-chatgpt-in-education-r-bc5c3600-may05",
        "category": "Model Releases",
        "title": "Influential study touting ChatGPT in education retracted over red flags",
        "source": "Ars Technica",
        "summary": "The retracted study on ChatGPT in education was already cited hundreds of times.",
        "href": "https://arstechnica.com/ai/2026/05/influential-study-touting-chatgpt-in-education-retracted-over-red-flags/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/GettyImages-2235760397-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-fixes-vs-code-after-app-gives-copilot-05bbdbfa-may05",
        "category": "Developer Tools",
        "title": "Microsoft fixes VS Code after app gives Copilot credit for human's work",
        "source": "The Register AI",
        "summary": "Devs not thrilled that Git extension added the bot as co-author by default Imagine working your butt off on a project, only to have VS Code put an attribution into your commit that says Copilot helped you, even if it did not. Microsoft has reversed a change t...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/05/04/microsoft_reverses_ai_credit_grab/",
        "imageUrl": "https://regmedia.co.uk/2022/10/25/shutterstock_1494515318.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "lessons-on-ux-security-and-scale-when-building-a-84576f16-may05",
        "category": "Agents",
        "title": "Lessons on UX, security, and scale when building an enterprise-grade Slack agent",
        "source": "Sourcegraph Blog",
        "summary": "We built a Deep Search Slack agent for large companies. Here is what we learned about user experience, enterprise security, and Redis-backed rate limiting.",
        "href": "http://localhost:5174/blog/deep-search-slack-agent-lessons",
        "imageUrl": "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
        "excerpt": "Radar signal: Sourcegraph Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "i-tested-google-maps-vs-apple-maps-to-find-the-b-855f86ec-may05",
        "category": "Product Updates",
        "title": "I tested Google Maps vs. Apple Maps to find the best navigation app - and this one wins",
        "source": "ZDNet AI",
        "summary": "Apple Maps has improved over the years, but how does it compare to Google Maps today? Here's which one is best.",
        "href": "https://www.zdnet.com/article/google-maps-vs-apple-maps/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/93e41c7359fe13154cb4a714bcfccadc413c179a/2026/05/04/bc124274-1f48-4d8a-bfab-859396726dc0/google-maps-vs-apple-maps.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "top-search-and-fetch-apis-for-building-ai-agents-9b856218-may05",
        "category": "Agents",
        "title": "Top Search and Fetch APIs for Building AI Agents in 2026: Tools, Tradeoffs, and Free Tiers",
        "source": "MarkTechPost",
        "summary": "Discover the top search and fetch APIs for AI agents in 2026. Compare tools like TinyFish, Tavily, and Firecrawl based on latency, token efficiency, and free tiers to optimize your agent's web retrieval. The post Top Search and Fetch APIs for Building AI Agen...",
        "href": "https://www.marktechpost.com/2026/05/04/top-search-and-fetch-apis-for-building-ai-agents-in-2026-tools-tradeoffs-and-free-tiers/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/search_fetch_api_table_2026-1.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "register-now-for-openclaw-after-hours-github-20b3f4ac-may05",
        "category": "Developer Tools",
        "title": "Register now for OpenClaw: After Hours @ GitHub",
        "source": "GitHub Blog",
        "summary": "OpenClaw builders will gather at GitHub HQ during Microsoft Build 2026 for demos and conversations. Join in person, or watch the livestream on Twitch. The post Register now for OpenClaw: After Hours @ GitHub appeared first on The GitHub Blog .",
        "href": "https://github.blog/open-source/register-now-for-openclaw-after-hours-github/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/05/openclaw-big.png?fit=2400%2C1260",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-04",
    "label": "May 4, 2026",
    "items": [
      {
        "id": "openai-explains-why-chatgpt-suddenly-loved-gobli-b4d43e28-may04",
        "category": "Model Releases",
        "title": "OpenAI explains why ChatGPT suddenly loved goblins",
        "source": "Mashable",
        "summary": "OpenAI published a blog post explaining why a recent ChatGPT model was so obsessed with working goblins into answers.",
        "href": "https://mashable.com/article/openai-chatgpt-goblins-explanation",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/01oWJH29CHKaPqbNZHaVQZU/hero-image.fill.size_1200x675.v1777649479.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "xiaomi-s-open-weight-mimo-v2-5-pro-takes-aim-at-5447e3af-may04",
        "category": "Developer Tools",
        "title": "Xiaomi's open-weight MiMo-V2.5-Pro takes aim at Claude Opus with hours-long autonomous coding",
        "source": "The Decoder",
        "summary": "Xiaomi's new MiMo-V2.5-Pro nearly matches Anthropic's Claude Opus 4.6 on coding benchmarks while burning 40 to 60 percent fewer tokens, according to the company. The release pushes Xiaomi deeper into the race among Chinese open-weight providers like Deepseek,...",
        "href": "https://the-decoder.com/xiaomis-open-weight-mimo-v2-5-pro-takes-aim-at-claude-opus-with-hours-long-autonomous-coding/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/03/Xiaomi-MiMo-Explore-and-Love-e1774194951718.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "hmbown-deepseek-tui-d9569cde-may04",
        "category": "Developer Tools",
        "title": "Hmbown / DeepSeek-TUI",
        "source": "github",
        "summary": "github reported: Hmbown / DeepSeek-TUI",
        "href": "https://github.com/Hmbown/DeepSeek-TUI",
        "imageUrl": "https://opengraph.githubassets.com/78d2908a983eab5d410e9652e6acb381c46b85260fc76c80b7aa63972f8a15d1/Hmbown/DeepSeek-TUI",
        "excerpt": "Radar signal: github surfaced this item in the latest AI news window."
      },
      {
        "id": "xai-launches-grok-4-3-at-an-aggressively-low-pri-8e93db74-may04",
        "category": "Developer Tools",
        "title": "xAI launches Grok 4.3 at an aggressively low price and a new, fast, powerful voice cloning suite",
        "source": "VentureBeat",
        "summary": "While Elon Musk faces off against his former colleague and OpenAI co-founder Sam Altman in court , Musk's rival firm xAI, founded to take on OpenAI, isn't slowing down on launching competitive new products and services. Last night, xAI shipped a new, propriet...",
        "href": "https://venturebeat.com/technology/xai-launches-grok-4-3-at-an-aggressively-low-price-and-a-new-fast-powerful-voice-cloning-suite",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/6c9N7ubweMcf8hAUjcDZIH/fb25ad47038633db57b73f2f45bc3225/FkIIbTjMYUsldxbqMHtky_g5BcjizZ.jpg?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-caught-sneaking-co-authored-by-copilot-46011e62-may04",
        "category": "Developer Tools",
        "title": "Microsoft caught sneaking \"Co-Authored-by Copilot\" into VS Code commits - even with AI off",
        "source": "The Decoder",
        "summary": "Microsoft quietly slipped a \"Co-Authored-by Copilot\" line into Git commits in Visual Studio Code - even for developers who had turned off the AI features entirely. The article Microsoft caught sneaking \"Co-Authored-by Copilot\" into VS Code commits - even with...",
        "href": "https://the-decoder.com/co-pilot-becomes-a-co-author-in-vs-code-without-being-asked/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/microsoft_logo.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "how-to-use-transformers-js-in-a-chrome-extension-4a3a5411-may04",
        "category": "Product Updates",
        "title": "How to Use Transformers.js in a Chrome Extension",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: How to Use Transformers.js in a Chrome Extension",
        "href": "https://huggingface.co/blog/transformersjs-chrome-extension",
        "imageUrl": "https://huggingface.co/blog/assets/transformersjs-chrome-extension/thumbnail.jpg",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "ai-and-the-future-of-cybersecurity-why-openness-cd40c18e-may04",
        "category": "Policy",
        "title": "AI and the Future of Cybersecurity: Why Openness Matters",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: AI and the Future of Cybersecurity: Why Openness Matters",
        "href": "https://huggingface.co/blog/cybersecurity-openness",
        "imageUrl": "https://huggingface.co/blog/assets/cybersecurity-openness/detective_huggy_thumbnail.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "i-tracked-3-000-steps-on-my-apple-watch-google-p-dd7c7043-may04",
        "category": "Product Updates",
        "title": "I tracked 3,000 steps on my Apple Watch, Google Pixel, and Oura Ring - this one was most accurate",
        "source": "ZDNet AI",
        "summary": "Just how reliable is that smartwatch or smart ring? I tested three of the most popular health trackers to find out.",
        "href": "https://www.zdnet.com/article/step-tracking-apple-google-oura-health-trackers-accuracy/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/302b1f41ca65528d9fd4967dc0a2683ee3d1b0b7/2026/04/09/b6591326-e608-455d-a2e1-5a5871a360bf/img-4302-1.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "join-the-new-ai-agents-vibe-coding-course-from-g-8a4b231f-may04",
        "category": "Developer Tools",
        "title": "Join the new AI Agents Vibe Coding Course from Google and Kaggle",
        "source": "Google AI Blog",
        "summary": "Google is bringing back its 5-Day AI Agents Intensive Course with Kaggle and registration is open.",
        "href": "https://blog.google/innovation-and-ai/technology/developers-tools/kaggle-genai-intensive-course-vibe-coding-june-2026/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Vibe_Coding_Course_herosocial.max-600x600.format-webp.webp",
        "excerpt": "Radar signal: Google AI Blog surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-03",
    "label": "May 3, 2026",
    "items": [
      {
        "id": "gemini-is-rolling-out-to-cars-with-google-built-849c8973-may03",
        "category": "Developer Tools",
        "title": "Gemini is rolling out to cars with Google built-in",
        "source": "The Verge AI",
        "summary": "Google is preparing to update vehicles that have Google built-in with its Gemini AI assistant. This will be an upgrade from the current Google Assistant according to Google's announcement, and promises to provide an improved experience for natural conversatio...",
        "href": "https://www.theverge.com/tech/921117/google-gemini-ai-assistant-cars-upgrade",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/Google-Gemini-car-AI-assistant-upgrade.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "deepseek-v4-a-million-token-context-that-agents-b2ff62f9-may03",
        "category": "Agents",
        "title": "DeepSeek-V4: a million-token context that agents can actually use",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: DeepSeek-V4: a million-token context that agents can actually use",
        "href": "https://huggingface.co/blog/deepseekv4",
        "imageUrl": "https://huggingface.co/blog/assets/deepseekv4/thumbnail.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "xai-s-new-custom-voices-feature-turns-a-minute-o-a7d7dbb3-may03",
        "category": "Developer Tools",
        "title": "xAI's new Custom Voices feature turns a minute of speech into a usable voice clone",
        "source": "The Decoder",
        "summary": "xAI now lets developers clone their own voices for AI applications. The new \"Custom Voices\" feature builds on the recently launched Grok Speech-to-Text and Text-to-Speech APIs. The article xAI's new Custom Voices feature turns a minute of speech into a usable...",
        "href": "https://the-decoder.com/xais-new-custom-voices-feature-turns-a-minute-of-speech-into-a-usable-voice-clone/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/xai_gro_clone_voice.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "introducing-nvidia-nemotron-3-nano-omni-long-con-5b7c46b2-may03",
        "category": "Developer Tools",
        "title": "Introducing NVIDIA Nemotron 3 Nano Omni: Long-Context Multimodal Intelligence for Documents, Audio and Video Agents",
        "source": "Hugging Face Blog",
        "summary": "Hugging Face Blog reported: Introducing NVIDIA Nemotron 3 Nano Omni: Long-Context Multimodal Intelligence for Documents, Audio and Video Agents",
        "href": "https://huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence",
        "imageUrl": "https://cdn-thumbnails.huggingface.co/social-thumbnails/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence.png",
        "excerpt": "Radar signal: Hugging Face Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "even-the-latest-ai-models-make-three-systematic-376d1bc9-may03",
        "category": "Developer Tools",
        "title": "Even the latest AI models make three systematic reasoning errors, ARC-AGI-3 analysis shows",
        "source": "The Decoder",
        "summary": "The ARC Prize Foundation analyzed 160 game runs of OpenAI's GPT-5.5 and Anthropic's Opus 4.7 on the ARC-AGI-3 benchmark. Three systematic error patterns explain why both models stay below 1 percent on tasks that humans can solve without much trouble. The arti...",
        "href": "https://the-decoder.com/even-the-latest-ai-models-make-three-systematic-reasoning-errors-arc-agi-3-analysis-shows/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/arc-agi-benchmark.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "how-i-scan-documents-with-my-android-phone-and-t-5e7b0d6f-may03",
        "category": "Product Updates",
        "title": "How I scan documents with my Android phone and turn them into PDFs for free - it's easy",
        "source": "ZDNet AI",
        "summary": "Need to make a PDF from your Android phone? You can use Google's free tool to scan and create documents in seconds. Here's how.",
        "href": "https://www.zdnet.com/article/how-to-scan-documents-and-turn-into-pdfs-on-android/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/c5d4b401cfacd84e1c23bf205177352255729e2e/2026/04/29/9c2174d6-4b16-481a-b563-cdc03e58c0ef/pdfscanhero2.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "elon-musk-calls-himself-a-fool-for-giving-openai-9f48ac2f-may03",
        "category": "Developer Tools",
        "title": "Elon Musk calls himself a fool for giving OpenAI $38 million that became an $800 billion company",
        "source": "The Decoder",
        "summary": "Elon Musk called himself a \"fool\" in court, warned of a \"Terminator\" future, and admitted that xAI taps OpenAI's models for its own AI training. Week one of Musk's trial against Sam Altman delivered plenty of drama; and the best may still be ahead. The articl...",
        "href": "https://the-decoder.com/elon-musk-calls-himself-a-fool-for-giving-openai-38-million-that-became-an-800-billion-company/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/sam_altman_vs_elon_musk.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "eight-tech-giants-sign-pentagon-deals-to-build-a-46f23a9c-may03",
        "category": "Developer Tools",
        "title": "Eight tech giants sign Pentagon deals to build an \"AI-first fighting force\" across classified networks",
        "source": "The Decoder",
        "summary": "Eight tech companies are supplying AI for classified US military networks, part of the Pentagon's push to build an \"AI-first fighting force.\" Anthropic is notably absent from the list after the company rejected a usage clause and got flagged as a security ris...",
        "href": "https://the-decoder.com/eight-tech-giants-sign-pentagon-deals-to-build-an-ai-first-fighting-force-across-classified-networks/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/05/pentagon_AI_strategy.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-02",
    "label": "May 2, 2026",
    "items": [
      {
        "id": "google-maps-vs-waze-i-compared-the-two-best-navi-44fb435a-may02",
        "category": "Model Releases",
        "title": "Google Maps vs. Waze: I compared the two best navigation apps, and this one wins",
        "source": "ZDNet AI",
        "summary": "Waze is great for fast reroutes and real-time alerts, while Google Maps delivers deep Gemini integration and more features. Here's my pick after extensive testing.",
        "href": "https://www.zdnet.com/article/google-maps-vs-waze/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/fa83bd6b70c8da796cd2c51136dabe1d753c1e8f/2026/05/01/3692a61f-b839-4ca6-8a13-8bab7349f2cc/google-maps-vs-waze-i-compared-the-two-best-navigation-apps-and-this-ones-better.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "minnesota-passes-ban-on-fake-ai-nudes-app-makers-e0cc2e29-may02",
        "category": "Developer Tools",
        "title": "Minnesota passes ban on fake AI nudes; app makers risk $500K fines",
        "source": "Ars Technica",
        "summary": "More evidence of Grok CSAM seen as Minnesota passes nudifying app ban.",
        "href": "https://arstechnica.com/tech-policy/2026/05/minnesota-set-to-be-first-state-to-ban-nudification-apps/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/05/GettyImages-1211553945-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "andy-serkis-on-animal-farm-george-orwell-and-ai-915f393e-may02",
        "category": "Product Updates",
        "title": "Andy Serkis on Animal Farm, George Orwell, and AI in Hollywood",
        "source": "Mashable",
        "summary": "\"Animal Farm\" director Andy Serkis breaks down his George Orwell adaptation, including why he added a new character: piglet Lucky.",
        "href": "https://mashable.com/video/andy-serkis-interview-animal-farm",
        "imageUrl": "https://helios-i.mashable.com/imagery/videos/04rjSM4XVfbwtO36oKglzDO/hero-image.fill.size_1200x675.v1777639935.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "qwen-ai-releases-qwen-scope-an-open-source-spars-efb00c05-may02",
        "category": "Developer Tools",
        "title": "Qwen AI Releases Qwen-Scope: An Open-Source Sparse AutoEncoders (SAE) Suite That Turns LLM Internal Features into Pract...",
        "source": "MarkTechPost",
        "summary": "Qwen Team Introduces Qwen-Scope: An Open-Source Sparse Autoencoder Suite That Turns LLM Internals into Practical Development Tools The post Qwen AI Releases Qwen-Scope: An Open-Source Sparse AutoEncoders (SAE) Suite That Turns LLM Internal Features into Pract...",
        "href": "https://www.marktechpost.com/2026/05/01/qwen-ai-releases-qwen-scope-an-open-source-sparse-autoencoders-sae-suite-that-turns-llm-internal-features-into-practical-development-tools/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-1.00.12-AM-1.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "severe-linux-copy-fail-security-flaw-uncovered-u-549d7080-may02",
        "category": "Product Updates",
        "title": "Severe Linux Copy Fail security flaw uncovered using AI scanning help",
        "source": "The Verge",
        "summary": "Nearly every Linux distribution released since 2017 is currently vulnerable to a security bug called \"Copy Fail\" that allows any user to give themselves administrator privileges. The exploit, publicly disclosed as CVE-2026-31431 on Wednesday, uses a Python sc...",
        "href": "https://www.theverge.com/tech/922243/linux-cve-2026-3141-copy-fail-exploit",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/STK414_AI_CVIRGINIA_I__0008_6.png?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge surfaced this item in the latest AI news window."
      },
      {
        "id": "improving-understanding-with-language-a0752d67-may02",
        "category": "Product Updates",
        "title": "Improving understanding with language",
        "source": "MIT News AI",
        "summary": "MIT senior Olivia Honeycutt investigates how the ways we communicate can shape our views of the world.",
        "href": "https://news.mit.edu/2026/improving-understanding-language-olivia-honeycutt-0501",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202603/mit-shass-Olivia-Honeycutt.jpg?itok=kUUeKYli",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      },
      {
        "id": "i-used-photoshop-s-new-ai-tool-to-rotate-objects-30ffd38d-may02",
        "category": "Product Updates",
        "title": "I used Photoshop's new AI tool to rotate objects in 3D, and it's pure magic",
        "source": "ZDNet AI",
        "summary": "Adobe's AI-enabled Rotate Object tool can do some really cool things, but human skill is still crucial for success.",
        "href": "https://www.zdnet.com/article/adobe-photoshop-new-3d-object-rotation-tool-hands-on/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/9cd519860c99dc6078a473c0f80670a9d1432707/2026/05/01/747e6e3a-47fb-478e-8913-d7fce64c8549/i-used-photoshops-new-ai-tool-to-rotate-objects-in-3d-and-its-pure-magic.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "pentagon-inks-deals-with-nvidia-microsoft-and-aw-33c1ee68-may02",
        "category": "Model Releases",
        "title": "Pentagon inks deals with Nvidia, Microsoft, and AWS to deploy AI on classified networks",
        "source": "TechCrunch",
        "summary": "The deals come as the DOD has doubled down on diversifying its exposure to AI vendors in the wake of its controversial dispute with Anthropic over usage terms of its AI models.",
        "href": "https://techcrunch.com/2026/05/01/pentagon-inks-deals-with-nvidia-microsoft-and-aws-to-deploy-ai-on-classified-networks/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1292192586.jpg?resize=1200,900",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "all-the-evidence-revealed-so-far-in-musk-v-altma-814f8d51-may02",
        "category": "Developer Tools",
        "title": "All the evidence revealed so far in Musk v. Altman",
        "source": "The Verge AI",
        "summary": "The Musk v. Altman trial is underway, and that means exhibits, or the evidence to be presented in court, are being revealed piece by piece. So far, email exchanges, photos, and corporate documents are circulating from the earliest days of OpenAI - and from be...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/920775/evidence-exhibits-elon-musk-sam-altman-openai-trial",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/268474_musk_vs_altman_CVirginia6.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "200-000-mcp-servers-expose-a-command-execution-f-56306432-may02",
        "category": "Developer Tools",
        "title": "200,000 MCP servers expose a command execution flaw that Anthropic calls a feature",
        "source": "VentureBeat",
        "summary": "Anthropic created the Model Context Protocol as the open standard for AI agent-to-tool communication. OpenAI adopted it in March 2025 . Google DeepMind followed. Anthropic donated MCP to the Linux Foundation in December 2025. Downloads crossed 150 million. Th...",
        "href": "https://venturebeat.com/security/mcp-stdio-flaw-200000-ai-agent-servers-exposed-ox-security-audit",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/5zcdzz8S6R9xMQCRiaArOG/1290a9dbaee30dd37a47fefa5b656922/ANTHROPIC.png?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-05-01",
    "label": "May 1, 2026",
    "items": [
      {
        "id": "i-tested-chatgpt-and-perplexity-ai-as-my-carplay-04387f1b-may01",
        "category": "Developer Tools",
        "title": "I tested ChatGPT and Perplexity AI as my CarPlay voice assistants - this model was better",
        "source": "ZDNet AI",
        "summary": "When you're driving, both ChatGPT and Perplexity can answer questions and provide help that's well beyond Siri's modest abilities. Here's which one is better.",
        "href": "https://www.zdnet.com/article/chatgpt-perplexity-ai-carplay-voice-assistant/",
        "imageUrl": "assets/news/bright-productivity.svg",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-new-claude-security-tool-scans-your-b7a47af7-may01",
        "category": "Developer Tools",
        "title": "Anthropic's new Claude Security tool scans your codebase for flaws - and helps you decide what to fix first",
        "source": "ZDNet AI",
        "summary": "It uses Opus 4.7 to scan, validate, and generate patches, helping fix dangerous flaws before they can be exploited.",
        "href": "https://www.zdnet.com/article/anthropic-claude-security-ai-tool-scans-codebase-for-flaws/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/b812c2ac285d2b5c8ffb0a577aa3a7e757aab1cb/2026/04/30/21eaa3bd-0347-4dbb-b857-b0757d960c7d/claude-security-2.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-new-benchmark-claims-claude-can-matc-f92532f0-may01",
        "category": "Developer Tools",
        "title": "Anthropic's new benchmark claims Claude can match human experts in bioinformatics",
        "source": "The Decoder",
        "summary": "With BioMysteryBench, Anthropic wants to show that Claude can solve real bioinformatics problems at an expert level. The results are promising, but come with important caveats. The article Anthropic's new benchmark claims Claude can match human experts in bio...",
        "href": "https://the-decoder.com/anthropics-new-benchmark-claims-claude-can-match-human-experts-in-bioinformatics/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/Anthropic-Bioinformatic-Bench.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "github-copilot-cli-for-beginners-interactive-v-n-1ab6a120-may01",
        "category": "Developer Tools",
        "title": "GitHub Copilot CLI for Beginners: Interactive v. non-interactive mode",
        "source": "GitHub Blog",
        "summary": "Learn the difference between CLI interactive v. non-interactive modes. The post GitHub Copilot CLI for Beginners: Interactive v. non-interactive mode appeared first on The GitHub Blog .",
        "href": "https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-for-beginners-interactive-v-non-interactive-mode/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/Episode-2.png",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "cursor-introduces-a-typescript-sdk-for-building-ab02e967-may01",
        "category": "Developer Tools",
        "title": "Cursor Introduces a TypeScript SDK for Building Programmatic Coding Agents With Sandboxed Cloud VMs, Subagents, Hooks,...",
        "source": "MarkTechPost",
        "summary": "Cursor Launches TypeScript SDK to Let Developers Build and Deploy Programmatic Coding Agents The post Cursor Introduces a TypeScript SDK for Building Programmatic Coding Agents With Sandboxed Cloud VMs, Subagents, Hooks, and Token-Based Pricing appeared first...",
        "href": "https://www.marktechpost.com/2026/04/29/cursor-introduces-a-typescript-sdk-for-building-programmatic-coding-agents-with-sandboxed-cloud-vms-subagents-hooks-and-token-based-pricing/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-90.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "firefox-maker-torches-google-for-building-prompt-d795798d-may01",
        "category": "Product Updates",
        "title": "Firefox maker torches Google for building Prompt API into browser",
        "source": "The Register AI",
        "summary": "Mozilla fears wiring an AI API into Chrome will make the web less open Updated Mozilla has reiterated its opposition to Google's decision to build AI plumbing into its Chrome browser, though rather belatedly now that the technology, known as the Prompt API, i...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/30/mozilla_pushes_back_against_googles/",
        "imageUrl": "https://regmedia.co.uk/2022/09/30/chrome_with_chains.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "everything-you-need-to-know-about-elon-musks-ope-efbbf270-may01",
        "category": "Product Updates",
        "title": "Everything you need to know about Elon Musks OpenAI testimony",
        "source": "Mashable",
        "summary": "TL;DR: Musk doesn't understand what \"TL;DR\" stands for.",
        "href": "https://mashable.com/article/musk-openai-trial-testimony",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/00ST6klDlzPw71TKLNwhGTm/hero-image.fill.size_1200x675.v1777591577.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "writer-launches-ai-agents-that-can-act-without-p-386e9dd5-may01",
        "category": "Developer Tools",
        "title": "Writer launches AI agents that can act without prompts, taking on Amazon, Microsoft and Salesforce",
        "source": "VentureBeat",
        "summary": "Writer , the enterprise AI agent platform backed by Salesforce Ventures , Adobe Ventures , and Insight Partners , today launched event-based triggers for its Writer Agent platform, enabling AI agents to autonomously detect business signals across Gmail, Gong,...",
        "href": "https://venturebeat.com/technology/writer-launches-ai-agents-that-can-act-without-prompts-taking-on-amazon-microsoft-and-salesforce",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/2A4wsP5BX8u0ZylzUEOncb/d97852834fdd610f61a1f5d79609d4ea/nuneybits_Vector_art_of_robot_secretary_typing_on_glowing_typew_bdb6fb50-e1f2-4f80-a241-560e6d906a91.webp?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "netomi-raises-110-million-as-accenture-and-adobe-5b1bffb8-may01",
        "category": "Developer Tools",
        "title": "Netomi raises $110 million as Accenture and Adobe bet on AI for customer service",
        "source": "VentureBeat",
        "summary": "Netomi , the San Francisco-based startup building AI systems for enterprise customer service, said Thursday that it has raised $110 million in new funding in a round led by Accenture Ventures , with participation from Adobe Ventures , WndrCo , Silver Lake Wat...",
        "href": "https://venturebeat.com/technology/netomi-raises-110-million-as-accenture-and-adobe-bet-on-ai-for-customer-service",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/17Z7TzwDGYPOr36mKN8hXV/14fcfd667d19fd9d96b2de2371783baa/nuneybits_Vector_art_of_a_customer_service_headset_dissolving_i_1435a88a-3615-4579-bf8d-fa3f812f8e62.webp?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-ceo-satya-nadella-says-ai-success-is-m-725f1abc-may01",
        "category": "Developer Tools",
        "title": "Microsoft CEO Satya Nadella says AI success is \"more about getting intense users and intense usage\" than seat counts",
        "source": "The Decoder",
        "summary": "Microsoft is posting record profits and strong cloud growth, but just like Google, the company is saying little about how its generative AI business is actually performing. The article Microsoft CEO Satya Nadella says AI success is \"more about getting intense...",
        "href": "https://the-decoder.com/microsoft-ceo-satya-nadella-says-ai-success-is-more-about-getting-intense-users-and-intense-usage-than-seat-counts/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/03/microsoft_neural_network.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-30",
    "label": "April 30, 2026",
    "items": [
      {
        "id": "sources-anthropic-could-raise-a-new-50b-round-at-50738bf0-apr30",
        "category": "Funding",
        "title": "Sources: Anthropic could raise a new $50B round at a valuation of $900B",
        "source": "TechCrunch",
        "summary": "The maker of Claude has received multiple pre-emptive offers at valuations in the $850 billion to $900 billion range, according to sources familiar with the matter.",
        "href": "https://techcrunch.com/2026/04/29/sources-anthropic-could-raise-a-new-50b-round-at-a-valuation-of-900b/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/01/GettyImages-2256664479.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-says-it-has-over-20m-paid-copilot-user-953abed2-apr30",
        "category": "Developer Tools",
        "title": "Microsoft says it has over 20M paid Copilot users, and they really are using it",
        "source": "TechCrunch",
        "summary": "Despite the lingering perception that no one really uses Copilot, Microsoft said on Wednesday that the number of users and engagement is growing.",
        "href": "https://techcrunch.com/2026/04/29/microsoft-says-it-has-over-20m-paid-copilot-users-and-they-really-are-using-it/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2017/07/gettyimages-496394442.jpg?resize=1200,747",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "build-a-personal-organization-command-center-wit-c84f8d8a-apr30",
        "category": "Developer Tools",
        "title": "Build a personal organization command center with GitHub Copilot CLI",
        "source": "GitHub Blog",
        "summary": "Learn about the productivity tool one GitHub engineer built, and how AI supported the development process. The post Build a personal organization command center with GitHub Copilot CLI appeared first on The GitHub Blog .",
        "href": "https://github.blog/ai-and-ml/github-copilot/build-a-personal-organization-command-center-with-github-copilot-cli/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?fit=1920%2C1080",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "google-gains-25m-subscriptions-in-q1-driven-by-y-ea12b04b-apr30",
        "category": "Product Updates",
        "title": "Google gains 25M subscriptions in Q1, driven by YouTube and Google One",
        "source": "TechCrunch",
        "summary": "Google added 25M paid subscriptions in Q1, reaching 350M total, as YouTube and Google One grow.",
        "href": "https://techcrunch.com/2026/04/29/google-gains-25m-subscriptions-in-q1-driven-by-youtube-and-google-one/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2020/06/GettyImages-1149449083.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "google-cloud-surpasses-20b-but-says-growth-was-c-f4817a46-apr30",
        "category": "Product Updates",
        "title": "Google Cloud surpasses $20B, but says growth was capacity-constrained",
        "source": "TechCrunch",
        "summary": "Google Cloud topped $20B in quarterly revenue for the first time, fueled by surging demand for AI. But capacity constraints mean it could have grown even faster.",
        "href": "https://techcrunch.com/2026/04/29/google-cloud-surpasses-20b-but-says-growth-was-capacity-constrained/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/04/GettyImages-2266466589.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "white-house-moves-to-restore-anthropic-access-af-09d5e84c-apr30",
        "category": "Developer Tools",
        "title": "White House moves to restore Anthropic access after Pentagon standoff",
        "source": "The Decoder",
        "summary": "The White House is drafting guidance that would let federal agencies work with Anthropic again, including access to the company's new model Mythos. The article White House moves to restore Anthropic access after Pentagon standoff appeared first on The Decoder...",
        "href": "https://the-decoder.com/white-house-moves-to-restore-anthropic-access-after-pentagon-standoff/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/02/anthropic_pentagon-2.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "step-by-step-guide-to-build-a-complete-pii-detec-84201ae4-apr30",
        "category": "Developer Tools",
        "title": "Step by Step Guide to Build a Complete PII Detection and Redaction Pipeline with OpenAI Privacy Filter",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we build a complete, production-style pipeline for detecting and redacting personally identifiable information using the OpenAI Privacy Filter. We begin by setting up the environment and loading a token classification model that identifies m...",
        "href": "https://www.marktechpost.com/2026/04/29/step-by-step-guide-to-build-a-complete-pii-detection-and-redaction-pipeline-with-openai-privacy-filter/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-1-22.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-researchers-explain-why-math-is-the-road-cb37a856-apr30",
        "category": "Developer Tools",
        "title": "OpenAI researchers explain why math is the road to AGI",
        "source": "The Decoder",
        "summary": "AI models have jumped from grade-school arithmetic to olympiad-level and research mathematics in only two years. In the OpenAI Podcast, OpenAI researchers Sebastian Bubeck and Ernest Ryu explain why math has become the key test on the road to artificial gener...",
        "href": "https://the-decoder.com/openai-researchers-explain-why-math-is-the-road-to-agi/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2025/12/ai_in_science_math.jpeg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-29",
    "label": "April 29, 2026",
    "items": [
      {
        "id": "from-developer-desks-to-the-whole-organization-r-9ba53ef0-apr29",
        "category": "Developer Tools",
        "title": "From developer desks to the whole organization: Running Claude Cowork in Amazon Bedrock",
        "source": "AWS Machine Learning",
        "summary": "Today, we're excited to announce Claude Cowork in Amazon Bedrock. You can now run Cowork and Claude Code Desktop through Amazon Bedrock, directly or using an LLM gateway. In this post, we walk through how Claude Cowork integrates with Amazon Bedrock and show...",
        "href": "https://aws.amazon.com/blogs/machine-learning/from-developer-desks-to-the-whole-organization-running-claude-cowork-in-amazon-bedrock/",
        "imageUrl": "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/04/21/ml-20855-1120x630.png",
        "excerpt": "Radar signal: AWS Machine Learning surfaced this item in the latest AI news window."
      },
      {
        "id": "github-will-start-charging-copilot-users-based-o-1e374899-apr29",
        "category": "Developer Tools",
        "title": "GitHub will start charging Copilot users based on their actual AI usage",
        "source": "Ars Technica",
        "summary": "GitHub says it can no longer absorb \"escalating inference cost\" from it heaviest AI users.",
        "href": "https://arstechnica.com/ai/2026/04/github-will-start-charging-copilot-users-based-on-their-actual-ai-usage/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/04/copilot-1152x648.png",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "lovable-launches-its-vibe-coding-app-on-ios-and-7224e67e-apr29",
        "category": "Developer Tools",
        "title": "Lovable launches its vibe-coding app on iOS and Android",
        "source": "TechCrunch",
        "summary": "The app allows developers to vibe code web apps and websites on the go.",
        "href": "https://techcrunch.com/2026/04/28/lovable-launches-its-vibe-coding-app-on-ios-and-android/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2018/02/tc-backlight-e1689786273147.png?w=1200",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "a-coding-implementation-on-document-parsing-benc-8619d0a5-apr29",
        "category": "Developer Tools",
        "title": "A Coding Implementation on Document Parsing Benchmarking with LlamaIndex ParseBench Using Python, Hugging Face, and Eva...",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we explore how to use the ParseBench dataset to evaluate document parsing systems in a structured, practical way. We begin by loading the dataset directly from Hugging Face, inspecting its multiple dimensions, such as text, tables, charts, a...",
        "href": "https://www.marktechpost.com/2026/04/29/a-coding-implementation-on-document-parsing-benchmarking-with-llamaindex-parsebench-using-python-hugging-face-and-evaluation-metrics/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-86.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "meta-fair-releases-neuralset-a-python-package-fo-de196fe1-apr29",
        "category": "Research Workflows",
        "title": "Meta FAIR Releases NeuralSet: A Python Package for Neuro-AI That Supports fMRI, M/EEG, Spikes, and HuggingFace Embeddin...",
        "source": "MarkTechPost",
        "summary": "Introducing NeuralSet: Meta's Simple, Fast, and Scalable Python Package That Bridges Neuroscience and AI The post Meta FAIR Releases NeuralSet: A Python Package for Neuro-AI That Supports fMRI, M/EEG, Spikes, and HuggingFace Embeddings appeared first on MarkT...",
        "href": "https://www.marktechpost.com/2026/04/29/meta-fair-releases-neuralset-a-python-package-for-neuro-ai-that-supports-fmri-m-eeg-spikes-and-huggingface-embeddings/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/Screenshot-2026-04-29-at-12.54.07-AM-1.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "at-his-openai-trial-musk-relitigates-an-old-frie-2c170000-apr29",
        "category": "Product Updates",
        "title": "At his OpenAI trial, Musk relitigates an old friendship",
        "source": "TechCrunch",
        "summary": "It's a story Musk has told before -- in interviews and to author Walter Isaacson for his bestselling biography of Musk -- but Tuesday was the first time he said it under oath.",
        "href": "https://techcrunch.com/2026/04/28/at-his-openai-trial-musk-relitigates-an-old-friendship/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2016/07/a3c4057e7d804c79b4bfb3278f4afced.jpg?resize=1200,675",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "enabling-privacy-preserving-ai-training-on-every-9ea28709-apr29",
        "category": "Model Releases",
        "title": "Enabling privacy-preserving AI training on everyday devices",
        "source": "MIT News AI",
        "summary": "A new method could bring more accurate and efficient AI models to high-stakes applications like health care and finance, even in under-resourced settings.",
        "href": "https://news.mit.edu/2026/enabling-privacy-preserving-ai-training-everyday-devices-0429",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202604/MIT-Federated-Constrained-01-press.jpg?itok=ILr4mnWw",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      },
      {
        "id": "how-to-build-traceable-and-evaluated-llm-workflo-3a36db5f-apr29",
        "category": "Agents",
        "title": "How to Build Traceable and Evaluated LLM Workflows Using Promptflow, Prompty, and OpenAI",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we build a complete, production-style LLM workflow using Promptflow within a Colab environment. We begin by setting up a reliable keyring backend to avoid OS dependency issues and securely configure our OpenAI connection. From there, we esta...",
        "href": "https://www.marktechpost.com/2026/04/28/how-to-build-traceable-and-evaluated-llm-workflows-using-promptflow-prompty-and-openai/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-84-1024x731.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "google-cloud-introduces-agents-cli-to-streamline-1eeff792-apr29",
        "category": "Agents",
        "title": "Google Cloud Introduces Agents CLI to Streamline AI Agent Development Lifecycle",
        "source": "InfoQ AI",
        "summary": "Google Cloud has introduced Agents CLI within its Agent Platform, aiming to streamline the development lifecycle of AI agents from local prototyping to production deployment. The release targets a common challenge in agent development, where tooling and infra...",
        "href": "https://www.infoq.com/news/2026/04/agents-cli-google-cloud/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/04/agents-cli-google-cloud/en/headerimage/generatedHeaderImage-1777398240597.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "securing-the-git-push-pipeline-responding-to-a-c-b83b06fe-apr29",
        "category": "Developer Tools",
        "title": "Securing the git push pipeline: Responding to a critical remote code execution vulnerability",
        "source": "GitHub Blog",
        "summary": "How we validated, fixed, and investigated a critical vulnerability in under two hours, and confirmed no exploitation. The post Securing the git push pipeline: Responding to a critical remote code execution vulnerability appeared first on The GitHub Blog .",
        "href": "https://github.blog/security/securing-the-git-push-pipeline-responding-to-a-critical-remote-code-execution-vulnerability/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/generic-security-logo-blocks-github.png",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "google-signs-ai-deal-with-the-pentagon-ignoring-069bc604-apr29",
        "category": "Developer Tools",
        "title": "Google signs AI deal with the Pentagon, ignoring protest from over 600 employees",
        "source": "The Decoder",
        "summary": "Despite an open letter from hundreds of employees, Google has signed a contract giving the U.S. Department of Defense access to its AI models for classified work. Legal experts say the contract's safety clauses aren't legally binding. The article Google signs...",
        "href": "https://the-decoder.com/google-signs-ai-deal-with-the-pentagon-ignoring-protest-from-over-600-employees/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/03/openai_anthropic_google_pentagon-scaled.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-magic-code-sniffer-more-swiss-cheese-5167d891-apr29",
        "category": "Developer Tools",
        "title": "Anthropic's magic code-sniffer: More Swiss cheese than cheddar, for now",
        "source": "The Register AI",
        "summary": "AI vuln-hunter finds what humans taught it to find. Funny that Opinion In retrospect, calling it Mythos made it a hostage to fortune. Anthropic may have hoped that the name implied its AI code security model had mythical god-like powers, but there's an altern...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/27/anthropics_magic_codesniffer_more_swiss/",
        "imageUrl": "https://regmedia.co.uk/2016/08/09/swisscheese.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-28",
    "label": "April 28, 2026",
    "items": [
      {
        "id": "eu-tells-google-to-open-up-ai-on-android-google-f50b6684-apr28",
        "category": "Model Releases",
        "title": "EU tells Google to open up AI on Android; Google says that's \"unwarranted intervention\"",
        "source": "Ars Technica",
        "summary": "Gemini gets preferential treatment on Android, but maybe not for long (in Europe).",
        "href": "https://arstechnica.com/ai/2026/04/europe-could-force-google-to-open-android-to-other-ai-assistants/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2025/06/Android-IO-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "deepseek-drops-cheaper-v4-ai-as-huawei-jumps-in-1be32509-apr28",
        "category": "Model Releases",
        "title": "DeepSeek Drops Cheaper V4 AI as Huawei Jumps In",
        "source": "TechRepublic AI",
        "summary": "DeepSeek launches V4 AI model with Huawei chip support, offering lower costs and intensifying global AI competition. The post DeepSeek Drops Cheaper V4 AI as Huawei Jumps In appeared first on TechRepublic .",
        "href": "https://www.techrepublic.com/article/news-apac-deepseek-v4-ai-model-huawei-ascend-chips-support/",
        "imageUrl": "assets/news/superhuman-personal-agents.png",
        "excerpt": "Radar signal: TechRepublic AI surfaced this item in the latest AI news window."
      },
      {
        "id": "claude-desktop-changes-app-access-settings-for-b-5346cad1-apr28",
        "category": "Product Updates",
        "title": "Claude Desktop changes app access settings for browsers you don't even have installed yet",
        "source": "The Register AI",
        "summary": "Installation and pre-approval without consent looks dubious under EU law One app should not modify another app without asking for and receiving your explicit consent. Yet Anthropic's Claude Desktop for macOS installs files that affect other vendors' applicati...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/20/anthropic_claude_desktop_spyware_allegation/",
        "imageUrl": "https://regmedia.co.uk/2024/05/01/shutterstock_generic_claude.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-launches-claude-managed-agents-to-spee-001ca1b8-apr28",
        "category": "Developer Tools",
        "title": "Anthropic launches Claude Managed Agents to speed up AI agent development",
        "source": "SiliconANGLE AI",
        "summary": "Anthropic PBC today launched Claude Managed Agents, a cloud service that customers can use to build artificial intelligence agents. The company says the offering shortens the development workflow from months to weeks. Deploying a production-grade agent requir...",
        "href": "https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/",
        "imageUrl": "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2026/04/Anthropic-1.png",
        "excerpt": "Radar signal: SiliconANGLE AI surfaced this item in the latest AI news window."
      },
      {
        "id": "samsungs-ultra-sleek-galaxy-book5-pro-360-just-g-2cd3b30c-apr28",
        "category": "Developer Tools",
        "title": "Samsungs ultra-sleek Galaxy Book5 Pro 360 just got a $450 price cut",
        "source": "Mashable",
        "summary": "As of April 27, you can get the 16-inch Samsung Galaxy Book5 Pro 360 Copilot+ PC for $1,549.99 at Amazon, down from $1,999.99.",
        "href": "https://mashable.com/article/april-27-samsung-16-inch-galaxy-book5-pro-deal",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/068BhF4nmhrTwgGBSt2Plzr/hero-image.fill.size_1200x675.v1777305678.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "github-copilot-is-moving-to-usage-based-billing-cf9076c7-apr28",
        "category": "Developer Tools",
        "title": "GitHub Copilot is moving to usage-based billing",
        "source": "GitHub Blog",
        "summary": "Starting June 1, your Copilot usage will consume GitHub AI Credits. The post GitHub Copilot is moving to usage-based billing appeared first on The GitHub Blog .",
        "href": "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/generic-invertocat-logo.png",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "this-bestselling-gaming-device-is-not-a-nintendo-2e78e196-apr28",
        "category": "Product Updates",
        "title": "This bestselling gaming device is not a Nintendo or a PlayStation - and I highly recommend it",
        "source": "ZDNet AI",
        "summary": "Nex Playground is a small cube that gets your kids up and moving with games they'll love - and it's on sale for the lowest price of the year.",
        "href": "https://www.zdnet.com/article/nex-playground-deal/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/fe9cccd470a86a596789e779d1ccca6761785445/2026/04/23/e345b90a-d463-4445-b138-4e28fcfa6222/img-1758.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "sixteen-new-start-nano-companies-are-developing-a1d9179a-apr28",
        "category": "Product Updates",
        "title": "Sixteen new START.nano companies are developing hard-tech solutions with the support of MIT.nano",
        "source": "MIT News AI",
        "summary": "Startup accelerator program grows to over 30 companies, almost half of them with MIT pedigrees.",
        "href": "https://news.mit.edu/2026/sixteen-new-startnano-companies-developing-hard-tech-solutions-with-mitnano-0407",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202603/mit-start.nano-Rheyo.jpg?itok=aj1qTyfA",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      },
      {
        "id": "samsung-wallet-just-got-a-travel-feature-that-i-c479a9a1-apr28",
        "category": "Product Updates",
        "title": "Samsung Wallet just got a travel feature that I hope Google Wallet copies ASAP",
        "source": "ZDNet AI",
        "summary": "This is a pretty big perk for Galaxy users since there's nothing like it built into Android.",
        "href": "https://www.zdnet.com/article/samsung-wallet-new-trips-travel-feature/",
        "imageUrl": "assets/news/fallback-google-ai-economy.webp",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "preview-tool-helps-makers-visualize-3d-printed-o-f9ec2638-apr28",
        "category": "Product Updates",
        "title": "Preview tool helps makers visualize 3D-printed objects",
        "source": "MIT News AI",
        "summary": "By quickly generating aesthetically accurate previews of fabricated objects, the VisiPrint system could make prototyping faster and less wasteful.",
        "href": "https://news.mit.edu/2026/preview-tool-helps-makers-visualize-3d-printed-objects-0401",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202603/MIT-VisiPrint-Preview-A1.jpg?itok=2ckh0mm0",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-ends-microsoft-legal-peril-over-its-50b-a-949fd0ad-apr28",
        "category": "Product Updates",
        "title": "OpenAI ends Microsoft legal peril over its $50B Amazon deal",
        "source": "TechCrunch",
        "summary": "OpenAI has won major concessions from its largest shareholder, Microsoft, that will allow it to sell products on AWS, while Microsoft gets more cash in a revenue-share agreement.",
        "href": "https://techcrunch.com/2026/04/27/openai-ends-microsoft-legal-peril-over-its-50b-amazon-deal/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2025/09/GettyImages-2214107176.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-and-openai-s-open-relationship-is-now-98b20a23-apr28",
        "category": "Product Updates",
        "title": "Microsoft and OpenAI's open relationship is now official",
        "source": "The Register AI",
        "summary": "No. More. Exclusivity. Redmond keeps the ring until 2032, but OpenAI is free to see other clouds Once tied tightly together, Microsoft and OpenAI have amended their agreement, making the Windows giant's license non-exclusive. In exchange, Microsoft will no lo...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/27/microsofts_and_openai_change_relationship/",
        "imageUrl": "https://regmedia.co.uk/2016/09/01/split-path.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "adobe-creative-cloud-pro-is-now-50-off-how-to-ge-c41e104b-apr28",
        "category": "Product Updates",
        "title": "Adobe Creative Cloud Pro is now 50% off - how to get the deal",
        "source": "ZDNet AI",
        "summary": "Get a year of access to more than 20 apps (including Photoshop and Premiere), generative AI, fonts, and Stock at a major discount right now.",
        "href": "https://www.zdnet.com/article/adobe-creative-cloud-pro-deal-2026/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/e0500b7a86a0eec0a0cb2d4f02fe954d1c07ce9c/2025/07/17/aceba0b1-a1b7-4da0-9e83-0bfeeec02b72/adobe-firefly.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "working-to-advance-the-nuclear-renaissance-50cb47c2-apr28",
        "category": "Research Workflows",
        "title": "Working to advance the nuclear renaissance",
        "source": "MIT News AI",
        "summary": "Dean Price, assistant professor in the Department of Nuclear Science and Engineering, sees a bright future for nuclear power, and believes AI can help us realize that vision.",
        "href": "https://news.mit.edu/2026/working-to-advance-nuclear-renaissance-dean-price-0403",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202603/MIT-nse-Dean-Price.jpg?itok=PuytMjyW",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-27",
    "label": "April 27, 2026",
    "items": [
      {
        "id": "deepseek-s-new-models-are-so-efficient-they-ll-r-47e5c1d3-apr27",
        "category": "Model Releases",
        "title": "DeepSeek's new models are so efficient they'll run on a toaster ... by which we mean Huawei's NPUs",
        "source": "The Register AI",
        "summary": "Now available in preview, DeepSeek V4 cuts inference costs to a fraction of R1 Chinese AI darling DeepSeek is back with a new open weights large language model that promises performance to rival the best proprietary American LLMs. Perhaps more importantly, it...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/24/deepseek_v4/",
        "imageUrl": "https://regmedia.co.uk/2025/01/27/shutterstock_deepseek_logo.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "build-with-deepseek-v4-using-nvidia-blackwell-an-d711d444-apr27",
        "category": "Model Releases",
        "title": "Build with DeepSeek V4 Using NVIDIA Blackwell and GPU-Accelerated Endpoints",
        "source": "NVIDIA Technical Blog AI",
        "summary": "DeepSeek just launched its fourth generation of flagship models with DeepSeek-V4-Pro and DeepSeek-V4-Flash, both targeted at enabling highly efficient...",
        "href": "https://developer.nvidia.com/blog/build-with-deepseek-v4-using-nvidia-blackwell-and-gpu-accelerated-endpoints/",
        "imageUrl": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/ai-model-representation-2-768x432.png",
        "excerpt": "Radar signal: NVIDIA Technical Blog AI surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-s-super-scary-bug-hunting-model-mythos-ca33a352-apr27",
        "category": "Model Releases",
        "title": "Anthropic's super-scary bug hunting model Mythos is shaping up to be a nothingburger",
        "source": "The Register AI",
        "summary": "Hackpocalypse deferred Anthropic's Mythos model is purportedly so good at finding vulnerabilities that the Claude-maker is afraid to make it available to the general public for fear that criminals will take advantage. But early analysis shows that Mythos may...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/22/anthropic_mythos_hype_nothingburger/",
        "imageUrl": "https://regmedia.co.uk/2026/04/22/nothingburger.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "top-7-benchmarks-that-actually-matter-for-agenti-936e2163-apr27",
        "category": "Developer Tools",
        "title": "Top 7 Benchmarks That Actually Matter for Agentic Reasoning in Large Language Models",
        "source": "MarkTechPost",
        "summary": "As AI agents move from research demos to production deployments, one question has become impossible to ignore: how do you actually know if an agent is good? Perplexity scores and MMLU leaderboard numbers tell you very little about whether a model can navigate...",
        "href": "https://www.marktechpost.com/2026/04/26/top-7-benchmarks-that-actually-matter-for-agentic-reasoning-in-large-language-models/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-1-19.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "a-coding-implementation-on-kvcached-for-elastic-601a6e5e-apr27",
        "category": "Developer Tools",
        "title": "A Coding Implementation on kvcached for Elastic KV Cache Memory, Bursty LLM Serving, and Multi-Model GPU Sharing",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we explore kvcached, a dynamic KV-cache implementation on top of vLLM, to understand how dynamic KV-cache allocation transforms GPU memory usage for large language models. We begin by setting up the environment and deploying lightweight Qwen...",
        "href": "https://www.marktechpost.com/2026/04/25/a-coding-implementation-on-kvcached-for-elastic-kv-cache-memory-bursty-llm-serving-and-multi-model-gpu-sharing/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-1-18-1024x731.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      },
      {
        "id": "microsoft-s-github-grounds-copilot-account-sign-aa931d7e-apr27",
        "category": "Developer Tools",
        "title": "Microsoft's GitHub grounds Copilot account sign-ups amid capacity crunch",
        "source": "The Register AI",
        "summary": "Remember what we promised when you subscribed for a year? Well, we've got a new deal that's better for us. Microsoft's GitHub has stopped accepting new Copilot individual subscriptions while the code hosting biz figures out how it can meet its service commitm...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/20/microsofts_github_grounds_copilot_account/",
        "imageUrl": "https://regmedia.co.uk/2025/09/05/githubcopilot.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "what-it-actually-takes-to-run-code-intelligence-92f4fdaa-apr27",
        "category": "Developer Tools",
        "title": "What it actually takes to run code intelligence in-house",
        "source": "Sourcegraph Blog",
        "summary": "We audited what it would take to build a Sourcegraph equivalent internally, mapped the platform to 90 engineering requirements across 10 categories, and modeled 3-year costs for different environment sizes.",
        "href": "http://localhost:5174/blog/what-it-actually-takes-to-run-code-intelligence-in-house",
        "imageUrl": "assets/news/openai-cyber-defense-local.jpg",
        "excerpt": "Radar signal: Sourcegraph Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "an-openai-linked-news-outlet-appears-to-be-entir-f96e586f-apr27",
        "category": "Product Updates",
        "title": "An OpenAI-linked news outlet appears to be entirely AI-generated",
        "source": "Mashable",
        "summary": "A new report reveals that a news publication is entirely AI-generated and is funded by an OpenAI super PAC",
        "href": "https://mashable.com/article/ai-generated-news-site-with-ties-to-openai",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/07ybnEadd6yFYEtJF4HIetm/hero-image.fill.size_1200x675.v1777217331.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-created-a-test-marketplace-for-agent-o-2032f932-apr27",
        "category": "Agents",
        "title": "Anthropic created a test marketplace for agent-on-agent commerce",
        "source": "TechCrunch",
        "summary": "In a recent experiment, Anthropic created a classified marketplace where AI agents represented both buyers and sellers, striking real deals for real goods and real money.",
        "href": "https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2023/08/GettyImages-88622588.jpg?resize=1200,870",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "our-principles-e1e83761-apr27",
        "category": "Developer Tools",
        "title": "Our principles",
        "source": "OpenAI Blog",
        "summary": "Our mission is to ensure that AGI benefits all of humanity. Sam Altman shares five principles that guide our work.",
        "href": "https://openai.com/index/our-principles",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/sOXwMmuOREhljTDZ4gVid/e277a6d0e6364e53591ac8b9c42de068/our-principles-16_9-text.png?w=1600&h=900&fit=fill",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "google-cloud-next-proves-what-we-suspected-every-d23a2b19-apr27",
        "category": "Developer Tools",
        "title": "Google Cloud Next proves what we suspected: Everything is AI now",
        "source": "The Register AI",
        "summary": "Join us for this week's Kettle as we dive into GCN and the latest not-so-alarming revelations about Mythos KETTLE If you needed further evidence that AI comes first in pretty much everything nowadays, look no further than this year's Google Cloud Next show, w...",
        "href": "https://go.theregister.com/feed/www.theregister.com/2026/04/27/google_cloud_next_proves_what/",
        "imageUrl": "https://regmedia.co.uk/2019/11/20/cloudnext.jpg",
        "excerpt": "Radar signal: The Register AI surfaced this item in the latest AI news window."
      },
      {
        "id": "github-acknowledges-recent-outages-cites-scaling-ca13eb58-apr27",
        "category": "Developer Tools",
        "title": "GitHub Acknowledges Recent Outages, Cites Scaling Challenges and Architectural Weaknesses",
        "source": "InfoQ AI",
        "summary": "GitHub has publicly addressed a series of recent availability and performance issues that disrupted services across its platform, attributing the incidents to rapid growth, architectural coupling, and limitations in handling system load. By Craig Risi",
        "href": "https://www.infoq.com/news/2026/04/github-outages-scaling/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/04/github-outages-scaling/en/headerimage/generatedHeaderImage-1776504516196.jpg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "a-coding-tutorial-on-datashader-on-rendering-mas-54312e72-apr27",
        "category": "Developer Tools",
        "title": "A Coding Tutorial on Datashader on Rendering Massive Datasets with High-Performance Python Visual Analytics",
        "source": "MarkTechPost",
        "summary": "In this tutorial, we explore Datashader, a powerful, high-performance visualization library for rendering massive datasets that quickly overwhelm traditional plotting tools. We work through its full rendering pipeline in Google Colab, starting from dense poin...",
        "href": "https://www.marktechpost.com/2026/04/25/a-coding-tutorial-on-datashader-on-rendering-massive-datasets-with-high-performance-python-visual-analytics/",
        "imageUrl": "https://www.marktechpost.com/wp-content/uploads/2026/04/blog-74-1024x731.png",
        "excerpt": "Radar signal: MarkTechPost surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-26",
    "label": "April 26, 2026",
    "items": [
      {
        "id": "us-programmer-job-growth-nearly-halved-since-cha-a0c91f63-apr26",
        "category": "Developer Tools",
        "title": "US programmer job growth nearly halved since ChatGPT launched, Fed study finds",
        "source": "The Decoder",
        "summary": "Programmers are among the professional groups whose everyday lives have changed the most as a result of generative AI. A new study by the Federal Reserve Board now provides evidence that this is also reflected in employment figures. The article US programmer...",
        "href": "https://the-decoder.com/us-programmer-job-growth-nearly-halved-since-chatgpt-launched-fed-study-finds/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/AI-Coding-Jobs-LLM-Nano-Banana-Pro-scaled.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "claude-can-now-connect-with-spotify-uber-and-a-l-c7cf805a-apr26",
        "category": "Product Updates",
        "title": "Claude can now connect with Spotify, Uber, and a lot more apps",
        "source": "Mashable",
        "summary": "Anthropic's Claude chatbot can now interface with a bunch of major apps, including Spotify and Uber.",
        "href": "https://mashable.com/article/anthropic-claude-connected-apps-spotify-uber-viator",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/01isVDzOf2lc7gajKn5rSub/hero-image.fill.size_1200x675.v1777045060.png",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "qwen3-6-27b-beats-much-larger-predecessor-on-mos-ef14ff9f-apr26",
        "category": "Developer Tools",
        "title": "Qwen3.6-27B beats much larger predecessor on most coding benchmarks",
        "source": "The Decoder",
        "summary": "Alibaba's new open-source model Qwen3.6-27B beats its 15-times-larger predecessor across coding benchmarks with just 27 billion parameters. The article Qwen3.6-27B beats much larger predecessor on most coding benchmarks appeared first on The Decoder .",
        "href": "https://the-decoder.com/qwen3-6-27b-beats-much-larger-predecessor-on-most-coding-benchmarks/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/3.6_27b_banner.jpg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "everything-announced-at-google-cloud-next-in-und-36e81898-apr26",
        "category": "Product Updates",
        "title": "Everything announced at Google Cloud Next in under 15 minutes",
        "source": "Mashable",
        "summary": "Catch all key announcements from Google Cloud Next, including AI breakthroughs and real-world applications from CEO Thomas Kurian.",
        "href": "https://mashable.com/video/google-cloud-next-keynote-ai-announcements",
        "imageUrl": "https://helios-i.mashable.com/imagery/videos/00GLSNYueCNbr1FqJm3ao6W/hero-image.fill.size_1200x675.v1776953973.webp",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "google-adk-for-java-1-0-introduces-new-app-and-p-c0534990-apr26",
        "category": "Agents",
        "title": "Google ADK for Java 1.0 Introduces New App and Plugin Architecture, External Tools Support, and More",
        "source": "InfoQ AI",
        "summary": "Google's Agent Development Kit for Java reached 1.0, introducing integrations with new external tools, a new app and plugin architecture, advanced context engineering, human-in-the-loop workflows, and more. By Sergio De Simone",
        "href": "https://www.infoq.com/news/2026/04/google-adk-1-0-new-architecture/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering",
        "imageUrl": "https://res.infoq.com/news/2026/04/google-adk-1-0-new-architecture/en/headerimage/google-adk-java-1-0-1776676782594.jpeg",
        "excerpt": "Radar signal: InfoQ AI surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-unveils-gpt-5-5-claims-a-new-class-of-int-a797a7b6-apr26",
        "category": "Developer Tools",
        "title": "OpenAI unveils GPT-5.5, claims a \"new class of intelligence\" at double the API price",
        "source": "The Decoder",
        "summary": "OpenAI has announced GPT-5.5, an agentic model designed to work through complex tasks autonomously by switching between multiple tools. The article OpenAI unveils GPT-5.5, claims a \"new class of intelligence\" at double the API price appeared first on The Deco...",
        "href": "https://the-decoder.com/openai-unveils-gpt-5-5-claims-a-new-class-of-intelligence-at-double-the-api-price/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/gpt-55_title.png",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      },
      {
        "id": "hack-the-ai-agent-build-agentic-ai-security-skil-ed860607-apr26",
        "category": "Developer Tools",
        "title": "Hack the AI agent: Build agentic AI security skills with the GitHub Secure Code Game",
        "source": "GitHub Blog",
        "summary": "Learn to find and exploit real-world agentic AI vulnerabilities through five progressive challenges in this free, open source game that over 10,000 developers have already used to sharpen their security skills. The post Hack the AI agent: Build agentic AI sec...",
        "href": "https://github.blog/security/hack-the-ai-agent-build-agentic-ai-security-skills-with-the-github-secure-code-game/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/generic-security-invertocat-blocks-copilot.png",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-says-stronger-ai-models-cut-better-dea-0778fd0e-apr26",
        "category": "Developer Tools",
        "title": "Anthropic says stronger AI models cut better deals, and the losers don't even notice",
        "source": "The Decoder",
        "summary": "Anthropic let 69 AI agents trade on behalf of employees in an internal marketplace for a week. Stronger models scored better deals, and the people stuck with weaker agents never noticed. If AI models start handling real transactions for humans, these dynamics...",
        "href": "https://the-decoder.com/anthropic-says-stronger-ai-models-cut-better-deals-and-the-losers-dont-even-notice/",
        "imageUrl": "https://the-decoder.com/wp-content/uploads/2026/04/anthropic_Deal_cash.jpeg",
        "excerpt": "Radar signal: The Decoder surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-25",
    "label": "April 25, 2026",
    "items": [
      {
        "id": "8-gemini-tips-for-organizing-your-space-and-life-ebab479a-apr25",
        "category": "Model Releases",
        "title": "8 Gemini tips for organizing your space (and life)",
        "source": "Google AI Blog",
        "summary": "Organize your home and digital space with Gemini. Use AI-powered tips for cleaning schedules, inbox decluttering, seasonal chores.",
        "href": "https://blog.google/products-and-platforms/products/gemini/gemini-spring-cleaning-tips/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_Spring_Cleaning_hero.max-600x600.format-webp.webp",
        "excerpt": "Radar signal: Google AI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "i-tried-chatgpt-images-2-0-a-fun-huge-leap-and-s-b7acfb7d-apr25",
        "category": "Model Releases",
        "title": "I tried ChatGPT Images 2.0: A fun, huge leap - and surprisingly useful for real work",
        "source": "ZDNet AI",
        "summary": "My ChatGPT Images 2.0 results were impressive, but occassionally wrong. Here's how it handles branding, text, and infographics.",
        "href": "https://www.zdnet.com/article/chatgpt-images-2-0-hands-on-test-fun-huge-useful-leap/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/8fcb62e4cc9663ab492bc3c8760256de778fffb0/2026/04/24/c453df52-cdd0-4636-bff4-2f4f934db934/gpt-images-2-0.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "deepseek-ai-deepep-82807d84-apr25",
        "category": "Developer Tools",
        "title": "deepseek-ai / DeepEP",
        "source": "github",
        "summary": "github reported: deepseek-ai / DeepEP",
        "href": "https://github.com/deepseek-ai/DeepEP",
        "imageUrl": "https://opengraph.githubassets.com/2bd3fd0fd8fd4d6df02e8ff1827d755e911b750a537cabf639abb04227306ed4/deepseek-ai/DeepEP",
        "excerpt": "Radar signal: github surfaced this item in the latest AI news window."
      },
      {
        "id": "x-custom-timelines-what-users-are-saying-about-t-22a514da-apr25",
        "category": "Product Updates",
        "title": "X custom timelines: What users are saying about the new feature",
        "source": "Mashable",
        "summary": "X just rolled out custom timelines for users, powered by the Grok AI tool. It's a similar tool to TweetDeck, which recently rebranded.",
        "href": "https://mashable.com/article/x-custom-timelines-user-reactions",
        "imageUrl": "https://helios-i.mashable.com/imagery/articles/03zOszGV6XbSdg3ohekPlBI/hero-image.fill.size_1200x675.v1776959717.jpg",
        "excerpt": "Radar signal: Mashable surfaced this item in the latest AI news window."
      },
      {
        "id": "how-i-used-claude-ai-to-plan-an-entire-hiking-tr-b737cac7-apr25",
        "category": "Product Updates",
        "title": "How I used Claude AI to plan an entire hiking trip to the Adirondacks in 30 minutes - for free",
        "source": "ZDNet AI",
        "summary": "Using Claude's interactive connections to third-party services such as TripAdvisor and AllTrails, I mapped a summer hiking trip, including trails, hotels, tours, and even a playlist to accompany us.",
        "href": "https://www.zdnet.com/article/claude-ai-connectors-hands-on-planning-a-trip/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/f4d69c176c88b648da5d2b330fdd0f3353026c58/2026/04/24/a0f8c640-c5b2-4972-8cb6-5365c99bb9e6/i-used-claude-ai-to-plan-a-hiking-trip-for-the-summer-heres-how-it-helped.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "deleteme-review-a-mostly-hands-off-service-for-c-c471aafd-apr25",
        "category": "Product Updates",
        "title": "DeleteMe review: A (mostly) hands-off service for cleaning up your digital footprint",
        "source": "ZDNet AI",
        "summary": "Tools like DeleteMe help remove your personal info online. Here's what they get right - and wrong.",
        "href": "https://www.zdnet.com/article/delete-me-review/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/889f65a98213b4dbd32f79c505e83b9d08318c6c/2026/03/18/bdfd0709-c65f-4fed-ae3b-ba7693009f3f/dsc09852.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "i-put-gpt-5-5-through-a-10-round-test-it-scored-17d478ac-apr25",
        "category": "Model Releases",
        "title": "I put GPT-5.5 through a 10-round test: It scored 93/100, losing points only for exuberance",
        "source": "ZDNet AI",
        "summary": "OpenAI's latest model delivers powerful results but sometimes ignores simple directions, creating a tension between intelligence and control.",
        "href": "https://www.zdnet.com/article/i-put-openai-gpt-5-5-through-a-10-round-test/",
        "imageUrl": "https://www.zdnet.com/a/img/resize/684ea15a26c6dd922df89a06dccb17544af22cbd/2026/04/24/e4dab768-0664-4150-a92f-be4744140f31/i-put-gpt-5-5-through-a-10-round-test-it-scored-93100-losing-points-only-for-exuberance.jpg?auto=webp&fit=crop&height=675&width=1200",
        "excerpt": "Radar signal: ZDNet AI surfaced this item in the latest AI news window."
      },
      {
        "id": "google-to-invest-up-to-40b-in-anthropic-in-cash-85c88209-apr25",
        "category": "Model Releases",
        "title": "Google to invest up to $40B in Anthropic in cash and compute",
        "source": "TechCrunch",
        "summary": "Google plans up to $40B investment in Anthropic as AI rivals race to secure massive compute capacity, following the limited release of its powerful, cybersecurity-focused Mythos model.",
        "href": "https://techcrunch.com/2026/04/24/google-to-invest-up-to-40b-in-anthropic-in-cash-and-compute/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/01/GettyImages-2252871842.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-24",
    "label": "April 24, 2026",
    "items": [
      {
        "id": "openai-s-gpt-5-5-is-here-and-it-s-no-potato-narr-a7cdb554-apr24",
        "category": "Developer Tools",
        "title": "OpenAI's GPT-5.5 is here, and it's no potato: narrowly beats Anthropic's Claude Mythos Preview on Terminal-Bench 2.0",
        "source": "VentureBeat",
        "summary": "After months of rumors and reports that OpenAI was developing a new, more powerful AI large language model for use in ChatGPT and through its application programming interface (API), allegedly codenamed \"Spud\" internally, the company has today unveiled its la...",
        "href": "https://venturebeat.com/technology/openais-gpt-5-5-is-here-and-its-no-potato-narrowly-beats-anthropics-claude-mythos-preview-on-terminal-bench-2-0",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/5rfSjmFTFGf8gVMCrgV4AB/32069c156a3d02d81b11c85fb64aa7c0/ChatGPT_Image_Apr_23__2026__01_47_16_PM.png?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "claude-is-connecting-directly-to-your-personal-a-9ab87d01-apr24",
        "category": "Product Updates",
        "title": "Claude is connecting directly to your personal apps like Spotify, Uber Eats, and TurboTax",
        "source": "The Verge AI",
        "summary": "Claude users can access more apps with Anthropic's AI now thanks to new connectors for everything from hiking to grocery shopping. Anthropic already supported connecting numerous work-related apps to Claude, like Microsoft apps, but this expansion focuses on...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/917871/anthropic-claude-personal-app-connectors",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/anthropic-claude-personal-apps.jpg?quality=90&strip=all&crop=0%2C3.4613147178592%2C100%2C93.077370564282&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "building-an-emoji-list-generator-with-the-github-4c4aa325-apr24",
        "category": "Developer Tools",
        "title": "Building an emoji list generator with the GitHub Copilot CLI",
        "source": "GitHub Blog",
        "summary": "See how we created an emoji list generator during the Rubber Duck Thursday stream. The post Building an emoji list generator with the GitHub Copilot CLI appeared first on The GitHub Blog .",
        "href": "https://github.blog/ai-and-ml/github-copilot/building-an-emoji-list-generator-with-the-github-copilot-cli/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/image-19.png?fit=2064%2C1076",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-says-its-new-gpt-5-5-model-is-more-effici-d8444b6c-apr24",
        "category": "Developer Tools",
        "title": "OpenAI says its new GPT-5.5 model is more efficient and better at coding",
        "source": "The Verge AI",
        "summary": "OpenAI just announced its new GPT-5.5 model, which the company calls its \"smartest and most intuitive to use model yet, and the next step toward a new way of getting work done on a computer.\" OpenAI just released GPT-5.4 last month, but says that the new GPT-...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/917612/openai-gpt-5-5-chatgpt",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/03/STK155_OPEN_AI_CVirginia__C.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "how-github-uses-ebpf-to-improve-deployment-safet-461eacea-apr24",
        "category": "Developer Tools",
        "title": "How GitHub uses eBPF to improve deployment safety",
        "source": "GitHub Blog",
        "summary": "Learn how Github uses eBPF to detect and prevent circular dependencies in its deployment tooling. The post How GitHub uses eBPF to improve deployment safety appeared first on The GitHub Blog .",
        "href": "https://github.blog/engineering/infrastructure/how-github-uses-ebpf-to-improve-deployment-safety/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/01/4ba0cd42388a255e04c78e5143548f22e577d68e0f15f68e6a3c76c18b927981-1920x1080-1.png?fit=1920%2C1080",
        "excerpt": "Radar signal: GitHub Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "google-and-aws-split-the-ai-agent-stack-between-239549f6-apr24",
        "category": "Developer Tools",
        "title": "Google and AWS split the AI agent stack between control and execution",
        "source": "VentureBeat",
        "summary": "The era of enterprises stitching together prompt chains and shadow agents is nearing its end as more options for orchestrating complex multi-agent systems emerge. As organizations move AI agents into production, the question remains: \"how will we manage them?...",
        "href": "https://venturebeat.com/orchestration/google-and-aws-split-the-ai-agent-stack-between-control-and-execution",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/1Vp25PZDnQQMBBb7WLhth0/f565b23d4dfbc56def7a55fae6405769/crimedy7_illustration_of_a_schism_but_related_to_artificial_i_2d035a47-60c4-4cab-9029-d5ee39e3dbdc_0.png?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "a-philosophy-of-work-45b651f2-apr24",
        "category": "Research Workflows",
        "title": "A philosophy of work",
        "source": "MIT News AI",
        "summary": "As the NC Ethics of Technology Postdoctoral Fellow, Michal Masny is advancing dialogue, teaching, and research into the social and ethical dimensions of new computing technologies.",
        "href": "https://news.mit.edu/2026/philosophy-work-michal-masny-0409",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202603/mit-philosophy-Michal-Masny.jpg?itok=W40Yn7Ni",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      },
      {
        "id": "jacob-andreas-and-brett-mcguire-named-edgerton-a-ed506815-apr24",
        "category": "Research Workflows",
        "title": "Jacob Andreas and Brett McGuire named Edgerton Award winners",
        "source": "MIT News AI",
        "summary": "The associate professors of EECS and chemistry, respectively, are honored for exceptional contributions to teaching, research, and service at MIT.",
        "href": "https://news.mit.edu/2026/jacob-andreas-brett-mcguire-edgerton-award-winners-0417",
        "imageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__cover_image__original/public/images/202604/mit-Edgerton-Award-Brett-McGuire-Jacob-Andreas.jpg?itok=m8C4mGM-",
        "excerpt": "Radar signal: MIT News AI surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-23",
    "label": "April 23, 2026",
    "items": [
      {
        "id": "google-turns-chrome-into-an-ai-co-worker-for-the-eb5b1403-apr23",
        "category": "Model Releases",
        "title": "Google turns Chrome into an AI co-worker for the workplace",
        "source": "TechCrunch",
        "summary": "Google brings Gemini-powered \"auto browse\" capabilities to Chrome for enterprise users, letting workers automate tasks like research, data entry, and more.",
        "href": "https://techcrunch.com/2026/04/22/google-turns-chrome-into-an-ai-coworker-for-the-workplace/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/02/google-chrome-GettyImages-2151457378.jpg?w=1024",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-now-lets-teams-make-custom-bots-that-can-dc7155f8-apr23",
        "category": "Agents",
        "title": "OpenAI now lets teams make custom bots that can do work on their own",
        "source": "The Verge AI",
        "summary": "OpenAI is giving users of its Business, Enterprise, Edu, and Teachers plans access to cloud-based \"workspace\" agents available in ChatGPT that can perform business tasks. In its blog post, OpenAI gives examples of agents like one that finds product feedback o...",
        "href": "https://www.theverge.com/ai-artificial-intelligence/917065/openai-chatgpt-workspace-agents-custom-teams-bots",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/08/STK155_OPEN_AI_4_CVirginia_B.png?quality=90&strip=all&crop=0%2C10.742221417566%2C100%2C78.515557164868&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "openai-unveils-workspace-agents-a-successor-to-c-b9e31bbb-apr23",
        "category": "Developer Tools",
        "title": "OpenAI unveils Workspace Agents, a successor to custom GPTs for enterprises that can plug directly into Slack, Salesfor...",
        "source": "VentureBeat",
        "summary": "OpenAI introduced a new paradigm and product today that is likely to have huge implications for enterprises seeking to adopt and control fleets of AI agent workers. Called \" Workspace Agents ,\" OpenAI's new offering essentially allows users on its ChatGPT Bus...",
        "href": "https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more",
        "imageUrl": "https://images.ctfassets.net/jdtwqhzvc2n1/4Xdu5CqjmyRwz1NBaDX14Z/b43e969be10254ca838bf1ad60a187a6/ChatGPT_Image_Apr_22__2026__07_40_47_PM.png?w=300&q=30",
        "excerpt": "Radar signal: VentureBeat surfaced this item in the latest AI news window."
      },
      {
        "id": "anthropic-tested-removing-claude-code-from-the-p-23f26317-apr23",
        "category": "Developer Tools",
        "title": "Anthropic tested removing Claude Code from the Pro plan",
        "source": "Ars Technica",
        "summary": "Untenable demand has Anthropic exploring new approaches to rationing its service.",
        "href": "https://arstechnica.com/ai/2026/04/anthropic-tested-removing-claude-code-from-the-pro-plan/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/03/claude-code-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      },
      {
        "id": "spacex-cuts-a-deal-to-maybe-buy-cursor-for-60-bi-9afd97e3-apr23",
        "category": "Developer Tools",
        "title": "SpaceX cuts a deal to maybe buy Cursor for $60 billion",
        "source": "The Verge AI",
        "summary": "With an IPO looming for Elon Musk's SpaceX / xAI / X combo platter of companies, SpaceX has announced an odd arrangement to either acquire the automated programming platform Cursor for $60 billion or pay a fee of $10 billion. Buying this startup that's focuse...",
        "href": "https://www.theverge.com/science/916427/spacex-cursor-potential-deal-acquisition",
        "imageUrl": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/05/STKB355_SPACEX_C.jpg?quality=90&strip=all&crop=0%2C9.9676601489831%2C100%2C80.064679702034&w=1200",
        "excerpt": "Radar signal: The Verge AI surfaced this item in the latest AI news window."
      },
      {
        "id": "how-spacex-preempted-a-2b-fundraise-with-a-60b-b-cd30cad5-apr23",
        "category": "Funding",
        "title": "How SpaceX preempted a $2B fundraise with a $60B buyout offer",
        "source": "TechCrunch",
        "summary": "Cursor was on track to close a $2 billion funding round this week but chose to halt discussions after SpaceX offered a $10 billion \"collaboration fee\" and a path to a $60 billion acquisition.",
        "href": "https://techcrunch.com/2026/04/22/how-spacex-preempted-a-2b-fundraise-with-a-60b-buyout-offer/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2025/12/Anysphere-Cursor-Michael-Truell-.png?resize=1200,745",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "google-updates-workspace-to-make-ai-your-new-off-0d19c608-apr23",
        "category": "Product Updates",
        "title": "Google updates Workspace to make AI your new office intern",
        "source": "TechCrunch",
        "summary": "Google has introduced a host of new automated functions into Workspace, all of which are driven by Workspace Intelligence, its new AI system.",
        "href": "https://techcrunch.com/2026/04/22/google-updates-workspace-to-make-ai-your-new-office-intern/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/01/google-gemini-jagmeet-singh-techcrunch.jpg?resize=1200,800",
        "excerpt": "Radar signal: TechCrunch surfaced this item in the latest AI news window."
      },
      {
        "id": "mozilla-anthropic-s-mythos-found-271-security-vu-180e24d3-apr23",
        "category": "Model Releases",
        "title": "Mozilla: Anthropic's Mythos found 271 security vulnerabilities in Firefox 150",
        "source": "Ars Technica",
        "summary": "CTO says new AI model is \"every bit as capable\" as world's best security researchers.",
        "href": "https://arstechnica.com/ai/2026/04/mozilla-anthropics-mythos-found-271-zero-day-vulnerabilities-in-firefox-150/",
        "imageUrl": "https://cdn.arstechnica.net/wp-content/uploads/2026/04/GettyImages-2235759925-1152x648.jpg",
        "excerpt": "Radar signal: Ars Technica surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-22",
    "label": "April 22, 2026",
    "items": [
      {
        "id": "scaling-codex-to-enterprises-worldwide-d9639e2f-apr22",
        "category": "Developer Tools",
        "title": "Scaling Codex to enterprises worldwide",
        "source": "OpenAI Blog",
        "summary": "OpenAI launches Codex Labs, partners with with Accenture, PwC, Infosys, and others to help enterprises deploy and scale Codex across the software development lifecycle, and hits 4M Codex WAU.",
        "href": "https://openai.com/index/scaling-codex-to-enterprises-worldwide",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/6vVWsdD8Je8NBRf5rzcKgO/627fd8bf52395077f3ed200aaeb615b9/Frame.png?w=1600&h=900&fit=fill",
        "excerpt": "Radar signal: OpenAI Blog surfaced this item in the latest AI news window."
      },
      {
        "id": "3-new-ways-ads-advisor-is-making-google-ads-safe-97921ff3-apr22",
        "category": "Agents",
        "title": "3 new ways Ads Advisor is making Google Ads safer and faster",
        "source": "Google AI Blog",
        "summary": "Three new agentic safety and policy features integrated into Ads Advisor will help protect and streamline your Google Ads account.",
        "href": "https://blog.google/products/ads-commerce/ads-advisor-google-ads/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Road_to_GML_Master-Header.max-600x600.format-webp.webp",
        "excerpt": "Radar signal: Google AI Blog surfaced this item in the latest AI news window."
      }
    ]
  },
  {
    "date": "2026-04-21",
    "label": "April 21, 2026",
    "items": [
      {
        "id": "google-gemini-cli-subagents-apr21",
        "category": "Developer Tools",
        "title": "Subagents have arrived in Gemini CLI",
        "source": "Google Developers Blog",
        "summary": "Google added subagent support to Gemini CLI so developers can delegate narrower tasks inside the command-line workflow instead of relying on one long monolithic session.",
        "href": "https://developers.googleblog.com/en/subagents-have-arrived-in-gemini-cli/",
        "imageUrl": "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_CLI_subagents_hero_image.original.png",
        "excerpt": "Why it matters: coding agents are moving toward multi-agent orchestration inside the developer tools teams already use."
      },
      {
        "id": "openai-hyatt-enterprise-adoption-apr21",
        "category": "Productivity",
        "title": "OpenAI helps Hyatt advance AI among colleagues",
        "source": "OpenAI",
        "summary": "OpenAI said Hyatt is extending ChatGPT Enterprise across more employee workflows to speed up research, writing, and operational knowledge sharing.",
        "href": "https://openai.com/index/hyatt-advances-ai-with-chatgpt-enterprise",
        "imageUrl": "assets/news/home-briefing/2026-04-21/industry-9647c8d154c78f6b.webp",
        "excerpt": "Why it matters: enterprise AI adoption is increasingly measured by organization-wide usage, not just isolated pilot teams."
      },
      {
        "id": "anthropic-firefox-security-apr21",
        "category": "Safety",
        "title": "Partnering with Mozilla to improve Firefox's security",
        "source": "Anthropic",
        "summary": "Anthropic said it is working with Mozilla to strengthen Firefox security workflows with Claude-backed assistance for threat analysis and defensive review.",
        "href": "https://www.anthropic.com/news/mozilla-firefox-security",
        "imageUrl": "https://www.anthropic.com/api/opengraph-illustration?name=Object%20Desktop&backgroundColor=coral",
        "excerpt": "Why it matters: frontier model vendors are pushing deeper into real security operations where trust and guardrails matter as much as raw capability."
      },
      {
        "id": "github-copilot-plans-individuals-apr21",
        "category": "Product Updates",
        "title": "Changes to GitHub Copilot plans for individuals",
        "source": "GitHub Changelog",
        "summary": "GitHub detailed plan changes for individual Copilot users, updating how model access, premium capabilities, and usage are packaged across paid tiers.",
        "href": "https://github.blog/changelog/2026-04-20-changes-to-github-copilot-plans-for-individuals/",
        "imageUrl": "https://github.blog/wp-content/themes/github-2021-child/dist/img/social-v3-deprecations.jpg",
        "excerpt": "Why it matters: pricing and packaging shifts often reveal where real demand and cost pressure are landing in AI coding."
      },
      {
        "id": "github-copilot-visual-studio-march-apr21",
        "category": "Developer Tools",
        "title": "Copilot in Visual Studio: March update",
        "source": "GitHub Changelog",
        "summary": "GitHub rolled new Copilot improvements into Visual Studio, adding model and chat workflow updates that keep more coding assistance inside the IDE.",
        "href": "https://github.blog/changelog/2026-04-02-github-copilot-in-visual-studio-march-update/",
        "imageUrl": "https://github.blog/wp-content/themes/github-2021-child/assets/img/featured-v3-new-releases.svg",
        "excerpt": "Why it matters: IDE-native Copilot updates show how the coding-agent race is expanding beyond the browser and terminal into incumbent desktop workflows."
      },
      {
        "id": "google-adk-skills-guide-apr21",
        "category": "Agents",
        "title": "Developer's guide to building ADK agents with skills",
        "source": "Google Developers Blog",
        "summary": "Google published a practical guide for wiring reusable skills into ADK agents, showing how teams can structure, compose, and extend agent behaviors more systematically.",
        "href": "https://developers.googleblog.com/en/developers-guide-to-building-adk-agents-with-skills/",
        "imageUrl": "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/GoogleI_O_2025_Google_AI_Studio_-_4.original.png",
        "excerpt": "Why it matters: agent builders increasingly differentiate on reusable skills and orchestration patterns, not just on model choice."
      },
      {
        "id": "mit-autonomous-systems-ethics-apr21",
        "category": "Policy",
        "title": "Evaluating the ethics of autonomous systems",
        "source": "MIT News",
        "summary": "MIT researchers outlined a framework for evaluating autonomous systems through an ethics lens, focusing on how AI systems are assessed before higher-stakes deployment.",
        "href": "https://news.mit.edu/2026/evaluating-autonomous-systems-ethics-0402",
        "imageUrl": "assets/news/home-briefing/2026-04-21/semiconductor-0fd8099e8d5afd55.jpg",
        "excerpt": "Why it matters: governance pressure is rising alongside capability, so evaluation frameworks are becoming part of the product stack."
      },
      {
        "id": "aws-infor-manufacturing-agents-apr21",
        "category": "Productivity",
        "title": "Infor and AWS bring agentic AI to manufacturing at enterprise scale",
        "source": "About Amazon",
        "summary": "Infor and AWS said they are bringing agentic AI into manufacturing software flows so teams can connect enterprise data, automation, and operations decisions more directly.",
        "href": "https://press.aboutamazon.com/aws/2026/4/infor-and-aws-bring-agentic-ai-to-manufacturing-at-enterprise-scale",
        "imageUrl": "assets/news/home-briefing/2026-04-21/ai-95d05136322902a2.jpg",
        "excerpt": "Why it matters: enterprise AI is shifting from standalone copilots toward agents embedded in line-of-business systems."
      },
      {
        "id": "mit-data-center-performance-apr21",
        "category": "Research Workflows",
        "title": "Helping data centers deliver higher performance with less hardware",
        "source": "MIT News",
        "summary": "MIT researchers described a method for improving data-center performance with less hardware, aiming to cut system overhead while keeping AI infrastructure efficient at scale.",
        "href": "https://news.mit.edu/2026/helping-data-centers-deliver-higher-performance-less-hardware-0407",
        "imageUrl": "https://news.mit.edu/sites/default/files/images/202604/MIT-DataCenter-Variable-01-press.jpg",
        "excerpt": "Why it matters: AI infrastructure gains increasingly come from efficiency work that squeezes more throughput from existing compute."
      },
      {
        "id": "aws-shi-indiaai-mission-apr21",
        "category": "Infrastructure",
        "title": "AWS collaborates with SHI India to enable AI infrastructure for IndiaAI Mission",
        "source": "About Amazon",
        "summary": "AWS and SHI India said they will support IndiaAI Mission infrastructure with cloud and AI stack capacity aimed at expanding national access to model training and deployment resources.",
        "href": "https://press.aboutamazon.com/aws/2026/4/aws-collaborates-with-shi-india-to-enable-ai-infrastructure-for-indiaai-mission",
        "imageUrl": "assets/news/home-briefing/2026-04-21/ai-29a5991b5dde7cfd.png",
        "excerpt": "Why it matters: compute availability remains a bottleneck, so infrastructure deals are becoming strategic AI news in their own right."
      }
    ]
  },
  {
    "date": "2026-04-20",
    "label": "April 20, 2026",
    "items": [
      {
        "id": "google-gemini-api-tooling-update-apr20",
        "category": "Agents",
        "title": "Gemini API gets a tooling update with richer agent workflow controls",
        "source": "Google Blog",
        "summary": "Google added context circulation, mixed tool calling, and Google Maps grounding for Gemini so developers can build more capable agent workflows without stitching together as much orchestration logic by hand.",
        "href": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tooling-updates/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini_api_qh8fnpL.png",
        "excerpt": "Why it matters: agent builders increasingly compete on workflow plumbing and tool orchestration, not only on raw model quality."
      },
      {
        "id": "openai-cloudflare-agent-cloud-apr20",
        "category": "Agents",
        "title": "Enterprises power agentic workflows in Cloudflare Agent Cloud with OpenAI",
        "source": "OpenAI",
        "summary": "OpenAI said Cloudflare is bringing frontier OpenAI models into Agent Cloud so enterprises can deploy GPT-5.4 and Codex-powered agents inside production-ready edge and sandbox workflows.",
        "href": "https://openai.com/index/cloudflare-openai-agent-cloud/",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/6g5hzhOoHM68zGjNYQ5H1D/344bc6c2f06a8b0793e9becffd4c8bc9/Cloudflare_OpenAI_art_card_1x1.png?fm=webp&q=90&w=3840",
        "excerpt": "Why it matters: enterprise agent adoption is shifting from demos into hosted infrastructure where deployment, governance, and latency matter as much as model access."
      },
      {
        "id": "anthropic-project-glasswing-apr20",
        "category": "Safety",
        "title": "Anthropic launches Project Glasswing to secure critical software with frontier AI",
        "source": "Anthropic",
        "summary": "Anthropic launched Project Glasswing to give critical software defenders early access to Claude Mythos Preview and broader support for vulnerability discovery and remediation work.",
        "href": "https://www.anthropic.com/project/glasswing",
        "imageUrl": "https://www-cdn.anthropic.com/images/4zrzovbb/website/99ba671b072be2357accfbe53a46fe230ec55974-896x109.svg",
        "excerpt": "Why it matters: frontier labs are using gated deployments and industry coalitions to push advanced cybersecurity capability toward defense before offense catches up."
      },
      {
        "id": "github-remote-cli-sessions-apr20",
        "category": "Agents",
        "title": "Remote control CLI sessions on web and mobile enter public preview",
        "source": "GitHub Changelog",
        "summary": "GitHub introduced remote control for Copilot CLI sessions so developers can monitor, steer, and continue an active coding-agent session from github.com or the GitHub mobile apps.",
        "href": "https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/CLIOnTheGo_NewRelease_Header_v07.png?resize=2064%2C1096",
        "excerpt": "Why it matters: coding agents are becoming persistent, cross-device workflows rather than tools that only live inside one local terminal window."
      },
      {
        "id": "github-copilot-merge-conflicts-apr20",
        "category": "Agents",
        "title": "GitHub lets Copilot cloud agent fix merge conflicts in three clicks",
        "source": "GitHub Changelog",
        "summary": "GitHub added a new Fix with Copilot flow on github.com so Copilot cloud agent can resolve merge conflicts, validate the branch, and push the updated result from its own cloud workspace.",
        "href": "https://github.blog/changelog/2026-04-13-fix-merge-conflicts-in-three-clicks-with-copilot-cloud-agent/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/575938695-8e566049-d128-4a4c-86e2-a122346dcfaa.jpeg?resize=2064%2C1096",
        "excerpt": "Why it matters: software teams increasingly want coding agents to own annoying workflow repair work, not just code generation."
      },
      {
        "id": "openai-trusted-access-cyber-apr20",
        "category": "Safety",
        "title": "Trusted access for the next era of cyber defense",
        "source": "OpenAI",
        "summary": "OpenAI detailed how it is scaling Trusted Access for Cyber, including expanded defender verification and a more cyber-permissive GPT-5.4-Cyber path for higher-trust use cases.",
        "href": "https://openai.com/index/scaling-trusted-access-for-cyber-defense/",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/50UlqbAamecQ6xsNAt3Qu0/8f6f87823b796b6860606a4a42efe4af/Scaling_our_trusted_access_program_for_cyber_defense_1x1.png?fm=webp&q=90&w=3840",
        "excerpt": "Why it matters: advanced cyber models are being rolled out through increasingly granular access tiers instead of one-size-fits-all availability."
      },
      {
        "id": "openai-cyber-ecosystem-apr20",
        "category": "Safety",
        "title": "OpenAI expands its cyber defense ecosystem with more defenders and grants",
        "source": "OpenAI",
        "summary": "OpenAI expanded its Trusted Access for Cyber efforts with new enterprise security participants, broader grant support, and more pathways for defenders working on critical digital infrastructure.",
        "href": "https://openai.com/index/accelerating-cyber-defense-ecosystem/",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/1TzwLMgMx0r6t1GQsFAiHH/ff5d38b5bc11d22a2442bb0f151ee83f/accelerating-cyber-defense-ecosystem-1x1.png?fm=webp&q=90&w=3840",
        "excerpt": "Why it matters: frontier AI deployment is increasingly tied to who can safely use more capable models and how fast those safeguards can scale with demand."
      },
      {
        "id": "mit-overconfident-llms-apr20",
        "category": "Safety",
        "title": "A better method for identifying overconfident large language models",
        "source": "MIT News",
        "summary": "MIT researchers introduced a method for spotting when language models are overconfident, aiming to give developers a better way to judge uncertainty before those systems are trusted in higher-stakes settings.",
        "href": "https://news.mit.edu/2026/better-method-identifying-overconfident-large-language-models-0319",
        "imageUrl": "https://news.mit.edu/sites/default/files/download/202603/MIT-LLMUncertainty-01-press.jpg",
        "excerpt": "Why it matters: model adoption increasingly depends on better uncertainty signals, not just better benchmark scores."
      },
      {
        "id": "openai-child-safety-blueprint-apr20",
        "category": "Policy",
        "title": "OpenAI introduces the Child Safety Blueprint",
        "source": "OpenAI",
        "summary": "OpenAI published a new child-safety framework focused on AI-enabled exploitation risks, combining policy proposals, reporting improvements, and safety-by-design measures.",
        "href": "https://openai.com/index/introducing-child-safety-blueprint/",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/5zGHUj1XpRugjiLTazgjCE/711bf4de1f14a1b2708ab1279a4a1b0e/Frame__9_.png?fm=webp&q=90&w=3840",
        "excerpt": "Why it matters: AI providers are pairing model launches with more explicit policy and enforcement frameworks for high-risk misuse domains."
      },
      {
        "id": "mit-warehouse-robot-traffic-apr20",
        "category": "Research Workflows",
        "title": "AI system learns to keep warehouse robot traffic running smoothly",
        "source": "MIT News",
        "summary": "MIT researchers built a learning system that helps warehouse robots avoid traffic jams and keep more autonomous machines moving efficiently through busy fulfillment environments.",
        "href": "https://news.mit.edu/2026/ai-system-keeps-warehouse-robot-traffic-running-smoothly-0326",
        "imageUrl": "https://news.mit.edu/sites/default/files/images/202603/MIT-AI-Robot-Traffic-01-press_0.jpg",
        "excerpt": "Why it matters: practical AI gains often come from making robotics systems more reliable inside real operational bottlenecks rather than from headline model launches alone."
      }
    ]
  },
  {
    "date": "2026-04-19",
    "label": "April 19, 2026",
    "items": [
      {
        "id": "google-prepay-gemini-api-spend-control-apr19",
        "category": "Developer Tools",
        "title": "Prepay for the Gemini API to get more control over your spend",
        "source": "Google Blog",
        "summary": "Google introduced prepaid Gemini API credits so developers can manage budgets more tightly and get clearer control over AI infrastructure spend before usage accrues.",
        "href": "https://blog.google/innovation-and-ai/technology/developers-tools/prepay-gemini-api/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/API_Hero_409.width-200.format-webp.webp",
        "excerpt": "Why it matters: as model costs become a line-item decision, pricing controls and billing flexibility are becoming product features in their own right."
      },
      {
        "id": "google-gemini-3d-models-charts-apr19",
        "category": "Creative AI",
        "title": "Generate 3D models and interactive charts with the Gemini app",
        "source": "Google Blog",
        "summary": "Google expanded the Gemini app so users can create 3D models and interactive charts directly from prompts, pushing the product further into visual and data-rich creation tasks.",
        "href": "https://blog.google/innovation-and-ai/products/gemini-app/3d-models-charts/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/1_Visualize_how_fractals_work.width-100.format-webp.webp",
        "excerpt": "Why it matters: consumer AI assistants are steadily broadening from text chat into richer visual outputs that can slot into real workflows faster."
      },
      {
        "id": "anthropic-claude-partner-network-100m-apr19",
        "category": "Product Updates",
        "title": "Anthropic invests $100 million into the Claude Partner Network",
        "source": "Anthropic",
        "summary": "Anthropic launched the Claude Partner Network with a $100 million commitment to help partner organizations support enterprise adoption of Claude.",
        "href": "https://www.anthropic.com/news/claude-partner-network",
        "imageUrl": "https://www.anthropic.com/api/opengraph-illustration?name=Hand%20ShapeBuild&backgroundColor=fig",
        "excerpt": "Why it matters: frontier model vendors are scaling through service ecosystems and implementation partners, not just direct product sales."
      },
      {
        "id": "github-copilot-sdk-preview-builders-apr19",
        "category": "Developer Tools",
        "title": "Copilot SDK enters public preview for app and workflow builders",
        "source": "GitHub Changelog",
        "summary": "GitHub opened the Copilot SDK in public preview so teams can embed Copilot's agentic capabilities more directly into their own apps, workflows, and platform services.",
        "href": "https://github.blog/changelog/2026-04-02-copilot-sdk-in-public-preview/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/SDK_Header_02.jpg",
        "excerpt": "Why it matters: agent platforms are moving from standalone products into infrastructure that other software teams can wire into their own surfaces."
      },
      {
        "id": "github-copilot-org-custom-instructions-ga-apr19",
        "category": "Developer Tools",
        "title": "GitHub makes organization-wide Copilot custom instructions generally available",
        "source": "GitHub Changelog",
        "summary": "GitHub made organization custom instructions generally available for Copilot Business and Enterprise so admins can steer default assistant behavior across teams.",
        "href": "https://github.blog/changelog/2026-04-02-copilot-organization-custom-instructions-are-generally-available/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/572677531-cfdf4f07-d114-4890-a5b6-f29375dea4fe.jpeg",
        "excerpt": "Why it matters: enterprise AI rollouts increasingly depend on shared defaults and governance controls, not just individual user prompts."
      },
      {
        "id": "aws-openai-strategic-partnership-apr19",
        "category": "Product Updates",
        "title": "AWS and OpenAI announce multi-year strategic partnership",
        "source": "About Amazon",
        "summary": "AWS and OpenAI announced a multi-year partnership that will put advanced OpenAI workloads on AWS infrastructure as the companies deepen their cloud relationship.",
        "href": "https://www.aboutamazon.com/news/aws/aws-open-ai-workloads-compute-infrastructure",
        "imageUrl": "https://assets.aboutamazon.com/dims4/default/1704cd2/2147483647/strip/true/crop/1999x1000+0+42/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fa3%2Fce%2F7e1631f748beb430293b8a60d80c%2Foai-aws-hero.png",
        "excerpt": "Why it matters: infrastructure alliances are becoming a strategic lever for model labs trying to secure compute and distribution at scale."
      },
      {
        "id": "anthropic-google-broadcom-compute-apr19",
        "category": "Product Updates",
        "title": "Anthropic expands partnership with Google and Broadcom for next-generation compute",
        "source": "Anthropic",
        "summary": "Anthropic said it is expanding work with Google and Broadcom to secure multiple gigawatts of next-generation compute for future model development and deployment.",
        "href": "https://www.anthropic.com/news/google-broadcom-partnership-compute",
        "imageUrl": "https://www.anthropic.com/api/opengraph-illustration?name=Object%20Growth&backgroundColor=fig",
        "excerpt": "Why it matters: compute access remains one of the clearest strategic bottlenecks in the frontier model race."
      },
      {
        "id": "google-colab-learn-mode-coding-tutor-apr19",
        "category": "Developer Tools",
        "title": "Introducing Learn Mode: your personal coding tutor in Google Colab",
        "source": "Google Blog",
        "summary": "Google launched Learn Mode in Colab to guide users through code and notebook workflows with more tutor-like step-by-step support instead of only returning direct answers.",
        "href": "https://blog.google/innovation-and-ai/technology/developers-tools/colab-updates/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/ColabLearning_hero.width-200.format-webp.webp",
        "excerpt": "Why it matters: AI coding products are increasingly differentiating on teaching and guidance, not just raw task completion."
      },
      {
        "id": "google-chrome-skills-one-click-prompts-apr19",
        "category": "Developer Tools",
        "title": "Turn your best AI prompts into one-click tools in Chrome",
        "source": "Google Blog",
        "summary": "Google added a new Chrome workflow that turns saved prompts into reusable one-click tools so users can trigger repeatable AI actions without rebuilding prompts each time.",
        "href": "https://blog.google/products-and-platforms/products/chrome/skills-in-chrome/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Chrome_Skills_Asset_5_Library_V2_.width-100.format-webp.webp",
        "excerpt": "Why it matters: browser-native AI is shifting from one-off prompting toward lightweight workflow automation that users can keep close to where work already happens."
      },
      {
        "id": "mit-shass-future-education-ai-apr19",
        "category": "Policy",
        "title": "Q&A: MIT SHASS and the future of education in the age of AI",
        "source": "MIT News",
        "summary": "MIT's School of Humanities, Arts, and Social Sciences argued that human understanding and broad education matter even more as AI reshapes how students learn and work.",
        "href": "https://news.mit.edu/2026/qa-mit-shass-and-future-of-education-age-ai-0414",
        "imageUrl": "https://news.mit.edu/sites/default/files/images/202603/mit-shass-agustin-rayo.jpg",
        "excerpt": "Why it matters: the education debate around AI is moving from novelty tools to the long-term shape of how people think, learn, and reason."
      },
      {
        "id": "anthropic-institute-launch-apr19",
        "category": "Policy",
        "title": "Introducing The Anthropic Institute",
        "source": "Anthropic",
        "summary": "Anthropic launched The Anthropic Institute as a new effort focused on preparing for the broader societal challenges created by more powerful AI systems.",
        "href": "https://www.anthropic.com/news/the-anthropic-institute",
        "imageUrl": "https://www.anthropic.com/api/opengraph-illustration?name=Object%20Book&backgroundColor=oat",
        "excerpt": "Why it matters: labs are increasingly building public-policy and governance arms alongside product and research teams."
      },
      {
        "id": "mit-compressm-leaner-faster-models-apr19",
        "category": "Research Workflows",
        "title": "New technique makes AI models leaner and faster while they are still learning",
        "source": "MIT News",
        "summary": "MIT researchers introduced CompreSSM, a method that trims model complexity during training so AI systems can keep learning while becoming leaner and more efficient.",
        "href": "https://news.mit.edu/2026/new-technique-makes-ai-models-leaner-faster-while-still-learning-0409",
        "imageUrl": "https://news.mit.edu/sites/default/files/images/202603/mit-csail-compressm.jpg",
        "excerpt": "Why it matters: efficiency work is becoming a core frontier in AI because it cuts compute cost without waiting for the next giant model release."
      },
      {
        "id": "aws-modmed-ai-powered-practice-apr19",
        "category": "Research Workflows",
        "title": "ModMed selects AWS as the cloud provider for the AI-powered practice",
        "source": "About Amazon",
        "summary": "Amazon said ModMed is standardizing on AWS to support an AI-powered practice stack built for specialty medicine workflows and clinical software operations.",
        "href": "https://press.aboutamazon.com/aws/2026/4/modmed-selects-aws-as-the-cloud-provider-for-the-ai-powered-practice",
        "imageUrl": "https://assets.aboutamazon.com/dims4/default/e2df0bd/2147483647/strip/true/crop/2000x1000+0+63/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fb3%2F79%2Fb0e61293471b9d35c5ff02e46f37%2Famazon-logo-hero-images-2024.jpg",
        "excerpt": "Why it matters: healthcare AI adoption is increasingly tied to domain-specific software stacks rather than general-purpose model demos."
      }
    ]
  },
  {
    "date": "2026-04-18",
    "label": "April 18, 2026",
    "items": [
      {
        "id": "google-gemini-3-1-flash-tts-apr18",
        "category": "Model Releases",
        "title": "Google launches Gemini 3.1 Flash TTS for more expressive AI speech",
        "source": "Google Blog",
        "summary": "Google rolled out Gemini 3.1 Flash TTS across its products, positioning the model as a next-generation speech option with more expressive and controllable voice output.",
        "href": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3.1-flash-tts_metacard_dark_1920x1080.width-1300.png",
        "excerpt": "Why it matters: voice quality is increasingly a product differentiator as AI assistants expand into audio-native workflows."
      },
      {
        "id": "anthropic-claude-opus-4-7-apr18",
        "category": "Model Releases",
        "title": "Anthropic ships Claude Opus 4.7 with stronger software engineering performance",
        "source": "Anthropic",
        "summary": "Anthropic released Claude Opus 4.7 as its latest frontier model, highlighting measurable gains on harder software engineering tasks and advanced coding workloads.",
        "href": "https://www.anthropic.com/news/claude-opus-4-7",
        "imageUrl": "https://cdn.sanity.io/images/4zrzovbb/website/96ea2509a90e527642c822303e56296a07bcfce4-1920x1080.png",
        "excerpt": "Why it matters: top model vendors are still using coding benchmarks and difficult engineering work as the clearest proof point for frontier progress."
      },
      {
        "id": "anthropic-claude-design-labs-apr18",
        "category": "Creative AI",
        "title": "Anthropic opens Claude Design for polished slides, prototypes, and one-pagers",
        "source": "Anthropic",
        "summary": "Anthropic introduced Claude Design in Labs as a new way to collaborate with Claude on visual deliverables including prototypes, slide decks, one-pagers, and other polished assets.",
        "href": "https://www.anthropic.com/news/claude-design-anthropic-labs",
        "imageUrl": "https://www.anthropic.com/api/opengraph-illustration?name=Hand%20Quill&backgroundColor=cactus",
        "excerpt": "Why it matters: frontier assistants are moving beyond chat into structured creative output that aims to replace more of the blank-page workflow."
      },
      {
        "id": "github-copilot-cli-auto-model-selection-apr18",
        "category": "Developer Tools",
        "title": "GitHub Copilot CLI adds automatic model selection for faster command-line workflows",
        "source": "GitHub Changelog",
        "summary": "GitHub made Copilot auto model selection generally available in Copilot CLI so the command line can route requests to the most efficient model by default.",
        "href": "https://github.blog/changelog/2026-04-17-github-copilot-cli-now-supports-copilot-auto-model-selection/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/CopilotCLIAutoModelSelection_NewRelease_Unfurl_TextOnly-3.jpg",
        "excerpt": "Why it matters: model routing is becoming a built-in part of developer tooling instead of a manual setting teams have to tune on every task."
      },
      {
        "id": "google-ai-travel-smarter-apr18",
        "category": "Product Updates",
        "title": "Google packages summer travel planning and deal finding into AI-powered Search flows",
        "source": "Google Blog",
        "summary": "Google highlighted new AI-powered travel planning features that help users compare deals, plan trips, and explore destinations inside Search and related products.",
        "href": "https://blog.google/products-and-platforms/products/search/summer-travel-tips-google-search-ai/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/summer_travel_tips_2026_ss.width-1300.png",
        "excerpt": "Why it matters: consumer AI wins are increasingly about getting useful workflow upgrades into familiar products people already open every day."
      },
      {
        "id": "google-ai-mode-chrome-apr18",
        "category": "Product Updates",
        "title": "Google brings AI Mode into Chrome for side-by-side web exploration",
        "source": "Google Blog",
        "summary": "Google added a new AI Mode experience in Chrome so users can explore the web and AI responses together in a more integrated browsing flow.",
        "href": "https://blog.google/products-and-platforms/products/search/ai-mode-chrome/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/AI_Mode_in_Chrome_-_Social_feed.width-1300.png",
        "excerpt": "Why it matters: browser-native AI is becoming a distribution advantage as search, browsing, and assistant behavior continue to merge."
      },
      {
        "id": "salesforce-agent-fabric-controls-apr18",
        "category": "Agents",
        "title": "Salesforce adds new Agent Fabric controls for multi-vendor AI governance",
        "source": "Salesforce",
        "summary": "Salesforce expanded Agent Fabric with new determinism and governance controls designed to help enterprises monitor trusted tools across multi-vendor agent deployments.",
        "href": "https://www.salesforce.com/news/stories/agent-fabric-control-plane-announcement/",
        "imageUrl": "https://www.salesforce.com/news/wp-content/uploads/sites/3/2026/04/Agent-Fabric-Universal-Control-Plane-Image-1.png?w=1024",
        "excerpt": "Why it matters: large companies want agent interoperability, but only if they can keep execution paths observable, governed, and policy-compliant."
      },
      {
        "id": "github-cli-agent-skills-apr18",
        "category": "Agents",
        "title": "GitHub CLI adds agent skills commands for managing coding-agent setups",
        "source": "GitHub Changelog",
        "summary": "GitHub launched new gh skill commands in GitHub CLI to help developers discover, install, and manage reusable skills for coding agents.",
        "href": "https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/",
        "imageUrl": "https://github.blog/wp-content/uploads/2026/04/579036805-3f7f7fc2-dbfe-45d2-8041-40fe09703047.jpg",
        "excerpt": "Why it matters: teams are starting to treat agent skills like portable infrastructure that can be shared, updated, and audited across environments."
      },
      {
        "id": "salesforce-headless-360-apr18",
        "category": "Developer Tools",
        "title": "Salesforce turns its stack into Headless 360 APIs, MCP tools, and CLI actions for agents",
        "source": "Salesforce",
        "summary": "Salesforce introduced Headless 360 so more of its platform can be accessed through APIs, MCP tools, and CLI commands that agents can invoke directly.",
        "href": "https://www.salesforce.com/uk/news/stories/salesforce-headless-360-announcement/",
        "imageUrl": "https://www.salesforce.com/uk/news/wp-content/uploads/sites/5/2026/04/Agentforce-Developer-Experience-TDX-Release.png",
        "excerpt": "Why it matters: enterprise platforms are racing to become agent-ready backends instead of forcing every workflow through a browser UI."
      },
      {
        "id": "openai-gpt-rosalind-preview-apr18",
        "category": "Research Workflows",
        "title": "OpenAI previews GPT-Rosalind for life sciences research and drug discovery",
        "source": "OpenAI",
        "summary": "OpenAI introduced GPT-Rosalind as a purpose-built reasoning model for biology, drug discovery, and translational medicine with broader scientific tool support.",
        "href": "https://openai.com/index/introducing-gpt-rosalind/",
        "imageUrl": "https://images.ctfassets.net/kftzwdyauwt9/4DBbOG8vMlfABf51pZ0hUB/512dbdd1d4051944bbaf62b0c7310d31/Life_science_plugin_demo_static_image_1x1.png?fm=webp&q=90&w=3840",
        "excerpt": "Why it matters: model vendors are increasingly building domain-specific systems for regulated, tool-heavy research workflows instead of shipping one general model for everything."
      },
      {
        "id": "mit-openprotein-biologists-apr18",
        "category": "Research Workflows",
        "title": "MIT-backed OpenProtein opens AI protein-design tools to more working biologists",
        "source": "MIT News",
        "summary": "MIT News highlighted OpenProtein.AI, a no-code platform that gives biologists broader access to AI-assisted protein engineering and research workflows.",
        "href": "https://news.mit.edu/2026/bringing-ai-driven-protein-design-tools-everywhere-0417",
        "imageUrl": "https://news.mit.edu/sites/default/files/images/202604/MIT-OpenProteinAI-01-press.jpg",
        "excerpt": "Why it matters: AI biology products are moving from expert-only labs toward broader scientific teams that need simpler interfaces and faster iteration."
      }
    ]
  },
  {
    "date": "2026-04-17",
    "label": "April 17, 2026",
    "items": [
      {
        "id": "google-gemini-mac-app-apr17-refresh",
        "category": "Product Updates",
        "title": "Google rolls out the Gemini Mac app with desktop-native access",
        "source": "Google Blog",
        "summary": "Google launched a native Gemini app for macOS, bringing faster desktop access to chat, multimodal creation, and workflow support outside the browser.",
        "href": "https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-mac-os/",
        "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_on_Mac_Hero.max-1300x1300.jpg",
        "fallbackImageUrl": "assets/news/home-briefing/2026-04-16/apple-00ea6604389055f8.jpg",
        "excerpt": "Why it matters: getting Gemini onto the desktop moves it closer to an always-available assistant instead of a destination users visit in a tab."
      },
      {
        "id": "google-gemini-personalized-images-apr17",
        "category": "Creative AI",
        "title": "Google adds personalized image creation flows to the Gemini app",
        "source": "Google Blog",
        "summary": "Google introduced new Gemini app workflows for creating more personalized images, tying generation more closely to user context and prompt intent.",
        "href": "https://blog.google/innovation-and-ai/products/gemini-app/personal-intelligence-nano-banana/",
        "imageUrl": "assets/news/home-briefing/2026-04-17/apple-google-nano-banana.webp",
        "excerpt": "Why it matters: consumer AI products are increasingly competing on personalization and creative control instead of one-size-fits-all generation."
      },
      {
        "id": "openai-codex-for-almost-everything-apr17",
        "category": "Developer Tools",
        "title": "OpenAI positions Codex as a broader coding agent for full software workflows",
        "source": "OpenAI",
        "summary": "OpenAI outlined a broader Codex push aimed at handling more of the software lifecycle, moving the product beyond narrow code-completion use cases.",
        "href": "https://openai.com/index/codex-for-almost-everything/",
        "imageUrl": "https://images.openai.com/blob/5b794267-acde-41f4-b8d5-2bfacbe0e224/hero-card.jpg?trim=0%2C0%2C0%2C0&width=1920",
        "excerpt": "Why it matters: the coding-assistant race is shifting from autocomplete toward agents that can take on larger chunks of planning, editing, and execution."
      },
      {
        "id": "canva-ai-assistant-tool-calling-apr17",
        "category": "Creative AI",
        "title": "Canva's AI assistant can now call tools to assemble designs",
        "source": "TechCrunch",
        "summary": "Canva upgraded its AI assistant so it can invoke multiple tools across the product to help users build finished designs with less manual work.",
        "href": "https://techcrunch.com/2026/04/16/canvas-ai-assistant-can-now-call-various-tools-to-make-designs-for-you/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/04/Canva-AI-2.0.jpeg?w=1024",
        "excerpt": "Why it matters: design platforms are turning AI from a prompt feature into a workflow layer that can coordinate multiple creative steps."
      },
      {
        "id": "github-claude-opus-4-7-ga-apr17",
        "category": "Model Releases",
        "title": "GitHub makes Claude Opus 4.7 generally available in Copilot",
        "source": "GitHub Changelog",
        "summary": "GitHub rolled out Claude Opus 4.7 as a generally available model option in Copilot, expanding model choice for developer teams.",
        "href": "https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/",
        "imageUrl": "assets/news/home-briefing/2026-04-17/semiconductor-anthropic-figma.jpg",
        "excerpt": "Why it matters: model choice is becoming a first-class workflow decision inside coding platforms rather than a hidden backend setting."
      },
      {
        "id": "github-copilot-cloud-agent-controls-apr17",
        "category": "Developer Tools",
        "title": "GitHub adds organization-level controls for Copilot cloud agent access",
        "source": "GitHub Changelog",
        "summary": "GitHub added custom-property controls that let enterprises selectively enable Copilot cloud agent access for specific organizations.",
        "href": "https://github.blog/changelog/2026-04-15-enable-copilot-cloud-agent-via-custom-properties/",
        "imageUrl": "assets/news/home-briefing/2026-04-17/industry-insightfinder-agents.png",
        "excerpt": "Why it matters: enterprise AI rollouts increasingly hinge on fine-grained policy controls instead of broad on-or-off deployment decisions."
      },
      {
        "id": "openai-next-evolution-agents-sdk-apr17",
        "category": "Agents",
        "title": "OpenAI expands the Agents SDK for safer and more capable agent systems",
        "source": "OpenAI",
        "summary": "OpenAI detailed a new phase for its Agents SDK with stronger orchestration, evaluation, and safety patterns for production-grade agent deployments.",
        "href": "https://openai.com/index/the-next-evolution-of-the-agents-sdk/",
        "imageUrl": "https://images.openai.com/blob/315f97f8-35c6-4f7b-97f5-ab6c44a8ad22/agents-sdk-diagram.png?trim=0%2C0%2C0%2C0&width=1920",
        "fallbackImageUrl": "assets/news/home-briefing/2026-04-16/semiconductor-openai-agents.jpg",
        "excerpt": "Why it matters: enterprise agent adoption is increasingly about controls, reliability, and repeatable execution rather than raw model output alone."
      },
      {
        "id": "roblox-agentic-ai-tools-games-apr17-refresh",
        "category": "Developer Tools",
        "title": "Roblox gives its AI assistant new agentic tools for planning and testing games",
        "source": "TechCrunch",
        "summary": "Roblox expanded its AI assistant with more agentic tooling to help creators plan, build, and test game experiences faster.",
        "href": "https://techcrunch.com/2026/04/16/robloxs-ai-assistant-gets-new-agentic-tools-to-plan-build-and-test-games/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2026/04/GettyImages-2199101548.jpg?w=1024",
        "excerpt": "Why it matters: creator platforms are moving beyond chat helpers toward AI systems that can orchestrate multi-step production work."
      },
      {
        "id": "factory-ai-coding-enterprises-apr17-refresh",
        "category": "Developer Tools",
        "title": "Factory hits a $1.5B valuation as enterprise AI coding demand stays hot",
        "source": "TechCrunch",
        "summary": "Factory raised at a $1.5 billion valuation as investors keep backing AI coding systems built for large enterprise software teams.",
        "href": "https://techcrunch.com/2026/04/16/factory-hits-1-5b-valuation-to-build-ai-coding-for-enterprises/",
        "imageUrl": "https://techcrunch.com/wp-content/uploads/2025/08/GettyImages-2210627883.jpg?w=1024",
        "excerpt": "Why it matters: the biggest spending in AI coding continues to come from enterprise deployments that promise governance and operational control."
      },
      {
        "id": "amazon-bio-discovery-ai-drug-research-apr17",
        "category": "Research Workflows",
        "title": "Amazon launches Bio Discovery to speed AI-assisted drug research",
        "source": "About Amazon",
        "summary": "Amazon introduced Bio Discovery, a service designed to help researchers use AI agents and large-scale computation across drug-discovery workflows.",
        "href": "https://www.aboutamazon.com/news/aws/aws-amazon-bio-discovery-ai-drug-research",
        "imageUrl": "https://m.media-amazon.com/images/G/01/AmazonScience/images/aws-bio-discovery-hero-light-bg-transparent_2x._CB792000512_.png",
        "excerpt": "Why it matters: frontier AI vendors are pushing deeper into scientific workflows where trust, tooling, and domain integration matter as much as model quality."
      }
    ]
  },
  {
    "date": "2026-04-16",
    "label": "April 16, 2026",
    "items": [
      {
        "id": "adobe-firefly-ai-assistant-creative-cloud-apr16",
        "category": "Creative AI",
        "title": "Adobe Firefly AI Assistant starts orchestrating Creative Cloud tasks",
        "source": "TechCrunch",
        "summary": "Adobe launched Firefly AI Assistant in public beta, giving users an agent that can work across Firefly, Photoshop, Premiere, Lightroom, Express, Illustrator, and related apps.",
        "href": "https://techcrunch.com/2026/04/15/adobes-new-firefly-ai-assistant-can-use-creative-cloud-apps-to-complete-tasks/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/industry-adobe-workflows.webp",
        "excerpt": "Why it matters: creative AI is shifting from single-output generation toward assistants that can operate across full production workflows."
      },
      {
        "id": "claude-service-outage-claude-code-apr16",
        "category": "AI Reliability",
        "title": "Claude outage hits Claude.ai, API, and Claude Code users",
        "source": "TechRadar",
        "summary": "Anthropic confirmed elevated errors affecting Claude.ai, the API, and Claude Code, with users reporting login failures and interrupted prompt handling during the April 15 incident.",
        "href": "https://www.techradar.com/news/live/claude-anthropic-down-outage-april-15-2026",
        "imageUrl": "assets/news/home-briefing/2026-04-16/apple-9435e4a8937eb558.webp",
        "excerpt": "Why it matters: recurring downtime is now a product signal for AI tools that users rely on for daily coding and operational workflows."
      },
      {
        "id": "openai-agents-sdk-enterprise-sandbox-apr16",
        "category": "Agents",
        "title": "OpenAI updates Agents SDK with sandbox and harness support",
        "source": "TechCrunch",
        "summary": "OpenAI updated its Agents SDK with sandboxing and in-distribution harness features so enterprises can build safer long-horizon agents on frontier models.",
        "href": "https://techcrunch.com/2026/04/15/openai-updates-its-agents-sdk-to-help-enterprises-build-safer-more-capable-agents/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/semiconductor-openai-agents.jpg",
        "excerpt": "Why it matters: enterprise agent adoption is moving from demos toward controlled execution environments, approved tools, and deployable safety boundaries."
      },
      {
        "id": "gitar-agentic-code-security-seed-apr16",
        "category": "Developer Tools",
        "title": "Gitar emerges with $9M for agentic code security",
        "source": "TechCrunch",
        "summary": "Gitar emerged from stealth with $9 million for an agent-based platform aimed at helping teams secure code.",
        "href": "https://techcrunch.com/2026/04/15/gitar-a-startup-that-uses-agents-to-secure-code-emerges-from-stealth-with-9-million/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/industry-solar-panels.webp",
        "excerpt": "Why it matters: AI coding tools are creating demand for automated review and remediation systems that can keep up with faster software generation."
      },
      {
        "id": "emergent-vibe-coding-agents-apr16",
        "category": "Developer Tools",
        "title": "Emergent moves into vibe-coding AI agents",
        "source": "TechCrunch",
        "summary": "India-based Emergent is expanding from vibe coding into an OpenClaw-like AI agent space for building and operating software workflows.",
        "href": "https://techcrunch.com/2026/04/15/indias-vibe-coding-startup-emergent-enters-openclaw-like-ai-agent-space/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/industry-emergent-agents.webp",
        "excerpt": "Why it matters: agentic coding competition is widening beyond the best-known US developer tools into regional products with local distribution advantages."
      },
      {
        "id": "parasail-tokenmaxxing-ai-compute-apr16",
        "category": "Funding",
        "title": "Parasail raises $32M for tokenmaxxing AI developers",
        "source": "TechCrunch",
        "summary": "Parasail raised $32 million for infrastructure aimed at developers who need to spend and manage large token volumes for AI products.",
        "href": "https://techcrunch.com/2026/04/15/parasail-raises-32m-to-feed-tokenmaxxing-ai-developers/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/semiconductor-parasail-compute.jpg",
        "excerpt": "Why it matters: AI infrastructure demand is broadening from raw GPUs to billing, routing, and usage layers that make high-token applications practical."
      },
      {
        "id": "gizmo-ai-learning-22m-apr16",
        "category": "Funding",
        "title": "AI learning app Gizmo raises $22M after reaching 13M users",
        "source": "TechCrunch",
        "summary": "Gizmo, an AI learning app focused on study workflows, raised $22 million after growing to 13 million users.",
        "href": "https://techcrunch.com/2026/04/15/ai-learning-app-gizmo-levels-up-with-13m-users-and-a-22m-investment/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/apple-cf91fa832d8b2b04.jpg",
        "excerpt": "Why it matters: education remains one of the clearest consumer AI wedges when products tie generation to memory, practice, and repeat use."
      },
      {
        "id": "hightouch-ai-marketing-arr-apr16",
        "category": "Productivity",
        "title": "Hightouch hits $100M ARR on AI-powered marketing tools",
        "source": "TechCrunch",
        "summary": "Hightouch says its AI marketing product helped drive the company to $100 million in ARR by letting brands generate personalized campaigns from their own creative systems.",
        "href": "https://techcrunch.com/2026/04/15/hightouch-reaches-100m-arr-fueled-by-marketing-tools-powered-by-ai/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/industry-ai-compute-funding.webp",
        "excerpt": "Why it matters: enterprise buyers are paying for AI systems that stay grounded in brand assets and customer data instead of generic image generation."
      },
      {
        "id": "openai-life-sciences-policy-push-apr16",
        "category": "Research Workflows",
        "title": "OpenAI pushes for a bigger AI role in life sciences",
        "source": "Axios",
        "summary": "OpenAI is arguing that AI can accelerate biomedical research by connecting fragmented knowledge, designing tools, automating labs, and shortening experiment cycles.",
        "href": "https://www.axios.com/2026/04/15/exclusive-openai-ai-life-science",
        "imageUrl": "assets/news/home-briefing/2026-04-16/ai-c1640cf30c54b600.png",
        "excerpt": "Why it matters: OpenAI is tying frontier model progress to regulated, high-value scientific workflows where adoption depends as much on policy and trust as raw capability."
      }
    ]
  },
  {
    "date": "2026-04-15",
    "label": "April 15, 2026",
    "items": [
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
        "id": "github-claude-codex-model-selection-apr14",
        "category": "Developer Tools",
        "title": "GitHub adds model selection for Claude and Codex agents",
        "source": "GitHub Changelog",
        "summary": "GitHub now lets users choose models when starting Claude and Codex third-party coding agent tasks on github.com, including Claude Sonnet and Opus options plus GPT-5.2-Codex, GPT-5.3-Codex, and GPT-5.4.",
        "href": "https://github.blog/changelog/2026-04-14-model-selection-for-claude-and-codex-agents-on-github-com/",
        "imageUrl": "assets/news/home-briefing/2026-04-16/semiconductor-github-models.jpg",
        "excerpt": "Why it matters: agent platforms are turning model choice into a first-class workflow control instead of hiding it behind a single assistant brand."
      },
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
        "imageUrl": "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
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
      },
      {
        "id": "openai-illinois-liability-bill-apr09",
        "category": "Policy",
        "title": "OpenAI's Illinois liability push shows regulation is now a product-adjacent battle",
        "source": "Ben's Bites",
        "summary": "OpenAI's support for an Illinois liability bill highlights how legal definitions around AI responsibility are becoming a meaningful competitive issue for major labs.",
        "href": "https://news.bensbites.co/openai-backs-an-illinois-bill-that-would-limit-when-ai-labs-can-be-held-liable/",
        "excerpt": "Why it matters: regulation is no longer outside the product story; it directly shapes deployment risk."
      }
    ]
  },
  {
    "date": "2026-04-08",
    "label": "April 8, 2026",
    "items": [
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
        "id": "anti-distillation-frontier-labs-apr08",
        "category": "Policy",
        "title": "OpenAI, Anthropic, and Google align more openly against model-copying pressure",
        "source": "The Neuron",
        "summary": "The leading labs are taking a harder public line on distillation and model copying, a sign that open-model pressure from players like DeepSeek is reshaping the rules of competition.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#anti-distillation",
        "excerpt": "Why it matters: open-model competition is now triggering strategy changes inside the biggest closed-model labs."
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
        "id": "anthropic-google-broadcom-compute-deal-apr07",
        "category": "Infrastructure",
        "title": "Anthropic's huge TPU deal shows Claude's growth is now gated by infrastructure scale",
        "source": "The Neuron",
        "summary": "Anthropic's expanded compute arrangement with Google and Broadcom makes clear that serving and training Claude at the frontier is now as much an infrastructure story as a model story.",
        "href": "https://www.theneurondaily.com/p/too-dangerous-to-release#anthropic-compute-deal",
        "excerpt": "Why it matters: demand for top assistants is increasingly constrained by how much compute can actually be delivered."
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
      track: "chatgpt",
      title: "Customer interview synthesis",
      summary: "Turn raw interviews into product and messaging actions.",
      body: "Act as a product researcher. Analyze these interview notes and return recurring pains, purchase triggers, objections, exact phrases worth reusing, and the top product or messaging implications. End with what we should validate next."
    },
    {
      track: "chatgpt",
      title: "Launch FAQ builder",
      summary: "Draft a support-ready FAQ before launch questions hit.",
      body: "You are a launch manager. Based on the product notes below, create a customer-facing FAQ with likely questions, concise answers, risks to clarify, and the information still missing. Separate must-answer questions from nice-to-have ones."
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
      track: "claude",
      title: "Board update drafter",
      summary: "Turn dense operating context into a calm leadership update.",
      body: "Write a board-style update from the material below. Organize it into progress, performance signals, risks, decisions needed, and next quarter focus. Keep the tone measured, specific, and free of hype."
    },
    {
      track: "claude",
      title: "Narrative gap review",
      summary: "Find where a long draft still feels weak or unresolved.",
      body: "Review this draft and identify the sections where the logic jumps, evidence is thin, transitions are abrupt, or the conclusion overreaches. Explain why each section is weak and suggest the minimum rewrite needed to fix it."
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
      track: "gemini",
      title: "Screenshot teardown",
      summary: "Use visual input to spot UX and trust issues faster.",
      body: "Review these screenshots as a product analyst. Evaluate information hierarchy, CTA clarity, visual trust signals, friction points, and consistency across screens. Return the biggest issues first, then the fastest improvements to test."
    },
    {
      track: "gemini",
      title: "Meeting pack synthesizer",
      summary: "Blend notes, docs, and visuals into one shared brief.",
      body: "Use the agenda, notes, screenshots, and linked material to create a meeting pack with context, key decisions, unresolved issues, recommendations, and the exact pre-reads each stakeholder needs."
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
      track: "deepseek",
      title: "Incident review scaffold",
      summary: "Structure a postmortem before the team starts debating fixes.",
      body: "Act as a senior incident reviewer. From the timeline, logs, and symptoms, reconstruct the likely failure chain, identify contributing factors, distinguish root cause from amplifiers, and list the remediation steps in priority order."
    },
    {
      track: "deepseek",
      title: "Algorithm choice evaluator",
      summary: "Pick the right technical approach with explicit reasoning.",
      body: "Compare these algorithm or model options across correctness, performance under load, implementation effort, failure modes, observability, and future maintainability. State assumptions, highlight edge cases, and recommend the safest option for production."
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
      track: "midjourney",
      title: "Feature illustration system",
      summary: "Create a reusable visual language for product marketing.",
      body: "Design a coherent set of product feature illustrations for an AI platform, editorial 3D style, luminous interface fragments, controlled color accents, clean negative space, premium SaaS campaign quality, consistent composition system."
    },
    {
      track: "midjourney",
      title: "Event keynote backdrop",
      summary: "Generate stronger stage visuals without generic futurism.",
      body: "Wide-format keynote backdrop for an AI conference, cinematic gradient atmosphere, architectural light beams, subtle data motifs, premium minimalism, high-contrast focal area for a speaker silhouette, polished event identity."
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
      track: "perplexity",
      title: "Vendor due diligence brief",
      summary: "Check a company fast before a partnership or buy decision.",
      body: "Research this vendor and return a due diligence brief covering product scope, pricing signals, traction, recent news, customer proof, red flags, and open questions. Cite every major claim and separate verified facts from inference."
    },
    {
      track: "perplexity",
      title: "Regulation scan",
      summary: "Map the current rule landscape before acting.",
      body: "Scan the latest rules, standards, and official guidance related to this topic. Summarize what is confirmed, what is changing, who is affected, and the practical actions a company should take now. Use primary or official sources wherever possible."
    },
    {
      track: "githubcopilot",
      title: "Feature implementation plan",
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
      track: "githubcopilot",
      title: "Pull request review brief",
      summary: "Focus a review on real regression risk before merging.",
      body: "Act as a senior reviewer. Given this diff and context, identify the highest-risk changes, likely regressions, missing tests, rollout concerns, and the specific checks we should complete before merge."
    },
    {
      track: "githubcopilot",
      title: "Legacy module migration plan",
      summary: "Break a risky cleanup into a safer shipping sequence.",
      body: "Create a migration plan for this legacy module. Include target architecture, intermediate states, compatibility constraints, test coverage needed at each phase, rollout gates, and rollback triggers."
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
      track: "runway",
      title: "Product demo opener",
      summary: "Build a sharper first five seconds for launch video.",
      body: "Generate a 5-second opener for an AI product demo: fast but elegant pacing, interface macro details, soft lens movement, minimal typography room, cinematic polish, and a confident launch energy."
    },
    {
      track: "runway",
      title: "B-roll continuity brief",
      summary: "Keep generated supporting shots visually coherent.",
      body: "Create three complementary B-roll shots that match the main scene's subject, lighting, lens feel, and color palette. Keep motion subtle, transitions editable, and the mood premium rather than flashy."
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
      track: "jasper",
      title: "Feature-to-benefit ladder",
      summary: "Translate product detail into clearer buyer value.",
      body: "Using the product notes below, convert each major feature into user benefit, business outcome, proof, objection handling, and the best CTA angle. Keep the language specific enough for homepage and sales copy."
    },
    {
      track: "jasper",
      title: "Retention campaign plan",
      summary: "Draft lifecycle copy with stronger message sequencing.",
      body: "Act as a lifecycle marketer. Build a three-message retention campaign for this segment with trigger, subject line direction, core value message, proof, objection handling, and the action we want in each step."
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
      track: "canva",
      title: "One-pager design brief",
      summary: "Turn rough notes into a cleaner single-page asset.",
      body: "Create a one-pager brief from this material with headline hierarchy, section order, key stats callouts, visual style, icon or illustration cues, and spacing guidance so the final asset feels polished and modern."
    },
    {
      track: "canva",
      title: "Webinar promo kit",
      summary: "Generate a cohesive asset system for launch week.",
      body: "Build a creative brief for a webinar promo kit including landing hero, social cards, email header, and reminder banner. Define copy hierarchy, design mood, brand accents, and what must stay consistent across every asset."
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
      track: "notion",
      title: "Decision log template",
      summary: "Keep important calls documented as work moves fast.",
      body: "Turn these project notes into a decision log template populated with the decisions made, rationale, owner, date, downstream impact, and the questions that still need resolution."
    },
    {
      track: "notion",
      title: "OKR workspace builder",
      summary: "Set up a cleaner operating rhythm for a team or quarter.",
      body: "Create a Notion workspace structure for quarterly OKRs with company goals, team goals, owners, check-in cadence, progress fields, risks, and a weekly review page."
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
      track: "grammarly",
      title: "Slack message cleanup",
      summary: "Make fast messages clearer without sounding stiff.",
      body: "Rewrite this Slack message to be concise, friendly, and unambiguous. Keep the tone warm, remove clutter, and make the requested action or decision obvious in the first two lines."
    },
    {
      track: "grammarly",
      title: "High-stakes response editor",
      summary: "Polish delicate replies when tone matters most.",
      body: "Edit this response for a sensitive professional situation. Preserve empathy, reduce defensiveness, improve clarity, and ensure the final version sounds calm, credible, and respectful."
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
      track: "elevenlabs",
      title: "Podcast intro voice brief",
      summary: "Set tone and pacing before generating spoken intros.",
      body: "Perform this intro as a smart, conversational podcast host. Keep the delivery relaxed but crisp, emphasize the guest or topic naturally, and avoid sounding like an ad read."
    },
    {
      track: "elevenlabs",
      title: "Supportive coaching tone",
      summary: "Generate audio that sounds guiding, not robotic.",
      body: "Read this script as a supportive coach. Use steady pacing, light warmth, reassuring emphasis, and natural pauses that make the listener feel guided step by step."
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
      track: "synthesia",
      title: "Customer onboarding module",
      summary: "Create a cleaner first-run training flow.",
      body: "Write a 2-minute onboarding module for new customers with welcome context, first key action, common mistake to avoid, on-screen UI notes, and a closing step that guides them to successful activation."
    },
    {
      track: "synthesia",
      title: "Internal policy update video",
      summary: "Explain changes clearly without sounding bureaucratic.",
      body: "Turn this policy change into a short internal presenter video script with what changed, why it matters, who is affected, examples, and the action employees must take next."
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
      track: "pictory",
      title: "Webinar highlight reel",
      summary: "Pull the most useful moments from a longer talk.",
      body: "Turn this webinar transcript into a highlight reel plan with strongest hooks, section beats, caption lines, visual cutaway ideas, and the CTA for the final frame."
    },
    {
      track: "pictory",
      title: "Customer story clip",
      summary: "Shape a case study into a tighter social edit.",
      body: "Convert this customer story into a short video structure with opening pain, turning point, measurable outcome, supporting quote, caption suggestions, and simple scene direction for each beat."
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
    },
    {
      track: "copyai",
      title: "Follow-up email ladder",
      summary: "Keep momentum after a first touch or demo.",
      body: "Create a three-step follow-up sequence after an initial outreach or demo. For each message include timing, objective, opener, proof point, objection handling, and a low-friction CTA."
    },
    {
      track: "copyai",
      title: "Objection handling sheet",
      summary: "Turn deal friction into reusable sales language.",
      body: "Build an objection handling sheet from the notes below. For each objection include what the buyer really means, the response angle, proof to use, and the exact language a rep can adapt."
    }
  ];

  const pageQuery = new URLSearchParams(window.location.search);
  const promptTrackIds = new Set(promptTracks.map((track) => track.id));

  const state = {
    query: pageQuery.get("query") || "",
    activeCategory: "All",
    activePricing: "All",
    activeRanking: "Assistants",
    activeNewsCategory: "All",
    activePromptTrack: promptTrackIds.has(pageQuery.get("track")) ? pageQuery.get("track") : "chatgpt",
    featuredVisibleCounts: {},
    directoryVisibleCounts: {},
    directorySignature: ""
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
  const DIRECTORY_SHORTLIST_COUNT = 12;
  const DIRECTORY_MOBILE_SHORTLIST_COUNT = 6;
  const DIRECTORY_SECTION_PREVIEW_COUNT = 8;
  const DIRECTORY_MOBILE_SECTION_PREVIEW_COUNT = 4;
  const DIRECTORY_FOCUSED_SECTION_PREVIEW_COUNT = 18;
  const DIRECTORY_MOBILE_FOCUSED_SECTION_PREVIEW_COUNT = 8;
  const DIRECTORY_SECTION_LOAD_STEP = 200;
  const DIRECTORY_AUTOLOAD_ROOT_MARGIN = "960px 0px";
  const DIRECTORY_MOBILE_AUTOLOAD_ROOT_MARGIN = "1280px 0px";
  let directoryAutoloadObserver = null;
  let directoryAutoloadObserverMargin = "";

  function localIconPath(filename) {
    return `${assetPrefix}assets/tool-icons/${filename}`;
  }

  function buildToolSearchBlob(tool) {
    return [
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
  }

  function iconSourceList(tool) {
    const preferredSource = tool.iconFile
      ? localIconPath(String(tool.iconFile).replace(/^assets\/tool-icons\//, ""))
      : "";
    const sources = [
      preferredSource,
      localIconPath(`${tool.id}.png`),
      localIconPath(`${tool.id}.webp`),
      localIconPath(`${tool.id}.jpg`),
      localIconPath(`${tool.id}.ico`),
      localIconPath(`${tool.id}.svg`),
      fallbackIcon(tool)
    ];
    return sources.filter((source, index) => source && !sources.slice(0, index).includes(source));
  }

  function primaryIconPath(tool) {
    return iconSourceList(tool)[0];
  }

  function iconFallbackSources(tool) {
    if (Array.isArray(tool.iconFallbacks) && tool.iconFallbacks.length) {
      return tool.iconFallbacks;
    }
    return iconSourceList(tool).slice(1);
  }

  function nextIconFallbackSource(image) {
    const sources = (image.dataset.iconFallbacks || "")
      .split("|")
      .filter(Boolean);
    const nextSource = sources.shift() || "";
    image.dataset.iconFallbacks = sources.join("|");
    return nextSource;
  }

  function handleToolIconError(event) {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.hasAttribute("data-icon-fallbacks")) {
      return;
    }

    const nextSource = nextIconFallbackSource(image);
    if (!nextSource) {
      return;
    }

    image.dataset.iconHydrated = "true";
    image.src = nextSource;
  }

  function isCompactDirectoryViewport() {
    const viewportWidth = window.innerWidth || 0;
    const isNarrowViewport = window.matchMedia ? window.matchMedia("(max-width: 820px)").matches : viewportWidth <= 820;
    const isTouchCompactViewport = window.matchMedia
      ? window.matchMedia("(max-width: 1120px) and (hover: none) and (pointer: coarse)").matches
      : viewportWidth <= 1120;
    return isNarrowViewport || isTouchCompactViewport;
  }

  function currentDirectoryAutoloadRootMargin() {
    return isCompactDirectoryViewport() ? DIRECTORY_MOBILE_AUTOLOAD_ROOT_MARGIN : DIRECTORY_AUTOLOAD_ROOT_MARGIN;
  }

  function ensureDirectoryAutoloadObserver() {
    const rootMargin = currentDirectoryAutoloadRootMargin();
    if (directoryAutoloadObserver && directoryAutoloadObserverMargin === rootMargin) {
      return directoryAutoloadObserver;
    }

    if (!("IntersectionObserver" in window)) {
      return null;
    }

    directoryAutoloadObserver?.disconnect();
    directoryAutoloadObserverMargin = rootMargin;
    directoryAutoloadObserver = new IntersectionObserver(
      (entries) => {
        const categoriesToLoad = new Set();

        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const category = entry.target?.dataset?.directoryAutoload;
          if (!category) {
            return;
          }

          directoryAutoloadObserver?.unobserve(entry.target);
          categoriesToLoad.add(category);
        });

        if (!categoriesToLoad.size) {
          return;
        }

        categoriesToLoad.forEach((category) => {
          increaseDirectoryVisibleCount(category);
        });
        renderDirectory();
      },
      { rootMargin }
    );

    return directoryAutoloadObserver;
  }

  function observeDirectoryAutoload() {
    if (!ui.directorySections) {
      return;
    }

    const sentinels = [...ui.directorySections.querySelectorAll("[data-directory-autoload]")];
    if (!sentinels.length) {
      directoryAutoloadObserver?.disconnect();
      return;
    }

    const observer = ensureDirectoryAutoloadObserver();
    if (observer) {
      observer.disconnect();
      sentinels.forEach((sentinel) => observer.observe(sentinel));
      return;
    }

    sentinels.forEach((sentinel) => {
      state.directoryVisibleCounts[sentinel.dataset.directoryAutoload] = Number.MAX_SAFE_INTEGER;
    });
    renderDirectory();
  }

  const tools = [...catalog.tools]
    .map((tool) => {
      const iconSources = iconSourceList(tool);
      return {
        ...tool,
        iconUrl: iconSources[0],
        iconFallbacks: iconSources.slice(1),
        searchBlob: buildToolSearchBlob(tool)
      };
    })
    .sort((left, right) => right.monthlyVisits - left.monthlyVisits);
  const toolById = new Map(tools.map((tool) => [tool.id, tool]));

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
    topbar: document.querySelector(".topbar"),
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
  const topbarSearchTrigger = [...document.querySelectorAll(".topbar .icon-button")]
    .find((button) => /search/i.test(button.getAttribute("aria-label") || ""));
  let topbarSearchLayer = null;
  let topbarSearchInput = null;
  let topbarSearchForm = null;

  function isHomePage() {
    return document.body?.dataset?.page === "home";
  }

  function isDirectoryPage() {
    return document.body?.dataset?.page === "directory" || /(^|\/)directory\.html$/i.test(window.location.pathname || "");
  }

  function directoryPageHref() {
    return document.body?.dataset?.directoryHref || `${assetPrefix}directory.html`;
  }

  function normalizeSearchValue(value) {
    return String(value || "");
  }

  function trimmedSearchValue(value) {
    return normalizeSearchValue(value).trim();
  }

  function setInputValue(input, value) {
    if (input && input.value !== value) {
      input.value = value;
    }
  }

  function syncSearchInputs(value, sourceInput) {
    const nextValue = normalizeSearchValue(value);
    if (ui.searchInput && ui.searchInput !== sourceInput) {
      setInputValue(ui.searchInput, nextValue);
    }
    if (topbarSearchInput && topbarSearchInput !== sourceInput) {
      setInputValue(topbarSearchInput, nextValue);
    }
  }

  function directorySearchHref(query) {
    const nextQuery = trimmedSearchValue(query);
    return `${directoryPageHref()}${nextQuery ? `?query=${encodeURIComponent(nextQuery)}` : ""}#directory`;
  }

  function syncDirectorySearchUrl(query) {
    if (!isDirectoryPage() || !window.history || !window.history.replaceState) {
      return;
    }
    window.history.replaceState({}, "", directorySearchHref(query));
  }

  function applySearchQuery(query, options) {
    const settings = options || {};
    const nextValue = normalizeSearchValue(query);
    state.query = nextValue;
    syncSearchInputs(nextValue, settings.sourceInput);
    renderHotGrid();
    renderDirectory();
    if (settings.syncUrl) {
      syncDirectorySearchUrl(nextValue);
    }
  }

  function submitSearchQuery(query, options) {
    const settings = options || {};
    const nextValue = normalizeSearchValue(query);

    if (isHomePage() || isDirectoryPage()) {
      applySearchQuery(nextValue, {
        sourceInput: settings.sourceInput,
        syncUrl: isDirectoryPage()
      });

      const scrollTarget = settings.scrollTarget || (isHomePage() ? "hot-tools" : "directory");
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = directorySearchHref(nextValue);
  }

  function ensureTopbarSearchLayer() {
    if (!ui.topbar || !topbarSearchTrigger) {
      return false;
    }

    if (topbarSearchLayer && topbarSearchInput && topbarSearchForm) {
      return true;
    }

    const layer = document.createElement("div");
    layer.className = "topbar-search-layer";
    layer.id = "topbar-search-layer";
    layer.innerHTML = `
      <form class="topbar-search-form" role="search" aria-label="Site search">
        <label class="topbar-search-field" for="topbar-search-input">
          <span class="topbar-search-glyph" aria-hidden="true">&#8981;</span>
          <input
            id="topbar-search-input"
            class="topbar-search-input"
            type="search"
            autocomplete="off"
            placeholder="Search AI tools, workflows, vendors, or categories"
          >
        </label>
        <button class="topbar-search-submit" type="submit">Search</button>
      </form>
    `;

    ui.topbar.appendChild(layer);
    topbarSearchLayer = layer;
    topbarSearchInput = layer.querySelector(".topbar-search-input");
    topbarSearchForm = layer.querySelector(".topbar-search-form");

    setInputValue(topbarSearchInput, state.query);
    topbarSearchTrigger.setAttribute("aria-controls", "topbar-search-layer");
    topbarSearchTrigger.setAttribute("aria-expanded", "false");
    topbarSearchTrigger.setAttribute("aria-haspopup", "dialog");
    return true;
  }

  function openTopbarSearch(options) {
    const settings = options || {};
    if (!ensureTopbarSearchLayer()) {
      return;
    }

    topbarSearchLayer.classList.add("is-open");
    topbarSearchTrigger.setAttribute("aria-expanded", "true");
    setInputValue(topbarSearchInput, state.query);

    if (settings.focus !== false) {
      topbarSearchInput.focus();
      topbarSearchInput.select();
    }
  }

  function closeTopbarSearch() {
    if (!topbarSearchLayer) {
      return;
    }
    topbarSearchLayer.classList.remove("is-open");
    topbarSearchTrigger?.setAttribute("aria-expanded", "false");
  }

  function bindTopbarSearch() {
    if (!topbarSearchTrigger || !ensureTopbarSearchLayer()) {
      return;
    }

    topbarSearchTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openTopbarSearch();
    });

    topbarSearchInput.addEventListener("input", (event) => {
      if (!isHomePage() && !isDirectoryPage()) {
        return;
      }
      applySearchQuery(event.target.value, {
        sourceInput: event.target,
        syncUrl: isDirectoryPage()
      });
    });

    topbarSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitSearchQuery(topbarSearchInput.value, {
        sourceInput: topbarSearchInput
      });
    });

    topbarSearchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeTopbarSearch();
        topbarSearchTrigger.focus();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!topbarSearchLayer?.classList.contains("is-open")) {
        return;
      }

      if (topbarSearchLayer.contains(event.target) || topbarSearchTrigger.contains(event.target)) {
        return;
      }

      closeTopbarSearch();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !topbarSearchLayer?.classList.contains("is-open")) {
        return;
      }
      closeTopbarSearch();
      topbarSearchTrigger.focus();
    });

    if (state.query && isDirectoryPage()) {
      openTopbarSearch({ focus: false });
    }
  }

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

  function iconImage(tool, options) {
    const settings = options || {};
    const eager = settings.eager === true;
    const fallbackSources = iconFallbackSources(tool);
    const altText = settings.alt !== undefined ? settings.alt : `${tool.name} icon`;
    const size = settings.size || 40;
    const primarySrc = tool.iconUrl || primaryIconPath(tool);

    return `<img src="${primarySrc}" data-icon-fallbacks="${escapeAttribute(fallbackSources.join("|"))}" alt="${escapeAttribute(altText)}" loading="${eager ? "eager" : "lazy"}" decoding="async" fetchpriority="${eager ? "high" : "low"}" width="${size}" height="${size}">`;
  }

  function promptTrackTool(track) {
    if (!track || !track.toolId) {
      return null;
    }
    return toolById.get(track.toolId) || null;
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
          ${iconImage(tool, { alt: "", eager: true, size: 20 })}
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

  function renderFeaturedNavFlyout() {
    document.querySelectorAll('.nav-trigger[href="featured.html"] + .nav-flyout').forEach((flyout) => {
      [...flyout.querySelectorAll(".nav-flyout-link")].forEach((link) => {
        const label = link.querySelector(".nav-flyout-label");
        const labelText = (label?.textContent || link.getAttribute("aria-label") || "").trim();

        if (labelText === "Featured Overview") {
          link.remove();
          return;
        }

        if (labelText) {
          link.setAttribute("aria-label", labelText);
        }
      });
      flyout.classList.remove("is-icon-only");
    });
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

  function iconShell(tool, className, options) {
    const tooltip = escapeAttribute(tooltipText(tool));
    const extraClass = className ? ` ${className}` : "";
    return `
      <span class="tool-icon-wrap${extraClass}" data-tip="${tooltip}">
        <span class="tool-icon-shell">
          ${iconImage(tool, options)}
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
      const categoryMatches = state.activeCategory === "All" || tool.categories.includes(state.activeCategory);
      const pricingMatches = state.activePricing === "All" || tool.pricing === state.activePricing;
      const queryMatches = !queryTokens.length || queryTokens.every((token) => tool.searchBlob.includes(token));
      return categoryMatches && pricingMatches && queryMatches;
    });
  }

  function pickTools(ids) {
    return ids
      .map((id) => toolById.get(id))
      .filter(Boolean);
  }

  function toolHost(tool) {
    if (!tool?.url) {
      return "";
    }
    try {
      return new URL(tool.url, window.location.href).hostname.replace(/^www\./, "");
    } catch (error) {
      return "";
    }
  }

  function newAndNotableText(tool) {
    return `${tool.summary || ""} ${tool.recommendation || ""}`.toLowerCase();
  }

  function hasNewAndNotableSignal(tool) {
    const text = newAndNotableText(tool);
    return newAndNotableSignalPhrases.some((phrase) => text.includes(phrase));
  }

  function newAndNotableScore(tool) {
    const anchorIndex = newAndNotableAnchorIds.indexOf(tool.id);
    let score = 0;

    if (anchorIndex !== -1) {
      score += 800 - (anchorIndex * 25);
    }

    if (tool.monthlyVisits >= 15000000 && tool.monthlyVisits <= 150000000) {
      score += 120;
    } else if (tool.monthlyVisits > 150000000 && anchorIndex === -1) {
      score -= 160;
    }

    if (hasNewAndNotableSignal(tool)) {
      score += 160;
    }

    if (tool.categories.some((category) => ["Coding", "Automation", "Research", "Assistants", "Productivity"].includes(category))) {
      score += 40;
    }

    if (tool.categories.some((category) => ["Design", "Video", "Audio"].includes(category))) {
      score += 15;
    }

    if (newAndNotableText(tool).includes("worth ")) {
      score += 20;
    }

    return score;
  }

  function newAndNotableTools(limit) {
    const seenKeys = new Set();
    const candidates = tools
      .filter((tool) => {
        if (editorPickIdSet.has(tool.id) || tool.monthlyVisits < catalog.minMonthlyVisits) {
          return false;
        }

        if (newAndNotableAnchorIdSet.has(tool.id)) {
          return true;
        }

        if (tool.monthlyVisits < 15000000 || tool.monthlyVisits > 150000000) {
          return false;
        }

        return hasNewAndNotableSignal(tool);
      })
      .sort((left, right) => {
        const scoreGap = newAndNotableScore(right) - newAndNotableScore(left);
        if (scoreGap !== 0) {
          return scoreGap;
        }
        if (right.monthlyVisits !== left.monthlyVisits) {
          return right.monthlyVisits - left.monthlyVisits;
        }
        return left.name.localeCompare(right.name);
      })
      .filter((tool) => {
        const key = toolHost(tool) || `${tool.vendor}-${tool.name}`.toLowerCase();
        if (seenKeys.has(key)) {
          return false;
        }
        seenKeys.add(key);
        return true;
      });

    return typeof limit === "number" ? candidates.slice(0, limit) : candidates;
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

  function directoryRenderSignature() {
    return [
      trimmedSearchValue(state.query).toLowerCase(),
      state.activeCategory,
      state.activePricing,
      isCompactDirectoryViewport() ? "mobile" : "desktop"
    ].join("|");
  }

  function currentDirectoryShortlistCount() {
    return isCompactDirectoryViewport() ? DIRECTORY_MOBILE_SHORTLIST_COUNT : DIRECTORY_SHORTLIST_COUNT;
  }

  function currentDirectoryPreviewCount() {
    if (state.activeCategory === "All") {
      return isCompactDirectoryViewport() ? DIRECTORY_MOBILE_SECTION_PREVIEW_COUNT : DIRECTORY_SECTION_PREVIEW_COUNT;
    }

    return isCompactDirectoryViewport() ? DIRECTORY_MOBILE_FOCUSED_SECTION_PREVIEW_COUNT : DIRECTORY_FOCUSED_SECTION_PREVIEW_COUNT;
  }

  function ensureDirectoryVisibleCounts() {
    const signature = directoryRenderSignature();
    if (state.directorySignature === signature) {
      return;
    }

    state.directorySignature = signature;
    state.directoryVisibleCounts = {};
  }

  function directoryVisibleCount(category, total) {
    const baseCount = currentDirectoryPreviewCount();
    const count = state.directoryVisibleCounts[category] || baseCount;
    return Math.min(total, count);
  }

  function increaseDirectoryVisibleCount(category) {
    const currentCount = state.directoryVisibleCounts[category] || currentDirectoryPreviewCount();
    state.directoryVisibleCounts[category] = currentCount + DIRECTORY_SECTION_LOAD_STEP;
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
          ${iconShell(tool, settings.iconClassName, settings.iconOptions)}
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
    model: "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
    open: "assets/news/deepseek-v3-open-source-first.png",
    funding: "assets/news/perplexity-billion-build.png",
    business: "assets/news/perplexity-billion-build.png",
    finance: "assets/news/fallback-google-ai-economy.webp",
    policy: "assets/news/rundown-meta-superintelligence.png",
    safety: "assets/news/mit-compressm.png",
    research: "assets/news/mit-compressm.png",
    translation: "assets/news/mit-compressm.png",
    productivity: "assets/news/adobe-firefly-precision-flow.jpg",
    creative: "assets/news/adobe-firefly-precision-flow.jpg",
    developer: "assets/news/chatgpt-100-tier-source.png",
    infrastructure: "assets/news/openai-cyber-defense-local.jpg",
    anthropic: "assets/news/superhuman-claude-mythos.png",
    perplexity: "assets/news/perplexity-billion-build.png",
    google: "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
    openai: "assets/news/chatgpt-100-tier-source.png",
    adobe: "assets/news/adobe-firefly-precision-flow.jpg",
    deepseek: "assets/news/deepseek-v3-open-source-first.png",
    claude: "assets/news/superhuman-claude-mythos.png",
    gemini: "assets/news/source-techcrunch-gemini-personal-intelligence.jpg"
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

    const settings = options || {};
    const fallbackUrl = settings.allowFallback === false ? "" : NEWS_WEEKLY_IMAGE_FALLBACKS.find((url) => !usedImages.has(url));
    if (fallbackUrl) {
      usedImages.add(fallbackUrl);
      return fallbackUrl;
    }

    return imageUrl || "";
  }

  function fallbackNewsImageUrl(item, options, primaryUrl) {
    if (item.fallbackImageUrl && item.fallbackImageUrl !== primaryUrl) {
      return item.fallbackImageUrl;
    }
    const fallbackItem = item.imageUrl ? { ...item, imageUrl: "" } : item;
    const fallbackUrl = newsImageUrl(fallbackItem, { ...(options || {}), allowFallback: true });
    return fallbackUrl && fallbackUrl !== primaryUrl ? fallbackUrl : "";
  }

  function newsImageMarkupFromUrl(item, className, imageUrl, fallbackImageUrl) {
    const primaryImageUrl = imageUrl || fallbackImageUrl || "";
    if (!primaryImageUrl) {
      return "";
    }
    const fallbackAttribute = imageUrl && fallbackImageUrl && imageUrl !== fallbackImageUrl ? ` data-fallback-src="${escapeAttribute(fallbackImageUrl)}"` : "";
    return `
      <span class="${className}">
        <img src="${primaryImageUrl}" alt="${escapeAttribute(item.title)}" loading="lazy"${fallbackAttribute} onerror="const fallback=this.dataset.fallbackSrc; if(fallback){ this.dataset.fallbackSrc=''; this.src=fallback; return; } const media=this.parentElement; if(media){media.style.display='none';} const card=this.closest('.news-feature-card, .news-list-item, .news-article-row'); if(card){card.classList.remove('has-media');}">
      </span>
    `;
  }

  function newsImageMarkup(item, className, options) {
    const imageUrl = newsImageUrl(item, options);
    const fallbackImageUrl = fallbackNewsImageUrl(item, options, imageUrl);
    if (!imageUrl && !fallbackImageUrl) {
      return "";
    }
    const settings = options || {};
    if (settings.useBrightFallback) {
      return `<span class="${className} is-bright-news-art" data-news-art="${escapeAttribute(item.category || "default")}"></span>`;
    }
    return newsImageMarkupFromUrl(item, className, imageUrl, fallbackImageUrl);
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

    const maxHeight = sidebar.getBoundingClientRect().height;
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

  function bindNewsSidebarWheelScroll() {
    const newsSidebar = document.querySelector(".news-sidebar");
    if (!newsSidebar) {
      return;
    }

    newsSidebar.addEventListener(
      "wheel",
      (event) => {
        const maxScroll = newsSidebar.scrollHeight - newsSidebar.clientHeight;
        if (maxScroll <= 0) {
          return;
        }

        const nextScrollTop = newsSidebar.scrollTop + event.deltaY;
        const canScrollDown = event.deltaY > 0 && newsSidebar.scrollTop < maxScroll;
        const canScrollUp = event.deltaY < 0 && newsSidebar.scrollTop > 0;
        if (!canScrollDown && !canScrollUp) {
          return;
        }

        newsSidebar.scrollTop = Math.max(0, Math.min(maxScroll, nextScrollTop));
        event.preventDefault();
      },
      { passive: false }
    );
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
        const featureImageOptions = isHomePage ? { allowFallback: true, avoidPortraits: true } : { allowFallback: false, avoidPortraits: true };
        const featureImageUrl = uniqueNewsImageUrl(item, featureImageOptions, weeklyNewsImages);
        const featureFallbackImageUrl = fallbackNewsImageUrl(item, featureImageOptions, featureImageUrl);
        const title = isHomePage ? shortenWords(item.title, 7) : item.title;
        const summary = isHomePage ? shortenWords(item.summary, 18) : item.summary;
        const excerpt = item.excerpt ? (isHomePage ? shortenWords(item.excerpt, 18) : item.excerpt) : "";
        return `
        <article class="news-feature-card ${index === 0 ? "is-primary" : ""} ${(featureImageUrl || featureFallbackImageUrl) ? "has-media" : ""}">
          ${newsImageMarkupFromUrl(item, "news-feature-media", featureImageUrl, featureFallbackImageUrl)}
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
          ${releaseAppShortcuts
            .map(
              (app) => `
                <a class="submit-app-link" href="${app.href}" target="_blank" rel="noreferrer" aria-label="${escapeAttribute(app.name)} on the App Store">
                  <img class="submit-app-icon" src="${app.iconUrl}" alt="${escapeAttribute(app.name)}">
                  <span class="submit-app-name">${app.meta}: ${app.name}</span>
                </a>
              `
            )
            .join("")}
        </div>
      `;
    }

    renderNewsDateBrowser();

    if (ui.newsHotTools) {
      ui.newsHotTools.innerHTML = newsToolListMarkup(tools.slice(0, 5), (tool) => formatVisits(tool.monthlyVisits));
    }

    if (ui.newsLatestTools) {
      ui.newsLatestTools.innerHTML = newsToolListMarkup(newAndNotableTools(5), () => "New");
    }

    if (ui.newsLatestArticles) {
      const latestArticleItems = latestRecentNewsItems(items, 5);
      ui.newsLatestArticles.innerHTML = latestArticleItems
        .map((item) => {
          const articleImageOptions = isNewsPage ? { allowFallback: false, avoidPortraits: true } : { allowFallback: true, avoidPortraits: true };
          const articleImageUrl = uniqueNewsImageUrl(item, articleImageOptions, weeklyNewsImages);
          const articleFallbackImageUrl = fallbackNewsImageUrl(item, articleImageOptions, articleImageUrl);
          return `
          <a class="news-article-row ${(articleImageUrl || articleFallbackImageUrl) ? "has-media" : ""}" href="${item.href}" target="_blank" rel="noreferrer">
            ${newsImageMarkupFromUrl(item, "news-article-media", articleImageUrl, articleFallbackImageUrl)}
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

    const releaseToolItems = newAndNotableTools(5).map((tool) => ({
      type: "tool",
      name: tool.name,
      meta: `${tool.vendor} - ${tool.categories.slice(0, 2).join(" / ")}`,
      href: tool.url,
      iconMarkup: iconShell(tool, "release-ticker-icon"),
      badge: "New"
    }));
    const releaseAppItems = releaseAppShortcuts.map((app) => ({
      type: "app",
      name: app.name,
      meta: app.meta,
      href: app.href,
      iconMarkup: `
        <span class="tool-icon-wrap release-ticker-icon" data-tip="${escapeAttribute(app.name)}">
          <span class="tool-icon-shell">
            <img src="${app.iconUrl}" alt="${escapeAttribute(app.name)} icon" loading="lazy">
          </span>
        </span>
      `,
      badge: "New"
    }));
    const releaseItems = [...releaseToolItems, ...releaseAppItems];
    if (!releaseItems.length) {
      ui.releaseTickerTrack.innerHTML = `
        <div class="release-ticker-empty">
          <span>No new product release notices yet.</span>
        </div>
      `;
      return;
    }

    const releaseMarkup = releaseItems
      .map((item) => `
        <a class="release-ticker-item" href="${item.href}" target="_blank" rel="noreferrer">
          <img class="release-ticker-hot" src="assets/hot-badge.svg" alt="Hot" loading="lazy">
          ${item.iconMarkup}
          <span class="release-ticker-copy">
            <strong>${item.name}</strong>
            <span>${item.meta}</span>
          </span>
          <span class="release-ticker-badge">${item.badge}</span>
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
      .map((tool, index) =>
        toolCard(tool, {
          className: "tool-tile",
          meta: tool.pricing === "Free" ? "Free" : formatVisits(tool.monthlyVisits),
          summary: tool.summary,
          summaryLength: 104,
          iconOptions: index < 4 ? { eager: true } : null
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
          <h5>${flow.title}</h5>
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

  function operatorStackGroupSection(group) {
    const flows = operatorStackFlows.filter((flow) => flow.group === group.id);
    if (!flows.length) {
      return "";
    }

    const countLabel = `${flows.length} ${flows.length === 1 ? "flow" : "flows"}`;
    return `
      <section class="stack-group" data-stack-group="${group.id}">
        <div class="stack-group-head">
          <div class="stack-group-copy">
            <p class="kicker">Workflow Lane</p>
            <h4>${group.label}</h4>
            <p>${group.description}</p>
          </div>
          <span class="stack-group-count">${countLabel}</span>
        </div>
        <div class="stack-group-grid">
          ${flows.map((flow) => operatorFlowCard(flow)).join("")}
        </div>
      </section>
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
      ui.stackList.innerHTML = operatorStackGroups.map((group) => operatorStackGroupSection(group)).join("");
    }

    const newest = newAndNotableTools();

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
    const isHomePage = document.body?.dataset?.page === "home";
    const boards = isHomePage ? usecaseBoards.slice(0, homeUseCasePreviewCount) : usecaseBoards;

    ui.usecaseWall.innerHTML = boards
      .map((board) => {
        const boardTools = board.tools
          .map((id) => toolById.get(id))
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

    ensureDirectoryVisibleCounts();
    const isCompact = isCompactDirectoryViewport();
    const items = filteredTools();
    const itemsByCategory = new Map();

    items.forEach((tool) => {
      tool.categories.forEach((category) => {
        if (category === "All") {
          return;
        }

        const categoryItems = itemsByCategory.get(category);
        if (categoryItems) {
          categoryItems.push(tool);
        } else {
          itemsByCategory.set(category, [tool]);
        }
      });
    });

    const visibleCategories = categories
      .filter((category) => category !== "All")
      .map((category) => ({
        category,
        items: itemsByCategory.get(category) || []
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
                  .slice(0, isCompact ? 3 : 4)
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
        .map(({ category, items: categoryItems }) => {
          const visibleCount = directoryVisibleCount(category, categoryItems.length);
          const remainingCount = Math.max(0, categoryItems.length - visibleCount);
          const statusText = remainingCount
            ? (isCompact
                ? `${visibleCount}/${categoryItems.length} shown. More tools load automatically.`
                : `Showing ${visibleCount} of ${categoryItems.length} tools in this lane. More load automatically as you scroll.`)
            : (isCompact
                ? `All ${categoryItems.length} tools are shown.`
                : `Showing all ${categoryItems.length} tools in this lane.`);

          return `
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
                  .slice(0, visibleCount)
                  .map((tool) =>
                    toolCard(tool, {
                      className: "directory-item",
                      id: slugify(`${category}-${tool.name}`),
                      meta: tool.pricing,
                      summary: tool.summary,
                      summaryLength: isCompact ? 72 : 96
                    })
                  )
                  .join("")}
              </div>
              <div class="directory-section-footer">
                <span class="directory-section-status">${statusText}</span>
                ${remainingCount
                  ? `
                    <span class="directory-section-autoload">${isCompact ? `Next ${Math.min(DIRECTORY_SECTION_LOAD_STEP, remainingCount)} load near the end.` : `Loading the next ${Math.min(DIRECTORY_SECTION_LOAD_STEP, remainingCount)} tools as you get near the end.`}</span>
                    <span class="directory-autoload-sentinel" data-directory-autoload="${escapeAttribute(category)}" aria-hidden="true"></span>
                  `
                  : ""}
              </div>
            </section>
          `;
        })
        .join("");
    }

    ui.directoryGrid.innerHTML = items
      .slice(0, currentDirectoryShortlistCount())
      .map((tool, index) =>
        toolCard(tool, {
          className: "directory-item",
          id: slugify(tool.name),
          meta: tool.pricing,
          summary: tool.recommendation,
          summaryLength: isCompact ? 80 : 102,
          iconOptions: index < 6 ? { eager: true } : null
        })
      )
      .join("");

    observeDirectoryAutoload();
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
  let floatingTooltip = null;
  let activeFloatingTooltipSummary = null;

  function clampValue(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

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
    } else if (!fitsAbove && !fitsBelow) {
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

  function tooltipLayerBoundaries(summary) {
    if (!summary) {
      return [];
    }

    const boundaries = [
      summary.closest(".mini-item, .tool-tile, .rank-item, .directory-item, .lane-item, .usecase-tool, .deep-ranking-item, .stack-card, .stack-tool-chip"),
      summary.closest(".feature-panel, .section-card")
    ].filter(Boolean);

    return [...new Set(boundaries)];
  }

  function setTooltipLayerBoundary(summary, active) {
    tooltipLayerBoundaries(summary).forEach((boundary) => {
      boundary.classList.toggle("is-tooltip-active", active);
    });
  }

  function ensureFloatingTooltip() {
    if (floatingTooltip && document.body.contains(floatingTooltip)) {
      return floatingTooltip;
    }

    floatingTooltip = document.createElement("div");
    floatingTooltip.className = "tool-floating-tip";
    floatingTooltip.setAttribute("role", "tooltip");
    floatingTooltip.innerHTML = '<span class="tool-floating-tip-text"></span><span class="tool-floating-tip-arrow" aria-hidden="true"></span>';
    document.body.appendChild(floatingTooltip);
    return floatingTooltip;
  }

  function positionFloatingTooltip(summary) {
    if (!summary || !summary.dataset.tip) {
      return;
    }

    const tooltip = ensureFloatingTooltip();
    const text = tooltip.querySelector(".tool-floating-tip-text");
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const maxWidth = Math.max(180, Math.min(360, viewportWidth - TOOLTIP_VIEWPORT_MARGIN * 2));

    if (text) {
      text.textContent = summary.dataset.tip;
    }

    tooltip.style.maxWidth = `${maxWidth}px`;
    tooltip.style.width = "";
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.style.visibility = "hidden";
    tooltip.classList.add("is-visible");

    const anchorRect = summary.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = Math.ceil(tooltipRect.width);
    const tooltipHeight = Math.ceil(tooltipRect.height);
    const spaceAbove = anchorRect.top - TOOLTIP_BUBBLE_GAP - TOOLTIP_VIEWPORT_MARGIN;
    const spaceBelow = viewportHeight - anchorRect.bottom - TOOLTIP_BUBBLE_GAP - TOOLTIP_VIEWPORT_MARGIN;
    const direction = spaceAbove >= tooltipHeight || spaceAbove >= spaceBelow ? "up" : "down";
    const left = clampValue(
      anchorRect.left,
      TOOLTIP_VIEWPORT_MARGIN,
      Math.max(TOOLTIP_VIEWPORT_MARGIN, viewportWidth - TOOLTIP_VIEWPORT_MARGIN - tooltipWidth)
    );
    const top = direction === "up"
      ? Math.max(TOOLTIP_VIEWPORT_MARGIN, anchorRect.top - tooltipHeight - TOOLTIP_BUBBLE_GAP)
      : Math.min(
          viewportHeight - TOOLTIP_VIEWPORT_MARGIN - tooltipHeight,
          anchorRect.bottom + TOOLTIP_BUBBLE_GAP
        );
    const arrowLeft = clampValue(
      anchorRect.left + anchorRect.width / 2 - left,
      TOOLTIP_ARROW_EDGE_PADDING,
      Math.max(TOOLTIP_ARROW_EDGE_PADDING, tooltipWidth - TOOLTIP_ARROW_EDGE_PADDING)
    );

    tooltip.dataset.direction = direction;
    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(top)}px`;
    tooltip.style.setProperty("--floating-tip-arrow-left", `${Math.round(arrowLeft)}px`);
    tooltip.style.visibility = "";
  }

  function showFloatingTooltip(summary) {
    if (!summary || !summary.dataset.tip) {
      return;
    }

    activeFloatingTooltipSummary = summary;
    summary.classList.add("is-floating-tooltip-active");
    positionFloatingTooltip(summary);
  }

  function hideFloatingTooltip(summary) {
    if (summary) {
      summary.classList.remove("is-floating-tooltip-active");
    }

    if (activeFloatingTooltipSummary === summary) {
      activeFloatingTooltipSummary = null;
    }

    if (floatingTooltip) {
      floatingTooltip.classList.remove("is-visible");
      floatingTooltip.style.visibility = "";
    }
  }

  function refreshFloatingTooltip() {
    if (activeFloatingTooltipSummary) {
      positionFloatingTooltip(activeFloatingTooltipSummary);
    }
  }

  function activateTooltipSummary(summary) {
    if (!summary) {
      return;
    }

    setTooltipLayerBoundary(summary, true);
    applyTooltipDirection(summary);
    showFloatingTooltip(summary);
  }

  function deactivateTooltipSummary(summary) {
    if (!summary) {
      return;
    }

    setTooltipLayerBoundary(summary, false);
    hideFloatingTooltip(summary);
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
      submitSearchQuery(state.query, {
        sourceInput: topbarSearchInput
      });
      return;
    }

    submitSearchQuery(ui.searchInput.value, {
      sourceInput: ui.searchInput
    });
  }

  function bindStaticEvents() {
    bindSidebarWheelScroll();
    bindNewsSidebarWheelScroll();
    bindNavFlyouts();
    bindTopbarSearch();
    document.addEventListener("error", handleToolIconError, true);

    document.addEventListener("pointerover", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary || summary.contains(event.relatedTarget)) {
        return;
      }
      activateTooltipSummary(summary);
    });

    document.addEventListener("pointerout", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary || summary.contains(event.relatedTarget)) {
        return;
      }
      deactivateTooltipSummary(summary);
    });

    document.addEventListener("mouseenter", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      activateTooltipSummary(summary);
    }, true);

    document.addEventListener("mouseleave", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      deactivateTooltipSummary(summary);
    }, true);

    document.addEventListener("focusin", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      activateTooltipSummary(summary);
    });

    document.addEventListener("focusout", (event) => {
      const summary = event.target.closest(".tool-summary[data-tip]");
      if (!summary) {
        return;
      }
      window.setTimeout(() => {
        if (!summary.contains(document.activeElement)) {
          deactivateTooltipSummary(summary);
        }
      }, 0);
    });

    window.addEventListener("scroll", refreshFloatingTooltip, { passive: true });
    window.addEventListener("resize", refreshFloatingTooltip);

    window.addEventListener("resize", refreshTooltipDirections);
    window.addEventListener("scroll", refreshTooltipDirections, { passive: true });

    if (ui.searchInput) {
      setInputValue(ui.searchInput, state.query);

      ui.searchInput.addEventListener("input", function (event) {
        applySearchQuery(event.target.value, {
          sourceInput: event.target,
          syncUrl: isDirectoryPage()
        });
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
        state.directoryVisibleCounts = {};
        state.directorySignature = "";
        syncSearchInputs("", null);
        syncDirectorySearchUrl("");
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
    renderFeaturedNavFlyout();
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
