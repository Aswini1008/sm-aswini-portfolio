import { lazy, Suspense, useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Atom,
  BatteryCharging,
  Braces,
  BookOpenText,
  BriefcaseBusiness,
  Check,
  Cloud,
  Code2,
  Coffee,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  Github,
  Globe2,
  Grid2X2,
  GraduationCap,
  Figma,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  PanelsTopLeft,
  Send,
  Server,
  Sparkles,
  Terminal,
  Wind,
  Workflow,
  X,
} from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { MotionEffects } from "@/components/effects/MotionEffects";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { TiltCard } from "@/components/effects/TiltCard";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

const HeroScene = lazy(() =>
  import("@/components/three/HeroScene").then((module) => ({ default: module.HeroScene })),
);
const ParticleBackground = lazy(() =>
  import("@/components/three/ParticleBackground").then((module) => ({
    default: module.ParticleBackground,
  })),
);

const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const githubUrl = "https://github.com/Aswini1008";
const linkedinUrl = "https://in.linkedin.com/in/aswini-sm";
const devUrl = "https://dev.to/aswini-sm";
const leetcodeUrl = "https://leetcode.com/u/aswini_sm";
const emailUrl = "mailto:smaswini006@gmail.com";
const existingPortfolioUrl = "https://aswini-sm-portfolio.netlify.app/";
const githubRepositoryUrl = "https://github.com/Aswini1008/sm-aswini-portfolio";

const skillGroups = [
  {
    title: "Programming languages",
    description: "Languages for problem solving and building software.",
    icon: Code2,
    skills: [
      { name: "Java", icon: Coffee, primary: true },
      { name: "C", icon: Code2 },
      { name: "JavaScript", icon: Braces },
      { name: "Python", icon: Terminal },
    ],
  },
  {
    title: "Computer science",
    description: "The foundations behind reliable, scalable software.",
    icon: Braces,
    skills: [
      { name: "OOP", icon: Braces },
      { name: "Data Structures & Algorithms", icon: Workflow },
      { name: "Problem Solving", icon: Sparkles, primary: true },
      { name: "Collections & Exception Handling", icon: Layers3 },
      { name: "DBMS & SQL", icon: Database },
    ],
  },
  {
    title: "Frontend development",
    description: "Building responsive interfaces and modern web experiences.",
    icon: Layers3,
    skills: [
      { name: "HTML5", icon: FileCode2 },
      { name: "CSS3", icon: PanelsTopLeft },
      { name: "React.js", icon: Atom },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Bootstrap", icon: Grid2X2 },
    ],
  },
  {
    title: "Backend & databases",
    description: "APIs, databases, source control and deployment platforms.",
    icon: Database,
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Workflow },
      { name: "REST APIs", icon: Grid2X2 },
      { name: "MySQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Git", icon: Github },
      { name: "VS Code", icon: Terminal },
      { name: "Postman", icon: Send },
      { name: "Netlify", icon: Globe2 },
      { name: "Vercel", icon: Cloud },
      { name: "GitHub", icon: Github },
    ],
  },
];

