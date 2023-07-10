import React, {useEffect, useState} from 'react'
import {Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from '@mui/material'
import {CreateNewFolderOutlined} from '@mui/icons-material'
import {addNewFolder} from "../utils/folderUtils";
import {useSearchParams, useNavigate} from 'react-router-dom'

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState()
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const popupName = searchParams.get('popup')
  const navigate = useNavigate()

  const handleOpenPopup = () => {
    setSearchParams({
      popup: 'add-folder'
    })
  }

  const handleClose = () => {
    navigate(-1)
    setNewFolderName('')
  }

  const handleNewFolderName = (e) => {
    setNewFolderName(e.target.value)
  }

  const handleAddNewFolder = async () => {
    const {addFolder} = await addNewFolder({name: newFolderName})
    console.log({addFolder}, 'addFolder')
    handleClose()
  }

  useEffect(() => {
    if (popupName == 'add-folder') {
      setOpen(true)
      return
    }
    setOpen(false)
  }, [popupName])

  return (
    <div>
      <Tooltip
        title="Add Folder"
        onClick={handleOpenPopup}
      >
        <IconButton size='small'>
          <CreateNewFolderOutlined sx={{color: 'white'}}/>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder name"
            fullWidth
            size="small"
            variant="standard"
            autoComplete="off"
            sz={{width: '400px'}}
            value={newFolderName}
            onChange={handleNewFolderName}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddNewFolder}>OK</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </div>
  )
}