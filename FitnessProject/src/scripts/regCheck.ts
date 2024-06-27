export function regCheck(email : string, phone : string, pass_first : string, pass_second : string){
    if(email.indexOf("@") > -1 && pass_first == pass_second && /^\d+$/.test(phone)){
        return true
    }
    return false
}