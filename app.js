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
      id: "deepseek",
      label: "DeepSeek",
      icon: "DS",
      toolId: "deepseek",
      description: "Reasoning-first prompts for analysis and technical problem solving.",
      headline: "Reasoning-first prompts for technical and analytical work",
      bestFor: ["Architecture reviews", "Debugging", "Tradeoff analysis", "Step-by-step reasoning"],
      formula: ["Problem", "Assumptions", "Alternatives", "Evaluation criteria", "Recommended answer"],
      guidance: "DeepSeek prompts perform best when you explicitly ask for assumptions, alternative paths, edge cases, and a final recommendation."
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
      id: "marketing",
      label: "Marketing",
      icon: "Mk",
      toolId: "jasper",
      description: "Campaign, landing page, and positioning prompt patterns.",
      headline: "Positioning, copy, and campaign prompts for growth teams",
      bestFor: ["Positioning", "Landing pages", "ICP work", "Campaign planning"],
      formula: ["Audience", "Pain", "Offer", "Proof", "CTA"],
      guidance: "Marketing prompts improve when you define buyer pain, buying trigger, proof, and the exact conversion action you want."
    },
    {
      id: "coding",
      label: "Coding",
      icon: "</>",
      toolId: "githubcopilot",
      description: "Prompt starters for shipping features, fixing bugs, and planning builds.",
      headline: "Engineering prompts for planning, debugging, and delivery",
      bestFor: ["Feature planning", "Bug triage", "Refactoring", "Rollout checklists"],
      formula: ["Problem statement", "Constraints", "Affected systems", "Test plan", "Risk review"],
      guidance: "Coding prompts are stronger when you define affected modules, constraints, test expectations, and rollout risks up front."
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
      track: "marketing",
      title: "Landing page messaging",
      summary: "Turn features into cleaner homepage copy.",
      body: "You are a senior conversion copywriter. Using the product notes below, write a landing page structure with hero headline, subhead, three benefit blocks, proof points, objections, and a CTA that feels premium but clear."
    },
    {
      track: "marketing",
      title: "Audience ICP builder",
      summary: "Sharpen positioning before writing campaigns.",
      body: "Based on this product description, define three high-fit ICPs. For each one, include pains, buying triggers, objections, use cases, and the value proposition angle most likely to convert."
    },
    {
      track: "marketing",
      title: "Campaign angle generator",
      summary: "Generate stronger hooks before ad and launch work begins.",
      body: "Act as a product marketing lead. Based on the product, audience, and current market context, generate five campaign angles. For each one include the core tension, headline direction, proof point, objection to overcome, and the CTA that best fits the angle."
    },
    {
      track: "coding",
      title: "Feature implementation plan",
      summary: "Break a request into concrete engineering work.",
      body: "Act as a staff engineer. Convert this feature request into a practical implementation plan with assumptions, affected modules, API changes, UI changes, migration needs, test plan, and rollout risks."
    },
    {
      track: "coding",
      title: "Bug triage prompt",
      summary: "Faster debugging for reproducible issues.",
      body: "You are debugging a production issue. Given the error, logs, and recent changes, propose the most likely root causes, what to inspect first, and the smallest safe fix path. End with tests to prevent regression."
    },
    {
      track: "coding",
      title: "Refactor risk review",
      summary: "Evaluate what can break before touching live modules.",
      body: "Act as a senior engineer reviewing a refactor proposal. List the modules most at risk, the behaviors that could regress, the tests that should exist first, and a phased rollout plan with rollback checkpoints."
    }
  ];

  const promptQuery = new URLSearchParams(window.location.search);
  const promptTrackIds = new Set(promptTracks.map((track) => track.id));

  const state = {
    query: "",
    activeCategory: "All",
    activePricing: "All",
    activeRanking: "Assistants",
    activePromptTrack: promptTrackIds.has(promptQuery.get("track")) ? promptQuery.get("track") : "deepseek",
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
    hotFilters: document.getElementById("hot-filters"),
    hotGrid: document.getElementById("hot-grid"),
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
      deepseek: ["DeepSeek", "Reasoning-first", "technical", "analysis", "assumptions", "alternative", "recommendation"],
      midjourney: ["Midjourney", "Visual", "imagery", "concept", "lighting", "mood"],
      marketing: ["Marketing", "campaign", "positioning", "copy", "growth", "CTA"],
      coding: ["Coding", "Engineering", "debugging", "delivery", "test", "risk"]
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
    return tools.filter((tool) => {
      const haystack = [
        tool.name,
        tool.vendor,
        tool.summary,
        tool.recommendation,
        ...tool.categories,
        ...tool.audience
      ]
        .join(" ")
        .toLowerCase();

      const categoryMatches = state.activeCategory === "All" || tool.categories.includes(state.activeCategory);
      const pricingMatches = state.activePricing === "All" || tool.pricing === state.activePricing;
      const queryMatches = !query || haystack.includes(query);
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
        document.getElementById("hot-tools").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderHeroMetrics() {
    if (ui.heroToolsCopy) {
      ui.heroToolsCopy.textContent = String(tools.length);
    }
    if (ui.heroCategoryCopy) {
      ui.heroCategoryCopy.textContent = String(categories.length - 1);
    }
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
    ui.resultsCount.textContent = `${items.length} filtered tools`;

    if (!items.length) {
      ui.directoryGrid.innerHTML = `
        <div class="empty-state">
          <p class="kicker">No matches</p>
          <h3>Nothing matches your current search and filter combination.</h3>
        </div>
      `;
      return;
    }

    ui.directoryGrid.innerHTML = items
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
        ui.searchInput.value = "";
        renderAll();
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
      const button = event.target.closest("[data-featured-more]");
      if (!button) {
        return;
      }
      increaseFeaturedVisibleCount(button.dataset.featuredMore);
      renderTodayBoards();
    });
  }

  function renderAll() {
    renderPromptNavFlyout();
    renderSidebar();
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
