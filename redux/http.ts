import axios from "axios";

export default axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND}/api`,
    headers: {
        "Content-type": "application/json"
    }
});
