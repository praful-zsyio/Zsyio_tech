import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, CheckCircle, Clock, Calendar, Briefcase, Award } from "lucide-react";
import { getProjects } from "../services/api";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all and find by ID (simplest for now without specific endpoint)
    getProjects()
      .then((res) => {
        if (Array.isArray(res.data)) {
          const found = res.data.find((p) => String(p.id) === String(projectId));
          setProject(found);
        }
      })
      .catch((err) => console.error("Error fetching project:", err))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-[hsl(var(--surface1))] mb-4 rounded"></div>
          <div className="text-sm text-[hsl(var(--subtext1))]">Loading Project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))]">
        <div className="text-center p-8 border border-[hsl(var(--surface1))] rounded-2xl bg-[hsl(var(--mantle))]">
          <h2 className="text-2xl font-semibold mb-4">Project not found</h2>
          <p className="text-[hsl(var(--subtext1))] mb-6">The project you are looking for does not exist or has been removed.</p>
          <Link to="/projects" className="inline-flex items-center gap-2 text-[hsl(var(--blue))] hover:underline">
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  // Destructure with fallbacks handling both camelCase and snake_case from backend
  const {
    title,
    category,
    summary,
    description,
    image, // Cloudinary URL
    tech_stack = [],
    techStack, // fallback
    tags = [],
    live_url,
    liveUrl, // fallback
    github_url,
    client,
    duration,
    completion_date,
    role,
    features = [],
    challenges,
    solutions,
    created_at
  } = project;

  // Normalize data
  const finalTechStack = tech_stack.length ? tech_stack : (techStack || []);
  const finalLiveUrl = live_url || liveUrl;
  const finalTags = tags;

  return (
    <div
      className="min-h-screen bg-[hsl(var(--base))] text-[hsl(var(--text))]"
    >
      {/* HEADER / HERO */}
      <header
        className="
          border-b border-[hsl(var(--surface1))]
          px-6 md:px-16
          pt-32 md:pt-40
          pb-16
          relative
          overflow-hidden
        "
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[hsl(var(--blue))]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs md:text-sm text-[hsl(var(--subtext0))]">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 hover:text-[hsl(var(--blue))] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to projects</span>
            </Link>
            <span className="mx-2 text-[hsl(var(--overlay1))]">/</span>
            <span className="uppercase tracking-wide font-medium text-[hsl(var(--blue))]">{category}</span>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
            <div>
              {/* Title + Summary */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-[hsl(var(--subtext1))] leading-relaxed max-w-2xl">
                {summary}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-t border-[hsl(var(--surface1))] pt-8 text-sm">
                {client && (
                  <div>
                    <span className="block text-[hsl(var(--subtext0))] mb-1 flex items-center gap-1.5"><Briefcase size={14} /> Client</span>
                    <span className="font-medium">{client}</span>
                  </div>
                )}
                {role && (
                  <div>
                    <span className="block text-[hsl(var(--subtext0))] mb-1 flex items-center gap-1.5"><Award size={14} /> Role</span>
                    <span className="font-medium">{role}</span>
                  </div>
                )}
                {duration && (
                  <div>
                    <span className="block text-[hsl(var(--subtext0))] mb-1 flex items-center gap-1.5"><Clock size={14} /> Duration</span>
                    <span className="font-medium">{duration}</span>
                  </div>
                )}
                {completion_date && (
                  <div>
                    <span className="block text-[hsl(var(--subtext0))] mb-1 flex items-center gap-1.5"><Calendar size={14} /> Year</span>
                    <span className="font-medium">{new Date(completion_date).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Tags */}
            <div className="flex flex-col gap-6 items-start lg:items-end">
              <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                {finalTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full bg-[hsl(var(--surface1))]/50 border border-[hsl(var(--surface1))] text-[hsl(var(--subtext1))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {github_url && (
                  <a
                    href={github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                               inline-flex items-center gap-2
                               px-6 py-3 rounded-full
                               border border-[hsl(var(--surface1))]
                               hover:border-[hsl(var(--text))]
                               transition-all
                               font-medium
                             "
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
                {finalLiveUrl && (
                  <a
                    href={finalLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                            inline-flex items-center gap-2
                            px-6 py-3 rounded-full
                            bg-[hsl(var(--blue))] text-white
                            hover:bg-[hsl(var(--sapphire))]
                            transition-all
                            font-medium
                            shadow-lg shadow-[hsl(var(--blue))]/20
                            hover:shadow-[hsl(var(--blue))]/40
                            hover:-translate-y-0.5
                            "
                  >
                    <ExternalLink size={18} />
                    Visit Live Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      {image && (
        <div className="px-6 md:px-16 -mt-8 mb-16 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-[hsl(var(--surface1))] shadow-2xl bg-[hsl(var(--mantle))] aspect-video relative group">
              <img
                src={image}
                alt={`${title} Preview`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)] pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="px-6 md:px-16 py-8 grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <section className="space-y-16">
          {/* Detailed Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[hsl(var(--blue))] block"></span>
              Overview
            </h2>
            <div className="prose prose-invert prose-lg text-[hsl(var(--subtext1))] max-w-none leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </section>

          {/* Features List (if available in JSON) */}
          {features && features.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[hsl(var(--green))] block"></span>
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 p-4 rounded-xl border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/50 hover:bg-[hsl(var(--mantle))] transition-colors">
                    <CheckCircle className="text-[hsl(var(--green))] shrink-0" size={20} />
                    <span className="text-[hsl(var(--text))] text-sm">{typeof feature === 'string' ? feature : feature.name || JSON.stringify(feature)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Solutions */}
          {(challenges || solutions) && (
            <section className="grid md:grid-cols-2 gap-8">
              {challenges && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[hsl(var(--red))]">The Challenge</h3>
                  <p className="text-[hsl(var(--subtext1))] leading-relaxed text-sm md:text-base">
                    {challenges}
                  </p>
                </div>
              )}
              {solutions && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[hsl(var(--teal))]">The Solution</h3>
                  <p className="text-[hsl(var(--subtext1))] leading-relaxed text-sm md:text-base">
                    {solutions}
                  </p>
                </div>
              )}
            </section>
          )}

        </section>

        {/* RIGHT COLUMN / SIDEBAR */}
        <aside className="space-y-8 lg:sticky lg:top-28 self-start">

          {/* Tech Stack */}
          {finalTechStack.length > 0 && (
            <div className="border border-[hsl(var(--surface1))] rounded-2xl p-6 bg-[hsl(var(--mantle))]/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {finalTechStack.map((tech) => (
                  <span
                    key={tech}
                    className="
                            px-3 py-1.5 rounded-lg
                            bg-[hsl(var(--surface0))]
                            text-xs text-[hsl(var(--text))]
                            border border-[hsl(var(--surface1))]
                            hover:bg-[hsl(var(--surface1))]
                            transition-colors
                            cursor-default
                            "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Extra Details (if any) */}
          {(client || role || duration) && (
            <div className="p-6 rounded-2xl bg-linear-to-br from-[hsl(var(--surface0))] to-[hsl(var(--mantle))] border border-[hsl(var(--surface1))]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--subtext0))] mb-4">At a Glance</h3>
              <ul className="space-y-3">
                {client && (
                  <li className="flex flex-col">
                    <span className="text-xs text-[hsl(var(--subtext1))]">Client</span>
                    <span className="font-medium">{client}</span>
                  </li>
                )}
                {role && (
                  <li className="flex flex-col">
                    <span className="text-xs text-[hsl(var(--subtext1))]">Role</span>
                    <span className="font-medium">{role}</span>
                  </li>
                )}
                {duration && (
                  <li className="flex flex-col">
                    <span className="text-xs text-[hsl(var(--subtext1))]">Duration</span>
                    <span className="font-medium">{duration}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

        </aside>
      </main>

      {/* Footer Nav */}
      <footer className="border-t border-[hsl(var(--surface1))] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center">
          <Link to="/projects" className="text-[hsl(var(--subtext0))] hover:text-[hsl(var(--text))] transition-colors">
            &larr; All Projects
          </Link>
          {/* Future: Add Next/Prev project links */}
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetailPage;
