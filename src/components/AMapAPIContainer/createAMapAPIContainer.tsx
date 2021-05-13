import React, { lazy } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

import AMapAPIContext from './AMapAPIContext';

const DEFAULT_AMAP_VERSION = '2.0';

export interface createAMapAPIContainerOptions {
  apiKey: string; // 首次调用load必须填写key
  version: string; // JSAPI 版本号
  plugins?: Array<string>; // 同步加载的插件列表
}

export interface AMapAPIHocProps {
  children: React.ReactNode;
}

export const createAMapAPIContainer = (options: createAMapAPIContainerOptions) => {
  const { apiKey, version = DEFAULT_AMAP_VERSION, plugins = [] } = options;
  const loadAMapAPI = () => AMapLoader.load({
    key: apiKey,
    version,
    plugins,
  });

  return lazy(async () => {
    const AMap = await loadAMapAPI();
    const AMapAPIContainer = ({ children }: AMapAPIHocProps) => (
      <AMapAPIContext.Provider value={{ __AMAP__: AMap }}>{children}</AMapAPIContext.Provider>
    );
    return {
      default: AMapAPIContainer,
    };
  });
};

export default createAMapAPIContainer;
