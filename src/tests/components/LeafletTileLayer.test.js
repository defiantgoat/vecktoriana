import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Map } from 'leaflet';
import LeafletMapContext from '../../components/LeafletMapContext';
import LeafletTileLayer from '../../components/LeafletTileLayer';

let mockMap = null;

beforeAll(() => {
  render(<div id='map' />);
  mockMap = new Map('map');
})

afterAll(cleanup);

describe('LeafletTileLayer', () => {

  describe('when passed required props', () => {
    it('renders a leaflet TileLayer', () => {
      render(
        <LeafletMapContext.Provider value={mockMap}>
          <LeafletTileLayer layerId='mock-layer-id' tileUrl='http://mock-url/{z}/{x}/{y}.png' />
        </LeafletMapContext.Provider>
      );

      let thisLayer = null;

      mockMap.eachLayer((layer)=> {
        thisLayer = layer;
        expect(layer.options.id).toEqual('mock-layer-id');
        expect(layer.options.zIndex).toEqual(0);
        expect(layer.getAttribution()).toEqual('');
        expect(layer.getTileUrl({x:0, y:0})).toMatch(/^http:\/\/mock-url/);
      });

      mockMap.removeLayer(thisLayer);
    });
  });

  describe('when passed all props', () => {
    it('renders a leaflet TileLayer with all props', () => {
      render(
        <LeafletMapContext.Provider value={mockMap}>
          <LeafletTileLayer
            layerId='mock-layer-id'
            tileUrl='http://mock-url/{z}/{x}/{y}.png'
            attribution='mock-attribution'
            zIndex={2}
          />
        </LeafletMapContext.Provider>
      );

      let thisLayer = null;

      mockMap.eachLayer((layer)=> {
        thisLayer = layer;
        expect(layer.options.id).toEqual('mock-layer-id');
        expect(layer.options.zIndex).toEqual(2);
        expect(layer.getAttribution()).toEqual('mock-attribution');
        expect(layer.getTileUrl({x:0, y:0})).toMatch(/^http:\/\/mock-url/);
      });

      mockMap.removeLayer(thisLayer);
    });
  });

  describe('Where LeafletTileLayer is mounted and unmounted', () => {
    afterAll(() => jest.clearAllMocks());

    it('Map methods are called to add and remove layer', () => {
      const addLayerMock = Map.prototype.addLayer = jest.fn();
      const removeLayerMock = Map.prototype.removeLayer = jest.fn();

      const {unmount} = render(
        <LeafletMapContext.Provider value={mockMap}>
          <LeafletTileLayer
            layerId='mock-layer-id'
            tileUrl='http://mock-url/{z}/{x}/{y}.png'
            attribution='mock-attribution'
            zIndex={2}
          />
        </LeafletMapContext.Provider>
      );

      expect(addLayerMock).toHaveBeenCalled();

      unmount();

      expect(removeLayerMock).toHaveBeenCalled();
    });
  });

  describe('When no map context is passed', () => {
    afterAll(() => jest.clearAllMocks());

    it('The layer is not created or removed', () => {
      const addLayerMock = Map.prototype.addLayer = jest.fn();
      const removeLayerMock = Map.prototype.removeLayer = jest.fn();

      const {unmount} = render(
        <LeafletMapContext.Provider value={null}>
          <LeafletTileLayer
            layerId='mock-layer-id'
            tileUrl='http://mock-url/{z}/{x}/{y}.png'
            attribution='mock-attribution'
            zIndex={2}
          />
        </LeafletMapContext.Provider>
      );

      expect(addLayerMock).not.toHaveBeenCalled();

      unmount();

      expect(removeLayerMock).not.toHaveBeenCalled();
    });
  });

});
