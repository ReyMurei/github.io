import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    name: 'Data Analysis',
    skills: [
      { name: 'SQL', level: 95 },
      { name: 'Python (Pandas)', level: 92 },
      { name: 'Excel/Google Sheets', level: 90 },
      { name: 'Statistical Analysis', level: 88 },
    ],
  },
  {
    name: 'Visualization',
    skills: [
      { name: 'Tableau', level: 90 },
      { name: 'Power BI', level: 88 },
      { name: 'Looker', level: 82 },
      { name: 'Matplotlib/Seaborn', level: 85 },
      { name: 'Plotly', level: 80 },
    ],
  },
  {
    name: 'ML & Engineering',
    skills: [
      { name: 'scikit-learn', level: 85 },
      { name: 'TensorFlow/Keras', level: 75 },
      { name: 'BigQuery', level: 82 },
      { name: 'Spark/PySpark', level: 78 },
      { name: 'Git/Version Control', level: 88 },
    ],
  },
];

const technologies = [
  'SQL', 'Python', 'R', 'Tableau', 'Power BI',
  'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'BigQuery',
  'Looker', 'Spark', 'PostgreSQL', 'AWS',
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            setWidth(level);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Tools &{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for extracting insights, building models, and driving data-informed decisions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="p-6 rounded-2xl bg-card/50 border border-border/50"
            >
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{category.name}</h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={categoryIndex * 200 + skillIndex * 100}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Stack Cloud */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={tech}
                className="px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-default"
                style={{
                  animationDelay: `${index * 50}ms`,
                  fontSize: `${0.9 + Math.random() * 0.3}rem`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
    </section>
  );
}
