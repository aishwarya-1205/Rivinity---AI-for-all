"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Linkedin,
  Twitter,
  Instagram,
  X,
  Share2,
  BookOpen,
  Mail,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Component as GridBackground } from "@/components/ui/grid-background";

// Mock Blog Posts Data
const blogPosts = [
  {
    id: "rivinitylm-2-launch",
    title: "Scaling Sovereign AI: Launching RivinityLM-2 supporting 22+ Indian Languages",
    category: "AI Research",
    date: "2026-06-15",
    readTime: "6 min read",
    description: "Today we are excited to launch RivinityLM-2, our next-generation foundation model trained on 3 trillion tokens. RivinityLM-2 sets new benchmarks in reasoning, translation, and localized context understanding across 22 official Indian languages.",
    image: "/blog_featured.png",
    featured: true,
    content: `
      <h2>The Sovereign AI Imperative for India</h2>
      <p>India is home to over 1.4 billion people speaking thousands of dialects and 22 officially recognized languages. Standard Western AI models, while capable, often lack the cultural nuances, regional vocabulary, and low-resource language depth required to serve India's diverse demographic. Today, we are bridging this gap with <strong>RivinityLM-2</strong>.</p>
      
      <blockquote>
        "Sovereign AI is not just a technological luxury; it is a national infrastructure requirement. RivinityLM-2 represents a milestone in training models specifically on Indic datasets."
        <cite>— Arjun Mehta, Co-Founder & CEO</cite>
      </blockquote>

      <h2>What's New in RivinityLM-2?</h2>
      <p>RivinityLM-2 is trained from scratch on our newly compiled Indic-3T corpus, containing 3 trillion high-quality tokens of translated text, government archives, regional literature, and conversational transcripts. Here are the core improvements:</p>
      <ul>
        <li><strong>Multilingual Synthesis:</strong> Seamless, context-aware translation and reasoning across all 22 official languages of India.</li>
        <li><strong>Low-Resource Vocabulary expansion:</strong> Added over 80,000 localized word tokens to reduce text processing costs for regional scripts like Devanagari, Tamil, and Bengali by up to 60%.</li>
        <li><strong>Indic Benchmarks:</strong> Outperforms existing open foundation models on the IN-Eval benchmark suite by 14.5% in reasoning and mathematical capability.</li>
      </ul>

      <h2>Technical Architecture & Training Efficiency</h2>
      <p>We built a customized mixture-of-experts (MoE) architecture with 8 experts per pipeline. Each token activates 2 experts, allowing us to maintain a total parameter count of 70 billion while running inference at the speed and cost of a 12 billion parameter model. This makes hosting the model on local servers highly viable for Indian enterprises.</p>
      
      <pre><code>// Example: Interfacing with RivinityLM-2 API
const response = await rivinity.chat.completions.create({
  model: "rivinitylm-2-indic",
  messages: [{ 
    role: "user", 
    content: "Explain quantum computing in Hindi using localized analogies." 
  }],
  temperature: 0.3
});
console.log(response.choices[0].message.content);</code></pre>

      <h2>Democratizing Access</h2>
      <p>We are releasing RivinityLM-2 under the Rivinity Sovereign License, making it free for research and small developers. Enterprise APIs are now active on our platform console with local server endpoints to guarantee absolute data privacy within Indian borders.</p>
    `
  },
  {
    id: "our-culture",
    title: "Life at Rivinity: The Freedom of Remote Work & Why You'll Love Joining Us",
    category: "Culture",
    date: "2026-06-18",
    readTime: "5 min read",
    description: "Discover how we build a high-performance, asynchronous remote work environment where flexibility, trust, and creative freedom empower our team to build the future of AI.",
    image: "/blog_culture.png",
    featured: false,
    content: `
      <h2>Work from Anywhere. Live Your Best Life.</h2>
      <p>At Rivinity, we believe that brilliant minds don't need a corporate cubicle to do their best work. Since our founding, we have championed a 100% remote-first philosophy. Whether you are working from a beach cafe in Goa, a cozy home office in Kanpur, or a quiet retreat in the Himalayas, we trust you to manage your time and impact.</p>

      <blockquote>
        "We don't measure hours logged; we measure impact delivered. Remote work gives our team the autonomy to integrate their professional goals with their personal well-being."
        <cite>— Arjun Mehta, Co-Founder & CEO</cite>
      </blockquote>

      <h2>Why Remote Work at Rivinity is Different</h2>
      <p>Many companies call themselves remote but still enforce rigid office hours and constant screen monitoring. At Rivinity, we operate on three core pillars:</p>
      <ul>
        <li><strong>Asynchronous-First Workflow:</strong> We minimize useless real-time meetings. Most collaboration happens via organized threads, documentation, and pull requests, giving you hours of uninterrupted, deep focus time.</li>
        <li><strong>Flexible Peak Hours:</strong> Are you a night owl who codes best at 2 AM? Or an early bird who designs at dawn? You set your own schedule. All we ask is a brief daily asynchronous check-in.</li>
        <li><strong>Trust Over Tracking:</strong> We never use keystroke trackers or camera monitoring. We hire outstanding adults and treat them with the respect and autonomy they deserve.</li>
      </ul>

      <h2>Bringing the Team Together</h2>
      <p>While we work remotely, we aren't isolated. We build connection through:</p>
      <ul>
        <li><strong>Regional Coworking Meetups:</strong> We have office hubs in Kanpur, Lucknow, and Noida for team members who enjoy getting together for coworking and whiteboarding.</li>
        <li><strong>Annual Offsites:</strong> Once a year, the entire company flies out to a scenic location in India for a week of hackathons, team bonding, and pure relaxation.</li>
        <li><strong>Learning & Workspace Stipends:</strong> We provide a generous budget to set up your home office (ergonomic chair, dual monitors, high-speed internet reimbursement) and annual stipends for books, courses, and conferences.</li>
      </ul>

      <h2>Build the Future of AI with Us</h2>
      <p>We are a lean, fast-moving team of world-class AI researchers and developers from companies like Google, Meta, and DeepMind. If you want to work on sovereign AI infrastructure that will serve 1.4 billion people, you will find your place here.</p>

      <div class="mt-8 text-center bg-accent/5 p-6 rounded-2xl border border-accent/20">
        <h3 class="text-lg font-bold text-foreground mb-2">Ready to Join the Journey?</h3>
        <p class="text-sm text-muted-foreground mb-4">We are hiring across engineering, NLP research, and product management.</p>
        <a href="https://hrm.bharat-tech.org/recruitment/open-recruitments" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white hover:bg-accent/90 font-semibold text-sm transition-all shadow-md">
          View Open Positions
          <ArrowRight size={16} />
        </a>
      </div>
    `
  },
  {
    id: "soc2-compliance",
    title: "Building Secure AI Pipelines: How We Achieved SOC 2 Compliance",
    category: "Security",
    date: "2026-06-10",
    readTime: "5 min read",
    description: "Enterprise AI demands bank-grade security. A technical walkthrough of how we isolate tenant workloads and secure customer data pipelines to meet SOC 2 standards.",
    image: "/logo.png",
    featured: false,
    content: `
      <h2>Security First in Enterprise AI</h2>
      <p>When organizations send confidential operational data to AI models, security cannot be an afterthought. Over the past year, our team has refactored our infrastructure to implement zero-trust data access. Today, we are proud to announce that Rivinity has officially achieved SOC 2 Type II compliance.</p>
      
      <h2>Core Security Practices We Implemented</h2>
      <p>Achieving compliance meant auditing every single layer of our stack, from code commits to model serving. Here are the key security paradigms:</p>
      
      <h3>1. Isolated Tenant Sandbox Workloads</h3>
      <p>We use micro-VM architectures powered by AWS Firecracker to isolate each developer request. When you query our models, your context is loaded inside a temporary container that is completely destroyed after compilation, ensuring zero cross-tenant leakage.</p>

      <h3>2. Localized Data Residency</h3>
      <p>For sensitive sectors like BFSI and Healthcare, all data residency is locked to local regions. Data never leaves the geographical boundaries of India, aligning with localized regulatory compliance guidelines.</p>

      <h3>3. Active Red Teaming & Audit Trails</h3>
      <p>We perform daily automated vulnerability scanning and conduct quarterly external pentests. Every API token generation, data transfer, and configuration change is logged with immutable cryptographic trails.</p>
    `
  },
  {
    id: "audio-lab-speech",
    title: "The Future of Voice: How Rivinity Audio Lab is breaking language barriers",
    category: "AI Research",
    date: "2026-06-05",
    readTime: "8 min read",
    description: "Real-time speech-to-speech translation with accent preservation. Learn how we built our low-latency voice cloning technology supporting rural Indian dialects.",
    image: "/logo.png",
    featured: false,
    content: `
      <h2>Breaking the Accents Barrier</h2>
      <p>In a country where accents change every 100 kilometers, standard voice cloning models often sound robotic or artificially Western. Rivinity Audio Lab is changing this with our accent-preserving low-latency voice architecture.</p>

      <h2>Our Core Breakthroughs</h2>
      <p>Most speech synthesis engines separate text-to-speech and translation into two disconnected models. This introduces latency and loses the emotional nuance of the speaker. Our single-stage multi-modal speech model overcomes this:</p>
      <ul>
        <li><strong>3-Second Accent Matching:</strong> With only a 3-second reference voice clip, our neural encoder copies the exact pitch, timbre, and regional accent of the speaker.</li>
        <li><strong>Low-Latency Output:</strong> By using a customized streaming transformer, we reduced chunk processing latency to under 120ms, enabling real-time voice calls.</li>
      </ul>
      
      <p>This technology is currently being trialed in agriculture helpline platforms, allowing expert advice to be instantly translated into regional dialects while preserving the conversational warm tone of local operators.</p>
    `
  },
  {
    id: "no-code-builder",
    title: "Democratizing App Building: A Guide to Rivinity's No-Code Platform",
    category: "Developer Tools",
    date: "2026-05-28",
    readTime: "4 min read",
    description: "Create AI agents and connect databases in minutes without writing code. Announcing our visual workflow builder designed for non-technical teams.",
    image: "/logo.png",
    featured: false,
    content: `
      <h2>AI for Everyone, No Code Required</h2>
      <p>Software engineering shouldn't be the bottleneck for AI adoption. Our new visual workflow builder allows operations, sales, and product teams to assemble advanced AI pipelines using a drag-and-drop canvas.</p>
      
      <h2>Key Features of the App Builder</h2>
      <p>The builder offers a node-based interface that feels like drawing a flowchart:</p>
      <ul>
        <li><strong>Pre-built Connectors:</strong> Instantly hook up databases, Gmail, Slack, and internal CRM endpoints.</li>
        <li><strong>State Management:</strong> Easily maintain session context for complex customer service workflows.</li>
        <li><strong>Prompt Injection Shielding:</strong> Built-in guardrail layers screen inputs before sending them to the LLM core.</li>
      </ul>
    `
  },
  {
    id: "deepfake-detection",
    title: "Preventing Deepfakes: Real-time Multi-modal Detection for Indian Enterprises",
    category: "Security",
    date: "2026-05-18",
    readTime: "7 min read",
    description: "Deepfakes pose severe risks to KYC and communications. We showcase our new detection model that analyzes micro-expressions and spectral audio inconsistencies.",
    image: "/logo.png",
    featured: false,
    content: `
      <h2>The Threat of Synthetic Media</h2>
      <p>As generative AI becomes more advanced, synthetic videos and cloned voices are increasingly used for fraud, unauthorized KYC verifications, and corporate impersonation. To counter this, Rivinity is releasing a deepfake detection suite designed to protect transactional systems in real time.</p>

      <h2>How the Detection Works</h2>
      <p>Our detector doesn't just look for visual artifacts. It combines visual, behavioral, and spectral audio analysis:</p>
      <ul>
        <li><strong>Spectral Audio Audit:</strong> Cloned audio leaves distinct phase-shift patterns in high frequencies. Our system flags these discrepancies in under 50ms.</li>
        <li><strong>Micro-Expression Liveness:</strong> Analyzes blood flow patterns in facial regions and natural blinking patterns to confirm physical presence.</li>
      </ul>
    `
  },
  {
    id: "scaling-agentic-workflows",
    title: "How We Scale Agentic Workflows for Enterprise Operations",
    category: "Enterprise Solutions",
    date: "2026-05-10",
    readTime: "6 min read",
    description: "Multi-agent orchestration allows complex task execution. See how India's top BFSI enterprises deploy Rivinity agents to automate compliance checks.",
    image: "/logo.png",
    featured: false,
    content: `
      <h2>The Rise of Autonomous AI Agents</h2>
      <p>Moving beyond simple text completion, modern AI is shifting towards multi-agent orchestration—specialized bots collaborating to execute multi-step business goals autonomously.</p>
      
      <h2>Orchestrating Multi-Agent Systems</h2>
      <p>In our enterprise engine, we implement a coordinator-subagent hierarchy. A central controller agent breaks down a user request, delegates sub-tasks (e.g. searching records, summarizing documents, writing draft emails) to specialized agents, and verifies the final output against pre-set quality criteria.</p>
    `
  }
];

