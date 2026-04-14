(function () {
  const catalog = window.AI_CATALOG;
  if (!catalog || !Array.isArray(catalog.tools)) {
    return;
  }

  const toolProfiles = {
    chatgpt: {
      why: [
        "Covers the broadest range of everyday AI jobs, from drafting to research to coding help.",
        "The best all-round starting point when a user wants one tool before building a larger stack.",
        "Strong ecosystem gravity makes it easier to connect with other workflows over time."
      ],
      strengths: [
        "Best overall breadth across writing, analysis, brainstorming, coding, and agent-like execution.",
        "Easy to recommend to mixed teams because the interface and use cases are already familiar.",
        "Strong default choice when a buyer wants one AI product before specializing."
      ],
      watchouts: [
        "Less specialized than best-in-class products for source-backed research, translation, or image generation.",
        "Can feel too broad if the actual buying goal is a single narrow use case."
      ],
      useWhen: [
        "You want one general-purpose AI workspace for many tasks.",
        "Your work mixes writing, thinking, planning, and light technical execution.",
        "You want a safe default recommendation for teams or executives."
      ],
      avoidWhen: [
        "You mainly need citation-first research and source traceability.",
        "You are choosing a specialized image, voice, or localization tool."
      ],
      pricingAdvice: "Choose this first when you want the fewest buying regrets. If the team only approves one AI tool, ChatGPT is the lowest-risk default.",
      decisionMatrix: [
        ["Breadth", "Excellent"],
        ["Research trust", "Good"],
        ["Writing quality", "Very strong"],
        ["Team fit", "Excellent"]
      ]
    },
    claude: {
      why: [
        "Known for calmer writing output and strong performance on document-heavy reasoning.",
        "Often easier to trust for long-form edits, memos, and nuanced drafting.",
        "A strong second tool after a general assistant if writing quality matters."
      ],
      strengths: [
        "Excellent fit for long-context work, strategy memos, and dense document analysis.",
        "Often produces more measured business writing than broader assistants.",
        "Useful for teams that care about output quality more than feature sprawl."
      ],
      watchouts: [
        "Not the best first purchase if the buyer expects one tool to cover every AI category.",
        "Less relevant if the team mostly needs visual, voice, or multimodal creative output."
      ],
      useWhen: [
        "You handle strategy docs, client writing, or long-context review work.",
        "You want a quieter writing environment with fewer unnecessary flourishes."
      ],
      avoidWhen: [
        "You mainly want one general AI ecosystem for everything.",
        "Your main use case is image generation or multimodal creative production."
      ],
      pricingAdvice: "Worth adding when the team already knows writing quality and document reasoning matter enough to justify a more focused assistant.",
      decisionMatrix: [
        ["Breadth", "Strong"],
        ["Research trust", "Good"],
        ["Writing quality", "Excellent"],
        ["Team fit", "Strong"]
      ]
    },
    perplexity: {
      why: [
        "Best fit when the main job is research rather than generic chatting.",
        "Useful for source-backed answers, fast competitor scans, and first-pass synthesis.",
        "A strong companion tool even when another assistant remains your daily workspace."
      ],
      strengths: [
        "Best-in-class choice when sourcing and link-backed exploration matter.",
        "Excellent for comparing vendors, markets, products, and current developments.",
        "Makes a strong second purchase after a general assistant."
      ],
      watchouts: [
        "Less useful as the only AI tool if the team also needs serious writing, docs, or workflow embedding.",
        "Not the product to buy first for design, video, or productivity system work."
      ],
      useWhen: [
        "You need citations and source validation.",
        "You compare vendors, markets, products, or trends regularly."
      ],
      avoidWhen: [
        "You mostly need collaborative docs, project planning, or writing polish.",
        "You want one tool to cover image, voice, and broader workflow needs."
      ],
      pricingAdvice: "Buy this when research quality is a recurring business need, not when the real goal is general AI experimentation.",
      decisionMatrix: [
        ["Breadth", "Focused"],
        ["Research trust", "Excellent"],
        ["Writing quality", "Strong"],
        ["Team fit", "Strong for analyst teams"]
      ]
    },
    pictory: {
      why: [
        "Strong fit when the real job is repurposing existing content into video instead of editing from scratch.",
        "Especially useful for teams turning blogs, webinars, scripts, or long clips into shorter social and marketing assets.",
        "A more operations-friendly pick than heavier creative suites when speed matters more than frame-level control."
      ],
      strengths: [
        "Good for script-to-video and article-to-video workflows where the source material already exists.",
        "Useful for content teams that need more output volume without a full editing bench.",
        "Sits at a practical intersection of video, writing, and productivity work."
      ],
      watchouts: [
        "Less compelling if your team wants cinematic control or advanced motion generation from first principles.",
        "Can feel limiting for editors who expect a full creative timeline or detailed post-production workflow."
      ],
      useWhen: [
        "You already have source content and want to repurpose it into faster video output.",
        "Your team needs marketing clips, explainers, or social assets without a heavy edit cycle."
      ],
      avoidWhen: [
        "You need deeper visual generation, avatar workflows, or more advanced editing control.",
        "Your workflow starts with blank-canvas filmmaking rather than structured content repurposing."
      ],
      pricingAdvice: "Best justified when video repurposing is recurring work and the bottleneck is production speed, not creative ideation.",
      decisionMatrix: [
        ["Breadth", "Focused"],
        ["Repurposing speed", "Strong"],
        ["Editing depth", "Moderate"],
        ["Team fit", "Strong for content teams"]
      ]
    },
    deepl: {
      why: [
        "One of the clearest specialist buys for companies that operate across languages.",
        "Widely trusted for document translation and business-grade English quality.",
        "Especially relevant for Europe-facing teams and cross-border operations."
      ],
      strengths: [
        "High trust for translation quality and tone preservation.",
        "Useful across support, marketing, legal, and localization workflows."
      ],
      watchouts: [
        "Not a substitute for a general assistant or research tool.",
        "Most valuable only if multilingual communication is a recurring need."
      ],
      useWhen: [
        "You translate customer-facing or business-critical documents.",
        "Your team regularly serves more than one language market."
      ],
      avoidWhen: [
        "You do not operate across languages often enough to justify a dedicated tool."
      ],
      pricingAdvice: "A strong specialist purchase once multilingual output becomes operationally meaningful.",
      decisionMatrix: [
        ["Breadth", "Specialist"],
        ["Translation quality", "Excellent"],
        ["Team fit", "Excellent for global teams"],
        ["General utility", "Limited"]
      ]
    }
  };

  const categoryGuides = {
    Assistants: "Strong assistant tools help with general knowledge work, planning, drafting, summarization, and flexible day-to-day execution.",
    Research: "Research tools matter most when trust, citations, competitive scanning, and source discovery are part of the workflow.",
    Writing: "Writing tools are most valuable when teams need clearer English, better long-form output, and stakeholder-ready copy.",
    Design: "Design tools are most useful when visual quality, concept exploration, and presentable assets are core outputs.",
    Video: "Video tools are best for training, sales enablement, explainers, localization, and repeatable avatar-led production.",
    Translation: "Translation tools matter when products, docs, marketing, and support must travel cleanly across regions.",
    Productivity: "Productivity tools fit teams that want AI embedded into docs, project systems, and repeatable knowledge workflows.",
    Audio: "Audio tools are strongest when voice quality, dubbing, narration, and multilingual delivery matter.",
    Coding: "Coding tools matter most when the workflow is shipping software, prototyping products, or moving faster inside live repositories.",
    Meetings: "Meeting tools help teams turn calls into searchable notes, summaries, action items, and downstream follow-up.",
    Sales: "Sales tools are most useful when AI needs to touch pipeline generation, customer communication, or post-meeting revenue workflows.",
    Automation: "Automation tools matter when AI should trigger real actions across apps instead of stopping at drafts or summaries."
  };

  const query = new URLSearchParams(window.location.search);
  const pageConfig = {
    toolId: document.body.dataset.toolId || query.get("id"),
    detailMode: document.body.dataset.detailMode || "query",
    homeHref: document.body.dataset.homeHref || "index.html",
    directoryHref: document.body.dataset.directoryHref || "index.html#directory",
    assetPrefix: document.body.dataset.assetPrefix || ""
  };

  function loadIconManifest() {
    try {
      const request = new XMLHttpRequest();
      request.open("GET", `${pageConfig.assetPrefix}assets/tool-icons/manifest.json`, false);
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

  function manifestEntry(item) {
    return iconManifest[item.id] || null;
  }

  const tools = [...catalog.tools];
  const tool = tools.find((item) => item.id === pageConfig.toolId) || tools[0];
  const profile = toolProfiles[tool.id] || buildFallbackProfile(tool);

  const hero = document.getElementById("detail-hero");
  const overview = document.getElementById("detail-overview");
  const strengths = document.getElementById("detail-strengths");
  const pricing = document.getElementById("detail-pricing");
  const compare = document.getElementById("detail-compare");
  const fit = document.getElementById("detail-fit");
  const decision = document.getElementById("detail-decision");
  const sources = document.getElementById("detail-sources");
  const similar = document.getElementById("detail-similar");

  function localIconFor(item) {
    const entry = manifestEntry(item);
    if (entry && entry.file && entry.content_type !== "text/html") {
      return `${pageConfig.assetPrefix}assets/tool-icons/${entry.file}`;
    }
    return `${pageConfig.assetPrefix}assets/tool-icons/${item.id}.png`;
  }

  function localIcoFor(item) {
    return `${pageConfig.assetPrefix}assets/tool-icons/${item.id}.ico`;
  }

  function localSvgFor(item) {
    return `${pageConfig.assetPrefix}assets/tool-icons/${item.id}.svg`;
  }

  function detailUrl(item) {
    if (pageConfig.detailMode === "static") {
      return `${item.id}.html`;
    }
    return `tool.html?id=${encodeURIComponent(item.id)}`;
  }

  function fallbackIcon(item) {
    const label = (item.logoLetter || item.name.charAt(0) || "A").toUpperCase();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#2563eb" offset="0%"/>
            <stop stop-color="#22d3ee" offset="100%"/>
          </linearGradient>
        </defs>
        <rect width="96" height="96" rx="28" fill="url(#g)"/>
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="44" font-family="Arial, sans-serif" font-weight="700" fill="white">${label}</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${svg.replace(/\n+/g, "").replace(/#/g, "%23").replace(/"/g, "'")}`;
  }

  function escapeJsString(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  function iconFallbackSources(item) {
    const entry = manifestEntry(item);
    const sources = [];
    if (entry && entry.fallback) {
      sources.push(`${pageConfig.assetPrefix}assets/tool-icons/${entry.fallback}`);
    }
    sources.push(localIcoFor(item));
    sources.push(localSvgFor(item));
    sources.push(fallbackIcon(item));
    return sources.filter((source, index) => source && !sources.slice(0, index).includes(source) && source !== localIconFor(item));
  }

  function iconOnErrorHandler(item) {
    return iconFallbackSources(item).reduceRight(
      (script, source) => `this.onerror=function(){${script}};this.src='${escapeJsString(source)}';`,
      "this.onerror=null;"
    );
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

  function buildFallbackProfile(item) {
    const primaryCategory = item.categories[0] || "Assistants";
    return {
      why: [
        `${item.name} stands out primarily in the ${primaryCategory} lane.`,
        item.recommendation,
        `It is most relevant for ${item.audience.slice(0, 3).join(", ")}.`
      ],
      strengths: [
        `High-traction option inside the ${primaryCategory} category.`,
        `Useful when buyers want a more established name instead of a niche tool.`
      ],
      watchouts: [
        "May be less suitable if your actual need is highly specialized.",
        "Fit depends on whether the primary category matches your workflow."
      ],
      useWhen: [
        `You are actively shopping for a higher-traction ${primaryCategory.toLowerCase()} tool.`,
        `Your workflow aligns with ${item.categories.join(", ")} use cases.`
      ],
      avoidWhen: [
        "You need a more specialized product in another category.",
        "Your budget or workflow does not match the product's positioning."
      ],
      pricingAdvice: "Choose this when your buying criteria lean more toward market traction and lower selection risk than feature novelty.",
      decisionMatrix: [
        ["Breadth", item.categories.length > 2 ? "Strong" : "Focused"],
        ["Category fit", primaryCategory],
        ["Market traction", formatVisits(item.monthlyVisits)],
        ["Pricing", item.pricing]
      ]
    };
  }

  function getSimilarTools(item) {
    const categorySet = new Set(item.categories);
    return tools
      .filter((candidate) => candidate.id !== item.id)
      .map((candidate) => ({
        candidate,
        score: candidate.categories.reduce((sum, category) => sum + (categorySet.has(category) ? 1 : 0), 0)
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score || right.candidate.monthlyVisits - left.candidate.monthlyVisits)
      .slice(0, 4)
      .map((entry) => entry.candidate);
  }

  function renderList(title, items, toneClass) {
    return `
      <div class="detail-list-block ${toneClass || ""}">
        <h3>${title}</h3>
        <ul class="detail-list">
          ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  document.title = `${tool.name} | Northstar AI`;

  hero.innerHTML = `
    <div class="detail-hero-main">
      <div class="detail-breadcrumbs">
        <a href="${pageConfig.homeHref}">Home</a>
        <span>/</span>
        <a href="${pageConfig.directoryHref}">Directory</a>
        <span>/</span>
        <span>${tool.name}</span>
      </div>

      <div class="detail-title-row">
        <span class="detail-icon-shell">
          <img src="${localIconFor(tool)}" alt="${tool.name} icon" onerror="${iconOnErrorHandler(tool)}">
        </span>
        <div>
          <p class="kicker">${tool.vendor}</p>
          <h1>${tool.name}</h1>
        </div>
      </div>

      <div class="detail-pill-row">
        <span class="meta-pill">${tool.trafficLabel}</span>
        <span class="meta-pill">${tool.pricing}</span>
        ${tool.categories.map((category) => `<span class="tag">${category}</span>`).join("")}
      </div>
    </div>

    <div class="detail-hero-side">
      <div class="detail-hero-actions">
        <a class="nav-cta detail-cta" href="${tool.url}" target="_blank" rel="noreferrer noopener">Visit product</a>
        <a class="secondary-button detail-secondary" href="${pageConfig.directoryHref}">Back to directory</a>
      </div>
      <div class="detail-quickfacts">
        <div>
          <span>Best for</span>
          <strong>${tool.audience.slice(0, 2).join(" + ")}</strong>
        </div>
        <div>
          <span>Primary lane</span>
          <strong>${tool.categories[0] || "AI Tool"}</strong>
        </div>
        <div>
          <span>Monthly traction</span>
          <strong>${formatVisits(tool.monthlyVisits)}</strong>
        </div>
      </div>
    </div>
  `;

  overview.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Overview</p>
        <h2>Why this tool matters</h2>
      </div>
    </div>
    <p class="detail-lead">${tool.recommendation}</p>
    <div class="detail-grid-two">
      ${renderList("Why it stands out", profile.why)}
      <div class="detail-copy-block">
        <h3>Category context</h3>
        <p>${tool.categories.map((category) => categoryGuides[category]).filter(Boolean).join(" ")}</p>
      </div>
    </div>
  `;

  strengths.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Strengths & tradeoffs</p>
        <h2>What you gain, and what to watch</h2>
      </div>
    </div>
    <div class="detail-grid-two">
      ${renderList("Strengths", profile.strengths, "positive")}
      ${renderList("Watchouts", profile.watchouts, "caution")}
    </div>
    <div class="detail-grid-two detail-grid-top">
      ${renderList("Use it when", profile.useWhen)}
      ${renderList("Skip it when", profile.avoidWhen)}
    </div>
  `;

  pricing.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Buying advice</p>
        <h2>How to justify the purchase</h2>
      </div>
    </div>
    <div class="detail-grid-two">
      <div class="detail-copy-block">
        <h3>Pricing guidance</h3>
        <p>${profile.pricingAdvice}</p>
      </div>
      <div class="detail-copy-block">
        <h3>Best-fit audiences</h3>
        <div class="directory-tags">
          ${tool.audience.map((audience) => `<span class="tag">${audience}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  compare.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Comparison</p>
        <h2>Closest alternatives</h2>
      </div>
    </div>
    <div class="detail-compare-grid">
      ${getSimilarTools(tool)
        .map(
          (item) => `
            <a class="detail-similar-card" href="${detailUrl(item)}">
              <span class="tool-icon-shell">
                <img src="${localIconFor(item)}" alt="${item.name} icon" onerror="${iconOnErrorHandler(item)}">
              </span>
              <div class="tool-text">
                <h3>${item.name}</h3>
                <p>${item.recommendation}</p>
              </div>
            </a>
          `
        )
        .join("")}
    </div>
  `;

  fit.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Fit</p>
        <h2>Who should care</h2>
      </div>
    </div>
    <div class="directory-tags">
      ${tool.audience.map((audience) => `<span class="tag">${audience}</span>`).join("")}
    </div>
    <div class="detail-side-copy">
      <p>This tool is most relevant for teams or operators who already know they need stronger performance in the <strong>${tool.categories.join(", ")}</strong> lane.</p>
      <p>If you are choosing a first AI product, prioritize overall fit before feature count.</p>
    </div>
  `;

  decision.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Decision matrix</p>
        <h2>At-a-glance decision view</h2>
      </div>
    </div>
    <div class="decision-grid">
      ${profile.decisionMatrix
        .map(
          ([label, value]) => `
            <div class="decision-item">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;

  sources.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Sources</p>
        <h2>Directory inputs</h2>
      </div>
    </div>
    <div class="detail-source-list">
      <a href="${tool.sources.futurepedia}" target="_blank" rel="noreferrer noopener">Futurepedia reference</a>
      <a href="${tool.sources.toolify}" target="_blank" rel="noreferrer noopener">Toolify reference</a>
      <a href="${tool.url}" target="_blank" rel="noreferrer noopener">Official website</a>
    </div>
    <p class="detail-source-note">Northstar rewrites the description and recommendation layer instead of copying directory text verbatim.</p>
  `;

  const similarTools = getSimilarTools(tool);
  similar.innerHTML = `
    <div class="section-header">
      <div>
        <p class="kicker">Related tools</p>
        <h2>Keep exploring this lane</h2>
      </div>
    </div>
    <div class="detail-related-grid">
      ${similarTools
        .map(
          (item) => `
            <a class="detail-related-item" href="${detailUrl(item)}">
              <span class="tool-icon-shell">
                <img src="${localIconFor(item)}" alt="${item.name} icon" onerror="${iconOnErrorHandler(item)}">
              </span>
              <div class="tool-text">
                <h3>${item.name}</h3>
                <p>${item.summary}</p>
              </div>
            </a>
          `
        )
        .join("")}
    </div>
  `;
})();
