import { THREE } from 'ud-viz';

function setObjects3D(tiles, objectsToRaycast) {
  for (let tile of tiles) {
    if (tile) {
      var obj3D = tile.getObject3D();
      if (obj3D) objectsToRaycast.push(obj3D);
    }
  }
  return objectsToRaycast;
}

export function raycastObjects3D(tilesManagers, targetLayerId, camera, mousePosition) {
  let objectsToRaycast = [];

  tilesManagers.forEach(function (tilesManager) {
    if (tilesManager.layer.id === targetLayerId) {
      objectsToRaycast = setObjects3D(tilesManager.tiles, objectsToRaycast);
    }
  });

  const raycaster = new THREE.Raycaster();
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mousePosition, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(objectsToRaycast, true);

  if (intersects.length > 0) return intersects[0].point;
}
