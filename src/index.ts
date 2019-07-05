import Express from "express"
import Mongoose, { MongooseDocument } from "mongoose"
import BodyParser from "body-parser"

import * as guru from './methods'

type ForkinResource = {
    route: string
    routePlural?: string,
    slug?: string
    connection: Promise<typeof Mongoose>
    collection: string,
    schema: Mongoose.Schema<unknown>
}

export default (app: Express.Application, resource: ForkinResource): void => {

    const {
        route,
        routePlural= `${route}${'s'}`,
        slug= '_id',
        connection,
        collection= `${route}${'s'}`,
        schema
    } = resource

    schema.virtual(slug).get(function(){
        return this._id.toHexString()
    })
    schema.set('toJSON', {virtuals: true})
    
    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))
    
    // INDEX
    app.get(`/${routePlural}`, guru.indexOfResources)
    
    /* C */app.post(`/${route}`, guru.createResource)
    /* R */app.get(`/${route}/:id`, guru.requestResource)
    /* U */app.put(`/${route}/:id`, guru.updateResource)
    /* D */app.delete(`/${route}/:id`, guru.deleteResource)
    
}
