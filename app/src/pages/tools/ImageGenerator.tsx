import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import {
  Image as ImageIcon,
  Wand2,
  Download,
  Sparkles,
  RefreshCw,
  Check,
  Globe,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

const styles = [
  { id: '3d', name: '3D Render', icon: '🎨', prompt: '3d render, octane render, cinematic lighting' },
  { id: 'photorealistic', name: 'Realism', icon: '📸', prompt: 'photorealistic, 8k, highly detailed' },
  { id: 'anime', name: 'Anime', icon: '✨', prompt: 'anime style, vibrant, studio ghibli style' },
  { id: 'digital-art', name: 'Digital', icon: '🖼️', prompt: 'digital art, concept art, artstation' },
  { id: 'oil-painting', name: 'Painting', icon: '🎭', prompt: 'oil painting, classic art, brush strokes' },
  { id: 'sketch', name: 'Sketch', icon: '✏️', prompt: 'pencil sketch, black and white, charcoal' },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('3d');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    const selectedStyleObj = styles.find(s => s.id === selectedStyle);
    const stylePrompt = selectedStyleObj ? `, ${selectedStyleObj.prompt}` : '';
    const fullPrompt = prompt.trim() + stylePrompt;
    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(fullPrompt);

    // Using Pollinations.ai for reliable rendering with Flux model
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    setTimeout(() => {
      setGeneratedImage(imageUrl);
      setImageKey(prev => prev + 1);
    }, 100);
  };

  const handleImageLoad = () => {
    setIsGenerating(false);
    toast.success('Image generated successfully!');
  };

  const handleImageError = () => {
    setIsGenerating(false);
    setGeneratedImage(null);
    toast.error('Failed to load image. Please try again.');
  };

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-generated-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success('Download started!');
      } catch (e) {
        console.error('Download failed', e);
        window.open(generatedImage, '_blank');
        toast.info('Opened image in new tab');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-4">
              <ImageIcon className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">AI Image Generator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Create Stunning <span className="text-gradient">AI Images</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Transform your ideas into beautiful images. Just describe what you want, and our AI will create it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <label className="block text-white font-medium mb-3">Describe your image</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A boy playing with a cat in 3D style, colorful, vibrant..."
                  className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple/50 resize-none"
                />
              </div>

              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <label className="block text-white font-medium mb-4">Choose a style</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border transition-all ${selectedStyle === style.id
                        ? 'border-purple bg-purple/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                    >
                      <span className="text-2xl mb-1 block">{style.icon}</span>
                      <span className="text-xs text-gray-300">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray h-full">
                <h3 className="text-white font-medium mb-4">Result</h3>
                <div className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relativ min-h-[300px]">
                  {generatedImage ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isGenerating ? 1 : 0 }}
                        className={`absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 ${!isGenerating ? 'pointer-events-none' : ''}`}
                      >
                        {isGenerating && <RefreshCw className="w-10 h-10 text-purple animate-spin" />}
                      </motion.div>
                      <motion.img
                        key={imageKey}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: isGenerating ? 0.5 : 1, scale: 1 }}
                        src={generatedImage}
                        alt="Generated"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <Sparkles className="w-10 h-10 text-purple mx-auto mb-4" />
                      <p className="text-gray-500">Your generated image will appear here</p>
                    </div>
                  )}
                </div>
                {generatedImage && !isGenerating && (
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button onClick={handleDownload} variant="secondary">
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
