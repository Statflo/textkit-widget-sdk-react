import * as SDK from '@statflo/textkit-widget-events';

import * as Package from '../src';
import LargeContent from '../src/LargeContent';
import MediumContent from '../src/MediumContent';
import {
  TextKitWidgetProvider,
  useTextKitWidget,
} from '../src/TextKitWidgetProvider';

describe('package exports', () => {
  it('should export the correct items', () => {
    expect(Package.Helpers).toEqual(SDK.Helpers);
    expect(Package.WidgetViewSize).toEqual(SDK.WidgetViewSize);
    expect(Package.LargeContent).toEqual(LargeContent);
    expect(Package.MediumContent).toEqual(MediumContent);
    expect(Package.TextKitWidgetProvider).toEqual(TextKitWidgetProvider);
    expect(Package.useTextKitWidget).toEqual(useTextKitWidget);
  });
});
