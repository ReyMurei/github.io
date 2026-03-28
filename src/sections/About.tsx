import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Rocket, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: 5 },
  { label: 'Projects Completed', value: 50 },
  { label: 'Happy Clients', value: 30 },
  { label: 'Awards Won', value: 8 },
];

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building fast, responsive, and scalable web applications using modern technologies.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing user interfaces and experiences.',
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed, SEO, and better user engagement.',
  },
  {
    icon: Sparkles,
    title: 'Creative Solutions',
    description: 'Bringing innovative ideas to life with creative problem-solving.',
  },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(target * easeOut));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Passionate about creating{' '}
            <span className="gradient-text">digital experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a dedicated developer and designer with a passion for crafting beautiful, 
            functional, and user-centered digital experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-purple-500/30 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter target={stat.value} />
                +
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-purple-500/30 transition-all duration-300 hover:glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-transparent border border-purple-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 5 years of experience in web development and design, I've had the privilege 
                of working with diverse clients from startups to established enterprises.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My approach combines technical expertise with creative thinking, ensuring every project 
                not only functions flawlessly but also delivers an exceptional user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing my knowledge through blog posts and mentoring.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">5+</div>
                    <div className="text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
