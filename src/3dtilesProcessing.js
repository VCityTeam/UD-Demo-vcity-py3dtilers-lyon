import { itowns, THREE } from 'ud-viz';

const boundingVolumeBox = new THREE.Box3();
const boundingVolumeSphere = new THREE.Sphere();

var isReversed = false;
var mousePosition = null;
var useCameraPosition = true;

// This method was created by iTowns
// https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js#L257
const computeNodeSSE = (camera, node) => {
  node.distance = 0;
  var position = null;
  var preSSE = camera._preSSE;

  if (useCameraPosition || mousePosition == null) 
    position = camera.camera3D.position;
  else {
      position = mousePosition;
      preSSE = preSSE / 10;
  }

  if (node.boundingVolume.region) {
    boundingVolumeBox.copy(node.boundingVolume.region.box3D);
    boundingVolumeBox.applyMatrix4(node.boundingVolume.region.matrixWorld);
    node.distance = boundingVolumeBox.distanceToPoint(position);
  } else if (node.boundingVolume.box) {
    boundingVolumeBox.copy(node.boundingVolume.box);
    boundingVolumeBox.applyMatrix4(node.matrixWorld);
    node.distance = boundingVolumeBox.distanceToPoint(position);
  } else if (node.boundingVolume.sphere) {
    boundingVolumeSphere.copy(node.boundingVolume.sphere);
    boundingVolumeSphere.applyMatrix4(node.matrixWorld);
    node.distance = Math.max(
      0.0,
      boundingVolumeSphere.distanceToPoint(position)
    );
  } else return Infinity;
  if (node.distance === 0) return Infinity;
  return preSSE * (node.geometricError / node.distance);
};

const reverseSubdivision = (context, layer, node) => {
  if (layer.tileset.tiles[node.tileId].children === undefined) return false;
  if (layer.tileset.tiles[node.tileId].isTileset) return true;
  const sse = computeNodeSSE(context.camera, node);
  if (node.parent.type === 'Object3D') return sse < layer.sseThreshold;
  else return sse > layer.sseThreshold;
};

const subdivision = (context, layer, node) => {
  if (layer.tileset.tiles[node.tileId].children === undefined) return false;
  if (layer.tileset.tiles[node.tileId].isTileset) return true;
  const sse = computeNodeSSE(context.camera, node);
  return sse > layer.sseThreshold;
};

const reversedRefinement = () => {
  return itowns.process3dTilesNode(itowns.$3dTilesCulling, reverseSubdivision);
};

const refinement = () => {
  return itowns.process3dTilesNode(itowns.$3dTilesCulling, subdivision);
};

export function reverseRefinement(layers) {
  if (isReversed) {
    for (let [id, value] of Object.entries(layers)) {
      value[0].update = refinement();
    }
    isReversed = false;
  } else {
    for (let [id, value] of Object.entries(layers)) {
      value[0].update = reversedRefinement();
    }
    isReversed = true;
  }
}

export function setLayersDefaultRefinement(layers) {
  for (let [id, value] of Object.entries(layers)) {
    value[0].update = refinement();
  }
}

export function switchPositionReference() {
  useCameraPosition = !useCameraPosition;
  return useCameraPosition;
}

export function setMousePosition(position) {
  mousePosition = position;
}
