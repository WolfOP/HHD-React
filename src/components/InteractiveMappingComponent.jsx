import React, { useRef, useState, useEffect } from "react";

function getInitialNodes() {
  return [];
}
function getInitialConnections() {
  return [];
}

// Persistent storage helpers
function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
function loadFromStorage(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export default function InteractiveMappingComponent() {
  const [nodes, setNodes] = useState(() => loadFromStorage('mapping_nodes', getInitialNodes()));
  const [connections, setConnections] = useState(() => loadFromStorage('mapping_connections', getInitialConnections()));
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectingMode, setConnectingMode] = useState(false);
  const [message, setMessage] = useState("");
  const [teelParagraphs, setTeelParagraphs] = useState(() => loadFromStorage('mapping_teel', []));
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Draw connections on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    connections.forEach(conn => {
      const from = nodes.find(n => n.id === conn.from);
      const to = nodes.find(n => n.id === conn.to);
      if (from && to) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    });
  }, [connections, nodes]);

  // Resize canvas to fit container
  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Add node
  const handleAddNode = () => {
    const container = containerRef.current;
    const x = Math.random() * (container?.offsetWidth || 400) * 0.8 + 40;
    const y = Math.random() * (container?.offsetHeight || 400) * 0.8 + 40;
    setNodes(nodes => [
      ...nodes,
      { id: `node${Date.now()}${Math.random()}`, x, y, label: `Node ${nodes.length + 1}` }
    ]);
    setMessage("Node added.");
  };

  // Start/stop connecting mode
  const handleConnectNodes = () => {
    setConnectingMode(m => !m);
    setSelectedNode(null);
    setMessage(connectingMode ? "Connecting mode off." : "Click two nodes to connect.");
  };

  // Clear all
  const handleClear = () => {
    setNodes([]);
    setConnections([]);
    setMessage("All mapping data cleared.");
  };

  // Node drag logic
  const handleNodeDrag = (id, e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const nodeIdx = nodes.findIndex(n => n.id === id);
    const orig = nodes[nodeIdx];
    const onMove = (moveEvt) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      setNodes(nodes => {
        const updated = [...nodes];
        updated[nodeIdx] = { ...orig, x: orig.x + dx, y: orig.y + dy };
        return updated;
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Node click (for connecting)
  const handleNodeClick = (id) => {
    if (!connectingMode) return;
    if (!selectedNode) {
      setSelectedNode(id);
      setMessage("Select a second node to connect.");
    } else if (selectedNode !== id) {
      setConnections(conns => [...conns, { from: selectedNode, to: id }]);
      setSelectedNode(null);
      setMessage("Nodes connected.");
    }
  };

  // TEEL Paragraph logic
  const handleAddTeel = () => setTeelParagraphs(arr => [...arr, { id: Date.now(), text: "" }]);
  const handleRemoveTeel = () => setTeelParagraphs(arr => arr.slice(0, -1));
  const handleTeelChange = (id, value) => setTeelParagraphs(arr => arr.map(p => p.id === id ? { ...p, text: value } : p));

  useEffect(() => { saveToStorage('mapping_nodes', nodes); }, [nodes]);
  useEffect(() => { saveToStorage('mapping_connections', connections); }, [connections]);
  useEffect(() => { saveToStorage('mapping_teel', teelParagraphs); }, [teelParagraphs]);

  // Node label editing
  const handleLabelEdit = (id, newLabel) => {
    setNodes(nodes => nodes.map(n => n.id === id ? { ...n, label: newLabel } : n));
  };

  // Node deletion
  const handleDeleteNode = (id) => {
    setNodes(nodes => nodes.filter(n => n.id !== id));
    setConnections(conns => conns.filter(c => c.from !== id && c.to !== id));
  };

  // Connection deletion
  const handleDeleteConnection = (idx) => {
    setConnections(conns => conns.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">Interactive Relationship Mapping & Planning Tool</h2>
      <div className="mb-3 flex flex-wrap gap-2 items-center">
        <button className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-500 text-sm" onClick={handleAddNode}>Add Node</button>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm" onClick={handleConnectNodes}>{connectingMode ? "Stop Connecting" : "Connect Nodes"}</button>
        <button className="px-3 py-1.5 bg-red-700 text-white rounded hover:bg-red-600 text-sm" onClick={handleClear}>Clear All Mapping Data</button>
      </div>
      <p className="text-sm text-purple-300 h-5 mb-2">{message}</p>
      <div ref={containerRef} className="relative w-full h-[400px] md:h-[500px] border border-slate-600 rounded-lg bg-slate-800/50 overflow-hidden mb-6 shadow-inner">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="absolute top-0 left-0 w-full h-full z-10">
          {nodes.map(node => (
            <div
              key={node.id}
              style={{ position: 'absolute', left: node.x, top: node.y, cursor: 'move', zIndex: 2, minWidth: 60 }}
              className={`bg-purple-700 text-white rounded px-3 py-1 shadow-md select-none ${connectingMode && selectedNode === node.id ? 'ring-4 ring-blue-400' : ''}`}
              onMouseDown={e => handleNodeDrag(node.id, e)}
              onClick={() => handleNodeClick(node.id)}
              onContextMenu={e => { e.preventDefault(); handleDeleteNode(node.id); }}
            >
              <input
                type="text"
                value={node.label}
                onChange={e => handleLabelEdit(node.id, e.target.value)}
                className="bg-transparent border-none text-white w-20 outline-none"
                style={{ pointerEvents: 'auto' }}
              />
            </div>
          ))}
          {/* Render connections for deletion */}
          {connections.map((conn, idx) => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <button
                key={idx}
                style={{ position: 'absolute', left: midX, top: midY, zIndex: 3 }}
                className="bg-red-500 text-xs text-white rounded px-1 py-0.5"
                onClick={() => handleDeleteConnection(idx)}
                title="Delete connection"
              >×</button>
            );
          })}
        </div>
      </div>
      <div className="p-4 bg-slate-800/70 rounded-lg shadow-inner mt-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-purple-300 mb-3">TEEL Paragraph Planner</h3>
        <div className="mb-3 flex space-x-2">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-500 text-sm" onClick={handleAddTeel}>Add Paragraph</button>
          <button className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-500 text-sm" onClick={handleRemoveTeel}>Remove Last Paragraph</button>
        </div>
        <div className="space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2">
          {teelParagraphs.length === 0 && <p className="text-slate-400">No paragraphs yet.</p>}
          {teelParagraphs.map(p => (
            <textarea
              key={p.id}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows={3}
              value={p.text}
              onChange={e => handleTeelChange(p.id, e.target.value)}
              placeholder="Write your TEEL paragraph here..."
            />
          ))}
        </div>
      </div>
    </div>
  );
}
