import {
  createWidgetState,
  EventNames,
  Helpers,
  WidgetClient,
  WidgetState,
  WidgetViewSize,
} from '@statflo/textkit-widget-events';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  TextKitContextProps,
  TextKitWidgetProviderProps,
  TextKitWidgetState,
} from './types';

const TextKitWidgetContext = createContext<TextKitContextProps>(null!);

export function useTextKitWidget() {
  return useContext(TextKitWidgetContext);
}

export function TextKitWidgetProvider({
  footer,
  header,
  label,
  children,
  scrollOverride = false,
  render,
}: TextKitWidgetProviderProps) {
  const [client, setClient] = useState<WidgetClient>();
  const [state, setState] = useState<TextKitWidgetState>({
    context: undefined,
    defaultScroll: !scrollOverride,
    isOpen: false,
    isReady: false,
    isShown: false,
    maxHeight: undefined,
    size: WidgetViewSize.Medium,
  });

  // Initialize the widget client
  useEffect(() => {
    if (!state.isReady && window) {
      const id = window.name && window.name.length > 1 ? window.name : 'local';
      const widgetClient = new WidgetClient({
        window,
        id,
        createWidgetState,
      });
      setClient(widgetClient);
    }
  }, [state]);

  // Send the widget ready event and initialize event listeners
  useEffect(() => {
    if (client) {
      client.setState(WidgetState.isReady, true);
      setState((currState) => ({ ...currState, isReady: true }));

      // check if we have initial settings
      if (header) {
        client.setState(WidgetState.header, header);
      }
      if (footer) {
        client.setState(WidgetState.footer, footer);
      }
      if (label) {
        client.setState(WidgetState.label, label);
      }

      // Listen for activeConversation Change
      client.on(EventNames.container.activeConversationChanged, (e) => {
        console.log('activeConversation', e.payload);
        setState((currState) => ({ ...currState, context: e.payload }));
      });

      // Listen for state changes
      client.on(Helpers.ContainerMethods.setState, (e) => {
        const { property, value } = e.payload;
        setState((currState) => ({ ...currState, ...{ [property]: value } }));
      });
    }
  }, [client, header, footer, label]);

  // Widget Context Properties
  const context = useMemo<TextKitContextProps>(
    () => ({
      client,
      state,
      setFooter: (footer) => {
        client?.setState(WidgetState.footer, footer);
        setState((currState) => ({ ...currState, footer }));
      },
      setHeader: (header) => {
        client?.setState(WidgetState.header, header);
        setState((currState) => ({ ...currState, header }));
      },
      setLabel: (label) => {
        client?.setState(WidgetState.label, label);
        setState((currState) => ({ ...currState, label }));
      },
      setOpen: (isOpen) => {
        client?.setState(WidgetState.isOpen, isOpen);
        setState((currState) => ({ ...currState, isOpen }));
      },
      setShown: (isShown) => {
        client?.setState(WidgetState.isShown, isShown);
        setState((currState) => ({ ...currState, isShown }));
      },
      setSize: (size) => {
        client?.setState(WidgetState.size, size);
        setState((currState) => ({ ...currState, size }));
      },
      appendMessage: (val) => {
        client?.post(EventNames.widget.appendTextToMessage, val);
      },
      replaceMessage: (val) => {
        client?.post(EventNames.widget.replaceTextMessage, val);
      },
    }),
    [client, state]
  );

  const renderContent = () => {
    if (render) {
      return render(context);
    }
    if (children) {
      return children;
    }
    return null;
  };

  return (
    <TextKitWidgetContext.Provider value={context}>
      <div
        data-testid="tk-provider-wrapper"
        style={{
          display: 'flex',
          width: '100%',
          minHeight: 'auto',
          height: 'auto',
          maxHeight: state.maxHeight ?? 'none',
          overflowX: 'hidden',
          overflowY: state.defaultScroll
            ? state.maxHeight
              ? 'scroll'
              : 'hidden'
            : 'hidden',
        }}
      >
        {renderContent()}
      </div>
    </TextKitWidgetContext.Provider>
  );
}
