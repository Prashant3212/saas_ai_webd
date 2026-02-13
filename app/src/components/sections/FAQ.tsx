import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is QuickAI and how does it work?',
    answer: 'QuickAI is an all-in-one AI-powered platform that helps you create stunning content, analyze data, and automate workflows. Our advanced AI models can generate images, remove backgrounds, analyze resumes, and create blog content - all from simple text prompts. Simply sign up, choose a tool, and start creating.',
  },
  {
    question: 'Is there a free plan available?',
    answer: 'Yes! We offer a generous free plan that includes 50 AI generations per month, basic image generation, standard resolution outputs, and community support. It is perfect for getting started and exploring our tools before upgrading.',
  },
  {
    question: 'How does the image generation work?',
    answer: 'Our AI image generator uses state-of-the-art diffusion models to create high-quality images from text descriptions. Simply describe what you want to see, choose a style (3D, photorealistic, artistic, etc.), and our AI will generate unique images in seconds. Pro users get access to 4K resolution and advanced customization options.',
  },
  {
    question: 'Can I use the generated content commercially?',
    answer: 'Absolutely! All content generated on paid plans (Pro and Enterprise) comes with full commercial usage rights. Free plan users can use generated content for personal projects. Enterprise users also get additional licensing protections and custom model training.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe, and we never store your full card details.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Once canceled, you will continue to have access to your paid features until the end of your current billing period. No questions asked, no hidden fees.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Security is our top priority. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We are SOC 2 Type II certified and GDPR compliant. Enterprise users get additional security features like SSO, audit logs, and custom data retention policies.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-purple transition-colors pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-purple/20 transition-colors"
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-purple" />
          ) : (
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-purple transition-colors" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: -90 }}
              transition={{ duration: 0.3 }}
              className="pb-6 text-gray-400 leading-relaxed"
              style={{ transformOrigin: 'top', perspective: '1000px' }}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
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
            <HelpCircle className="w-4 h-4 text-purple" />
            <span className="text-sm text-purple font-medium">Got Questions?</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about QuickAI.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-card/50 backdrop-blur-sm rounded-3xl border border-border-gray p-2"
        >
          <div className="px-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Still have questions? We are here to help.
          </p>
          <a
            href="mailto:support@quickai.com"
            className="inline-flex items-center gap-2 text-purple hover:text-purple-light transition-colors"
          >
            <span>Contact our support team</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
