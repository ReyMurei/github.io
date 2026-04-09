import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Sales Performance Dashboard',
    description: 'Interactive Power BI dashboard analyzing $10M+ in sales data...',
    content: `
## Project Overview

Built a comprehensive sales analytics solution that transformed how executives understand business performance.

## Key Features
- Real-time data refresh from SQL Server
- Drill-through capabilities from summary to transaction level
- Custom DAX measures for YoY and MoM comparisons

## Business Impact
- Reduced reporting time from 3 days to real-time
- Identified $2M in underperforming product lines
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Power BI', 'SQL', 'DAX', 'Excel'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  // ... other projects
];

const categories = ['All', 'Visualization', 'Machine Learning', 'Statistical Analysis'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Handle URL hash changes and initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#projects\/(\d+)/);
      if (match) {
        const projectId = parseInt(match[1]);
        const project = projects.find(p => p.id === projectId);
        if (project) {
          setSelectedProject(project);
        }
      } else if (hash === '#projects') {
        setSelectedProject(null);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL when project changes
  useEffect(() => {
    if (selectedProject) {
      window.location.hash = `#projects/${selectedProject.id}`;
    } else if (window.location.hash.includes('/')) {
      // Only reset to #projects if we're in a project detail
      window.location.hash = '#projects';
    }
  }, [selectedProject]);

  // Lock body scroll when project is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => {
        if (activeCategory === 'Visualization') return p.tags.some(t => ['Power BI', 'Tableau', 'Looker'].includes(t));
        if (activeCategory === 'Machine Learning') return p.tags.some(t => ['scikit-learn', 'K-means', 'Prophet'].includes(t));
        if (activeCategory === 'Statistical Analysis') return p.tags.some(t => ['Statistics', 'Statsmodels'].includes(t));
        return true;
      });

  return (
    <>
      {/* FULL PAGE OVERLAY */}
      {selectedProject && (
        <div className="fixed inset-0 z-[9999] bg-background overflow-y-auto">
          {/* Close/Back Button */}
          <div className="fixed top-4 left-4 z-50">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setSelectedProject(null)}
              className="bg-background/95 backdrop-blur border-border hover:bg-emerald-500/10 hover:border-emerald-500/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Button>
          </div>

          {/* Full Page Content */}
          <div className="min-h-screen">
            {/* Hero Image - Clean, no bottom fade */}
            <div className="relative h-[70vh] w-full overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              {/* Only top gradient for text readability, no bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
              
              {/* Title overlay */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 p-6 md:p-12 lg:p-16">
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.featured && (
                      <Badge className="bg-emerald-600 text-white text-sm px-3 py-1">Featured</Badge>
                    )}
                    {selectedProject.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-black/50 text-white border border-white/30 text-sm px-3 py-1 backdrop-blur"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {selectedProject.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white max-w-3xl leading-relaxed drop-shadow-md">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-background">
              <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-16">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-border text-foreground font-semibold text-lg hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                </div>

                {/* Full Content */}
                <div className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selectedProject.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of data-driven projects demonstrating expertise in analytics, 
              visualization, and statistical modeling.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white'
                    : 'border-emerald-500/30 hover:bg-emerald-500/10'
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                  
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-emerald-600/90 text-white">
                      Featured
                    </Badge>
                  )}

                  <div className="absolute inset-0 bg-emerald-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2 text-lg">
                      View Project <ArrowLeft className="w-5 h-5 rotate-180" />
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
