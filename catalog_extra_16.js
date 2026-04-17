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
  const creators = ["Creators", "Marketers", "Studios"];
  const revenueTeams = ["Revenue teams", "Marketers", "Agencies"];
  const builders = ["Developers", "AI teams", "Platform teams"];
  const creativeLane = ["Design", "Video", "Audio"];
  const marketingLane = ["Writing", "Sales", "Productivity"];
  const buildLane = ["Coding", "Automation", "Research"];
  const vendorOverrides = {
    "Builder.io AI": "Builder.io",
    "Black Crow AI": "Black Crow",
    "Google Vertex AI": "Google Cloud",
    "Azure AI Studio": "Microsoft",
    "Amazon Bedrock": "AWS",
    "C3 AI": "C3 AI",
    "NVIDIA NIM": "NVIDIA"
  };

  function vendorFromName(name) {
    return vendorOverrides[name] || name.split(" ")[0] || name;
  }

  function addTools(rows, categories, audience, recommendation) {
    rows.forEach(([id, name, url, summary, pricing, monthlyVisits]) => {
      if (existingIds.has(id)) {
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
    });
  }

  addTools([
    ["alteredai", "Altered", "https://www.altered.ai/", "Transform and direct voice performances with studio-style AI controls.", "Paid", 3600000],
    ["jammable", "Jammable", "https://www.jammable.com/", "Create AI covers and voice remixes from familiar song ideas.", "Freemium", 5800000],
    ["musicstarai", "MusicStar AI", "https://musicstar.ai/", "Generate lyrics and songs for quick music ideation.", "Freemium", 3400000],
    ["beatopia", "Beatopia", "https://beatopia.com/", "Browse creator-friendly beats with AI-assisted production angles.", "Paid", 3700000],
    ["audyo", "Audyo", "https://www.audyo.ai/", "Write and edit spoken audio as if it were text.", "Freemium", 4200000],
    ["aiva", "AIVA", "https://www.aiva.ai/", "Compose cinematic music and soundtrack ideas with AI help.", "Freemium", 6100000],
    ["soundverseai", "Soundverse", "https://www.soundverse.ai/", "Create AI music, stems, and audio ideas inside one workspace.", "Freemium", 4300000],
    ["uberduck", "Uberduck", "https://uberduck.ai/", "Generate AI voices and playful audio experiments at creator speed.", "Freemium", 8900000],
    ["mureka", "Mureka", "https://www.mureka.ai/", "Create AI music and vocal-first content with a lightweight interface.", "Freemium", 3000000],
    ["riffusion", "Riffusion", "https://www.riffusion.com/", "Generate musical ideas and loops from prompts and moods.", "Freemium", 4500000]
  ], creativeLane, creators, "A strong add because music and voice generation is still a fast-growing creator lane.");

  addTools([
    ["postwise", "Postwise", "https://postwise.ai/", "Draft growth-oriented social posts and threads with AI help.", "Paid", 4300000],
    ["tweethunter", "Tweet Hunter", "https://tweethunter.io/", "Plan, write, and repurpose X content around audience growth.", "Paid", 7100000],
    ["feedhive", "FeedHive", "https://feedhive.com/", "Schedule content and create social copy from one AI-enabled calendar.", "Freemium", 5400000],
    ["socialbee", "SocialBee", "https://socialbee.com/", "Use AI writing and scheduling to scale multichannel social workflows.", "Paid", 6200000],
    ["laterai", "Later AI", "https://later.com/ai-tools/", "Generate captions and keep creator publishing flows moving faster.", "Freemium", 18200000],
    ["vistasocial", "Vista Social", "https://vistasocial.com/", "Manage publishing, inboxes, and AI content workflows in one place.", "Freemium", 3900000],
    ["planableai", "Planable AI", "https://planable.io/ai-social-media-assistant/", "Draft and review social posts inside a collaborative content process.", "Freemium", 3600000],
    ["narrato", "Narrato", "https://narrato.io/", "Create briefs, articles, and SEO content from a single workspace.", "Paid", 4100000],
    ["contentbot", "ContentBot", "https://contentbot.ai/", "Generate marketing copy, blog drafts, and workflow automations.", "Paid", 4700000],
    ["peppertype", "Peppertype", "https://www.peppertype.ai/", "Create conversion-oriented copy and repurpose campaign assets faster.", "Paid", 5200000],
    ["articleforge", "Article Forge", "https://www.articleforge.com/", "Generate long-form article drafts aimed at content site workflows.", "Paid", 7300000],
    ["textcortex", "TextCortex", "https://textcortex.com/", "Write, rewrite, and summarize content across many business surfaces.", "Freemium", 12900000],
    ["smodin", "Smodin", "https://smodin.io/", "Handle rewriting, homework, and everyday writing tasks in one suite.", "Freemium", 20500000],
    ["easypeasyai", "Easy-Peasy.AI", "https://easy-peasy.ai/", "Use templates and chat workflows for copy, images, and content support.", "Freemium", 9100000],
    ["writecream", "Writecream", "https://www.writecream.com/", "Generate outreach copy, blog ideas, and voiceover scripts quickly.", "Freemium", 6200000],
    ["yomuai", "Yomu AI", "https://www.yomu.ai/", "Polish essays and long-form writing with more academic structure.", "Paid", 3600000],
    ["sharlyai", "Sharly AI", "https://sharly.ai/", "Ask questions over PDFs and notes inside a lightweight reading workflow.", "Freemium", 5800000],
    ["juniaai", "Junia AI", "https://www.junia.ai/", "Generate SEO-first articles with topic structure and optimization cues.", "Paid", 5200000],
    ["contentatscale", "Content at Scale", "https://brandwell.ai/", "Publish high-volume SEO content with AI-assisted editorial flows.", "Paid", 6800000],
    ["wordhero", "WordHero", "https://wordhero.co/", "Generate ad copy, social posts, and everyday marketing drafts.", "Paid", 4900000],
    ["mixo", "Mixo", "https://www.mixo.io/", "Launch idea pages and startup sites with AI-generated sections.", "Freemium", 6100000],
    ["zipwp", "ZipWP", "https://zipwp.com/", "Create WordPress websites from prompts and reusable components.", "Freemium", 3300000],
    ["appypieai", "Appy Pie AI", "https://www.appypie.com/ai", "Build lightweight apps and sites from no-code AI workflows.", "Freemium", 10400000],
    ["pineapplebuilder", "Pineapple Builder", "https://www.pineapplebuilder.com/", "Generate business websites from short prompts and service details.", "Freemium", 3700000],
    ["wegic", "Wegic", "https://wegic.ai/", "Create simple websites and landing pages through conversational AI.", "Freemium", 4600000]
  ], marketingLane, revenueTeams, "A strong add because AI content and growth tools continue to be one of the biggest high-intent search categories.");

  addTools([
    ["buildai", "BuildAI", "https://www.buildai.space/", "Spin up mini AI apps and landing pages from simple prompts.", "Freemium", 3200000],
    ["builderioai", "Builder.io AI", "https://www.builder.io/ai", "Generate UI sections and digital experiences inside Builder workflows.", "Freemium", 7700000],
    ["octaneai", "Octane AI", "https://octaneai.com/", "Run quizzes and conversational journeys that lift ecommerce conversions.", "Paid", 5200000],
    ["zipchat", "Zipchat AI", "https://zipchat.ai/", "Use AI chat to recover sales and answer shopper questions on stores.", "Paid", 3900000],
    ["nosto", "Nosto", "https://www.nosto.com/", "Personalize ecommerce discovery and recommendations with AI signals.", "Paid", 9100000],
    ["bloomreach", "Bloomreach", "https://www.bloomreach.com/", "Unify search, merchandising, and customer journeys with AI help.", "Paid", 8300000],
    ["constructor", "Constructor", "https://constructor.com/", "Improve product discovery with search and recommendation intelligence.", "Paid", 4700000],
    ["algolia", "Algolia", "https://www.algolia.com/", "Power search and recommendation experiences with AI relevance controls.", "Usage-based", 19800000],
    ["searchspring", "Searchspring", "https://searchspring.com/", "Tune merchandising and search for ecommerce storefronts more easily.", "Paid", 3600000],
    ["visenze", "ViSenze", "https://www.visenze.com/", "Use visual search and recommendation tools for retail discovery.", "Paid", 3100000],
    ["lilyai", "Lily AI", "https://www.lily.ai/", "Improve product attributes and shopper matching with retail AI.", "Paid", 3300000],
    ["vueai", "Vue.ai", "https://vue.ai/", "Apply AI to ecommerce personalization, cataloging, and operations.", "Paid", 3400000],
    ["syteai", "Syte", "https://syte.ai/", "Bring visual discovery and personalized search to online shopping.", "Paid", 3500000],
    ["blackcrowai", "Black Crow AI", "https://www.blackcrow.ai/", "Predict customer intent and improve acquisition economics with AI.", "Paid", 3200000],
    ["recombee", "Recombee", "https://www.recombee.com/", "Deploy recommendation engines and search ranking with flexible APIs.", "Usage-based", 3900000],
    ["dynamicsyield", "Dynamic Yield", "https://www.dynamicyield.com/", "Personalize experiences and experiments across commerce and content.", "Paid", 6200000],
    ["clerkio", "Clerk.io", "https://www.clerk.io/", "Improve ecommerce search, recommendations, and email triggers with AI.", "Paid", 3000000],
    ["lemlist", "Lemlist", "https://www.lemlist.com/", "Automate outbound sequences and personalization for revenue teams.", "Paid", 14800000],
    ["saleshandy", "Saleshandy", "https://www.saleshandy.com/", "Run cold outreach and reply tracking with AI-assisted workflows.", "Paid", 8800000],
    ["personizely", "Personizely", "https://personizely.net/", "Optimize popups, personalization, and conversion messaging with AI help.", "Paid", 3100000],
    ["replyioai", "Reply.io", "https://reply.io/", "Handle multichannel outbound sequences and assistant workflows for sales.", "Paid", 9600000],
    ["smartwriter", "Smartwriter", "https://www.smartwriter.ai/", "Generate personalized outreach lines and prospect messaging at scale.", "Paid", 5700000],
    ["smartleadai", "Smartlead", "https://www.smartlead.ai/", "Scale outbound infrastructure with AI support for campaign execution.", "Paid", 12300000],
    ["quicklinesai", "Quicklines", "https://quicklines.ai/", "Create first-line personalization for cold email campaigns faster.", "Paid", 3400000],
    ["meetcody", "Cody", "https://meetcody.ai/", "Train a custom assistant on company knowledge without building the stack.", "Freemium", 5100000]
  ], marketingLane, revenueTeams, "A strong add because AI-led ecommerce and outbound tooling now shape a large share of commercial buyer research.");

  addTools([
    ["vertexai", "Google Vertex AI", "https://cloud.google.com/vertex-ai", "Build, tune, and deploy models inside Google's cloud platform.", "Usage-based", 22100000],
    ["azureaistudio", "Azure AI Studio", "https://azure.microsoft.com/en-us/products/ai-studio", "Create AI applications and copilots on Microsoft's cloud stack.", "Usage-based", 19800000],
    ["amazonbedrock", "Amazon Bedrock", "https://aws.amazon.com/bedrock/", "Access foundation models and agent workflows inside AWS.", "Usage-based", 17600000],
    ["watsonx", "watsonx", "https://www.ibm.com/watsonx", "Run enterprise models, governance, and AI builders under one platform.", "Paid", 14200000],
    ["palantiraip", "Palantir AIP", "https://www.palantir.com/platforms/aip/", "Connect LLM workflows to operational data and enterprise actions.", "Paid", 11600000],
    ["c3ai", "C3 AI", "https://c3.ai/", "Deploy enterprise AI applications for operations and industry use cases.", "Paid", 13300000],
    ["dominodatalab", "Domino Data Lab", "https://domino.ai/", "Manage MLOps, governance, and AI development across large teams.", "Paid", 4100000],
    ["dataiku", "Dataiku", "https://www.dataiku.com/", "Run data science and enterprise AI projects on a governed platform.", "Paid", 12900000],
    ["nvidianim", "NVIDIA NIM", "https://developer.nvidia.com/nim", "Serve optimized models and inference building blocks on NVIDIA stacks.", "Usage-based", 9800000],
    ["bentoml", "BentoML", "https://www.bentoml.com/", "Package and ship AI inference services with cleaner deployment paths.", "Free / Paid", 4700000]
  ], buildLane, builders, "A strong add because cloud AI platforms and deployment tooling stay central to enterprise AI evaluations.");
})();
