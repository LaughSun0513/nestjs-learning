### 引入element-plus
```bash
pnpm install element-plus -S
```

#### 按需引入组件
需要引入这两插件
```sh
pnpm install -D 
unplugin-vue-components 
unplugin-auto-import
```

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

### 代理接口
因为服务端接口跨域是localhost:3000,，需要代理proxy，利用vite来代理
因为Nest默认支持RESTFUL的API风格，所以可以在前面加个/api也是能直接访问的
```js
{
    //...
    server: {
        proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        },
        }
    }
}
```
