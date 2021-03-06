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
- Simple Crypto Price

## Extending Hawkeye

- Create a new widget in `src/components/widgets/`
  - You can use the `DummyWidget.js` as a starting point
- Export the widget as part of `ModuleList` in `src/components/widgets/index.js`

## Widget Definitions

A widget consists of two main parts: The component and the definition.

While the component is responsible for handling user-interaction and rendering, the widget definition contains metadata such as a unique widget id, display name, tags (categories) and options. The options key is optional and will be used to provide a configuration modal.

Here's an example of a widget definition:
```js
const WidgetDefinition = {
  id: 'some_unique_widget_id',
  name: 'Widget Display Name',
  tags: ['some', 'keywords'],
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
| `bool`     | `false`                    |
| `string`   | `''`                       |

## Widget Actions
> Actions are used to provide buttons in the widget header.

1. You can provide actions in the `action` key of your widget definition
2. The `useWidgetAction` hook can then be used to react to the action being fired

### Example

```js
const ACTION_REFRESH = 'refresh'

const Widget = ({ instance }) => {
  useWidgetAction(instance, ACTION_REFRESH, () => {
    // Do something on refresh
  })

  return (
    <div>Hello world</div>
  )
}

const WidgetDefinition = {
  id: 'my_widget',
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

## Widget Skeleton Loader
> Widgets can use a loading animation while fetching data.

```js
const Widget = ({ instance }) => {
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    setIsLoading(true)
    // Do something expensive
    setIsLoading(false)
  }, [])

  return (
    <div>Hello world</div>
  )
}
```
