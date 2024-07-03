export function getTotalKcal(Weight: number, Height: number, Age: number, Activity: string, Gender: string, Aim: string) {
    let A: number = 0
    switch (Activity) {
        case "Очень низкая": A = 1.2; break;
        case "Низкая": A = 1.375; break;
        case "Средняя": A = 1.55; break;
        case "Высокая": A = 1.7; break;
        case "Очень высокая": A = 1.9; break;
        default: console.log("Ошибка в активности"); break;
    }
    let TotalKcal: number = 0
    switch (Gender) {
        case null: console.log("Пол не задан"); break;
        case "М": TotalKcal = KcalMale(Weight, Height, Age, A); break;
        case "Ж": TotalKcal = KcalFemale(Weight, Height, Age, A); break;
        default: console.log("Ошибка в поле"); break;
    }
    switch (Aim) {
        case "Снизить вес": TotalKcal *= 0.85; break;
        case "Сохранить вес": TotalKcal *= 1.15; break;
        case "Набрать вес": TotalKcal *= 1; break;
        default: console.log("Ошибка в цели"); break;
    }
    return TotalKcal;
}

export function KcalMale(Weight: number, Height: number, Age: number, A: number) {
    return (10 * Weight + 6.25 * Height - 5 * Age + 5) * A
}

export function KcalFemale(Weight: number, Height: number, Age: number, A: number) {
    return (10 * Weight + 6.25 * Height - 5 * Age - 161) * A
}