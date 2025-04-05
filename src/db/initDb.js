import { createUserTable } from "../data/createUserTable.js"
import { createRefreshTokenTable } from "../data/createRefreshTokenTable.js"

const initializeDb = async () => {
    try {
        await createUserTable()
        await createRefreshTokenTable()
    } catch (error) {
        console.log("Error while initializing the database ", error)
    }
}

export default initializeDb