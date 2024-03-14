# Wide

This example illustrates the ability to create and display massive tilesets.

## How to create the tileset

The tileset was created with [Py3DTilers](https://github.com/VCityTeam/py3dtilers), an open source toolkit to create 3D Tiles out of various geometrical formats (OBJ, GeoJSON, IFC or CityGML), using the [GeojsonTiler](https://github.com/VCityTeam/py3dtilers/tree/master/py3dtilers/GeojsonTiler).

CityGML models are from open data and can be found online: [Bati of BD TOPO DÉPARTEMENT SHAPEFILE - RHÔNE](https://geoservices.ign.fr/telechargement) of IGN.

To install and use Py3DTilers, see online documentation: [installation](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#installation-from-sources) & [usage](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#usage).

The command used to created the tileset is:

```bash
geojson-tiler -i <path>/buildings_rhone_3946.geojson --z 0 --kd_tree_max 10000 -o Rhone_2021_BDTOPO
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2021/Rhone_2021_BDTOPO)
