# Preview
![img](https://github.com/devmemory/react_code_editor/assets/71013471/36a5511c-587a-4e6a-92e4-5f637bdb185e)

## React code editor
1. This is made with @babel/standalone, Prism.js
2. One is using iframe and other is using render from createRoot

### development environment
1. View library : React
2. Languages : Typescript, HTML, CSS
3. Bundler : Vite
4. State management : basic hooks

## folder structure
### src
- index.tsx : entry point
- index.css : css reset

#### components
- Code : textarea component with style(prism)
- Console : when you call console.log(), this will be displayed here

#### data
- testString : react test string code

#### hooks
- useCodeArea : textarea, prism settings and keyboard, scroll event
- useEditor : iframe version logic
- useTest : react component version logic

#### routes
- editor(/editor) : iframe version view
- test(/test) : component version view
- main(/) : select view between them

#### utils
- routeUtil : react-router-dom util
