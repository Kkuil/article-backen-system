import { auth } from "@/api/admin"
import { message } from "antd"

export default {
    async AuthLoader() {
        const { status, msg } = await auth()
        if(status == 400) {
            message.error(msg)
        }
        return {
            status
        }
    }
}