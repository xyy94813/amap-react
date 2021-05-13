import React, { Suspense } from 'react';
import { Meta, Story } from '@storybook/react';

import { AMapMap, MapProps } from 'index';

import { AsyncPluginAPIContainer as APIContainer } from '../../AMapAPIContainer/stories/createAMapAPIContainer.stories';

AMapMap.displayName = 'AMapMap';

const withAPIContainer = (renderStory: Story, context: any) => (
  <Suspense fallback="loading...">
    <APIContainer>
      <div style={{ height: '400px' }}>{renderStory({}, context)}</div>
    </APIContainer>
  </Suspense>
);

export default {
  title: 'Components/Basic/AMapMap',
  component: AMapMap,
  decorators: [withAPIContainer],
  args: {
    center: undefined,
    cityName: undefined,
    zoom: undefined,
  },
  argTypes: {
    center: {
      description: '中心经纬度',
      table: {
        type: { summary: 'array' },
      },
      control: 'array',
    },
    cityName: {
      description:
        '行政区名称支持中国、省、市、区/县名称，如遇重名的情况，会按城市编码表顺序返回第一个。',
      control: 'text',
    },
    zoom: {
      description:
        '地图显示的缩放级别，可以设置为浮点数；若 center 与level 未赋值，地图初始化默认显示用户所在城市范围。',
      control: {
        type: 'number',
        min: 2,
        max: 20,
        step: 1,
      },
    },
  },
  excludeStories: ['withAMapContainer'],
} as Meta;

const Template: Story<MapProps> = (args) => <AMapMap {...args} />;

export const SetCenter = Template.bind({});
SetCenter.args = {
  center: [114.021769, 22.530421],
};

export const SetCityName = Template.bind({});
SetCityName.args = {
  cityName: '深圳',
};

export const SetZoom = Template.bind({});
SetZoom.args = {
  zoom: 12,
};

export const withAMapContainer = (renderStory: Story, context: any) => (
  <Suspense fallback="loading...">
    <APIContainer>
      <div style={{ height: '400px' }}>
        <AMapMap>{renderStory({}, context)}</AMapMap>
      </div>
    </APIContainer>
  </Suspense>
);
