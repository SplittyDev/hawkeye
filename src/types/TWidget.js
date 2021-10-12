// @flow

export type TWidgetAction = {
  icon?: React$ComponentType<*>
}

export type TWidgetActions = {
  [key: string]: TWidgetAction
}

export type TWidgetOptionTypeEnum = 'bool' | 'string'

export type TWidgetOption = {
  name?: string,
  type: TWidgetOptionTypeEnum,
  defaultValue?: any
}

export type TWidgetOptions = {
  [key: string]: TWidgetOption
}

export type TWidgetComponentProps = {
  widgetOptions?: {
    [key: string]: any
  }
}

export type TWidget = {
  id: string,
  instanceId?: string,
  name?: string,
  tags?: string[],
  actions?: TWidgetActions,
  options?: TWidgetOptions,
  component: React$ComponentType<TWidgetComponentProps>
}
