import { configureStore } from "@reduxjs/toolkit"
import admin from "./modules/admin"
import check_article from "./modules/check_article"
import articles from "./modules/articles"

export default configureStore({
    reducer: {
        admin,
        check_article,
        articles
    }
})