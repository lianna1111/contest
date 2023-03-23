import { App } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementIcons from '@element-plus/icons-vue'

function autoElementicon(app:App){
    for(const iconName in ElementIcons){
        if(Reflect.has(ElementIcons,iconName)){
            app.component(iconName,(ElementIcons as any)[iconName])
        }
    }
}

export function setupElementplus(app:App){
    app.use(ElementPlus)
    autoElementicon(app)
}