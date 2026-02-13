import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow Inc.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    content: 'QuickAI has completely transformed our content creation process. What used to take days now takes minutes. The image generator alone has saved us thousands in design costs.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Product Manager',
    company: 'StartupXYZ',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus&backgroundColor=c0aede',
    content: 'The resume analyzer helped me land my dream job. The AI suggestions were spot-on and helped me highlight skills I did not even know were valuable. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Content Creator',
    company: 'Freelance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily&backgroundColor=ffdfbf',
    content: 'As a blogger, the blog generator is a game-changer. It helps me overcome writer is block and generates engaging titles that actually get clicks. Love it!',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'E-commerce Owner',
    company: 'Shopify Store',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=d1d4f9',
    content: 'The background remover is incredibly accurate. I have processed over 1000 product photos and the results are consistently professional. Best tool in my workflow.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'HR Manager',
    company: 'Global Corp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa&backgroundColor=ffd5dc',
    content: 'We use QuickAI for screening resumes and it has reduced our hiring time by 60%. The AI analysis is remarkably accurate at identifying top candidates.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return testimonials.length - 1;
      if (newIndex >= testimonials.length) return 0;
      return newIndex;
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6"
          >
            <Star className="w-4 h-4 text-purple fill-purple" />
            <span className="text-sm text-purple font-medium">Loved by Users</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our Users{' '}
            <span className="text-gradient">Say</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their workflow with QuickAI.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {/* Main testimonial card */}
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute w-full max-w-2xl"
              >
                <div className="relative p-8 sm:p-12 rounded-3xl bg-dark-card border border-border-gray backdrop-blur-xl">
                  {/* Quote icon */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple to-purple-light flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-14 h-14 rounded-full bg-white/10"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{currentTestimonial.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-purple/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-purple'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-purple/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Side cards (decorative) */}
        <div className="hidden lg:block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-10 top-1/2 -translate-y-1/2 w-64 p-6 rounded-2xl bg-dark-card/50 border border-white/5 backdrop-blur-sm opacity-50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple/20" />
              <div className="w-24 h-3 bg-white/10 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-white/5 rounded" />
              <div className="w-3/4 h-2 bg-white/5 rounded" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-10 top-1/2 -translate-y-1/2 w-64 p-6 rounded-2xl bg-dark-card/50 border border-white/5 backdrop-blur-sm opacity-50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-light/20" />
              <div className="w-24 h-3 bg-white/10 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-white/5 rounded" />
              <div className="w-3/4 h-2 bg-white/5 rounded" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
