// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

// Import desired Bootstrap JS files
import 'bootstrap/js/src/collapse'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/scrollspy'
import 'bootstrap/js/src/tooltip'

// Import FontAwesome Solid
import "@fortawesome/fontawesome-free/css/solid.css"

Rails.start()
Turbolinks.start()
ActiveStorage.start()
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
