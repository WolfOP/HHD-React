import React, { useRef, useState, useEffect } from "react";

function getInitialAnnotations(stimulus) {
  // Try to load from storage by stimulus hash
  try {
    const key = 'annot_' + btoa(unescape(encodeURIComponent(stimulus))).slice(0, 16);
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}
function saveAnnotations(stimulus, annots) {
  try {
    const key = 'annot_' + btoa(unescape(encodeURIComponent(stimulus))).slice(0, 16);
    localStorage.setItem(key, JSON.stringify(annots));
  } catch {}
}

export default function InteractiveAnnotationComponent({ question, stimulus }) {
  const [annotations, setAnnotations] = useState(() => getInitialAnnotations(stimulus));
  const [drawing, setDrawing] = useState(false);
  const [drawings, setDrawings] = useState([]);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(null);
  const stimulusRef = useRef();
  const canvasRef = useRef();

  // Save annotations to storage
  useEffect(() => { saveAnnotations(stimulus, annotations); }, [annotations, stimulus]);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f59e42';
    ctx.lineWidth = 2;
    drawings.forEach(path => {
      ctx.beginPath();
      path.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }, [drawings]);

  // Handle text selection and annotation
  const handleAnnotate = (type) => {
    const sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (!stimulusRef.current.contains(range.commonAncestorContainer)) return;
    const text = sel.toString();
    const id = `annot-${Date.now()}-${Math.random()}`;
    setAnnotations(a => [...a, { id, type, text, start: range.startOffset, end: range.endOffset }]);
    sel.removeAllRanges();
  };

  // Drawing handlers
  const handleCanvasDown = e => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setDrawings(d => [...d, [[e.clientX - rect.left, e.clientY - rect.top]]]);
    window.addEventListener('mousemove', handleCanvasMove);
    window.addEventListener('mouseup', handleCanvasUp);
  };
  const handleCanvasMove = e => {
    setDrawings(d => {
      const rect = canvasRef.current.getBoundingClientRect();
      const last = d[d.length - 1];
      if (!last) return d;
      const updated = d.slice(0, -1);
      updated.push([...last, [e.clientX - rect.left, e.clientY - rect.top]]);
      return updated;
    });
  };
  const handleCanvasUp = () => {
    window.removeEventListener('mousemove', handleCanvasMove);
    window.removeEventListener('mouseup', handleCanvasUp);
  };

  // Clear drawings
  const handleClearDrawings = () => setDrawings([]);

  // Render annotated text
  const renderStimulus = () => {
    // For demo: just render as plain text, highlight matches
    let html = stimulus;
    annotations.forEach(a => {
      if (a.type === 'highlight') html = html.replace(a.text, `<mark style="background: #fde68a;">${a.text}</mark>`);
      if (a.type === 'underline') html = html.replace(a.text, `<span style="text-decoration: underline; color: #a78bfa;">${a.text}</span>`);
      if (a.type === 'comment') html = html.replace(a.text, `<span style="background: #f472b6; cursor: pointer;" title="Comment">${a.text}</span>`);
    });
    return { __html: html };
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">Interactive Annotation Tool</h2>
      <div className="mb-4 p-2 bg-slate-700 rounded flex flex-wrap gap-2">
        <button className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 text-sm" onClick={() => handleAnnotate('highlight')}>Highlight</button>
        <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400 text-sm" onClick={() => handleAnnotate('underline')}>Underline</button>
        <button className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-400 text-sm" onClick={() => handleAnnotate('comment')}>Comment</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-sm" onClick={() => setDrawing(d => !d)}>{drawing ? 'Stop Drawing' : 'Toggle Drawing'}</button>
        <button className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm" onClick={handleClearDrawings}>Clear Drawings</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-slate-700 rounded min-h-[100px]">
          <h4 className="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4>
          <p className="text-slate-300 text-sm">{question}</p>
        </div>
        <div className="p-3 bg-slate-700 rounded">
          <h4 className="text-lg font-medium text-purple-200 mb-2">Deconstruct the Question:</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Command Word(s):</label>
              <input type="text" className="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Analyse..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Key Concepts:</label>
              <textarea rows={2} className="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Health and wellbeing..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Content Areas:</label>
              <textarea rows={2} className="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Factors influencing..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Constraints:</label>
              <textarea rows={2} className="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Use sources..." />
            </div>
          </div>
        </div>
      </div>
      <div className="relative border border-slate-600 rounded min-h-[250px]">
        <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none z-10 w-full h-full" onMouseDown={handleCanvasDown} />
        <div ref={stimulusRef} className="p-3 bg-slate-700/80 rounded h-64 md:h-80 overflow-y-auto text-slate-300 text-sm relative z-0" dangerouslySetInnerHTML={renderStimulus()} />
      </div>
    </div>
  );
}
