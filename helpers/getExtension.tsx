export default function getExtension(filename: string) {
    let extension = /^.+\.([^.]+)$/.exec(filename)
    return extension == null ? '' : extension[1]
}
