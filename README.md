# Hawkeye Dashboard
> A React-based Dashboard with configurable widgets.

This is a toy project of mine and might never be finished.

## Default Widgets

- Random Advice
- Inspirational Quotes
- Kanye West Quotes
- Quote of the Day
- IP Address Viewer
- Password Generator

## Extending Hawkeye

- Create a new widget in `src/components/widgets/`
  - You can use the `IpAddressWidget.js` as a starting point
- Export the widget in `src/components/widgets/index.js`
- Add the widget to the `widgets` array in `src/components/WidgetLoader.js`

## Widget Definitions

A widget consists of two main parts: The component and the definition.

While the component is responsible for handling user-interaction and rendering, the widget definition contains metadata such as a unique widget id, display name, tags (categories) and options. The options key is optional and will be used to provide a configuration modal.

Here's an example of a widget definition:
```js
const WidgetDefinition = {
  id: 'hwk_ip_address',
  name: 'IP Address',
  component: IpAddressWidgetStyled,
  tags: ['utilities'],
  options: {
    enableIPv4: {
      name: 'Enable IPv4',
      type: 'bool',
      defaultValue: true
    },
    enableIPv6: {
      name: 'Enable IPv6',
      type: 'bool',
      defaultValue: false
    }
  }
}

export default WidgetDefinition
```

The `name` and `defaultValue` keys are optional. If the `name` is missing, the key of the object will be used instead. If the `defaultValue` is missing, Hawkeye will try to use a sensible default value. Options of type `bool` will default to false.

### Option Types

| Type       | Default Value              |
| ---------- | -------------------------- |
| `bool`     | `false`
