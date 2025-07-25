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

  // Map region name to Tailwind color value
  const getRegionColor = (region?: string) => {
    if (!region) return '#F53';
    const key = region.toLowerCase().replace(/ /g, '-');
    // Tailwind colors are available as CSS variables, so we use getComputedStyle
    if (typeof window !== 'undefined') {
      const cssVar = getComputedStyle(document.documentElement).getPropertyValue(`--tw-color-region-${key}`);
      if (cssVar) return cssVar.trim();
    }
    // fallback
    return '#F53';
  };

  const zoomScale = Math.sqrt(mapZoom);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10, display: "flex", gap: 8 }}>
        <button
          onClick={zoomIn}
          style={{
            padding: "6px 12px",
            borderRadius: 4,
            background: "#F53",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#d32f2f")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F53")}
        >
          +
        </button>
        <button
          onClick={zoomOut}
          style={{
            padding: "6px 12px",
            borderRadius: 4,
            background: "#222",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#444")}
          onMouseLeave={e => (e.currentTarget.style.background = "#222")}
        >
          -
        </button>
        <button
          onClick={resetViewport}
          style={{
            padding: "6px 12px",
            borderRadius: 4,
            background: "#DDD",
            color: "#222",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          title="Reset zoom"
          onMouseEnter={e => (e.currentTarget.style.background = "#bbb")}
          onMouseLeave={e => (e.currentTarget.style.background = "#DDD")}
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
                fill={'var(--aw-color-secondary)'}
                stroke="#FFF"
                strokeWidth={1 / zoomScale}
                opacity={1}
                style={{ filter: 'drop-shadow(0 0 8px var(--aw-color-secondary))' }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {tooltip && tooltipPos && (
        <div
          style={{
            position: "fixed",
            left: tooltipPos.x,
            top: tooltipPos.y - 30,
            background: "#222",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "6px",
            pointerEvents: "none",
            zIndex: 1000,
            fontSize: "0.95rem"
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default USMap;
