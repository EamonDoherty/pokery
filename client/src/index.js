import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import 'normalize.css'
import styles from './styles/index.js'
import App from './App/index.js'
import registerServiceWorker from './registerServiceWorker'
// import axios from 'axios'

injectGlobal`
  ${styles}
`

ReactDOM.render(<App user={{sessions: ["foo"]}} />, document.getElementById('root'))

if (process.env.ENVOIREMENT === "production") {
  registerServiceWorker();
}
