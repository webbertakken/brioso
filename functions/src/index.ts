import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { QuerySnapshot } from 'firebase-admin/firestore'

admin.initializeApp()

const db = admin.firestore()

exports.deleteUser = functions.firestore.document('users/{userID}').onDelete((snap, context) => {
  // Get an object representing the document prior to deletion
  const deletedSong = snap.data() as SongData

  // Delete parts associated with the song and the associated files in storage
  const parts = db
    .collection(`users/${deletedSong.userId}/songs`)
    .doc(deletedSong.id)
    .collection('parts')

  parts.get().then((querySnapshot: QuerySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      const part = doc.data() as PartData

      const partRef = parts.doc(part.id)
      await partRef.delete()

      const storageRef = admin.storage().bucket().file(part.metadata.fullPath)
      await storageRef.delete()
    })
  })
})
