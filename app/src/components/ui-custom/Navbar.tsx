import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Zap,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  Image,
  FileText,
  PenTool,
  Wand2,
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
];

const aiTools = [
  { name: 'Image Generator', href: '/tools/image-generator', icon: Image },
  { name: 'Background Remover', href: '/tools/background-remover', icon: Wand2 },
  { name: 'Resume Analyzer', href: '/tools/resume-analyzer', icon: FileText },
  { name: 'Blog Generator', href: '/tools/blog-generator', icon: PenTool },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-3'
          : 'py-5'
          }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${isScrolled
            ? 'max-w-4xl px-6 py-3 backdrop-blur-xl bg-black/60 border border-white/10 rounded-full mx-4 sm:mx-auto'
            : 'max-w-7xl px-6'
            }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple to-purple-light rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <Zap className="w-5 h-5 text-white relative z-10" />
              </div>
              <span className="text-lg font-semibold text-white">
                Quick<span className="text-gradient">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* AI Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Tools
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-dark-card border-border-gray backdrop-blur-xl"
                >
                  {aiTools.map((tool) => (
                    <DropdownMenuItem
                      key={tool.name}
                      onClick={() => navigate(tool.href)}
                      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <tool.icon className="w-4 h-4 text-purple" />
                      {tool.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple to-purple-light flex items-center justify-center">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {user?.name}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-dark-card border-border-gray backdrop-blur-xl"
                  >
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/signin')}
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white border-0"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 h-full w-80 bg-dark-card border-l border-border-gray p-6 pt-20"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-lg font-medium rounded-lg transition-colors ${isActive(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="border-t border-white/10 my-4" />
                <p className="px-4 text-sm text-gray-500 font-medium">AI Tools</p>
                {aiTools.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-gray-400 hover:text-white flex items-center gap-3"
                  >
                    <tool.icon className="w-5 h-5 text-purple" />
                    {tool.name}
                  </Link>
                ))}

                <div className="border-t border-white/10 my-4" />

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-gray-400 hover:text-white flex items-center gap-3"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-red-400 flex items-center gap-3"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/signin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-white/20 text-white hover:bg-white/5"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-purple to-purple-light text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
