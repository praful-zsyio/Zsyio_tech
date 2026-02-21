import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, className }) => (
  <Link to={`/projects/${project.id}`} className={`block ${className || 'animate-in-view'}`}>
    <div className="bg-mantle rounded-xl overflow-hidden group relative h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-soft hover:-translate-y-1 border border-crust">
      <div className="overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base/80 via-base/40 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-base/50 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-5 h-5 text-text" />
        </div>
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
        <p className="text-subtext1 mb-4 text-sm leading-relaxed grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-lavender/20 text-lavender text-xs font-semibold px-3 py-1 rounded-xl">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default ProjectCard;