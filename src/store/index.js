import {compose, createStore} from "redux";
import rootReducer from "../reducers/index";
import persistState from 'redux-localstorage'

const enhancer = compose(persistState());

const store = createStore(rootReducer, {devices: [], battery: {}}, enhancer);
export default store;