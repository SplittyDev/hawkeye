import { ComponentType } from 'react'

export type TWidgetAction = {
  icon?: ComponentType
}

export type TWidgetActions = {
  [key: string]: TWidgetAction
}

export type TWidgetOptionTypeEnum = 'bool' | 'string'
export type TWidgetOptionDefaultValue = boolean | string

export type TWidgetOption = {
  name?: string,
  type: TWidgetOptionTypeEnum,
  defaultValue?: TWidgetOptionDefaultValue
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
  component: ComponentType<TWidgetComponentProps>
}

export type WidgetSettingsState = {
  [key: string]: {
    [key: string]: TWidgetOptionDefaultValue
  }
}
