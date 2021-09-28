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
  - You can use the `DummyWidget.js` as a starting point
- Export the widget as part of `ModuleList` in `src/components/widgets/index.js`
- Export the widget itself in `src/components/widgets/index.js`
  - This step will be removed in the future.
- Add the widget to the `widgets` array in `src/components/WidgetLoader.js`
  - This step will be removed in the future.

## Widget Definitions

A widget consists of two main parts: The component and the definition.

While the component is responsible for handling user-interaction and rendering, the widget definition contains metadata such as a unique widget id, display name, tags (categories) and options. The options key is optional and will be used to provide a configuration modal.

Here's an example of a widget definition:
```js
const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw, // from react-icons
    }
  },
  options: {
    isEnabled: {
      name: 'Enabled?',
      type: 'bool',
      defaultValue: true
    },
  },
  component: WidgetStyled,
}

export default WidgetDefinition
```

## Widget Options
> Options are used to pass dynamic configuration to the widget.

### Option Keys

| Key            | Type (JS)                  | Required |
| -------------- | -------------------------- | -------- |
| `name`         | `string`                   | `no`     |
| `type`         | `string`                   | `yes`    |
| `defaultValue` | `any`                      | `no`     |

### Option Types

| Type       | Default Value              |
| ---------- | -------------------------- |
| `bool`     | `false`

## Widget Actions
> Actions are used to provide buttons in the widget header.

1. You can provide actions in the `action` key of your widget definition
2. The `useWidgetAction` hook can then be used to react to the action being fired

### Example

```js
const WIDGET_ID = 'my_widget'
const ACTION_REFRESH = 'refresh'

const Widget = () => {
  useWidgetAction(WIDGET_ID, ACTION_REFRESH, () => {
    // Do something on refresh
  })

  return (
    <div>Hello world</div>
  )
}

const WidgetDefinition = {
  id: WIDGET_ID,
  tags: [],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw, // from react-icons
    }
  },
  component: Widget,
}

export default WidgetDefinition
```
