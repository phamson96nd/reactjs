import React, {useEffect, useState} from "react";
import {Grid, List, Card, CardContent, Box, Typography, Tooltip, IconButton} from '@mui/material'
import {NoteAddOutlined} from '@mui/icons-material'
import {Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate} from 'react-router-dom'
import moment from 'moment';

export default function NoteList() {
  const {folder} = useLoaderData()
  const {noteId, folderId} = useParams()
  const submit = useSubmit()
  const [noteActive, setNoteActive] = useState(noteId)
  const navigate = useNavigate()

  const handleAddNewNote1 = () => {
    submit({
      content: '',
      folderId: folderId
    }, {
      method: 'post',
      action: `folders/${folderId}`
    })
  }

  useEffect(() => {
    if (noteId) {
      setNoteActive(noteId)
    }
    if (folder?.nodes?.[0]) {
      navigate(`note/${folder.nodes[0].id}`)
    }
  }, [noteId, folder.notes])

  const handleAddNewNote = () => {
    submit({
        content: '',
        folderId,
      },
      {
        method: 'post',
        action: `/folders/${folderId}`
      }
    );
  };

  return (
    <>
      <Grid container sx={{height: '100%'}}>
        <Grid
          item
          xs={4}
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#F0EBE3',
            overflowY: 'auto',
            padding: '10px',
            textAlign: 'left'
          }}
        >
          <List
            subheader={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{fontWeight: 'bold'}}>Notes</Typography>
                <Tooltip title="Add Note" onClick={handleAddNewNote}>
                  <IconButton size="small">
                    <NoteAddOutlined/>
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {
              folder.notes.map(({id, content, updatedAt}) => {
                return <Link
                  key={id}
                  to={`note/${id}`}
                  style={{textDecoration: 'none'}}
                  onClick={() => setNoteActive(id)}
                >
                  <Card
                    sx={{
                      mb: '5px',
                      backgroundColor: id == noteActive ? 'rgba(255 211 140)' : null
                    }}
                  >
                    <CardContent sx={{'&:last-child': {pb: '10px'}, padding: '10px'}}>
                      <div
                        style={{fontSize: '14px', fontWeight: 'bold'}}
                        dangerouslySetInnerHTML={{__html: `${content.substring(0, 30) || 'Empty'}`}}
                      />

                      <Typography sx={{ fontSize: '10px' }}>
                        {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              })
            }
          </List>
        </Grid>

        <Grid item xs={8}>
          <Outlet/>
        </Grid>

      </Grid>
    </>
  )
}