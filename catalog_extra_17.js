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
  const students = ["Students", "Researchers", "Knowledge workers"];
  const creators = ["Creators", "Marketers", "Studios"];
  const buildLane = ["Coding", "Automation", "Research"];
  const studyLane = ["Research", "Productivity", "Writing"];
  const growthLane = ["Video", "Writing", "Productivity"];
  const vendorOverrides = {
    "Bito AI": "Bito",
    "CodeAnt AI": "CodeAnt",
    "QuestionAid": "QuestionAid",
    "Answer AI": "Answer.AI",
    "MathGPTPro": "MathGPTPro"
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
    ["dagshub", "DagsHub", "https://dagshub.com/", "Collaborate on data, experiments, and model workflows like a Git-native ML hub.", "Freemium", 4200000],
    ["predibase", "Predibase", "https://predibase.com/", "Fine-tune and serve custom models with stronger enterprise controls.", "Usage-based", 5200000],
    ["octoai", "OctoAI", "https://octo.ai/", "Deploy and scale AI inference with managed performance tooling.", "Usage-based", 6100000],
    ["haystack", "Haystack", "https://haystack.deepset.ai/", "Build search, RAG, and agent systems with a mature open-source stack.", "Free / Paid", 8300000],
    ["guardrailsai", "Guardrails AI", "https://www.guardrailsai.com/", "Validate, structure, and secure LLM outputs with less custom glue code.", "Freemium", 3900000],
    ["litellm", "LiteLLM", "https://www.litellm.ai/", "Route across model providers through one lightweight API layer.", "Free / Paid", 6800000],
    ["autogen", "AutoGen", "https://www.microsoft.com/en-us/research/project/autogen/", "Build multi-agent workflows and orchestration patterns from Microsoft's framework.", "Free", 7300000],
    ["phidata", "Phidata", "https://www.phidata.com/", "Create agentic apps in Python with simple tools and memory primitives.", "Free / Paid", 3400000],
    ["deepset", "deepset", "https://deepset.ai/", "Ship production search and RAG systems with a retrieval-first platform.", "Paid", 4600000],
    ["mlflow", "MLflow", "https://mlflow.org/", "Track experiments and model assets across AI development workflows.", "Free / Paid", 18100000],
    ["voyageai", "Voyage AI", "https://www.voyageai.com/", "Use embedding and reranking APIs for retrieval-heavy AI products.", "Usage-based", 7600000],
    ["retoolai", "Retool AI", "https://retool.com/ai", "Inject AI actions and agents into internal tools and ops workflows.", "Paid", 9500000],
    ["bitoai", "Bito AI", "https://bito.ai/", "Use an AI coding assistant focused on everyday developer throughput.", "Freemium", 6700000],
    ["askcodi", "AskCodi", "https://www.askcodi.com/", "Generate, explain, and refactor code inside developer workflows.", "Freemium", 4300000],
    ["codiga", "Codiga", "https://www.codiga.io/", "Review code quality and security issues with automated checks.", "Freemium", 3200000],
    ["sweepai", "Sweep", "https://www.sweep.dev/", "Turn GitHub issues into AI-authored code changes and pull requests.", "Paid", 5200000],
    ["mutableai", "MutableAI", "https://mutable.ai/", "Speed up coding and code understanding inside engineering teams.", "Freemium", 3900000],
    ["piecescopilot", "Pieces Copilot", "https://pieces.app/", "Keep local code context and snippets connected to an AI copilot.", "Freemium", 4700000],
    ["refactai", "Refact", "https://refact.ai/", "Run a coding assistant with self-hosted and privacy-aware options.", "Free / Paid", 3000000],
    ["codacyai", "Codacy", "https://www.codacy.com/", "Monitor code quality and developer standards with AI-assisted insights.", "Paid", 4400000],
    ["snykcode", "Snyk Code", "https://snyk.io/product/snyk-code/", "Find code risks and security issues with AI-enhanced scanning.", "Paid", 11800000],
    ["codeantai", "CodeAnt AI", "https://www.codeant.ai/", "Review pull requests and engineering changes with AI feedback.", "Paid", 3300000],
    ["greptile", "Greptile", "https://www.greptile.com/", "Ask questions across large codebases and code reviews with AI help.", "Paid", 4800000],
    ["qwietai", "Qwiet AI", "https://qwiet.ai/", "Detect application security issues through AI-guided AppSec workflows.", "Paid", 3100000],
    ["semgrepai", "Semgrep", "https://semgrep.dev/", "Run code, dependency, and secrets analysis with growing AI support.", "Free / Paid", 10300000],
    ["socketai", "Socket", "https://socket.dev/", "Protect codebases from supply-chain risk with AI-assisted signals.", "Paid", 4900000],
    ["endorlabs", "Endor Labs", "https://www.endorlabs.com/", "Map software risk and dependency exposure across AI-era stacks.", "Paid", 3700000],
    ["baserun", "Baserun", "https://www.baserun.ai/", "Inspect prompts, traces, and evaluations from a focused observability layer.", "Freemium", 3400000],
    ["traceableai", "Traceable", "https://www.traceable.ai/", "Secure APIs and modern application traffic with AI-assisted coverage.", "Paid", 3200000],
    ["pareaai", "Parea AI", "https://parea.ai/", "Test, evaluate, and compare prompts across live AI releases.", "Freemium", 3100000]
  ], buildLane, builders, "A strong add because developer tooling, security, and evaluation still shape a huge share of AI buying decisions.");

  addTools([
    ["diffit", "Diffit", "https://diffit.me/", "Adapt learning content and reading levels faster for teachers and students.", "Freemium", 5600000],
    ["briskteaching", "Brisk Teaching", "https://www.briskteaching.com/", "Speed up lesson planning and feedback directly in classroom workflows.", "Freemium", 7800000],
    ["curipod", "Curipod", "https://curipod.com/", "Generate classroom slides, prompts, and student activities with AI.", "Freemium", 4700000],
    ["questionwell", "QuestionWell", "https://questionwell.org/", "Turn source material into questions, quizzes, and lesson assets.", "Freemium", 3200000],
    ["teachmateai", "TeachMateAI", "https://teachmateai.com/", "Create class resources and save teachers repetitive prep time.", "Freemium", 3000000],
    ["learntai", "Learnt.ai", "https://learnt.ai/", "Build course assets and educational materials with lighter manual effort.", "Freemium", 3100000],
    ["classpointai", "ClassPoint AI", "https://www.classpoint.io/ai", "Generate quizzes and slide interactions straight from presentations.", "Freemium", 4200000],
    ["openread", "OpenRead", "https://www.openread.academy/", "Read papers, summarize findings, and organize research faster.", "Freemium", 3900000],
    ["genei", "Genei", "https://www.genei.io/", "Summarize articles and research notes into quicker study outputs.", "Freemium", 3700000],
    ["paperpile", "Paperpile", "https://paperpile.com/", "Manage references and academic workflows with cleaner AI assistance.", "Freemium", 8400000]
  ], studyLane, students, "A strong add because education and research copilots still bring in broad user demand.");

  addTools([
    ["researchpal", "ResearchPal", "https://www.researchpal.co/", "Keep papers, notes, and research workflows moving in one assistant.", "Freemium", 3000000],
    ["sourcely", "Sourcely", "https://www.sourcely.net/", "Find academic sources faster from rough questions and draft topics.", "Freemium", 3400000],
    ["questionaid", "QuestionAid", "https://questionaid.in/", "Generate assessments and question banks for classroom use.", "Freemium", 2900000],
    ["flintai", "Flint", "https://www.flintk12.com/", "Create safe tutoring and classroom AI experiences for schools.", "Paid", 3300000],
    ["courseboxai", "Coursebox AI", "https://www.coursebox.ai/", "Build online courses and learning modules with AI help.", "Freemium", 4100000],
    ["quizizz", "Quizizz AI", "https://quizizz.com/ai", "Generate quizzes and classroom games from source material.", "Freemium", 12100000],
    ["kahoot", "Kahoot! AI", "https://kahoot.com/ai-tools/", "Draft learning games and study prompts with AI support.", "Freemium", 16500000],
    ["sizzleai", "Sizzle", "https://sizzle.ai/", "Work through homework with step-by-step AI explanations.", "Freemium", 6300000],
    ["jungleai", "Jungle AI", "https://www.jungleai.com/", "Turn notes into flashcards and adaptive study practice.", "Freemium", 3700000],
    ["turbolearnai", "TurboLearn AI", "https://www.turbolearn.ai/", "Convert lectures and notes into study guides with AI.", "Freemium", 5400000],
    ["coursable", "Coursable", "https://coursable.io/", "Organize courses and study planning around AI guidance.", "Freemium", 3000000],
    ["studypotion", "Study Potion", "https://www.studypotion.ai/", "Generate flashcards and summaries from class material quickly.", "Freemium", 3200000],
    ["answerai", "Answer AI", "https://answerai.pro/", "Get tutoring-style explanations across many homework subjects.", "Freemium", 4700000],
    ["nerdai", "Nerd AI", "https://www.nerdai.app/", "Solve homework and explain answers with a student-friendly assistant.", "Freemium", 3900000],
    ["mathful", "Mathful", "https://mathful.com/", "Work through math problems with guided AI reasoning.", "Freemium", 8800000],
    ["photomath", "Photomath", "https://photomath.com/", "Solve and explain math problems from camera-based inputs.", "Freemium", 42000000],
    ["symbolab", "Symbolab", "https://www.symbolab.com/", "Use step-by-step problem solving for algebra, calculus, and beyond.", "Freemium", 25800000],
    ["solvely", "Solvely", "https://solvely.ai/", "Get AI-supported homework answers with more detailed explanations.", "Freemium", 4900000],
    ["mathgptpro", "MathGPTPro", "https://mathgptpro.com/", "Use a math-focused AI tutor for problem solving and test prep.", "Freemium", 3400000],
    ["studymonk", "StudyMonkey", "https://studymonkey.ai/", "Build quizzes and study materials from your own sources.", "Freemium", 3000000]
  ], studyLane, students, "A strong add because AI homework, tutoring, and research tools continue to attract high-volume traffic.");

  addTools([
    ["vidiq", "vidIQ", "https://vidiq.com/", "Use AI topic and title support to grow YouTube channels faster.", "Freemium", 36100000],
    ["tubebuddy", "TubeBuddy", "https://www.tubebuddy.com/", "Optimize YouTube publishing with AI suggestions and workflow help.", "Freemium", 29400000],
    ["repurposeio", "Repurpose.io", "https://repurpose.io/", "Turn one piece of content into many distribution-ready formats.", "Paid", 4500000],
    ["chopcast", "Chopcast", "https://www.chopcast.io/", "Clip webinars and podcasts into shorter social-ready assets.", "Paid", 3100000],
    ["minvo", "Minvo", "https://minvo.pro/", "Generate shorts and captions from long videos with AI editing help.", "Freemium", 3800000],
    ["twoshortai", "2short.ai", "https://2short.ai/", "Create YouTube Shorts from long-form content with less manual editing.", "Freemium", 6900000],
    ["flowjin", "Flowjin", "https://flowjin.com/", "Repurpose podcasts and videos into short clips and written outputs.", "Freemium", 3200000],
    ["happyrobot", "HappyRobot", "https://www.happyrobot.ai/", "Deploy AI voice agents for customer operations and phone workflows.", "Paid", 3400000],
    ["dashaai", "Dasha", "https://dasha.ai/", "Build realistic voice agents and conversational call flows.", "Usage-based", 5200000],
    ["airai", "Air AI", "https://www.air.ai/", "Run autonomous phone agents for outbound and inbound voice workflows.", "Paid", 6300000]
  ], growthLane, creators, "A strong add because creator growth and voice-agent tooling keep pulling strong mainstream interest.");
})();
