import React, { useState, useEffect } from 'react';
import type { Project } from '../types';

const fallbackProjects: Project[] = [
  { id: 1, title: 'QuantumLeap Inc.', category: 'Brand Identity', imageUrl: 'https://picsum.photos/seed/quantum/600/400' },
  { id: 2, title: 'Nova Financial', category: 'Logo & Web', imageUrl: 'https://picsum.photos/seed/nova/600/400' },
  { id: 3, title: 'Aether Cosmetics', category: 'Packaging Design', imageUrl: 'https://picsum.photos/seed/aether/600/400' },
  { id: 4, title: 'Zenith Robotics', category: 'Full Rebrand', imageUrl: 'https://picsum.photos/seed/zenith/600/400' },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative overflow-hidden rounded-lg glassmorphic border border-white/10 transition-all duration-500 hover:border-cyan-400/50 hover:scale-105">
    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="text-cyan-400">{project.category}</p>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/get-projects');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.info("Could not fetch dynamic projects. This is expected during local development if not using 'netlify dev'. Using fallback data.");
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Brand Identity Projects</h2>
          <p className="text-lg text-gray-400 mt-2">Crafting visual systems that speak volumes.</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>
        
        {loading ? (
          <div className="text-center text-cyan-400 py-10">
            <p className="text-lg animate-pulse">Loading Projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;