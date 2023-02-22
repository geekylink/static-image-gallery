
const ALBUM_PATH = "/images"; // Where is the /public album directory stored

export const getAlbumPath = (albumList: any) => {

    // Build the album images path
    let albumPath = ALBUM_PATH;
    for (let i = 0; i < albumList.length; i++) {
        albumPath += "/" + albumList[i].file
    }

   return albumPath;
}