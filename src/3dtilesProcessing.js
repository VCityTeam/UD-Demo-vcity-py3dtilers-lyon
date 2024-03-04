import * as THREE from 'three';
import * as itowns from 'itowns';

const boundingVolumeBox = new THREE.Box3();
const boundingVolumeSphere = new THREE.Sphere();

var isReversed = false;
var mousePosition = null;
var useCameraPosition = false;

// This method is a copy of the `computeNodeSSE` by iTowns
// but is using either camera position or mouse position
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

// This method is a copy of the `$3dTilesSubdivisionControl` by iTowns
// but does the opposite of what its suppose to do
// https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js#L374
const reverseSubdivision = (context, layer, node) => {
  if (layer.tileset.tiles[node.tileId].children === undefined) return false;
  if (layer.tileset.tiles[node.tileId].isTileset) return true;
  const sse = computeNodeSSE(context.camera, node);
  if (node.parent.type === 'Object3D') return sse < layer.sseThreshold;
  else return sse > layer.sseThreshold;
};

// This method is a copy of the `$3dTilesSubdivisionControl` by iTowns
// but uses the local "computeNodeSSE" method
// https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js#L374
const subdivision = (context, layer, node) => {
  if (layer.tileset.tiles[node.tileId].children === undefined) return false;
  if (layer.tileset.tiles[node.tileId].isTileset) return true;
  const sse = computeNodeSSE(context.camera, node);
  return sse > layer.sseThreshold;
};

function culling(layer, camera, node, tileMatrixWorld) {
  if (!node.transform) return false;
  let cameraPos = camera.camera3D.position;
  let box = node.boundingVolume.box;
  let nodePos = new THREE.Vector3(
    tileMatrixWorld.elements[12],
    tileMatrixWorld.elements[13],
    tileMatrixWorld.elements[14]
  );
  let box_min = new THREE.Vector3(
    nodePos.x + box.min.x,
    nodePos.y + box.min.y,
    nodePos.z + box.min.z
  );
  let box_max = new THREE.Vector3(
    nodePos.x + box.max.x,
    nodePos.y + box.max.y,
    nodePos.z + box.max.z
  );
  let dx = Math.max(box_min.x - cameraPos.x, 0, cameraPos.x - box_max.x);
  let dy = Math.max(box_min.y - cameraPos.y, 0, cameraPos.y - box_max.y);
  let dz = Math.max(box_min.z - cameraPos.z, 0, cameraPos.z - box_max.z);
  let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  return distance > 5000;
}

const reversedRefinement = () => {
  return itowns.process3dTilesNode(itowns.$3dTilesCulling, reverseSubdivision);
};

const refinement = () => {
  return itowns.process3dTilesNode(itowns.$3dTilesCulling, subdivision);
};

const distanceCulling = () => {
  return itowns.process3dTilesNode(culling, itowns.$3dTilesSubdivisionControl);
};

export function reverseRefinement(tilesManagers) {
  if (isReversed) {
    tilesManagers.forEach(function (tilesManager) {
      tilesManager.layer.update = refinement();
    });
    isReversed = false;
  } else {
    tilesManagers.forEach(function (tilesManager) {
      tilesManager.layer.update = reversedRefinement();
    });
    isReversed = true;
  }
}

export function setLayersDefaultRefinement(tilesManagers) {
  tilesManagers.forEach(function (tilesManager) {
    tilesManager.layer.update = refinement();
  });
}

export function setLayersDistanceCulling(tilesManagers) {
  tilesManagers.forEach(function (tilesManager) {
    tilesManager.layer.update = distanceCulling();
  });
}

export function switchPositionReference() {
  useCameraPosition = !useCameraPosition;
  return useCameraPosition;
}

export function setMousePosition(position) {
  mousePosition = position;
}
