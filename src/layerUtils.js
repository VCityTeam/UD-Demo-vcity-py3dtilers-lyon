import * as itowns from 'itowns';

export function BaseMapLayer(config, extent) {
  return new itowns.ColorLayer(config['layer_name'], {
    updateStrategy: {
      type: itowns.STRATEGY_DICHOTOMY,
      options: {},
    },
    source: new itowns.WMSSource({
      extent: extent,
      name: config['name'],
      url: config['url'],
      version: config['version'],
      crs: extent.crs,
      format: config['format'],
    }),
    transparent: true,
  });
}

export function ElevationLayer(config, extent) {
  return new itowns.ElevationLayer(config['layer_name'], {
    useColorTextureElevation: true,
    colorTextureElevationMinZ: config['colorTextureElevationMinZ'],
    colorTextureElevationMaxZ: config['colorTextureElevationMaxZ'],
    source: new itowns.WMSSource({
      extent: extent,
      url: config['url'],
      name: config['name'],
      crs: extent.crs,
      heightMapWidth: 256,
      format: config['format'],
    }),
  });
}

export function C3DTilesLayer(config, view) {
  return new itowns.C3DTilesLayer(
    config['id'],
    {
      name: config['id'],
      source: new itowns.C3DTilesSource({
        url: config['url'],
      }),
    },
    view
  );
}
