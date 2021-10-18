import { Theme } from "theme";

export type WidgetProps = {
    className: string,
    instance: string,
    widgetOptions: { [key: string]: any },
    theme: Theme
}
