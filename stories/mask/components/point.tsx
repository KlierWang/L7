import {
  LineLayer,
  Scene,
  MaskLayer,
  PolygonLayer,
  PointLayer,
} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import * as React from 'react';

export default class MaskPoints extends React.Component {
  // @ts-ignore
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      stencil: true,
      map: new GaodeMap({
        center: [120.165, 30.26],
        pitch: 0,
        zoom: 15,
        style: 'dark',
      }),
    });
    this.scene = scene;
    scene.addImage(
      '00',
      'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
    );
    const data = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [120.160, 30.259660295442085],
                  [120.160, 30.25313608393673],
                  [120.17, 30.253729211980726],
                  [120.17, 30.258474107402265],
                ],
              ],
            ],
          },
        },
      ],
    };

    const data2 = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [120.17, 30.258474107402265],
                  [120.17, 30.254174055663515],
                  [120.175, 30.254915457324778],
                  [120.175, 30.258474107402265],
                ],
              ],
            ],
          },
        },
      ],
    };

    scene.on('loaded', () => {
      const mask1 = new MaskLayer({zIndex: 0})
        .source(data)
        .shape('fill')
        .color('red')
        .style({
          opacity: 0.3,
        });
     

      const mask2 = new MaskLayer({zIndex: 2})
        .source(data2)
        .shape('fill')
        .color('#ff0')
        .style({
          opacity: 0.3,
        });
       

      // let points = new PointLayer({ zIndex: 2, mask: true, maskInside: false }) // maskInside: true
      let points = new PointLayer({ zIndex: 1, mask: true, maskInside: true })
        .source(
          [
            {
              name: 'n5',
              lng: 120.170,
              lat: 30.255,
            },
          ],
          {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
          },
        )
        .shape('simple')
        .size(30)
        .style({
          opacity: 0.6,
        })
        .active(true)

      let point2 = new PointLayer({ zIndex: 3, mask: true, maskInside: true })
        .source(
          [
            {
              name: 'n4',
              lng: 120.170,
              lat: 30.2565,
            },
          ],
          {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
          },
        )
        .shape('simple')
        .size(30)
        .color('#0f0')
        .active(true)

      scene.addLayer(points);
      scene.addLayer(point2);

      scene.addLayer(mask1, {
        parent: points,
        mask: true
      });
      scene.addLayer(mask2, {
        parent: point2,
        mask: true
      });

    });
  }

  public render() {
    return (
      <>
        <div
          id="map"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </>
    );
  }
}
