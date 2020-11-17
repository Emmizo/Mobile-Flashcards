import log from './logger'
import thunking from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
    thunking,
    log
)