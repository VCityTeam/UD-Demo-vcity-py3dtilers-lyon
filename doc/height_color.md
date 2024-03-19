# Height color

In this example, the color of each building is based on its height. The highter is the building, more the color tends to red.

## How to create the tileset

The tileset was created with [Py3DTilers](https://github.com/VCityTeam/py3dtilers), an open source toolkit to create 3D Tiles out of various geometrical formats (OBJ, GeoJSON, IFC or CityGML), using the [GeojsonTiler](https://github.com/VCityTeam/py3dtilers/tree/master/py3dtilers/GeojsonTiler).

Buildings are from open data and can be found online: 'BATI' of [BD TOPO DÉPARTEMENT SHAPEFILE - RHÔNE](https://geoservices.ign.fr/telechargement) of IGN. Data was converted from Shapefile to GeoJSON with [QGIS](https://www.qgis.org/en/site/).

To install and use Py3DTilers, see online documentation: [installation](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#installation-from-sources) & [usage](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#usage).

The command used to created the tileset is:

```bash
geojson-tiler -i <path>/buildings_lyon1.geojson --is_roof --add_color HAUTEUR -o Lyon-1_2021_Height_Color
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2021/Lyon-1_2021_Height_Color)

## About

This work is part of the [TIGA project](https://imu.universite-lyon.fr/tiga/) and was developed by the [Labex IMU](https://imu.universite-lyon.fr/imu-fr/) and the [Liris lab](https://liris.cnrs.fr/).

It uses [UD-Viz](https://github.com/VCityTeam/UD-Viz) and [iTowns](https://github.com/iTowns/itowns) open source libs.
