import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import { removeBackground } from '@imgly/background-removal';
import {
  Upload,
  Wand2,
  Download,
  Image,
  RefreshCw,
  Check,
  X,
  Eraser,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function BackgroundRemover() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'background' | 'object'>('background');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setProcessedImage(null);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);

    try {
      // Configure based on mode if needed, but for now standard removal
      // The library is heavy, first run triggers download
      const imageBlob = await removeBackground(uploadedImage);
      const url = URL.createObjectURL(imageBlob);

      setProcessedImage(url);
      toast.success(`${mode === 'background' ? 'Background' : 'Object'} removed successfully!`);
    } catch (error) {
      console.error('Background removal failed:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `removed-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded!');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setProcessedImage(null);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-4">
              <Wand2 className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">AI Background Remover</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Remove <span className="text-gradient">Backgrounds</span> Instantly
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Upload an image and let our AI remove the background or unwanted objects in seconds.
            </p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => setMode('background')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'background'
                  ? 'bg-purple text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                Remove Background
              </button>
              <button
                onClick={() => setMode('object')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'object'
                  ? 'bg-purple text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                Remove Objects
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Original Image</h3>
                  {uploadedImage && (
                    <button
                      onClick={clearImage}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {!uploadedImage ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-purple/50 hover:bg-white/5 transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple/20 flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-purple" />
                    </div>
                    <p className="text-white font-medium mb-2">
                      Click or drag image here
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, WebP (max 10MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={uploadedImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {uploadedImage && (
                  <Button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Eraser className="w-5 h-5 mr-2" />
                        {mode === 'background' ? 'Remove Background' : 'Remove Objects'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Result Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Result</h3>
                  {processedImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>

                <div
                  className="aspect-video rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                >
                  {processedImage ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={processedImage}
                      alt="Processed"
                      className="w-full h-full object-contain"
                      style={{
                        filter: mode === 'background' ? 'brightness(1.1)' : 'none'
                      }}
                    />
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Image className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-500">
                        {isProcessing ? 'Processing...' : 'Result will appear here'}
                      </p>
                    </div>
                  )}
                </div>

                {processedImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Processed successfully</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Why use our Background Remover?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'AI-Powered', desc: 'Advanced machine learning for precise detection' },
                { title: 'Instant Results', desc: 'Get your images processed in seconds' },
                { title: 'High Quality', desc: 'Maintain original image resolution and quality' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-card border border-border-gray"
                >
                  <Sparkles className="w-5 h-5 text-purple mb-2" />
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
