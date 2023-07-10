import {graphQLRequest} from "./request";

export const notesLoader = async ({params}) => {
  const query = `query Folder($folderId: String!) {
                    folder(folderId: $folderId) {
                      id
                      name
                      notes {
                        content
                        id
                        updatedAt
                      }
                    }
                    }`

  const data = await graphQLRequest({
    query,
    variables: {
      folderId: params.folderId
    }
  })
  return data
}

export const noteLoader = async ({params}) => {
  const query = `query Note($noteId: String) {
                  note(noteId: $noteId) {
                    id
                    content
                  }
                }`

  const data = await graphQLRequest({
    query,
    variables: {
      noteId: params.noteId
    }
  })
  return data
}

export const addNewNote = async ({params, request}) => {
  const newNote = await request.formData()
  const formDataObj = {}
  newNote.forEach((value, key) => {
    formDataObj[key] = value
  })
  const query = `mutation Mutation($content: String, $folderId: ID!) {
                  addNote(content: $content, folderId: $folderId) {
                    id,
                    content
                  }  
                }
  `
  const {data} = await graphQLRequest({
    query,
    variables: formDataObj
  })

  return data;
}

export const updateNote = async ({params, request}) => {
  const updatedNote = await request.formData()
  const formDataObj = {}
  updatedNote.forEach((value, key) => {
    formDataObj[key] = value
  })
  const query = `mutation Mutation($id: String!, $content: String!) {
                  updateNote(id: $id, content: $content) {
                    id,
                    content
                  }  
                }
  `
  const {data} = await graphQLRequest({
    query,
    variables: formDataObj
  })
  console.log('jkkkkkkkkkkkkkkkkkk', data)

  return data;
}