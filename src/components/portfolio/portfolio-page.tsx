import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  Braces,
  BriefcaseBusiness,
  Check,
  Code2,
  Cpu,
  Database,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  {
    title: "Programming languages",
    description: "The languages I use to reason through problems.",
    icon: Code2,
    skills: ["Java", "C", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Web development",
    description: "Building clear, responsive experiences for the web.",
    icon: Layers3,
    skills: ["HTML", "CSS", "React.js", "Tailwind CSS"],
  },
  {
    title: "Backend & tools",
    description: "The tools that support my day-to-day workflow.",
    icon: Database,
    skills: ["Supabase", "Git"],
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(255, "Email is too long."),
  subject: z.string().trim().min(3, "Please add a subject.").max(120, "Subject is too long."),
  message: z.string().trim().min(10, "Please write a message with at least 10 characters.").max(1000, "Message must be 1,000 characters or less."),
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

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".portfolio-section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="portfolio-header">
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

        <div className="hidden lg:block">
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
          <p className="hero-kicker">Software Developer · Programming Trainer</p>
          <h1>
            Hi, I&apos;m <span className="gradient-text">Aswini.</span>
          </h1>
          <p className="hero-description">
            I build clean, responsive web applications with React and Tailwind CSS, and I teach
            programming to help students grow into confident developers.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action">
              <a href="#projects">
                View my work <ArrowDownRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="secondary-action">
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
          <div className="hero-location">
            <MapPin aria-hidden="true" />
            <span>Chennai, Tamil Nadu, India</span>
            <span className="hero-location-divider" aria-hidden="true" />
            <span>Build · Teach · Develop</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Abstract software development workspace illustration">
          <div className="visual-frame-line" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-two" aria-hidden="true" />
          <div className="visual-index" aria-hidden="true">01 / 03</div>
          <div className="hero-code-window">
            <div className="window-chrome">
              <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="window-title">aswini / portfolio.tsx</span>
              <Terminal aria-hidden="true" />
            </div>
            <div className="code-content" aria-hidden="true">
              <div className="code-line"><span>01</span><span className="code-pink">const</span> <span className="code-blue">developer</span> = &#123;</div>
              <div className="code-line code-indent"><span>02</span><span className="code-lilac">build</span>: <span className="code-green">&quot;thoughtful interfaces&quot;</span>,</div>
              <div className="code-line code-indent"><span>03</span><span className="code-lilac">teach</span>: <span className="code-green">&quot;with patience&quot;</span>,</div>
              <div className="code-line code-indent"><span>04</span><span className="code-lilac">learn</span>: <span className="code-green">true</span>,</div>
              <div className="code-line"><span>05</span>&#125;;</div>
              <div className="code-line code-empty"><span>06</span></div>
              <div className="code-line"><span>07</span><span className="code-pink">export default</span> <span className="code-blue">developer</span>;</div>
            </div>
            <div className="window-status"><span><Check aria-hidden="true" /> Ready to build</span><span>UTF-8</span></div>
          </div>

          <div className="visual-note visual-note-top">
            <Sparkles aria-hidden="true" />
            <span>Ideas into interfaces</span>
          </div>
          <div className="visual-note visual-note-bottom">
            <span className="visual-note-icon"><Braces aria-hidden="true" /></span>
            <span><strong>Curious by default</strong><small>Always learning, always building</small></span>
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
        <div className="about-portrait" aria-label="AS monogram illustration; no personal portrait was supplied">
          <div className="portrait-topline"><span>PROFILE / 2026</span><span>CHENNAI, IN</span></div>
          <div className="portrait-monogram" aria-hidden="true">AS<span>.</span></div>
          <div className="portrait-grid-lines" aria-hidden="true" />
          <div className="portrait-caption">
            <span className="portrait-caption-mark"><Code2 aria-hidden="true" /></span>
            <span><strong>Software Developer</strong><small>Developer &amp; programming trainer</small></span>
          </div>
          <span className="portrait-side-label" aria-hidden="true">BUILD WITH INTENTION</span>
        </div>

        <div className="about-copy">
          <SectionHeading eyebrow="A little about me" title="Get to know" accent="me" />
          <p className="about-paragraph">
            I&apos;m Aswini, a final-year engineering student and self-taught frontend developer. I
            enjoy turning ideas into polished, practical web products, and I teach Java, Python and
            C to students.
          </p>
          <p className="about-paragraph">
            I&apos;m currently looking for software development roles where I can keep building and
            learning.
          </p>

          <div className="about-facts">
            <article className="about-fact">
              <span className="fact-icon"><GraduationCap aria-hidden="true" /></span>
              <div><span className="fact-label">Education</span><strong>B.E. Electronics &amp; Communication</strong><small>Panimalar Engineering College</small></div>
            </article>
            <article className="about-fact">
              <span className="fact-icon"><MapPin aria-hidden="true" /></span>
              <div><span className="fact-label">Location</span><strong>Chennai, Tamil Nadu</strong><small>India</small></div>
            </article>
            <article className="about-fact">
              <span className="fact-icon"><Sparkles aria-hidden="true" /></span>
              <div><span className="fact-label">Current focus</span><strong>Frontend development</strong><small>Software engineering</small></div>
            </article>
          </div>

          <div className="about-actions">
            <Button type="button" variant="outline" className="unavailable-action" disabled title="A resume file has not been added yet.">
              <BookOpenText aria-hidden="true" /> Resume not linked
            </Button>
            <Button type="button" variant="ghost" className="text-action" disabled title="A GitHub profile link has not been provided yet.">
              GitHub link pending <ArrowUpRight aria-hidden="true" />
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
          eyebrow="Skills"
          title="Tools I use to"
          accent="build with"
          description="Technologies and tools I use to build real-world applications."
          align="center"
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-card-heading">
                  <span className="skill-group-icon"><Icon aria-hidden="true" /></span>
                  <div><span className="skill-card-index">0{index + 1}</span><h3>{group.title}</h3></div>
                </div>
                <p className="skill-card-description">{group.description}</p>
                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <li key={skill}><span className="skill-dot" aria-hidden="true" />{skill}</li>
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
    <div className="project-preview church-preview" role="img" aria-label="Illustrative placeholder preview for the Church Website project">
      <div className="preview-browser-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>parish / community</span><span className="preview-browser-label">CHURCH WEBSITE</span></div>
      <div className="church-preview-body">
        <div className="church-preview-copy">
          <span className="preview-eyebrow">PARISH COMMUNITY</span>
          <strong>Church<br />Website</strong>
          <span className="church-preview-line" />
          <span className="church-preview-note">Management · Gallery · Announcements</span>
        </div>
        <div className="church-preview-scene" aria-hidden="true">
          <span className="church-scene-sun" />
          <span className="church-scene-ground" />
          <div className="church-building">
            <span className="church-main-roof" />
            <div className="church-tower">
              <span className="church-tower-roof" />
              <span className="church-cross" />
              <span className="church-tower-window" />
            </div>
            <span className="church-windows"><i /><i /><i /></span>
            <span className="church-door" />
          </div>
        </div>
      </div>
      <span className="preview-corner-code">ILLUSTRATIVE PREVIEW</span>
    </div>
  );
}

