import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
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
        className="relative z-10 text-center max-w-md"
      >
        {/* 404 Number */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
        </motion.div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple to-purple-light rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple/50 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
