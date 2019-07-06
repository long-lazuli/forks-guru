import {Mongoose, Schema} from "mongoose"

export type ForkinResource = {
    name: string
    schema: Schema<unknown>
    namePlural?: string
    collection?: string
}
