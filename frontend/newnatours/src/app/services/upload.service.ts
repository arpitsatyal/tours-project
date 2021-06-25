export class UploadService {
    uploadImage(data, file, whichImage) {
        let fd = new FormData()
        for (let key in data) {
            fd.append(key, data[key])
        }
        // images.forEach(image => fd.append(whichImage, image))
        fd.append(whichImage, file, file.name)
        return fd
    }
}