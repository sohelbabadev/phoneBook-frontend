import { Icontact } from '../../interface'
import * as Actions from '../action/phonebook.action'

interface Istate{
    contacts:Icontact[],
    labels:object
}

const initialState:Istate = {
    contacts:[],
    labels:[]
}

const phoneBookReducer = (state = initialState, action:Actions.IActionType):Istate => {
    switch(action.type){
        case Actions.FETCH_CONTACT_LIST:{
            return {
                ...state,
                contacts:action.payload.data
            }
        }
        case Actions.FETCH_LABEL_LIST:{
            return {
                ...state,
                labels:action.payload.data
            }
        }
        case Actions.ADD_LABEL:{
            const oldLabel = state.labels
            oldLabel.push({_id: "", ...action.payload.data})
            return {
                ...state,
                labels:oldLabel
            }
        }
        default:
            return state
    }
}

export default phoneBookReducer