import {Aurelia} from "aurelia-framework";
// we want font-awesome to load as soon as possible to show the fa-spinner
import "../styles/styles.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/bootstrap-flat.css";
import "../styles/bootstrap-flat-extras.css";
import "../styles/awesome-bootstrap-checkbox.css";
// import "metro-dist/css/metro.css";
//import "metro-dist/js/metro"; 
import "bootstrap";import "nprogress/nprogress.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker3.css";

// comment out if you don't want a Promise polyfill (remove also from webpack.config.js)
import * as Bluebird from "bluebird";
Bluebird.config({ warnings: false });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin("aurelia-dialog")
    .feature("resources")
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin("aurelia-animator-css");
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin("aurelia-html-import-template-loader")

  await aurelia.start();
  aurelia.setRoot("shell/shell");

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import("offline-plugin/runtime");
  offline.install();
  */
}