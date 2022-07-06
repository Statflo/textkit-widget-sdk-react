import { WidgetClient, WidgetViewSize } from '@statflo/textkit-widget-events';

export type TextKitWidgetProviderProps = {
  footer?: string;
  header?: string;
  label?: string;
  scrollOverride?: boolean;
  children?: React.ReactNode;
  render?: (textkit: TextKitContextProps) => React.ReactNode;
};

export type TextKitWidgetState = {
  context: any;
  defaultScroll: boolean;
  isOpen: boolean;
  isReady: boolean;
  isShown: boolean;
  maxHeight?: number;
  size: WidgetViewSize;
};

export type TextKitContextProps = {
  client?: WidgetClient;
  state: TextKitWidgetState;
  setFooter: (val: string) => void;
  setHeader: (val: string) => void;
  setLabel: (val: string) => void;
  setSize: (size: WidgetViewSize) => void;
  setOpen: (ToF: boolean) => void;
  setShown?: (ToF: boolean) => void;
  appendMessage: (val: string) => void;
  replaceMessage: (val: string) => void;
};
