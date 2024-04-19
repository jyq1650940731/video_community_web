//让ts认识各种文件
/// <reference types="vite/client" />
declare module '*vue' {
    import { ComponentOptions } from "vue";
    const ComponentOptions: ComponentOptions
    export default ComponentOptions
}
declare module "@vue/tsconfig/tsconfig.dom.json";