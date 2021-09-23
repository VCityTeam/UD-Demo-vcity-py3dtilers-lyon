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

export function raycastObjects3D(layers, camera, mouse) {
  var objectsToRaycast = [];

  for (let [id, value] of Object.entries(layers)) {
    if (id === '3d-tiles-layer-relief') {
      objectsToRaycast = setObjects3D(value[1].tiles);
      break;
    }
  }

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera.camera3D);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(objectsToRaycast);

  for (let i = 0; i < intersects.length; i++) {
    console.log(intersects[i]);
  }
}
