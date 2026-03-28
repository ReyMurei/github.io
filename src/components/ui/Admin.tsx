import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, Github, FileText, Database, Code, 
  BarChart3, ChevronDown, ChevronUp, Download, 
  Presentation, Link2
} from 'lucide-react';

// ... (keep the Project interface from above)

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('analytics-portfolio');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  return (
    <section id="projects" className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Analytics <span className="text-emerald-600">Projects</span>
          </h2>
          <p className="text-slate-600 mt-2">Data science, visualization, and insights</p>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isExpanded, onToggle }: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      {/* Header - Always visible */}
      <div 
        className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
              {project.featured && (
                <Badge className="bg-amber-100 text-amber-700">Featured</Badge>
              )}
            </div>
            
            <p className="text-slate-600 mb-3">{project.shortDescription}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge variant="outline">{project.category}</Badge>
              <span className="text-slate-500">{project.date}</span>
              {project.duration && (
                <span className="text-slate-500">⏱️ {project.duration}</span>
              )}
              {project.datasetSize && (
                <span className="text-slate-500">💾 {project.datasetSize}</span>
              )}
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tools.map(tool => (
                <span key={tool} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Links */}
            <div className="flex gap-1 mr-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-slate-200 rounded-lg"
                   onClick={e => e.stopPropagation()}>
                  <Github className="w-5 h-5 text-slate-600" />
                </a>
              )}
              {project.kaggleUrl && (
                <a href={project.kaggleUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-slate-200 rounded-lg"
                   onClick={e => e.stopPropagation()}>
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </a>
              )}
              {project.colabUrl && (
                <a href={project.colabUrl} target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-slate-200 rounded-lg"
                   onClick={e => e.stopPropagation()}>
                  <Code className="w-5 h-5 text-orange-600" />
                </a>
              )}
            </div>
            
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="w-6 h-6 text-slate-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="p-6 space-y-6">
              {/* Full Description */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">About This Project</h4>
                <p className="text-slate-600 leading-relaxed">{project.description}</p>
              </div>

              {/* Key Findings */}
              {project.keyFindings.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">🔍 Key Findings</h4>
                  <ul className="space-y-2">
                    {project.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <span className="text-emerald-500 mt-1">▸</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">📊 Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-emerald-600">{metric.value}</div>
                        <div className="text-sm text-slate-600">{metric.label}</div>
                        {metric.change && (
                          <div className="text-xs text-emerald-500 mt-1">{metric.change}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              {project.files.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">📁 Project Files</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.files.map((file) => {
                      const Icon = {
                        notebook: Code,
                        dataset: Database,
                        dashboard: BarChart3,
                        report: FileText,
                        code: Code,
                        sql: Database,
                        pdf: FileText,
                        pptx: Presentation,
                      }[file.type];
                      
                      return (
                        <a
                          key={file.id}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-emerald-50 rounded-lg transition-colors group"
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                            <Icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 truncate">{file.name}</div>
                            {file.description && (
                              <div className="text-xs text-slate-500 truncate">{file.description}</div>
                            )}
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Business Impact */}
              {project.impact && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <h4 className="font-semibold text-emerald-900 mb-2">💡 Business Impact</h4>
                  <p className="text-emerald-800 text-sm">{project.impact}</p>
                </div>
              )}

              {/* All Links */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </a>
                  </Button>
                )}
                {project.kaggleUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.kaggleUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Kaggle
                    </a>
                  </Button>
                )}
                {project.colabUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.colabUrl} target="_blank" rel="noopener noreferrer">
                      <Code className="w-4 h-4 mr-2" /> Colab
                    </a>
                  </Button>
                )}
                {project.tableauUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.tableauUrl} target="_blank" rel="noopener noreferrer">
                      <BarChart3 className="w-4 h-4 mr-2" /> Tableau
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
