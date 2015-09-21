window.jQuery = window.$ = require("jquery");
var waypoints = require('waypoints');
require('viewport-units-buggyfill').init();
require('velocity-animate');
require('velocity-animate/velocity.ui');

// eliminate 300ms delay in touch UIs
var attachFastClick = require('fastclick');
attachFastClick(document.body);

require('./modules/hide-footer').init();
require('./modules/home-carousel').init();
require('./modules/toggle-menu').init();
require('./modules/remove-mb').init();
require('./modules/accordion').init();
require('./modules/footer-arrow').init();