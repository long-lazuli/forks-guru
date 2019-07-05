import Express from "express"
import Mongoose from "mongoose"
import ForkGuruResource from './src/index'

const app = Express()
const connection = Mongoose.connect("mongodb://localhost/songbook-ws", { useNewUrlParser: true })


interface Person extends Mongoose.Document {
    id?: any;
    firstname: string,
    lastname: string
}
const PersonSchema = new Mongoose.Schema<Mongoose.Document & Person>({
    firstname: { type : String },
    lastname: { type : String}
})

ForkGuruResource( app, {
    route: 'person',
    routePlural: 'people',
    slug: 'id',
    collection: 'person',
    connection,
    schema: PersonSchema
})

const PORT = process.env.PORT || 3058
        
app.listen(PORT, () => {
    console.log(`Listening at :${PORT}...`);
});
