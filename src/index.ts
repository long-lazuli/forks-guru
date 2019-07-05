import {Application as ExpressApp} from "express"
import BodyParser from "body-parser"
import {ForkinResource} from './types'
import createMethods from './createMethods'

export default (app: ExpressApp, resource: ForkinResource): void => {

    const {
        name,
        namePlural= `${name}${'s'}`,
        slug= '_id',
        connection,
        collection= `${name}`,
        schema
    } = resource

    schema.virtual(slug).get(function(){
        return this._id.toHexString()
    })
    schema.set('toJSON', {virtuals: true})
    
    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))
    
    const methods = createMethods(resource)

    // INDEX
    app.get(`/${namePlural}`, methods.list)

    /* C */app.post(`/${name}`, methods.create)/* /new */
    /* R */app.get(`/${name}/:slug`, methods.request)
    /* U */app.put(`/${name}/:slug`, methods.update)/* save */
    /* D */app.delete(`/${name}/:slug`, methods.delete)/* destroy */
    
}
