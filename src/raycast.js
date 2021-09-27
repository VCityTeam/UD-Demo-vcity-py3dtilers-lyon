import { THREE } from 'ud-viz';

const raycaster = new THREE.Raycaster();

function setObjects3D(tiles) {
  var objectsToRaycast = [];
  for (let tile of tiles) {
    if (tile) {
      var obj3D = tile.getObject3D();
      if (obj3D) objectsToRaycast.push(obj3D);
    }
  }
  return objectsToRaycast;
}

export function raycastObjects3D(layers, targetLayerId, camera, mousePosition) {
  var objectsToRaycast = [];

  for (let [id, value] of Object.entries(layers)) {
    if (id === targetLayerId) {
      objectsToRaycast = setObjects3D(value[1].tiles);
      break;
    }
  }

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mousePosition, camera.camera3D);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(objectsToRaycast, true);

  if (intersects.length > 0) return intersects[0].point;
}
