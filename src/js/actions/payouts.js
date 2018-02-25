import {PAYOUTS_SHOWN, COLAPSE_PAYOUTS} from './index'

export function expandPayouts (action, dispatch, getState) {

	setTimeout(() => {
		dispatch(PAYOUTS_SHOWN, action.payload);

		// setTimeout(() => {
		// 	dispatch(COLAPSE_PAYOUTS, action.payload);
		// }, 1000);
	}, 1000);
}

export function colapsePayouts (action, dispatch, getState) {

}

