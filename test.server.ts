import Express from "express"
import Mongoose from "mongoose"
import ForkGuruResource from './src/index'

const app = Express()
const connection = Mongoose.connect("mongodb://localhost/forks-guru-test", { useNewUrlParser: true })

import PersonSchema from './schemas/person'

ForkGuruResource( app, {
    route: 'person',
    routePlural: 'people',
    slug: 'id',
    collection: 'person',
    connection,
    schema: PersonSchema
})

const PORT = process.env.PORT || 5058
        
app.listen(PORT, () => {
    console.log(`Listening at :${PORT}...`);
});
