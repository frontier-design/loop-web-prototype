import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

import landmark1Icon from '../assets/icons/landmark-1.svg';
import landmark2Icon from '../assets/icons/landmark-2.svg';
import landmark3Icon from '../assets/icons/landmark-3.svg';

const ICON_SRC = {
  'landmark-1': landmark1Icon,
  'landmark-2': landmark2Icon,
  'landmark-3': landmark3Icon,
};

const LANDMARK_SIZE = 60;
const SCALE_HOVER = 1.25;

function LandmarkMarkersLayer({ map, data, scaledLandmarkIds = [] }) {
  const markersRef = useRef([]);
  const markerElementsRef = useRef({});
  const [hoveredLandmarkId, setHoveredLandmarkId] = useState(null);

  useEffect(() => {
    if (!map || !data?.landmarks?.length) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    markerElementsRef.current = {};

    data.landmarks.forEach((landmark) => {
      const src = ICON_SRC[landmark.icon] || landmark1Icon;

      const el = document.createElement('div');
      el.className = 'landmark-marker';
      el.style.width = `${LANDMARK_SIZE}px`;
      el.style.height = `${LANDMARK_SIZE}px`;
      el.style.cursor = 'pointer';
      el.style.overflow = 'visible';

      const inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.display = 'flex';
      inner.style.alignItems = 'center';
      inner.style.justifyContent = 'center';
      inner.style.transition = 'transform 0.2s ease';
      inner.style.transformOrigin = 'center center';

      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.style.pointerEvents = 'none';
      inner.appendChild(img);
      el.appendChild(inner);

      el.addEventListener('mouseenter', () => setHoveredLandmarkId(landmark.id));
      el.addEventListener('mouseleave', () => setHoveredLandmarkId(null));

      markerElementsRef.current[landmark.id] = inner;

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat(landmark.coordinates)
        .addTo(map);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      markerElementsRef.current = {};
    };
  }, [map, data]);

  useEffect(() => {
    if (!data?.landmarks?.length) return;
    const ids = new Set(scaledLandmarkIds);
    data.landmarks.forEach((landmark) => {
      const el = markerElementsRef.current[landmark.id];
      if (!el) return;
      const shouldScale = hoveredLandmarkId === landmark.id || ids.has(landmark.id);
      el.style.transform = shouldScale ? `scale(${SCALE_HOVER})` : 'scale(1)';
    });
  }, [hoveredLandmarkId, scaledLandmarkIds, data?.landmarks]);

  return null;
}

export default LandmarkMarkersLayer;
