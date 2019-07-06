import {Application as ExpressApp} from "express"
import BodyParser from "body-parser"
import {ForkinResource} from './types'
import createMethods from './createMethods'
import { model as MongooseModel } from "mongoose";
import Hashids from "hashids"

export default (app: ExpressApp, resource: ForkinResource): void => {

    const {
        name,
        namePlural= `${name}${'s'}`,
        collection= `${name}`,
        schema
    } = resource
    const hashids = new Hashids(
        'secret things impossible to guess',
        0,
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz')

    schema.set('toJSON', {virtuals: true})
    schema.virtual('slug')
        .get(function(){ return hashids.encodeHex(this._id) })
        .set(function(slug: string){ this._id = hashids.decodeHex(slug) })

    const resourceModel = MongooseModel(name, schema, collection)

    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))
    
    const methods = createMethods(resourceModel)

    // INDEX
    app.get(`/${namePlural}`, methods.list)

    /* C */app.post(`/${name}`, methods.create)/* /new */
    /* R */app.get(`/${name}/:slug`, methods.request)
    /* U */app.put(`/${name}/:slug`, methods.update)/* save */
    /* D */app.delete(`/${name}/:slug`, methods.delete)/* destroy */
    
}
