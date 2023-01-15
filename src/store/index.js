import { configureStore } from "@reduxjs/toolkit"
import admin from "./modules/admin"
import check_article from "./modules/check_article"

export default configureStore({
    reducer: {
        admin,
        check_article
    }
})