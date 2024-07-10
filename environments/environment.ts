/* eslint-disable @typescript-eslint/no-var-requires */

function loadEnvironments() {
  if (process.env.NODE_ENV === 'production') {
    require('custom-env').env('production', 'environments')
  } else {
    require('custom-env').env('development', 'environments')
    require('custom-env').env('development.local', 'environments')
  }
}

export default loadEnvironments
