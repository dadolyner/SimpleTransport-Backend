// Run all test Sequentially
import { createColor } from "./createColor";
import { deleteColor } from "./deleteColor";
import { editColor } from "./editColor";
import { retrieveColors } from "./retrieveColors";

describe('Running color tests', () => {
    retrieveColors()
    createColor()
    editColor()
    deleteColor()
})