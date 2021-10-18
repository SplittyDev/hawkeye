import { has, cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { TWidget } from '../types'

class WidgetHelper {
  static patchWidgetInstanceId(widget: TWidget): TWidget {
    const clonedWidget = cloneDeep(widget)
    if (!has(clonedWidget, 'instanceId')) {
      clonedWidget.instanceId = uuidv4()
    }
    return clonedWidget
  }
}

export default WidgetHelper
