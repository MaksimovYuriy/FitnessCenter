export interface regModel {
    email: string,
    phone: string,
    password: string
}

export interface authModel {
    email: string,
    password: string
}

export interface changeModel {
    jwtA: string,
    jwtR: string,
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    genderID: string
}

export interface freeCoach {
    id: number,
    name: string,
    surname: string,
    typeId: number
}

export interface makeTrainModel {
    date: string,
    user_id: number,
    coach_id: number
}

export interface nextTrainModel {
    date: string,
    coach: string,
    type: string
}