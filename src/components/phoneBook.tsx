import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Contacts from './contacts/contacts';
import AddContact from './commonComponents/addContact/addContact';
import Label from './labels/label';

interface Istate {
    tabValue: number
}

function PhoneBook() {
    const [state, setState] = useState<Istate>({
        tabValue: 0
    })

    function handleChange(_: React.SyntheticEvent, newValue: number) {
        setState((prevState: Istate) => ({ ...prevState, tabValue: newValue }))
    }

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <Typography variant="h4" component="h2">
                        Phone Book
                    </Typography>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={state.tabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Contacts" />
                        <Tab label="Add Contact" />
                        <Tab label="Labels" />
                    </Tabs>
                </Box>
                
                {state.tabValue == 0 && (
                    <Contacts/>
                )}

                {state.tabValue == 1 && (
                    <AddContact/>
                )}

                {state.tabValue == 2 && (
                    <Label />
                )}
            </div>
        </>
    )
}

export default PhoneBook