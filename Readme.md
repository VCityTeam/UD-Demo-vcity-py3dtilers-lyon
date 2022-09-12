# py3dtilers demo

This demo illustrate [3D Tiles](https://github.com/CesiumGS/3d-tiles) tilesets created with [py3dtilers](https://github.com/VCityTeam/py3dtilers). The demo is based on [UD-Viz](https://github.com/VCityTeam/UD-Viz) which is using [iTowns](https://github.com/iTowns/itowns/tree/master/src) to visualize 3D models.

_Note: the code in [3dtilesProcessing.js](src/3dtilesProcessing.js) is widely inspired by the [iTowns's 3D Tiles processing](https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js)._

__See [online demo](https://py3dtilers-demo.vcityliris.data.alpha.grandlyon.com/).__

## Installation

You need [Node.js](https://en.wikipedia.org/wiki/Node.js) to run the demo.

Clone the repo then install it:

```bash
git clone https://github.com/VCityTeam/UD-Demo-vcity-py3dtilers-lyon.git
cd UD-Demo-vcity-py3dtilers-lyon
npm install
npm run build
```

## Usage

Run the demo:

```bash
python3 -m http.server
```

The demo is now hosted on `localhost:8000`.

## Refinement

This demo introduces 2 new buttons allowing to change the way iTowns is processing the 3D Tiles.

### Reverse 3DTiles process

This button reverse the refinement of the tiles.  
By default, the parents tiles are displayed before the children. The children are displayed when we focus on a tile.  
With the reversed processing, the children are displayed before their parents. The parents are displayed when we focus on a tile.  

### Switch position reference

This button change the reference position to refine 3D Tiles. The reference position is either the camera or the mouse position. The tiles will be refined depending on their distance with the reference position.

## Docker

A [Docker](https://www.docker.com/) version of the demo also exists in [this repo](https://github.com/VCityTeam/UD-Demo-vcity-py3dtilers-lyon-docker).
