import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  Download,
  TrendingUp,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  { id: 'all', name: 'All' },
  { id: '3d', name: '3D Art' },
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'anime', name: 'Anime' },
  { id: 'digital', name: 'Digital Art' },
  { id: 'abstract', name: 'Abstract' },
];

const communityImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1686191128892-3b37add4a934?w=400&h=400&fit=crop',
    title: 'Futuristic City',
    author: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    likes: 234,
    category: '3d',
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?w=400&h=500&fit=crop',
    title: 'Mountain Landscape',
    author: 'Sarah Miller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    likes: 189,
    category: 'photorealistic',
    timeAgo: '4 hours ago',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1682686581580-d99b0a6bb299?w=400&h=400&fit=crop',
    title: 'Abstract Waves',
    author: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    likes: 156,
    category: 'abstract',
    timeAgo: '6 hours ago',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop',
    title: 'Cyberpunk Character',
    author: 'Emily Wang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    likes: 312,
    category: 'anime',
    timeAgo: '8 hours ago',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1682685797661-9e0c8c6f5f6b?w=400&h=400&fit=crop',
    title: 'Neon Dreams',
    author: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    likes: 278,
    category: 'digital',
    timeAgo: '12 hours ago',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1682685797208-74150eb6c3b1?w=400&h=500&fit=crop',
    title: 'Space Explorer',
    author: 'Lisa Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    likes: 445,
    category: '3d',
    timeAgo: '1 day ago',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&h=400&fit=crop',
    title: 'Ocean Sunset',
    author: 'Tom Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    likes: 198,
    category: 'photorealistic',
    timeAgo: '1 day ago',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?w=400&h=600&fit=crop',
    title: 'Fantasy Castle',
    author: 'Anna Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
    likes: 367,
    category: 'digital',
    timeAgo: '2 days ago',
  },
];

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = communityImages.filter(
    (img) => activeCategory === 'all' || img.category === activeCategory
  );

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === 'trending') return b.likes - a.likes;
    return 0;
  });

  const handleLike = (id: number) => {
    if (likedImages.includes(id)) {
      setLikedImages(likedImages.filter((imgId) => imgId !== id));
      toast.success('Removed from likes');
    } else {
      setLikedImages([...likedImages, id]);
      toast.success('Added to likes!');
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-4">
              <Users className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">Community Showcase</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Explore <span className="text-gradient">Creations</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Discover amazing AI-generated artwork from our community. Get inspired and share your own creations.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="text-sm text-gray-300">10K+ Creations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
              <Users className="w-4 h-4 text-purple" />
              <span className="text-sm text-gray-300">5K+ Artists</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
              <Heart className="w-4 h-4 text-purple" />
              <span className="text-sm text-gray-300">100K+ Likes</span>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-purple text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <button
                onClick={() => setSortBy('trending')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === 'trending'
                    ? 'bg-purple/20 text-purple'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === 'recent'
                    ? 'bg-purple/20 text-purple'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                Recent
              </button>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {sortedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="group relative rounded-2xl overflow-hidden bg-dark-card border border-border-gray">
                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleLike(image.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          likedImages.includes(image.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.includes(image.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleDownload(image.title)}
                        className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium mb-2">{image.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={image.avatar}
                            alt={image.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-300">{image.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                          </span>
                          <span>{image.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 px-8"
              onClick={() => toast.info('More content coming soon!')}
            >
              Load More
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
