import http from "../redux/http"

class EventService {

    getEvent(event_code: any, android_id: string) {

        return http.post<any>(`/getEvent`, {
            event_code,
            android_id
        });
    }
}

export default new EventService();