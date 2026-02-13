import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PenTool,
  Wand2,
  Copy,
  RefreshCw,
  Sparkles,
  Check,
  Lightbulb,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

const tones = [
  { id: 'professional', name: 'Professional', icon: '💼' },
  { id: 'casual', name: 'Casual', icon: '😊' },
  { id: 'enthusiastic', name: 'Enthusiastic', icon: '🎉' },
  { id: 'informative', name: 'Informative', icon: '📚' },
  { id: 'persuasive', name: 'Persuasive', icon: '💡' },
];

const contentTypes = [
  { id: 'blog', name: 'Blog Post' },
  { id: 'title', name: 'Title Ideas' },
  { id: 'outline', name: 'Outline' },
  { id: 'intro', name: 'Introduction' },
  { id: 'conclusion', name: 'Conclusion' },
];

const sampleTitles = [
  "10 AI Trends That Will Transform Your Business in 2024",
  "The Ultimate Guide to Machine Learning for Beginners",
  "How to Leverage AI for Content Creation",
  "5 Ways AI is Revolutionizing Healthcare",
];

export default function BlogGenerator() {
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [contentType, setContentType] = useState('blog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (contentType === 'title') {
      setGeneratedTitles(sampleTitles.map(title =>
        title.replace(/2024|Machine Learning|Healthcare|Content Creation/,
          topic.split(' ').slice(0, 2).join(' '))
      ));
    } else {
      setGeneratedContent(`# ${topic}\n\n## Introduction\n\nIn today's rapidly evolving digital landscape, ${topic.toLowerCase()} has become increasingly important for businesses and individuals alike. This comprehensive guide will explore the key aspects and provide actionable insights.\n\n## Key Points\n\n1. **Understanding the Basics**\n   - Learn the fundamental concepts\n   - Explore real-world applications\n   - Identify common challenges\n\n2. **Best Practices**\n   - Implement proven strategies\n   - Avoid common pitfalls\n   - Optimize for success\n\n3. **Future Trends**\n   - Stay ahead of the curve\n   - Embrace innovation\n   - Prepare for changes\n\n## Conclusion\n\nBy following these guidelines, you'll be well-equipped to leverage ${topic.toLowerCase()} effectively in your projects. Remember, continuous learning and adaptation are key to success.`);
    }

    setIsGenerating(false);
    toast.success('Content generated successfully!');
  };

  const handleCopy = () => {
    if (generatedContent || generatedTitles.length > 0) {
      const textToCopy = contentType === 'title'
        ? generatedTitles.join('\n')
        : generatedContent;
      navigator.clipboard.writeText(textToCopy || '');
      toast.success('Copied to clipboard!');
    }
  };

  const handleRegenerate = () => {
    setGeneratedContent(null);
    setGeneratedTitles([]);
    handleGenerate();
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
              <PenTool className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">AI Blog Generator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Create Engaging <span className="text-gradient">Content</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Generate blog posts, titles, and outlines in seconds. Let AI do the heavy lifting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Content Type */}
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <label className="block text-white font-medium mb-4">
                  What do you want to create?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setContentType(type.id);
                        setGeneratedContent(null);
                        setGeneratedTitles([]);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${contentType === type.id
                          ? 'bg-purple text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Input */}
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <label className="block text-white font-medium mb-3">
                  Enter your topic
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={`e.g., ${contentType === 'title' ? 'AI in healthcare' : 'The future of artificial intelligence'}`}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple/50"
                />
              </div>

              {/* Tone Selection */}
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray">
                <label className="block text-white font-medium mb-4">
                  Select tone
                </label>
                <div className="flex flex-wrap gap-3">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${selectedTone === tone.id
                          ? 'border-purple bg-purple/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                    >
                      <span>{tone.icon}</span>
                      <span className="text-sm text-gray-300">{tone.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
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
                    Generate {contentTypes.find(t => t.id === contentType)?.name}
                  </>
                )}
              </Button>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 rounded-2xl bg-dark-card border border-border-gray h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Result</h3>
                  {(generatedContent || generatedTitles.length > 0) && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleRegenerate}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Display Area */}
                <div className="min-h-[400px] rounded-xl bg-white/5 border border-white/10 p-4 overflow-auto">
                  {generatedContent ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="prose prose-invert max-w-none"
                    >
                      <pre className="whitespace-pre-wrap font-sans text-gray-300">
                        {generatedContent}
                      </pre>
                    </motion.div>
                  ) : generatedTitles.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      {generatedTitles.map((title, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                          onClick={() => {
                            navigator.clipboard.writeText(title);
                            toast.success('Title copied!');
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white">{title}</span>
                            <Copy className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-purple/20 flex items-center justify-center mb-4">
                        <Sparkles className="w-10 h-10 text-purple" />
                      </div>
                      <p className="text-gray-500">
                        Your generated content will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Word Count */}
                {(generatedContent || generatedTitles.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-between text-sm text-gray-500"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500" />
                        Generated successfully
                      </span>
                      {generatedContent && (
                        <span>
                          {generatedContent.split(' ').length} words
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Saved 2 hours
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Tips for better results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Be specific', desc: 'Include key points you want covered in the content' },
                { title: 'Choose the right tone', desc: 'Match the tone to your target audience' },
                { title: 'Use keywords', desc: 'Include relevant keywords for SEO optimization' },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-card border border-border-gray"
                >
                  <Lightbulb className="w-5 h-5 text-purple mb-2" />
                  <h3 className="text-white font-medium mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
