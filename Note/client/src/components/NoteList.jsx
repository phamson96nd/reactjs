import React, {useState} from "react";
import {Grid, List, Card, CardContent} from '@mui/material'
import {Link, Outlet, useParams, useLoaderData} from 'react-router-dom'

export default function NoteList() {

  const {folder} = useLoaderData()

  /*const folder = {notes: [
      {
        id: '1',
        content: '<p> This is new Note</p>'
      }
  ]}*/
  const {noteId} = useParams()
  const [noteActive, setNoteActive] = useState(noteId)

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
          <List>
            {
              folder.notes.map(({id, content}) => {
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


                    </CardContent>
                  </Card>
                </Link>
              })
            }
          </List>
        </Grid>

        <Grid item xs={8}>
          <Outlet />
        </Grid>

      </Grid>
    </>
  )
}