import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './label.css'
import LabelIcon from '@mui/icons-material/Label';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchLabelList } from '../store/action/phonebook.action';
import { Ilabel, IRootState } from '../interface';
import LabelDialog from '../commonComponents/addLabel/addLable';

interface Istate {
  loading: boolean;
  labelDialog: boolean
}

function Label() {
  const [state, setState] = useState<Istate>({
    loading: false,
    labelDialog: false
  })
  const dispatch = useDispatch<AppDispatch>()
  const labelList = useSelector((state: IRootState) => state.phoneBook.labels)

  async function fetchLabelData() {
    setState((prevState: Istate) => ({ ...prevState, loading: true }))
    await dispatch(fetchLabelList())
    setState((prevState: Istate) => ({ ...prevState, loading: false }))
  }

  function handleLabelDialog() {
    setState((prevState: Istate) => ({ ...prevState, labelDialog: true }))
  }

  useEffect(() => {
    fetchLabelData()
  }, [])

  return (
    <div className='labelWrapper'>
      {state.labelDialog && (
        <LabelDialog
          open={state.labelDialog}
          onClose={() => setState((prevState: Istate) => ({ ...prevState, labelDialog: false }))}
        />
      )}
      {state.loading ? (
        <div>Loading....</div>
      ) : (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton className='add' onClick={handleLabelDialog}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Label " />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='listitem'>
            {labelList.map((label: Ilabel, index: number) => (
              <ListItemButton key={label?._id + "" + index} className='listitembutton'>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText inset primary={`${label.title}`} className='text' />
              </ListItemButton>
            ))}

          </ListItem>
        </List>
      )}
    </div>
  )
}

export default Label