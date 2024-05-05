import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './Redux/store.js'
import { Provider } from 'react-redux'

import "flowbite/dist/flowbite.css"
import "flowbite/dist/flowbite.js"
import "@yaireo/tagify/dist/tagify.css"
import "daisyui/dist/full.css"


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
