(function () {
  const catalog = window.AI_CATALOG;
  if (!catalog || !Array.isArray(catalog.tools)) {
    return;
  }

  function formatTrafficLabel(monthlyVisits) {
    if (monthlyVisits >= 1000000000) {
      return `${(monthlyVisits / 1000000000).toFixed(1)}B monthly visits`;
    }
    return `${(monthlyVisits / 1000000).toFixed(1)}M monthly visits`;
  }

  const existingIds = new Set(catalog.tools.map((tool) => tool.id));
  const sharedSources = {
    futurepedia: "https://www.futurepedia.io/ai-tools",
    toolify: "https://www.toolify.ai/Best-trending-AI-Tools"
  };

  const builders = ["Developers", "AI teams", "Platform teams"];
  const creators = ["Creators", "Marketers", "Studios"];
  const supportTeams = ["Support teams", "Operations teams", "Enterprises"];
  const businessTeams = ["Founders", "Product teams", "Operators"];
  const researchers = ["Researchers", "Analysts", "Knowledge workers"];
  const students = ["Students", "Researchers", "Knowledge workers"];
  const revenueTeams = ["Revenue teams", "Marketers", "Agencies"];
  const clinicians = ["Clinicians", "Healthcare teams", "Specialists"];
  const legalTeams = ["Legal teams", "Analysts", "Enterprises"];
  const financeTeams = ["Finance teams", "Analysts", "Enterprises"];

  const buildLane = ["Coding", "Automation", "Research"];
  const creativeLane = ["Design", "Video", "Audio"];
  const supportLane = ["Assistants", "Sales", "Automation"];
  const writingLane = ["Writing", "Research", "Productivity"];
  const productLane = ["Productivity", "Design", "Writing"];
  const voiceLane = ["Audio", "Coding", "Productivity"];
  const salesLane = ["Sales", "Productivity", "Automation"];
  const studyLane = ["Research", "Productivity", "Writing"];

  function addRows(rows) {
    rows.forEach(([
      id,
      name,
      vendor,
      logoLetter,
      accent,
      url,
      summary,
      categories,
      audience,
      pricing,
      monthlyVisits,
      recommendation
    ]) => {
      if (existingIds.has(id)) {
        return;
      }
      catalog.tools.push({
        id,
        name,
        vendor,
        logoLetter,
        accent,
        url,
        summary,
        categories,
        audience,
        pricing,
        monthlyVisits,
        recommendation,
        trafficLabel: formatTrafficLabel(monthlyVisits),
        sources: sharedSources
      });
      existingIds.add(id);
    });
  }

  addRows([
    ["agentops", "AgentOps", "AgentOps", "A", "linear-gradient(145deg, #111827, #2563eb)", "https://www.agentops.ai/", "An operations platform for tracing, evaluating, and monitoring AI agents in production.", buildLane, builders, "Freemium", 8600000, "A strong addition because agent operations is now a core buyer category."],
    ["helicone", "Helicone", "Helicone", "H", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.helicone.ai/", "An AI gateway and observability stack for logging, caching, and evaluating model traffic.", buildLane, builders, "Freemium", 7200000, "Useful for teams comparing the fast-growing LLM ops layer."],
    ["portkey", "Portkey", "Portkey", "P", "linear-gradient(145deg, #111827, #ec4899)", "https://portkey.ai/", "A production platform for model routing, governance, and reliability across AI workloads.", buildLane, builders, "Freemium", 6400000, "A good fit for builders who need model control and governance in one place."],
    ["braintrust", "Braintrust", "Braintrust", "B", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.braintrust.dev/", "An observability and evals platform for measuring AI quality, prompts, and production behavior.", buildLane, builders, "Paid", 5100000, "A solid add because evals are now a mainstream requirement for AI teams."],
    ["langflow", "Langflow", "Langflow", "L", "linear-gradient(145deg, #7c3aed, #2563eb)", "https://www.langflow.org/", "A low-code builder for agentic and RAG workflows with visual composition and deployment.", buildLane, builders, "Free / Paid", 8800000, "A hot builder tool with strong appeal for teams that want visual AI orchestration."],
    ["zep", "Zep", "Zep", "Z", "linear-gradient(145deg, #0f172a, #14b8a6)", "https://www.getzep.com/", "A memory and context platform that helps agents retain facts, history, and user state.", buildLane, builders, "Usage-based", 4300000, "A timely pick as long-term memory becomes foundational to agents."],
    ["arizephoenix", "Arize Phoenix", "Arize", "A", "linear-gradient(145deg, #f97316, #2563eb)", "https://phoenix.arize.com/", "An open-source observability and evals tool for LLM apps, retrieval systems, and agents.", buildLane, builders, "Free / Paid", 3900000, "A strong open-source choice for teams instrumenting AI behavior."],
    ["trulens", "TruLens", "TruEra", "T", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.trulens.org/", "An evaluation toolkit for measuring quality, groundedness, and safety in AI systems.", buildLane, builders, "Free / Paid", 3200000, "A useful add for builder audiences comparing LLM evaluation stacks."],
    ["ragas", "Ragas", "Ragas", "R", "linear-gradient(145deg, #111827, #22c55e)", "https://www.ragas.io/", "An evaluation framework for RAG pipelines, agent quality, and response correctness.", buildLane, builders, "Free / Paid", 4800000, "A notable framework because retrieval quality still drives many enterprise builds."],
    ["mastra", "Mastra", "Mastra", "M", "linear-gradient(145deg, #2563eb, #f97316)", "https://mastra.ai/", "A TypeScript framework and platform for building, testing, and operating AI agents.", buildLane, builders, "Free / Paid", 5700000, "A strong addition for modern teams building agents in TypeScript-heavy stacks."]
  ]);

  addRows([
    ["e2b", "E2B", "E2B", "E", "linear-gradient(145deg, #111827, #14b8a6)", "https://e2b.dev/", "A cloud runtime for AI agents that need secure code execution and browser-style tooling.", buildLane, builders, "Usage-based", 5600000, "A practical infra pick for teams building tool-using agents."],
    ["baseten", "Baseten", "Baseten", "B", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.baseten.co/", "An inference platform for deploying, scaling, and serving AI models in production.", buildLane, builders, "Usage-based", 7400000, "A strong model-serving platform with durable builder demand."],
    ["fireworksai", "Fireworks AI", "Fireworks", "F", "linear-gradient(145deg, #111827, #ef4444)", "https://fireworks.ai/", "A high-performance inference platform for running open and custom models at scale.", buildLane, builders, "Usage-based", 12800000, "A major AI infra brand that belongs in a high-interest directory."],
    ["hyperbolic", "Hyperbolic", "Hyperbolic", "H", "linear-gradient(145deg, #2563eb, #ec4899)", "https://www.hyperbolic.ai/", "An open-access AI cloud for GPUs, inference, and builder-friendly compute workflows.", buildLane, builders, "Usage-based", 6100000, "Useful for users comparing new AI-native compute platforms."],
    ["leptonai", "Lepton AI", "Lepton", "L", "linear-gradient(145deg, #0f172a, #2563eb)", "https://www.lepton.ai/", "A platform for deploying AI workloads and connecting developers to scalable GPU compute.", buildLane, builders, "Usage-based", 4200000, "A good addition for teams shipping AI products with custom infrastructure needs."],
    ["promptfoo", "Promptfoo", "Promptfoo", "P", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.promptfoo.dev/", "A testing and security platform for evaluating prompts, agents, and model behavior.", buildLane, builders, "Free / Paid", 5900000, "A timely add as secure AI shipping becomes more important."],
    ["vellum", "Vellum", "Vellum", "V", "linear-gradient(145deg, #111827, #8b5cf6)", "https://www.vellum.ai/", "A platform for designing, testing, and deploying AI workflows without heavy code.", buildLane, builders, "Paid", 4700000, "A useful builder option for teams that want more product polish around orchestration."],
    ["whylabs", "WhyLabs", "WhyLabs", "W", "linear-gradient(145deg, #2563eb, #22c55e)", "https://whylabs.ai/", "An AI monitoring platform for catching drift, failures, and production quality issues.", buildLane, builders, "Paid", 3000000, "A solid monitoring pick for teams taking AI reliability seriously."],
    ["opik", "Opik", "Comet", "O", "linear-gradient(145deg, #f97316, #2563eb)", "https://www.comet.com/site/products/opik/", "An open-source LLM evaluation platform for testing prompts, agents, and response quality.", buildLane, builders, "Free / Paid", 3400000, "A strong choice for teams comparing modern open eval tools."],
    ["browserbase", "Browserbase", "Browserbase", "B", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.browserbase.com/", "A cloud browser infrastructure platform for AI agents and web automation workflows.", buildLane, builders, "Usage-based", 9500000, "A major agent-internet building block with clear market momentum."]
  ]);

  addRows([
    ["agentql", "AgentQL", "AgentQL", "A", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.agentql.com/", "A web extraction layer that makes websites easier for AI agents to read and act on.", buildLane, builders, "Usage-based", 4600000, "A practical tool for builders turning the web into structured agent input."],
    ["relayapp", "Relay.app", "Relay", "R", "linear-gradient(145deg, #111827, #ec4899)", "https://www.relay.app/", "An automation platform that blends AI steps with business workflows and human review.", salesLane, businessTeams, "Freemium", 3700000, "A good fit for operators who want AI inside repeatable automations."],
    ["leapai", "Leap AI", "Leap", "L", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.tryleap.ai/", "An API and workflow platform for building AI features into apps without heavy ML setup.", buildLane, builders, "Usage-based", 3200000, "A useful addition for product teams shipping embedded AI features quickly."],
    ["meshy", "Meshy", "Meshy", "M", "linear-gradient(145deg, #7c3aed, #2563eb)", "https://www.meshy.ai/", "An AI 3D generation platform for creating meshes, textures, and game-ready assets.", creativeLane, creators, "Freemium", 16100000, "A hot 3D creation platform with strong creator and game-builder pull."],
    ["kaiber", "Kaiber", "Kaiber", "K", "linear-gradient(145deg, #111827, #f97316)", "https://kaiber.ai/", "A creative video platform for stylized motion, music visuals, and prompt-driven scenes.", creativeLane, creators, "Freemium", 9300000, "A high-interest visual brand that broadens the video generation lane."],
    ["visualelectric", "Visual Electric", "Visual Electric", "V", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://visualelectric.com/", "A design-led image creation tool for polished brand visuals and editorial outputs.", creativeLane, creators, "Paid", 3500000, "A strong design-native option for users who want more art direction than raw prompting."],
    ["designify", "Designify", "Designify", "D", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.designify.com/", "An AI image editing tool for turning product and lifestyle photos into cleaner visuals.", creativeLane, creators, "Freemium", 7800000, "A practical creative tool for commerce and marketing visuals."],
    ["generatedphotos", "Generated Photos", "Generated Photos", "G", "linear-gradient(145deg, #111827, #14b8a6)", "https://generated.photos/", "A synthetic media platform for face generation, model photos, and visual datasets.", creativeLane, creators, "Freemium", 5400000, "A useful entry for teams working with avatar, casting, or synthetic visual assets."],
    ["wondercraft", "Wondercraft", "Wondercraft", "W", "linear-gradient(145deg, #f97316, #2563eb)", "https://www.wondercraft.ai/", "An AI audio studio for podcasts, voiceovers, and spoken content production.", creativeLane, creators, "Freemium", 4100000, "A strong audio creation tool with broad creator relevance."],
    ["cleanvoice", "Cleanvoice", "Cleanvoice", "C", "linear-gradient(145deg, #111827, #22c55e)", "https://cleanvoice.ai/", "An AI editor that removes filler sounds, silences, and cleanup chores from audio.", creativeLane, creators, "Paid", 3300000, "A clear productivity add for podcasters and spoken-media teams."]
  ]);

  addRows([
    ["lalalai", "LALAL.AI", "LALAL.AI", "L", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.lalal.ai/", "An AI stem separation tool for splitting vocals, instruments, and audio elements cleanly.", creativeLane, creators, "Freemium", 14400000, "A high-traffic music utility that belongs in the audio lane."],
    ["moises", "Moises", "Moises", "M", "linear-gradient(145deg, #111827, #ec4899)", "https://moises.ai/", "A musician-focused AI app for stem separation, practice tools, and track control.", creativeLane, creators, "Freemium", 19600000, "A major consumer audio tool with strong music-creator demand."],
    ["papercup", "Papercup", "Papercup", "P", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.papercup.com/", "An AI dubbing platform for localizing spoken media into more languages.", creativeLane, creators, "Paid", 3100000, "A good pick for teams translating video and audio content at scale."],
    ["hourone", "Hour One", "Hour One", "H", "linear-gradient(145deg, #111827, #2563eb)", "https://hourone.ai/", "An avatar video platform for explainers, training, and presentation-style outputs.", creativeLane, creators, "Paid", 2900000, "A solid business-video choice beyond the creator-first tools."],
    ["deepbrain", "DeepBrain AI", "DeepBrain", "D", "linear-gradient(145deg, #2563eb, #06b6d4)", "https://www.deepbrain.io/", "An AI video studio for avatars, multilingual delivery, and enterprise content production.", creativeLane, creators, "Paid", 6700000, "A strong addition for teams comparing avatar and presenter video platforms."],
    ["virbo", "Wondershare Virbo", "Wondershare", "V", "linear-gradient(145deg, #111827, #f97316)", "https://virbo.wondershare.com/", "An AI avatar and video generator for social clips, explainers, and marketing output.", creativeLane, creators, "Freemium", 8200000, "A practical, high-intent video product with mainstream appeal."],
    ["wonderstudio", "Wonder Studio", "Wonder Dynamics", "W", "linear-gradient(145deg, #7c3aed, #2563eb)", "https://wonderdynamics.com/", "An AI filmmaking tool for placing CG characters into live-action scenes faster.", creativeLane, creators, "Paid", 4400000, "A distinctive creative product with strong film and studio curiosity."],
    ["topaz", "Topaz Labs", "Topaz", "T", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.topazlabs.com/", "An AI enhancement suite for sharpening, upscaling, and restoring images and video.", creativeLane, creators, "Paid", 21200000, "A major visual-improvement brand with durable creator traction."],
    ["avclabs", "AVCLabs", "AVCLabs", "A", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.avclabs.com/", "An AI media enhancement suite for upscaling, cleanup, and restoration workflows.", creativeLane, creators, "Paid", 7600000, "A practical media enhancement tool for creators and editors."],
    ["podsqueeze", "Podsqueeze", "Podsqueeze", "P", "linear-gradient(145deg, #f97316, #2563eb)", "https://podsqueeze.com/", "An AI content repurposing tool that turns podcast episodes into summaries and assets.", writingLane, creators, "Paid", 2400000, "A useful content-ops product for podcasters and media teams."]
  ]);

  addRows([
    ["audioshake", "AudioShake", "AudioShake", "A", "linear-gradient(145deg, #111827, #22c55e)", "https://www.audioshake.ai/", "An AI audio separation platform for stems, remixing, and media production workflows.", creativeLane, creators, "Paid", 2200000, "A strong specialist audio tool with real production use cases."],
    ["boomy", "Boomy", "Boomy", "B", "linear-gradient(145deg, #2563eb, #ec4899)", "https://boomy.com/", "A music generation platform for creating songs quickly and publishing them widely.", creativeLane, creators, "Freemium", 10100000, "A well-known consumer music-AI product with broad reach."],
    ["soundraw", "SOUNDRAW", "SOUNDRAW", "S", "linear-gradient(145deg, #111827, #14b8a6)", "https://soundraw.io/", "An AI music generator for royalty-free tracks, pacing control, and content-ready audio.", creativeLane, creators, "Paid", 8700000, "A strong music-generation choice for commercial content teams."],
    ["beatoven", "Beatoven.ai", "Beatoven", "B", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.beatoven.ai/", "An AI soundtrack tool for making royalty-free background music and mood-driven audio.", creativeLane, creators, "Freemium", 4900000, "A useful audio option for creators who need music tailored to scenes or formats."],
    ["musicfy", "Musicfy", "Musicfy", "M", "linear-gradient(145deg, #7c3aed, #2563eb)", "https://musicfy.lol/", "An AI voice song generator for turning ideas into vocal performances and music demos.", creativeLane, creators, "Freemium", 11300000, "A hot consumer audio product with strong experimentation energy."],
    ["yellowai", "Yellow.ai", "Yellow.ai", "Y", "linear-gradient(145deg, #111827, #f97316)", "https://yellow.ai/", "An enterprise platform for AI agents handling support, service, and employee workflows.", supportLane, supportTeams, "Paid", 6300000, "A notable enterprise support agent brand with global reach."],
    ["cognigy", "Cognigy", "Cognigy", "C", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.cognigy.com/", "A conversational AI platform for automating customer service across chat and voice.", supportLane, supportTeams, "Paid", 5200000, "A strong contact-center AI option with mature enterprise positioning."],
    ["glia", "Glia", "Glia", "G", "linear-gradient(145deg, #111827, #22c55e)", "https://www.glia.com/", "A digital customer service platform blending AI assistants with support workflows.", supportLane, supportTeams, "Paid", 4000000, "A useful addition for buyers comparing AI-first support infrastructure."],
    ["cresta", "Cresta", "Cresta", "C", "linear-gradient(145deg, #2563eb, #f97316)", "https://cresta.com/", "A contact-center intelligence platform for agent coaching, QA, and revenue conversations.", supportLane, supportTeams, "Paid", 3800000, "A strong support and sales intelligence product with clear enterprise demand."],
    ["artisan", "Artisan", "Artisan", "A", "linear-gradient(145deg, #111827, #ec4899)", "https://www.artisan.co/", "An AI outbound platform with digital workers focused on SDR-style prospecting and pipeline growth.", salesLane, revenueTeams, "Paid", 13500000, "A very visible sales-agent product that fits the current AI ops wave."]
  ]);

  addRows([
    ["elevenx", "11x", "11x", "11", "linear-gradient(145deg, #2563eb, #22c55e)", "https://11x.ai/", "An AI workforce platform for outbound prospecting, research, and revenue automation.", salesLane, revenueTeams, "Paid", 9200000, "A notable sales-agent brand with strong current momentum."],
    ["sybill", "Sybill", "Sybill", "S", "linear-gradient(145deg, #111827, #8b5cf6)", "https://www.sybill.ai/", "A meeting intelligence tool that captures buyer signals, summaries, and CRM-ready insights.", salesLane, revenueTeams, "Freemium", 4500000, "A useful addition for revenue teams evaluating AI meeting intelligence."],
    ["attention", "Attention", "Attention", "A", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.attention.com/", "An AI sales assistant for call insights, coaching, and CRM updates across go-to-market teams.", salesLane, revenueTeams, "Paid", 4100000, "A strong GTM workflow tool with clear category demand."],
    ["commonroom", "Common Room", "Common Room", "C", "linear-gradient(145deg, #111827, #f97316)", "https://www.commonroom.io/", "A signal capture platform that helps revenue teams turn intent data into AI-assisted pipeline.", salesLane, revenueTeams, "Paid", 5400000, "A high-interest revenue operations product that fits the current buying cycle."],
    ["warmly", "Warmly", "Warmly", "W", "linear-gradient(145deg, #2563eb, #ec4899)", "https://www.warmly.ai/", "An AI-assisted lead engagement platform for intent, outreach, and pipeline acceleration.", salesLane, revenueTeams, "Paid", 6100000, "A practical outbound and demand-gen tool with growing visibility."],
    ["abridge", "Abridge", "Abridge", "A", "linear-gradient(145deg, #111827, #22c55e)", "https://www.abridge.com/", "A clinical AI documentation platform that turns care conversations into structured notes and follow-up.", ["Meetings", "Productivity", "Writing"], clinicians, "Paid", 8400000, "A major healthcare AI documentation brand with strong adoption."],
    ["nabla", "Nabla", "Nabla", "N", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.nabla.com/", "A clinical assistant that drafts medical notes and supports documentation inside care workflows.", ["Meetings", "Productivity", "Writing"], clinicians, "Paid", 6600000, "A notable healthcare assistant with strong current demand."],
    ["suki", "Suki", "Suki", "S", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.suki.ai/", "An AI voice assistant for clinical documentation, orders, and care team productivity.", ["Audio", "Productivity", "Writing"], clinicians, "Paid", 5700000, "A durable healthcare AI brand worth surfacing for professional users."],
    ["deepscribe", "DeepScribe", "DeepScribe", "D", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.deepscribe.ai/", "An ambient AI medical scribe that converts patient conversations into clinical documentation.", ["Audio", "Productivity", "Writing"], clinicians, "Paid", 3000000, "A relevant healthcare workflow tool with strong ambient-documentation positioning."],
    ["ambience", "Ambience Healthcare", "Ambience", "A", "linear-gradient(145deg, #111827, #2563eb)", "https://www.ambiencehealthcare.com/", "An AI platform for ambient documentation, coding support, and clinical workflow automation.", ["Automation", "Productivity", "Writing"], clinicians, "Paid", 4800000, "A strong healthcare operations add for enterprise-oriented buyers."]
  ]);

  addRows([
    ["hippocratic", "Hippocratic AI", "Hippocratic", "H", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.hippocraticai.com/", "A healthcare-focused large language model platform for safe, patient-facing support tasks.", ["Assistants", "Automation", "Writing"], clinicians, "Paid", 7400000, "A prominent vertical-model company that broadens the healthcare lane."],
    ["evenup", "EvenUp", "EvenUp", "E", "linear-gradient(145deg, #111827, #ec4899)", "https://www.evenuplaw.com/", "An AI case-preparation platform that helps plaintiff law teams draft demand packages and claims analysis.", writingLane, legalTeams, "Paid", 9000000, "A high-visibility legal AI product with strong market pull."],
    ["paxton", "Paxton", "Paxton", "P", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.paxton.ai/", "An AI legal assistant for research, drafting, and policy-heavy professional workflows.", writingLane, legalTeams, "Paid", 3200000, "A useful addition for legal research and drafting buyers."],
    ["robinai", "Robin AI", "Robin AI", "R", "linear-gradient(145deg, #111827, #8b5cf6)", "https://robinai.com/", "A contract review and legal copilot platform focused on drafting, redlining, and review speed.", writingLane, legalTeams, "Paid", 3500000, "A strong contract-AI brand for legal and procurement teams."],
    ["luminance", "Luminance", "Luminance", "L", "linear-gradient(145deg, #2563eb, #f97316)", "https://www.luminance.com/", "A legal AI platform for contract review, negotiation, and repository-wide document analysis.", writingLane, legalTeams, "Paid", 4600000, "A major legal-tech AI company that belongs in the directory."],
    ["klarity", "Klarity", "Klarity", "K", "linear-gradient(145deg, #111827, #22c55e)", "https://www.klarity.ai/", "An AI document review platform for finance, compliance, and business process operations.", ["Automation", "Productivity", "Research"], financeTeams, "Paid", 3800000, "A solid operations AI choice for document-heavy finance work."],
    ["appzen", "AppZen", "AppZen", "A", "linear-gradient(145deg, #2563eb, #06b6d4)", "https://www.appzen.com/", "An AI finance platform for spend review, expense auditing, and autonomous AP workflows.", ["Automation", "Productivity", "Research"], financeTeams, "Paid", 4300000, "A good fit for enterprise finance automation buyers."],
    ["vicai", "Vic.ai", "Vic.ai", "V", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.vic.ai/", "An AI accounting platform for invoice processing, approvals, and autonomous finance operations.", ["Automation", "Productivity", "Research"], financeTeams, "Paid", 2700000, "A clear finance-automation tool with practical buyer interest."],
    ["trullion", "Trullion", "Trullion", "T", "linear-gradient(145deg, #2563eb, #22c55e)", "https://trullion.com/", "An AI accounting and audit platform for lease, revenue, and compliance-heavy finance teams.", ["Automation", "Research", "Productivity"], financeTeams, "Paid", 3100000, "A strong accounting niche add with real enterprise use cases."],
    ["numeric", "Numeric", "Numeric", "N", "linear-gradient(145deg, #111827, #f97316)", "https://www.numeric.io/", "An AI-first close management platform that helps accounting teams move faster and spot issues earlier.", ["Productivity", "Automation", "Research"], financeTeams, "Paid", 9800000, "A fast-rising finance ops product with strong current heat."]
  ]);

  addRows([
    ["daloopa", "Daloopa", "Daloopa", "D", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.daloopa.com/", "An AI data extraction platform for public-company fundamentals and investment research workflows.", studyLane, researchers, "Paid", 2600000, "A useful finance research tool for analysts and investment teams."],
    ["alphasense", "AlphaSense", "AlphaSense", "A", "linear-gradient(145deg, #111827, #2563eb)", "https://www.alpha-sense.com/", "A market intelligence platform using AI search across filings, transcripts, news, and expert insights.", studyLane, researchers, "Paid", 18900000, "A major research platform with clear enterprise demand."],
    ["connectedpapers", "Connected Papers", "Connected Papers", "C", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.connectedpapers.com/", "A visual research exploration tool for finding related academic work and mapping paper neighborhoods.", studyLane, students, "Freemium", 6800000, "A standout research utility with strong academic mindshare."],
    ["litmaps", "Litmaps", "Litmaps", "L", "linear-gradient(145deg, #111827, #8b5cf6)", "https://www.litmaps.com/", "A literature discovery tool that tracks related papers, citations, and evolving academic topics.", studyLane, students, "Freemium", 5200000, "A strong fit for researchers building living literature reviews."],
    ["paperpal", "Paperpal", "Paperpal", "P", "linear-gradient(145deg, #2563eb, #22c55e)", "https://paperpal.com/", "An academic writing assistant for editing, language polish, and journal-ready manuscript support.", studyLane, students, "Freemium", 12100000, "A high-traffic research writing product worth surfacing."],
    ["scholarcy", "Scholarcy", "Scholarcy", "S", "linear-gradient(145deg, #111827, #f97316)", "https://www.scholarcy.com/", "A reading assistant that summarizes academic articles, reports, and evidence-heavy documents.", studyLane, students, "Freemium", 3300000, "A practical reading-speed tool for research-heavy users."],
    ["scisummary", "SciSummary", "SciSummary", "S", "linear-gradient(145deg, #2563eb, #ec4899)", "https://scisummary.com/", "An AI research summarizer for papers, findings, and science-heavy reading queues.", studyLane, students, "Freemium", 2100000, "A timely addition for users who need faster academic digestion."],
    ["explainpaper", "Explainpaper", "Explainpaper", "E", "linear-gradient(145deg, #111827, #22c55e)", "https://www.explainpaper.com/", "A paper-reading assistant that clarifies dense passages and helps non-specialists grasp research.", studyLane, students, "Freemium", 3700000, "A distinctive academic assistant that broadens the research lane."],
    ["scinapse", "Scinapse", "Scinapse", "S", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.scinapse.io/", "A scientific search engine for discovering papers, authors, and related academic results.", studyLane, students, "Freemium", 4400000, "A useful academic search product with persistent researcher appeal."],
    ["avoma", "Avoma", "Avoma", "A", "linear-gradient(145deg, #111827, #2563eb)", "https://www.avoma.com/", "An AI meeting assistant for recording, notes, follow-ups, and revenue-team conversation analysis.", ["Meetings", "Productivity", "Sales"], revenueTeams, "Freemium", 5100000, "A strong meeting intelligence tool with broad go-to-market use."]
  ]);

  addRows([
    ["supernormal", "Supernormal", "Supernormal", "S", "linear-gradient(145deg, #2563eb, #22c55e)", "https://supernormal.com/", "An AI note taker for meetings, follow-ups, and lightweight documentation after conversations.", ["Meetings", "Productivity", "Writing"], businessTeams, "Freemium", 6000000, "A good general-purpose meeting capture tool with strong mainstream use."],
    ["jamie", "Jamie", "Jamie", "J", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.meetjamie.ai/", "A meeting copilot that writes notes, action items, and summaries without requiring intrusive bots.", ["Meetings", "Productivity", "Writing"], businessTeams, "Freemium", 4800000, "A useful alternative in the fast-growing meeting assistant category."],
    ["circleback", "Circleback", "Circleback", "C", "linear-gradient(145deg, #2563eb, #f97316)", "https://circleback.ai/", "An AI meeting assistant for summaries, CRM updates, and searchable team memory.", ["Meetings", "Productivity", "Writing"], businessTeams, "Freemium", 4000000, "A strong collaborative notes product with practical business appeal."],
    ["recall", "Recall", "Recall", "R", "linear-gradient(145deg, #111827, #8b5cf6)", "https://www.recall.it/", "A personal knowledge tool for saving, organizing, and resurfacing what you read and watch.", productLane, researchers, "Freemium", 7900000, "A hot knowledge-management product with broad consumer and pro appeal."],
    ["glarity", "Glarity", "Glarity", "G", "linear-gradient(145deg, #2563eb, #06b6d4)", "https://glarity.app/", "A browser assistant for summarizing web pages, videos, and search results in context.", productLane, researchers, "Freemium", 5300000, "A practical browsing companion with clear mainstream demand."],
    ["saner", "Saner.AI", "Saner", "S", "linear-gradient(145deg, #111827, #22c55e)", "https://saner.ai/", "An AI workspace for notes, memory, and lightweight knowledge organization across projects.", productLane, businessTeams, "Freemium", 2900000, "A useful productivity add for users comparing personal AI workspaces."],
    ["mymap", "MyMap.AI", "MyMap", "M", "linear-gradient(145deg, #2563eb, #ec4899)", "https://www.mymap.ai/", "A visual thinking tool for turning prompts into mind maps, diagrams, and idea structures.", productLane, businessTeams, "Freemium", 4700000, "A strong visual-planning tool that rounds out ideation workflows."],
    ["butternut", "Butternut AI", "Butternut", "B", "linear-gradient(145deg, #111827, #f97316)", "https://butternut.ai/", "An AI website builder that turns prompts into editable sites for small businesses and creators.", productLane, businessTeams, "Freemium", 3400000, "A practical no-code site builder for fast launches."],
    ["codedesign", "CodeDesign", "CodeDesign", "C", "linear-gradient(145deg, #2563eb, #22c55e)", "https://codedesign.ai/", "An AI web builder for landing pages, site generation, and rapid publishing workflows.", productLane, businessTeams, "Freemium", 4100000, "A good fit for founders and marketers who want fast site iteration."],
    ["unicornplatform", "Unicorn Platform", "Unicorn Platform", "U", "linear-gradient(145deg, #111827, #2563eb)", "https://unicornplatform.com/", "A startup-focused website builder with AI assistance for launching product pages quickly.", productLane, businessTeams, "Freemium", 5900000, "A recognizable startup-web brand with strong distribution appeal."]
  ]);

  addRows([
    ["teleporthq", "TeleportHQ", "TeleportHQ", "T", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://teleporthq.io/", "A front-end builder for generating UI, exporting code, and collaborating on web interfaces.", ["Coding", "Design", "Productivity"], builders, "Freemium", 7100000, "A strong bridge product between AI site generation and real front-end workflows."],
    ["koreai", "Kore.ai", "Kore.ai", "K", "linear-gradient(145deg, #111827, #8b5cf6)", "https://kore.ai/", "An enterprise AI agent platform for customer service, employee support, and process automation.", supportLane, supportTeams, "Paid", 6500000, "A major enterprise agent platform that belongs in the catalog."],
    ["amelia", "Amelia", "Amelia", "A", "linear-gradient(145deg, #2563eb, #22c55e)", "https://amelia.ai/", "An enterprise conversational AI platform for customer service and digital employee assistance.", supportLane, supportTeams, "Paid", 4500000, "A mature enterprise AI brand with relevant support and service use cases."],
    ["unbabel", "Unbabel", "Unbabel", "U", "linear-gradient(145deg, #111827, #f97316)", "https://unbabel.com/", "An AI translation platform for support, operations, and multilingual customer communication.", ["Translation", "Writing", "Productivity"], supportTeams, "Paid", 7700000, "A strong multilingual operations tool with clear enterprise value."],
    ["lilt", "Lilt", "Lilt", "L", "linear-gradient(145deg, #2563eb, #06b6d4)", "https://lilt.com/", "An AI translation and localization platform for teams shipping content and products globally.", ["Translation", "Writing", "Productivity"], businessTeams, "Paid", 5800000, "A strong localization product with broad enterprise relevance."],
    ["speechmatics", "Speechmatics", "Speechmatics", "S", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.speechmatics.com/", "A speech AI platform for transcription, understanding, and multilingual voice workflows.", ["Audio", "Translation", "Productivity"], builders, "Usage-based", 4900000, "A strong speech infrastructure pick for voice-heavy products."],
    ["playai", "PlayAI", "PlayAI", "P", "linear-gradient(145deg, #2563eb, #ec4899)", "https://docs.play.ai/", "A voice AI platform for developer-friendly speech agents, cloned voices, and conversational deployment.", ["Audio", "Coding", "Productivity"], builders, "Usage-based", 6200000, "A notable voice-agent platform with growing builder interest."],
    ["bhuman", "BHuman", "BHuman", "B", "linear-gradient(145deg, #111827, #22c55e)", "https://www.bhuman.ai/", "A personalized video platform for scaling outreach with AI-generated one-to-one style content.", ["Video", "Sales", "Writing"], revenueTeams, "Paid", 5000000, "A strong personalized-video tool for growth and sales teams."],
    ["kubiya", "Kubiya", "Kubiya", "K", "linear-gradient(145deg, #2563eb, #f97316)", "https://www.kubiya.ai/", "An agent platform for DevOps and internal platform workflows with policy-aware execution.", buildLane, builders, "Paid", 3300000, "A good fit for platform teams adopting AI into operations workflows."],
    ["dupdub", "DupDub", "DupDub", "D", "linear-gradient(145deg, #111827, #2563eb)", "https://www.dupdub.com/", "An AI content suite for voiceovers, dubbing, avatars, and media localization tasks.", creativeLane, creators, "Freemium", 5600000, "A useful multimedia tool that broadens audio and localization coverage."]
  ]);
}());
