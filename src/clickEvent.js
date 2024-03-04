export function addClick3DTilesClickEvent(view, widget, event, contextSelection) {
  if (contextSelection.feature) {
    // reset feature userData
    contextSelection.feature.userData.selectedColor = null;
    // reset context selection
    contextSelection.feature = null;
    contextSelection.layer = null;
  }

  // get intersects based on the click event
  const intersects = view.pickObjectsAt(
    event,
    0,
    view.getLayers().filter((el) => el.isC3DTilesLayer)
  );

  if (intersects.length) {
    // get featureClicked
    const featureClicked =
      intersects[0].layer.getC3DTileFeatureFromIntersectsArray(intersects);
    if (featureClicked) {
      // set contextSelection
      contextSelection.feature = featureClicked;
      contextSelection.layer = intersects[0].layer;
    }
  }

  // update widget displayed info
  widget.displayC3DTFeatureInfo(
    contextSelection.feature,
    contextSelection.layer
  );

  view.notifyChange(); // need a redraw of the view
}
