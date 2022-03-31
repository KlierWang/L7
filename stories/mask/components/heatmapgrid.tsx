import {
  LineLayer,
  Scene,
  MaskLayer,
  HeatmapLayer,
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
        zoom: 2,
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
                  [125.15625000000001, 8.407168163601076],
                  [116.54296874999999, -21.289374355860424],
                  [156.26953125, -20.632784250388013],
                  [150.29296875, 2.1088986592431382],
                ],
              ],
              [
                [
                  [78.57421875, 46.92025531537451],
                  [51.67968749999999, 37.020098201368114],
                  [87.890625, 28.76765910569123],
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
                  [133.2421875, 44.33956524809713],
                  [123.04687499999999, 31.50362930577303],
                  [154.3359375, 20.632784250388028],
                  [157.32421875, 38.54816542304656],
                ],
              ],
            ],
          },
        },
      ],
    };

    scene.on('loaded', () => {
      const mask1 = new MaskLayer({})
        .source(data)
        .shape('fill')
        .color('red')
        .style({
          opacity: 0.3,
        });
      

      const mask2 = new MaskLayer({})
        .source(data2)
        .shape('fill')
        .color('#ff0')
        .style({
          opacity: 0.3,
        });
      
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv',
      )
        .then((res) => res.text())
        .then((data) => {
          const heatmapLayer = new HeatmapLayer({
            mask: true,
            maskInside: true,
          })
            // const heatmapLayer = new HeatmapLayer({ mask: true, maskInside: false })
            .source(data, {
              parser: {
                type: 'csv',
                x: 'lng',
                y: 'lat',
              },
              transforms: [
                {
                  type: 'grid', // grid
                  size: 20000,
                  field: 'v',
                  method: 'sum',
                },
              ],
            })
            .shape('circle')
            .style({
              coverage: 0.9,
              angle: 0,
            })
            .color(
              'count',
              [
                '#8C1EB2',
                '#8C1EB2',
                '#DA05AA',
                '#F0051A',
                '#FF2A3C',
                '#FF4818',
                '#FF4818',
                '#FF8B18',
                '#F77B00',
                '#ED9909',
                '#ECC357',
                '#EDE59C',
              ].reverse(),
            );
          scene.addLayer(heatmapLayer);
          scene.addLayer(mask1, {
            parent: heatmapLayer, mask: true
          });
          scene.addLayer(mask2, {
            parent: heatmapLayer, mask: true
          });
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
