import Mongoose from "mongoose"

export type ForkinResource = {
    name: string
    connection: Promise<typeof Mongoose>
    schema: Mongoose.Schema<unknown>

    namePlural?: string
    slug?: string
    collection?: string
}
