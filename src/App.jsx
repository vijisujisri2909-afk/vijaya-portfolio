import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import constructionFallback from "./assets/project-const.png";
import tastyBitesFallback from "./assets/project-tasty.svg";
import weddingFallback from "./assets/project-wedding.png";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  BriefcaseBusiness,
  Building2,
  Check,
  Clipboard,
  Cloud,
  Code2,
  Database,
  FileCode2,
  FileText,
  GitBranch,
  Globe,
  Menu,
  Monitor,
  Palette,
  PlugZap,
  Send,
  Server,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import portrait from "./VIJI PHOTO.png";
import Resume from "./Resume.jsx";
import "./App.css";

const NAV_LINKS = [
  { label: "Home", href: "#home", page: "home" },
  { label: "About", href: "#about", page: "home" },
  { label: "Skills", href: "#skills", page: "home" },
  { label: "Projects", href: "#projects", page: "home" },
  { label: "Resume", href: "#resume", page: "resume" },
  { label: "CONTACT", href: "#contact", page: "contact" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vijaya-parvathi-ba3823442",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/vijisujisri2909-afk",
    icon: FaGithub,
  },
];

const HERO_ROLES = ["Frontend Developer", "React.js Developer", "UI/UX Enthusiast", "Figma to Code Expert"];

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: FileCode2 },
      { name: "JavaScript", icon: Braces },
      { name: "HTML5", icon: Code2 },
      { name: "CSS3", icon: Palette },
      { name: "Tailwind CSS", icon: Palette },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "GSAP", icon: Sparkles },
      { name: "Figma", icon: Palette },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: FaGithub },
      { name: "Vercel", icon: Cloud },
      { name: "Responsive Design", icon: Monitor },
      { name: "REST APIs", icon: PlugZap },
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Server },
      { name: "MongoDB", icon: Database },
    ],
  },
];

const PROJECTS = [
  {
    id: "construction",
    icon: Building2,
    number: "01",
    title: "Construction Company Website",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
    fallbackImage: constructionFallback,
    text: "A professional multi-section corporate web platform with interactive project galleries, VR architectural views, services, banking partners, and client inquiry forms.",
    tags: ["React", "CSS", "Vite", "Responsive UI"],
    desktopFolder: "Desktop / const-webpage",
    route: "/projects/construction",
  },
  {
    id: "tasty-bites",
    icon: Utensils,
    number: "02",
    title: "Tasty Bites - Restaurant Website",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    fallbackImage: tastyBitesFallback,
    text: "A responsive restaurant landing page and food blog featuring dynamic menu filtering in JavaScript, mouthwatering dish showcases, food gallery, and online ordering UI.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    desktopFolder: "Desktop / PROJECT2 TASTY BITES",
    route: "/projects/tasty-bites",
  },
  {
    id: "wedding-invitation",
    icon: Sparkles,
    number: "03",
    title: "Wedding Invitation Website",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500",
    fallbackImage: weddingFallback,
    text: "An elegant digital wedding invitation platform featuring interactive card collections, live countdown timer, event schedule timeline, and guest RSVP functionality.",
    tags: ["React", "CSS", "Lucide Icons", "Animations"],
    desktopFolder: "Desktop / WEDDING INVITATION",
    route: "/projects/wedding-invitation",
  },
  {
    icon: BriefcaseBusiness,
    number: "04",
    title: "Student Management System",
    text: "An academic project exploring student record management, organized data fields, and clear information presentation.",
    tags: ["HTML5", "CSS3", "JavaScript", "Student Records"],
    desktopFolder: "Old portfolio HTML",
  },
  {
    id: "vetri",
    icon: Globe,
    number: "05",
    title: "Vetri Project",
    image: "/vetri-site/images/Background-1.png",
    text: "A responsive company website presenting Vetri IT Solutions' services, team, process, and digital products.",
    tags: ["React", "Responsive UI", "Web Development"],
    desktopFolder: "Vetri workspace",
    route: "/vetri",
    preview: "/vetri-site/index.html",
  },
  {
    id: "old-photo-portfolio",
    icon: Palette,
    number: "06",
    title: "Old Photo Portfolio (HTML)",
    image: "/old-photo-portfolio/VIJI%20PHOTO.png",
    text: "An earlier HTML portfolio showcasing photo-led work and a visual approach to presenting projects.",
    tags: ["HTML", "CSS", "Portfolio"],
    desktopFolder: "Old portfolio HTML",
    route: "/old-photo-portfolio",
    preview: "/old-photo-portfolio/site.html",
  },
];

