import { useEffect } from 'react';

const SOURCE_ID = 'ttc-subway-source';
const LAYER_ID = 'ttc-subway-layer';

const LINE_COLOR = '#ffffff';
const LINE_DASHARRAY = [2, 2];

/**
 * Renders TTC subway lines from Toronto open data (FeatureServer 11).
 * Styled as white dashed strokes.
 */
function TTCSubwayLayer({ map, data, lineWidth = 4, lineOpacity = 1 }) {
  useEffect(() => {
    if (!map || !data) return;

    if (map.getSource(SOURCE_ID)) {
      map.getSource(SOURCE_ID).setData(data);
    } else {
      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data,
      });
    }

    if (map.getLayer(LAYER_ID)) {
      map.setPaintProperty(LAYER_ID, 'line-color', LINE_COLOR);
      map.setPaintProperty(LAYER_ID, 'line-width', lineWidth);
      map.setPaintProperty(LAYER_ID, 'line-opacity', lineOpacity);
      map.setPaintProperty(LAYER_ID, 'line-dasharray', LINE_DASHARRAY);
    } else {
      map.addLayer({
        id: LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': LINE_COLOR,
          'line-width': lineWidth,
          'line-opacity': lineOpacity,
          'line-dasharray': LINE_DASHARRAY,
        },
      });
    }

    return () => {
      if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };
  }, [map, data, lineWidth, lineOpacity]);

  return null;
}

export default TTCSubwayLayer;
