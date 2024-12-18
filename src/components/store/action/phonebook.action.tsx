import axios from "axios";
import { Icontact, IcontactCreate, IRootState } from "../../interface";
import store from "../reducer";

const APIURL: string = `http://127.0.0.1:5000/api`

export const ADD_CONATCT = 'ADD_CONTACT'
export const FETCH_CONTACT_LIST = "FETCH_CONTACT_LIST"
export const FETCH_LABEL_LIST ="FETCH_LABEL_LIST"
export const ADD_LABEL="ADD_LABEL"

export interface IaddContact {
    type: "ADD_CONTACT";
    payload: { data: []; count: number };
}

export interface IfetchContact {
    type: "FETCH_CONTACT_LIST";
    payload: { data: [] };
}

export interface IfetchLabel {
    type: "FETCH_LABEL_LIST";
    payload: { data: [] };
}

export interface IaddLabel {
    type: "ADD_LABEL";
    payload: { data: object};
}



export type IActionType = IaddContact | IfetchContact | IfetchLabel | IaddLabel
export type AppDispatch = typeof store.dispatch

export const fetchContactList = (search?:string): AppDispatch => {
    return async (dispatch: AppDispatch) => {
        try {
            const url: string = search ? `${APIURL}/fetch-contacts?search=${search}` :  `${APIURL}/fetch-contacts`
            const response = await axios.get(url)
            if (response.status == 200) {
                dispatch({
                    type: FETCH_CONTACT_LIST,
                    payload: { data: response.data }
                })
            } else {
                console.log("someting went wrong.")
                dispatch({
                    type: FETCH_CONTACT_LIST,
                    payload: { data: [] }
                })
            }
        } catch (err) {
            console.log("error while fetching contact list ", err)
            dispatch({
                type: FETCH_CONTACT_LIST,
                payload: { data: [] }
            })
            return err
        }
    }
}

export const createContactHandler = (finalData:IcontactCreate): AppDispatch => {
    return async () => {
        try {
            const url: string = `${APIURL}/upsert-contact`
            const response = await axios.post(url,finalData)
             
            if (response.status == 200) {
                alert('Contact Created.')
            } else {
                console.log("someting went wrong.")
                alert('Error while creating contact.')
            }
        } catch (err) {
            console.log("error while create contact ", err)
            alert('Erorr while creating contact.')
            return err
        }
    }
}

export const updateContactHandler = (finalData:IcontactCreate): AppDispatch => {
    return async () => {
        try {
            const url: string = `${APIURL}/upsert-contact`
            const response = await axios.post(url,finalData)
             
            if (response.status == 200) {
                alert('Contact Updated.')
            } else {
                console.log("someting went wrong.")
                alert('Error while updating contact.')
            }
        } catch (err) {
            console.log("error while update contact ", err)
            alert('Erorr while updating contact.')
            return err
        }
    }
}

export const fetchLabelList = (): AppDispatch => {
    return async (dispatch: AppDispatch) => {
        try {
            const url: string = `${APIURL}/fetch-labels`
            const response = await axios.get(url)
             
            if (response.status == 200) {
                console.log(response.data)
                dispatch({
                    type: FETCH_LABEL_LIST,
                    payload: { data: response.data }
                })
            } else {
                console.log("someting went wrong.")
                alert('Error while fetching label.')
            }
        } catch (err) {
            console.log("error while fetching label ", err)
            return err
        }
    }
}

export const addLabel = (name:string): AppDispatch => {
    return async (dispatch: AppDispatch, getState: () => IRootState) => {
        try {
            const url: string = `${APIURL}/create-label`
            const response = await axios.post(url,{title:name})
            
            if (response.status == 200) {
                console.log(response.data)
                if(!response.data.isCreated){
                    alert('That Label Already exists')
                }else{
                    dispatch({
                        type: ADD_LABEL,
                        payload: { data: {title:name} }
                    })
                }
            } else {
                console.log("someting went wrong.")                
            }
        } catch (err) {
            console.log("error while fetching label ", err)
            return err
        }
    }
}

export const contactDelete = (id:string | null | undefined): AppDispatch => {
    return async (dispatch: AppDispatch, getState: () => IRootState) => {
        try {
            const state = getState()
            let contacts = state.phoneBook.contacts

            const url: string = `${APIURL}/delete-contact`
            const response = await axios.post(url,{id:id})
            
            if (response.status == 200) {
                console.log(response.data)
                if(!response.data.isDeleted){
                    alert('Contact Deleted.')
                }

                contacts = contacts.filter((s:Icontact) => s._id.$oid !== id)
                dispatch({
                    type: FETCH_CONTACT_LIST,
                    payload: { data: contacts }
                })

            } else {
                console.log("someting went wrong.")                
            }
        } catch (err) {
            console.log("error while delete contact ", err)
            return err
        }
    }
}