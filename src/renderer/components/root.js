import { h } from 'preact'
import { Provider } from 'preact-redux'
import PropTypes from 'prop-types'

import routes from '@root/routes'
import store from '@root/store'

import App from '@root/components/app'
import Router from '@root/components/router'

const Root = () => (
  <Provider store={store}>
    <App>
      <Router routes={routes} />
    </App>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  page: PropTypes.func,
}

export default Root
