/**
 * Created by jean.h.ma on 2/22/17.
 */
import {combineReducers} from 'redux';
import toast from './toast.ar'
import loading from './loading.ar'

export default combineReducers({
	toast,
	loading
})