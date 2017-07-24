/**
 * Created by jean.h.ma on 24/07/2017.
 */
import {ActionType} from '../types'

const initialState: Object = {};

export default function (state: Object = initialState, action: ActionType = {}): void {
	switch (action.type) {
		default:
			return state;
	}
}