"use client";

import { useState, useEffect } from 'react';
import chapterListData from '~/data/lib/chapter-list.json';
import USMap from './USMap';
import ChapterList from './ChapterList';

export default function ChapterPage() {
  const [highlightedChapter, setHighlightedChapter] = useState<string | null>(null);
  const [chapters, setChapters] = useState<typeof chapterListData>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setChapters(chapterListData);
  }, []);

  return (
    <div className="grid gap-4 bg-base-100 min-h-screen">
      <div className="bg-base-100 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-semibold text-center">
        Temukan komunitas Indonesia di {chapters.length} cabang kami!
          </h2>
        </div>
        <div className="bg-base-200 rounded-lg p-4 mb-6 shadow flex justify-center">
          <div style={{ width: "100%", maxWidth: 800, aspectRatio: "16/10" }}>
            <USMap
              highlightedChapter={highlightedChapter}
              onSelectChapter={name => setSearchTerm(name)}
            />
          </div>
        </div>
        <ChapterList
          chapters={chapters.map(chapter => ({
            ...chapter,
            latitude: chapter.latitude === null ? undefined : chapter.latitude,
            longitude: chapter.longitude === null ? undefined : chapter.longitude,
          }))}
          onHighlightChapter={setHighlightedChapter}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
      </div>
    </div>
  )
}
