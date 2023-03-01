import {useState} from 'react';

import FileTree from "../../../data/image_meta.json"

import {getAlbumPath, getAlbumData} from "./Albums.functions";

import {File, AlbumData} from "../../types";

type AlbumsProps = {
    OnImageClick?: (albumList: Array<File>) => void;
    OnAlbumClick?: (file: File) => void;
    albumList: Array<File>;
    albumData?: AlbumData;
};

export const Albums = ({
    OnImageClick = (albumList: Array<File>) => {},
    OnAlbumClick = (file: File) => {},
    albumList,
    albumData
}: AlbumsProps) => {

    const album = albumList[albumList.length-1];

    // Build the album images path
    let albumPath = getAlbumPath(albumList);

    // Either the root directory or a sub directory
    let albumTree = (album == null) ? FileTree.files.tree : album.subTree;

    // Does this album have sub albums?
    let albumHasSubs = false;
    albumTree?.forEach((file) => {
        if (file.type === "dir") {
            albumHasSubs = true;
        }
    });

    return (<>
        <div>
            <div>
                { // Does album have a description to show?
                (albumData != undefined && albumData.description != undefined) 
                    ?
                    <>{albumData.description}<br /><br /></>
                    : null
                }
                {(albumHasSubs) /* List sub albums */
                    ? <><h3>Albums:</h3><br /></>
                    : null
                }
                {albumTree?.map((file) => (
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
                {albumTree?.map((file) => (
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