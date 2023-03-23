import { App } from "vue";
import { setupEcharts } from "./echarts";
import { setupElementplus } from "./element-plus";
import { setupFontawesome } from "./font-awesome";
import { setupTailwindcss } from "./tailwindcss";


function autoComponent(app: App) {
    const components = import.meta.globEager('../components/**/*.vue')
    Object.keys(components).forEach(key => {
        const name = key.split('/').pop()?.split('.').shift() as string
        app.component(name, components[key].default)
    })
}

export function setupPlugin(app: App) {
    setupFontawesome()
    setupTailwindcss()
    setupElementplus(app)
    setupEcharts()
    autoComponent(app)
}