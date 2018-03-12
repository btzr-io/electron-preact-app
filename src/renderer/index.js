import { h, render } from 'preact'

/* Main component */
import Root from '@root/components/root'

/* Main styles */
import styles from '@root/css/index.css'

const container = document.getElementById('app')
render(<Root />, container)
