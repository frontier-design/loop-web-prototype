import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

import landmark1Icon from '../assets/icons/landmark-1.svg';
import landmark2Icon from '../assets/icons/landmark-2.svg';
import landmark3Icon from '../assets/icons/landmark-3.svg';

const ICON_SRC = {
  'landmark-1': landmark1Icon,
  'landmark-2': landmark2Icon,
  'landmark-3': landmark3Icon,
};

// Smaller than hubs (hubs are ~64×75px) so landmarks are secondary
const LANDMARK_SIZE = 60;

function LandmarkMarkersLayer({ map, data }) {
  const markersRef = useRef([]);

  useEffect(() => {
    if (!map || !data?.landmarks?.length) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    data.landmarks.forEach((landmark) => {
      const src = ICON_SRC[landmark.icon] || landmark1Icon;

      const el = document.createElement('div');
      el.className = 'landmark-marker';
      el.style.width = `${LANDMARK_SIZE}px`;
      el.style.height = `${LANDMARK_SIZE}px`;
      el.style.cursor = 'default';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';

      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.style.pointerEvents = 'none';
      el.appendChild(img);

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
    };
  }, [map, data]);

  return null;
}

export default LandmarkMarkersLayer;