const SKILL_LEVELS = {
  React: 86,
  "Next.js": 70,
  JavaScript: 88,
  TypeScript: 64,
  HTML5: 94,
  CSS3: 91,
  "Tailwind CSS": 85,
  GSAP: 72,
  Figma: 78,
  Git: 80,
  GitHub: 84,
  Vercel: 76,
  "Responsive Design": 92,
  "REST APIs": 74,
  "Node.js": 68,
  Express: 66,
  MongoDB: 63,
};

const SKILLS = SKILL_CATEGORIES.flatMap(({ title, skills }) =>
  skills.map((skill) => ({
    ...skill,
    category: title,
    level: SKILL_LEVELS[skill.name],
  })),
);

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function splitDescription(text) {
  const words = text.split(/\s+/);
  const lines = [];
  for (let index = 0; index < words.length; index += 9) {
    lines.push(words.slice(index, index + 9).join(" "));
  }
  return lines;
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.div
      className="section-heading"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="section-kicker">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </motion.div>
  );
}

function Navbar({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLinkClick = (item) => {
    closeMenu();
    if (item.page === "resume") {
      onNavigate("resume");
    } else {
      onNavigate("home", item.href);
    }
  };

  return (
    <header className="site-header">
      <button
        className="wordmark wordmark-btn"
        type="button"
        onClick={() => {
          closeMenu();
          onNavigate("home", "#home");
        }}
        aria-label="Viji, home"
      >
        viji<span>.</span>
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
        {NAV_LINKS.map((item) => {
          const isActive =
            (item.page === "resume" && currentPage === "resume") ||
            (item.page === "home" && currentPage === "home" && item.href === "#home");
          return (
            <button
              key={item.label}
              type="button"
              className={`nav-link-btn ${isActive ? "is-active" : ""}`}
              onClick={() => handleLinkClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = HERO_ROLES[roleIndex];
    const delay = !deleting && text === role ? 2000 : deleting && !text ? 300 : deleting ? 40 : 85;
    const timeout = window.setTimeout(() => {
      if (!deleting && text === role) {
        setDeleting(true);
      } else if (deleting && !text) {
        setDeleting(false);
        setRoleIndex((current) => (current + 1) % HERO_ROLES.length);
      } else {
        setText((current) => (deleting ? current.slice(0, -1) : role.slice(0, current.length + 1)));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, roleIndex, text]);

  return <span className="typewriter-text" aria-label={HERO_ROLES[roleIndex]}>{text}<span className="typewriter-cursor">|</span></span>;
}

function HeroParticles({ className = "hero-particles" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.00012,
      speedY: (Math.random() - 0.5) * 0.00012,
      opacity: Math.random() * 0.45 + 0.2,
    }));
    let frameId;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x = (particle.x + particle.speedX + 1) % 1;
        particle.y = (particle.y + particle.speedY + 1) % 1;
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(147, 197, 253, ${particle.opacity})`;
        context.fill();
      });
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}

function SocialLinks({ className = "" }) {
  const [rippleIndex, setRippleIndex] = useState(-1);
  const rippleTimeout = useRef(null);

  useEffect(() => () => window.clearTimeout(rippleTimeout.current), []);

  const handleClick = (index) => {
    setRippleIndex(index);
    window.clearTimeout(rippleTimeout.current);
    rippleTimeout.current = window.setTimeout(() => setRippleIndex(-1), 550);
  };

  return (
    <div className={`social-icon-links ${className}`}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }, index) => (
        <a
          className={`social-icon-link${rippleIndex === index ? " is-rippling" : ""}`}
          href={href}
          key={label}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${label} in a new tab`}
          title={`Visit ${label}`}
          onClick={() => handleClick(index)}
        >
          <Icon aria-hidden="true" />
          <span className="social-tooltip">Visit {label}</span>
          <span className="social-ripple" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function Hero({ onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const roleY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-dots" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span className="hero-dot" key={index} />
        ))}
      </div>
      <HeroParticles />
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
        }}
      >
        <motion.p className="eyebrow" variants={reveal}>
          <span className="status-dot" />
          HELLO, I&apos;M
        </motion.p>
        <motion.h1 variants={reveal}>
          <span className="hero-name" aria-label="VIJAYA PARVATHI">
            {"VIJAYA PARVATHI".split("").map((letter, index) => (
              <motion.span
                className={`hero-name-letter${letter === " " ? " is-space" : ""}`}
                key={`${letter}-${index}`}
                aria-hidden="true"
                initial={{ opacity: 0, y: 72, scale: 0.72 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 440, damping: 11, delay: 0.15 + index * 0.1 }}
                whileHover={letter === " " ? undefined : { y: [-2, -13, 3, 0], rotate: [0, -5, 4, 0], transition: { duration: 0.55 } }}
              >
                {letter === " " ? "\u00a0" : letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        <motion.div className="hero-role" style={{ y: roleY }} variants={reveal}>
          <TypingRole />
        </motion.div>
        <motion.p className="hero-description" variants={reveal}>
          Passionate about React.js, JavaScript, and responsive design. Turning
          creative Figma ideas into fast, accessible, and delightful digital
          experiences.
        </motion.p>
        <motion.div variants={reveal}>
          <SocialLinks className="hero-social-links" />
        </motion.div>
        <motion.div className="hero-actions" variants={reveal}>
          <button
            className="button button-primary"
            type="button"
            onClick={() => onNavigate("home", "#projects")}
          >
            Explore my work <ArrowDownRight size={17} />
          </button>
          <button
            className="button button-resume"
            type="button"
            onClick={() => onNavigate("resume")}
            title="Navigate to dedicated resume page"
          >
            <FileText size={16} />
            <span>View Resume</span>
          </button>
        </motion.div>
        <motion.div className="hero-note" variants={reveal}>
          <span className="note-line" />
          Detail-oriented code. High-performance design. Constant learning.
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
          event.currentTarget.style.setProperty("--photo-x", `${x}px`);
          event.currentTarget.style.setProperty("--photo-y", `${y}px`);
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--photo-x", "0px");
          event.currentTarget.style.setProperty("--photo-y", "0px");
        }}
        initial={{ opacity: 0, scale: 0.9, x: 25 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
      >
        <div className="visual-orbit orbit-one" aria-hidden="true" />
        <div className="visual-orbit orbit-two" aria-hidden="true" />
        <div className="portrait-frame">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-ring">
            <img className="portrait" src={portrait} alt="G. Vijaya Parvathi" />
          </div>
        </div>
        <div
          className="floating-card cursor-pointer"
          onClick={() => onNavigate("resume")}
          role="button"
          tabIndex={0}
        >
          <Sparkles className="sparkle" size={17} />
          <span>Click to view my Resume 📄</span>
        </div>
      </motion.div>
      <button
        className="scroll-cue nav-link-btn"
        type="button"
        onClick={() => onNavigate("home", "#about")}
      >
        <span className="scroll-dot" />
        SCROLL TO EXPLORE
        <ArrowDown size={13} />
      </button>
    </section>
  );
}

function About({ onNavigate }) {
  return (
    <section id="about" className="content-section about-section">
      <div className="section-content about-layout">
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -35, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="about-photo-orbit about-orbit-one" aria-hidden="true" />
          <div className="about-photo-orbit about-orbit-two" aria-hidden="true" />
          <div className="about-photo-frame">
            <div className="about-photo-glow" aria-hidden="true" />
            <img className="about-photo" src={portrait} alt="Vijaya Parvathi" />
          </div>
          <span className="about-photo-caption">
            <Sparkles size={15} />
            A little about me
          </span>
        </motion.div>

        <motion.div
          className="about-copy"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
          }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.span className="section-kicker" variants={reveal}>
            A LITTLE ABOUT ME
          </motion.span>
          <motion.h2 variants={reveal}>Curiosity is my favorite tool.</motion.h2>
          <motion.p className="about-paragraph" variants={reveal}>
            I&apos;m <strong>G. Vijaya Parvathi</strong>, a Frontend Developer
            from Tamil Nadu skilled in <strong>React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap 5,</strong> and{" "}
            <strong>Tailwind CSS</strong>, with working knowledge of Python, Django, and REST APIs.
          </motion.p>
          <motion.p className="about-paragraph" variants={reveal}>
            I have built five responsive, user-focused websites, including a commercial construction firm portal, an interactive restaurant web app, an animated digital wedding platform, a student management system, and a company website. I love converting Figma designs into clean, maintainable code and building mobile-first interfaces.
          </motion.p>

          <motion.div className="about-highlight" variants={reveal}>
            <span className="highlight-icon">
              <Code2 size={22} />
            </span>
            <p>
              My goal is simple: build web applications that are{" "}
              <strong>welcoming, useful, fast, and accessible</strong> to everyone.
              Seeking an entry-level Frontend Developer or Full Stack Developer role to build high-quality software.
            </p>
          </motion.div>

          <motion.div className="about-details" variants={reveal}>
            <div>
              <h3>Education</h3>
              <p>B.A. in English · CGPA: 8.5 / 10</p>
              <span>Manonmaniam Sundaranar University (HSC CS 80%)</span>
            </div>
            <div>
              <h3>Resume &amp; Toolkit</h3>
              <p>React.js, JavaScript, Tailwind, Bootstrap, Python</p>
              <button
                type="button"
                className="about-resume-btn"
                onClick={() => onNavigate("resume")}
              >
                <FileText size={14} />
                <span>View Complete Resume ↗</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleSkills = SKILLS.filter((skill) => (
    activeFilter === "All" || skill.category === activeFilter
  ));

  return (
    <section className="content-section skills-section" id="skills">
      <div className="section-content">
        <SectionHeading eyebrow="WHAT I WORK WITH" title="Tools for thoughtful experiences.">
          I bring ideas together with modern frontend technologies and a love of craftsmanship.
        </SectionHeading>
        <div className="skill-filters" role="group" aria-label="Filter skills">
          {["All", "Frontend", "Tools"].map((filter) => (
            <button
              className={`skill-filter${activeFilter === filter ? " is-active" : ""}`}
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <motion.div
          className="skill-grid"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map(({ name, icon: Icon, category, level }, index) => (
              <motion.article
                className="skill-card"
                key={name}
                layout
                initial={{ opacity: 0, rotateX: 90, y: 18 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -35, y: -8 }}
                transition={{ duration: 0.48, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.12 }}
                whileHover={{ y: -7, rotateX: 4, rotateY: -3, transition: { duration: 0.2 } }}
                style={{ transformPerspective: 750, "--skill-level": `${level}%` }}
              >
                <div className="skill-card-heading">
                  <motion.span
                    className="skill-icon-float"
                    animate={{ y: [0, -3, 0] }}
                    whileHover={{ y: [0, -7, 0], transition: { duration: 0.35 } }}
                    transition={{ duration: 3 + (index % 4) * 0.35, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="skill-icon-glyph"><Icon size={20} aria-hidden="true" /></span>
                  </motion.span>
                  <span className="skill-category-label">{category}</span>
                  <span className="skill-progress-circle" role="img" aria-label={`${name}: ${level}%`}>
                    <span>{level}%</span>
                  </span>
                </div>
                <h3>{name}</h3>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Projects({ onOpenProject }) {
  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-content">
        <SectionHeading eyebrow="SELECTED WORK · 6 PROJECTS" title="Projects from my desktop &amp; portfolio.">
          Six projects built with React, JavaScript, modern styling frameworks, and clean code.
        </SectionHeading>
        <motion.div
          className="project-grid"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PROJECTS.map(({ id, icon: Icon, number, title, text, tags, desktopFolder, link, route, image, fallbackImage }) => (
            <motion.article
              className={`project-card${link || route ? " is-clickable" : ""}${image ? " has-image" : ""}`}
              key={number}
              variants={reveal}
              whileHover={{ y: -7, transition: { duration: 0.2 } }}
              onClick={link ? () => onOpenProject({ title, link }) : undefined}
              role={link ? "link" : undefined}
              tabIndex={link ? 0 : undefined}
              onKeyDown={link ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenProject({ title, link });
                }
              } : undefined}
              aria-label={link ? `Preview ${title}` : undefined}
            >
              <span className="project-number">{number}</span>
              {link && <button
                className="project-arrow nav-link-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProject({ title, link });
                }}
                title={`Preview ${title}`}
                aria-label={`Preview ${title}`}
              >
                <ArrowUpRight size={19} />
              </button>}
              {image && (
                <div className="project-image-wrap">
                  <img
                    className="project-image w-full h-56 object-cover"
                    src={image}
                    alt={title}
                    loading="eager"
                    decoding="async"
                    onError={(event) => {
                      if (fallbackImage && !event.currentTarget.dataset.fallback) {
                        event.currentTarget.dataset.fallback = "true";
                        event.currentTarget.src = fallbackImage;
                      }
                    }}
                  />
                  {(link || route) && (
                    <span className="project-image-overlay">
                      <span className="project-overlay-button">View Project <ArrowUpRight size={15} /></span>
                    </span>
                  )}
                </div>
              )}
              {!image && <span className="project-icon"><Icon size={22} /></span>}
              <h3>{title}</h3>
              <span className="project-source-badge">{desktopFolder}</span>
              <motion.div
                className="project-description"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {splitDescription(text).map((line, lineIndex) => (
                  <motion.span
                    className="project-description-line"
                    key={`${number}-${lineIndex}`}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
              <div className="project-tags">
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {(link || route) && <div className="project-card-actions">
                {route ? (
                  <Link className="project-live-btn" to={id ? `/project/${id}` : route} onClick={(event) => event.stopPropagation()}>
                    <span>View Project</span>
                    <ArrowUpRight size={15} />
                  </Link>
                ) : <button
                  type="button"
                  className="project-live-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProject({ title, link });
                  }}
                  title={`Preview ${title}`}
                  aria-label={`Preview ${title}`}
                >
                  <span>View Project</span>
                  <ArrowUpRight size={15} />
                </button>}
              </div>}
              {route && (
                <Link className="project-card-route-link" to={id ? `/project/${id}` : route} aria-label={`Open ${title}`}>
                  <span className="visually-hidden">Open {title}</span>
                </Link>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectPreview({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="project-preview-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="project-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} live preview`}
        initial={{ opacity: 0, scale: 0.78, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.86, y: 18 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-preview-header">
          <div>
            <span className="section-kicker">LIVE PROJECT</span>
            <h2>{project.title}</h2>
          </div>
          <button className="project-preview-close" type="button" onClick={onClose} aria-label="Close project preview">
            <X size={20} />
          </button>
        </div>
        <iframe className="project-preview-frame" src={project.link} title={`${project.title} live website`} />
      </motion.section>
    </motion.div>
  );
}

const PROJECT_PAGES = {
  "/projects/construction": {
    title: "Construction Company Website",
    eyebrow: "CONSTRUCTION WEBSITE",
    description: "A professional multi-section corporate web platform with interactive project galleries, VR architectural views, services, banking partners, and client inquiry forms.",
    tags: ["React", "CSS", "Vite", "Responsive UI"],
    preview: "/construction/index.html",
  },
  "/projects/tasty-bites": {
    title: "Tasty Bites - Restaurant Website",
    eyebrow: "RESTAURANT WEBSITE",
    description: "A responsive restaurant landing page and food blog featuring dynamic menu filtering in JavaScript, food galleries, and online ordering UI.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    preview: "/tasty-bites/index.html",
  },
  "/projects/wedding-invitation": {
    title: "Wedding Invitation Website",
    eyebrow: "WEDDING INVITATION",
    description: "An elegant digital wedding invitation platform featuring interactive card collections, a live countdown timer, event schedule timeline, and guest RSVP functionality.",
    tags: ["React", "CSS", "Lucide Icons", "Animations"],
    preview: "/wedding/index.html",
  },
  "/vetri": {
    title: "Vetri Project",
    eyebrow: "COMPANY WEBSITE",
    description: "A responsive company website presenting Vetri IT Solutions' services, team, process, and digital products.",
    tags: ["React", "Responsive UI", "Web Development"],
    preview: "/vetri-site/index.html",
  },
  "/old-photo-portfolio": {
    title: "Old Photo Portfolio (HTML)",
    eyebrow: "EARLIER PORTFOLIO",
    description: "An earlier HTML portfolio concept focused on photography, image-led storytelling, and presenting selected work.",
    tags: ["HTML", "CSS", "Portfolio"],
    preview: "/old-photo-portfolio/site.html",
  },
};

function ProjectDetail({ project, onBack, onNavigate }) {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return undefined;
    let context;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !pageRef.current) return;
      context = gsap.context(() => {
        gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
      }, pageRef);
    });
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [project]);

  return (
    <main className="project-detail-page" ref={pageRef}>
      <section className="project-detail-card">
        <span className="section-kicker">{project.eyebrow}</span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <iframe className="project-detail-preview" src={project.preview} title={`${project.title} preview`} />
        <div className="project-detail-actions">
          <button className="button button-primary" type="button" onClick={onBack}>
            <ArrowRight className="back-arrow" size={16} /> Back to projects
          </button>
          <button className="button button-resume" type="button" onClick={() => onNavigate("home", "#contact")}>
            Contact me <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function Contact({ onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const contactRef = useRef(null);
  const contactCopyRef = useRef(null);
  const contactFormRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const contactSection = contactRef.current;
    const copy = contactCopyRef.current;
    const contactForm = contactFormRef.current;
    if (!contactSection || !copy || !contactForm) return undefined;

    let observer;
    let cancelled = false;
    let gsap;

    import("gsap").then((module) => {
      if (cancelled) return;
      gsap = module.gsap;

      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        gsap.fromTo(
          copy,
          { autoAlpha: 0, x: -42 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" },
        );
        gsap.fromTo(
          contactForm,
          { autoAlpha: 0, x: 42 },
          { autoAlpha: 1, x: 0, duration: 0.8, delay: 0.12, ease: "power3.out" },
        );
      }, { threshold: 0.12 });
      observer.observe(contactSection);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (gsap) {
        gsap.killTweensOf([copy, contactForm]);
        gsap.set([copy, contactForm], { clearProps: "all" });
      }
    };
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimeoutRef.current), []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("vijisujisri2909@gmail.com");
      setEmailCopied(true);
      window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setFormStatus({
        type: "error",
        message: "Could not copy the email. Please copy it directly from the link.",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint || endpoint === "https://formspree.io/f/your-form-id") {
      window.alert("Message sent!");
      setFormStatus({ type: "success", message: "Message sent!" });
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      window.alert("Message sent!");
      setFormStatus({ type: "success", message: "Message sent!" });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormStatus({
        type: "error",
        message: "Your message could not be sent. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      <div className="contact-glow" aria-hidden="true" />
      <HeroParticles className="contact-particles" />
      <div className="contact-inner">
        <div
          className="contact-copy"
          ref={contactCopyRef}
        >
          <span className="section-kicker">HAVE SOMETHING IN MIND?</span>
          <h2>Let&apos;s make it happen.</h2>
          <p>
            I&apos;d love to connect with teams and discuss Frontend Developer
            opportunities, projects, or collaborations.
          </p>
          <a className="contact-email-link" href="mailto:vijisujisri2909@gmail.com">
            vijisujisri2909@gmail.com
          </a>
          <button
            className={`contact-copy-button${emailCopied ? " is-copied" : ""}`}
            type="button"
            onClick={handleCopyEmail}
            aria-label={emailCopied ? "Email copied" : "Copy email address"}
          >
            {emailCopied ? <Check size={15} /> : <Clipboard size={15} />}
            <span className="contact-copy-tooltip" role="status">
              {emailCopied ? "Copied!" : "Copy email"}
            </span>
          </button>
          <SocialLinks className="contact-social-links" />
          <div className="contact-quick-actions">
            <button
              type="button"
              className="button button-resume"
              onClick={() => onNavigate("resume")}
            >
              <FileText size={16} />
              <span>Explore My Full Resume</span>
            </button>
          </div>
        </div>
        <form
          className="contact-form"
          ref={contactFormRef}
          onSubmit={handleSubmit}
        >
          {formStatus && (
            <div className={`contact-status-msg is-${formStatus.type}`} role="status" aria-live="polite">
              {formStatus.type === "success" ? <Check size={16} /> : <X size={16} />}
              <span>{formStatus.message}</span>
            </div>
          )}
          <label>
            <span>Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </label>
          <label>
            <span>Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          <label>
            <span>Your message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me a little about your project or opportunity..."
              rows={4}
              minLength={10}
              maxLength={5000}
              required
            />
          </label>
          <button
            className="button button-primary contact-submit-button"
            type="submit"
            disabled={isSubmitting}
            onPointerMove={(event) => {
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
              const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
              event.currentTarget.style.translate = `${x}px ${y}px`;
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.translate = "";
            }}
          >
            {isSubmitting ? "Sending..." : "Send message"} <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <button
        className="wordmark wordmark-btn"
        type="button"
        onClick={() => onNavigate("home", "#home")}
      >
        viji<span>.</span>
      </button>
      <p>Designed &amp; built with care by Vijaya Parvathi · 2026</p>
      <div className="footer-links">
        <SocialLinks className="footer-social-links" />
        <button
          className="nav-link-btn"
          type="button"
          onClick={() => onNavigate("resume")}
          title="Resume"
        >
          <FileText size={18} />
        </button>
        <button
          className="nav-link-btn"
          type="button"
          onClick={() => onNavigate("home", "#projects")}
          title="Projects"
        >
          <Code2 size={18} />
        </button>
        <button
          className="nav-link-btn"
          type="button"
          onClick={() => onNavigate("home", "#contact")}
          title="Contact"
        >
          <Send size={17} />
        </button>
        <button
          className="nav-link-btn"
          type="button"
          onClick={() => onNavigate("home", "#home")}
          title="Back to top"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </footer>
  );
}

function Portfolio() {
  const lenisRef = useRef(null);
  const portfolioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = ["#resume", "#/resume"].includes(location.hash.toLowerCase()) ? "resume" : "home";
  const [activeProject, setActiveProject] = useState(null);
  const projectId = location.pathname.startsWith("/project/")
    ? location.pathname.slice("/project/".length)
    : null;
  const projectPage = PROJECT_PAGES[location.pathname]
    || (projectId ? PROJECT_PAGES[`/projects/${projectId}`] || PROJECT_PAGES[`/${projectId}`] : null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = portfolioRef.current;
    if (!root) return undefined;

    const handlePointerMove = (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = event.target.closest?.(".social-icon-link");
      if (!target || !root.contains(target)) return;
      const bounds = target.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };

    const resetMagnet = (event) => {
      const target = event.target.closest?.(".social-icon-link");
      if (target && !target.contains(event.relatedTarget)) target.style.translate = "";
    };

    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("pointerout", resetMagnet);
    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerout", resetMagnet);
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.toLowerCase();
    if (hash === "#resume" || hash === "#/resume") {
      lenisRef.current?.scrollTo(0, { duration: 0.8 });
      return;
    }

    if (!hash || location.pathname !== "/") return;
    const timeout = window.setTimeout(() => {
      if (hash === "#contact") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const target = document.getElementById(hash.slice(1));
      if (target) lenisRef.current?.scrollTo(target, { offset: -82, duration: 1 });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [location]);

  const navigateTo = (page, targetHash = null) => {
    if (page === "resume") {
      navigate({ pathname: "/", hash: "#resume" });
      lenisRef.current?.scrollTo(0, { duration: 0.8 });
    } else {
      navigate({ pathname: "/", hash: targetHash || "#home" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio" ref={portfolioRef}>
        <motion.div
          className="portfolio-shell"
          animate={{ scale: activeProject ? 0.97 : 1, opacity: activeProject ? 0.62 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          {projectPage ? (
            <ProjectDetail
              project={projectPage}
              onBack={() => navigateTo("home", "#projects")}
              onNavigate={navigateTo}
            />
          ) : currentPage === "resume" ? (
            <Resume onBack={() => navigateTo("home", "#home")} />
          ) : (
            <main>
              <Hero onNavigate={navigateTo} />
              <About onNavigate={navigateTo} />
              <Skills />
              <Projects onOpenProject={setActiveProject} />
              <Contact onNavigate={navigateTo} />
            </main>
          )}

          <Footer onNavigate={navigateTo} />
        </motion.div>
        <AnimatePresence>
          {activeProject && (
            <ProjectPreview
              key={activeProject.link}
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/construction" element={<Portfolio />} />
        <Route path="/projects/tasty-bites" element={<Portfolio />} />
        <Route path="/projects/wedding-invitation" element={<Portfolio />} />
        <Route path="/project/:id" element={<Portfolio />} />
        <Route path="/vetri" element={<Portfolio />} />
        <Route path="/old-photo-portfolio" element={<Portfolio />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
