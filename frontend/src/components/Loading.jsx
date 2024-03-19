// src/components/Loading.js
import React from 'react';
import { Spinner } from '@fluentui/react';

const Loading = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner label="Loading..." ariaLive="assertive" labelPosition="right" />
  </div>
);

export default Loading;
