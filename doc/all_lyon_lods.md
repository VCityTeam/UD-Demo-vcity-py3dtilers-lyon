# All Lyon LODs

In this example, all models (buildings, rivers, roads, bridges and terrain) are 3D Tiles models. Buildings have different LoD (Levels of detail): one is LoD1 (simplification of models) and the other is LoA (Level of Abstraction) where different buildings are abstracted by one geometry.

The example introduces 2 new buttons (described below) allowing to change the way iTowns is processing the 3D Tiles.

## Reverse 3DTiles process

This button reverse the refinement of the tiles.  
By default, the parents tiles are displayed before the children. The children are displayed when we focus on a tile.  
With the reversed processing, the children are displayed before their parents. The parents are displayed when we focus on a tile.  

## Switch position reference

This button change the reference position to refine 3D Tiles. The reference position is either:

- the camera position: tiles refinement depends on the camera zoom.
- the mouse position: tiles are refined when they are close to the mouse.

## How to create those tilesets

All tilesets were created with [Py3DTilers](https://github.com/VCityTeam/py3dtilers), an open source toolkit to create 3D Tiles out of various geometrical formats (OBJ, GeoJSON, IFC or CityGML), using the [CityTiler](https://github.com/VCityTeam/py3dtilers/tree/master/py3dtilers/CityTiler) and the [GeojsonTiler](https://github.com/VCityTeam/py3dtilers/tree/master/py3dtilers/GeojsonTiler).

Buildings, bridges and terrain are CityGML models from open data and can be found online: [Lyon 1 to Lyon 9 CityGML (year 2018)](https://data.grandlyon.com/jeux-de-donnees/maquettes-3d-texturees-2018-communes-metropole-lyon/donnees) of Data Grand Lyon.

Roads and rivers are from open data and can be found online: 'TRONCON_DE_ROUTE' and 'SURFACE_HYDROGRAPHIQUE' of [BD TOPO DÉPARTEMENT SHAPEFILE - RHÔNE](https://geoservices.ign.fr/telechargement) of IGN. Data was converted from Shapefile to GeoJSON with [QGIS](https://www.qgis.org/en/site/).

The polygons used to create the LoA of buildings were computed with QGIS using the 'Vector geometry/Polygonize' operation on the roads data described above. The file containing those polygons is available [online](https://github.com/VCityTeam/UD-Sample-data/blob/master/GeoJSON/polygons_loa_lyon.geojson).

To install and use Py3DTilers, see online documentation: [installation](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#installation-from-sources) & [usage](https://github.com/VCityTeam/py3dtilers?tab=readme-ov-file#usage).

Commands used to created tilesets are:

### Buildings

```bash
citygml-tiler -i py3dtilers/CityTiler/CityTilerDBConfig.yml --type building --loa <path>/polygons_loa_lyon.geojson --lod1 -o Lyon_2018_LOD_Buildings_TileSet
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon_2018_LOD_Buildings_TileSet)

### Bridges

```bash
citygml-tiler -i py3dtilers/CityTiler/CityTilerDBConfig.yml --type bridge -o Lyon_2018_Bridges_TileSet
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon_2018_Bridges_TileSet)

### Terrain

```bash
citygml-tiler -i py3dtilers/CityTiler/CityTilerDBConfig.yml --type relief --kd_tree_max 1 -o Lyon_2018_Relief_TileSet
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon_2018_Relief_TileSet)

### Roads

```bash
geojson-tiler -i <path>/roads_rhone.geojson --height 0.5 --width LARGEUR -o Lyon_2018_Roads_TileSet
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon_2018_Roads_TileSet)

### Rivers

```bash
geojson-tiler -i <path>/water_rhone.geojson -o Lyon_2018_Water_TileSet
```

The tileset is available online [here](https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2018/Lyon_2018_Water_TileSet)

## About

This work is part of the [TIGA project](https://imu.universite-lyon.fr/tiga/) and was developed by the [Labex IMU](https://imu.universite-lyon.fr/imu-fr/) and the [Liris lab](https://liris.cnrs.fr/).

It uses [UD-Viz](https://github.com/VCityTeam/UD-Viz) and [iTowns](https://github.com/iTowns/itowns) open source libs.
