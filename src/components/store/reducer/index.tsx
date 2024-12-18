import { applyMiddleware, combineReducers, createStore } from "redux";
import phoneBookReducer from "./phonebook.reducer";
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
    phoneBook: phoneBookReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk),
)

export default store