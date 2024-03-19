# Py3DTilers tilesets demo

This demo illustrate [3D Tiles](https://github.com/CesiumGS/3d-tiles) tilesets created with [Py3DTilers](https://github.com/VCityTeam/py3dtilers). The demo is based on [UD-Viz](https://github.com/VCityTeam/UD-Viz) which is using [iTowns](https://github.com/iTowns/itowns/tree/master/src) to visualize 3D models.

This work is part of the [TIGA project](https://imu.universite-lyon.fr/tiga/) and was developed by the [Labex IMU](https://imu.universite-lyon.fr/imu-fr/) and the [Liris lab](https://liris.cnrs.fr/).

_Note: the code in [3dtilesProcessing.js](src/3dtilesProcessing.js) is widely inspired by the [iTowns's 3D Tiles processing](https://github.com/iTowns/itowns/blob/7a9457075067afa1a7aa2dc3cb72999033105ff6/src/Process/3dTilesProcessing.js)._

**See [online demo](https://projet.liris.cnrs.fr/vcity/permalink/demo-py3dtilers.html).**

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

## About examples

Explore different examples illustrating Py3DTilers' features and possible interactions with 3D Tiles:

- [Color by CityGML class](./doc/citygml_colors.md): Surfaces (walls, roofs and floors) are colored depending on their CityGML class.
- [Color by height](./doc/height_color.md): The highter is the building, more the color tends to red.
- [Textured buildings](./doc/textured.md): Buildings are textured and textures different levels of detail.
- [Lyon](./doc/all_lyon.md): Lyon city where all layers (buildings, relief, water, roads and bridges) are 3D Tiles.
- [Lyon, with LoD](./doc/all_lyon_lods.md): Lyon city where buildings have different levels of detail.
- [Department-wide](./doc/wide.md): Rhône department with 800k+ buildings.

## Docker

A [Docker](https://www.docker.com/) version of the demo also exists in [this repo](https://github.com/VCityTeam/UD-Demo-vcity-py3dtilers-lyon-docker).
