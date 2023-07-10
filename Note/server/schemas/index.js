export const typeDefs = `#graphql
  type Folder {
    id: String!,
    name: String,
    createdAd: String,
    author: Author,
    notes: [Note]
  }
  
  type Author {
    id: String!,
    uid: String,
    name: String,
  }
  
  type Note {
    id: String!,
    content: String,
  }
  

  type Query {
    folders: [Folder],  
    folder(folderId: String): Folder, 
    note(noteId: String): Note,
  }
  
  type Mutation {
    addNote(content: String, folderId: ID!): Note
    addFolder(name: String!): Folder
    register(uid: String!, name: String!): Author
  }
`