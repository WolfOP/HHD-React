import React, { useState } from "react";
import InteractiveAnnotationComponent from "./InteractiveAnnotationComponent.jsx";
import InteractiveMappingComponent from "./InteractiveMappingComponent.jsx";
import { sampleSacMaterials } from "./Unit3SAC2PrepComponent.js";

export default function Unit3SAC2PrepComponent() {
  const [selected, setSelected] = useState(0);
  const material = sampleSacMaterials[selected];

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">
        Unit 3 SAC 2 Practice & Prep
      </h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {sampleSacMaterials.map((m, i) => (
          <button
            key={m.id}
            className={`px-3 py-1 rounded ${
              i === selected
                ? "bg-purple-600 text-white"
                : "bg-slate-700 text-purple-200"
            }`}
            onClick={() => setSelected(i)}
          >
            {m.title}
          </button>
        ))}
      </div>
      <div className="bg-slate-700 rounded p-4 mb-4">
        <h3 className="text-lg font-bold mb-2">{material.question}</h3>
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: material.stimulus }}
        />
      </div>
      <InteractiveAnnotationComponent
        question={material.question}
        stimulus={material.stimulus}
      />
      <InteractiveMappingComponent key={selected} />
    </div>
  );
}
