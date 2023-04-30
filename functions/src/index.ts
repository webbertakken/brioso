import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { wellKnownInstruments, wellKnownVocalParts } from './wellKnownParts'

admin.initializeApp()

const db = admin.firestore()

exports.onSongDeleted = functions.firestore
  .document('/users/{userID}/songs/{songId}')
  .onDelete(async (snap, context) => {
    console.log('Deleting song: ', context.params.songId)

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

exports.onPartCreated = functions.firestore
  .document('/users/{userId}/songs/{songId}/parts/{partId}')
  .onCreate(async (snap, context) => {
    console.log('Classifying part: ', context.params.partId)

    const { name: originalName } = snap.data() as PartData

    // Name
    let name = originalName
      // Replace underscores with spaces
      .replace(/[_-]+/g, ' ')
      // Remove file extension
      .replace(/(\.\w{2,4})+$/g, '')
      // Remove all non-alphanumeric characters
      .replace(/[^\w\s]+/g, '')

    // Well known parts can be standardized
    const parts = name.toLowerCase().split(' ')

    // Instruments
    const instrumentKeys = Object.keys(wellKnownInstruments)
    const matchedInstruments = instrumentKeys.filter((element) => parts.includes(element))

    // Vocals
    const vocalKeys = Object.keys(wellKnownVocalParts)
    const matchedVocals = vocalKeys.filter((element) => parts.includes(element))

    // Classification
    const isInstrument = matchedInstruments.length > 0
    const isVocal = matchedVocals.length > 0
    const isKnownPart = isInstrument || isVocal
    if (isKnownPart) {
      name = [
        ...matchedInstruments.map((i) => wellKnownInstruments[i]),
        ...matchedVocals.map((v) => wellKnownVocalParts[v]),
      ].join(', ')
    }

    // Identifier
    const id = name
      // Replace spaces with dashes
      .replace(/\s+/g, '-')
      // Lowercase
      .toLowerCase()

    return snap.ref.set(
      { id, name, isKnownPart, isVocal, isInstrument, isClassified: true },
      { merge: true },
    )
  })
