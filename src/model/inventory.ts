export class Inventory {
  public static getSongsPath(userUid: string) {
    return `users/${userUid}/songs`
  }

  public static getPartsDatabasePath(userUid: string, songSlug: string) {
    return `users/${userUid}/songs/${songSlug}/parts`
  }

  public static getPartsFilesPath(userUid: string, songSlug: string) {
    return `users/${userUid}/songs/${songSlug}/parts`
  }
}
