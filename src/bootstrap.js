/** @format */
import { Templates, Widgets, THREE } from 'ud-viz';
import {
  reverseRefinement,
  setMousePosition,
  switchPositionReference,
  setLayersDefaultRefinement,
} from './3dtilesProcessing';
import { raycastObjects3D } from './raycast';

const app = new Templates.AllWidget();
var mousePosition = new THREE.Vector2();
var layers = null;
var camera = null;
var useCameraPosition = false;

// Buttons CSS style
var styles = `
button {
  line-height: 20px;
  font-weight: bold;
  border: none;
  width: 60px;
  font-size: 11px;
}
#reverseProcessButton {
  background: salmon;
}
#reverseProcessButton:hover {
  background: lightsalmon;
}
#useMouseButton {
  background: #057f8d;
}
#useMouseButton:hover {
  background: #069fb0;
}`;

var styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// When using mouse position as reference to refine 3DTiles,
// raycast on the relief to find mouse world position
function onMouseMove(event) {
  if (useCameraPosition) return;

  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (camera != null && layers != null) {
    var positionOnGround = raycastObjects3D(layers, '3d-tiles-layer-relief', camera, mousePosition);
    setMousePosition(positionOnGround);
    app.view.notifyChange(camera.camera3D);
  }
}

window.addEventListener('mousemove', onMouseMove, false);

// Create a button which switch the processing of the 3DTiles
let reverseButton = document.createElement('button');
reverseButton.id = 'reverseProcessButton';
reverseButton.innerHTML = 'Reverse 3DTiles process';
reverseButton.onclick = function () {
  reverseRefinement(layers);
  app.view.notifyChange(camera.camera3D);
};

// Create a button which switch the reference position to refine the 3DTiles
let useMouseButton = document.createElement('button');
useMouseButton.id = 'useMouseButton';
useMouseButton.innerHTML = 'Switch position reference';
useMouseButton.onclick = function () {
  useCameraPosition = switchPositionReference();
};

app.start('../assets/config/config.json').then(() => {
  // app.addBaseMapLayer();
  // app.addElevationLayer();
  // itowns.enableDracoLoader('./assets/draco/');

  // Add 3DTiles layers in the scene and set their default refinement method
  layers = app.setupAndAdd3DTilesLayers();
  setLayersDefaultRefinement(layers);

  // Create the layer choice module
  const layerChoice = new Widgets.LayerChoice(app.layerManager);
  app.addModuleView('layerChoice', layerChoice);

  // Create the 3DTiles debugger module
  const debug3dTilesWindow = new Widgets.Extensions.Debug3DTilesWindow(
    app.layerManager
  );
  app.addModuleView('3dtilesDebug', debug3dTilesWindow, {
    name: '3DTiles Debug',
  });

  // Create the city object module
  const cityObjectModule = new Widgets.CityObjectModule(
    app.layerManager,
    app.config
  );
  app.addModuleView('cityObjects', cityObjectModule.view);

  // Add the buttons in the page
  let div = document.getElementById('_all_widget_menu');
  if (div == null) {
    document.body.appendChild(reverseButton);
    document.body.appendChild(useMouseButton);
  } else {
    div.appendChild(reverseButton);
    div.appendChild(useMouseButton);
  }

  camera = app.view.camera;
});
