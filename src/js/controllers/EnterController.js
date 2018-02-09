import Controller from './Controller';
import {REQUEST_ENTER} from '../actions/index';

export default class EnterController extends Controller{

	requestEnter(id) {
		this.dispatch(REQUEST_ENTER, id)
	}
}
