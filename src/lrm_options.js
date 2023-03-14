'use strict';

var mapView = require('./leaflet_options');
var createGeocoder = require('./geocoder');
var createCheckboxes = require('./checkboxes');

module.exports = {
  lrm: {
    lineOptions: {
      styles: [
        {color: '#2D72D2', opacity: 0.9, weight: 8},
        {color: 'white', opacity: 0.3, weight: 6}
      ]
    },
    altLineOptions: {
      styles: [
        {color: '#40007d', opacity: 0.4, weight: 8},
        {color: 'black', opacity: 0.5, weight: 2, dashArray: '2,4' },
        {color: 'white', opacity: 0.3, weight: 6}
      ]
    },
    checkboxes: {
      styles: [
        {color: 'black'}
      ]
    },

    dragStyles: [
      {color: 'black', opacity: 0.35, weight: 9},
      {color: 'white', opacity: 0.8, weight: 7}
    ],
    routeWhileDragging: true,
    safetyDetails: '<div class="osrm-directions-summary"><h3>Lighting</h3></div>',
    summaryTemplate: '<div class="osrm-directions-summary"><h3>Distance: {distance}, <br> Time: {time}</h3></div>',
    containerClassName: 'dark pad2',
    alternativeClassName: 'osrm-directions-instructions',
    stepClassName: 'osrm-directions-step',
    geocodersClassName: 'osrm-directions-inputs',
    createGeocoder: createGeocoder,
    // createCheckboxes: createCheckboxes,
    showAlternatives: true,
    useZoomParameter: false,
    routeDragInterval: 200,
    collapsible: true
  },
  popup: {
    removeButtonClass: 'osrm-directions-icon osrm-close-light-icon',
    uturnButtonClass: 'osrm-directions-icon osrm-u-turn-icon',
  },
  tools: {
    popupWindowClass: 'fill-osrm dark',
    popupCloseButtonClass: 'osrm-directions-icon osrm-close-icon',
    editorButtonClass: 'osrm-directions-icon osrm-editor-icon',
    josmButtonClass: 'osrm-directions-icon osrm-josm-icon',
    debugButtonClass: 'osrm-directions-icon osrm-debug-icon',
    mapillaryButtonClass: 'osrm-directions-icon osrm-mapillary-icon',
    gpxButtonClass: 'osrm-directions-icon osrm-gpx-icon',
    localizationChooserClass: 'osrm-localization-chooser',
    printButtonClass: 'osrm-directions-icon osrm-printer-icon',
    toolsContainerClass: 'fill-osrm dark',
    position: 'bottomright'
  }
};
