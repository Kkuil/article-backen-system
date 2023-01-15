import { auth } from "@/api/admin"
import { message } from "antd"

export default {
    async AuthLoader() {
        const { status, msg, admin } = await auth()
        if(status == 400) {
            message.error(msg)
            return {
                status
            }
        }
        return {
            status,
            admin
        }
    }
}