import React, { useEffect, useState } from 'react'
import { Icontact, Ilabel, IRootState } from '../../interface'
import IconButton from '@mui/material/IconButton';
import './contactDetail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import NoteIcon from '@mui/icons-material/Note';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, contactDelete, fetchLabelList } from '../../store/action/phonebook.action';
import AddContact from '../addContact/addContact';
import CakeIcon from '@mui/icons-material/Cake';

interface Iprops {
    contact: Icontact | null;
    onBack: () => void
}
function ContactDetail(props: Iprops) {
    const { contact, onBack } = props
    const dispatch = useDispatch<AppDispatch>()
    const labels = useSelector((state: IRootState) => state.phoneBook.labels)

    const [open, setOpen] = useState<boolean>(false)

    async function handleDelete(){
        dispatch(contactDelete(contact?._id.$oid))
        onBack()
    }
    
    useEffect(() => {
        if (labels.length == 0) {
            dispatch(fetchLabelList())
        }
    }, [])

    return (
        <div className='detailWrapper'>
            {open ? (
                <AddContact
                    isEdit={true}
                    contact={contact}
                />
            ) : (
                <>
                    {/* <div className='header'>
                        <IconButton onClick={onBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </div> */}
                    <div className='content'>
                        {contact && (
                            <div className='avatar'>
                                <IconButton className='back' onClick={onBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Avatar
                                    className='avatar-icon'
                                    alt={`${contact.first_name.split('')[0]?.toUpperCase()
                                        || contact.last_name.split('')[0]?.toUpperCase()
                                        || contact.email.split('')[0]?.toUpperCase()}`}
                                    src={`ss`}
                                />
                                <IconButton
                                className='edit'
                                    onClick={() => {
                                        setOpen(true)
                                    }}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </div>
                        )}
                        <div className='name'>
                            <Typography className='text' variant='h4' fontWeight={'500'}>
                                {`${contact?.first_name || ""}  ${contact?.last_name || ""}`}
                            </Typography>
                        </div>
                        <div className='info'>
                            <Typography variant='h6' className='text'>Contact Info</Typography>
                            <div className='numberInfo'>
                                <CallIcon />
                                <Typography>{contact?.phone_number || "--"}</Typography>
                            </div>
                            <div className='emailInfo'>
                                <EmailIcon />
                                <Typography>{contact?.email || "--"}</Typography>
                            </div>
                            <div className='emailInfo'>
                                <AddLocationIcon />
                                <Typography>{contact?.address || "--"}</Typography>
                            </div>
                        </div>
                        {contact?.label_ids?.length !== 0 && (
                            <div className='labelInfo'>
                                <Typography className='text'>Lables</Typography>
                                <div className='labelWrapper'>
                                    {contact?.label_ids.map((id: string) => (
                                        <div className='labelChip' key={id}>{labels.find((l: Ilabel) => l._id.$oid == id)?.title}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(contact?.dob || contact?.note) && (
                            <div className='aboutInfo'>
                                <Typography className='text'>About {contact?.first_name || ""} {contact?.last_name || ""}</Typography>
                                <div className='birthday'>
                                    <CakeIcon />
                                    <Typography>{new Date(contact?.dob).toDateString()}</Typography>
                                </div>
                                <div className='birthday'>
                                    <NoteIcon />
                                    <Typography>{contact?.note}</Typography>
                                </div>
                            </div>
                        )}
                        <div className='deletebtn'>
                            <Button
                                variant='contained'
                                size='medium'
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ContactDetail