// Mock implementation of shapefile
export class Shapefile {
  static read(buffer) {
    return new Promise((resolve) => {
      console.log('Reading shapefile...');
      // Mock GeoJSON output
      resolve({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              id: 1,
              name: 'Sample Area 1',
              type: 'Polygon'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-90.5069, 14.6349],
                [-90.4969, 14.6349],
                [-90.4969, 14.6449],
                [-90.5069, 14.6449],
                [-90.5069, 14.6349]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: {
              id: 2,
              name: 'Sample Area 2',
              type: 'Polygon'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-90.5269, 14.6149],
                [-90.5169, 14.6149],
                [-90.5169, 14.6249],
                [-90.5269, 14.6249],
                [-90.5269, 14.6149]
              ]]
            }
          }
        ]
      });
    });
  }
}

export default Shapefile;
