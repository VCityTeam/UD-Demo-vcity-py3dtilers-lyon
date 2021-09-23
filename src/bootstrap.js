/** @format */
import { Templates, Widgets, THREE } from 'ud-viz';
import { switchRefinement } from './3dtilesProcessing';
import { raycastObjects3D } from './raycast';

const app = new Templates.AllWidget();
var mouse = new THREE.Vector2();
var layers = null;
var camera = null;

var styles = `
#switchProcessButton {
  line-height: 20px;
  font-weight: bold;
  background: salmon;
  border: none;
  width: 60px;
  font-size: 11px;
}
#switchProcessButton:hover {
  background: lightsalmon;
}`;

var styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (camera != null && layers != null) {
    raycastObjects3D(layers, camera, mouse);
  }
}

window.addEventListener('mousemove', onMouseMove, false);

let btn = document.createElement('button');
btn.id = 'switchProcessButton';
btn.innerHTML = 'Switch 3DTiles process';
btn.onclick = function () {
  switchRefinement(layers);
};

app.start('../assets/config/config.json').then(() => {
  // app.addBaseMapLayer();
  // app.addElevationLayer();
  // itowns.enableDracoLoader('./assets/draco/');
  layers = app.setupAndAdd3DTilesLayers();

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
    document.body.appendChild(btn);
  } else {
    div.appendChild(btn);
  }

  camera = app.view.camera;
});
