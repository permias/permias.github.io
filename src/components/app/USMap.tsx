"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import chapterListData from "~/data/lib/chapter-list.json";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface USMapProps {
  highlightedChapter?: string | null;
  onSelectChapter?: (name: string) => void;
}

// Tailwind color classes mapped to region
const regionColorMap: Record<string, string> = {
  "East Coast I": "#2563eb",
  "East Coast II": "#1d4ed8",
  "East Coast III": "#3b82f6",
  "Midwest I": "#059669",
  "Midwest II": "#10b981",
  "South": "#f59e42",
  "West Coast I": "#f43f5e",
  "West Coast II": "#eab308",
};

const getRegionColor = (region?: string) => {
  if (!region) return "#F53";
  return regionColorMap[region] || "#F53";
};

const USMap: React.FC<USMapProps> = ({ highlightedChapter, onSelectChapter }) => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [center, setCenter] = useState<[number, number]>([-98, 39]);

  // Gradual zoom controls
  const zoomIn = () => setMapZoom(z => Math.min(z + 0.25, 16));
  const zoomOut = () => setMapZoom(z => Math.max(z - 0.25, 1));
  const resetViewport = () => {
    setMapZoom(1);
    setCenter([-98, 39]);
  };

  // Cache the zoom scaling for performance
  const zoomScale = Math.sqrt(mapZoom);

  return (
    <div className="relative w-full h-full">
      <div className="absolute bottom-5 right-5 z-10 flex gap-2">
        <button
          onClick={zoomIn}
          className="px-3 py-1.5 rounded bg-primary text-white border-none cursor-pointer transition-colors hover:bg-secondary"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="px-3 py-1.5 rounded bg-neutral-900 text-white border-none cursor-pointer transition-colors hover:bg-neutral-700"
        >
          -
        </button>
        <button
          onClick={resetViewport}
          className="px-3 py-1.5 rounded bg-neutral-200 text-neutral-900 border-none cursor-pointer transition-colors hover:bg-neutral-400"
          title="Reset zoom"
        >
          &#8634;
        </button>
      </div>
      <ComposableMap
        projection="geoAlbersUsa"
        width={800}
        height={500}
      >
        <ZoomableGroup
          center={center}
          zoom={mapZoom}
          onMoveEnd={({ zoom, coordinates }) => {
            setMapZoom(zoom);
            setCenter(coordinates);
          }}
          zoomStep={0.25}
          minZoom={1}
          maxZoom={16}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#DDD"
                  stroke="#222"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {/* Render non-highlighted markers first */}
          {chapterListData.filter(ch => ch.latitude && ch.longitude && ch.name !== highlightedChapter).map((chapter) => (
            <Marker
              key={chapter.name}
              coordinates={[chapter.longitude, chapter.latitude]}
              onClick={() => onSelectChapter && onSelectChapter(chapter.name)}
              onMouseEnter={e => {
                setTooltip(chapter.name);
                if (e && e.target && e.target.getBoundingClientRect) {
                  const rect = e.target.getBoundingClientRect();
                  setTooltipPos({ x: rect.x + rect.width / 2, y: rect.y });
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                r={4 / zoomScale}
                fill={getRegionColor(chapter.region)}
                stroke="#FFF"
                strokeWidth={1 / zoomScale}
                opacity={1}
              />
            </Marker>
          ))}
          {/* Render highlighted marker last, on top */}
          {chapterListData.filter(ch => ch.latitude && ch.longitude && ch.name === highlightedChapter).map((chapter) => (
            <Marker
              key={chapter.name}
              coordinates={[chapter.longitude, chapter.latitude]}
              onClick={() => onSelectChapter && onSelectChapter(chapter.name)}
              onMouseEnter={e => {
                setTooltip(chapter.name);
                if (e && e.target && e.target.getBoundingClientRect) {
                  const rect = e.target.getBoundingClientRect();
                  setTooltipPos({ x: rect.x + rect.width / 2, y: rect.y });
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                r={8 / zoomScale}
                fill={'#ED1D25'}
                stroke="#FFF"
                strokeWidth={2 / zoomScale}
                opacity={1}
                style={{ filter: 'drop-shadow(0 0 8px #ED1D25)' }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {tooltip && tooltipPos && (
        <div
          className="fixed z-[1000] pointer-events-none text-white bg-neutral-900 px-2.5 py-1 rounded-lg text-[0.95rem]"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 30,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default USMap;
