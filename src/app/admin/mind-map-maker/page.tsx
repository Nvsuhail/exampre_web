'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Card from 'components/card';
import { FiPlus, FiMinus, FiEdit3, FiTrash2, FiDownload, FiUpload, FiZoomIn, FiZoomOut, FiMove, FiSave, FiRefreshCw, FiEye, FiSettings } from 'react-icons/fi';
import { MdAccountTree, MdColorLens, MdTextFields, MdShare } from 'react-icons/md';

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  level: number;
  parentId?: string;
  children: string[];
  isExpanded: boolean;
}

interface Connection {
  from: string;
  to: string;
}

const MindMapMaker = () => {
  const [nodes, setNodes] = useState<MindMapNode[]>([
    {
      id: 'root',
      text: 'UPSC Preparation',
      x: 400,
      y: 300,
      color: '#4318FF',
      level: 0,
      children: [],
      isExpanded: true
    }
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showTemplates, setShowTemplates] = useState(false);
  const [mapTitle, setMapTitle] = useState('My Mind Map');
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#4318FF', '#6AD2FF', '#FFB547', '#01B574', '#FF6B6B', 
    '#9C88FF', '#FF9F43', '#00D4AA', '#5F27CD', '#FF3838'
  ];

  const templates = [
    {
      name: 'Indian Constitution',
      nodes: [
        { id: 'root', text: 'Indian Constitution', x: 400, y: 300, color: '#4318FF', level: 0, children: ['parts', 'schedules', 'amendments'], isExpanded: true },
        { id: 'parts', text: 'Parts (22)', x: 200, y: 200, color: '#6AD2FF', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'schedules', text: 'Schedules (12)', x: 400, y: 150, color: '#FFB547', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'amendments', text: 'Amendments (105)', x: 600, y: 200, color: '#01B574', level: 1, parentId: 'root', children: [], isExpanded: true }
      ]
    },
    {
      name: 'Geography Topics',
      nodes: [
        { id: 'root', text: 'Geography', x: 400, y: 300, color: '#4318FF', level: 0, children: ['physical', 'human', 'indian'], isExpanded: true },
        { id: 'physical', text: 'Physical Geography', x: 200, y: 200, color: '#6AD2FF', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'human', text: 'Human Geography', x: 400, y: 150, color: '#FFB547', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'indian', text: 'Indian Geography', x: 600, y: 200, color: '#01B574', level: 1, parentId: 'root', children: [], isExpanded: true }
      ]
    },
    {
      name: 'Economic Planning',
      nodes: [
        { id: 'root', text: 'Economic Planning', x: 400, y: 300, color: '#4318FF', level: 0, children: ['five-year', 'niti', 'sectors'], isExpanded: true },
        { id: 'five-year', text: 'Five Year Plans', x: 200, y: 200, color: '#6AD2FF', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'niti', text: 'NITI Aayog', x: 400, y: 150, color: '#FFB547', level: 1, parentId: 'root', children: [], isExpanded: true },
        { id: 'sectors', text: 'Economic Sectors', x: 600, y: 200, color: '#01B574', level: 1, parentId: 'root', children: [], isExpanded: true }
      ]
    }
  ];

  const addNode = useCallback((parentId?: string) => {
    const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
    const newId = `node-${Date.now()}`;
    
    // Calculate position for new node
    let x = 400;
    let y = 300;
    
    if (parentNode) {
      const childCount = parentNode.children.length;
      const angle = (childCount * 60) * (Math.PI / 180);
      const radius = 120;
      x = parentNode.x + Math.cos(angle) * radius;
      y = parentNode.y + Math.sin(angle) * radius;
    }

    const newNode: MindMapNode = {
      id: newId,
      text: 'New Topic',
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      level: parentNode ? parentNode.level + 1 : 0,
      parentId,
      children: [],
      isExpanded: true
    };

    setNodes(prev => [...prev, newNode]);
    
    if (parentNode) {
      setNodes(prev => prev.map(node => 
        node.id === parentId 
          ? { ...node, children: [...node.children, newId] }
          : node
      ));
      
      setConnections(prev => [...prev, { from: parentId, to: newId }]);
    }
    
    setEditingNode(newId);
    setEditText('New Topic');
  }, [nodes, colors]);

  const deleteNode = useCallback((nodeId: string) => {
    if (nodeId === 'root') return;
    
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    // Remove from parent's children
    if (nodeToDelete.parentId) {
      setNodes(prev => prev.map(node => 
        node.id === nodeToDelete.parentId 
          ? { ...node, children: node.children.filter(id => id !== nodeId) }
          : node
      ));
    }

    // Remove connections
    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ));

    // Remove node and all its children recursively
    const nodesToRemove = [nodeId];
    const findChildren = (id: string) => {
      const node = nodes.find(n => n.id === id);
      if (node) {
        node.children.forEach(childId => {
          nodesToRemove.push(childId);
          findChildren(childId);
        });
      }
    };
    findChildren(nodeId);

    setNodes(prev => prev.filter(node => !nodesToRemove.includes(node.id)));
    setSelectedNode(null);
  }, [nodes]);

  const updateNodeText = useCallback((nodeId: string, newText: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, text: newText } : node
    ));
    setEditingNode(null);
  }, []);

  const updateNodeColor = useCallback((nodeId: string, newColor: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, color: newColor } : node
    ));
  }, []);

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
    setIsDragging(true);
    
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - node.x * zoom - pan.x,
          y: e.clientY - rect.top - node.y * zoom - pan.y
        });
      }
    }
  }, [nodes, zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedNode) return;
    
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - pan.x - dragOffset.x) / zoom;
      const y = (e.clientY - rect.top - pan.y - dragOffset.y) / zoom;
      
      setNodes(prev => prev.map(node => 
        node.id === selectedNode ? { ...node, x, y } : node
      ));
    }
  }, [isDragging, selectedNode, zoom, pan, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const loadTemplate = useCallback((template: typeof templates[0]) => {
    setNodes(template.nodes);
    setConnections(template.nodes
      .filter(node => node.parentId)
      .map(node => ({ from: node.parentId!, to: node.id }))
    );
    setMapTitle(template.name);
    setShowTemplates(false);
  }, []);

  const exportMindMap = useCallback(() => {
    const data = {
      title: mapTitle,
      nodes,
      connections,
      zoom,
      pan
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mapTitle.replace(/\s+/g, '_')}_mindmap.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mapTitle, nodes, connections, zoom, pan]);

  const importMindMap = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setMapTitle(data.title || 'Imported Mind Map');
        setNodes(data.nodes || []);
        setConnections(data.connections || []);
        setZoom(data.zoom || 1);
        setPan(data.pan || { x: 0, y: 0 });
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedNode && selectedNode !== 'root') {
        deleteNode(selectedNode);
      }
      if (e.key === 'Escape') {
        setEditingNode(null);
        setSelectedNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, deleteNode]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-navy-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MdAccountTree className="h-6 w-6 text-brand-500" />
            <input
              type="text"
              value={mapTitle}
              onChange={(e) => setMapTitle(e.target.value)}
              className="text-xl font-bold bg-transparent border-none outline-none text-navy-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
            >
              <FiZoomOut className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
            >
              <FiZoomIn className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={resetView}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title="Reset View"
          >
            <FiRefreshCw className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowTemplates(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title="Templates"
          >
            <MdTextFields className="h-4 w-4" />
          </button>

          <label className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 cursor-pointer" title="Import">
            <FiUpload className="h-4 w-4" />
            <input
              type="file"
              accept=".json"
              onChange={importMindMap}
              className="hidden"
            />
          </label>

          <button
            onClick={exportMindMap}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title="Export"
          >
            <FiDownload className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative overflow-hidden" ref={containerRef}>
        <svg
          ref={svgRef}
          className="w-full h-full cursor-move"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#6B7280"
              />
            </marker>
          </defs>

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Connections */}
            {connections.map((conn, index) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#6B7280"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.level === 0 ? 40 : 30}
                  fill={node.color}
                  stroke={selectedNode === node.id ? '#FFD700' : 'white'}
                  strokeWidth={selectedNode === node.id ? 3 : 2}
                  className="cursor-pointer hover:opacity-80"
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  onDoubleClick={() => {
                    setEditingNode(node.id);
                    setEditText(node.text);
                  }}
                />
                
                {editingNode === node.id ? (
                  <foreignObject
                    x={node.x - 50}
                    y={node.y - 10}
                    width="100"
                    height="20"
                  >
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => updateNodeText(node.id, editText)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateNodeText(node.id, editText);
                        }
                        if (e.key === 'Escape') {
                          setEditingNode(null);
                        }
                      }}
                      className="w-full text-center text-sm bg-white border rounded px-1"
                      autoFocus
                    />
                  </foreignObject>
                ) : (
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={node.level === 0 ? "14" : "12"}
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    {node.text.length > 12 ? `${node.text.substring(0, 12)}...` : node.text}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button
            onClick={() => addNode(selectedNode || 'root')}
            className="w-12 h-12 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            title="Add Node"
          >
            <FiPlus className="h-5 w-5" />
          </button>
          
          {selectedNode && selectedNode !== 'root' && (
            <button
              onClick={() => deleteNode(selectedNode)}
              className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              title="Delete Node"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Node Properties Panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-64">
            <Card extra="p-4">
              <h3 className="font-semibold text-navy-700 dark:text-white mb-3">Node Properties</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Text
                  </label>
                  <input
                    type="text"
                    value={nodes.find(n => n.id === selectedNode)?.text || ''}
                    onChange={(e) => updateNodeText(selectedNode, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateNodeColor(selectedNode, color)}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => addNode(selectedNode)}
                    className="flex-1 px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Add Child
                  </button>
                  {selectedNode !== 'root' && (
                    <button
                      onClick={() => deleteNode(selectedNode)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card extra="w-full max-w-2xl m-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy-700 dark:text-white">Mind Map Templates</h2>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiMinus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors text-left"
                >
                  <h3 className="font-semibold text-navy-700 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.nodes.length} nodes • Ready to use template
                  </p>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                💡 <strong>Tips:</strong> Double-click nodes to edit • Drag to move • Delete key to remove • Add child nodes from properties panel
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MindMapMaker;