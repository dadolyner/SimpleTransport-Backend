// Vehicles export interface
export interface VehiclesOutput {
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
        image: string
    },
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
}