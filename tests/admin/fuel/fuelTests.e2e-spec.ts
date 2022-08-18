// Run all test Sequentially
import { createFuel } from "./createFuel"
import { deleteFuel } from "./deleteFuel"
import { editFuel } from "./editFuel"
import { retrieveFuels } from "./retrieveFuels"

describe('Running fuel tests', () => {
    retrieveFuels()
    createFuel()
    editFuel()
    deleteFuel()
})