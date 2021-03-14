import React, { useState, useCallback, useMemo } from 'react';
import { actions } from '@storybook/addon-actions';

import { createAMapAPIContainer } from '../../AMapAPIContainer';
import { AMapMap } from '../../AMapMap';

import AMapScale from '../index';

const APIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: process.env.STORYBOOK_AMAP_API_KEY as string,
});

export const Async = () => (
  <APIContainer>
    <div style={{ height: 'calc(100vh - 8px * 2)' }}>
      <AMapMap zoom={12}>
        <AMapScale position="LB" />
      </AMapMap>
    </div>
  </APIContainer>
);

const SyncAPIContainer = createAMapAPIContainer({
  version: '2.0',
  apiKey: process.env.STORYBOOK_AMAP_API_KEY as string,
  plugins: ['AMap.Scale'],
});

export const Sync = () => (
  <SyncAPIContainer>
    <div style={{ height: 'calc(100vh - 8px * 2)' }}>
      <AMapMap zoom={12}>
        <AMapScale position="LB" />
      </AMapMap>
    </div>
  </SyncAPIContainer>
);

export const ControlVisible = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const handleSwitchBtnClick = useCallback(() => {
    setVisible((v) => !v);
  }, [setVisible]);

  const eventHandler = useMemo(() => actions('onHide', 'onShow'), []);

  return (
    <SyncAPIContainer>
      <div
        style={{
          height: 'calc(100vh - 8px * 2)',
          display: 'grid',
          gridRowGap: 12,
          gridTemplateRows: 'max-content auto',
        }}
      >
        <div>
          <button type="button" onClick={handleSwitchBtnClick}>
            {visible ? 'hide' : 'show'}
          </button>
        </div>
        <div>
          <AMapMap zoom={12}>
            <AMapScale
              position="LB"
              visible={visible}
              onHide={eventHandler.onHide}
              onShow={eventHandler.onShow}
            />
          </AMapMap>
        </div>
      </div>
    </SyncAPIContainer>
  );
};

export default {
  title: 'AMapScale',
};
