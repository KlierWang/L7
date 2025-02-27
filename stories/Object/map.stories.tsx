import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Water from './components/water';
import Ocean from './components/ocean';
import Taifong from './components/taifeng'
import Radar from './components/radar';
import CanvasDemo from './components/canvas';
import Plane from './components/plane';
import PlaneTerrain from './components/planeTerrain';
import Cursor from './components/cursor';

storiesOf('Object', module)
        .add('water', () => <Water />)
        .add('Ocean', () => <Ocean />)
        .add('Taifong', () => <Taifong />)
        .add('Radar', () => <Radar/>)
        .add('CanvasDemo', () => <CanvasDemo/>)
        .add('Plane', () => <Plane/>)
        .add('PlaneTerrain', () => <PlaneTerrain/>)
        .add('Cursor', () => <Cursor/>)