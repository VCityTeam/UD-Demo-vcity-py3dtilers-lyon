/** @format */
import * as THREE from 'three';
import {
  reverseRefinement,
  setMousePosition,
  switchPositionReference,
  setLayersDefaultRefinement,
} from './3dtilesProcessing';
import { raycastObjects3D } from './raycast';

export class RefinementButtons {
  constructor(view, camera, tilesManagers) {
    this.useCameraPosition = false;
    this.view = view;
    this.camera = camera;
    this.tilesManagers = tilesManagers;

    setLayersDefaultRefinement(tilesManagers);

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

    // Create a button which switch the processing of the 3DTiles
    let reverseButton = document.createElement('button');
    reverseButton.id = 'reverseProcessButton';
    reverseButton.innerHTML = 'Reverse 3DTiles process';
    reverseButton.onclick = function () {
      reverseRefinement(tilesManagers);
      view.notifyChange(camera);
    };

    // Create a button which switch the reference position to refine the 3DTiles
    let useMouseButton = document.createElement('button');
    useMouseButton.id = 'useMouseButton';
    useMouseButton.innerHTML = 'Switch position reference';
    useMouseButton.onclick = function () {
      this.useCameraPosition = switchPositionReference();
    };

    // Add the buttons in the page
    let div = document.getElementById('_all_widget_menu');
    if (div == null) {
      document.body.appendChild(reverseButton);
      document.body.appendChild(useMouseButton);
    } else {
      div.appendChild(reverseButton);
      div.appendChild(useMouseButton);
    }

    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  // When using mouse position as reference to refine 3DTiles,
  // raycast on the relief to find mouse world position
  onMouseMove(event) {
    if (this.useCameraPosition) return;
    
    var mousePosition = new THREE.Vector2();
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    if (this.camera != null && this.tilesManagers != null) {
      var positionOnGround = raycastObjects3D(
        this.tilesManagers,
        '3d-tiles-layer-relief',
        this.camera,
        mousePosition
      );
      setMousePosition(positionOnGround);
      this.view.notifyChange(this.camera);
    }
  }
}
