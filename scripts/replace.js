#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

// Define filepaths
const leafletOptions = path.join(__dirname, '..', 'src', 'leaflet_options.js')
const debug = path.join(__dirname, '..', 'debug', 'index.html')

// Read & Replace options
for (const filepath of [leafletOptions, debug]) {
  let options = fs.readFileSync(filepath, 'utf8')

  // Define Environment variables
  const ZOOM = process.env.OSRM_ZOOM || 13
  const LABEL = process.env.OSRM_LABEL || 'Car (fastest)'
  const CENTER = process.env.OSRM_CENTER || '43.466667, -80.516667'
  const BACKEND = process.env.OSRM_BACKEND || 'https://router.project-osrm.org'
  const BACKEND_CUSTOM = process.env.OSRM_BACKEND_CUSTOM || 'https://router.project-osrm.org'
  const BACKEND_LIGHTING = process.env.OSRM_BACKEND_LIGHTING || 'https://router.project-osrm.org'
  const BACKEND_SIDEWALKS = process.env.OSRM_BACKEND_SIDEWALKS || 'https://router.project-osrm.org'
  const LANGUAGE = process.env.OSRM_LANGUAGE || 'en'
  const DEFAULT_LAYER = process.env.OSRM_DEFAULT_LAYER || 'streets'
  const MAPBOX_TOKEN = process.env.OSRM_MAPBOX_TOKEN || 'pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg'

  // Edit Leaflet Options
  if (BACKEND) options = options.replace(/http[s]?:\/\/router\.project-osrm\.org/, BACKEND)
  if (BACKEND_CUSTOM) options = options.replace(/http[s]?:\/\/router\.project-osrm\.org/, BACKEND_CUSTOM)
  if (BACKEND_LIGHTING) options = options.replace(/http[s]?:\/\/router\.project-osrm\.org/, BACKEND_LIGHTING)
  if (BACKEND_SIDEWALKS) options = options.replace(/http[s]?:\/\/router\.project-osrm\.org/, BACKEND_SIDEWALKS)
  if (LABEL) options = options.replace('Car (fastest)', LABEL)
  if (ZOOM) options = options.replace('zoom: 13', `zoom: ${ZOOM}`)
  if (LANGUAGE) options = options.replace(`language: 'en'`, `language: '${LANGUAGE}'`)
  if (DEFAULT_LAYER) options = options.replace('layer: streets', `layer: ${DEFAULT_LAYER}`)
  if (MAPBOX_TOKEN) options = options.replace(/mapboxToken = '.*'/, `mapboxToken = '${MAPBOX_TOKEN}'`)
  if (CENTER) {
    const latLng = CENTER.split(/[, ]+/)
    const lat = latLng[0];
    const lng = latLng[1];
    const lnglat = [lng, lat].join(',')
    const latlng = [lat, lng].join(',')

    // Mapbox uses LngLat
    if (options.match('-122.4536, 37.796')) options = options.replace('-122.4536, 37.796', lnglat)
    // Leaflet uses LatLng
    else options = options.replace('38.8995,-77.0269', latlng)
  }

  // Save Leaflet Options
  fs.writeFileSync(filepath, options)
}
