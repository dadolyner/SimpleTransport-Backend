// Run all test Sequentially
import { createPostal } from "./createPostal"
import { deletePostal } from "./deletePostal"
import { editPostal } from "./editPostal"
import { retrievePostals } from "./retrievePostals"

describe('Running postal tests', () => {
    retrievePostals()
    createPostal()
    editPostal()
    deletePostal()
})