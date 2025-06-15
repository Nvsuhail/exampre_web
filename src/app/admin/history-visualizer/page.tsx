'use client';
import { useState, useRef, useEffect } from 'react';
import Card from 'components/card';
import { FiCalendar, FiSearch, FiFilter, FiZoomIn, FiZoomOut, FiRefreshCw, FiDownload, FiEye, FiBook, FiMapPin } from 'react-icons/fi';
import { MdTimeline, MdHistory, MdPlace, MdPerson, MdEvent } from 'react-icons/md';

interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  period: string;
  category: 'political' | 'social' | 'economic' | 'cultural' | 'military' | 'religious';
  description: string;
  significance: string;
  keyFigures: string[];
  location: string;
  relatedEvents: string[];
}

interface TimelinePeriod {
  name: string;
  startYear: number;
  endYear: number;
  color: string;
  description: string;
}

const HistoryVisualizer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'map' | 'tree'>('timeline');
  const [zoom, setZoom] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const timelineRef = useRef<HTMLDivElement>(null);

  const periods: TimelinePeriod[] = [
    { name: 'Ancient India', startYear: -3000, endYear: 550, color: '#8B5CF6', description: 'Indus Valley to Gupta Empire' },
    { name: 'Medieval India', startYear: 550, endYear: 1526, color: '#06B6D4', description: 'Post-Gupta to Pre-Mughal' },
    { name: 'Mughal Period', startYear: 1526, endYear: 1757, color: '#F59E0B', description: 'Mughal Empire Era' },
    { name: 'Colonial Period', startYear: 1757, endYear: 1947, color: '#EF4444', description: 'British Colonial Rule' },
    { name: 'Modern India', startYear: 1947, endYear: 2024, color: '#10B981', description: 'Independent India' }
  ];

  const events: HistoricalEvent[] = [
    {
      id: '1',
      title: 'Indus Valley Civilization',
      date: '2600-1900 BCE',
      year: -2600,
      period: 'Ancient India',
      category: 'social',
      description: 'One of the world\'s earliest urban civilizations, known for advanced city planning and drainage systems.',
      significance: 'Established foundation of Indian civilization with advanced urban planning.',
      keyFigures: ['Unknown rulers'],
      location: 'Harappa, Mohenjo-daro',
      relatedEvents: ['2']
    },
    {
      id: '2',
      title: 'Vedic Period',
      date: '1500-500 BCE',
      year: -1500,
      period: 'Ancient India',
      category: 'religious',
      description: 'Period of composition of Vedic texts and establishment of Vedic religion.',
      significance: 'Foundation of Hindu philosophy and religious practices.',
      keyFigures: ['Vedic Rishis'],
      location: 'Northwestern India',
      relatedEvents: ['3']
    },
    {
      id: '3',
      title: 'Mauryan Empire',
      date: '322-185 BCE',
      year: -322,
      period: 'Ancient India',
      category: 'political',
      description: 'First pan-Indian empire established by Chandragupta Maurya.',
      significance: 'First unified Indian empire, spread of Buddhism under Ashoka.',
      keyFigures: ['Chandragupta Maurya', 'Ashoka', 'Chanakya'],
      location: 'Pataliputra',
      relatedEvents: ['4']
    },
    {
      id: '4',
      title: 'Gupta Empire',
      date: '320-550 CE',
      year: 320,
      period: 'Ancient India',
      category: 'cultural',
      description: 'Golden Age of Indian culture, science, and literature.',
      significance: 'Peak of classical Indian civilization, advances in mathematics and astronomy.',
      keyFigures: ['Chandragupta I', 'Samudragupta', 'Chandragupta II'],
      location: 'Pataliputra',
      relatedEvents: ['5']
    },
    {
      id: '5',
      title: 'Delhi Sultanate',
      date: '1206-1526 CE',
      year: 1206,
      period: 'Medieval India',
      category: 'political',
      description: 'Series of Muslim dynasties that ruled from Delhi.',
      significance: 'Introduction of Islamic rule and culture in India.',
      keyFigures: ['Qutb-ud-din Aibak', 'Alauddin Khilji', 'Muhammad bin Tughluq'],
      location: 'Delhi',
      relatedEvents: ['6']
    },
    {
      id: '6',
      title: 'Mughal Empire',
      date: '1526-1857 CE',
      year: 1526,
      period: 'Mughal Period',
      category: 'political',
      description: 'Major Islamic empire that ruled most of the Indian subcontinent.',
      significance: 'Cultural synthesis, architectural marvels like Taj Mahal.',
      keyFigures: ['Babur', 'Akbar', 'Shah Jahan', 'Aurangzeb'],
      location: 'Delhi, Agra',
      relatedEvents: ['7']
    },
    {
      id: '7',
      title: 'Battle of Plassey',
      date: '1757 CE',
      year: 1757,
      period: 'Colonial Period',
      category: 'military',
      description: 'Decisive battle that established British dominance in India.',
      significance: 'Beginning of British colonial rule in India.',
      keyFigures: ['Robert Clive', 'Siraj-ud-Daulah'],
      location: 'Plassey, Bengal',
      relatedEvents: ['8']
    },
    {
      id: '8',
      title: 'Sepoy Mutiny',
      date: '1857 CE',
      year: 1857,
      period: 'Colonial Period',
      category: 'military',
      description: 'First major uprising against British rule.',
      significance: 'End of East India Company rule, beginning of Crown rule.',
      keyFigures: ['Mangal Pandey', 'Rani Lakshmibai', 'Bahadur Shah Zafar'],
      location: 'Meerut, Delhi, Lucknow',
      relatedEvents: ['9']
    },
    {
      id: '9',
      title: 'Indian Independence',
      date: '1947 CE',
      year: 1947,
      period: 'Modern India',
      category: 'political',
      description: 'India gained independence from British rule.',
      significance: 'Birth of modern India and Pakistan.',
      keyFigures: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Muhammad Ali Jinnah'],
      location: 'New Delhi',
      relatedEvents: ['10']
    },
    {
      id: '10',
      title: 'Constitution of India',
      date: '1950 CE',
      year: 1950,
      period: 'Modern India',
      category: 'political',
      description: 'Adoption of the Indian Constitution.',
      significance: 'Establishment of India as a democratic republic.',
      keyFigures: ['Dr. B.R. Ambedkar', 'Rajendra Prasad'],
      location: 'New Delhi',
      relatedEvents: []
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', color: '#6B7280' },
    { id: 'political', name: 'Political', color: '#EF4444' },
    { id: 'social', name: 'Social', color: '#06B6D4' },
    { id: 'economic', name: 'Economic', color: '#F59E0B' },
    { id: 'cultural', name: 'Cultural', color: '#8B5CF6' },
    { id: 'military', name: 'Military', color: '#DC2626' },
    { id: 'religious', name: 'Religious', color: '#10B981' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesPeriod = selectedPeriod === 'all' || event.period === selectedPeriod;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.keyFigures.some(figure => figure.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesPeriod && matchesCategory && matchesSearch;
  });

  const getEventPosition = (year: number) => {
    const minYear = -3000;
    const maxYear = 2024;
    const range = maxYear - minYear;
    return ((year - minYear) / range) * 100;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : '#6B7280';
  };

  const resetView = () => {
    setZoom(1);
    setSelectedEvent(null);
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = 0;
    }
  };

  const exportTimeline = () => {
    const data = {
      events: filteredEvents,
      periods,
      filters: { selectedPeriod, selectedCategory, searchTerm }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history_timeline.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-navy-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MdTimeline className="h-6 w-6 text-brand-500" />
            <h1 className="text-xl font-bold text-navy-700 dark:text-white">
              History Visualizer
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {(['timeline', 'map', 'tree'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white text-sm w-64"
            />
          </div>

          {/* Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            title="Filters"
          >
            <FiFilter className="h-4 w-4" />
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
            >
              <FiZoomOut className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
            >
              <FiZoomIn className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={resetView}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            title="Reset View"
          >
            <FiRefreshCw className="h-4 w-4" />
          </button>

          <button
            onClick={exportTimeline}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            title="Export"
          >
            <FiDownload className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Historical Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white text-sm"
              >
                <option value="all">All Periods</option>
                {periods.map((period) => (
                  <option key={period.name} value={period.name}>
                    {period.name} ({period.startYear > 0 ? period.startYear : Math.abs(period.startYear) + ' BCE'} - {period.endYear} CE)
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category.id ? category.color : undefined
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="flex-1 flex flex-col">
            {/* Period Headers */}
            <div className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2 overflow-x-auto">
                {periods.map((period) => (
                  <div
                    key={period.name}
                    className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: period.color }}
                  >
                    <div className="font-semibold">{period.name}</div>
                    <div className="text-xs opacity-90">
                      {period.startYear > 0 ? period.startYear : Math.abs(period.startYear) + ' BCE'} - {period.endYear} CE
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 relative overflow-auto" ref={timelineRef}>
              <div 
                className="relative h-full min-w-full"
                style={{ 
                  width: `${100 * zoom}%`,
                  minHeight: '600px'
                }}
              >
                {/* Period Backgrounds */}
                {periods.map((period) => (
                  <div
                    key={period.name}
                    className="absolute top-0 bottom-0 opacity-10"
                    style={{
                      left: `${getEventPosition(period.startYear)}%`,
                      width: `${getEventPosition(period.endYear) - getEventPosition(period.startYear)}%`,
                      backgroundColor: period.color
                    }}
                  />
                ))}

                {/* Timeline Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2" />

                {/* Events */}
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="absolute transform -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${getEventPosition(event.year)}%`,
                      top: `${50 + (index % 2 === 0 ? -80 : 80)}px`
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {/* Connection Line */}
                    <div
                      className="absolute w-px bg-gray-400 dark:bg-gray-500"
                      style={{
                        left: '50%',
                        height: index % 2 === 0 ? '80px' : '80px',
                        top: index % 2 === 0 ? '40px' : '-120px'
                      }}
                    />

                    {/* Event Marker */}
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    />

                    {/* Event Card */}
                    <div className="absolute bg-white dark:bg-navy-800 rounded-lg shadow-lg p-3 min-w-[200px] max-w-[300px] border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-shadow"
                         style={{
                           left: '-100px',
                           top: index % 2 === 0 ? '-120px' : '20px'
                         }}>
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-navy-700 dark:text-white text-sm truncate">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {event.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <MdPlace className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Year Markers */}
                {[-3000, -2000, -1000, 0, 500, 1000, 1500, 1750, 1850, 1900, 1950, 2000].map((year) => (
                  <div
                    key={year}
                    className="absolute top-1/2 transform -translate-y-1/2"
                    style={{ left: `${getEventPosition(year)}%` }}
                  >
                    <div className="w-px h-8 bg-gray-400 dark:bg-gray-500" />
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {year > 0 ? `${year} CE` : year === 0 ? '0' : `${Math.abs(year)} BCE`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map View Placeholder */}
        {viewMode === 'map' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MdPlace className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Map View Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Interactive geographical visualization of historical events
              </p>
            </div>
          </div>
        )}

        {/* Tree View Placeholder */}
        {viewMode === 'tree' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MdHistory className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tree View Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Hierarchical visualization of cause-and-effect relationships
              </p>
            </div>
          </div>
        )}

        {/* Event Details Panel */}
        {selectedEvent && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-700 dark:text-white">
                  Event Details
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Title and Category */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
                    />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {selectedEvent.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                    {selectedEvent.title}
                  </h3>
                </div>

                {/* Date and Period */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="h-4 w-4" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdTimeline className="h-4 w-4" />
                    <span>{selectedEvent.period}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiMapPin className="h-4 w-4" />
                  <span>{selectedEvent.location}</span>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-navy-700 dark:text-white mb-2">Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Significance */}
                <div>
                  <h4 className="font-semibold text-navy-700 dark:text-white mb-2">Historical Significance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedEvent.significance}
                  </p>
                </div>

                {/* Key Figures */}
                <div>
                  <h4 className="font-semibold text-navy-700 dark:text-white mb-2">Key Figures</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.keyFigures.map((figure, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                      >
                        {figure}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related Events */}
                {selectedEvent.relatedEvents.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-navy-700 dark:text-white mb-2">Related Events</h4>
                    <div className="space-y-2">
                      {selectedEvent.relatedEvents.map((relatedId) => {
                        const relatedEvent = events.find(e => e.id === relatedId);
                        return relatedEvent ? (
                          <button
                            key={relatedId}
                            onClick={() => setSelectedEvent(relatedEvent)}
                            className="block w-full text-left p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className="text-sm font-medium text-navy-700 dark:text-white">
                              {relatedEvent.title}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {relatedEvent.date}
                            </div>
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories:</span>
            <div className="flex items-center gap-3">
              {categories.slice(1).map((category) => (
                <div key={category.id} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryVisualizer;