import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Printer,
  ExternalLink,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  Sparkles,
  Code2,
  Check,
  FileText,
  Mail,
  MapPin,
  Globe,
  Languages,
  Calendar,
  Layers,
} from "lucide-react";
import "./Resume.css";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Resume({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page">
      {/* Background accents */}
      <div className="resume-glow resume-glow-1" aria-hidden="true" />
      <div className="resume-glow resume-glow-2" aria-hidden="true" />

      {/* Top action header bar */}
      <div className="resume-action-bar no-print">
        <button
          className="resume-btn resume-btn-back"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={18} />
          <span>Back to Portfolio</span>
        </button>

        <div className="resume-bar-right">
          <button
            className="resume-btn resume-btn-secondary"
            onClick={handlePrint}
            type="button"
            title="Print or save as PDF"
          >
            <Printer size={17} />
            <span>Print / PDF</span>
          </button>
          <a
            className="resume-btn resume-btn-primary"
            href="./VIJI RESUME3.rtf"
            download="VIJI RESUME3.rtf"
          >
            <Download size={17} />
            <span>Download Resume (.rtf)</span>
          </a>
        </div>
      </div>

      {/* Resume Document Container */}
      <motion.article
        className="resume-sheet"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Candidate Header */}
        <motion.header className="resume-header" variants={reveal}>
          <div className="resume-title-wrap">
            <span className="resume-badge">
              <Sparkles size={14} /> CURRICULUM VITAE
            </span>
            <h1 className="resume-name">G. VIJAYA PARVATHI</h1>
            <p className="resume-role">
              Frontend Developer <span className="sep">•</span> React.js <span className="sep">•</span> JavaScript <span className="sep">•</span> HTML5 <span className="sep">•</span> CSS3
            </p>
          </div>

          <div className="resume-contact-grid">
            <a
              href="mailto:vijisujisri2909@gmail.com"
              className="contact-pill"
            >
              <Mail size={15} />
              <span>vijisujisri2909@gmail.com</span>
            </a>
            <span className="contact-pill">
              <MapPin size={15} />
              <span>Tamil Nadu, India</span>
            </span>
            <a
              href="https://vijaya-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
              <Globe size={15} />
              <span>vijaya-portfolio.vercel.app</span>
              <ExternalLink size={12} className="ext-icon" />
            </a>
            <a
              href="https://github.com/vijisujisri2909-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
              <Code2 size={15} />
              <span>github.com/vijisujisri2909-afk</span>
              <ExternalLink size={12} className="ext-icon" />
            </a>
          </div>
        </motion.header>

        {/* Professional Summary */}
        <motion.section className="resume-section" variants={reveal}>
          <div className="section-title-wrap">
            <FileText className="section-icon" size={20} />
            <h2>PROFESSIONAL SUMMARY</h2>
          </div>
          <p className="resume-summary-text">
            Detail-oriented Frontend Developer skilled in <strong>HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap 5</strong>, and <strong>Tailwind CSS</strong>, with working knowledge of Python, Django, and REST API fundamentals. Built and deployed 3 responsive, user-focused websites. Experienced in converting Figma designs into clean code, building mobile-first layouts, and ensuring cross-browser compatibility. Strong communicator and quick learner seeking an entry-level Frontend Developer or Full Stack Developer role to build high-quality web applications and grow within a collaborative team.
          </p>
        </motion.section>

        {/* Technical Skills */}
        <motion.section className="resume-section" variants={reveal}>
          <div className="section-title-wrap">
            <Layers className="section-icon" size={20} />
            <h2>TECHNICAL SKILLS</h2>
          </div>
          <div className="skills-category-grid">
            <div className="skill-cat-card">
              <h3>Frontend Development</h3>
              <div className="skill-tag-list">
                {[
                  "HTML5",
                  "CSS3",
                  "JavaScript (ES6+)",
                  "React.js",
                  "Bootstrap 5",
                  "Tailwind CSS",
                  "Responsive Web Design",
                  "Mobile-First Design",
                  "Flexbox",
                  "CSS Grid",
                ].map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-cat-card">
              <h3>Backend Basics</h3>
              <div className="skill-tag-list">
                {["Python", "Django", "REST API Fundamentals"].map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-cat-card">
              <h3>Developer Tools</h3>
              <div className="skill-tag-list">
                {[
                  "Git",
                  "GitHub",
                  "VS Code",
                  "Chrome DevTools",
                  "Vercel (Deployment)",
                  "Figma to Code",
                ].map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-cat-card">
              <h3>Web Practices</h3>
              <div className="skill-tag-list">
                {[
                  "Cross-Browser Compatibility",
                  "SEO Basics",
                  "Performance Optimization",
                  "Reusable Components",
                  "UI/UX Fundamentals",
                ].map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-cat-card">
              <h3>Other Skills</h3>
              <div className="skill-tag-list">
                {["MS Office", "Tally"].map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section className="resume-section" variants={reveal}>
          <div className="section-title-wrap">
            <BriefcaseBusiness className="section-icon" size={20} />
            <h2>PROJECTS</h2>
          </div>

          <div className="resume-projects-list">
            {/* Project 1 */}
            <div className="resume-project-item">
              <div className="project-item-header">
                <div>
                  <h3 className="project-name">Tasty Bites - Restaurant Website</h3>
                  <span className="project-tech">HTML5, CSS3, JavaScript, Bootstrap</span>
                </div>
                <div className="project-links">
                  <a
                    href="/tasty-bites/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-ext-link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                  <span className="project-badge">Desktop: PROJECT2 TASTY BITES</span>
                </div>
              </div>
              <ul className="project-bullets">
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Developed a responsive restaurant landing page with a dynamic menu filtering feature built in JavaScript.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Created an image gallery and an online ordering interface to improve user engagement.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Used Bootstrap grid and components to ensure consistent layout on mobile, tablet, and desktop screens.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Focused on user experience, readable typography, and clear call-to-action placement.</span>
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="resume-project-item">
              <div className="project-item-header">
                <div>
                  <h3 className="project-name">Construction Company Website</h3>
                  <span className="project-tech">HTML5, CSS3, JavaScript, Bootstrap / React</span>
                </div>
                <div className="project-links">
                  <a
                    href="/construction/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-ext-link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                  <span className="project-badge">Desktop: const-webpage</span>
                </div>
              </div>
              <ul className="project-bullets">
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Built a professional multi-section business website for a construction firm, including services, project gallery, client testimonials, and inquiry form.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Structured content with semantic HTML and clean layout to strengthen the company&apos;s online presence and support SEO basics.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Implemented form fields and validation for client inquiries.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Ensured responsive behavior and cross-browser compatibility across all screen sizes.</span>
                </li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="resume-project-item">
              <div className="project-item-header">
                <div>
                  <h3 className="project-name">Wedding Invitation Website</h3>
                  <span className="project-tech">HTML5, CSS3, JavaScript / React</span>
                </div>
                <div className="project-links">
                  <a
                    href="/wedding/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-ext-link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                  <span className="project-badge">Desktop: WEDDING INVITATION</span>
                </div>
              </div>
              <ul className="project-bullets">
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Designed an elegant digital wedding invitation with a live countdown timer, event timeline, embedded location map, and RSVP functionality.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Added smooth CSS animations and transitions to create an engaging visual experience.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Received positive feedback for creative UI design and ease of use on mobile devices.</span>
                </li>
              </ul>
            </div>

            {/* Project 4 */}
            <div className="resume-project-item">
              <div className="project-item-header">
                <div>
                  <h3 className="project-name">Student Information System</h3>
                  <span className="project-tech">Academic Project</span>
                </div>
              </div>
              <ul className="project-bullets">
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Contributed to a student data management system by handling data collection, documentation, and UI presentation.</span>
                </li>
                <li>
                  <Check size={14} className="bullet-check" />
                  <span>Gained experience in understanding user requirements, organizing data fields, and presenting information clearly.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Education & Certifications Side-by-Side */}
        <div className="resume-two-col">
          {/* Education */}
          <motion.section className="resume-section" variants={reveal}>
            <div className="section-title-wrap">
              <GraduationCap className="section-icon" size={20} />
              <h2>EDUCATION</h2>
            </div>
            <div className="timeline-list">
              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <h4>Bachelor of Arts (B.A.) in English</h4>
                  <p className="institution">Manonmaniam Sundaranar University, Tamil Nadu</p>
                  <div className="timeline-meta">
                    <span><Calendar size={13} /> 2014 - 2016</span>
                    <span className="grade-badge">CGPA: 8.5 / 10</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <h4>Higher Secondary Certificate (HSC) - Computer Science</h4>
                  <p className="institution">A.V.R.M.V. Matriculation Higher Secondary School</p>
                  <div className="timeline-meta">
                    <span><Calendar size={13} /> 2011</span>
                    <span className="grade-badge">Score: 80%</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <h4>Secondary School Leaving Certificate (SSLC)</h4>
                  <p className="institution">A.V.R.M.V. Matriculation Higher Secondary School</p>
                  <div className="timeline-meta">
                    <span><Calendar size={13} /> 2009</span>
                    <span className="grade-badge">Score: 75%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Certifications & Languages */}
          <motion.section className="resume-section" variants={reveal}>
            <div className="section-title-wrap">
              <Award className="section-icon" size={20} />
              <h2>CERTIFICATIONS</h2>
            </div>
            <div className="cert-list">
              <div className="cert-item">
                <span className="cert-bullet">✦</span>
                <div>
                  <h4>Basic Computer Course - Tally and MS Office</h4>
                  <p>Proficient in financial ledger concepts, data entries, spreadsheets, and document handling.</p>
                </div>
              </div>
              <div className="cert-item">
                <span className="cert-bullet">✦</span>
                <div>
                  <h4>Communication Skills Workshop</h4>
                  <p>Trained in professional written and spoken English, team collaboration, and client interactions.</p>
                </div>
              </div>
            </div>

            <div className="section-title-wrap mt-6">
              <Languages className="section-icon" size={20} />
              <h2>LANGUAGES</h2>
            </div>
            <div className="lang-list">
              <div className="lang-badge">
                <span className="lang-name">Tamil</span>
                <span className="lang-level">Native</span>
              </div>
              <div className="lang-badge">
                <span className="lang-name">English</span>
                <span className="lang-level">Fluent</span>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Core Competencies */}
        <motion.section className="resume-section" variants={reveal}>
          <div className="section-title-wrap">
            <Sparkles className="section-icon" size={20} />
            <h2>CORE COMPETENCIES</h2>
          </div>
          <div className="competencies-grid">
            {[
              "Problem Solving",
              "Strong Communication",
              "Teamwork & Collaboration",
              "Quick Learner",
              "Time Management",
              "Adaptability",
              "Responsibility",
              "Attention to Detail",
            ].map((comp) => (
              <div key={comp} className="comp-chip">
                <Check size={13} />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.article>

      {/* Bottom Back Button */}
      <div className="resume-bottom-cta no-print">
        <button
          className="resume-btn resume-btn-back-large"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={18} />
          <span>Back to Portfolio Home</span>
        </button>
        <a
          className="resume-btn resume-btn-primary"
          href="./VIJI RESUME3.rtf"
          download="VIJI RESUME3.rtf"
        >
          <Download size={18} />
          <span>Download VIJI RESUME3.rtf</span>
        </a>
      </div>
    </div>
  );
}
