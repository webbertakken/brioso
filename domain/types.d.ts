interface SongData {
  id: string
  name: string
  userId: string
}

interface PartData extends Upload {
  isKnownPart: boolean
  isInstrument: boolean
  isVocal: boolean
  isClassified?: boolean
  name: string
  songId: string
  userId: string
}
