export interface File {
    file: string,
    type: string,
    subTree?: Array<File>,
}