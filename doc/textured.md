# Textured

In this example, the 3D Tiles models are textured. Textures have different levels of detail. A higher/lower level of detail is displayed based on the camera zoom.

## How to create the tileset

The tileset was created with [Py3DTilers](https://github.com/VCityTeam/py3dtilers), an open source toolkit to create 3D Tiles out of various geometrical formats (OBJ, GeoJSON, IFC or CityGML), using the [CityTiler](https://github.com/VCityTeam/py3dtilers/tree/master/py3dtilers/CityTiler).

CityGML models are from open data and can be found online: [Lyon 1 CityGML (year 2018)](https://data.grandlyon.com/jeux-de-donnees/maquettes-3d-texturees-2018-communes-metropole-lyon/donnees) of Data Grand Lyon.

To install and use Py3DTilers, see online documentation: [installation](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#installation-from-sources) & [usage](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#usage).

The command used to created the tileset is:

```bash
citygml-tiler -i py3dtilers/CityTiler/CityTilerDBConfig.yml --type building --with_texture --with_texture --texture_lods 5 --kd_tree_max 25 -o Lyon-1_2018_Textured
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon-1_2018_Textured)

## About

This work is part of the [TIGA project](https://imu.universite-lyon.fr/tiga/) and was developed by the [Labex IMU](https://imu.universite-lyon.fr/imu-fr/) and the [Liris lab](https://liris.cnrs.fr/).

It uses [UD-Viz](https://github.com/VCityTeam/UD-Viz) and [iTowns](https://github.com/iTowns/itowns) open source libs.
