import React from "react";
import { render, cleanup } from "@testing-library/react";
import LeafletMap from '../../components/LeafletMap';

const MockChildComponent = () => {
  return (<div data-testid='mock-child'>mockChild</div>)
}

const createMapMock = jest.fn(() => true);

jest.mock('leaflet', () => ({
  ...jest.requireActual('leaflet'),
  map: (id, options) => createMapMock(id, options)
}));

describe('LeafletMap', () => {
  afterAll(cleanup);

  describe('when passed no props or children', () => {
    it('renders a leaflet map div', () => {
      const { getByTestId } = render(<LeafletMap />);

      const leafletMapContainer = getByTestId('leaflet-map-container');
      expect(leafletMapContainer).not.toBeUndefined();
      
      expect(createMapMock).toHaveBeenCalledWith('map', {
        'center': {'lat': 0, 'lng': 0},
        'zoom': 15
      });
    });
  });

  describe('when passed all props and children', () => {
    it('renders a leaflet map div and children', () => {
      const { getByTestId } = render(
            <LeafletMap
              center={{lat: 12, long: 12}}
              zoom={12}
              testid='mock-test-id'
            >
              <MockChildComponent />
            </LeafletMap>
      );

      const leafletMapContainer = getByTestId('mock-test-id');
      expect(leafletMapContainer).not.toBeUndefined();

      expect(createMapMock).toHaveBeenCalledWith('map', {
        'center': {'lat': 12, 'lng': 12},
        'zoom': 12
      });

      const mockChildComponent = getByTestId('mock-child');
      expect(mockChildComponent).not.toBeUndefined();
    });
  });
});
