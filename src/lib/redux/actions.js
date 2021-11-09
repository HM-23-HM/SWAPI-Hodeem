export const TO_DETAILS = 'TO_DETAILS'
export const TO_SUMMARIES = 'TO_SUMMARIES'

export function toDetails(name){
    return {
        type: TO_DETAILS,
        name: name
    }
}

export function toSummaries(){
    return {
        type: TO_SUMMARIES,
    }
}