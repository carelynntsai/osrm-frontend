'use strict';

var L = require('leaflet');

var Control = L.Control.extend({
  includes: L.Mixin.Events,
  options: {},
  initalize: {},
  onAdd: function(map) {
    var allCheckboxes,
      lightingCheckbox,
      sidewalkCheckbox,
      speedCheckbox;
    this.allCheckboxes = L.DomUtil.create('div', 'checkbox-container');
    div.innerHTML = '<form name="preferences" <legend> Safety Preferences</legend> \
    <fieldset style="border: 0;"> <input type="checkbox" name="safety_factors" value="Lighting">Lighting<br> \
    <input type="checkbox" name="safety_factors" value="Sidewalks">Sidewalks<br> \
    <input type="checkbox" name="safety_factors" value="Road Speed">Road speed<br> \
   <br> <input type="submit" value="Save" /> </fieldset>'

    div.style = 'background-color: white; opacity: 0.8;'
    //lightingCheckbox - L.DomUtil.create('div')
    return this.allCheckboxes;
  },

  onRemove: function() {}

});
module.exports = Control;

// var checkboxes = function() {
//   var container = L.DomUtil.create('div', 'checkboxes')
//   div.innerHTML = '<form name="preferences" <legend> Safety Preferences</legend> \
//   <fieldset style="border: 0;"> <input type="checkbox" name="safety_factors" value="Lighting">Lighting<br> \
//   <input type="checkbox" name="safety_factors" value="Sidewalks">Sidewalks<br> \
//   <input type="checkbox" name="safety_factors" value="Road Speed">Road speed<br> \
//  <br> <input type="submit" value="Save" /> </fieldset>'

//   div.style = 'background-color: white; opacity: 0.8;'
//   return  container;
// };

// module.exports = checkboxes;

// checkboxes.addTo(map);

// // add the event handler
// function handleCommand() {
//   alert("Clicked, checked = " + this.checked);
// }
// document.getElementById ("safety_factors").addEventListener ("click", handleCommand, false);
