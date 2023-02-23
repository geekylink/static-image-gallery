
const ALBUM_PATH = "/images"; // Where is the /public album directory stored

import FileTree from "../../../data/image_meta.json"

export const getAlbumPath = (albumList: any) => {

    // Build the album images path
    let albumPath = ALBUM_PATH;
    for (let i = 0; i < albumList.length; i++) {
        albumPath += "/" + albumList[i].file
    }

   return albumPath;
}

export const getAlbumData = (albumList: any, OnResponse: (data: any) => void) => {

    const album = albumList[albumList.length-1];
    const albumPath = getAlbumPath(albumList);
    const albumTree = (album == null) ? FileTree.files.tree : album.subTree;

    if (albumTree === undefined) {
        console.log("album tree empty");
        OnResponse({});
        return;
    }

    let foundJSON = false;

    albumTree.forEach((file: any) => {

        if (file.type === "json") {
            foundJSON = true;
            fetch(`${albumPath}/${file.file}`).then(resp => {
                resp.json().then(data => {
                    OnResponse(data);
                });
            });
        }

    });

    if (!foundJSON) {
        OnResponse({});
    }

}