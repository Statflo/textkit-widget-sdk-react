![TextKit by Statflo](./assets/textkit-logo.svg)

# TextKit Widget React SDK

## Installation

```node
yarn add @statflo/textkit-widget-sdk-react
```

## TextKit Provider

Begin by importing the provider into your `App.tsx` file

```javascript
import { TextKitWidgetProvider } from "@statflo/textkit-widget-sdk-react";
import Widget from "./Widget";

export default function App() {
  return (
    <TextKitWidgetProvider header="My header" footer="My footer">
      <Widget />
    </TextKitWidgetProvider>
  )
}
```

**Available properties**

| Property | Type | Default | Description |
|--|--|--|--|
| header | `string` | `undefined` | Initial header value. Recommended for Standard Widgets. |
| footer | `string` | `undefined` | Initial footer value. Recommended for Standard Widgets. |
| label | `string` | `undefined` | Required for Action widgets that use the Conversation Scope. |
| scrollOverride | `boolean` | `false` | Override the default scroll implmentation so you can create and manage your own. |

## TextKit hook

The following hook will give you access to the current widget state along with helpers for performing various functions. When importing this **hook** ensure it's within a child component of the above Provider.

```javascript
import { useTextKitWidget } from "@statflo/textkit-widget-sdk-react";

export default function Widget() {
  const { state, setHeader, setFooter } = useTextKitWidget();

  const handleUpdateHeader = () => {
    setHeader("My new header");
  };

  const handleUpdateFooter = () => {
    setFooter("My new footer");
  };

  return (
    <div>
      <p>My Widget Content</p>
      <button onClick={handleUpdateHeader}>Update Header</button>
      <button onClick={handleUpdateFooter}>Update Footer</button>
    </div>
  );
}
```

### Available Properties/Methods

| Property | Type | Property | Description |
|--|--|--|--|
| state | `object` | | Current widget state please review below for all the available properties. |
| setFooter | `function` | `string` | Update the widget footer. Used for Standard Widgets. |
| setHeader | `function` | `string` | Update the widget header. Used for Standard Widgets. |
| setLabel | `function` | `string` | Update the widget label. Used for Action Widgets using the Conversation Scope.|
| setOpen | `function` | `boolean` | Open or close the widget. |
| setSize | `function` | `WidgetViewSize` | Change the size of the widget. Used for Standard Widgets. Must be an instance of WidgetViewSize which can be imported. See below. |
| appendMessage | `function` | `string` | The text/string you want to append to the message input. Used for Sendable Widets. |
| replaceMessage | `function` | `string` | The text/string you want to replace to the message input with. Used for Sendable Widets. |
| client | `widgetClient` | | Access to the underlying widget class for low level implementations. Read the [Widget SDK Readme](https://github.com/statflo/widget-sdk#readme) for more details. |

### State Properties

When importing `state` from `useTextKitWidget()` these are the available properties.

| Property | Type | Description |
|--|--|--|
| context | `object` | Will return the current conversation context. |
| defaultScroll | `boolean` | Whether you are using the default scrolling functionality or not. Default scrolling will be based on the length of the body and the state of the widget. |
| isOpen | `boolean` | Whether the widget is opened or not. Used in Standard widgets. |
| isReady | `boolean` | The state of the widget. This will be `true` when TextKit is aware the widget has been registered. |
| isShown | `boolean` | Whether the widget is shown or not. Used in Sendables and Action widgets. |
| maxHeight | `number` | Will return the available maximum height based on the resolution. Great for when creating your own scrolling capabilities. |
| size | `WidgetViewSize` | Will contain one of the enum values from WidgetViewSize. This is for Standard Widgets only. |

### Widget View Size

```javascript
import { WidgetViewSize } from "@statflo/textkit-widget-sdk-react";

/**
 * Example function
 * 
 * Available enums
 * 
 * WidgetViewSize.Small
 * WidgetViewSize.Medium
 * WidgetViewSize.Large
 */
setSize(WidgetViewSize.Medium);
```

## Medium & Large Content Wrappers

These helper components listen for the `size` state changes and will display the correct content based on the current state value.

**Example**

```javascript
import { MediumContent, LargeContent } from "@statflo/textkit-widget-sdk-react";

export default function Widget() {
  return (
    <div>
      <MediumContent>
        This content will be visible when Standard widgets are in their default view state. WidgetViewState.Medium.
      </MediumContent>
      <LargeContent>
        This content will be visible when Standard widgets are in their default view state. WidgetViewState.Large.
      </LargeContent>
    </div>
  )
}
```
