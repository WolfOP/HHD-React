import React from "react";
import KeySkill1 from "./keyskillscomponents/KeySkill1.js";
import KeySkill2 from "./keyskillscomponents/KeySkill2.jsx";
import KeySkill3 from "./keyskillscomponents/KeySkill3.jsx";
import KeySkill4 from "./keyskillscomponents/KeySkill4.jsx";
import KeySkill5 from "./keyskillscomponents/KeySkill5.jsx";
import KeySkill6 from "./keyskillscomponents/KeySkill6.jsx";
import KeySkill7 from "./keyskillscomponents/KeySkill7.jsx";
import KeySkill8 from "./keyskillscomponents/KeySkill8.js";
import KeySkill9 from "./keyskillscomponents/KeySkill9.jsx";
import KeySkill10 from "./keyskillscomponents/KeySkill10.js";

export default function KeySkillsHub() {
  return (
    <section className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Unit 3 SAC 2 – Key Skills Hub</h1>
      <p className="text-slate-300 mb-4">Interactive Key Skills activities:</p>
      <KeySkill1 />
      <KeySkill2 />
      <KeySkill3 />
      <KeySkill4 />
      <KeySkill5 />
      <KeySkill6 />
      <KeySkill7 />
      <KeySkill8 />
      <KeySkill9 />
      <KeySkill10 />
    </section>
  );
}
