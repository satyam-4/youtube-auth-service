import fs from "fs"

export const cleanupTempFiles = (filePaths) => {
    filePaths.forEach(path => {
        fs.unlink(path, (err) => {
            if(err) console.log(`Failed to delete file: ${err}`)
        })
    })
}