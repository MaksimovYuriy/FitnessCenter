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
    age: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    genderID: string,
    scores: string
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

export interface bodytestModel {
    userId: number,
    weight: number,
    fat: number
}

export interface chartDataModel {
    date: string,
    weight: number,
    fat: number
}

export interface addBonusModel {
    userId: number,
    scores: number
}

export interface getLoyaltyModel {
    id: number,
    name: string,
    description: string
}

export interface getSubModel {
    id: number,
    name: string,
    description: string,
    price: number
}

export interface setSubModel {
    userId: number,
    subId: number,
    clubId: number
}

export interface getClubModel {
    id: number,
    name: string,
    description: string
}