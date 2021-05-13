import React, { useRef, useEffect, Suspense } from 'react';
import { Meta } from '@storybook/react';

import { createAMapAPIContainer, useAMapAPI, useAMapAPIValue } from 'index';

const AMAP_API_KEY: string = process.env.STORYBOOK_AMAP_API_KEY || '';

export default {
  title: 'Components/Basic/AMapAPIContainer',
  excludeStories: ['AsyncPluginAPIContainer'],
} as Meta;

const SyncPluginAPIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: AMAP_API_KEY,
  plugins: ['ControlBar', 'ToolBar', 'Scale', 'MapType', 'HawkEye'].map(
    (pluginName) => `AMap.${pluginName}`,
  ),
});

export const AsyncPluginAPIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: AMAP_API_KEY,
});

const init = (AMap: any, map: any) => {
  new AMap.ControlBar().addTo(map);
  new AMap.ToolBar({ position: 'LT', offset: [50, 120] }).addTo(map);
  new AMap.Scale().addTo(map);
  new AMap.MapType().addTo(map);
  new AMap.HawkEye().addTo(map);
};

const AsyncPluginContentDrawer = () => {
  const { __AMAP__: AMap }: useAMapAPIValue = useAMapAPI();
  const $container = useRef(null);
  const $map = useRef(null);
  useEffect(() => {
    let clearEffect;
    if (!AMap || !$container.current) {
      return clearEffect;
    }

    const map = new AMap.Map($container.current);
    $map.current = map;

    AMap.plugin(
      ['ControlBar', 'ToolBar', 'Scale', 'MapType', 'HawkEye'].map(
        (pluginName) => `AMap.${pluginName}`,
      ),
      () => init(AMap, map),
    );

    clearEffect = () => {
      map.destroy();
    };

    return clearEffect;
  }, [AMap]);

  return <div ref={$container} style={{ height: 400 }} />;
};

export const AsyncPlugin = () => (
  <Suspense fallback="loading...">
    <AsyncPluginAPIContainer>
      <AsyncPluginContentDrawer />
    </AsyncPluginAPIContainer>
  </Suspense>
);

/**
 * TODO：更好的自动生成 Code
 */
const AsyncPluginCode = `
const SyncPluginAPIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: AMAP_API_KEY,
  plugins: ['ControlBar', 'ToolBar', 'Scale', 'MapType', 'HawkEye'].map(
    (pluginName) => \`AMap.\${pluginName}\`,
  ),
});

${init.toString()}

const AsyncPluginContentDrawer = () => {
  const { __AMAP__: AMap }: useAMapAPIValue = useAMapAPI();
  const $container = useRef(null);
  const $map = useRef(null);
  useEffect(() => {
    let clearEffect;
    if (!AMap || !$container.current) {
      return clearEffect;
    }

    const map = new AMap.Map($container.current);
    $map.current = map;

    AMap.plugin(
      ['ControlBar', 'ToolBar', 'Scale', 'MapType', 'HawkEye'].map(
        (pluginName) => \`AMap.\${pluginName}\`,
      ),
      () => init(AMap, map),
    );

    clearEffect = () => {
      map.destroy();
    };

    return clearEffect;
  }, [AMap]);

  return <div ref={$container} style={{ height: 400 }} />;
};
`;
AsyncPlugin.parameters = {
  docs: {
    source: {
      code: AsyncPluginCode,
    },
  },
};

const SyncPluginContentDrawer = () => {
  const { __AMAP__: AMap }: useAMapAPIValue = useAMapAPI();
  const $container = useRef(null);
  const $map = useRef(null);
  useEffect(() => {
    let clearEffect;
    if (!AMap || !$container.current) {
      return clearEffect;
    }

    const map = new AMap.Map($container.current);
    $map.current = map;

    init(AMap, map);

    clearEffect = () => {
      map.destroy();
    };

    return clearEffect;
  }, [AMap]);
  return <div ref={$container} style={{ height: 400 }} />;
};

export const SyncPlugin = () => (
  <Suspense fallback="loading...">
    <SyncPluginAPIContainer>
      <SyncPluginContentDrawer />
    </SyncPluginAPIContainer>
  </Suspense>
);

const SyncPluginCode = `
const SyncPluginAPIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: AMAP_API_KEY,
  plugins: ['ControlBar', 'ToolBar', 'Scale', 'MapType', 'HawkEye'].map(
    (pluginName) => \`AMap.\${pluginName}\`,
  ),
});

${init.toString()}

const SyncPluginContentDrawer = () => {
  const { __AMAP__: AMap }: useAMapAPIValue = useAMapAPI();
  const $container = useRef(null);
  const $map = useRef(null);
  useEffect(() => {
    let clearEffect;
    if (!AMap || !$container.current) {
      return clearEffect;
    }

    const map = new AMap.Map($container.current);
    $map.current = map;

    init(AMap, map);

    clearEffect = () => {
      map.destroy();
    };

    return clearEffect;
  }, [AMap]);
  return <div ref={$container} style={{ height: 400 }} />;
};

() => (
  <SyncPluginAPIContainer>
    <SyncPluginContentDrawer />
  </SyncPluginAPIContainer>
)
`;
SyncPlugin.parameters = {
  docs: {
    source: {
      code: SyncPluginCode,
    },
  },
};
