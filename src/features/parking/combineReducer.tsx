import { combineReducers } from 'redux'
import parking from './parkingSlice'
import exit from './exitSlice'

export default combineReducers({
 parking,
 exit
})