const projects = [
  {
    number: "01",
    category: "Full-stack web application",
    title: "Church Management Web Application",
    description:
      "A full-stack web application for parish management, image galleries, announcements and administrative management.",
    technologies: ["React.js", "Bootstrap", "Node.js", "Express.js", "MongoDB"],
    preview: "church" as const,
    liveUrl: "https://stjosephskamplar.org/",
  },
  {
    number: "02",
    category: "Company website",
    title: "PR Power Infrastructure",
    subtitle: "Power infrastructure company website",
    description:
      "A responsive business website that converts company requirements into clear, professional layouts.",
    technologies: ["React.js", "Tailwind CSS"],
    preview: "nexbyta" as const,
    liveUrl: "https://prpowerinfra.com/",
  },
  {
    number: "03",
    category: "Final-year AI & IoT project",
    title: "VoltGuard",
    subtitle: "AI and IoT battery pack monitoring",
    description:
      "A final-year project for monitoring battery health and identifying abnormal operating conditions. Implementation status is still being validated.",
    technologies: [
      "ESP32",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Isolation Forest",
    ],
    preview: "battery" as const,
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email is too long."),
  subject: z.string().trim().min(3, "Please add a subject.").max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message with at least 10 characters.")
    .max(1000, "Message must be 1,000 characters or less."),
});

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
};

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-centered" : ""}`}>
      <p className="section-eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>
        {title} {accent ? <span className="gradient-text">{accent}</span> : null}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateCompactState = () => setIsCompact(window.scrollY > 32);
    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    window.addEventListener("portfolio-scroll", updateCompactState);

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      window.removeEventListener("portfolio-scroll", updateCompactState);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-section[id]"));
    let activeSectionId = "";
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      let currentSection: HTMLElement | undefined;

      for (const section of sections) {
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= marker) currentSection = section;
        if (bounds.top <= marker && bounds.bottom > marker) break;
      }

      if (currentSection && activeSectionId !== currentSection.id) {
        activeSectionId = currentSection.id;
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("portfolio-scroll", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("portfolio-scroll", updateActiveSection);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`portfolio-header ${isCompact ? "portfolio-header-compact" : ""}`}>
      <div className="portfolio-container flex h-[76px] items-center justify-between gap-4">
        <a href="#home" className="brand-lockup" onClick={closeMenu} aria-label="Aswini S M, home">
          <span className="brand-mark">AS</span>
          <span className="brand-name">Aswini S M</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="ghost"
              size="sm"
              className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
            >
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="nav-cta">
            <a href="#contact">
              Let&apos;s talk <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="nav-menu-button lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="portfolio-container mobile-navigation lg:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
          <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight aria-hidden="true" />
          </a>
          <ThemeToggle className="mobile-theme-toggle" />
        </nav>
      ) : null}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="portfolio-section hero-section portfolio-grid-bg">
      <div className="portfolio-container hero-layout">
        <div className="hero-copy">
          <p className="availability-pill">
            <span aria-hidden="true" />
            Available for opportunities
          </p>
          <p className="hero-kicker">
            <span>Java Developer</span>
            <i aria-hidden="true" />
            Full-Stack Developer
          </p>
          <h1>
            <span>Hi, I&apos;m</span> <span className="gradient-text">Aswini S M.</span>
          </h1>
          <p className="hero-description">
            Aspiring Software Developer with strong interests in Java, problem-solving, Data Structures
            and Algorithms, and full-stack web development. I build practical applications and enjoy
            turning ideas into working software.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action">
              <a href="#projects">
                View My Projects <ArrowDownRight aria-hidden="true" />
              </a>
            </Button>
            <Button type="button" variant="outline" size="lg" className="secondary-action" disabled title="Resume PDF has not been added yet.">
              Download Resume
            </Button>
            <Button asChild variant="outline" size="lg" className="secondary-action">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
          <div className="hero-social-links" aria-label="Aswini's social profiles">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Visit Aswini's GitHub profile" title="GitHub">
              <Github aria-hidden="true" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Visit Aswini's LinkedIn profile" title="LinkedIn">
              <Linkedin aria-hidden="true" />
            </a>
            <a href={leetcodeUrl} target="_blank" rel="noreferrer" aria-label="Visit Aswini's LeetCode profile" title="LeetCode">
              <Code2 aria-hidden="true" />
            </a>
            <a href={emailUrl} aria-label="Email Aswini" title="Email">
              <Mail aria-hidden="true" />
            </a>
          </div>
          <div className="hero-location">
            <MapPin aria-hidden="true" />
            <span>Chennai, Tamil Nadu, India</span>
            <span className="hero-location-divider" aria-hidden="true" />
            <span>
              Build <i>·</i> Teach <i>·</i> Develop
            </span>
          </div>
          <p className="hero-index">
            <span>01</span> / SOFTWARE, WITH INTENTION
          </p>
        </div>

        <div
          className="hero-visual"
          aria-label="Abstract software development workspace illustration"
        >
          <Suspense fallback={<div className="hero-scene-fallback" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="visual-frame-line" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-two" aria-hidden="true" />
          <div className="visual-index" aria-hidden="true">
            A STUDY IN / MAKING
          </div>
          <div className="hero-code-window">
            <div className="window-chrome">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="window-title">aswini / portfolio.tsx</span>
              <Terminal aria-hidden="true" />
            </div>
            <div className="code-content" aria-hidden="true">
              <div className="code-line">
                <span>01</span>
                <span className="code-pink">const</span>{" "}
                <span className="code-blue">developer</span> = &#123;
              </div>
              <div className="code-line code-indent">
                <span>02</span>
                <span className="code-lilac">build</span>:{" "}
                <span className="code-green">&quot;thoughtful interfaces&quot;</span>,
              </div>
              <div className="code-line code-indent">
                <span>03</span>
                <span className="code-lilac">teach</span>:{" "}
                <span className="code-green">&quot;with patience&quot;</span>,
              </div>
              <div className="code-line code-indent">
                <span>04</span>
                <span className="code-lilac">learn</span>: <span className="code-green">true</span>,
              </div>
              <div className="code-line">
                <span>05</span>&#125;;
              </div>
              <div className="code-line code-empty">
                <span>06</span>
              </div>
              <div className="code-line">
                <span>07</span>
                <span className="code-pink">export default</span>{" "}
                <span className="code-blue">developer</span>;
              </div>
            </div>
            <div className="window-status">
              <span>
                <Check aria-hidden="true" /> Ready to build
              </span>
              <span>UTF-8</span>
            </div>
          </div>

          <div className="visual-note visual-note-top">
            <Sparkles aria-hidden="true" />
            <span>Ideas into interfaces</span>
          </div>
          <div className="visual-note visual-note-bottom">
            <span className="visual-note-icon">
              <Braces aria-hidden="true" />
            </span>
            <span>
              <strong>Curious by default</strong>
              <small>Always learning, always building</small>
            </span>
          </div>
          <span className="visual-caption">Frontend · Learning · Making</span>
        </div>
      </div>
      <a className="scroll-cue portfolio-container" href="#about">
        <span>Scroll to explore</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="portfolio-section portfolio-section-alt">
      <div className="portfolio-container about-layout">
        <div
          className="about-portrait"
          aria-label="AS monogram illustration; no personal portrait was supplied"
        >
          <div className="portrait-topline">
            <span>PROFILE / 2026</span>
            <span>CHENNAI, IN</span>
          </div>
          <div className="portrait-monogram" aria-hidden="true">
            AS<span>.</span>
          </div>
          <div className="portrait-grid-lines" aria-hidden="true" />
          <div className="portrait-caption">
            <span className="portrait-caption-mark">
              <Code2 aria-hidden="true" />
            </span>
            <span>
              <strong>Software Developer</strong>
              <small>Developer &amp; programming trainer</small>
            </span>
          </div>
          <span className="portrait-side-label" aria-hidden="true">
            BUILD WITH INTENTION
          </span>
        </div>

        <div className="about-copy">
          <SectionHeading eyebrow="01 / About me" title="A little about" accent="who I am." />
          <p className="about-paragraph">
            I am an aspiring Software Developer with strong interests in Java programming,
            problem-solving, Data Structures and Algorithms, and full-stack web development.
            I have practical experience building responsive React applications and websites with
            JavaScript, HTML, CSS, Node.js and databases.
          </p>
          <p className="about-paragraph">
            I enjoy coding challenges, hackathons, real-world projects and mentoring students.
            My goal is to build a career in software development and contribute to impactful,
            scalable products.
          </p>

          <div className="about-facts">
            <article className="about-fact">
              <span className="fact-icon">
                <GraduationCap aria-hidden="true" />
              </span>
              <div>
                <span className="fact-label">Education</span>
                <strong>B.E. Electronics &amp; Communication</strong>
                <small>Panimalar Engineering College · 2023–2027</small>
              </div>
            </article>
            <article className="about-fact">
              <span className="fact-icon">
                <MapPin aria-hidden="true" />
              </span>
              <div>
                <span className="fact-label">Location</span>
                <strong>Chennai, Tamil Nadu</strong>
                <small>India</small>
              </div>
            </article>
            <article className="about-fact">
              <span className="fact-icon">
                <Sparkles aria-hidden="true" />
              </span>
              <div>
                <span className="fact-label">Current focus</span>
                <strong>Java &amp; full-stack development</strong>
                <small>DSA and practical software</small>
              </div>
            </article>
          </div>

          <div className="about-actions">
            <Button
              type="button"
              variant="outline"
              className="unavailable-action"
              disabled
              title="A resume file has not been added yet."
            >
              <BookOpenText aria-hidden="true" /> Resume not linked
            </Button>
            <Button asChild variant="ghost" className="text-action">
              <a href={githubRepositoryUrl} target="_blank" rel="noreferrer">
                GitHub repository <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="02 / The toolkit"
          title="Tools I use to"
          accent="build with"
          description="Technologies and tools I use to build real-world applications."
          align="center"
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <article className={`skill-card skill-card-${index + 1}`} key={group.title}>
                <div className="skill-card-heading">
                  <span className="skill-group-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <span className="skill-card-index">0{index + 1}</span>
                    <h3>{group.title}</h3>
                  </div>
                </div>
                <p className="skill-card-description">{group.description}</p>
                <ul className="skill-list">
                  {group.skills.map(({ name, icon: SkillIcon, primary }) => (
                    <li key={name} className={primary ? "primary-skill" : undefined}>
                      <SkillIcon aria-hidden="true" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChurchWebsitePreview() {
  return (
    <div
      className="project-preview church-preview"
      role="img"
      aria-label="Illustrative interface concept for a parish website; this is not a supplied project screenshot"
    >
      <div className="preview-browser-bar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>parish / community</span>
        <span className="preview-browser-label">ILLUSTRATIVE UI</span>
      </div>
      <div className="church-site">
        <div className="church-site-nav">
          <span className="church-site-brand">
            <span aria-hidden="true">✳</span> PARISH
          </span>
          <span>Home&nbsp;&nbsp; Community&nbsp;&nbsp; Gallery</span>
          <span className="church-site-admin">Admin</span>
        </div>
        <div className="church-site-hero">
          <div className="church-site-copy">
            <span className="preview-eyebrow">A PLACE TO GATHER</span>
            <strong>
              Faith.
              <br />
              Community.
              <br />
              <em>Together.</em>
            </strong>
            <span className="church-site-link">
              Discover our parish <ArrowRight aria-hidden="true" />
            </span>
          </div>
          <div className="church-site-art" aria-hidden="true">
            <span className="church-scene-sun" />
            <span className="church-scene-ground" />
            <div className="church-building">
              <span className="church-main-roof" />
              <div className="church-tower">
                <span className="church-tower-roof" />
                <span className="church-cross" />
                <span className="church-tower-window" />
              </div>
              <span className="church-windows">
                <i />
                <i />
                <i />
              </span>
              <span className="church-door" />
            </div>
          </div>
        </div>
        <div className="church-site-strip">
          <span>PARISH LIFE</span>
          <span>Announcements</span>
          <span>Photo gallery</span>
          <span>Community</span>
        </div>
      </div>
    </div>
  );
}

function NexbytaPreview() {
  return (
    <div
      className="project-preview nexbyta-preview"
      role="img"
      aria-label="Illustrative website concept for PR Power Infrastructure; this is not a supplied project screenshot"
    >
      <div className="preview-browser-bar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>nexbyta / digital services</span>
        <span className="preview-browser-label">ILLUSTRATIVE UI</span>
      </div>
      <div className="nexbyta-site">
        <div className="nexbyta-site-nav">
          <span>
            <b>N</b> NEXBYTA
          </span>
          <span>Services&nbsp;&nbsp; Learning&nbsp;&nbsp; About</span>
          <span className="nexbyta-nav-cta">
            Let&apos;s talk <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
        <div className="nexbyta-site-hero">
          <div>
            <span className="preview-eyebrow">TECHNOLOGY / LEARNING / GROWTH</span>
            <strong>
              Ideas into
              <br />
              <em>digital impact.</em>
            </strong>
            <span className="nexbyta-site-copy">
              Training, technology and thoughtful digital solutions.
            </span>
            <span className="nexbyta-site-button">
              Explore what we do <ArrowRight aria-hidden="true" />
            </span>
          </div>
          <div className="nexbyta-orbit-art" aria-hidden="true">
            <span />
            <i />
            <b>N</b>
          </div>
        </div>
        <div className="nexbyta-service-row">
          <span>
            <Code2 aria-hidden="true" /> Development
          </span>
          <span>
            <GraduationCap aria-hidden="true" /> Training
          </span>
          <span>
            <Globe2 aria-hidden="true" /> Digital solutions
          </span>
        </div>
        <div className="nexbyta-mobile" aria-hidden="true">
          <div className="nexbyta-mobile-notch" />
          <span className="preview-eyebrow">NEXBYTA</span>
          <strong>
            Build what
            <br />
            <em>comes next.</em>
          </strong>
          <span className="nexbyta-mobile-orbit">N</span>
          <span className="nexbyta-mobile-cta">
            Discover <ArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

function BatteryPreview() {
  return (
    <div
      className="project-preview battery-preview"
      role="img"
      aria-label="Illustrative EV battery monitoring dashboard concept with placeholder telemetry; no live data is shown"
    >
      <div className="preview-browser-bar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>cellwatch / monitoring</span>
        <span className="preview-browser-label">CONCEPT · NO LIVE DATA</span>
      </div>
      <div className="battery-dashboard">
        <aside className="battery-sidebar" aria-hidden="true">
          <span className="battery-brand">
            <BatteryCharging />
          </span>
          <i />
          <i />
          <i />
          <span className="battery-sidebar-bottom" />
        </aside>
        <div className="battery-main">
          <div className="battery-dashboard-heading">
            <span>
              <small>MONITORING / OVERVIEW</small>
              <strong>Battery health</strong>
            </span>
            <span className="battery-live-pill">
              <i /> Prototype view
            </span>
          </div>
          <div className="battery-metrics">
            <div>
              <small>PACK VOLTAGE</small>
              <strong>
                --<i> V</i>
              </strong>
              <span>Awaiting telemetry</span>
            </div>
            <div>
              <small>TEMPERATURE</small>
              <strong>
                --<i> °C</i>
              </strong>
              <span>Awaiting telemetry</span>
            </div>
            <div>
              <small>ANOMALY MODEL</small>
              <strong>
                <em>Ready</em>
              </strong>
              <span>Isolation Forest</span>
            </div>
          </div>
          <div className="battery-cells-panel">
            <div className="battery-panel-heading">
              <span>Cell-level view</span>
              <small>Sample layout · no live values</small>
            </div>
            <div className="battery-cell-grid" aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => (
                <i key={index} className={index === 17 ? "battery-cell-highlight" : ""} />
              ))}
            </div>
            <div className="battery-cell-legend">
              <span>
                <i /> Normal range
              </span>
              <span>
                <i /> Review indicator
              </span>
              <span>Voltage: --</span>
            </div>
          </div>
        </div>
        <div className="battery-alert">
          <Activity aria-hidden="true" />
          <span>
            <strong>Early anomaly detection</strong>
            <small>Prototype visualization</small>
          </span>
          <span className="battery-alert-dot" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  number,
  category,
  title,
  subtitle,
  description,
  technologies,
  preview,
  liveUrl,
}: {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  preview: "church" | "nexbyta" | "battery";
  liveUrl?: string;
}) {
  const previewComponents = {
    church: ChurchWebsitePreview,
    nexbyta: NexbytaPreview,
    battery: BatteryPreview,
  };
  const Preview = previewComponents[preview];

  return (
    <TiltCard>
      <div className="project-visual">
        <Preview />
        <span className="project-visual-index">{number} / 03</span>
      </div>
      <div className="project-content">
        <p className="project-category">{category}</p>
        <div className="project-title-row">
          <span className="project-number">{number}</span>
          <h3>{title}</h3>
        </div>
        {subtitle ? <p className="project-subtitle">{subtitle}</p> : null}
        <p className="project-description">{description}</p>
        <ul className="project-tags" aria-label="Technologies">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-actions">
          {liveUrl ? (
            <Button asChild size="sm" className="project-link-button">
              <a href={liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${title} live website`}>
                Live demo <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              className="project-link-button"
              disabled
              aria-label="Live Demo URL not provided yet"
              title="A live project URL has not been provided yet."
            >
              Preview unavailable <ExternalLink aria-hidden="true" />
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="project-github-button"
            disabled
            aria-label="GitHub URL not provided yet"
            title="A repository URL has not been provided yet."
          >
            <Github aria-hidden="true" /> GitHub
          </Button>
        </div>
        {!liveUrl ? (
          <p className="project-link-note">Live project link pending confirmation.</p>
        ) : null}
      </div>
    </TiltCard>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section portfolio-section-alt">
      <div className="portfolio-container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="03 / Selected work"
            title="My"
            accent="work"
            description="A selection of full-stack, product and applied AI work."
          />
          <span className="projects-count">
            <span>03</span> case studies
          </span>
        </div>
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.number} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  icon: Icon,
  label,
  title,
  organization,
  description,
}: {
  icon: typeof BriefcaseBusiness;
  label: string;
  title: string;
  organization: string;
  description?: string;
}) {
  return (
    <article className="timeline-entry">
      <span className="timeline-dot" aria-hidden="true" />
      <div className="timeline-entry-top">
        <span>{label}</span>
        <Icon aria-hidden="true" />
      </div>
      <h4>{title}</h4>
      <p className="timeline-organization">{organization}</p>
      {description ? <p className="timeline-description">{description}</p> : null}
    </article>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="04 / The journey"
          title="Experience &"
          accent="education"
          description="The work and learning shaping how I build."
        />
        <div className="journey-grid">
          <div className="journey-column">
            <div className="journey-column-heading">
              <BriefcaseBusiness aria-hidden="true" />
              <h3>Experience</h3>
            </div>
            <div className="timeline-list">
              <TimelineEntry
                icon={BookOpenText}
                label="Training & mentoring"
                title="Technical Trainer / Programming Mentor"
                organization="Nexbyta Technologies"
                description="Mentored students in Java and Python through hands-on sessions, assessments and guided problem-solving."
              />
              <TimelineEntry
                icon={Braces}
                label="February 2025 – April 2025 · Remote"
                title="Web Development Intern"
                organization="Test Yatra"
                description="Built responsive components with HTML, CSS, JavaScript and React.js; integrated REST APIs and collaborated using Git and GitHub."
              />
              <TimelineEntry
                icon={Cpu}
                label="May 2025 – June 2025"
                title="Telecom Intern"
                organization="BSNL"
                description="Gained exposure to telecommunications infrastructure, networking concepts and practical telecom operations."
              />
            </div>
          </div>
          <div className="journey-column">
            <div className="journey-column-heading">
              <GraduationCap aria-hidden="true" />
              <h3>Education</h3>
            </div>
            <div className="timeline-list">
              <TimelineEntry
                icon={GraduationCap}
                label="2023 – 2027 · Final year"
                title="B.E. Electronics and Communication Engineering"
                organization="Panimalar Engineering College"
                description="CGPA: 8.56 / 10"
              />
              <TimelineEntry
                icon={GraduationCap}
                label="Completed 2023"
                title="Higher Secondary Education"
                organization="Holy Infant Jesus Matriculation Higher Secondary School"
                description="Percentage: 86.6%"
              />
              <div className="education-note">
                <span className="education-note-icon">
                  <Sparkles aria-hidden="true" />
                </span>
                <p>
                  Learning across software, systems, and the ways technology can solve practical
                  problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section id="credentials" className="portfolio-section portfolio-section-alt credentials-section">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="05 / Achievements & credentials"
          title="Practice, learning"
          accent="and recognition"
          description="Coding milestones, certifications and profiles that support my software development journey."
        />
        <div className="credentials-grid">
          <article className="credential-card">
            <span className="fact-label">Achievements</span>
            <h3>Problem solving &amp; recognition</h3>
            <ul>
              <li>Solved 200+ coding problems, primarily using Java.</li>
              <li>Top 60 finalist in the Odoo × SNS Institutions Hackathon. Event year pending confirmation.</li>
              <li>Participated in technical learning programs and mentoring activities.</li>
            </ul>
          </article>
          <article className="credential-card">
            <span className="fact-label">Certifications</span>
            <h3>Technical learning</h3>
            <ul>
              <li>NPTEL – Programming in Java (80% in the latest resume draft).</li>
              <li>Additional technical learning and training programs.</li>
            </ul>
            <p className="credential-note">Certificate images and verification links will be added when available.</p>
          </article>
          <article className="credential-card">
            <span className="fact-label">Coding profiles</span>
            <h3>Practice and problem solving</h3>
            <p>I actively practice arrays, strings, hash maps, stacks, queues, linked lists, heaps, recursion, dynamic programming and searching algorithms.</p>
            <div className="credential-links">
              <Button asChild variant="outline" size="sm">
                <a href={leetcodeUrl} target="_blank" rel="noreferrer">
                  <Code2 aria-hidden="true" /> LeetCode
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={devUrl} target="_blank" rel="noreferrer">
                  <Globe2 aria-hidden="true" /> DEV
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formMessage, setFormMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    if (!result.success) {
      setFormMessage(result.error.issues[0]?.message ?? "Please review the form fields.");
      return;
    }

    setFormMessage("Your message was not sent because email delivery is not connected yet.");
  }

  return (
    <section id="contact" className="portfolio-section portfolio-section-alt contact-section">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="06 / Contact"
          title="Let’s create something"
          accent="meaningful."
          description="Have a project, opportunity, or any query? Feel free to contact me."
        />
        <div className="contact-layout">
          <div className="contact-details">
            <div className="contact-details-intro">
              <span className="contact-icon-large">
                <MessageSquareText aria-hidden="true" />
              </span>
              <div>
                <span className="fact-label">Open to conversations</span>
                <h3>Good work starts with a conversation.</h3>
              </div>
            </div>
            <div className="contact-detail-list">
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <Mail aria-hidden="true" />
                </span>
                <span>
                  <small>Email</small>
                  <strong>
                    <a href={emailUrl}>smaswini006@gmail.com</a>
                  </strong>
                </span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <Phone aria-hidden="true" />
                </span>
                <span>
                  <small>Phone</small>
                  <strong>Not provided</strong>
                </span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <MapPin aria-hidden="true" />
                </span>
                <span>
                  <small>Location</small>
                  <strong>Chennai, Tamil Nadu, India</strong>
                </span>
              </div>
            </div>
            <div className="social-area">
              <p>Find me online</p>
              <div className="social-buttons">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  aria-label="Visit Aswini's GitHub profile"
                >
                  <a href={githubUrl} target="_blank" rel="noreferrer" title="GitHub">
                    <Github aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  aria-label="Visit Aswini's LinkedIn profile"
                >
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" title="LinkedIn">
                    <Linkedin aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  aria-label="Visit Aswini's LeetCode profile"
                >
                  <a href={leetcodeUrl} target="_blank" rel="noreferrer" title="LeetCode">
                    <Code2 aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  aria-label="Visit Aswini's DEV Community profile"
                >
                  <a href={devUrl} target="_blank" rel="noreferrer" title="DEV Community">
                    <Globe2 aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  aria-label="Email Aswini"
                >
                  <a href={emailUrl} title="Email">
                    <Mail aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <small>GitHub · LinkedIn · LeetCode · DEV · Email</small>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-heading">
              <div>
                <span className="fact-label">Send a note</span>
                <h3>Write me a message</h3>
              </div>
              <Send aria-hidden="true" />
            </div>
            <div className="form-grid">
              <label className="form-field">
                <span>Your name</span>
                <Input
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  maxLength={100}
                />
              </label>
              <label className="form-field">
                <span>Your email</span>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={255}
                />
              </label>
              <label className="form-field form-field-full">
                <span>Subject</span>
                <Input
                  name="subject"
                  placeholder="What would you like to discuss?"
                  required
                  maxLength={120}
                />
              </label>
              <label className="form-field form-field-full">
                <span>Your message</span>
                <Textarea
                  name="message"
                  placeholder="Tell me a little about it…"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                />
              </label>
            </div>
            {formMessage ? (
              <p className="form-status" role="status" aria-live="polite">
                {formMessage}
              </p>
            ) : null}
            <Button type="submit" className="primary-action form-submit">
              Send message <ArrowUpRight aria-hidden="true" />
            </Button>
            <p className="form-footnote">
              The form is not connected to email yet; submitting will not send or store your
              details.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-rule" />
      <div className="portfolio-container footer-content">
        <div className="footer-main">
          <a href="#home" className="brand-lockup" aria-label="Aswini S M, back to top">
            <span className="brand-mark">AS</span>
            <span className="brand-name">Aswini S M</span>
          </a>
          <p className="footer-tagline">
            Build <span>·</span> Teach <span>·</span> Develop <span>·</span> Innovate
          </p>
          <nav className="footer-navigation" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-right">
          <a
            className="footer-social-note footer-github-link"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Aswini's GitHub profile"
          >
            <Github aria-hidden="true" />
            GitHub
          </a>
          <a
            className="footer-social-note"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Aswini's LinkedIn profile"
          >
            <Linkedin aria-hidden="true" />
          </a>
          <a
            className="footer-social-note"
            href={leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Aswini's LeetCode profile"
          >
            <Code2 aria-hidden="true" />
          </a>
          <a
            className="footer-social-note"
            href={existingPortfolioUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Aswini's existing portfolio"
          >
            <Globe2 aria-hidden="true" />
          </a>
          <span>© 2026 Aswini. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export function PortfolioPage() {
  return (
    <div className="portfolio-shell">
      <Suspense fallback={<div className="particle-background-fallback" aria-hidden="true" />}>
        <ParticleBackground />
      </Suspense>
      <SmoothScroll />
      <ScrollProgress />
      <MotionEffects />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
