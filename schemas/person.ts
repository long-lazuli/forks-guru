import Mongoose from "mongoose"

interface Person extends Mongoose.Document {
    id?: any;
    firstname: string,
    lastname: string
}
const PersonSchema = new Mongoose.Schema<Mongoose.Document & Person>({
    firstname: { type : String },
    lastname: { type : String}
})

export default PersonSchema