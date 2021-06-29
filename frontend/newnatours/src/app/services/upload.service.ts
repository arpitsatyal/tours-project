export class UploadService {
    uploadImage(data, files, whichImage) {
        let fd = new FormData()
        for (let key in data) {
            fd.append(key, data[key])
        }
        if(whichImage === 'images') {
        files.forEach(file => fd.append(whichImage, file, file.name))
        } 
        if(whichImage === 'imageCover' || whichImage === 'photo') {
            fd.append(whichImage, files, files.name)
        }
        return fd
    }
}