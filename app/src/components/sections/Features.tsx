import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Image, 
  Wand2, 
  FileText, 
  PenTool, 
  Sparkles, 
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Image,
    title: 'AI Image Generator',
    description: 'Transform text prompts into stunning, high-quality images. Choose from various styles including 3D, photorealistic, artistic, and more.',
    link: '/tools/image-generator',
    color: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: Wand2,
    title: 'Background Remover',
    description: 'Remove backgrounds or unwanted objects from images with a single click. Perfect for product photos, portraits, and creative projects.',
    link: '/tools/background-remover',
    color: 'from-purple to-purple-light',
    glowColor: 'rgba(122, 69, 255, 0.3)',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Get AI-powered feedback on your resume. Improve your chances of landing your dream job with professional suggestions.',
    link: '/tools/resume-analyzer',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: PenTool,
    title: 'Blog & Title Generator',
    description: 'Generate engaging blog content and catchy titles automatically. Save time and boost your content marketing strategy.',
    link: '/tools/blog-generator',
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },
];

const additionalFeatures = [
  {
    icon: Sparkles,
    title: 'Smart Analytics',
    description: 'Get deep insights into your content performance',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate content in seconds, not minutes',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is encrypted and protected',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for 50+ languages worldwide',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={feature.link}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group relative h-full p-8 rounded-3xl bg-dark-card border border-border-gray overflow-hidden cursor-pointer"
          style={{
            boxShadow: `0 0 0 1px ${feature.glowColor}`,
          }}
        >
          {/* Glow effect */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity duration-500`}
          />

          {/* Icon */}
          <div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            <feature.icon className="w-7 h-7 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {feature.description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center gap-2 text-purple opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">Try it now</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function AdditionalFeatureCard({ feature, index }: { feature: typeof additionalFeatures[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center flex-shrink-0">
        <feature.icon className="w-5 h-5 text-purple" />
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">{feature.title}</h4>
        <p className="text-gray-500 text-sm">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple" />
            <span className="text-sm text-purple font-medium">Powerful AI Tools</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Create</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our suite of AI-powered tools helps you generate stunning content, 
            analyze data, and streamline your workflow like never before.
          </p>
        </motion.div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Why Choose QuickAI?
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalFeatures.map((feature, index) => (
            <AdditionalFeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
