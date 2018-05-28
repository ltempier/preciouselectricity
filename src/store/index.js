import {compose, createStore} from "redux";
import rootReducer from "../reducers/index";
import persistState from 'redux-localstorage'

const enhancer = compose(persistState());

const store = createStore(rootReducer, {devices: []}, enhancer);
export default store;