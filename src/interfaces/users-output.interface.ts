// Users export interface
export interface UsersOutput {
    user: {
        id: string
        first_name: string
        last_name: string
        email: string
        username: string
        place: string
        post_office: string
        post_code: string
        country: string
    },
    rental: {
        id: string
        rent_start: Date
        rent_end: Date
    }[],
    vehicle: {
        id: string
        seats: number
        shifter: string
        horsepower: number
        torque: number
        acceleration: number
        year: string
        price: number
        rent_duration: number
        licence_plate: string
        vin: string
        color: string
        fuel: string
        model: string
        brand: string
        country: string
    }[],
}