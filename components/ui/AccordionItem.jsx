"use client";

import { useState } from "react";

export default function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold"
      >
        {question}
        <span
          className={`text-xl leading-none text-brand-600 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <p className="px-6 pb-5 text-sm leading-relaxed text-brand-900/70">{answer}</p>
      )}
    </div>
  );
}