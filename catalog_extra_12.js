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
  const operators = ["Operators", "Product teams", "Founders"];
  const supportTeams = ["Support teams", "Operations teams", "Enterprises"];
  const revenueTeams = ["Revenue teams", "Marketers", "Agencies"];
  const researchers = ["Researchers", "Knowledge workers", "Analysts"];
  const students = ["Students", "Researchers", "Knowledge workers"];

  const buildLane = ["Coding", "Automation", "Research"];
  const creativeLane = ["Design", "Video", "Audio"];
  const supportLane = ["Assistants", "Sales", "Automation"];
  const writingLane = ["Writing", "Research", "Productivity"];
  const productLane = ["Productivity", "Design", "Writing"];
  const salesLane = ["Sales", "Productivity", "Automation"];
  const studyLane = ["Research", "Productivity", "Writing"];
  const marketingLane = ["Writing", "Sales", "Productivity"];

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
    ["guidde", "Guidde", "Guidde", "G", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.guidde.com/", "An AI video documentation tool for turning workflows into polished step-by-step guides.", creativeLane, operators, "Freemium", 5200000, "A strong fit for teams documenting internal processes without heavy manual editing."],
    ["graphite", "Graphite", "Graphite", "G", "linear-gradient(145deg, #111827, #2563eb)", "https://graphite.dev/", "A code review platform with AI help for stacked diffs, feedback, and engineering workflow speed.", buildLane, builders, "Paid", 4700000, "A hot engineering workflow tool that broadens the coding lane beyond copilots."],
    ["qodo", "Qodo", "Qodo", "Q", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.qodo.ai/", "An AI coding assistant focused on tests, review quality, and code generation inside developer workflows.", buildLane, builders, "Freemium", 8600000, "A strong add for users comparing code assistants with more review and test depth."],
    ["factoryai", "Factory", "Factory", "F", "linear-gradient(145deg, #111827, #f97316)", "https://www.factory.ai/", "An AI software delivery workspace for planning, implementation, and agent-assisted engineering execution.", buildLane, builders, "Paid", 4300000, "A timely inclusion as engineering teams evaluate more end-to-end AI build environments."],
    ["devrev", "DevRev", "DevRev", "D", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://devrev.ai/", "A customer platform that connects product, support, and engineering with AI-driven workflows.", supportLane, operators, "Paid", 6800000, "Useful for buyers looking at AI-native alternatives across support and product ops."],
    ["relevanceai", "Relevance AI", "Relevance AI", "R", "linear-gradient(145deg, #111827, #ec4899)", "https://relevanceai.com/", "A no-code platform for building AI agents, automations, and team workflows.", buildLane, builders, "Freemium", 9400000, "A high-interest builder platform with broad appeal for non-technical operators."],
    ["botpress", "Botpress", "Botpress", "B", "linear-gradient(145deg, #2563eb, #22c55e)", "https://botpress.com/", "An AI agent builder for chatbots, support flows, and multi-step enterprise conversations.", supportLane, supportTeams, "Freemium", 12500000, "A major conversation platform that belongs in a high-traffic AI directory."],
    ["landbot", "Landbot", "Landbot", "L", "linear-gradient(145deg, #111827, #14b8a6)", "https://landbot.io/", "A conversational automation platform for lead capture, support, and qualification flows.", supportLane, revenueTeams, "Freemium", 6900000, "A practical entry for teams comparing AI-enhanced chat funnels and automation."],
    ["copymatic", "Copymatic", "Copymatic", "C", "linear-gradient(145deg, #2563eb, #f97316)", "https://copymatic.ai/", "An AI writing tool for blogs, ads, ecommerce copy, and lightweight content workflows.", writingLane, creators, "Freemium", 3900000, "A solid long-tail content tool that still draws strong marketer demand."],
    ["softr", "Softr", "Softr", "S", "linear-gradient(145deg, #111827, #22c55e)", "https://www.softr.io/", "A no-code app builder with AI-assisted creation for portals, CRMs, and internal tools.", productLane, operators, "Freemium", 7600000, "A good fit for operators who want AI to accelerate business app creation."],
    ["bubble", "Bubble", "Bubble", "B", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://bubble.io/", "A no-code application platform adding AI workflows for faster product prototyping and launch.", productLane, operators, "Freemium", 19100000, "A mainstream no-code brand that still matters when users compare AI app builders."],
    ["trickle", "Trickle", "Trickle", "T", "linear-gradient(145deg, #111827, #ec4899)", "https://www.trickle.so/", "An AI workspace for turning ideas and prompts into websites, apps, and lightweight products.", productLane, operators, "Freemium", 3400000, "A fresh builder tool that fits users looking for lighter-weight AI app creation."],
    ["parloa", "Parloa", "Parloa", "P", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.parloa.com/", "An enterprise voice AI platform for customer service automation and call center workflows.", supportLane, supportTeams, "Paid", 4600000, "A strong enterprise voice player for teams comparing call automation vendors."],
    ["drift", "Drift", "Drift", "D", "linear-gradient(145deg, #111827, #2563eb)", "https://www.drift.com/", "A conversational revenue platform using AI for chat, routing, and lead qualification.", salesLane, revenueTeams, "Paid", 8900000, "A recognizable revenue workflow brand with ongoing buyer demand."],
    ["qualified", "Qualified", "Qualified", "Q", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.qualified.com/", "An AI pipeline platform for website conversations, account routing, and sales qualification.", salesLane, revenueTeams, "Paid", 3500000, "A good inclusion for GTM teams choosing AI-led inbound qualification tools."],
    ["clari", "Clari", "Clari", "C", "linear-gradient(145deg, #111827, #f97316)", "https://www.clari.com/", "A revenue platform with AI forecasting, inspection, and pipeline execution workflows.", salesLane, revenueTeams, "Paid", 6200000, "A strong sales operations product that broadens the revenue intelligence lane."],
    ["surferseo", "Surfer SEO", "Surfer", "S", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://surferseo.com/", "An AI SEO platform for optimizing content structure, coverage, and ranking opportunities.", marketingLane, revenueTeams, "Paid", 17300000, "A major SEO writing brand that users routinely compare against newer AI content tools."],
    ["prowritingaid", "ProWritingAid", "ProWritingAid", "P", "linear-gradient(145deg, #111827, #22c55e)", "https://prowritingaid.com/", "An AI writing editor for grammar, clarity, style, and long-form revision workflows.", writingLane, researchers, "Freemium", 10200000, "A durable writing assistant with strong recurring search demand."],
    ["longshot", "LongShot", "LongShot", "L", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.longshot.ai/", "An AI writing platform for SEO briefs, fact-grounded copy, and long-form drafts.", writingLane, revenueTeams, "Paid", 3100000, "A helpful content-ops option for users researching more structured SEO writing stacks."],
    ["otio", "Otio", "Otio", "O", "linear-gradient(145deg, #111827, #14b8a6)", "https://otio.ai/", "An AI reading and synthesis workspace for documents, videos, and research-heavy study sessions.", studyLane, researchers, "Freemium", 5800000, "A strong fit for users who need research synthesis rather than pure chatting."]
  ]);

  addRows([
    ["mapify", "Mapify", "Mapify", "M", "linear-gradient(145deg, #2563eb, #f97316)", "https://mapify.so/", "An AI mind-mapping tool for turning notes, documents, and prompts into structured visual maps.", studyLane, students, "Freemium", 4100000, "A practical study and planning product with broad productivity appeal."],
    ["beehiiv", "beehiiv", "beehiiv", "B", "linear-gradient(145deg, #111827, #22c55e)", "https://www.beehiiv.com/", "A newsletter platform with AI help for drafting, growth, and publication workflows.", marketingLane, creators, "Freemium", 11800000, "A widely discussed publishing platform that belongs in the creator stack."],
    ["taplio", "Taplio", "Taplio", "T", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://taplio.com/", "An AI LinkedIn growth platform for writing posts, mining ideas, and tracking audience momentum.", marketingLane, revenueTeams, "Paid", 7300000, "A strong social growth tool for B2B operators and creator-led brands."],
    ["metricool", "Metricool", "Metricool", "M", "linear-gradient(145deg, #111827, #ec4899)", "https://metricool.com/", "A social planning platform with AI-assisted scheduling, analytics, and multichannel publishing.", marketingLane, creators, "Freemium", 9600000, "A practical pick for teams comparing AI-enabled social management suites."],
    ["buffer", "Buffer", "Buffer", "B", "linear-gradient(145deg, #2563eb, #22c55e)", "https://buffer.com/", "A social publishing platform adding AI support for planning, repurposing, and post creation.", marketingLane, creators, "Freemium", 21400000, "A mainstream social brand that users still search for when evaluating AI content workflows."],
    ["hootsuite", "Hootsuite", "Hootsuite", "H", "linear-gradient(145deg, #111827, #2563eb)", "https://www.hootsuite.com/", "A mature social management platform with AI assistance for drafting, scheduling, and reporting.", marketingLane, revenueTeams, "Paid", 22800000, "A recognizable enterprise social option that rounds out the publishing lane."],
    ["ocoya", "Ocoya", "Ocoya", "O", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.ocoya.com/", "An AI social media tool for generating posts, managing calendars, and scaling content production.", marketingLane, creators, "Freemium", 3900000, "A useful add for users comparing lighter-weight social AI tools."],
    ["publer", "Publer", "Publer", "P", "linear-gradient(145deg, #111827, #f97316)", "https://publer.io/", "A social publishing suite with AI writing help, scheduling, and analytics across channels.", marketingLane, creators, "Freemium", 4700000, "A solid operator-friendly social stack with growing SMB demand."],
    ["typefully", "Typefully", "Typefully", "T", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://typefully.com/", "An AI-assisted writing and scheduling workspace for X, LinkedIn, and creator publishing.", marketingLane, creators, "Freemium", 6600000, "A strong fit for creators who want cleaner writing flows than generic schedulers."],
    ["boltnew", "Bolt.new", "StackBlitz", "B", "linear-gradient(145deg, #111827, #22c55e)", "https://bolt.new/", "An AI coding workspace for building full-stack apps directly from prompts in the browser.", buildLane, builders, "Usage-based", 27200000, "A breakout builder product that clearly belongs in a hot-tools expansion."],
    ["klap", "Klap", "Klap", "K", "linear-gradient(145deg, #2563eb, #f97316)", "https://klap.app/", "An AI repurposing tool for turning long videos into short-form clips and social-ready edits.", creativeLane, creators, "Freemium", 5400000, "A practical short-video product with strong demand from creators and agencies."],
    ["sendshort", "SendShort", "SendShort", "S", "linear-gradient(145deg, #111827, #ec4899)", "https://sendshort.ai/", "An AI editing tool for creating shorts with captions, hooks, and platform-specific formatting.", creativeLane, creators, "Freemium", 4800000, "A good add for creator teams optimizing short-form video output."],
    ["invideoai", "InVideo AI", "InVideo", "I", "linear-gradient(145deg, #2563eb, #22c55e)", "https://invideo.io/ai/", "An AI video generation studio for scripts, scenes, voiceovers, and rapid marketing content.", creativeLane, creators, "Freemium", 25700000, "A major video generation brand with broad search and buyer interest."],
    ["lumalabs", "Luma AI", "Luma Labs", "L", "linear-gradient(145deg, #111827, #14b8a6)", "https://lumalabs.ai/", "A generative 3D and video platform for cinematic scenes, captures, and creative worldbuilding.", creativeLane, creators, "Freemium", 18600000, "A widely discussed visual AI platform that expands the 3D and video lane."],
    ["madgicx", "Madgicx", "Madgicx", "M", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://madgicx.com/", "An AI ad optimization platform for campaign analysis, creative testing, and media buying.", marketingLane, revenueTeams, "Paid", 5900000, "A useful performance-marketing tool for revenue teams shopping AI ad stacks."],
    ["humanloop", "Humanloop", "Humanloop", "H", "linear-gradient(145deg, #111827, #22c55e)", "https://humanloop.com/", "A platform for prompt management, evaluations, and enterprise LLM product development.", buildLane, builders, "Paid", 3600000, "A strong builder option for teams running serious prompt and eval workflows."],
    ["labelbox", "Labelbox", "Labelbox", "L", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://labelbox.com/", "A data platform for annotation, model operations, and human-in-the-loop AI workflows.", buildLane, builders, "Paid", 4300000, "A solid addition for enterprise teams still investing in data-centric AI pipelines."],
    ["wandb", "Weights & Biases", "Weights & Biases", "W", "linear-gradient(145deg, #111827, #f97316)", "https://wandb.ai/site", "A developer platform for experiment tracking, model evaluation, and ML workflow visibility.", buildLane, builders, "Freemium", 12300000, "A core AI engineering brand that deserves representation in the builder stack."],
    ["together", "Together AI", "Together", "T", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.together.ai/", "An inference and model platform for open-source AI, fine-tuning, and production serving.", buildLane, builders, "Usage-based", 15100000, "A major open-model platform with strong ongoing developer pull."],
    ["missive", "Missive", "Missive", "M", "linear-gradient(145deg, #111827, #14b8a6)", "https://missiveapp.com/", "A collaborative inbox with AI drafting and workflow support for teams handling shared communication.", productLane, operators, "Freemium", 6100000, "A practical communication tool for teams choosing AI-assisted email collaboration."]
  ]);

  addRows([
    ["front", "Front", "Front", "F", "linear-gradient(145deg, #2563eb, #f97316)", "https://front.com/", "A customer operations platform with AI support for inbox triage, responses, and team coordination.", supportLane, supportTeams, "Paid", 10400000, "A strong operations product for users comparing shared-inbox AI platforms."],
    ["helpscout", "Help Scout", "Help Scout", "H", "linear-gradient(145deg, #111827, #2563eb)", "https://www.helpscout.com/", "A support platform with AI tools for summarizing tickets, drafting replies, and scaling service teams.", supportLane, supportTeams, "Paid", 8700000, "A durable support brand that fits buyers evaluating AI-enabled help desks."],
    ["promptlayer", "PromptLayer", "PromptLayer", "P", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.promptlayer.com/", "A prompt management and observability platform for tracing, versioning, and evaluating AI apps.", buildLane, builders, "Freemium", 4200000, "A useful builder choice for teams who need prompt governance and visibility."],
    ["langchain", "LangChain", "LangChain", "L", "linear-gradient(145deg, #111827, #22c55e)", "https://www.langchain.com/", "A framework and product suite for building agentic systems, retrieval apps, and AI workflows.", buildLane, builders, "Free / Paid", 33700000, "One of the most searched builder ecosystems in AI, so it belongs in the directory."],
    ["lmstudio", "LM Studio", "LM Studio", "L", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://lmstudio.ai/", "A desktop app for discovering, running, and chatting with local AI models on-device.", buildLane, researchers, "Free", 18900000, "A major local-model tool with strong demand from privacy-focused and technical users."],
    ["openwebui", "Open WebUI", "Open WebUI", "O", "linear-gradient(145deg, #111827, #ec4899)", "https://openwebui.com/", "An open-source chat interface for running local and hosted AI models with flexible controls.", buildLane, researchers, "Free / Paid", 14400000, "A fast-growing local AI front end with broad community traction."],
    ["jan", "Jan", "Jan", "J", "linear-gradient(145deg, #2563eb, #22c55e)", "https://jan.ai/", "A desktop AI assistant for local models, private workflows, and offline-friendly usage.", buildLane, researchers, "Free", 5200000, "A good complement for users exploring local-first AI assistants."],
    ["anythingllm", "AnythingLLM", "Mintplex Labs", "A", "linear-gradient(145deg, #111827, #f97316)", "https://anythingllm.com/", "A workspace for chatting with documents, private knowledge, and custom local or cloud models.", buildLane, researchers, "Free / Paid", 9800000, "A strong retrieval and local AI tool with practical appeal for knowledge-heavy work."],
    ["flowith", "Flowith", "Flowith", "F", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://flowith.io/", "An AI workspace for deep research, multi-threaded thinking, and organized synthesis.", studyLane, researchers, "Freemium", 4600000, "A compelling research-native interface that feels distinct from standard chat apps."],
    ["kagiassistant", "Kagi Assistant", "Kagi", "K", "linear-gradient(145deg, #111827, #22c55e)", "https://kagi.com/assistant", "An AI answer tool from Kagi focused on cleaner search, reasoning, and premium information workflows.", studyLane, researchers, "Paid", 3700000, "A notable premium search assistant for users comparing higher-signal research tools."],
    ["elsaspeak", "ELSA Speak", "ELSA", "E", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://elsaspeak.com/", "An AI speaking coach for English pronunciation, fluency practice, and guided language learning.", studyLane, students, "Freemium", 11300000, "A major language-learning app that expands the practical education lane."],
    ["speak", "Speak", "Speak", "S", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.speak.com/", "An AI language tutor for conversation practice, pronunciation, and real-world speaking confidence.", studyLane, students, "Freemium", 9200000, "A strong modern education product with broad mainstream awareness."],
    ["turboscribe", "TurboScribe", "TurboScribe", "T", "linear-gradient(145deg, #2563eb, #f97316)", "https://turboscribe.ai/", "An AI transcription service for audio, video, multilingual uploads, and export-ready text.", creativeLane, researchers, "Freemium", 20800000, "A very visible transcription product with strong utility across many audiences."],
    ["studyfetch", "StudyFetch", "StudyFetch", "S", "linear-gradient(145deg, #111827, #2563eb)", "https://www.studyfetch.com/", "An AI study platform for notes, quizzes, explanations, and personalized learning help.", studyLane, students, "Freemium", 6900000, "A useful student-focused AI product with clear demand in the education lane."],
    ["gizmo", "Gizmo", "Gizmo", "G", "linear-gradient(145deg, #2563eb, #22c55e)", "https://gizmo.ai/", "An AI flashcard and memory tool for turning content into spaced-repetition study sessions.", studyLane, students, "Freemium", 3300000, "A focused study utility that complements broader learning assistants."],
    ["chatbase", "Chatbase", "Chatbase", "C", "linear-gradient(145deg, #111827, #ec4899)", "https://www.chatbase.co/", "A platform for building support and website chatbots from company knowledge and content.", supportLane, supportTeams, "Freemium", 13200000, "A high-demand chatbot tool for businesses wanting fast deployment from existing docs."],
    ["typedesk", "Typedesk", "Typedesk", "T", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://typedesk.com/", "An AI text expander for saved replies, shared snippets, and support team speed.", supportLane, supportTeams, "Freemium", 3200000, "A practical operations add for teams mixing AI with reusable communication workflows."],
    ["zendeskai", "Zendesk AI", "Zendesk", "Z", "linear-gradient(145deg, #111827, #22c55e)", "https://www.zendesk.com/platform/ai/", "An AI layer for support operations with bots, summaries, routing, and agent assistance.", supportLane, supportTeams, "Paid", 24100000, "A mainstream enterprise support platform that many buyers will actively compare."],
    ["gorgias", "Gorgias", "Gorgias", "G", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.gorgias.com/", "An ecommerce support platform with AI assistance for ticket resolution and sales-minded service.", supportLane, supportTeams, "Paid", 7600000, "A strong ecommerce support option that fills a real buyer category on the site."],
    ["freshworksfreddy", "Freddy AI", "Freshworks", "F", "linear-gradient(145deg, #111827, #f97316)", "https://www.freshworks.com/platform/freddy-ai/", "An AI copilot across support, CRM, and IT workflows inside the Freshworks ecosystem.", supportLane, supportTeams, "Paid", 6700000, "A useful add for teams comparing AI layers inside established software suites."]
  ]);

  addRows([
    ["hubspotbreeze", "HubSpot Breeze", "HubSpot", "H", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.hubspot.com/products/ai", "An AI suite for marketing, sales, and service workflows inside the HubSpot platform.", salesLane, revenueTeams, "Paid", 31100000, "A major GTM platform with broad interest from business buyers."],
    ["closecrm", "Close", "Close", "C", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.close.com/", "A sales CRM with AI help for call summaries, emails, and pipeline execution.", salesLane, revenueTeams, "Paid", 6800000, "A strong revenue-team product for users who want AI inside day-to-day selling."],
    ["salesloft", "Salesloft", "Salesloft", "S", "linear-gradient(145deg, #2563eb, #f97316)", "https://www.salesloft.com/", "A revenue workflow platform using AI for coaching, engagement, and pipeline execution.", salesLane, revenueTeams, "Paid", 9300000, "A recognizable sales execution platform that broadens the enterprise revenue lane."],
    ["outreach", "Outreach", "Outreach", "O", "linear-gradient(145deg, #111827, #2563eb)", "https://www.outreach.io/", "A sales execution platform with AI assistance for prospecting, forecasting, and seller productivity.", salesLane, revenueTeams, "Paid", 11500000, "A major GTM operating platform with sustained buyer attention."],
    ["unstructured", "Unstructured", "Unstructured", "U", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://unstructured.io/", "A data ingestion platform for turning files, PDFs, and webpages into AI-ready structured inputs.", buildLane, builders, "Free / Paid", 4100000, "A strong builder component for retrieval, pipelines, and document-heavy AI apps."],
    ["otterpilot", "OtterPilot", "Otter", "O", "linear-gradient(145deg, #111827, #22c55e)", "https://otter.ai/otterpilot", "An AI meeting assistant for notes, action items, and searchable conversation history.", productLane, operators, "Freemium", 23800000, "A high-demand meeting workflow product that fits mainstream buyer intent."],
    ["difycloud", "Dify Cloud", "Dify", "D", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://dify.ai/", "A platform for building AI apps, agents, and workflow automation with strong open-source roots.", buildLane, builders, "Freemium", 15300000, "A fast-growing app-builder platform with broad technical and no-code appeal."],
    ["zapieragents", "Zapier Agents", "Zapier", "Z", "linear-gradient(145deg, #111827, #ec4899)", "https://zapier.com/agents", "An AI agent layer for automating work across apps, data, and business processes.", salesLane, operators, "Freemium", 26100000, "A strong mainstream automation brand moving directly into agents."],
    ["makeagents", "Make AI Agents", "Make", "M", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.make.com/en/ai-agents", "An AI agent and workflow platform for building automations with visual logic and app integrations.", salesLane, operators, "Freemium", 17400000, "A natural addition for users comparing agent-capable automation tools."],
    ["n8nai", "n8n AI", "n8n", "N", "linear-gradient(145deg, #111827, #14b8a6)", "https://n8n.io/ai", "An AI automation layer inside n8n for agents, workflow branching, and data orchestration.", salesLane, operators, "Free / Paid", 22100000, "A major automation product with clear momentum in AI workflow building."],
    ["miroai", "Miro AI", "Miro", "M", "linear-gradient(145deg, #2563eb, #f97316)", "https://miro.com/ai/", "An AI workspace for summarizing boards, generating structures, and accelerating collaborative planning.", productLane, operators, "Freemium", 39200000, "A mainstream collaboration suite whose AI layer is highly relevant to team buyers."],
    ["codaai", "Coda AI", "Coda", "C", "linear-gradient(145deg, #111827, #22c55e)", "https://coda.io/ai", "An AI assistant inside docs and workflows for drafting, summarizing, and operational automation.", productLane, operators, "Paid", 9500000, "A strong productivity platform for teams comparing AI inside structured docs."],
    ["goodnotesai", "Goodnotes AI", "Goodnotes", "G", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://www.goodnotes.com/ai", "An AI note-taking layer for brainstorming, study help, and handwritten workflow support.", studyLane, students, "Freemium", 12400000, "A popular student and productivity app that benefits from being represented on the site."],
    ["fathomvideo", "Fathom", "Fathom", "F", "linear-gradient(145deg, #111827, #2563eb)", "https://fathom.video/", "An AI meeting recorder for summaries, follow-ups, and searchable team memory.", productLane, operators, "Freemium", 17600000, "A very visible meeting product with strong cross-functional demand."],
    ["superhumanai", "Superhuman", "Superhuman", "S", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://superhuman.com/ai", "An AI-enhanced email client focused on faster triage, drafting, and high-volume communication.", productLane, operators, "Paid", 6100000, "A premium productivity brand that helps round out the email workflow segment."],
    ["braveleo", "Brave Leo", "Brave", "B", "linear-gradient(145deg, #111827, #f97316)", "https://brave.com/leo/", "An AI assistant integrated into the Brave browser for search, summaries, and private browsing help.", studyLane, researchers, "Freemium", 8700000, "A notable browser-native assistant with strong privacy-minded appeal."],
    ["growthbar", "GrowthBar", "GrowthBar", "G", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.growthbarseo.com/", "An AI SEO writing tool for outlines, ranking content, and content team workflows.", marketingLane, revenueTeams, "Paid", 4200000, "A useful SEO content option for marketers comparing different writing stacks."],
    ["clearscope", "Clearscope", "Clearscope", "C", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.clearscope.io/", "A content optimization platform for topic coverage, search intent, and editorial guidance.", marketingLane, revenueTeams, "Paid", 5300000, "A strong enterprise SEO editor with durable buyer interest."],
    ["headlime", "Headlime", "Headlime", "H", "linear-gradient(145deg, #2563eb, #f97316)", "https://headlime.com/", "An AI copywriting tool for landing pages, product messaging, and conversion-focused text.", writingLane, revenueTeams, "Paid", 3100000, "A solid conversion-copy tool that broadens the marketer-focused writing lane."],
    ["hypotenuse", "Hypotenuse AI", "Hypotenuse", "H", "linear-gradient(145deg, #111827, #2563eb)", "https://www.hypotenuse.ai/", "An AI writing platform for ecommerce, blog production, and structured content operations.", writingLane, revenueTeams, "Paid", 7600000, "A practical content engine for brands scaling catalogs and editorial output."]
  ]);

  addRows([
    ["writerzen", "WriterZen", "WriterZen", "W", "linear-gradient(145deg, #2563eb, #14b8a6)", "https://writerzen.net/", "An AI SEO workflow tool for keyword discovery, topical planning, and content production.", marketingLane, revenueTeams, "Freemium", 3400000, "A good fit for teams researching end-to-end SEO workflow tools."],
    ["tugan", "Tugan.ai", "Tugan", "T", "linear-gradient(145deg, #111827, #22c55e)", "https://tugan.ai/", "An AI marketing writer for converting source material into emails, threads, and campaign copy.", marketingLane, creators, "Paid", 4100000, "A useful add for lean teams repurposing content into revenue-focused assets."],
    ["captionsapp", "Captions", "Captions", "C", "linear-gradient(145deg, #2563eb, #8b5cf6)", "https://www.captions.ai/", "An AI video creation app for talking videos, captions, dubbing, and creator-focused edits.", creativeLane, creators, "Freemium", 21400000, "A major mobile-first creator brand with strong attention across video workflows."],
    ["didstudio", "D-ID", "D-ID", "D", "linear-gradient(145deg, #111827, #ec4899)", "https://www.d-id.com/", "A generative video platform for talking avatars, digital presenters, and interactive media.", creativeLane, creators, "Paid", 8900000, "A recognizable avatar-video product with strong enterprise and creator relevance."],
    ["veedai", "VEED AI", "VEED", "V", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.veed.io/tools/ai-video", "An AI video suite for editing, repurposing, subtitles, and social-ready publishing.", creativeLane, creators, "Freemium", 33400000, "A very visible creator tool that deserves a place among mainstream AI video products."],
    ["framerai", "Framer AI", "Framer", "F", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.framer.com/ai/", "An AI website builder for generating pages, copy, and design starting points quickly.", productLane, creators, "Freemium", 28500000, "A major design-builder brand with strong overlap between creators and product teams."],
    ["hostingerhorizons", "Hostinger Horizons", "Hostinger", "H", "linear-gradient(145deg, #2563eb, #f97316)", "https://www.hostinger.com/horizons", "An AI website builder for generating online business sites with hosting built in.", productLane, operators, "Paid", 3900000, "A practical small-business site builder with rising AI interest."],
    ["decktopus", "Decktopus", "Decktopus", "D", "linear-gradient(145deg, #111827, #2563eb)", "https://www.decktopus.com/", "An AI presentation tool for generating decks, speaker notes, and business-ready slides.", productLane, operators, "Freemium", 6600000, "A useful presentation product that fits clear buyer intent on the directory."],
    ["sitekick", "Sitekick", "Sitekick", "S", "linear-gradient(145deg, #2563eb, #22c55e)", "https://www.sitekick.ai/", "An AI landing page generator focused on speed, conversion messaging, and fast launches.", productLane, operators, "Paid", 3000000, "A focused launch tool that complements the broader site-builder category."],
    ["magicschool", "MagicSchool", "MagicSchool", "M", "linear-gradient(145deg, #111827, #14b8a6)", "https://www.magicschool.ai/", "An AI platform for teachers and schools creating lesson plans, feedback, and classroom materials.", studyLane, students, "Freemium", 11400000, "A large education AI brand that adds depth to the learning and teaching lane."]
  ]);
})();
