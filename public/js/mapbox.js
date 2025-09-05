/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmphbW1pbjEzNCIsImEiOiJjbWV1NHR0OXQwM2hjMmlwbDBsN2hxanhkIn0.PY-Yx1Nl18lvuIJxBeCPbw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bjammin134/cmeu52tnd00vg01r98tg6ac4e', // Use the standard style for the map
    scrollZoom: false, // Disables the scrolling in and out with mouse wheel but still allows users to pan
    //   projection: 'globe', // display the map as a globe
    //   zoom: 4, // initial zoom level, 0 is the world view, higher values zoom in
    //   center: [-118, 34], // center the map on this longitude and latitude
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Dat ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  // Add padding
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
