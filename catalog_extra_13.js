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
  const operators = ["Operators", "Product teams", "Founders"];
  const talentTeams = ["Recruiters", "Operators", "Revenue teams"];
  const students = ["Students", "Researchers", "Knowledge workers"];

  const buildLane = ["Coding", "Automation", "Research"];
  const productLane = ["Productivity", "Design", "Writing"];
  const salesLane = ["Sales", "Productivity", "Automation"];
  const studyLane = ["Research", "Productivity", "Writing"];

  const vendorOverrides = {
    "Salesforce Einstein": "Salesforce",
    "Slack AI": "Slack",
    "Dropbox Dash": "Dropbox",
    "Box AI": "Box",
    "Atlassian Rovo": "Atlassian",
    "Microsoft Designer": "Microsoft",
    "Copilot Studio": "Microsoft",
    "Mailbutler AI": "Mailbutler",
    "Readwise Ghostreader": "Readwise",
    "Craft AI": "Craft",
    "Question.AI": "Question.AI",
    "Course Hero AI": "Course Hero",
    "HubSpot Campaign Assistant": "HubSpot",
    "Zoho Zia": "Zoho",
    "LanguageTool": "LanguageTool"
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
    ["ollama", "Ollama", "https://ollama.com/", "Run open models locally with a clean desktop and developer workflow.", "Free", 52000000],
    ["pydanticai", "PydanticAI", "https://ai.pydantic.dev/", "Build typed Python agents and workflows with strong developer ergonomics.", "Free / Paid", 6800000],
    ["gradio", "Gradio", "https://www.gradio.app/", "Ship browser-based AI demos and internal tools without heavy frontend work.", "Free / Paid", 24000000],
    ["lamini", "Lamini", "https://www.lamini.ai/", "Fine-tune and serve enterprise models with data-driven adaptation tools.", "Paid", 4100000],
    ["mindsdb", "MindsDB", "https://mindsdb.com/", "Connect databases to AI queries and model-powered business workflows.", "Free / Paid", 4800000],
    ["datarobot", "DataRobot", "https://www.datarobot.com/", "Manage enterprise models, predictions, and generative AI projects in one stack.", "Paid", 9600000],
    ["h2oai", "H2O.ai", "https://h2o.ai/", "Deploy predictive and generative AI products across data-heavy teams.", "Paid", 8200000],
    ["sambanova", "SambaNova", "https://sambanova.ai/", "Access enterprise inference and foundation-model serving from one platform.", "Usage-based", 7800000],
    ["deepinfra", "DeepInfra", "https://deepinfra.com/", "Call open models through a low-friction API built for production traffic.", "Usage-based", 11000000],
    ["openpipe", "OpenPipe", "https://openpipe.ai/", "Capture prompts and fine-tune custom models from live application data.", "Usage-based", 3600000],
    ["jinaai", "Jina AI", "https://jina.ai/", "Power search, retrieval, and multimodal AI pipelines with developer APIs.", "Free / Paid", 7200000],
    ["superagent", "Superagent", "https://superagent.sh/", "Build agentic assistants with tools, memory, and deployment shortcuts.", "Free / Paid", 3300000],
    ["localai", "LocalAI", "https://localai.io/", "Run OpenAI-compatible local inference with privacy-first deployment options.", "Free", 4900000],
    ["openinterpreter", "Open Interpreter", "https://openinterpreter.com/", "Use a tool-calling local assistant that can act on your computer.", "Free / Paid", 9500000],
    ["dstack", "dstack", "https://dstack.ai/", "Orchestrate GPUs, jobs, and model workloads across clouds and clusters.", "Free / Paid", 3000000],
    ["langdock", "Langdock", "https://www.langdock.com/", "Give teams a secure AI workspace with model access and policy controls.", "Paid", 4300000],
    ["athina", "Athina", "https://www.athina.ai/", "Test prompts, monitor outputs, and track regressions in LLM apps.", "Freemium", 3700000],
    ["traceloop", "Traceloop", "https://www.traceloop.com/", "Trace prompt chains, latency, and quality across production AI flows.", "Freemium", 3100000],
    ["giskard", "Giskard", "https://giskard.ai/", "Evaluate model quality, safety, and failure modes before release.", "Free / Paid", 4200000],
    ["fiddlerai", "Fiddler AI", "https://www.fiddler.ai/", "Monitor model behavior, drift, and explainability in live environments.", "Paid", 3900000]
  ], buildLane, builders, "A strong add because builder-facing AI infrastructure is still one of the highest-interest buying lanes.");

  addTools([
    ["scaleai", "Scale AI", "https://scale.com/", "Source training data, evaluation services, and model operations for enterprise AI.", "Paid", 21000000],
    ["labelstudio", "Label Studio", "https://labelstud.io/", "Annotate multimodal datasets with a flexible open-source labeling workflow.", "Free / Paid", 7600000],
    ["roboflow", "Roboflow", "https://roboflow.com/", "Build computer vision pipelines from dataset prep through deployment.", "Free / Paid", 18000000],
    ["clarifai", "Clarifai", "https://www.clarifai.com/", "Run vision and multimodal AI workloads with enterprise deployment controls.", "Paid", 8400000],
    ["snorkel", "Snorkel", "https://snorkel.ai/", "Create high-value training data with programmatic labeling and weak supervision.", "Paid", 5600000],
    ["landingai", "Landing AI", "https://landing.ai/", "Use visual inspection and document AI for operational workflows.", "Paid", 6100000],
    ["patronusai", "Patronus AI", "https://www.patronus.ai/", "Measure hallucinations, safety, and reliability in generative AI apps.", "Paid", 4300000],
    ["lakera", "Lakera", "https://www.lakera.ai/", "Protect AI systems against prompt injection and model abuse vectors.", "Paid", 3600000],
    ["protectai", "Protect AI", "https://protectai.com/", "Secure AI supply chains, models, and enterprise deployment surfaces.", "Paid", 3400000],
    ["hiddenlayer", "HiddenLayer", "https://hiddenlayer.com/", "Detect threats and defend machine-learning systems in production.", "Paid", 3200000],
    ["langwatch", "LangWatch", "https://langwatch.ai/", "Watch prompt quality, traces, and user outcomes across AI releases.", "Freemium", 3000000],
    ["agenta", "Agenta", "https://agenta.ai/", "Manage prompts, experiments, and evaluation loops for LLM products.", "Freemium", 3300000],
    ["promptsecurity", "Prompt Security", "https://www.prompt.security/", "Apply policy, filtering, and monitoring to enterprise prompt traffic.", "Paid", 3100000],
    ["orqai", "ORQ", "https://orq.ai/", "Coordinate models, prompts, and release workflows from one AI operations layer.", "Paid", 2900000],
    ["copyleaks", "Copyleaks", "https://copyleaks.com/", "Detect AI-written text and plagiarism across academic and publishing use cases.", "Freemium", 22000000],
    ["winstonai", "Winston AI", "https://gowinston.ai/", "Check documents for AI text, originality, and content risk signals.", "Freemium", 9400000],
    ["turnitinai", "Turnitin AI", "https://www.turnitin.com/solutions/topics/ai-writing", "Review AI-assisted writing inside established academic integrity workflows.", "Paid", 15000000],
    ["diffbot", "Diffbot", "https://www.diffbot.com/", "Transform webpages into structured data and knowledge graph entities.", "Paid", 6900000],
    ["apify", "Apify", "https://apify.com/", "Automate scraping, crawling, and web data pipelines with AI-friendly outputs.", "Free / Paid", 17000000],
    ["serpapi", "SerpApi", "https://serpapi.com/", "Pull structured search engine results for agents, SEO, and research flows.", "Usage-based", 12600000]
  ], buildLane, builders, "A strong add because evaluation, data, and AI security tools keep gaining weight in real buying decisions.");

  addTools([
    ["salesforceeinstein", "Salesforce Einstein", "https://www.salesforce.com/artificial-intelligence/", "Bring forecasting, drafting, and automation into the Salesforce operating layer.", "Paid", 28000000],
    ["agentforce", "Agentforce", "https://www.salesforce.com/products/einstein/agentforce/", "Launch enterprise agents across service, sales, and internal workflows.", "Paid", 21000000],
    ["slackai", "Slack AI", "https://slack.com/ai", "Summarize threads and search company knowledge where teams already communicate.", "Paid", 31000000],
    ["dropboxdash", "Dropbox Dash", "https://www.dropbox.com/dash", "Search across files, tabs, and apps with an AI-first retrieval experience.", "Paid", 14000000],
    ["boxai", "Box AI", "https://www.box.com/ai", "Ask questions over content and automate enterprise document workflows.", "Paid", 11000000],
    ["atlassianrovo", "Atlassian Rovo", "https://www.atlassian.com/software/rovo", "Connect search, chat, and workflow automation across Atlassian products.", "Paid", 18000000],
    ["microsoftdesigner", "Microsoft Designer", "https://designer.microsoft.com/", "Generate social assets, layouts, and marketing visuals from simple prompts.", "Freemium", 34000000],
    ["copilotstudio", "Copilot Studio", "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio", "Build custom copilots and process agents on top of Microsoft workflows.", "Paid", 22000000],
    ["shortwave", "Shortwave", "https://www.shortwave.com/", "Triage inboxes faster with AI search, summaries, and drafting.", "Freemium", 7100000],
    ["sparkmail", "Spark Mail", "https://sparkmailapp.com/", "Add AI writing and inbox help to a polished email workflow.", "Freemium", 9600000],
    ["mailbutlerai", "Mailbutler AI", "https://www.mailbutler.io/", "Use AI assistance for compose, follow-up, and inbox productivity tasks.", "Freemium", 3400000],
    ["wordviceai", "Wordvice AI", "https://wordvice.ai/", "Polish academic and business writing with rewrite and editing tools.", "Freemium", 5200000],
    ["languagetool", "LanguageTool", "https://languagetool.org/", "Improve grammar, clarity, and multilingual writing across the web.", "Freemium", 41000000],
    ["popai", "PopAi", "https://www.popai.pro/", "Create slides, summaries, and document answers inside one workspace.", "Freemium", 8500000],
    ["docugami", "Docugami", "https://www.docugami.com/", "Extract structured data and workflows from dense business documents.", "Paid", 4200000],
    ["readwiseghostreader", "Readwise Ghostreader", "https://readwise.io/ghostreader", "Summarize, rewrite, and answer from text inside reading-heavy tools.", "Paid", 7200000],
    ["craftdocsai", "Craft AI", "https://www.craft.do/ai", "Draft notes and polished documents inside the Craft writing environment.", "Paid", 6300000],
    ["liner", "LINER", "https://getliner.com/", "Search, summarize, and highlight the web with an AI-first browser helper.", "Freemium", 26000000],
    ["plusai", "Plus AI", "https://www.plusdocs.com/", "Generate decks directly in Google Slides and PowerPoint from prompts.", "Paid", 5700000],
    ["slidesai", "SlidesAI", "https://www.slidesai.io/", "Turn rough text into presentation outlines and finished slides quickly.", "Freemium", 9800000]
  ], productLane, operators, "A strong add because team productivity suites with embedded AI are now a core evaluation category.");

  addTools([
    ["sendsteps", "Sendsteps", "https://www.sendsteps.com/en/ai", "Create presentation drafts and audience interactions with AI help.", "Freemium", 3900000],
    ["preziai", "Prezi AI", "https://prezi.com/ai/", "Generate zoomable presentations and narratives from minimal inputs.", "Freemium", 8900000],
    ["smithai", "Smith AI", "https://smith.ai/", "Handle lead intake, receptionist coverage, and front-desk conversations with AI.", "Paid", 5400000],
    ["dialpadai", "Dialpad AI", "https://www.dialpad.com/ai/", "Transcribe calls, coach reps, and summarize customer conversations.", "Paid", 12000000],
    ["aircallai", "Aircall AI", "https://aircall.io/product/ai/", "Capture call intelligence and automate follow-up for revenue teams.", "Paid", 6800000],
    ["eightfoldai", "Eightfold AI", "https://eightfold.ai/", "Match talent, skills, and career mobility inside recruiting systems.", "Paid", 9100000],
    ["hireez", "hireEZ", "https://hireez.com/", "Source candidates and automate recruiting outreach with AI assistance.", "Paid", 7800000],
    ["paradox", "Paradox", "https://www.paradox.ai/", "Run conversational recruiting and interview scheduling at scale.", "Paid", 8500000],
    ["seekout", "SeekOut", "https://www.seekout.com/", "Find candidates and talent signals across large professional datasets.", "Paid", 6500000],
    ["metaview", "Metaview", "https://www.metaview.ai/", "Take interview notes automatically and keep recruiters focused on the conversation.", "Paid", 5800000],
    ["screenloop", "Screenloop", "https://screenloop.com/", "Centralize interview intelligence, scorecards, and hiring analytics.", "Paid", 4300000],
    ["hirevue", "HireVue", "https://www.hirevue.com/", "Screen, assess, and move candidates through structured AI-assisted hiring.", "Paid", 9800000],
    ["beamery", "Beamery", "https://beamery.com/", "Run talent CRM and workforce planning from one intelligence layer.", "Paid", 5200000],
    ["humanly", "Humanly", "https://humanly.io/", "Automate recruiting chats, screening, and candidate scheduling tasks.", "Paid", 3600000],
    ["sapia", "Sapia", "https://sapia.ai/", "Use chat-based assessment to streamline early hiring decisions.", "Paid", 3200000],
    ["goodtime", "GoodTime", "https://goodtime.io/", "Coordinate interviews and recruiting operations with less manual work.", "Paid", 4100000],
    ["ashbyai", "Ashby AI", "https://www.ashbyhq.com/ai", "Add AI assistance to recruiting ops, notes, and candidate workflows.", "Paid", 7400000],
    ["creatio", "Creatio", "https://www.creatio.com/", "Run CRM and workflow automation with a stronger AI-native operating model.", "Paid", 6300000],
    ["zohozia", "Zoho Zia", "https://www.zoho.com/zia/", "Bring AI drafting, forecasting, and assistant tasks into Zoho apps.", "Paid", 19000000],
    ["balto", "Balto", "https://www.balto.ai/", "Give reps real-time guidance during live calls and service interactions.", "Paid", 3500000]
  ], salesLane, talentTeams, "A strong add because recruiting, sales, and call intelligence buyers are consolidating around AI-first workflows.");

  addTools([
    ["mindgrasp", "Mindgrasp", "https://mindgrasp.ai/", "Study from lectures, PDFs, and recordings with instant summaries and notes.", "Freemium", 10400000],
    ["quizgecko", "Quizgecko", "https://quizgecko.com/", "Turn notes and content into quizzes, flashcards, and tests.", "Freemium", 4900000],
    ["afforai", "Afforai", "https://afforai.com/", "Ask questions across papers and research files inside one reading workspace.", "Freemium", 4200000],
    ["petal", "Petal", "https://www.petal.org/", "Build a study and research hub around notes, references, and AI answers.", "Freemium", 6300000],
    ["typeset", "Typeset", "https://typeset.io/", "Write, format, and polish research papers with publishing-friendly workflows.", "Freemium", 12200000],
    ["irisai", "Iris.ai", "https://iris.ai/", "Discover scientific literature and map related research directions faster.", "Paid", 3400000],
    ["inciteful", "Inciteful", "https://inciteful.xyz/", "Explore citation graphs and adjacent papers from a single starting source.", "Free", 3200000],
    ["caktus", "Caktus", "https://www.caktus.ai/", "Use an AI study partner for essays, coding, and academic workflows.", "Freemium", 6700000],
    ["quizard", "Quizard", "https://www.quizard.app/", "Get homework explanations and quiz-style practice from your study material.", "Freemium", 4500000],
    ["bytelearn", "Bytelearn", "https://www.bytelearn.com/", "Coach students through math steps instead of only giving final answers.", "Freemium", 3900000],
    ["courseheroai", "Course Hero AI", "https://www.coursehero.com/ai-homework-help", "Answer homework questions and explain concepts from uploaded materials.", "Freemium", 27000000],
    ["edcafe", "Edcafe AI", "https://www.edcafe.ai/", "Generate classroom activities, lessons, and study resources quickly.", "Freemium", 3300000],
    ["eduaide", "Eduaide", "https://www.eduaide.ai/", "Support teachers with lesson planning, rubrics, and classroom content.", "Freemium", 3100000],
    ["mindsmith", "Mindsmith", "https://www.mindsmith.ai/", "Author learning modules and training content with AI assistance.", "Paid", 3600000],
    ["schoolai", "SchoolAI", "https://schoolai.com/", "Give schools safe AI spaces for tutoring and classroom exploration.", "Freemium", 7800000],
    ["questionai", "Question.AI", "https://questionai.com/", "Solve homework questions with guided explanations and step-by-step help.", "Freemium", 24800000],
    ["studyx", "StudyX", "https://studyx.ai/", "Handle assignments, tutoring, and research support from one AI study app.", "Freemium", 18400000],
    ["studyable", "Studyable", "https://studyable.app/", "Generate flashcards, notes, and test prep from your source material.", "Freemium", 5200000],
    ["gauth", "Gauth", "https://www.gauthmath.com/", "Work through math and homework problems with detailed reasoning help.", "Freemium", 38000000],
    ["khanmigo", "Khanmigo", "https://www.khanacademy.org/khan-labs", "Use guided tutoring and teacher support inside Khan Academy's AI layer.", "Paid", 13000000]
  ], studyLane, students, "A strong add because AI tutors and research copilots are one of the clearest high-traffic consumer categories.");
})();
