/**
 * Created by jean.h.ma on 24/07/2017.
 */
import {ActionType} from '../types'
import guid from 'guid'
import update from 'immutability-helper'
const SHOW_LOADING = guid.raw();
const HIDE_LOADING = guid.raw();

export function showLoading(): ActionType {
	const result: ActionType = {
		type: SHOW_LOADING
	};
	return result;
}

export function hideLoading(): ActionType {
	const result: ActionType = {
		type: HIDE_LOADING
	}
	return result;
}

const initialState: Object = {
	count: 0
};

export default function (state: Object = initialState, action: ActionType = {}): Object {
	switch (action.type) {
		case SHOW_LOADING:
			return update(state, {
				count: {$set: state.count + 1}
			});
		case HIDE_LOADING:
			return update(state, {
				count: {$set: state.count - 1}
			});
		default:
			return state;
	}
}
