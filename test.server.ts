import Express from "express"
import mongoose from "mongoose"
import ForkGuruResource from './src/index'

import PersonSchema from './schemas/person'

mongoose.connect("mongodb://localhost/forks-guru-test", { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {

    const app = Express()

    // we're connected!
    ForkGuruResource( app, {
        name: 'person',
        namePlural: 'people',
        collection: 'person',
        schema: PersonSchema(mongoose)
    })

    const PORT = process.env.PORT || 5058
            
    app.listen(PORT, () => {
        console.log(`Listening at :${PORT}...`);
    })
    
})