import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-light/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-purple-light flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">
            Quick<span className="text-gradient">AI</span>
          </span>
        </Link>

        <SignIn />

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
