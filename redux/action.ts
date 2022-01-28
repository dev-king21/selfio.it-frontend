export const TAKE_PHOTO = "TAKE_PHOTO"
export const SET_EVENT = "SET_EVENT"

export const takePhoto = (image: string) => ({
    type: TAKE_PHOTO,
    payload: image,
})

export const setEvent = (event: any) => ({
    type: TAKE_PHOTO,
    payload: event,
})