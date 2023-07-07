import React, {useState} from 'react';
import {List, Card, CardContent, Typography} from '@mui/material'
import {Link, useParams} from 'react-router-dom'

export default function Folder({folders}) {
  const {folderId} = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId)
  return (
    <>
      <List sx={{
        width: '100%',
        bgcolor: '#7D9D9C',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto'

      }}>
        {folders.map(({id, name}) => {
          return (
            <Link
              key={id}
              to={`folders/${id}`}
              style={{textDecoration: 'none'}}

              onClick={() => setActiveFolderId(id)}
            >
              <Card
                sx=
                  {{
                    mb: '5px',
                    backgroundColor: id == activeFolderId ? 'rgba(255 211 140)' : null
                  }}
              >
                <CardContent sx={{padding: '5px', '&:last-child': {pb: '10px'}}}>
                  <Typography>
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </List>
    </>
  )
}