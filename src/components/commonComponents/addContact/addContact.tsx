import { useEffect, useState } from 'react'
import './addContact.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { Icontact, IcontactCreate, Ilabel, IRootState } from '../../interface';
import { AppDispatch, createContactHandler, fetchLabelList, updateContactHandler } from '../../store/action/phonebook.action';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IformData {
  loading: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  dob: string | Date;
  note: string;
  labels: Ilabel[];
  emailErorr: boolean
}

interface Iprops{ 
  isEdit?:boolean;
  contact?:Icontact | null

}
function AddContact(props:Iprops) {
  const {isEdit, contact} = props

  const dispatch = useDispatch<AppDispatch>()
  const labelList = useSelector((state:IRootState) => (state.phoneBook.labels))

  const [formData, setFormData] = useState<IformData>({
    loading: false,
    first_name: '',
    last_name: '',
    phone_number: "",
    email: "",
    address: "",
    dob: "",
    note: "",
    labels: [],
    emailErorr: false
  })

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name
    const value = e.target.value
    if (key == 'email') {
      if (e.target.validity.valid) {
        setFormData((prevState: IformData) => ({ ...prevState, [key]: value, emailErorr: false }))
      } else {
        setFormData((prevState: IformData) => ({ ...prevState, [key]: value, emailErorr: true }))
      }
    } else {
      setFormData((prevState: IformData) => ({ ...prevState, [key]: value }))
    }

  }
  
  async function handleFormSubmit(){
    const ids:string[] = formData.labels.map((d) => d?._id["$oid"]) || []
    const finalContactObject:IcontactCreate = {
      first_name:formData.first_name,
      last_name:formData.last_name,
      email:formData.email,
      phone_number:formData.phone_number,
      address:formData.address,
      dob:formData.dob,
      note:formData.note,
      label_ids:ids
    }
    setFormData((prevState:IformData) => ({...prevState, loading:true}))
    if(isEdit && isEdit){
      await dispatch(updateContactHandler({id:contact && contact._id.$oid || "" , ...finalContactObject}))
    }else{
      await dispatch(createContactHandler(finalContactObject))
    }
    
    setFormData((prevState:IformData) => ({
      ...prevState, 
      loading:false,
      first_name:"",
      last_name:"",
      email:"",
      phone_number:"",
      address:"",
      dob:"",
      note:"",
      labels:[]
    }))
  }

  function checkDisabled(){
    return (formData.first_name.trim() == "" && formData.last_name.trim() == "" && formData.email.trim() == ""
    && formData.phone_number.trim() == "") || formData.emailErorr
  }

  useEffect(() => {
    dispatch(fetchLabelList())

    if(isEdit && isEdit && contact){
      setFormData((prevState:IformData) => ({
        ...prevState,
        first_name:contact?.first_name || "",
        last_name: contact?.last_name || "",
        phone_number: contact?.phone_number || "",
        email:contact?.email || "",
        address:contact?.address || "",
        dob: contact?.dob || "",
        note:contact?.note || "",
        labels: labelList.filter((label:Ilabel) => contact.label_ids.includes(label._id.$oid) && label),
      }))
    }

  },[])

  return (
    <div className='addContactWrapper'>
      <form>
        <div className='fields'>
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            type='text'
            value={formData.first_name}
            name={'first_name'}
            onChange={handleChange}
          />
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            type='text'
            value={formData.last_name}
            name={'last_name'}
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type='email'
            name={'email'}
            value={formData.email}
            error={formData.emailErorr}
            helperText={formData.emailErorr ? "Please enter a valid email" : ""}
            inputProps={{
              type: "email",
            }}
            onChange={handleChange}
          />
          <PhoneInput
            inputClass='input'
            country={'in'}
            value={formData.phone_number}
            onChange={(phone: string) => setFormData((prevState: IformData) => ({ ...prevState, phone_number: phone }))}
          />
          <TextField
            id="Birth Date"
            label="Birth Date"
            variant="outlined"
            type='date'
            name={'dob'}
            value={formData.dob}
            onChange={handleChange}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            name={'address'}
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            id="note"
            label="Note"
            variant="outlined"
            name={'note'}
            value={formData.note}
            onChange={handleChange}
          />
          <FormControl sx={{ m: 0, width: 360 }}>
            <InputLabel id="demo-multiple-checkbox-label">Add to Label</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              name={'labels'}
              value={formData.labels}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: Ilabel[]) => selected.map((x: Ilabel) => x.title).join(', ')}
              MenuProps={MenuProps}
            >
              {labelList.map((label:Ilabel, index:number) => (
                <MenuItem key={label._id + ''+ index} value={label}>
                  <Checkbox
                    checked={
                      formData.labels.findIndex((item:Ilabel) => item._id.$oid === label._id.$oid) >= 0
                    }
                  />
                  <ListItemText primary={label.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            size='medium'
            onClick={handleFormSubmit}
            disabled={checkDisabled()}
          >
            {isEdit ? 'Update' : 'Save' }
            {formData.loading ? "Loading....." : null}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddContact