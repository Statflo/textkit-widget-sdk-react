import { WidgetViewSize } from '@statflo/textkit-widget-events';
import React from 'react';

import { useTextKitWidget } from './TextKitWidgetProvider';

export default function LargeContent({
  children,
}: {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}) {
  const { state } = useTextKitWidget();

  if (state.size !== WidgetViewSize.Large) {
    return null;
  }

  return <>{children}</>;
}
