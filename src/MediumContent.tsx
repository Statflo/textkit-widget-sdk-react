import { WidgetViewSize } from '@statflo/textkit-widget-events';
import React from 'react';

import { useTextKitWidget } from './TextKitWidgetProvider';

export default function MediumContent({
  children,
}: {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}) {
  const { state } = useTextKitWidget();

  if (state.size !== WidgetViewSize.Medium) {
    return null;
  }

  return <>{children}</>;
}
