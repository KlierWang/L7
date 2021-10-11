import BaseLayer from '../core/BaseLayer';
import EarthAtomSphereModel from './models/atmosphere';
import BaseEarthModel from './models/base';

interface IEarthLayerStyleOptions {
  setEarthTime(time: number): void;
}

export type EarthModelType = 'base' | 'atomSphere';

const EarthModels: { [key in EarthModelType]: any } = {
  base: BaseEarthModel,
  atomSphere: EarthAtomSphereModel,
};

const earthLayerTypes = ['base', 'atomSphere'];

export default class EarthLayer extends BaseLayer<IEarthLayerStyleOptions> {
  public type: string = 'EarthLayer';

  public buildModels() {
    const shape = this.getModelType();
    this.layerModel = new EarthModels[shape](this);
    this.models = this.layerModel.initModels();
  }

  /**
   * 设置当前地球时间
   * @param time
   */
  public setEarthTime(time: number) {
    if (this.layerModel && this.layerModel.setEarthTime) {
      this.layerModel.setEarthTime(time);
    } else {
      console.error('请在 scene loaded 之后执行该方法！');
    }
  }

  protected getModelType(): EarthModelType {
    const shapeAttribute = this.styleAttributeService.getLayerStyleAttribute(
      'shape',
    );
    let shape = (shapeAttribute?.scale?.field || 'base') as string;
    if (earthLayerTypes.indexOf(shape) < 0) {
      shape = 'base';
    }
    return shape as EarthModelType;
  }
}
