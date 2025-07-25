"use client"

import { useState } from 'react';

type Chapter = {
  name: string;
  region?: string;
  level?: string;
  social_media?: { instagram?: string };
  altitude?: number;
  longitude?: number;
  association?: string[];
};

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const regions = [
    "all",
    ...Array.from(new Set(chapters.map((chapter) => chapter.region ? chapter.region : "Uncategorized")))
  ];

  const filteredChapters = chapters.filter((chapter) => {
    const matchesRegion = filter === "all" || chapter.region === filter;
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      chapter.name.toLowerCase().includes(search) ||
      (chapter.region && chapter.region.toLowerCase().includes(search)) ||
      (chapter.social_media && chapter.social_media.instagram && chapter.social_media.instagram.toLowerCase().includes(search)) ||
      (chapter.association && chapter.association.some(uni => uni.toLowerCase().includes(search)));
    return matchesRegion && matchesSearch;
  })

  return (
    <div className="grid gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Masukan nama universitas, chapter, atau region..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900
            border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <select
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-900 text-black dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {regions.map((region) => (
            <option key={String(region)} value={String(region)} className="text-black dark:text-white bg-white dark:bg-gray-900">
              {region === "all" ? "All Regions" : String(region)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredChapters.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
            Tidak ada chapter yang ditemukan.
          </div>
        ) : (
          filteredChapters.map((chapter) => (
            <div
              key={chapter.name}
              className="relative flex flex-col justify-between h-full p-4 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-2 ">
          <div>
            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">{chapter.name}</div>
            {chapter.social_media?.instagram && (
              <a
                href={`https://instagram.com/${chapter.social_media.instagram.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-red-700 dark:text-red-200 hover:underline text-xs mt-1"
                title={`Instagram: ${chapter.social_media.instagram}`}
              >
                {chapter.social_media.instagram}
              </a>
            )}
          </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
          {chapter.region && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{chapter.region}</span>
          )}
          {chapter.level && (
            <span
              className={`text-xs px-2 py-1 rounded
                ${
            chapter.level === "National"
              ? "bg-yellow-100 text-red-800"
              : chapter.level === "Regional"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
                }
              `}
            >
              {chapter.level}
            </span>
          )}
              </div>
              {/* Tooltip: flexible location */}
              {chapter.association && chapter.association.length > 0 && (
          <div
            className="absolute group-hover:opacity-100 opacity-0 pointer-events-none transition-opacity z-50"
            style={{
              left: '50%',
              top: '100%',
              transform: 'translateX(-50%)',
              marginTop: '0.5rem',
              minWidth: '220px',
              maxWidth: '320px',
              width: 'max-content',
            }}
          >
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-sm text-gray-700 dark:text-gray-200">
              <strong>Universitas terkait:</strong>
              <ul className="list-disc ml-5">
                {chapter.association.map((uni, idx) => (
            <li key={idx}>{uni}</li>
                ))}
              </ul>
            </div>
          </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
