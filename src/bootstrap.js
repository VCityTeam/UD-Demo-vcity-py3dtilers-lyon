/** @format */
import { Templates, Widgets, itowns, THREE } from 'ud-viz';

const app = new Templates.AllWidget();
const boundingVolumeBox = new THREE.Box3();
const boundingVolumeSphere = new THREE.Sphere();
var isReversed = false;

// This method was created by iTowns
// https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js#L257
const computeNodeSSE = (camera, node) => {
  node.distance = 0;
  if (node.boundingVolume.region) {
    boundingVolumeBox.copy(node.boundingVolume.region.box3D);
    boundingVolumeBox.applyMatrix4(node.boundingVolume.region.matrixWorld);
    node.distance = boundingVolumeBox.distanceToPoint(camera.camera3D.position);
  } else if (node.boundingVolume.box) {
    boundingVolumeBox.copy(node.boundingVolume.box);
    boundingVolumeBox.applyMatrix4(node.matrixWorld);
    node.distance = boundingVolumeBox.distanceToPoint(camera.camera3D.position);
  } else if (node.boundingVolume.sphere) {
    boundingVolumeSphere.copy(node.boundingVolume.sphere);
    boundingVolumeSphere.applyMatrix4(node.matrixWorld);
    node.distance = Math.max(
      0.0,
      boundingVolumeSphere.distanceToPoint(camera.camera3D.position)
    );
  } else {
    return Infinity;
  }
  if (node.distance === 0) {
    return Infinity;
  }
  return camera._preSSE * (node.geometricError / node.distance);
};

const reverseSubdivision = (context, layer, node) => {
  if (layer.tileset.tiles[node.tileId].children === undefined) {
    return false;
  }
  if (layer.tileset.tiles[node.tileId].isTileset) {
    return true;
  }
  const sse = computeNodeSSE(context.camera, node);
  if (node.parent.type === 'Object3D') {
    return sse < layer.sseThreshold;
  } else {
    return sse > layer.sseThreshold;
  }
};

const reverseRefinement = () => {
  return itowns.process3dTilesNode(itowns.$3dTilesCulling, reverseSubdivision);
};

const refinement = () => {
  return itowns.process3dTilesNode(
    itowns.$3dTilesCulling,
    itowns.$3dTilesSubdivisionControl
  );
};

app.start('../assets/config/config.json').then(() => {
  // app.addBaseMapLayer();
  // app.addElevationLayer();
  // itowns.enableDracoLoader('./assets/draco/');
  const layers = app.setupAndAdd3DTilesLayers();

  const layerChoice = new Widgets.LayerChoice(app.layerManager);
  app.addModuleView('layerChoice', layerChoice);
  document.addEventListener(
    'keydown',
    (event) => {
      const keyName = event.key;
      if (keyName === 's') {
        if (isReversed) {
          for (let [id, value] of Object.entries(layers)) {
            value[0].update = refinement();
          }
          isReversed = false;
        } else {
          for (let [id, value] of Object.entries(layers)) {
            value[0].update = reverseRefinement();
          }
          isReversed = true;
        }
      }
    },
    false
  );
});
