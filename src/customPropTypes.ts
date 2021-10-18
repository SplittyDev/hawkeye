import PropTypes, { InferProps } from 'prop-types'

export type StyledPropsInner = {
  className?: string
}

export type WidgetPropsInner = {
  instance: string,
  widgetOptions: { [key: string]: any }
}

export type WidgetProps<T> = StyledPropsInner & WidgetPropsInner & InferProps<T>
export type GenericProps<T> = StyledPropsInner & InferProps<T>

export const WidgetOptionDefaultValuePropType = PropTypes.oneOf([
  PropTypes.bool,
  PropTypes.string,
])

export const WidgetPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  instanceId: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.elementType.isRequired,
  options: PropTypes.shape({
    type: PropTypes.string.isRequired,
    defaultValue: WidgetOptionDefaultValuePropType,
  }),
  actions: PropTypes.shape({
    icon: PropTypes.elementType
  }),
})

export const DashboardPropType = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.string).isRequired,
})

export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node).isRequired,
  PropTypes.node.isRequired,
])
