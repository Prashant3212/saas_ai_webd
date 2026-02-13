import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Award, BarChart, TrendingUp, BookOpen, Layers } from 'lucide-react';
import Navbar from '../../components/ui-custom/Navbar';
import { extractTextFromFile } from '../../lib/fileParser';
import { analyzeResume, type AnalysisResult } from '../../lib/aiService';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugText, setDebugText] = useState<string>(""); // New debug state

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      setDebugText("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setDebugText("");

    try {
      // 1. Extract text from file
      const resumeText = await extractTextFromFile(file);
      console.log("Extracted Text Preview:", resumeText.slice(0, 100)); // Console log for verification
      setDebugText(resumeText); // Store for UI display

      if (!resumeText.trim()) throw new Error("Could not extract any text from this file. It might be an image-only PDF.");

      // 2. Analyze with AI (No JD needed now)
      const analysis = await analyzeResume(resumeText);

      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Navbar />
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-2">
            <Award className="w-4 h-4 mr-2" />
            <span>AI-Powered Career Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Resume <span className="text-gradient">Audit</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Get a comprehensive ATS score and detailed feedback on your resume's structure, content, and skills.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left / Top: Input Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-6 rounded-2xl space-y-6 h-full border border-white/10">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-primary" />
                Upload Resume
              </h2>

              <div className="relative border-2 border-dashed border-gray-700 hover:border-purple-primary/50 transition-colors rounded-xl p-8 text-center group cursor-pointer aspect-[4/3] flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4 pointer-events-none">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-200">
                      {file ? file.name : "Drop resume here"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, DOCX, TXT
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !file}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-all ${isAnalyzing || !file
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-purple hover:shadow-purple-primary/25 hover:-translate-y-1 text-white'
                  }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Auditing...
                  </>
                ) : (
                  <>
                    <BarChart className="w-5 h-5 mr-2" />
                    Analyze Score
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start text-red-200 text-sm">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right / Bottom: Results Section */}
          <div className="lg:col-span-8">
            {!result ? (
              <div className="h-full min-h-[400px] glass rounded-2xl flex flex-col items-center justify-center text-center p-8 text-gray-500 border border-white/10">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="w-12 h-12 opacity-20" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-300">Detailed ATS Audit</h3>
                <p className="max-w-md">
                  Upload your resume to see your Overall verification score, broken down by Structure, Content, and Skills.
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">

                {/* Scores Overview */}
                <div className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-primary to-transparent opacity-50" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                    {/* Main Score - Large Circle */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-center">
                      <div className="relative inline-flex items-center justify-center mb-2">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="#333" strokeWidth="8" fill="transparent" />
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent"
                            strokeDasharray={351}
                            strokeDashoffset={351 - (351 * result.overallScore) / 100}
                            className={`${result.overallScore >= 80 ? 'text-green-500' :
                              result.overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                              } transition-all duration-1000 ease-out`}
                          />
                        </svg>
                        <span className="absolute text-3xl font-bold">{result.overallScore}</span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium tracking-wide">OVERALL</span>
                    </div>

                    {/* Sub-scores - Progress Bars */}
                    <div className="col-span-1 md:col-span-3 space-y-5">
                      {/* Structure */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-sm font-medium text-gray-300">
                            <Layers className="w-4 h-4 mr-2 text-blue-400" /> Structure & Formatting
                          </span>
                          <span className="text-sm font-bold">{result.structureScore}/100</span>
                        </div>
                        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${result.structureScore}%` }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-sm font-medium text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2 text-purple-400" /> Content & Impact
                          </span>
                          <span className="text-sm font-bold">{result.contentScore}/100</span>
                        </div>
                        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${result.contentScore}%` }} />
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-sm font-medium text-gray-300">
                            <TrendingUp className="w-4 h-4 mr-2 text-pink-400" /> Skills & Keywords
                          </span>
                          <span className="text-sm font-bold">{result.skillsScore}/100</span>
                        </div>
                        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full transition-all duration-1000" style={{ width: `${result.skillsScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-gray-300 italic text-center">"{result.summary}"</p>
                  </div>
                </div>

                {/* Feedback Grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="glass p-6 rounded-2xl border-l-4 border-green-500">
                    <h3 className="text-lg font-bold mb-4 flex items-center text-green-300">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((item: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="glass p-6 rounded-2xl border-l-4 border-red-500">
                    <h3 className="text-lg font-bold mb-4 flex items-center text-red-300">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Improvements Needed
                    </h3>
                    <ul className="space-y-2">
                      {result.weaknesses.map((item: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actionable Feedback - Full Width */}
                <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
                  <h3 className="text-lg font-bold mb-4 flex items-center text-blue-300">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Actionable Steps to Improve Score
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {result.actionableFeedback.map((item: string, i: number) => (
                      <div key={i} className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-sm text-blue-100 flex items-start">
                        <span className="font-bold mr-3 text-blue-400">{i + 1}.</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Debug Section specifically for verifying PDF extraction */}
            {result && (
              <div className="mt-8 pt-8 border-t border-white/10 opacity-50 hover:opacity-100 transition-opacity">
                <details className="cursor-pointer">
                  <summary className="text-xs text-gray-500 mb-2 select-none">Debug: View Extracted Resume Text</summary>
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-green-400 overflow-auto max-h-60 whitespace-pre-wrap border border-green-900/30">
                    {debugText || "No text extracted yet."}
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
