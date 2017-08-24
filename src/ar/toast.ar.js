/**
 * Created by jean.h.ma on 24/07/2017.
 */
import {ActionType, ToastMessageType} from '../types'
import guid from 'guid'
import update from 'immutability-helper'

const PUSH_MESSAGE = guid.raw();
const POP_MESSAGE = guid.raw();

export function popMessage(): ActionType {
	return {
		type: POP_MESSAGE
	};
}

export function pushMessage(message: ToastMessageType): ActionType {
	const result: ActionType = {
		type: PUSH_MESSAGE,
		payload: message
	};
	return result;
}

const initialState: Object = {
	messages: []
};

export default function (state: Object = initialState, action: ActionType = {}): Object {
	switch (action.type) {
		case PUSH_MESSAGE:
			return update(state, {
				messages: {$push: [action.payload]}
			});
		case POP_MESSAGE:
			return update(state, {
				messages: {$splice: [[state.messages.length - 2, 1]]}
			});
		default:
			return state;
	}
}