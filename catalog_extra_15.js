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
  const operators = ["Operators", "Enterprises", "Product teams"];
  const creators = ["Creators", "Marketers", "Studios"];
  const supportLane = ["Assistants", "Sales", "Automation"];
  const productLane = ["Productivity", "Writing", "Research"];
  const creativeLane = ["Design", "Video", "Audio"];
  const vendorOverrides = {
    "Now Assist": "ServiceNow",
    "SAP Joule": "SAP",
    "Intuit Assist": "Intuit",
    "Zoom AI Companion": "Zoom",
    "Lucid AI": "Lucid",
    "Acrobat AI Assistant": "Adobe",
    "Foxit AI": "Foxit",
    "PDFelement AI": "Wondershare",
    "Snowflake Cortex": "Snowflake",
    "PathAI": "PathAI",
    "Aidoc": "Aidoc",
    "Lexus+ AI": "LexisNexis"
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
    ["servicenownowassist", "Now Assist", "https://www.servicenow.com/products/now-assist.html", "Bring AI search, summaries, and workflow help into ServiceNow.", "Paid", 28000000],
    ["sapjoule", "SAP Joule", "https://www.sap.com/products/artificial-intelligence/ai-assistant.html", "Use SAP's AI copilot across ERP, finance, and operations tasks.", "Paid", 21000000],
    ["intuitassist", "Intuit Assist", "https://www.intuit.com/products/artificial-intelligence/", "Add AI guidance and drafting across Intuit business workflows.", "Paid", 18000000],
    ["oracleai", "Oracle AI", "https://www.oracle.com/artificial-intelligence/", "Run AI copilots and automation across Oracle cloud products.", "Paid", 24000000],
    ["workdayilluminate", "Workday Illuminate", "https://www.workday.com/en-us/artificial-intelligence.html", "Use AI assistance across HR, finance, and planning workflows.", "Paid", 16000000],
    ["kustomerai", "Kustomer AI", "https://www.kustomer.com/ai/", "Handle support conversations and service automation with AI help.", "Paid", 4600000],
    ["gladlyai", "Gladly AI", "https://www.gladly.com/ai/", "Bring faster agent assist and ticket context into support teams.", "Paid", 4200000],
    ["capacityai", "Capacity", "https://capacity.com/", "Answer internal questions and automate support operations from one AI hub.", "Paid", 5300000],
    ["netomi", "Netomi", "https://www.netomi.com/", "Automate customer support and deflect repetitive service work.", "Paid", 5600000],
    ["certainly", "Certainly", "https://certainly.io/", "Deploy AI chat experiences for support and conversion workflows.", "Paid", 3400000],
    ["moveworks", "Moveworks", "https://www.moveworks.com/", "Resolve employee requests and enterprise support tasks with AI.", "Paid", 12000000],
    ["aisera", "Aisera", "https://aisera.com/", "Run service desk and support operations with enterprise AI agents.", "Paid", 4700000],
    ["polyai", "PolyAI", "https://poly.ai/", "Use voice AI agents for customer service and call handling.", "Paid", 7100000],
    ["sanas", "Sanas", "https://www.sanas.ai/", "Improve voice clarity and real-time communication in support calls.", "Paid", 4800000],
    ["brainfish", "Brainfish", "https://brainfish.ai/", "Turn help content into instant AI answers for customers and teams.", "Freemium", 3500000],
    ["zoomaicompanion", "Zoom AI Companion", "https://preview.zoom.com/en/products/ai-assistant/", "Summarize meetings and speed up work inside the Zoom stack.", "Paid", 32000000],
    ["revenueio", "Revenue.io", "https://www.revenue.io/", "Use AI call guidance and revenue intelligence for sales teams.", "Paid", 6600000],
    ["chorusai", "Chorus", "https://www.zoominfo.com/products/chorus", "Capture sales call insights and coaching signals automatically.", "Paid", 5400000],
    ["salesroom", "Salesroom", "https://salesroom.com/", "Run AI-assisted meetings and improve deal execution for reps.", "Paid", 3300000],
    ["jiminny", "Jiminny", "https://jiminny.com/", "Track conversations and coaching moments across customer-facing teams.", "Paid", 3900000]
  ], supportLane, operators, "A strong add because AI-first support and revenue operations remain one of the busiest enterprise software categories.");

  addTools([
    ["callrailai", "CallRail AI", "https://www.callrail.com/", "Surface call summaries and lead quality signals from phone conversations.", "Paid", 11800000],
    ["spinachai", "Spinach AI", "https://www.spinach.ai/", "Capture meeting notes and action items for product and ops teams.", "Freemium", 4300000],
    ["wrikeai", "Wrike AI", "https://www.wrike.com/features/work-intelligence/", "Bring drafting and work intelligence into project management.", "Paid", 8100000],
    ["smartsheetai", "Smartsheet AI", "https://www.smartsheet.com/ai", "Use AI help across sheets, planning, and workflow automation.", "Paid", 10300000],
    ["lucidai", "Lucid AI", "https://lucid.co/ai", "Generate diagrams and summarize boards faster inside Lucid.", "Freemium", 7600000],
    ["acrobataiassistant", "Acrobat AI Assistant", "https://www.adobe.com/acrobat/ai-assistant.html", "Ask questions over PDFs and long documents in Acrobat.", "Paid", 21400000],
    ["foxitai", "Foxit AI", "https://www.foxit.com/ai/", "Summarize and query PDFs inside Foxit's editor workflow.", "Paid", 7400000],
    ["pdfelementai", "PDFelement AI", "https://pdf.wondershare.com/ai-pdf-tools/", "Use AI rewrite and document Q&A inside PDFelement.", "Freemium", 12500000],
    ["nitroai", "Nitro AI", "https://www.gonitro.com/ai", "Handle PDF summarization and document help in Nitro.", "Paid", 4100000],
    ["causaly", "Causaly", "https://www.causaly.com/", "Map biomedical evidence and scientific reasoning across literature.", "Paid", 3600000],
    ["vizai", "Viz.ai", "https://www.viz.ai/", "Coordinate clinical decision support with AI-powered care alerts.", "Paid", 5200000],
    ["tempus", "Tempus", "https://www.tempus.com/", "Use AI and data for diagnostics and precision medicine workflows.", "Paid", 9800000],
    ["pathai", "PathAI", "https://www.pathai.com/", "Apply AI to pathology review and life sciences diagnostics.", "Paid", 4700000],
    ["aidoc", "Aidoc", "https://www.aidoc.com/", "Automate radiology and imaging workflows with clinical AI.", "Paid", 5600000],
    ["augmedix", "Augmedix", "https://www.augmedix.com/", "Generate medical notes and documentation from clinical conversations.", "Paid", 3900000],
    ["qventus", "Qventus", "https://www.qventus.com/", "Optimize hospital operations and patient flow with AI automation.", "Paid", 4300000],
    ["lawgeex", "Lawgeex", "https://www.lawgeex.com/", "Accelerate contract review and legal workflow triage with AI.", "Paid", 3400000],
    ["lexisplusai", "Lexis+ AI", "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page", "Research case law and draft legal output with trusted sources.", "Paid", 8500000],
    ["dremioai", "Dremio AI", "https://www.dremio.com/ai/", "Query data faster with an AI layer on top of lakehouse workflows.", "Paid", 3700000],
    ["snowflakecortex", "Snowflake Cortex", "https://www.snowflake.com/en/product/features/cortex/", "Bring LLM and AI functions directly into Snowflake data stacks.", "Usage-based", 14200000]
  ], productLane, operators, "A strong add because document AI and regulated-industry tooling are now highly visible buyer segments.");

  addTools([
    ["dreamstudio", "DreamStudio", "https://dreamstudio.ai/", "Generate images quickly with Stability's hosted creative workflow.", "Freemium", 9300000],
    ["nightcafe", "NightCafe", "https://creator.nightcafe.studio/", "Create community-driven AI art and prompt experiments at scale.", "Freemium", 18900000],
    ["magnificai", "Magnific AI", "https://magnific.ai/", "Upscale and enhance images with more detail and art direction.", "Paid", 14300000],
    ["imagineart", "ImagineArt", "https://www.imagine.art/", "Generate stylized art, portraits, and marketing images from prompts.", "Freemium", 12100000],
    ["hotpotai", "Hotpot AI", "https://hotpot.ai/", "Handle image generation, cleanup, and social creative tasks in one place.", "Freemium", 13700000],
    ["piclumen", "PicLumen", "https://www.piclumen.com/", "Create illustrations, product art, and concept images with simple prompting.", "Freemium", 5800000],
    ["artguru", "Artguru", "https://www.artguru.ai/", "Generate portraits, avatars, and fantasy art with lightweight controls.", "Freemium", 11600000],
    ["clipfly", "Clipfly", "https://www.clipfly.ai/", "Edit and generate video clips with simple browser tools.", "Freemium", 4700000],
    ["picsartai", "Picsart AI", "https://picsart.com/ai-image-generator/", "Bring AI image generation and editing into a mainstream creator suite.", "Freemium", 27100000],
    ["vismeai", "Visme AI", "https://www.visme.co/ai-tools/", "Generate business visuals, decks, and marketing assets faster.", "Freemium", 12300000],
    ["brandcrowdai", "BrandCrowd AI", "https://www.brandcrowd.com/ai-logo-generator", "Spin up logos and brand assets without a full design workflow.", "Paid", 10400000],
    ["logomasterai", "Logomaster.ai", "https://logomaster.ai/", "Create startup-friendly logo concepts with AI-assisted direction.", "Paid", 5400000],
    ["logodiffusion", "Logo Diffusion", "https://logodiffusion.com/", "Generate and iterate logo directions with more visual range.", "Paid", 3900000],
    ["icons8ai", "Icons8 AI", "https://icons8.com/ai", "Generate icons, photos, and quick brand assets from one toolbox.", "Freemium", 8800000],
    ["onetakeai", "OneTake AI", "https://onetake.ai/", "Clean up talking-head videos automatically from a single take.", "Paid", 4200000],
    ["rephraseai", "Rephrase.ai", "https://www.rephrase.ai/", "Produce avatar-led video presentations and personalized clips.", "Paid", 3300000],
    ["animakerai", "Animaker AI", "https://www.animaker.com/ai", "Create explainer videos and animated assets with AI help.", "Freemium", 7900000],
    ["steveai", "Steve AI", "https://www.steve.ai/", "Turn scripts into animated and stock-video explainers faster.", "Freemium", 5100000],
    ["powtoonai", "Powtoon AI", "https://www.powtoon.com/ai-video-generator/", "Draft business video stories and training clips with AI support.", "Freemium", 6900000],
    ["lumen5", "Lumen5", "https://lumen5.com/", "Convert posts and scripts into branded videos for social channels.", "Freemium", 11100000],
    ["wavevideoai", "Wave.video AI", "https://wave.video/ai", "Handle AI video generation and publishing inside a creator workflow.", "Freemium", 4900000],
    ["kitsai", "Kits AI", "https://www.kits.ai/", "Create AI vocals and voice workflows for music production.", "Freemium", 6100000],
    ["audimee", "Audimee", "https://audimee.com/", "Transform vocals and voice styles for music and audio creators.", "Paid", 3200000],
    ["soundful", "Soundful", "https://soundful.com/", "Generate royalty-friendly music for videos and creator projects.", "Freemium", 7600000],
    ["loudly", "Loudly", "https://www.loudly.com/", "Create and customize AI music for social and branded content.", "Freemium", 5800000],
    ["splashpro", "Splash", "https://www.splashmusic.com/", "Make AI-assisted music and interactive audio experiences.", "Freemium", 4600000],
    ["voiceai", "Voice.ai", "https://voice.ai/", "Use real-time voice changing and cloned speech in live workflows.", "Freemium", 9100000],
    ["voicify", "Voicify", "https://voicify.ai/", "Generate covers and synthetic voice tracks for creator experiments.", "Freemium", 6800000],
    ["speechgen", "SpeechGen", "https://speechgen.io/", "Turn text into spoken audio with many voices and languages.", "Freemium", 7200000],
    ["auphonic", "Auphonic", "https://auphonic.com/", "Clean, level, and polish spoken audio with less manual work.", "Freemium", 4300000]
  ], creativeLane, creators, "A strong add because creator-facing image, video, and audio tools still dominate AI discovery traffic.");
})();
