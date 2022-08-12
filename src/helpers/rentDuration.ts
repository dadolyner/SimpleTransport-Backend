// Function that returns the duration of a rent in days
export const getRentDuration = (rent_start: string, rent_end: string) => {
    const startDate = new Date(rent_start)
    const endDate = new Date(rent_end)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const getDifferenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return getDifferenceInDays
}