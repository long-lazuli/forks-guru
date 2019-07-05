import Mongoose from "mongoose"

export type ForkinResource = {
    route: string
    routePlural?: string,
    slug?: string
    connection: Promise<typeof Mongoose>
    collection: string,
    schema: Mongoose.Schema<unknown>
}
