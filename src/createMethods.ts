import {
    Request as ExpressRequest,
    Response as ExpressResponse
} from 'express'

import {ForkinResource} from './types'

type methodNames = 'list'|'create'|'request'|'update'|'delete'
type methods = {
    [M in methodNames]: (req: ExpressRequest, res: ExpressResponse) => void
}

export default (resource: ForkinResource) => {
    return {
        list: async (req, res) => {
            res.json({ message: 'index' })
        },
        create: async (req, res) => {
            res.json({ message: 'create' })
        },
        request: async (req, res) => {
            res.json({ message: 'request' })
        },
        update: async (req, res) => {
            res.json({ message: 'update' })
        },
        delete: async (req, res) => {
            res.json({ message: 'delete' })
        }
    } as methods
}