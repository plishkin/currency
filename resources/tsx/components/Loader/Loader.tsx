import React, { useState } from 'react';
import './Loader.scss';

interface LoaderProps {
  height?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = (props: LoaderProps) => {
  return (
    <div className="loader-cont" style={{ height: props.height }}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
