'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiImage, FiDownload, FiRefreshCw, FiEye, FiZap, FiBook, FiClock, FiMapPin } from 'react-icons/fi';
import { MdHistory, MdPalette, MdAutoAwesome, MdShare } from 'react-icons/md';

interface GeneratedVisual {
  id: string;
  prompt: string;
  imageUrl: string;
  title: string;
  description: string;
  historicalContext: string;
  keyElements: string[];
  timestamp: Date;
}

const HistoryVisualsMaker = () => {
  const [eventDescription, setEventDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVisuals, setGeneratedVisuals] = useState<GeneratedVisual[]>([]);
  const [selectedVisual, setSelectedVisual] = useState<GeneratedVisual | null>(null);

  const samplePrompts = [
    "Battle of Panipat 1526 - Babur vs Ibrahim Lodi with cannons and cavalry",
    "Ashoka's conversion to Buddhism after Kalinga War with peaceful monks",
    "Taj Mahal construction with thousands of workers and marble architecture",
    "Salt March 1930 - Gandhi leading peaceful protesters to Dandi beach",
    "Harappan civilization with planned cities and advanced drainage systems",
    "Mughal court of Akbar with diverse nobles and cultural synthesis",
    "British East India Company trading posts in colonial Calcutta",
    "Sepoy Mutiny 1857 - Indian soldiers rebelling against British rule"
  ];

  const generateVisual = async () => {
    if (!eventDescription.trim()) {
      alert('Please describe a historical event first');
      return;
    }

    setIsGenerating(true);

    // Simulate AI image generation
    setTimeout(() => {
      const newVisual: GeneratedVisual = {
        id: `visual-${Date.now()}`,
        prompt: eventDescription,
        imageUrl: generatePlaceholderImage(eventDescription),
        title: extractTitle(eventDescription),
        description: eventDescription,
        historicalContext: generateHistoricalContext(eventDescription),
        keyElements: extractKeyElements(eventDescription),
        timestamp: new Date()
      };

      setGeneratedVisuals(prev => [newVisual, ...prev]);
      setSelectedVisual(newVisual);
      setIsGenerating(false);
    }, 3000);
  };

  const generatePlaceholderImage = (description: string): string => {
    // In a real implementation, this would call an AI image generation API
    // For now, we'll use a placeholder service that creates relevant historical images
    const keywords = description.toLowerCase();
    
    if (keywords.includes('battle') || keywords.includes('war')) {
      return 'https://images.pexels.com/photos/161936/castle-middle-ages-knight-armor-161936.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('taj mahal') || keywords.includes('architecture')) {
      return 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('gandhi') || keywords.includes('march')) {
      return 'https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('harappa') || keywords.includes('civilization')) {
      return 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('mughal') || keywords.includes('court')) {
      return 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('british') || keywords.includes('colonial')) {
      return 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (keywords.includes('ashoka') || keywords.includes('buddhism')) {
      return 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else {
      return 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
  };

  const extractTitle = (description: string): string => {
    // Extract a title from the description
    const words = description.split(' ');
    if (words.length <= 6) return description;
    return words.slice(0, 6).join(' ') + '...';
  };

  const generateHistoricalContext = (description: string): string => {
    // Generate contextual information based on the description
    const keywords = description.toLowerCase();
    
    if (keywords.includes('panipat')) {
      return "The First Battle of Panipat (1526) marked the beginning of Mughal rule in India. Babur's use of gunpowder and cannons revolutionized Indian warfare and established the foundation of one of history's greatest empires.";
    } else if (keywords.includes('ashoka')) {
      return "Emperor Ashoka's transformation after the Kalinga War represents one of history's most remarkable conversions from conquest to compassion. His embrace of Buddhism influenced the spread of the religion across Asia.";
    } else if (keywords.includes('taj mahal')) {
      return "The Taj Mahal, built by Shah Jahan as a mausoleum for his wife Mumtaz Mahal, represents the pinnacle of Mughal architecture. Its construction involved over 20,000 artisans and took 22 years to complete.";
    } else if (keywords.includes('salt march')) {
      return "Gandhi's Salt March (1930) was a pivotal moment in India's independence movement. The 240-mile march to Dandi challenged British salt monopoly and demonstrated the power of non-violent resistance.";
    } else if (keywords.includes('harappa')) {
      return "The Harappan Civilization (2600-1900 BCE) was one of the world's earliest urban civilizations, known for its advanced city planning, sophisticated drainage systems, and standardized weights and measures.";
    } else {
      return "This historical event represents a significant moment in Indian history, contributing to the cultural, political, or social development of the subcontinent and leaving lasting impacts on subsequent generations.";
    }
  };

  const extractKeyElements = (description: string): string[] => {
    const keywords = description.toLowerCase();
    const elements: string[] = [];
    
    if (keywords.includes('battle') || keywords.includes('war')) {
      elements.push('Military Strategy', 'Weapons & Armor', 'Battlefield Tactics');
    }
    if (keywords.includes('architecture') || keywords.includes('building')) {
      elements.push('Architectural Style', 'Construction Techniques', 'Cultural Symbolism');
    }
    if (keywords.includes('gandhi') || keywords.includes('march')) {
      elements.push('Non-violent Resistance', 'Mass Movement', 'Political Strategy');
    }
    if (keywords.includes('civilization') || keywords.includes('harappa')) {
      elements.push('Urban Planning', 'Trade Networks', 'Social Organization');
    }
    if (keywords.includes('mughal') || keywords.includes('court')) {
      elements.push('Royal Court', 'Cultural Synthesis', 'Administrative System');
    }
    
    return elements.length > 0 ? elements : ['Historical Context', 'Cultural Impact', 'Political Significance'];
  };

  const downloadImage = (visual: GeneratedVisual) => {
    // In a real implementation, this would download the actual generated image
    const link = document.createElement('a');
    link.href = visual.imageUrl;
    link.download = `${visual.title.replace(/\s+/g, '_')}_historical_visual.jpg`;
    link.click();
  };

  const loadSamplePrompt = (prompt: string) => {
    setEventDescription(prompt);
  };

  const clearAll = () => {
    setEventDescription('');
    setGeneratedVisuals([]);
    setSelectedVisual(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <MdPalette className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                  History Visuals Maker
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Describe any historical event and generate stunning AI visuals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">AI-Powered</p>
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70">Image Generation</p>
            </div>
            <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <p className="text-lg font-bold text-pink-600 dark:text-pink-400">Instant</p>
              <p className="text-xs text-pink-600/70 dark:text-pink-400/70">Visual Creation</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Educational</p>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Visual Learning</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">Download</p>
              <p className="text-xs text-green-600/70 dark:text-green-400/70">High Quality</p>
            </div>
          </div>
        </Card>

        {/* Input Section */}
        <Card extra="p-6">
          <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <MdAutoAwesome className="h-4 w-4" />
            Describe Historical Event
          </h2>

          <div className="space-y-4">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Description
              </label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Describe any historical event in detail... (e.g., 'Battle of Panipat 1526 with Babur's cannons facing Ibrahim Lodi's elephants and cavalry on a dusty battlefield')"
                className="w-full h-24 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Be specific about people, places, objects, and atmosphere for better results
              </p>
            </div>

            {/* Sample Prompts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Examples
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {samplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => loadSamplePrompt(prompt)}
                    className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-3">
              <button
                onClick={generateVisual}
                disabled={isGenerating || !eventDescription.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating Visual...
                  </>
                ) : (
                  <>
                    <FiZap className="h-4 w-4" />
                    Generate Historical Visual
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 text-sm">💡 Tips for Better Visuals:</h4>
            <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
              <li>• Include specific details: people, clothing, weapons, architecture</li>
              <li>• Mention the setting: battlefield, palace, city, countryside</li>
              <li>• Describe the atmosphere: peaceful, chaotic, ceremonial, dramatic</li>
              <li>• Add time period indicators: medieval armor, colonial uniforms, ancient robes</li>
              <li>• Include cultural elements: flags, symbols, religious items</li>
            </ul>
          </div>
        </Card>

        {/* Generated Visuals */}
        {generatedVisuals.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visuals Gallery */}
            <div className="lg:col-span-2">
              <Card extra="p-6">
                <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                  <FiImage className="h-4 w-4" />
                  Generated Visuals ({generatedVisuals.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedVisuals.map((visual) => (
                    <div
                      key={visual.id}
                      onClick={() => setSelectedVisual(visual)}
                      className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedVisual?.id === visual.id
                          ? 'border-purple-500 shadow-lg shadow-purple-500/25'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={visual.imageUrl}
                          alt={visual.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        
                        {/* Overlay Actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadImage(visual);
                            }}
                            className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors"
                            title="Download"
                          >
                            <FiDownload className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>

                        {/* Generation Indicator */}
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            AI Generated
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-navy-700 dark:text-white mb-1 truncate">
                          {visual.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {visual.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <FiClock className="h-3 w-3" />
                          <span>{visual.timestamp.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Visual Details */}
            <div className="lg:col-span-1">
              {selectedVisual ? (
                <Card extra="p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
                      Visual Details
                    </h2>
                    <button
                      onClick={() => downloadImage(selectedVisual)}
                      className="p-2 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg transition-colors"
                      title="Download Image"
                    >
                      <FiDownload className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Large Image */}
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={selectedVisual.imageUrl}
                        alt={selectedVisual.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        {selectedVisual.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-navy-700 dark:text-white mb-2 text-sm">
                        Original Description
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedVisual.description}
                      </p>
                    </div>

                    {/* Historical Context */}
                    <div>
                      <h4 className="font-semibold text-navy-700 dark:text-white mb-2 text-sm flex items-center gap-1">
                        <FiBook className="h-3 w-3" />
                        Historical Context
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedVisual.historicalContext}
                      </p>
                    </div>

                    {/* Key Elements */}
                    <div>
                      <h4 className="font-semibold text-navy-700 dark:text-white mb-2 text-sm">
                        Key Visual Elements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVisual.keyElements.map((element, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                          >
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Generation Info */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <MdAutoAwesome className="h-3 w-3" />
                        <span>Generated on {selectedVisual.timestamp.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadImage(selectedVisual)}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FiDownload className="h-3 w-3" />
                        Download
                      </button>
                      <button
                        onClick={() => setEventDescription(selectedVisual.prompt)}
                        className="flex items-center justify-center gap-2 border border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FiRefreshCw className="h-3 w-3" />
                        Regenerate
                      </button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card extra="p-6 text-center">
                  <div className="py-8">
                    <FiImage className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      No Visual Selected
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Generate or select a visual to see details
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedVisuals.length === 0 && !isGenerating && (
          <Card extra="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdPalette className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                Bring History to Life
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Describe any historical event and watch as AI creates stunning visual representations. 
                Perfect for visual learners and making history more engaging and memorable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MdHistory className="h-4 w-4 text-purple-500" />
                  <span>Any Historical Event</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiZap className="h-4 w-4 text-purple-500" />
                  <span>Instant Generation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiDownload className="h-4 w-4 text-purple-500" />
                  <span>High Quality Download</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HistoryVisualsMaker;