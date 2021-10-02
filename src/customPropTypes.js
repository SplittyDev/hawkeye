import PropTypes from 'prop-types'

export const StyledPropTypes = propTypes => ({ className: PropTypes.string.isRequired, ...propTypes })

export const WidgetOptionDefaultValuePropType = PropTypes.oneOf([
  PropTypes.bool,
  PropTypes.string,
])

export const WidgetPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
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
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])
