
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: campgroundMap.geometry.coordinates, 
    zoom: 8
});


new mapboxgl.Marker()
    .setLngLat(campgroundMap.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campgroundMap.title}</h3><p>${campgroundMap.location}</p>`
        )
    )
    .addTo(map)