// components/OrderHeatmap.tsx
import { apiRequest } from '@/hooks/apiRequest';
import mapboxgl, { Map, GeoJSONSource } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

mapboxgl.accessToken = mapboxToken;

type AreaOrderCount = {
  _id: string;
  count: number;
};

// Coordinates for each area
const areaCoordinates: Record<string, [number, number]> = {
  "thane": [72.9781, 19.2183],
  "sion": [72.8500, 19.0400],
  "kalyan": [73.1305, 19.2403],
  "dombevli": [73.0838, 19.2167],
};

export default function OrderHeatmap() {
  const mapContainer = useRef(null);
  const mapRef = useRef<Map | null>(null);

  const [heatmapData, setHeatmapData] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    const fetchHeatmapData = async () => {
      const res = await apiRequest("http://localhost:3000/api/order/count","GET",null);
      const orders: AreaOrderCount[] = res;

      const geo: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: orders
          .filter(item => areaCoordinates[item._id]) // skip unknown areas
          .map((item) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: areaCoordinates[item._id],
            },
            properties: {
              weight: item.count,
            },
          })),
      };

      setHeatmapData(geo);
    };

    fetchHeatmapData();
  }, []);

  // Initialize map and heatmap layer
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [72.87, 19.07], // Mumbai-ish
      zoom: 10,
    });

    mapRef.current = map;

    map.on('load', () => {
      if (!map.getSource('orders')) {
        map.addSource('orders', {
          type: 'geojson',
          data: heatmapData,
        });

        map.addLayer({
          id: 'orders-heat',
          type: 'heatmap',
          source: 'orders',
          paint: {
            'heatmap-weight': ['get', 'weight'],
            'heatmap-intensity': 1,
            'heatmap-radius': 30,
            'heatmap-opacity': 0.7,
          },
        });
      }
    });

    return () => map.remove(); // Cleanup on unmount
  }, [heatmapData]);

  return (
    <div>
        <p className='font-bold text-2xl'>Heat Map of Active Area</p>
        <div ref={mapContainer} className="w-full h-[400px] rounded-xl shadow-md" />
    </div>
  )

}
