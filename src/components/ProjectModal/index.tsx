import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, FileText } from "lucide-react";
import { ProjectItem } from "@/types";

interface Props {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [showDevNotes, setShowDevNotes] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl mx-4 bg-[#0b0b0b] border border-zinc-800 rounded-lg overflow-auto max-h-[85vh] p-8 text-zinc-100">
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-anton text-4xl mb-2 text-zinc-100">
          {project.title}
        </h3>
        <p className="text-xs font-bold text-blue-500 mb-4 uppercase tracking-widest">
          {project.category}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-zinc-400 text-xs font-manrope border border-zinc-800 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none text-sm leading-relaxed mb-6">
          {project.longDesc ? (
            // Simple renderer: split by double-newline into sections; if a section contains '\n- ' treat it as heading + list
            project.longDesc.split("\n\n").map((section, idx) => {
              const lines = section.split("\n");
              // If there are list lines
              const listLines = lines.filter(
                (l) => l.trim().startsWith("- ") || l.trim().startsWith("• ")
              );
              if (listLines.length > 0) {
                const heading = lines[0].replace(/:$/g, "");
                const items = listLines.map((l) => l.replace(/^- |^• /, ""));
                return (
                  <div key={idx} className="mb-3">
                    <h5 className="text-zinc-200 font-bold mb-2">{heading}</h5>
                    <ul className="list-disc list-inside ml-4 text-zinc-400">
                      {items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                );
              }

              // Fallback: treat as paragraph
              return (
                <p key={idx} className="text-zinc-400 mb-3">
                  {section}
                </p>
              );
            })
          ) : (
            <p>{project.desc}</p>
          )}
        </div>

        {/* Project PDF (separate, visually distinct) */}
        {project.projectPdf && (
          <div className="mt-4 bg-[#071024] border border-zinc-800 p-4 rounded flex items-center justify-between">
            <div>
              <div className="font-manrope text-sm text-zinc-100 font-bold">
                {project.projectPdf.title}
              </div>
              {project.projectPdf.note && (
                <div className="text-zinc-400 text-sm">
                  {project.projectPdf.note}
                </div>
              )}
            </div>
            <a
              href={project.projectPdf.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-400 hover:underline flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> View PDF
            </a>
          </div>
        )}

        {/* Development notes (author annotations) - simplified styling to match page */}
        {project.devNotes && project.devNotes.length > 0 && (
          <div className="mt-4">
            <button
              className="text-sm text-zinc-400 font-manrope mb-3 hover:text-white underline"
              onClick={() => setShowDevNotes((s) => !s)}
            >
              {showDevNotes
                ? "Hide development notes"
                : `View development notes (${project.devNotes.length})`}
            </button>

            {showDevNotes && (
              <div className="bg-[#070707] border border-zinc-800 p-4 rounded">
                <h4 className="text-zinc-300 font-bold mb-3">
                  Development Notes
                </h4>
                <div className="flex flex-col gap-3">
                  {project.devNotes.map((n, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#080808] border border-zinc-900 rounded flex gap-3"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-200">
                          {n.author
                            ? n.author
                                .split(" ")
                                .map((s) => s[0])
                                .slice(0, 2)
                                .join("")
                            : "FM"}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-200 font-semibold">
                            {n.author ?? "Unknown"}
                          </div>
                          {n.date && (
                            <div className="text-xs text-zinc-500">
                              {n.date}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-zinc-200 text-sm leading-relaxed">
                          {n.content}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                          <button className="hover:text-white">Reply</button>
                          <button className="hover:text-white">Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {project.evidence && project.evidence.length > 0 && (
          <div className="mt-4">
            <h4 className="text-zinc-300 font-bold mb-4">Evidence & Links</h4>
            <div className="flex flex-col gap-4">
              {project.evidence.map((ev, i) => (
                <div
                  key={i}
                  className="bg-[#070707] border border-zinc-800 p-4 rounded"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-manrope text-sm text-zinc-200">
                      <strong className="text-zinc-100">{ev.title}</strong>
                      {ev.type === "repo" ? (
                        <span className="ml-3 text-zinc-500 text-xs">
                          Private repository
                        </span>
                      ) : (
                        ev.link && (
                          <a
                            href={ev.link}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-3 text-blue-400 hover:underline text-xs"
                          >
                            View
                          </a>
                        )
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">
                      {ev.type}
                    </div>
                  </div>

                  {ev.note && (
                    <p className="text-zinc-400 text-sm mb-3">{ev.note}</p>
                  )}

                  {ev.images && ev.images.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {ev.images.map((img, j) => (
                        <a
                          key={j}
                          href={img}
                          target="_blank"
                          rel="noreferrer"
                          className="block flex-shrink-0"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${j + 1}`}
                            width={220}
                            height={124}
                            className="object-cover rounded border border-zinc-800"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {project.link && project.link.includes("github") ? (
            <div className="text-sm font-manrope uppercase text-zinc-500">
              Repository: Private
            </div>
          ) : (
            project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-manrope uppercase text-zinc-300 hover:text-blue-400"
              >
                Open link <span className="ml-2">↗</span>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
