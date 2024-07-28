import { db } from "@/config/db";

export const getCategoryList = async () => {
    return await db.query.categories.findMany();
};