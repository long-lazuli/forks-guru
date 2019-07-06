import {Mongoose, Document, Schema} from "mongoose"

interface Person extends Document {
    firstname: string,
    lastname: string
}
export default (mongoose: Mongoose) => {
    return new mongoose.Schema<Document & Person>({
        firstname: { type : String },
        lastname: { type : String}
    })
}
