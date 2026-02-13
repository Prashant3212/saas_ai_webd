import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Activity, Headphones, Sparkles } from 'lucide-react';

const stats = [
  { icon: Users, value: '10K+', label: 'Active Users' },
  { icon: Activity, value: '99.9%', label: 'Uptime' },
  { icon: Headphones, value: '24/7', label: 'Support' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-light/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple" />
          <span className="text-sm text-gray-300">Powered by Advanced AI</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
          }}
        >
          <span className="text-white">Unlock the</span>
          <br />
          <span className="text-gradient">Power of AI</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Create stunning content, analyze data, and automate workflows with our 
          cutting-edge AI tools. Transform your ideas into reality in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white px-8 py-6 text-lg font-medium group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg font-medium group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-purple" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple/30 to-purple-light/20 backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-purple" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-light/30 to-purple/20 backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center"
        >
          <Activity className="w-10 h-10 text-purple-light" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
    </section>
  );
}
