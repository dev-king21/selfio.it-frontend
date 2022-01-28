
import { TAKE_PHOTO, SET_EVENT } from "../action";

const initialState = {
    selfie: null,
    business: false,
    event: null,
    device_id: -1
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TAKE_PHOTO: {
            return {
                ...state,
                selfie: action.payload,
            }
        }

        case SET_EVENT: {
            return {
                ...state,
                event: action.payload.event,
                device_id: action.payload.device_id,
                business: action.payload.business
            }
        }
        default:
            return state

    }
}

export default reducer