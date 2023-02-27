import {useState} from 'react';

import FileTree from "../../../data/image_meta.json"

import {getAlbumPath, getAlbumData} from "./Albums.functions";

//import {ButtonBar} from "../";

type AlbumsProps = {
    //OnImageClick: (imagePath: string) => void;
    OnImageClick?: (albumList: any) => void;
    OnAlbumClick?: (file: any) => void;
    albumList: any;
    albumData?: any;
};

export const Albums = ({
    OnImageClick = () => {},
    OnAlbumClick = () => {},
    albumList,
    albumData
}: AlbumsProps) => {

    const album = albumList[albumList.length-1];

    //const [albumData, setAlbumData] = useState({});
    console.log("log");
    console.log(albumData);

    // Build the album images path
    let albumPath = getAlbumPath(albumList);

    // Either the root directory or a sub directory
    let albumTree = (album == null) ? FileTree.files.tree : album.subTree;

    // Does this album have sub albums?
    let albumHasSubs = false;
    albumTree.forEach((file) => {
        if (file.type === "dir") {
            albumHasSubs = true;
        }
    });

    return (<>
        <div>
            <div>
                {(albumHasSubs) /* List sub albums */
                    ? <><h3>Albums:</h3><br /></>
                    : null
                }
                {(albumData != undefined && albumData.description != undefined) 
                    ?
                    <>{albumData.description}<br /><br /></>
                    : null
                }
                {albumTree.map((file, key) => (
                    ((file.type === "dir") 
                        ? <button onClick={() => {
                            OnAlbumClick(file);
                        }}>{file.file}</button>
                        :
                        null
                    )
                ))}
            </div>
            
            <div>
                {albumTree.map((file, key) => (
                    ((file.type === "image")
                        ? <>
                            <a onClick={() => {OnImageClick(albumList.concat(file));}}><img src={`${albumPath}/${file.file}`} width={"30%"} /></a>&nbsp;&nbsp;
                        </>
                        :
                        null
                    )
                ))}
            </div>
        </div>
    </>);
}