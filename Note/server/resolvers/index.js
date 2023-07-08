//import fakeData from "../fakeData";
import fakeData from '../fakeData/index.js'
import {FolderModel} from '../models/index.js'

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid
      })
      console.log(context.uid, 'jjjj')

      return folders
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const findFolder = await FolderModel.findOne({
        _id: folderId
      })
      return findFolder
    },
    note: (parent, args) => {
      const noteId = args.noteId
      return fakeData.notes.find(note => note.id == noteId)
    }
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId
      return fakeData.authors.find(author => author.id === authorId)
    },
    notes: (parent, args) => {
      return fakeData.notes.filter(note => note.folderId == parent.id)
    }
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({...args, authorId: '1111'})
      await newFolder.save()
      return newFolder
    }
  }
}