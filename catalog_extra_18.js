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
  const existingNames = new Set(catalog.tools.map((tool) => String(tool.name || "").toLowerCase()));
  const sharedSources = {
    futurepedia: "https://www.futurepedia.io/ai-tools",
    toolify: "https://www.toolify.ai/Best-trending-AI-Tools",
    producthunt: "https://www.producthunt.com/categories/artificial-intelligence"
  };
  const palette = [
    "linear-gradient(145deg, #2563eb, #22c55e)",
    "linear-gradient(145deg, #111827, #14b8a6)",
    "linear-gradient(145deg, #2563eb, #8b5cf6)",
    "linear-gradient(145deg, #111827, #f97316)",
    "linear-gradient(145deg, #2563eb, #ec4899)"
  ];
  const builders = ["Developers", "AI teams", "Platform teams"];
  const operators = ["Knowledge workers", "Operators", "Teams"];
  const creators = ["Creators", "Marketers", "Studios"];
  const revenue = ["Revenue teams", "Ops teams", "Support teams"];
  const career = ["Candidates", "Students", "Knowledge workers"];
  const professionals = ["Professionals", "Operators", "Analysts"];
  const buildLane = ["Coding", "Automation", "Research"];
  const workLane = ["Productivity", "Research", "Meetings"];
  const creativeLane = ["Design", "Video", "Audio"];
  const revenueLane = ["Sales", "Automation", "Productivity"];
  const careerLane = ["Writing", "Productivity", "Research"];
  const professionalLane = ["Productivity", "Research", "Writing"];
  const vendorOverrides = {
    "GPT Researcher": "GPT Researcher",
    "Video to Blog": "Video to Blog",
    "MaxAI.me": "MaxAI",
    "Weights & Biases Weave": "Weights & Biases",
    "OpenEvidence AI": "OpenEvidence",
    "Bitbucket": "Atlassian",
    "Sora": "OpenAI",
    "ChatGLM": "Zhipu",
    "SaneBox": "SaneBox",
    "OnePageCRM": "OnePageCRM",
    "Luma Dream Machine": "Luma",
    "Airtable AI Assistant": "Airtable",
    "Adobe GenStudio": "Adobe",
    "Canva Magic Studio": "Canva"
  };

  function vendorFromName(name) {
    return vendorOverrides[name] || name.split(" ")[0] || name;
  }

  function addTools(rows, categories, audience, recommendation) {
    rows.forEach(([id, name, url, summary, pricing, monthlyVisits]) => {
      const normalizedName = String(name || "").toLowerCase();
      if (existingIds.has(id) || existingNames.has(normalizedName)) {
        return;
      }
      catalog.tools.push({
        id,
        name,
        vendor: vendorFromName(name),
        logoLetter: (name[0] || "A").toUpperCase(),
        accent: palette[catalog.tools.length % palette.length],
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
      existingNames.add(normalizedName);
    });
  }

  addTools([
    ["kimi", "Kimi", "https://www.kimi.com/", "Moonshot AI's long-context assistant for chat, file reading, research, and coding-heavy knowledge work.", "Free / Paid", 54000000],
    ["minimax", "MiniMax", "https://www.minimax.io/", "A multimodal AI model company behind MiniMax assistants, speech, image, video, and model APIs.", "Free / Paid", 50000000],
    ["mistral", "Mistral AI", "https://chat.mistral.ai/", "European frontier-model company offering Le Chat, open models, and enterprise AI deployment options.", "Free / Paid", 28000000],
    ["upstage", "Upstage Solar", "https://www.upstage.ai/", "Enterprise AI platform and Solar model family focused on document intelligence, language tasks, and business deployment.", "Paid", 26000000],
    ["amazonnova", "Amazon Nova", "https://aws.amazon.com/ai/generative-ai/nova/", "AWS's foundation model family for text, image, video, and multimodal workloads inside Bedrock.", "Usage-based", 36000000],
    ["nvidianemotron", "NVIDIA Nemotron", "https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/", "NVIDIA's open model family for reasoning, agents, synthetic data, and enterprise AI infrastructure.", "Free / Paid", 36000000],
    ["gemma", "Gemma", "https://ai.google.dev/gemma", "Google's open model family for builders who want lightweight, customizable, and deployable AI models.", "Free", 39000000],
    ["mimo", "MiMo", "https://github.com/XiaomiMiMo/MiMo", "Xiaomi's open-weight reasoning model line aimed at efficient coding, math, and agentic benchmark performance.", "Free", 54000000],
    ["kiro", "Kiro", "https://kiro.dev/", "AI coding environment designed for faster agent-assisted software delivery.", "Freemium", 9800000],
    ["stagehand", "Stagehand", "https://www.browserbase.com/stagehand", "Browser automation layer that lets agents operate websites with less brittle scripting.", "Free / Paid", 5200000],
    ["lunary", "Lunary", "https://lunary.ai/", "Observe prompts, traces, and experiments from live AI apps in one place.", "Freemium", 3800000],
    ["maxkb", "MaxKB", "https://maxkb.ai/", "Build enterprise knowledge assistants and RAG workflows with a self-hosted stack.", "Free / Paid", 3100000],
    ["ragflow", "RAGFlow", "https://ragflow.io/", "Open-source RAG system for retrieval, parsing, and knowledge workflows.", "Free / Paid", 4600000],
    ["dspy", "DSPy", "https://dspy.ai/", "Programming framework for optimizing prompts, signatures, and AI workflows.", "Free", 6400000],
    ["abacusai", "Abacus AI", "https://abacus.ai/", "Full-stack AI platform for model apps, agents, and enterprise deployment.", "Paid", 7700000],
    ["trae", "Trae", "https://www.trae.ai/", "AI-native coding workspace focused on fast product building and code generation.", "Freemium", 8700000],
    ["browsebase", "Browsebase", "https://www.browsebase.com/", "Run AI-friendly browser sessions and scraping jobs against dynamic websites.", "Usage-based", 3000000],
    ["dataforseo", "DataForSEO", "https://dataforseo.com/", "Feed SEO, ranking, and search-data pipelines into AI products and research tools.", "Usage-based", 5600000],
    ["marsx", "MarsX", "https://www.marsx.dev/", "Low-code builder and AI software marketplace for faster startup experiments.", "Freemium", 3500000],
    ["autogpt", "AutoGPT", "https://agpt.co/", "Open agent platform for planning, tool use, and long-running autonomous tasks.", "Free / Paid", 7200000],
    ["agentverse", "AgentVerse", "https://agentverse.ai/", "Create multi-agent workflows and discovery surfaces for AI automation projects.", "Free / Paid", 3300000],
    ["anakinai", "Anakin.ai", "https://anakin.ai/", "Launch AI apps, workflows, and content tools without heavy engineering setup.", "Freemium", 6800000],
    ["blazesql", "BlazeSQL", "https://www.blazesql.com/", "Query databases in natural language and ship analytics copilots faster.", "Freemium", 2900000],
    ["insightbase", "InsightBase", "https://insightbase.ai/", "Turn raw data into dashboards and answers with SQL-generation help.", "Freemium", 2800000],
    ["ai2sql", "AI2sql", "https://www.ai2sql.io/", "Generate SQL from natural language for faster analysis and data ops.", "Freemium", 4400000],
    ["ossinsight", "OSS Insight", "https://ossinsight.io/", "Analyze GitHub projects and open-source momentum with AI-guided queries.", "Free", 3200000],
    ["screenshottocode", "Screenshot to Code", "https://screenshottocode.com/", "Convert UI screenshots into editable front-end code and components.", "Freemium", 5100000],
    ["tabbyml", "TabbyML", "https://tabbyml.com/", "Open-source coding assistant for self-hosted completions and team privacy.", "Free / Paid", 3400000],
    ["codiumai", "CodiumAI", "https://qodo.ai/", "Generate tests and code understanding help around developer workflows.", "Freemium", 6900000],
    ["postmanai", "Postman AI", "https://www.postman.com/product/postbot/", "Use AI inside API design, testing, and developer collaboration flows.", "Freemium", 9600000],
    ["knime", "KNIME", "https://www.knime.com/", "Blend analytics, data science, and AI workflows in a visual operations stack.", "Free / Paid", 10800000],
    ["snorkelflow", "Snorkel Flow", "https://snorkel.ai/snorkel-flow/", "Label, evaluate, and manage training data pipelines for applied AI teams.", "Paid", 3100000],
    ["weightsandbiasesweave", "Weights & Biases Weave", "https://wandb.ai/site/weave", "Trace, evaluate, and debug LLM applications from the W&B ecosystem.", "Free / Paid", 4200000],
    ["falai", "fal.ai", "https://fal.ai/", "Run fast image, video, and multimodal inference from a developer-first platform.", "Usage-based", 8300000],
    ["anacondaaiassistant", "Anaconda AI Assistant", "https://www.anaconda.com/ai-assistant", "Use natural language to explore Python packages, envs, and data workflows.", "Free / Paid", 3600000],
    ["gptresearcher", "GPT Researcher", "https://gptresearcher.io/", "Open-source research agent for deep topic scans and structured reporting.", "Free / Paid", 4700000],
    ["unsloth", "Unsloth AI", "https://unsloth.ai/", "Fine-tune open models faster with cheaper training workflows and simpler setup.", "Free / Paid", 6100000],
    ["txyz", "txyz", "https://www.txyz.ai/", "Read, organize, and interrogate technical papers with AI-first workflows.", "Freemium", 3000000]
  ], buildLane, builders, "Strong fit when teams are building, evaluating, and shipping agentic products and developer tooling.");

  addTools([
    ["kagisearch", "Kagi Search", "https://kagi.com/", "Search and navigate the web with a paid-first engine built for higher-signal discovery.", "Paid", 18500000],
    ["timeos", "timeOS", "https://timeos.ai/", "Capture meetings and automatically turn them into organized notes and follow-ups.", "Freemium", 4100000],
    ["transkriptor", "Transkriptor", "https://transkriptor.com/", "Transcribe calls, lectures, and recordings into searchable text and summaries.", "Freemium", 6200000],
    ["asana", "Asana", "https://asana.com/ai", "Add AI planning and execution support to structured work management.", "Freemium", 37000000],
    ["trello", "Trello", "https://trello.com/", "Use lightweight boards and AI help to keep team planning moving.", "Freemium", 45000000],
    ["addyai", "Addy AI", "https://addy.so/", "Draft faster email replies and inbox follow-up workflows with less manual effort.", "Freemium", 3400000],
    ["yoodli", "Yoodli", "https://yoodli.ai/", "Coach speaking practice, meeting delivery, and interview answers with AI feedback.", "Freemium", 4500000],
    ["journeyio", "Journey.io", "https://journey.io/", "Build guided client rooms and sales journeys with AI-assisted content.", "Freemium", 3300000],
    ["gitmind", "GitMind", "https://gitmind.com/", "Map ideas, research, and planning trees into clearer visual workflows.", "Freemium", 8100000],
    ["sanaai", "Sana AI", "https://sana.ai/", "Search knowledge, automate work, and coordinate AI across internal teams.", "Paid", 6700000],
    ["heptabase", "Heptabase", "https://heptabase.com/", "Organize connected notes and deep thinking work with a visual-first workspace.", "Paid", 4800000],
    ["mymind", "mymind", "https://mymind.com/", "Save ideas, references, and inspiration into a cleaner personal knowledge layer.", "Paid", 5400000],
    ["notioncalendar", "Notion Calendar", "https://www.notion.com/product/calendar", "Bring calendar context into an AI-friendly workspace and planning flow.", "Free", 14300000],
    ["slackgpt", "Slack GPT", "https://slack.com/ai", "Use AI search, recap, and draft support inside Slack conversations and files.", "Paid", 16000000],
    ["nottaai", "Notta AI", "https://www.notta.ai/", "Convert spoken conversations into transcripts, summaries, and meeting records.", "Freemium", 12400000],
    ["scribehow", "Scribe", "https://scribe.com/", "Generate process guides and walkthrough docs from recorded actions.", "Freemium", 18800000],
    ["loom", "Loom", "https://www.loom.com/", "Record async video explanations and layer in AI summaries and highlights.", "Freemium", 34000000],
    ["maxaime", "MaxAI.me", "https://www.maxai.me/", "Bring AI reading, writing, and web page assistance into the browser.", "Freemium", 6300000],
    ["veniceai", "Venice AI", "https://venice.ai/", "Use a privacy-forward assistant for search, chat, and model access.", "Freemium", 7500000],
    ["chatglm", "ChatGLM", "https://chatglm.cn/", "Access a high-interest multilingual assistant from the ChatGLM family.", "Free / Paid", 14700000],
    ["immersivetranslate", "Immersive Translate", "https://immersivetranslate.com/", "Translate full web pages, PDFs, and multilingual reading workflows in place.", "Freemium", 18100000],
    ["naturalreaders", "NaturalReaders", "https://www.naturalreaders.com/", "Turn documents and study material into natural-sounding speech quickly.", "Freemium", 15600000],
    ["fillout", "Fillout", "https://www.fillout.com/", "Build forms, intake workflows, and smart routing with lighter setup.", "Freemium", 9100000],
    ["prezi", "Prezi", "https://prezi.com/", "Build more dynamic presentations and pitch flows with AI support.", "Freemium", 14000000],
    ["linear", "Linear", "https://linear.app/", "Manage engineering work and AI-assisted planning inside a polished product workflow.", "Paid", 21000000]
  ], workLane, operators, "Strong fit when the workflow is reading, note capture, planning, and search across daily work.");

  addTools([
    ["lumadreammachine", "Luma Dream Machine", "https://lumalabs.ai/dream-machine", "Generate high-interest video clips and motion scenes from prompts.", "Freemium", 20200000],
    ["deepai", "DeepAI", "https://deepai.org/", "Use accessible text, image, and creative AI utilities from one broad toolkit.", "Freemium", 22000000],
    ["flairai", "Flair AI", "https://flair.ai/", "Create branded product visuals and ad concepts with synthetic scenes.", "Freemium", 4300000],
    ["mokkerai", "Mokker AI", "https://mokker.ai/", "Generate product photography backgrounds and hero shots faster.", "Freemium", 3100000],
    ["pebblely", "Pebblely", "https://pebblely.com/", "Turn plain product images into clean lifestyle marketing visuals.", "Freemium", 3600000],
    ["claidai", "Claid.ai", "https://claid.ai/", "Enhance commerce images and automate quality improvements at scale.", "Paid", 4500000],
    ["photaipro", "Phot.AI", "https://phot.ai/", "Edit, generate, and refine creative assets from a browser-first studio.", "Freemium", 3000000],
    ["removalai", "Removal.AI", "https://removal.ai/", "Remove backgrounds and isolate product assets with less manual editing.", "Freemium", 5000000],
    ["visla", "Visla", "https://www.visla.us/", "Script, edit, and package videos with AI support around business storytelling.", "Freemium", 3400000],
    ["vmakerai", "Vmaker AI", "https://www.vmaker.com/ai", "Create screen recordings, edited clips, and marketing videos with AI help.", "Freemium", 6100000],
    ["sonix", "Sonix", "https://sonix.ai/", "Transcribe and repurpose audio into searchable text and subtitles.", "Paid", 8400000],
    ["cleanvoiceai", "Cleanvoice AI", "https://cleanvoice.ai/", "Polish speech audio by removing filler words and noisy pauses automatically.", "Paid", 2700000],
    ["ttsmaker", "TTSMaker", "https://ttsmaker.com/", "Generate voiceovers from text with lightweight multilingual speech output.", "Freemium", 16900000],
    ["topazvideoai", "Topaz Video AI", "https://www.topazlabs.com/topaz-video-ai", "Upscale and restore video footage with strong enhancement workflows.", "Paid", 11400000],
    ["magichour", "Magic Hour", "https://www.magichour.ai/", "Create face swaps, stylized clips, and social-ready video output quickly.", "Freemium", 4200000],
    ["weshop", "WeShop", "https://www.weshop.ai/", "Generate ecommerce product visuals and campaign-ready imagery at speed.", "Freemium", 5100000],
    ["depositphotosai", "Depositphotos AI Image Generator", "https://depositphotos.com/ai-image-generator.html", "Create stock-style images from prompts with a mainstream media library brand.", "Freemium", 13200000],
    ["wavespeedai", "WaveSpeedAI", "https://wavespeed.ai/", "Generate and package short-form video output from prompts and assets.", "Freemium", 4800000],
    ["minimaxaudio", "MiniMax Audio", "https://www.minimax.io/", "Create voices and spoken clips from a fast-moving multimodal model stack.", "Freemium", 7200000],
    ["minimaximage01", "MiniMax Image-01", "https://www.minimax.io/", "Generate images from a newer consumer-facing model brand with rising traffic.", "Freemium", 6800000],
    ["patternedai", "PatternedAI", "https://www.patterned.ai/", "Generate repeatable surface patterns and design assets for creative teams.", "Freemium", 3100000],
    ["brandbird", "BrandBird", "https://www.brandbird.app/", "Design polished social graphics and product visuals without a full design suite.", "Freemium", 5000000],
    ["sora", "Sora", "https://openai.com/sora/", "OpenAI's video generation product for prompt-based scene creation.", "Paid", 39000000],
    ["pixverseai", "PixVerse AI", "https://pixverse.ai/", "Create fast consumer-facing AI videos with templates and social styles.", "Freemium", 16500000],
    ["hedraai", "Hedra AI", "https://www.hedra.com/", "Turn characters and voices into expressive talking-video output.", "Freemium", 8000000],
    ["higgsfieldai", "Higgsfield AI", "https://higgsfield.ai/", "Generate stylized short-form video output for creator and campaign work.", "Freemium", 5700000],
    ["creatifyai", "Creatify AI", "https://creatify.ai/", "Produce ad creatives and product videos from URLs and catalog assets.", "Freemium", 7400000],
    ["colossyancreator", "Colossyan Creator", "https://www.colossyan.com/", "Build avatar-led business videos for training and internal communication.", "Paid", 6000000],
    ["jupitrr", "Jupitrr", "https://jupitrr.com/", "Turn podcasts and scripts into social clips, show notes, and assets faster.", "Freemium", 3200000],
    ["videotoblog", "Video to Blog", "https://www.videotoblog.ai/", "Repurpose long-form video into draft blog content and article structure.", "Freemium", 3000000]
  ], creativeLane, creators, "Strong fit when the job is turning ideas, assets, and recordings into publishable creative output.");

  addTools([
    ["triplewhale", "Triple Whale", "https://www.triplewhale.com/", "Pull ecommerce and ad signals into one AI-assisted growth console.", "Paid", 6400000],
    ["klaviyo", "Klaviyo", "https://www.klaviyo.com/", "Run lifecycle marketing with strong email, SMS, and AI-assisted segmentation.", "Paid", 19000000],
    ["typeform", "Typeform", "https://www.typeform.com/", "Collect richer form inputs and use AI to clean up intake and workflows.", "Freemium", 30000000],
    ["figjamai", "FigJam AI", "https://www.figma.com/figjam/ai/", "Generate workshops, flows, and brainstorm scaffolding inside collaborative canvases.", "Freemium", 26000000],
    ["muralai", "Mural AI", "https://www.mural.co/product/mural-ai", "Summarize whiteboards and generate collaboration artifacts from team sessions.", "Paid", 12000000],
    ["dialpad", "Dialpad", "https://www.dialpad.com/ai/", "Use AI voice, support, and sales workflows across business calling operations.", "Paid", 9500000],
    ["aircall", "Aircall", "https://aircall.io/", "Run cloud calling and AI-assisted customer conversations for revenue teams.", "Paid", 11000000],
    ["ema", "Ema", "https://www.ema.ai/", "Deploy enterprise AI employees across support, IT, and ops workflows.", "Paid", 5000000],
    ["talkdeskai", "Talkdesk AI", "https://www.talkdesk.com/contact-center-platform/ai/", "Layer AI automation and guidance into customer experience operations.", "Paid", 8800000],
    ["uniphore", "Uniphore", "https://www.uniphore.com/", "Apply AI to customer conversations, agents, and enterprise automation.", "Paid", 4000000],
    ["mailchimp", "Mailchimp", "https://mailchimp.com/", "Use mainstream email automation and growing AI help across lifecycle marketing.", "Freemium", 18000000],
    ["getresponse", "GetResponse", "https://www.getresponse.com/", "Launch email, automation, and content campaigns with built-in AI assistance.", "Paid", 12000000],
    ["omnisend", "Omnisend", "https://www.omnisend.com/", "Coordinate ecommerce messaging flows and campaign generation with AI support.", "Paid", 8600000],
    ["respondio", "respond.io", "https://respond.io/", "Manage messaging, routing, and customer engagement from one AI-assisted inbox.", "Paid", 10400000],
    ["onepagecrm", "OnePageCRM", "https://www.onepagecrm.com/", "Keep pipeline follow-up and lightweight CRM work moving with less friction.", "Paid", 3100000],
    ["samespace", "SaneBox", "https://www.sanebox.com/", "Filter inbox noise and automate email triage around what matters.", "Paid", 4300000],
    ["seventhsense", "Seventh Sense", "https://www.theseventhsense.com/", "Optimize email send timing and engagement workflows from AI-like scoring signals.", "Paid", 2800000],
    ["regie", "Regie", "https://www.regie.ai/", "Generate sales messaging and coordinate outbound sequences from one system.", "Paid", 3700000],
    ["lavenderai", "Lavender AI", "https://www.lavender.ai/", "Coach sales email writing with scoring, edits, and better conversion guidance.", "Freemium", 7900000],
    ["commonroomai", "Common Room AI", "https://www.commonroom.io/", "Turn market and account signals into better outbound and pipeline insight.", "Paid", 5400000],
    ["clayai", "Clay AI", "https://www.clay.com/", "Enrich lead lists and automate research across outbound sales workflows.", "Paid", 13100000],
    ["octolane", "Octolane", "https://www.octolane.com/", "Run a self-updating CRM that drafts follow-ups and keeps pipeline data clean.", "Paid", 4900000],
    ["later", "Later", "https://later.com/", "Plan social publishing and creator marketing with AI-assisted scheduling support.", "Freemium", 21000000],
    ["adobegenstudio", "Adobe GenStudio", "https://business.adobe.com/products/genstudio/overview.html", "Coordinate enterprise campaign content and brand-approved asset generation.", "Paid", 6900000],
    ["canvamagicstudio", "Canva Magic Studio", "https://www.canva.com/magic-studio/", "Use Canva's AI creation stack across presentations, graphics, and copy.", "Freemium", 24000000]
  ], revenueLane, revenue, "Strong fit when AI needs to touch pipeline generation, customer contact, forms, and repeatable operations.");

  addTools([
    ["careerflow", "Careerflow", "https://www.careerflow.ai/", "Organize job search work, outreach, and applications with AI help.", "Freemium", 5700000],
    ["huntr", "Huntr", "https://huntr.co/", "Track job applications and improve career materials with AI guidance.", "Freemium", 7000000],
    ["teal", "Teal", "https://www.tealhq.com/", "Manage resumes, job search tracking, and applications from one AI-assisted toolkit.", "Freemium", 9100000],
    ["kickresume", "Kickresume", "https://www.kickresume.com/", "Draft resumes, cover letters, and job-search assets with AI help.", "Freemium", 12700000],
    ["interviewquery", "Interview Query", "https://www.interviewquery.com/", "Prepare for analytics, product, and data interviews with structured practice.", "Freemium", 11800000],
    ["quizlet", "Quizlet", "https://quizlet.com/", "Turn study material into flashcards and adaptive review workflows at scale.", "Freemium", 42000000],
    ["coursehero", "Course Hero", "https://www.coursehero.com/", "Study with documents, notes, and AI-assisted academic support across subjects.", "Freemium", 27000000],
    ["mercor", "Mercor", "https://mercor.com/", "Use AI-first hiring workflows to source and evaluate global talent faster.", "Paid", 15500000],
    ["paraform", "Paraform", "https://www.paraform.com/", "Match candidates to open roles with faster recruiter and founder workflows.", "Paid", 5800000],
    ["ashby", "Ashby", "https://www.ashbyhq.com/", "Run modern recruiting operations with stronger automation and reporting.", "Paid", 8200000],
    ["eightfold", "Eightfold", "https://eightfold.ai/", "Apply AI to recruiting, talent matching, and workforce planning decisions.", "Paid", 6000000],
    ["wixadi", "Wix ADI", "https://www.wix.com/ai-website-builder", "Generate and expand websites faster from simple business inputs and AI suggestions.", "Freemium", 16800000],
    ["marketingblocks", "MarketingBlocks", "https://marketingblocks.ai/", "Generate landing pages, ads, and launch content from one creator stack.", "Freemium", 3200000],
    ["casperai", "Casper AI", "https://www.casperai.com/", "Summarize docs, browser tabs, and reading queues into faster comprehension.", "Freemium", 3600000],
    ["turncage", "TurnCage", "https://turncage.com/", "Generate a small-business website by answering guided setup questions.", "Freemium", 4400000],
    ["humataai", "Humata AI", "https://www.humata.ai/", "Ask questions over private documents and get faster file-grounded answers.", "Freemium", 9800000],
    ["papergen", "PaperGen", "https://papergen.ai/", "Create research-style drafts and literature summaries from source inputs.", "Freemium", 2900000],
    ["doctrinaai", "Doctrina AI", "https://doctrina.ai/", "Generate notes, quizzes, and revision support for students and teachers.", "Freemium", 3400000],
    ["knowtai", "Knowt AI", "https://knowt.com/", "Build AI-generated flashcards and study guides from class material.", "Freemium", 10600000]
  ], careerLane, career, "Strong fit when AI needs to improve study, hiring, and professional preparation workflows.");

  addTools([
    ["guru", "Guru", "https://www.getguru.com/", "Centralize company knowledge and answers with AI search and assist layers.", "Paid", 11500000],
    ["fibery", "Fibery", "https://fibery.com/", "Connect docs, workflows, and operations into one flexible AI-ready workspace.", "Paid", 3300000],
    ["nyota", "Nyota", "https://www.nyota.ai/", "Capture meeting notes, action items, and follow-up context automatically.", "Freemium", 3100000],
    ["heidihealth", "Heidi Health", "https://www.heidihealth.com/", "Use an ambient clinical assistant to draft notes and reduce admin burden.", "Freemium", 4900000],
    ["glasshealth", "Glass Health", "https://glass.health/", "Support clinical reasoning and structured documentation with an AI copilot.", "Freemium", 4000000],
    ["harveyai", "Harvey AI", "https://www.harvey.ai/", "Bring legal drafting, review, and research assistance into professional workflows.", "Paid", 14000000],
    ["evenupai", "EvenUp AI", "https://www.evenuplaw.com/", "Use AI to organize plaintiff-side legal work and claim preparation.", "Paid", 7200000],
    ["openevidenceai", "OpenEvidence AI", "https://www.openevidence.com/", "Give clinicians fast, evidence-grounded answers and source-backed support.", "Freemium", 18300000],
    ["freedai", "Freed AI", "https://www.getfreed.ai/", "Draft medical notes from conversations and reduce repetitive charting work.", "Freemium", 5100000],
    ["sukiassistant", "Suki Assistant", "https://www.suki.ai/", "Use an AI voice assistant for clinical note creation and chart navigation.", "Paid", 6800000],
    ["nablaai", "Nabla AI", "https://www.nabla.com/", "Add ambient AI documentation and assistance to care delivery workflows.", "Paid", 4500000],
    ["sunsama", "Sunsama", "https://www.sunsama.com/", "Plan focused workdays with AI-aware scheduling and calmer prioritization.", "Paid", 4200000],
    ["akiflow", "Akiflow", "https://akiflow.com/", "Merge tasks and calendars into one higher-velocity planning workflow.", "Paid", 4800000],
    ["airtableaiassistant", "Airtable AI Assistant", "https://www.airtable.com/platform/ai", "Add AI generation, extraction, and workflow help to structured business data.", "Paid", 17000000],
    ["fliphtml5aiebookgenerator", "FlipHTML5 AI Ebook Generator", "https://fliphtml5.com/ai/ebook-generator/", "Generate digital books and content assets from lighter AI-assisted publishing flows.", "Freemium", 8900000],
    ["ahrefsai", "Ahrefs AI", "https://ahrefs.com/ai", "Bring AI writing and SEO help into one of the web's stronger search-data brands.", "Paid", 18600000],
    ["semrushcontentshake", "Semrush ContentShake", "https://www.semrush.com/apps/contentshake/", "Generate SEO article angles and outlines from Semrush research context.", "Paid", 10300000],
    ["bitbucket", "Bitbucket", "https://bitbucket.org/product/", "Manage engineering collaboration with Atlassian's code platform and growing AI layer.", "Free / Paid", 33000000],
    ["bookeai", "Booke AI", "https://booke.ai/", "Automate bookkeeping work inside QuickBooks and Xero with an AI teammate model.", "Paid", 3000000],
    ["revisiondojo", "RevisionDojo", "https://www.revisiondojo.com/", "Use AI-powered exam prep, grading support, and study material for IB students.", "Freemium", 6400000]
  ], professionalLane, professionals, "Strong fit when AI needs to support higher-stakes professional, financial, and domain-specific decision work.");
})();