// Recommended Articles (Bottom section "May you like more blog")
const recommendedPosts = [
  {
    id: "sovereign-infrastructure",
    title: "Open Source AI: Why Sovereign Infrastructure Matters",
    category: "Open Source",
    date: "2026-04-20",
    description: "Why hosting and controlling AI infrastructure locally is vital for national data security, innovation, and long-term tech independence.",
    image: "/logo.png"
  },
  {
    id: "agentic-ux-design",
    title: "Designing for AI: Best Practices in Agentic UX",
    category: "Developer Tools",
    date: "2026-04-12",
    description: "How to design human-in-the-loop interfaces that provide users with control while allowing AI agents to work efficiently in the background.",
    image: "/logo.png"
  },
  {
    id: "ai-social-impact",
    title: "Bridging the Digital Divide: AI for Social Impact",
    category: "AI Research",
    date: "2026-04-02",
    description: "A look at how localized AI voice models help rural farmers access real-time weather and market details in their native dialects.",
    image: "/logo.png"
  }
];

const categories = [
  "AI Research",
  "Developer Tools",
  "Enterprise Solutions",
  "Security",
  "Open Source",
  "Culture"
];

function BlogContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeArticle, setActiveArticle] = useState<typeof blogPosts[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const postQuery = searchParams ? searchParams.get("post") : null;

  // Watch query params to auto-open specific posts (e.g., our-culture)
  useEffect(() => {
    if (postQuery) {
      const matchedPost = blogPosts.find((p) => p.id === postQuery);
      if (matchedPost) {
        setActiveArticle(matchedPost);
      }
    }
  }, [postQuery]);

  // Toggle category filters
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter posts based on selected categories
  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(post.category);
  });

  // Find the featured post (fallback if filtered out, or show first available)
  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const listPosts = filteredPosts.filter((p) => p.id !== (featuredPost?.id || ""));

  const shareArticle = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-background relative transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <GridBackground />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              Rivinity Insights
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              The <span className="text-gradient">Rivinity Blog</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Research updates, developer guides, and engineering breakthroughs from the team building sovereign intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Featured Post (Matches top section in reference image) */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              {/* Featured Header & Sub-banner Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 items-start">
                <div className="lg:col-span-3">
                  <span className="text-accent font-semibold text-xs tracking-wider uppercase bg-accent/10 px-3 py-1.5 rounded-full">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 hover:text-accent transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    Rivinity Events
                  </p>
                  <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Developer Meetup: Kanpur 2026
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Join our research team at Kanpur Science Center for a deep-dive on sovereign AI.
                  </p>
                  <button 
                    onClick={() => {
                      const eventPost = blogPosts.find(p => p.id === "rivinitylm-2-launch");
                      if (eventPost) setActiveArticle(eventPost);
                    }}
                    className="text-xs font-bold text-foreground hover:text-accent flex items-center gap-1.5 transition-colors"
                  >
                    Read details
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Large Mockup/Artwork Image (Rounded-3xl, inspired by screenshot) */}
              <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border group cursor-pointer shadow-md bg-secondary/20"
                onClick={() => setActiveArticle(featuredPost)}
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  priority
                />
                {/* Visual Accent Bar */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-2.5 bg-gradient-to-r from-accent to-highlight rounded-t-full shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-6 shadow-lg">
                    Read Full Article
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filtering Sidebar & Posts List Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start mt-12">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
              <div>
                <h3 className="font-extrabold text-foreground text-xs uppercase tracking-widest mb-6 border-b border-border pb-3">
                  Quick Filters
                </h3>
                
                {/* Custom Styled Checkboxes */}
                <div className="space-y-4">
                  {categories.map((category) => {
                    const isChecked = selectedCategories.includes(category);
                    return (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group text-sm select-none"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCategoryToggle(category)}
                            className="sr-only"
                          />
                          <div className={`
                            w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
                            ${isChecked 
                              ? "bg-accent border-accent text-white" 
                              : "border-border bg-card group-hover:border-accent/40"
                            }
                          `}>
                            {isChecked && (
                              <svg className="w-3.5 h-3.5 stroke-2 stroke-current" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`transition-colors duration-200 ${
                          isChecked 
                            ? "text-foreground font-semibold" 
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                          {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Social Connections */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-extrabold text-foreground text-xs uppercase tracking-widest mb-5">
                  Follow us on
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Instagram, url: "https://www.instagram.com/rivinityai/" },
                    { icon: Linkedin, url: "https://www.linkedin.com/company/bharatartificialintelligence/" },
                    { icon: Twitter, url: "https://x.com/rivinityai" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary hover:bg-accent/10 border border-border hover:border-accent/30 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-200"
                    >
                      <social.icon size={16} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Blog Posts List */}
            <div className="lg:col-span-3 space-y-12">
              <AnimatePresence mode="popLayout">
                {listPosts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 bg-card rounded-2xl border border-border"
                  >
                    <BookOpen className="w-10 h-10 text-muted-foreground/60 mx-auto mb-4" />
                    <p className="text-muted-foreground text-base">No blog posts found matching the selected filters.</p>
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="text-accent text-sm font-bold mt-2 hover:underline"
                    >
                      Reset filters
                    </button>
                  </motion.div>
                ) : (
                  listPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col md:flex-row gap-6 items-start py-8 border-b border-border/80 last:border-0"
                    >
                      {/* Left Side: Thumbnail (Rounded-2xl) */}
                      <div 
                        className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden border border-border/60 bg-secondary/10 flex-shrink-0 cursor-pointer shadow-sm"
                        onClick={() => setActiveArticle(post)}
                      >
                        <Image
                          src={post.image === "/logo.png" ? "/logo.svg" : post.image}
                          alt={post.title}
                          fill
                          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
                            post.image.includes("culture") || post.image.includes("featured") 
                              ? "object-cover p-0" 
                              : "p-4 bg-gradient-to-br from-card to-secondary/30"
                          }`}
                        />
                      </div>

                      {/* Right Side: Text details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 text-xs mb-2.5">
                          <span className="text-accent font-semibold uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                        
                        <h3 
                          className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors cursor-pointer leading-snug"
                          onClick={() => setActiveArticle(post)}
                        >
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {post.description}
                        </p>
                        
                        <button
                          onClick={() => setActiveArticle(post)}
                          className="text-xs font-bold text-foreground group-hover:text-accent hover:underline flex items-center gap-1 transition-colors"
                        >
                          Read full blog
                          <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </motion.article>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* "May you like more blog" Recommendations (Bottom horizontal section) */}
      <section className="py-20 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              May you like more blog
            </h2>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-xs font-bold bg-card border border-border px-5 py-2.5 rounded-full text-foreground hover:bg-accent/5 hover:border-accent/30 transition-all shadow-sm"
            >
              See more blog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl border border-border/80 overflow-hidden hover:border-accent/30 transition duration-300 hover:shadow-lg flex flex-col h-full"
              >
                <div 
                  className="relative aspect-video bg-gradient-to-br from-card to-secondary/40 border-b border-border/60 cursor-pointer overflow-hidden flex items-center justify-center p-6"
                  onClick={() => {
                    const matchedPost = blogPosts.find(p => p.category === post.category) || blogPosts[0];
                    setActiveArticle({
                      ...matchedPost,
                      title: post.title,
                      description: post.description,
                      category: post.category,
                      date: post.date
                    });
                  }}
                >
                  <Image
                    src="/logo.svg"
                    alt={post.title}
                    width={64}
                    height={64}
                    className="object-contain opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-semibold">
                    <span className="text-accent uppercase tracking-wider">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 
                    className="text-base font-bold text-foreground mb-3 group-hover:text-accent transition-colors cursor-pointer line-clamp-2"
                    onClick={() => {
                      const matchedPost = blogPosts.find(p => p.category === post.category) || blogPosts[0];
                      setActiveArticle({
                        ...matchedPost,
                        title: post.title,
                        description: post.description,
                        category: post.category,
                        date: post.date
                      });
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  <button 
                    onClick={() => {
                      const matchedPost = blogPosts.find(p => p.category === post.category) || blogPosts[0];
                      setActiveArticle({
                        ...matchedPost,
                        title: post.title,
                        description: post.description,
                        category: post.category,
                        date: post.date
                      });
                    }}
                    className="text-xs font-bold text-foreground hover:text-accent mt-auto flex items-center gap-1 transition-colors"
                  >
                    Read article
                    <ChevronRight size={12} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Premium Full-Reading Drawer Overlay */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Reading Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl h-full bg-card border-l border-border shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-20">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareArticle(activeArticle.title)}
                    className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    title={copied ? "Link Copied!" : "Share Article"}
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Reading Content */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-10">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-6 font-semibold">
                  <span className="text-accent uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded-md">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6 leading-tight">
                  {activeArticle.title}
                </h1>

                {/* Optional featured image */}
                {activeArticle.image && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border mb-8 bg-secondary/10">
                    <Image
                      src={
                        activeArticle.image === "/logo.png" 
                          ? "/logo.svg" 
                          : activeArticle.image
                      }
                      alt={activeArticle.title}
                      fill
                      className={
                        activeArticle.image.includes("culture") || activeArticle.image.includes("featured") 
                          ? "object-cover" 
                          : "object-contain p-8 bg-gradient-to-br from-card to-secondary/30"
                      }
                    />
                  </div>
                )}

                {/* Article Body Content (Rendered with custom prose classes) */}
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none 
                    text-foreground/90 leading-relaxed text-base sm:text-lg
                    prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-p:mb-5 prose-p:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-muted-foreground
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-5 prose-ul:space-y-2
                    prose-code:text-accent prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-secondary/80 prose-pre:border prose-pre:border-border prose-pre:p-5 prose-pre:rounded-xl prose-pre:my-6 prose-pre:overflow-x-auto
                  "
                  dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                />

                {/* Sharing toast indicator */}
                {copied && (
                  <div className="fixed bottom-6 right-6 bg-foreground text-background text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all">
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Rivinity Insights...</span>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
