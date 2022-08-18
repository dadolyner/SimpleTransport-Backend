// Run all test Sequentially
import { createImage } from "./createImage"
import { deleteImage } from "./deleteImage"
import { editImage } from "./editImage"
import { retrieveImages } from "./retrieveImages"

describe('Running image tests', () => {
    retrieveImages()
    createImage()
    editImage()
    deleteImage()
})