function PrPowerPreview() {
  return (
    <div className="project-preview pr-power-preview" role="img" aria-label="Illustrative placeholder preview for PR Power; project details are pending">
      <div className="preview-browser-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>pr-power / project</span><span className="preview-browser-label">PREVIEW</span></div>
      <div className="pr-power-preview-body">
        <div className="pr-power-preview-panel">
          <span className="preview-eyebrow">PROJECT PREVIEW</span>
          <span className="pr-power-monogram" aria-hidden="true">PR</span>
          <strong>PR Power</strong>
          <span className="pr-power-pending">Project preview pending</span>
        </div>
      </div>
      <span className="preview-corner-code">DETAILS PENDING</span>
    </div>
  );
}

function ProjectCard({
  number,
  title,
  description,
  technologies,
  preview,
}: {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  preview: "church" | "pr-power";
}) {
  return (
    <article className="project-card">
      {preview === "church" ? <ChurchWebsitePreview /> : <PrPowerPreview />}
      <div className="project-content">
        <div className="project-title-row"><span className="project-number">{number}</span><h3>{title}</h3></div>
        <p className="project-description">{description}</p>
        <ul className="project-tags" aria-label="Technologies">
          {technologies.length > 0 ? technologies.map((technology) => <li key={technology}>{technology}</li>) : <li>Technologies to be provided</li>}
        </ul>
        <div className="project-actions">
          <Button type="button" size="sm" className="project-link-button" disabled aria-label="Live Demo URL not provided yet" title="A live project URL has not been provided yet.">
            Live Demo <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button type="button" size="sm" variant="outline" className="project-github-button" disabled aria-label="GitHub URL not provided yet" title="A repository URL has not been provided yet.">
            <Github aria-hidden="true" /> GitHub
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section portfolio-section-alt">
      <div className="portfolio-container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="Projects"
            title="My"
            accent="Projects"
            description="A few real-world projects I’ve built."
          />
          <span className="projects-count"><span>02</span> featured projects</span>
        </div>
        <div className="projects-grid">
          <ProjectCard
            number="01"
            title="Church Website"
            description="A full-stack web application for parish management, gallery, announcements and administrative management."
            technologies={["React.js", "Node.js", "MongoDB", "Cloudinary"]}
            preview="church"
          />
          <ProjectCard
            number="02"
            title="PR Power"
            description="Description to be provided."
            technologies={[]}
            preview="pr-power"
          />
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
      <div className="timeline-entry-top"><span>{label}</span><Icon aria-hidden="true" /></div>
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
        <SectionHeading eyebrow="The path so far" title="Experience &" accent="education" description="The work and learning shaping how I build." />
        <div className="journey-grid">
          <div className="journey-column">
            <div className="journey-column-heading"><BriefcaseBusiness aria-hidden="true" /><h3>Experience</h3></div>
            <div className="timeline-list">
              <TimelineEntry
                icon={BookOpenText}
                label="Teaching"
                title="Programming Trainer"
                organization="Nexbyta Technologies"
                description="Teaching Python, Java and C to students, with a focus on fundamentals and hands-on practice."
              />
              <TimelineEntry
                icon={Cpu}
                label="Internship"
                title="AI-focused internship"
                organization="MetaTaaraka AI Innovations · NEXORA project"
                description="Worked on the NEXORA project during an AI-focused internship."
              />
            </div>
          </div>
          <div className="journey-column">
            <div className="journey-column-heading"><GraduationCap aria-hidden="true" /><h3>Education</h3></div>
            <div className="timeline-list">
              <TimelineEntry
                icon={GraduationCap}
                label="2023 – 2027 · Final year"
                title="B.E. Electronics and Communication Engineering"
                organization="Panimalar Engineering College"
                description="CGPA: 8.55 / 10"
              />
              <div className="education-note"><span className="education-note-icon"><Sparkles aria-hidden="true" /></span><p>Learning across software, systems, and the ways technology can solve practical problems.</p></div>
            </div>
          </div>
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
          eyebrow="Contact"
          title="Get in"
          accent="touch"
          description="Have a project, opportunity, or any query? Feel free to contact me."
          align="center"
        />
        <div className="contact-layout">
          <div className="contact-details">
            <div className="contact-details-intro">
              <span className="contact-icon-large"><MessageSquareText aria-hidden="true" /></span>
              <div><span className="fact-label">Open to conversations</span><h3>Let&apos;s connect.</h3></div>
            </div>
            <div className="contact-detail-list">
              <div className="contact-detail"><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><span><small>Email</small><strong>Email not configured yet</strong></span></div>
              <div className="contact-detail"><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><span><small>Phone</small><strong>Not provided</strong></span></div>
              <div className="contact-detail"><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><span><small>Location</small><strong>Chennai, Tamil Nadu, India</strong></span></div>
            </div>
            <div className="social-area">
              <p>Find me online</p>
              <div className="social-buttons">
                <Button type="button" variant="outline" size="icon" disabled aria-label="GitHub profile link not configured"><Github aria-hidden="true" /></Button>
                <Button type="button" variant="outline" size="icon" disabled aria-label="LinkedIn profile link not configured"><Linkedin aria-hidden="true" /></Button>
              </div>
              <small>Profile links will appear once added.</small>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-heading"><div><span className="fact-label">Send a note</span><h3>Write me a message</h3></div><Send aria-hidden="true" /></div>
            <div className="form-grid">
              <label className="form-field"><span>Your name</span><Input name="name" autoComplete="name" placeholder="Name" required maxLength={100} /></label>
              <label className="form-field"><span>Your email</span><Input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={255} /></label>
              <label className="form-field form-field-full"><span>Subject</span><Input name="subject" placeholder="What would you like to discuss?" required maxLength={120} /></label>
              <label className="form-field form-field-full"><span>Your message</span><Textarea name="message" placeholder="Tell me a little about it…" required minLength={10} maxLength={1000} rows={5} /></label>
            </div>
            {formMessage ? <p className="form-status" role="status" aria-live="polite">{formMessage}</p> : null}
            <Button type="submit" className="primary-action form-submit">
              Send message <ArrowUpRight aria-hidden="true" />
            </Button>
            <p className="form-footnote">The form is not connected to email yet; submitting will not send or store your details.</p>
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
        <a href="#home" className="brand-lockup" aria-label="Aswini S M, back to top">
          <span className="brand-mark">AS</span>
          <span className="brand-name">Aswini S M</span>
        </a>
        <p className="footer-tagline">Build <span>·</span> Teach <span>·</span> Develop <span>·</span> Innovate</p>
        <div className="footer-right"><span>© 2026 Aswini. All rights reserved.</span><div className="footer-socials"><Github aria-label="GitHub profile link not configured" /><Linkedin aria-label="LinkedIn profile link not configured" /></div></div>
      </div>
    </footer>
  );
}

export function PortfolioPage() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}