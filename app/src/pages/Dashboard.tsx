import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Image, 
  Wand2, 
  FileText, 
  PenTool,
  LayoutDashboard,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

const quickTools = [
  {
    name: 'Image Generator',
    description: 'Create stunning AI images',
    icon: Image,
    href: '/tools/image-generator',
    color: 'from-pink-500 to-rose-500',
    usage: '45/50',
  },
  {
    name: 'Background Remover',
    description: 'Remove image backgrounds',
    icon: Wand2,
    href: '/tools/background-remover',
    color: 'from-purple to-purple-light',
    usage: '8/10',
  },
  {
    name: 'Resume Analyzer',
    description: 'Analyze your resume',
    icon: FileText,
    href: '/tools/resume-analyzer',
    color: 'from-blue-500 to-cyan-500',
    usage: 'Unlimited',
  },
  {
    name: 'Blog Generator',
    description: 'Generate blog content',
    icon: PenTool,
    href: '/tools/blog-generator',
    color: 'from-green-500 to-emerald-500',
    usage: '3/5',
  },
];

const recentActivity = [
  { type: 'image', title: 'Generated "futuristic city" image', time: '2 minutes ago' },
  { type: 'blog', title: 'Created blog post "AI Trends 2024"', time: '1 hour ago' },
  { type: 'resume', title: 'Analyzed resume for Software Engineer', time: '3 hours ago' },
  { type: 'image', title: 'Removed background from product photo', time: 'Yesterday' },
];

const stats = [
  { label: 'Total Generations', value: '127', icon: Sparkles, trend: '+12%' },
  { label: 'This Month', value: '45', icon: TrendingUp, trend: '+8%' },
  { label: 'Time Saved', value: '24h', icon: Clock, trend: 'Est.' },
];

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Welcome back, <span className="text-gradient">{user?.name}</span>!
                </h1>
                <p className="text-gray-400">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-purple/20 text-purple text-sm font-medium capitalize">
                  {user?.plan} Plan
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/pricing')}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-dark-card border border-border-gray"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-purple" />
                  </div>
                  <span className="text-sm text-green-400">{stat.trend}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Quick Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(tool.href)}
                  className="group cursor-pointer p-6 rounded-2xl bg-dark-card border border-border-gray hover:border-purple/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-medium mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Usage: {tool.usage}</span>
                    <Sparkles className="w-4 h-4 text-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                        {activity.type === 'image' && <Image className="w-5 h-5 text-purple" />}
                        {activity.type === 'blog' && <PenTool className="w-5 h-5 text-purple" />}
                        {activity.type === 'resume' && <FileText className="w-5 h-5 text-purple" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.title}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Account Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <h2 className="text-xl font-semibold text-white mb-6">Account</h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                  >
                    <CreditCard className="w-5 h-5" />
                    Billing
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                  <div className="border-t border-white/10 my-2" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
