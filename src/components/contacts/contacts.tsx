import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchContactList } from '../store/action/phonebook.action';
import { Icontact, IRootState } from '../interface';
import ContactDetail from '../commonComponents/contactDetail/contactDetail';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedCallback } from 'use-debounce';

interface Istate {
    loading: boolean,
    showDetails: boolean,
    selectedContact: Icontact | null;
    search_value:string
}

const intitalState: Istate = {
    loading: false,
    showDetails: false,
    selectedContact: null,
    search_value:""
}

function Contacts() {
    const [state, setState] = useState<Istate>(intitalState)
    const dispatch = useDispatch<AppDispatch>()
    const contactList: Icontact[] = useSelector((state: IRootState) => (state.phoneBook.contacts))

    async function fetchContactData() {
        setState((prevState: Istate) => ({ ...prevState, loading: true }))
        await dispatch(fetchContactList())
        setState((prevState: Istate) => ({ ...prevState, loading: false }))
    }

    async function handleSearch(e:React.BaseSyntheticEvent){
        const value:string = e.target.value
        setState((prevState:Istate) => ({...prevState, search_value:value}));
        search(value)
    }

    const search = useDebouncedCallback((value) => {
        dispatch(fetchContactList(value))
    },1000);

    useEffect(() => {
        fetchContactData()
    }, [])

    return (
        <div className='contactsRoot'>
            {state.loading ? (
                <div>Loading.....</div>
            ) : (
                state.showDetails ? (
                    <ContactDetail
                        onBack={() => setState((prevState: Istate) => ({ ...prevState, showDetails: false, selectedContact: null }))}
                        contact={state.selectedContact}
                    />
                ) : (
                    <List dense sx={{ margin: 0, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                        <div className='search'>
                            <TextField
                                variant='outlined'
                                size='small'
                                fullWidth
                                placeholder='search contact..'
                                type='text'
                                onChange={handleSearch}
                            />
                            <SearchIcon />
                        </div>
                        {contactList?.length == 0 ? (
                            <div>
                                No Contacts Found.
                            </div>
                        ) : (
                            contactList.map((value: Icontact, index: number) => {
                                return (
                                    <ListItem key={value._id + '-' + index}>
                                        <ListItemButton onClick={() => setState((prevState: Istate) => ({ ...prevState, selectedContact: value, showDetails: true }))}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`${value.first_name.split('')[0]?.toUpperCase()
                                                        || value.last_name.split('')[0]?.toUpperCase()
                                                        || value.email.split('')[0]?.toUpperCase()}`}
                                                    src={`ss`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText className='text' primary={`${value.first_name}  ${value.last_name}`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })
                        )}
                    </List>
                ))}
        </div>
    )
}

export default Contacts