import {Application as ExpressApp} from "express"
import BodyParser from "body-parser"
import {ForkinResource} from './types'
import createMethods from './createMethods'

export default (app: ExpressApp, resource: ForkinResource): void => {

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
    
    const methods = createMethods(resource)

    // INDEX
    app.get(`/${routePlural}`, methods.list)

    /* C */app.post(`/${route}`, methods.create)
    /* R */app.get(`/${route}/:id`, methods.request)
    /* U */app.put(`/${route}/:id`, methods.update)
    /* D */app.delete(`/${route}/:id`, methods.delete)
    
}
