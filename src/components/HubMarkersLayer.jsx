import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

const HUB_COLOR = '#164C2C'; // forest green
const HUB_COLOR_HOVER = '#AE340F'; // brick
const HUB_STROKE = '#ffffff';
const STROKE_WIDTH = 5;

const PIN_PATH = 'M28 0C43.4639 0 55.9999 12.6408 56 28.2344C56 41.4637 46.9766 52.5658 34.7979 55.6289L28 67.7627L21.2061 55.6299C9.02537 52.5681 0 41.4652 0 28.2344C0.000123563 12.6408 12.5361 0 28 0Z';

const PAD = 4;
const PIN_VIEW_WIDTH = 56 + PAD * 2;   // 64
const PIN_VIEW_HEIGHT = 68 + PAD + Math.ceil(STROKE_WIDTH / 2);  // 68+4+3 = 75

function createPinSvg() {
  return `<svg width="${PIN_VIEW_WIDTH}" height="${PIN_VIEW_HEIGHT}" viewBox="0 0 ${PIN_VIEW_WIDTH} ${PIN_VIEW_HEIGHT}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
    <g transform="translate(${PAD}, ${PAD})">
      <path class="pin-path" d="${PIN_PATH}" fill="${HUB_COLOR}" stroke="${HUB_STROKE}" stroke-width="${STROKE_WIDTH}" style="transition: fill 0.15s ease;"/>
    </g>
  </svg>`;
}

/**
 * Renders Loop Trail hub markers using HTML markers with the map-pin.svg shape.
 * - On hover: brick color and scale up.
 * - When highlightedHubId matches hub.id: same highlight style as hover.
 * - onHubClick: called when a marker is clicked, receives the hub object.
 */
function HubMarkersLayer({ map, data, highlightedHubId, onHubClick }) {
  const markersRef = useRef([]);
  // Store DOM refs per hub for updating styles without recreating markers
  const markerElementsRef = useRef({});
  // Track which hub is currently hovered
  const hoveredIdRef = useRef(null);
  // Keep current highlightedHubId in a ref so event handlers access current value
  const highlightedHubIdRef = useRef(highlightedHubId);
  // Keep current onHubClick in a ref so event handlers access current callback
  const onHubClickRef = useRef(onHubClick);

  // Update refs when props change (in an effect to satisfy React rules)
  useEffect(() => {
    highlightedHubIdRef.current = highlightedHubId;
  }, [highlightedHubId]);

  useEffect(() => {
    onHubClickRef.current = onHubClick;
  }, [onHubClick]);

  // Create markers once when map/data changes
  useEffect(() => {
    if (!map || !data?.hubs?.length) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    markerElementsRef.current = {};

    data.hubs.forEach((hub) => {
      // Outer element: passed to Marker, never transformed (avoids position jump)
      const el = document.createElement('div');
      el.className = 'hub-marker';
      el.dataset.hubId = hub.id;
      el.style.width = `${PIN_VIEW_WIDTH}px`;
      el.style.height = `${PIN_VIEW_HEIGHT}px`;
      el.style.cursor = 'pointer';
      el.style.overflow = 'visible';

      // Inner wrapper: scale applied here so MapLibre's positioning is unaffected
      const inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.transformOrigin = 'bottom center';
      inner.style.transition = 'transform 0.15s ease';
      inner.innerHTML = createPinSvg();
      el.appendChild(inner);

      const pathEl = inner.querySelector('.pin-path');

      // Store refs for later style updates
      markerElementsRef.current[hub.id] = { inner, pathEl };

      // Hover handlers
      el.addEventListener('mouseenter', () => {
        hoveredIdRef.current = hub.id;
        if (pathEl) pathEl.setAttribute('fill', HUB_COLOR_HOVER);
        inner.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        hoveredIdRef.current = null;
        // Check if this hub should stay highlighted due to scroll (use ref for current value)
        const isScrollHighlighted = hub.id === highlightedHubIdRef.current;
        if (pathEl) pathEl.setAttribute('fill', isScrollHighlighted ? HUB_COLOR_HOVER : HUB_COLOR);
        inner.style.transform = isScrollHighlighted ? 'scale(1.2)' : 'scale(1)';
      });

      // Click handler (use ref for current callback)
      el.addEventListener('click', () => {
        if (onHubClickRef.current) {
          onHubClickRef.current(hub);
        }
      });

      // Create and add marker
      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(hub.coordinates)
        .addTo(map);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      markerElementsRef.current = {};
    };
  }, [map, data]);

  // Update highlight styles when highlightedHubId changes (without recreating markers)
  useEffect(() => {
    if (!data?.hubs?.length) return;

    data.hubs.forEach((hub) => {
      const refs = markerElementsRef.current[hub.id];
      if (!refs) return;

      const { inner, pathEl } = refs;
      const isHovered = hoveredIdRef.current === hub.id;
      const isScrollHighlighted = hub.id === highlightedHubId;

      // Hover takes visual precedence, but both trigger the same style
      const shouldHighlight = isHovered || isScrollHighlighted;

      if (pathEl) {
        pathEl.setAttribute('fill', shouldHighlight ? HUB_COLOR_HOVER : HUB_COLOR);
      }
      inner.style.transform = shouldHighlight ? 'scale(1.2)' : 'scale(1)';
    });
  }, [highlightedHubId, data]);

  return null;
}

export default HubMarkersLayer;
