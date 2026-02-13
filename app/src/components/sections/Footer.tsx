import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Twitter, 
  Github, 
  Linkedin, 
  Youtube,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const footerLinks = {
  Product: [
    { name: 'Image Generator', href: '/tools/image-generator' },
    { name: 'Background Remover', href: '/tools/background-remover' },
    { name: 'Resume Analyzer', href: '/tools/resume-analyzer' },
    { name: 'Blog Generator', href: '/tools/blog-generator' },
    { name: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press Kit', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '/community' },
    { name: 'Support', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-dark-card border-t border-border-gray">
      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Ready to Unlock the{' '}
            <span className="text-gradient">Power of AI?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 mb-8 max-w-xl mx-auto"
          >
            Join thousands of creators, developers, and businesses using QuickAI to transform their workflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white px-8 py-6 text-lg font-medium group animate-pulse-glow"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-purple-light flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">
                  Quick<span className="text-gradient">AI</span>
                </span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                The all-in-one AI platform for creators, developers, and businesses. 
                Generate content, analyze data, and automate workflows.
              </p>

              {/* Newsletter */}
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple/50 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-purple hover:bg-purple-dark text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} QuickAI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
