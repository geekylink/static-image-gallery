import {useState} from 'react';

import FileTree from "../../../data/image_meta.json"

/*export const Album = ({
    files
}: AlbumsProps) => {
    return (<>
        <div>{files.file} - {files.type}</div>
    </>);
}*/

const ALBUM_PATH = "/images"; // Where is the /public album directory stored

type AlbumsProps = {
    OnImageClick: (imagePath: string) => void;
};

export const Albums = ({
    OnImageClick
}: AlbumsProps) => {

    const [pastAlbumList, setPastAlbumList] = useState([]);
    const album = pastAlbumList[pastAlbumList.length-1];

    // Build the album images path
    let albumPath = ALBUM_PATH + "/";
    for (let i = 0; i < pastAlbumList.length; i++) {
        albumPath += pastAlbumList[i].file + "/"
    }

    // Either the root directory or a sub directory
    let albumList = (album == null) ? FileTree.files.tree : album.subTree;

    // Does this album have sub albums?
    let albumHasSubs = false;
    albumList.forEach((album) => {
        if (album.type === "dir") {
            albumHasSubs = true;
        }
    });

    return (<>
        <div>
            {(album != null) /* Album Name */
                ? <>
                    <div>Album: {album.file}</div><br />

                    <button onClick={() => { /* Back Button */
                        let newAlbumList = pastAlbumList.concat();
                        newAlbumList.pop();
                        setPastAlbumList(newAlbumList);
                    }}>
                        Back
                    </button>
                    {(pastAlbumList.length > 1) 
                        ? 
                        <button onClick={() => {setPastAlbumList([]); }}>
                            Home
                        </button>
                        : null
                    }
                  </>
                : null
            }

            <div><br />
                {(albumHasSubs) /* List sub albums */
                    ? <><div>Albums:</div><br /></>
                    : null
                }
                {albumList.map((file, key) => (
                    ((file.type === "dir") 
                        ? <button onClick={() => {
                            setPastAlbumList(pastAlbumList.concat(file));
                        }}>{file.file}</button>
                        :
                        null
                    )
                ))}
            </div>
            
            <div>
                {albumList.map((file, key) => (
                    ((file.type === "image")
                        ? <>
                            <a href={`${albumPath}/${file.file}`} onClick={() => {OnImageClick(`${albumPath}/${file.file}`)}}><img src={`${albumPath}/${file.file}`} width={"30%"} /></a>&nbsp;&nbsp;
                        </>
                        :
                        null
                    )
                ))}
            </div>
        </div>
    </>);
}