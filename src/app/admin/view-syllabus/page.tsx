'use client';
import Card from 'components/card';
import { FiArrowLeft, FiDownload, FiPrinter, FiTarget } from 'react-icons/fi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState } from 'react';

const ViewSyllabusPage = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const syllabusData = [
    {
      paper: 'Paper I - General Studies',
      duration: '2 hours',
      marks: '200 marks',
      sections: [
        {
          title: 'History of India and Indian National Movement',
          topics: [
            'Ancient India: Indus Valley Civilization, Vedic Period, Mauryan Empire, Gupta Period',
            'Medieval India: Delhi Sultanate, Mughal Empire, Regional Kingdoms',
            'Modern India: British Rule, Freedom Struggle, Social Reform Movements',
            'Art and Culture: Architecture, Sculpture, Painting, Music, Dance, Literature'
          ]
        },
        {
          title: 'Indian and World Geography',
          topics: [
            'Physical Geography: Earth, Landforms, Climate, Natural Vegetation',
            'Human Geography: Population, Settlement, Economic Activities',
            'Indian Geography: Physical Features, Climate, Natural Resources',
            'World Geography: Continents, Oceans, Important Places'
          ]
        },
        {
          title: 'Indian Polity and Governance',
          topics: [
            'Constitution: Preamble, Fundamental Rights, Directive Principles',
            'Union and State Government: Parliament, Executive, Judiciary',
            'Local Government: Panchayati Raj, Urban Local Bodies',
            'Constitutional Bodies: Election Commission, CAG, UPSC'
          ]
        },
        {
          title: 'Economic and Social Development',
          topics: [
            'Indian Economy: Planning, Public Sector, Financial System',
            'Economic Reforms: Liberalization, Privatization, Globalization',
            'Social Development: Education, Health, Poverty, Employment',
            'Government Schemes: Welfare Programs, Development Initiatives'
          ]
        },
        {
          title: 'Environmental Ecology and Climate Change',
          topics: [
            'Ecology: Ecosystems, Biodiversity, Food Chains',
            'Environmental Issues: Pollution, Deforestation, Climate Change',
            'Conservation: Wildlife Protection, National Parks, Sanctuaries',
            'International Agreements: Paris Agreement, Kyoto Protocol'
          ]
        },
        {
          title: 'General Science',
          topics: [
            'Physics: Mechanics, Heat, Light, Sound, Electricity',
            'Chemistry: Atoms, Molecules, Acids, Bases, Metals',
            'Biology: Cell, Genetics, Evolution, Human Body',
            'Applied Science: Technology, Space, Defense'
          ]
        }
      ]
    },
    {
      paper: 'Paper II - Civil Services Aptitude Test (CSAT)',
      duration: '2 hours',
      marks: '200 marks (Qualifying - 33%)',
      sections: [
        {
          title: 'Comprehension',
          topics: [
            'Reading Comprehension passages',
            'Understanding main ideas and themes',
            'Drawing inferences and conclusions',
            'Vocabulary and language skills'
          ]
        },
        {
          title: 'Interpersonal Skills and Communication',
          topics: [
            'Communication skills',
            'Interpersonal relationships',
            'Social skills and emotional intelligence',
            'Problem-solving abilities'
          ]
        },
        {
          title: 'Logical Reasoning and Analytical Ability',
          topics: [
            'Logical sequences and patterns',
            'Analogies and classifications',
            'Coding and decoding',
            'Critical thinking and analysis'
          ]
        },
        {
          title: 'Decision Making and Problem Solving',
          topics: [
            'Data interpretation',
            'Problem-solving techniques',
            'Decision-making scenarios',
            'Logical analysis of situations'
          ]
        },
        {
          title: 'General Mental Ability',
          topics: [
            'Number series and patterns',
            'Data sufficiency',
            'Basic mathematics',
            'Mental calculations'
          ]
        },
        {
          title: 'Basic Numeracy',
          topics: [
            'Arithmetic: Percentages, Ratios, Averages',
            'Algebra: Basic equations and inequalities',
            'Geometry: Areas, Volumes, Angles',
            'Data Interpretation: Charts, Graphs, Tables'
          ]
        }
      ]
    }
  ];

  const examPattern = {
    totalPapers: 2,
    totalMarks: 400,
    duration: '2 hours each',
    negativeMarking: '1/3 for each wrong answer',
    qualifyingMarks: 'Paper II: 33%, Paper I: Merit based'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
              Back to Prelims
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.location.href = '/admin/syllabus-tracker'}
              className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
            >
              <FiTarget className="h-4 w-4" />
              Track Progress
            </button>
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <FiDownload className="h-4 w-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <FiPrinter className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
          UPSC Prelims Syllabus 2025
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete syllabus for Civil Services Preliminary Examination
        </p>
      </Card>

      {/* Exam Pattern */}
      <Card extra="p-6">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
          Examination Pattern
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {examPattern.totalPapers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Papers</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {examPattern.totalMarks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Marks</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {examPattern.duration}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
              -1/3
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Negative Marking</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              33%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">CSAT Qualifying</div>
          </div>
        </div>
      </Card>

      {/* Detailed Syllabus */}
      {syllabusData.map((paper, paperIndex) => (
        <Card key={paperIndex} extra="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">
              {paper.paper}
            </h2>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Duration: {paper.duration}</span>
              <span>•</span>
              <span>Marks: {paper.marks}</span>
            </div>
          </div>

          <div className="space-y-4">
            {paper.sections.map((section, sectionIndex) => {
              const globalIndex = paperIndex * 100 + sectionIndex;
              const isExpanded = expandedSections.includes(globalIndex);
              
              return (
                <div key={sectionIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => toggleSection(globalIndex)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                      {section.title}
                    </h3>
                    {isExpanded ? (
                      <MdExpandLess className="h-5 w-5 text-gray-500" />
                    ) : (
                      <MdExpandMore className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <ul className="space-y-2">
                        {section.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Important Notes */}
      <Card extra="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-3">
          Important Notes
        </h3>
        <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
          <li>• Paper II (CSAT) is qualifying in nature with minimum 33% marks required</li>
          <li>• Paper I marks are considered for final merit and ranking</li>
          <li>• Each question carries 2 marks with 1/3 negative marking for wrong answers</li>
          <li>• Both papers are objective type (multiple choice questions)</li>
          <li>• Candidates must qualify in both papers to proceed to Mains</li>
        </ul>
      </Card>

      {/* Quick Action */}
      <Card extra="p-6 bg-gradient-to-r from-brand-500 to-brand-600 border-0">
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">Start Tracking Your Progress</h3>
          <p className="mb-6 opacity-90">Use our syllabus tracker to monitor your preparation</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/admin/syllabus-tracker'}
              className="bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-white/95 transition-colors"
            >
              Open Syllabus Tracker
            </button>
            <button 
              onClick={() => window.location.href = '/admin/nft-marketplace'}
              className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Go to Toolkit
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewSyllabusPage;