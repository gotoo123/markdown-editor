import React, { PropsWithChildren } from 'react';
import './index.less';

const FloatBubble = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className={'float-bubble'}>{children}</div>
  )
}

export default FloatBubble;
