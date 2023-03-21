'use strict';

var L = require('leaflet');
var links = require('./links');

var State = L.Class.extend({
  options: { },

  initialize: function(map, lrm_control, lrm_custom_one_control, lrm_custom_two_control, lrm_custom_control, tools, default_options) {
    this._lrm = lrm_control;
    this._lrm_custom_one = lrm_custom_one_control;
    this._lrm_custom_two = lrm_custom_two_control;
    this._lrm_custom = lrm_custom_control;
    this._map = map;
    this._tools = tools;
    this.safety = {
      lighting : false,
      sidewalks : false
    };
    this.server = 0

    this.set(default_options);

    this._lrm.on('routeselected', function(e) {
      if (this.server == 0) this.options.alternative = e.route.routesIndex;
    }, this);

    this._lrm_custom_one.on('routeselected', function(e) {
      if (this.server == 1) this.options.alternative = e.route.routesIndex;
    }, this);

    this._lrm_custom_two.on('routeselected', function(e) {
      if (this.server == 2) this.options.alternative = e.route.routesIndex;
    }, this);

    this._lrm_custom.on('routeselected', function(e) {
      if (this.server == 3) this.options.alternative = e.route.routesIndex;
    }, this);

    this._lrm.getPlan().on('waypointschanged', function() { if (this.server !== 0) return; this.options.waypoints = this._lrm.getWaypoints(); this.update(); }.bind(this));
    this._lrm_custom_one.getPlan().on('waypointschanged', function() { if (this.server !== 1) return; this.options.waypoints = this._lrm_custom_one.getWaypoints(); this.update(); }.bind(this));
    this._lrm_custom_two.getPlan().on('waypointschanged', function() { if (this.server !== 2) return; this.options.waypoints = this._lrm_custom_two.getWaypoints(); this.update(); }.bind(this));
    this._lrm_custom.getPlan().on('waypointschanged', function() { if (this.server !== 3) return; this.options.waypoints = this._lrm_custom.getWaypoints(); this.update(); }.bind(this));
    this._map.on('zoomend', function() { this.options.zoom = this._map.getZoom();  this.update(); }.bind(this));
    this._map.on('moveend', function() { this.options.center = this._map.getCenter(); this.update(); }.bind(this));
    this._tools.on('languagechanged', function(e) { this.options.language = e.language; this.reload(); }.bind(this));
    this._tools.on('unitschanged', function(e) { this.options.units = e.unit; this.update(); }.bind(this));
  },

  setLighting: function(settingEnabled) {
    this.safety.lighting = settingEnabled
    this.setServer();
  },

  setSidewalks: function(settingEnabled) {
    this.safety.sidewalks = settingEnabled;
    this.setServer();
  },

  getServer: function() {
    return this.server;
  },

  setServer: function() {
    if (!this.safety.lighting && !this.safety.sidewalks) this.server = 0;
    else if (this.safety.lighting && this.safety.sidewalks) this.server = 3;
    else if (this.safety.lighting && !this.safety.sidewalks) this.server = 1;
    else if (this.safety.sidewalks && !this.safety.lighting) this.server = 2;
  },

  set: function(options) {
    L.setOptions(this, options);
    this._lrm.setWaypoints(this.options.waypoints);
    this._lrm_custom_one.setWaypoints(this.options.waypoints);
    this._lrm_custom_two.setWaypoints(this.options.waypoints);
    this._lrm_custom.setWaypoints(this.options.waypoints);
    this._map.setView(this.options.center, this.options.zoom);
  },

  reload: function() {
    this.update();
    window.location.reload();
  },

  // Update browser url
  update: function() {
    var baseURL = window.location.href.split('?')[0];
    var newParms = links.format(this.options);
    var newURL = baseURL.concat('?').concat(newParms);
    window.location.hash = newParms;
    history.replaceState({}, 'Project OSRM Demo', newURL);
  },
});

module.exports = function(map, lrm_control, lrm_custom_one_control, lrm_custom_two_control, lrm_custom_control, tools, default_options) {
  return new State(map, lrm_control, lrm_custom_one_control, lrm_custom_two_control, lrm_custom_control, tools, default_options);
};
