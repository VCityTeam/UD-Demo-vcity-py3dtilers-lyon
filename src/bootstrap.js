/** @format */
import { Templates, Widgets, THREE } from 'ud-viz';
import { reverseRefinement, setMousePosition, switchPositionReference, setLayersDefaultRefinement } from './3dtilesProcessing';
import { raycastObjects3D } from './raycast';

const app = new Templates.AllWidget();
var mousePosition = new THREE.Vector2();
var layers = null;
var camera = null;
var useCameraPosition = true;

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

function onMouseMove(event) {
  if (useCameraPosition) return;

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (camera != null && layers != null) {
    var positionOnGround = raycastObjects3D(layers, camera, mousePosition);
    setMousePosition(positionOnGround);
  }
}

window.addEventListener('mousemove', onMouseMove, false);

let reverseButton = document.createElement('button');
reverseButton.id = 'reverseProcessButton';
reverseButton.innerHTML = 'Reverse 3DTiles process';
reverseButton.onclick = function () {
  reverseRefinement(layers);
};

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
  layers = app.setupAndAdd3DTilesLayers();

  setLayersDefaultRefinement(layers);

  const layerChoice = new Widgets.LayerChoice(app.layerManager);
  app.addModuleView('layerChoice', layerChoice);

  const debug3dTilesWindow = new Widgets.Extensions.Debug3DTilesWindow(
    app.layerManager
  );
  app.addModuleView('3dtilesDebug', debug3dTilesWindow, {
    name: '3DTiles Debug',
  });

  const cityObjectModule = new Widgets.CityObjectModule(
    app.layerManager,
    app.config
  );
  app.addModuleView('cityObjects', cityObjectModule.view);

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
