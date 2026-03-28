import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 88 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Linux', level: 85 },
    ],
  },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'AWS',
  'Tailwind CSS', 'Figma', 'Git', 'Linux', 'Redis',
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
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-1000 ease-out"
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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Technologies &{' '}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="p-6 rounded-2xl bg-card/50 border border-border/50"
            >
              <h3 className="text-xl font-semibold mb-6 gradient-text">{category.name}</h3>
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
                className="px-6 py-3 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-default"
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

        {/* Certifications */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">AWS</div>
            <div className="text-sm text-muted-foreground">Certified Solutions Architect</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Google</div>
            <div className="text-sm text-muted-foreground">Professional Cloud Developer</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-transparent border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Meta</div>
            <div className="text-sm text-muted-foreground">Frontend Developer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
