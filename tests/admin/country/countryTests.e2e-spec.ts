// Run all test Sequentially
import { createCountry } from "./createCountry";
import { deleteCountry } from "./deleteCountry";
import { editCountry } from "./editCountry";
import { retrieveCountries } from "./retrieveCountries";

describe('Running country tests', () => {
    retrieveCountries()
    createCountry()
    editCountry()
    deleteCountry()
})