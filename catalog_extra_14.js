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

  const builders = ["Developers", "AI teams", "Platform teams"];
  const creators = ["Creators", "Marketers", "Studios"];
  const consumers = ["Consumers", "Creators", "Knowledge workers"];
  const revenueTeams = ["Revenue teams", "Marketers", "Agencies"];
  const jobSeekers = ["Candidates", "Students", "Professionals"];

  const buildLane = ["Coding", "Automation", "Research"];
  const creativeLane = ["Design", "Video", "Audio"];
  const marketingLane = ["Writing", "Sales", "Productivity"];
  const writingLane = ["Writing", "Research", "Productivity"];
  const assistantLane = ["Assistants", "Writing", "Productivity"];

  const vendorOverrides = {
    "AIApply": "AIApply",
    "Final Round AI": "Final Round",
    "Teal HQ AI": "Teal",
    "Simplify Copilot": "Simplify",
    "Kickresume AI": "Kickresume",
    "Meta AI": "Meta",
    "CustomGPT": "CustomGPT",
    "DocsBot": "DocsBot",
    "SiteGPT": "SiteGPT",
    "MaxAI": "MaxAI",
    "HubSpot Campaign Assistant": "HubSpot"
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
    ["remini", "Remini", "https://remini.ai/", "Enhance portraits and restore low-quality photos with consumer-friendly AI tools.", "Freemium", 41000000],
    ["fotor", "Fotor", "https://www.fotor.com/", "Edit, design, and generate images with an all-in-one creative suite.", "Freemium", 37000000],
    ["vanceai", "VanceAI", "https://vanceai.com/", "Upscale, sharpen, and clean up images for ecommerce and creator workflows.", "Freemium", 11800000],
    ["letsenhance", "Let's Enhance", "https://letsenhance.io/", "Improve image resolution, lighting, and print readiness in a few clicks.", "Freemium", 9800000],
    ["magicstudio", "Magic Studio", "https://magicstudio.com/", "Create product photos, remove backgrounds, and generate lightweight creatives.", "Freemium", 14000000],
    ["tella", "Tella", "https://www.tella.tv/", "Record polished async videos with cleaner editing and presentation tools.", "Freemium", 4700000],
    ["vidyoai", "vidyo.ai", "https://vidyo.ai/", "Turn long-form videos into short clips optimized for social distribution.", "Freemium", 6200000],
    ["flexclipai", "FlexClip AI", "https://www.flexclip.com/tools/ai-video-editor/", "Generate, edit, and repurpose videos inside a simple browser editor.", "Freemium", 16000000],
    ["storyboardhero", "Storyboard Hero", "https://storyboardhero.ai/", "Generate ad and explainer storyboards before production starts.", "Paid", 3100000],
    ["boords", "Boords", "https://boords.com/ai", "Plan storyboards and video scenes with AI-assisted scripting support.", "Paid", 3900000],
    ["rendernet", "RenderNet", "https://rendernet.ai/", "Generate consistent AI characters and stylized visual assets for creators.", "Freemium", 5400000],
    ["upscalemedia", "Upscale.media", "https://www.upscale.media/", "Enlarge product and social images while preserving usable detail.", "Freemium", 15000000],
    ["piccopilot", "Pic Copilot", "https://www.piccopilot.com/", "Make ecommerce product visuals faster with AI scene and background tools.", "Freemium", 5800000],
    ["photoleap", "Photoleap", "https://www.photoleapapp.com/", "Create mobile-first edits, composites, and generative visual effects.", "Freemium", 17300000],
    ["facetune", "Facetune", "https://www.facetuneapp.com/", "Retouch portraits and creator images with consumer-grade editing speed.", "Freemium", 22500000],
    ["synthesys", "Synthesys", "https://synthesys.io/", "Produce avatar videos, voiceovers, and marketing media from scripts.", "Paid", 4600000],
    ["listnr", "Listnr", "https://listnr.ai/", "Generate voiceovers and spoken audio for podcasts, clips, and narrations.", "Freemium", 4900000],
    ["voicemaker", "Voicemaker", "https://voicemaker.in/", "Convert text into natural voices with flexible export and language support.", "Freemium", 8700000],
    ["mubert", "Mubert", "https://mubert.com/", "Create royalty-friendly AI music for video, streams, and branded content.", "Freemium", 7200000],
    ["syllaby", "Syllaby", "https://syllaby.io/", "Plan video topics and generate scripts for creator-led short-form output.", "Paid", 5100000]
  ], creativeLane, creators, "A strong add because creator-facing image, video, and audio tools still dominate mainstream AI discovery.");

  addTools([
    ["typedream", "Typedream", "https://typedream.com/", "Publish prompt-assisted websites and landing pages with lightweight editing.", "Freemium", 9300000],
    ["webliumai", "Weblium AI", "https://weblium.com/", "Build business websites with AI help for structure, copy, and setup.", "Freemium", 3800000],
    ["bookmarkai", "Bookmark AI", "https://www.bookmark.com/ai-website-builder", "Spin up a simple website quickly with AI-generated page structure.", "Freemium", 3500000],
    ["dorikai", "Dorik AI", "https://dorik.com/ai", "Create landing pages and sites with AI copy and section generation.", "Freemium", 5900000],
    ["landingi", "Landingi", "https://landingi.com/ai", "Optimize landing page copy and launch variants faster with AI help.", "Paid", 7600000],
    ["unbounceai", "Unbounce AI", "https://unbounce.com/product/smart-copy/", "Draft conversion-focused copy and speed up landing page experiments.", "Paid", 13800000],
    ["copymonkey", "CopyMonkey", "https://copymonkey.ai/", "Generate Amazon listings and product copy for ecommerce teams.", "Paid", 4300000],
    ["adcopy", "AdCopy", "https://www.adcopy.ai/", "Generate paid social copy built around performance marketing angles.", "Paid", 4100000],
    ["hoppycopy", "Hoppy Copy", "https://www.hoppycopy.co/", "Write newsletters, sequences, and campaign assets for email teams.", "Paid", 6200000],
    ["contentshake", "ContentShake", "https://www.semrush.com/contentshake/", "Build SEO articles and briefs with the Semrush content workflow.", "Paid", 6400000],
    ["campaignassistant", "HubSpot Campaign Assistant", "https://www.hubspot.com/campaign-assistant", "Create campaign copy, emails, and ads from a simple brief.", "Free", 10200000],
    ["outranking", "Outranking", "https://www.outranking.io/", "Plan, optimize, and refresh SEO content with AI support.", "Paid", 3400000],
    ["neuraltext", "NeuralText", "https://neuraltext.com/", "Combine keyword research and AI writing inside one SEO workflow.", "Paid", 4500000],
    ["copysmith", "Copysmith", "https://copysmith.ai/", "Generate commerce copy and product messaging at catalog scale.", "Paid", 7100000],
    ["getgenie", "GetGenie", "https://getgenie.ai/", "Write and optimize SEO content directly inside WordPress workflows.", "Freemium", 5600000],
    ["nichesss", "Nichesss", "https://nichesss.com/", "Generate content ideas, hooks, and short-form marketing assets.", "Freemium", 3600000],
    ["berthaai", "Bertha AI", "https://bertha.ai/", "Draft website and ad copy inside CMS publishing flows.", "Paid", 3200000],
    ["seowriting", "SEO Writing", "https://seowriting.ai/", "Generate SEO-structured articles built for ranking and affiliate output.", "Paid", 8900000],
    ["koalaai", "Koala AI", "https://koala.sh/", "Produce affiliate and organic search articles with simple long-form tools.", "Paid", 9700000],
    ["journalistai", "Journalist AI", "https://journalistai.com/", "Automate article writing and scheduled publishing for content sites.", "Paid", 4100000]
  ], marketingLane, revenueTeams, "A strong add because AI content, SEO, and landing-page tools remain one of the busiest buyer comparison lanes.");

  addTools([
    ["metaai", "Meta AI", "https://www.meta.ai/", "Use Meta's assistant across social, chat, and consumer discovery surfaces.", "Free", 48000000],
    ["replika", "Replika", "https://replika.com/", "Chat with a companion-style assistant built around conversation and habit loops.", "Freemium", 29000000],
    ["kindroid", "Kindroid", "https://kindroid.ai/", "Create custom AI companions with memory and persona controls.", "Freemium", 9500000],
    ["nomi", "Nomi", "https://nomi.ai/", "Keep long-running companion chats with stronger personality continuity.", "Freemium", 6800000],
    ["polybuzz", "PolyBuzz", "https://polybuzz.ai/", "Explore AI characters and consumer roleplay experiences at scale.", "Freemium", 12000000],
    ["talkie", "Talkie", "https://www.talkie-ai.com/", "Use mobile-friendly AI characters for entertainment and casual conversation.", "Freemium", 18500000],
    ["youper", "Youper", "https://www.youper.ai/", "Support mental wellness with a structured conversational assistant.", "Freemium", 8300000],
    ["woebot", "Woebot", "https://woebothealth.com/", "Offer CBT-style guidance and emotional support through chat.", "Paid", 7000000],
    ["chai", "Chai", "https://chai.ml/", "Chat with community-created AI bots in a high-volume consumer app.", "Freemium", 22400000],
    ["dopple", "Dopple", "https://beta.dopple.ai/", "Interact with personality-led AI characters in a creator-style network.", "Freemium", 6400000],
    ["animaai", "Anima AI", "https://myanima.ai/", "Use a relationship-style AI companion with lighter social features.", "Freemium", 5800000],
    ["customgpt", "CustomGPT", "https://customgpt.ai/", "Train a chatbot on company content without building the stack from scratch.", "Paid", 7800000],
    ["docsbot", "DocsBot", "https://docsbot.ai/", "Create support bots from documentation, help centers, and internal files.", "Freemium", 5200000],
    ["sitegpt", "SiteGPT", "https://sitegpt.ai/", "Launch a website chatbot trained directly on public site content.", "Freemium", 3900000],
    ["ingestai", "IngestAI", "https://ingestai.io/", "Turn files and knowledge bases into chat interfaces and AI agents.", "Freemium", 3300000],
    ["magicform", "MagicForm", "https://www.magicform.ai/", "Capture leads and answer FAQs with a lightweight AI site bot.", "Freemium", 4200000],
    ["chatling", "Chatling", "https://chatling.ai/", "Deploy branded support chatbots with a simple training workflow.", "Freemium", 3700000],
    ["botsonic", "Botsonic", "https://botsonic.com/", "Build customer-facing chatbots and agents from existing business content.", "Freemium", 6600000],
    ["gpttrainer", "GPT-trainer", "https://gpt-trainer.com/", "Train website-specific bots without managing retrieval infrastructure yourself.", "Freemium", 3100000],
    ["wonderchat", "Wonderchat", "https://wonderchat.io/", "Turn a site's content into a support chatbot with low setup overhead.", "Freemium", 3400000]
  ], assistantLane, consumers, "A strong add because consumer assistants and easy chatbot builders still drive a huge share of AI discovery traffic.");

  addTools([
    ["brightdata", "Bright Data", "https://brightdata.com/", "Access web data, browsers, and proxies for AI agents and research stacks.", "Usage-based", 25000000],
    ["zenrows", "ZenRows", "https://www.zenrows.com/", "Collect web data behind anti-bot systems with an API-first workflow.", "Usage-based", 9600000],
    ["aomni", "Aomni", "https://aomni.com/", "Generate GTM research briefs and account intelligence with agent workflows.", "Paid", 3600000],
    ["vocode", "Vocode", "https://vocode.dev/", "Build programmable voice agents with telephony and low-latency control.", "Free / Paid", 5400000],
    ["smallestai", "Smallest AI", "https://smallest.ai/", "Use fast voice models and speech infrastructure for agent experiences.", "Usage-based", 4900000],
    ["maestroqa", "MaestroQA", "https://www.maestroqa.com/", "Review support quality and coach teams with AI-assisted scorecards.", "Paid", 4100000],
    ["kindo", "Kindo", "https://kindo.ai/", "Give enterprises a secure workspace for models, prompts, and agent access.", "Paid", 3500000],
    ["unify", "Unify", "https://www.unify.ai/", "Route across model providers and optimize quality, speed, and spend.", "Usage-based", 4300000],
    ["llamacloud", "LlamaCloud", "https://cloud.llamaindex.ai/", "Host parsing, retrieval, and data prep behind the LlamaIndex stack.", "Usage-based", 9200000],
    ["ragie", "Ragie", "https://www.ragie.ai/", "Spin up retrieval pipelines and RAG endpoints with less plumbing.", "Usage-based", 3200000],
    ["supermemory", "Supermemory", "https://supermemory.ai/", "Save and retrieve long-term AI memory across tools and personal workflows.", "Freemium", 3800000],
    ["maxai", "MaxAI", "https://www.maxai.me/", "Use a browser-side copilot for reading, summarizing, and writing on the web.", "Freemium", 14200000],
    ["perigon", "Perigon", "https://www.perigon.io/", "Query structured news and entity data for monitoring and AI workflows.", "Paid", 4600000],
    ["chatfuel", "Chatfuel", "https://chatfuel.com/", "Automate messaging flows and customer interactions with bot-first tooling.", "Freemium", 10800000],
    ["kommunicateai", "Kommunicate AI", "https://www.kommunicate.io/", "Run support chatbots with agent handoff and customer service controls.", "Freemium", 5200000],
    ["dashworks", "Dashworks", "https://www.dashworks.ai/", "Search internal knowledge and answer employee questions across apps.", "Paid", 3900000],
    ["notdiamond", "Not Diamond", "https://notdiamond.ai/", "Evaluate and route to the best model dynamically for each request.", "Usage-based", 4700000],
    ["lamatic", "Lamatic", "https://lamatic.ai/", "Build agent backends and workflow APIs for production AI products.", "Usage-based", 3300000],
    ["trieve", "Trieve", "https://trieve.ai/", "Add search, recommendations, and RAG-friendly retrieval to applications.", "Usage-based", 3100000],
    ["replicant", "Replicant", "https://www.replicant.com/", "Automate contact-center conversations with voice AI agents.", "Paid", 4400000]
  ], buildLane, builders, "A strong add because agent infrastructure, web data, and orchestration tools are moving into the mainstream fast.");

  addTools([
    ["aiapply", "AIApply", "https://aiapply.co/", "Automate resumes, outreach, and job applications from one workflow.", "Paid", 5800000],
    ["finalroundai", "Final Round AI", "https://www.finalroundai.com/", "Practice interviews and get coaching across common hiring formats.", "Paid", 11200000],
    ["tealhqai", "Teal HQ AI", "https://www.tealhq.com/", "Manage job search tasks with AI help for resumes and targeting.", "Freemium", 18600000],
    ["simplifycopilot", "Simplify Copilot", "https://simplify.jobs/copilot", "Speed up applications and autofill repetitive job search work.", "Free", 17400000],
    ["kickresumeai", "Kickresume AI", "https://www.kickresume.com/en/ai-resume-writer/", "Draft resumes and cover letters with AI-guided templates.", "Freemium", 9400000],
    ["resumeworded", "Resume Worded", "https://resumeworded.com/", "Improve resumes and LinkedIn profiles with role-aware feedback.", "Freemium", 12800000],
    ["rezi", "Rezi", "https://www.rezi.ai/", "Build ATS-friendly resumes with structured AI writing help.", "Freemium", 8800000],
    ["jobscan", "Jobscan", "https://www.jobscan.co/", "Match resumes to job descriptions and tighten keyword coverage.", "Paid", 16600000],
    ["interviewwarmup", "Interview Warmup", "https://grow.google/certificates/interview-warmup/", "Practice common interview questions with structured AI feedback.", "Free", 20400000],
    ["interviewingio", "interviewing.io", "https://interviewing.io/", "Prepare for technical interviews with mock sessions and coaching.", "Paid", 7300000],
    ["pramp", "Pramp", "https://www.pramp.com/", "Run peer mock interviews and prep sessions with guided structure.", "Free / Paid", 6200000],
    ["huntrai", "Huntr AI", "https://huntr.co/", "Track applications and generate job-search materials from one dashboard.", "Freemium", 5100000],
    ["careerflowai", "Careerflow AI", "https://www.careerflow.ai/", "Improve resumes, LinkedIn pages, and search strategy with AI support.", "Freemium", 3900000],
    ["hiration", "Hiration", "https://www.hiration.com/", "Use AI resume tools and templates for job search workflows.", "Freemium", 4100000],
    ["lazyapply", "LazyApply", "https://lazyapply.com/", "Automate repetitive job applications across multiple platforms.", "Paid", 4700000],
    ["loopcv", "LoopCV", "https://www.loopcv.pro/", "Automate job discovery and outreach from one assistant workflow.", "Paid", 3600000],
    ["sonaraai", "Sonara AI", "https://www.sonara.ai/", "Run an AI job search agent to surface and apply for matching roles.", "Paid", 5300000],
    ["applypass", "ApplyPass", "https://www.applypass.com/", "Generate tailored applications at scale with less manual editing.", "Paid", 3000000],
    ["interviewcoder", "Interview Coder", "https://interviewcoder.co/", "Practice coding interviews with AI-generated prompts and review.", "Paid", 3400000],
    ["jobrightai", "Jobright AI", "https://jobright.ai/", "Find role matches and manage applications with AI-based guidance.", "Freemium", 4300000]
  ], writingLane, jobSeekers, "A strong add because AI job-search and interview tools have become a large, highly commercial traffic segment.");
})();
