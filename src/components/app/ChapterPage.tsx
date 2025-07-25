"use client";

import { useState, useEffect } from 'react';
import chapterListData from '~/data/lib/chapter-list.json';
// import USMap from './USMap';
import ChapterList from './ChapterList';

export default function ChapterPage() {
  const [chapters, setChapters] = useState<typeof chapterListData>([]);

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
      <ChapterList chapters={chapters.map(chapter => ({
        ...chapter,
        latitude: chapter.latitude === null ? undefined : chapter.latitude,
        longitude: chapter.longitude === null ? undefined : chapter.longitude,
      }))} />
      </div>
    </div>
  )
}
