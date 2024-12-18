import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { addLabel, AppDispatch } from '../../store/action/phonebook.action';

interface Iprops {
    open: boolean;
    onClose: () => void;
}
export default function LabelDialog(props: Iprops) {
    const { open, onClose } = props

    const [name, setName] = React.useState<string>("")

    const dispatch = useDispatch<AppDispatch>()

    async function handleSubmit() {
        await dispatch(addLabel(name))
        onClose()
    }

    function handleChange(e:React.BaseSyntheticEvent){
        const value:string = e.target.value
        setName(value)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Label"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            id="title"
                            label="Label Name"
                            variant="outlined"
                            type='text'
                            value={name}
                            name={'title'}
                            onChange={handleChange}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button disabled={name.trim() == ""} onClick={handleSubmit} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
