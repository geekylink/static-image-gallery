import {useState} from 'react';

import FileTree from "../../../data/image_meta.json"

import {getAlbumPath} from "./Albums.functions";

type AlbumsProps = {
    //OnImageClick: (imagePath: string) => void;
    OnImageClick?: (albumList: any) => void;
    startAlbumList?: any;
};

export const Albums = ({
    OnImageClick,
    startAlbumList
}: AlbumsProps) => {

    const [pastAlbumList, setPastAlbumList] = useState(((startAlbumList === undefined) ? [] : startAlbumList));
    const album = pastAlbumList[pastAlbumList.length-1];

    // Build the album images path
    let albumPath = getAlbumPath(pastAlbumList);

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
                    <h2>Album: {album.file}</h2><br />

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
                    ? <><h3>Albums:</h3><br /></>
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
                            <a onClick={() => {OnImageClick(pastAlbumList.concat(file));}}><img src={`${albumPath}/${file.file}`} width={"30%"} /></a>&nbsp;&nbsp;
                        </>
                        :
                        null
                    )
                ))}
            </div>
        </div>
    </>);
}