import Mongoose from "mongoose"
import {
    Request as ExpressRequest,
    Response as ExpressResponse
} from 'express'

import {ForkinResource} from './types'

type methodNames = 'list'|'create'|'request'|'update'|'delete'
type methods = {
    [M in methodNames]: (req: ExpressRequest, res: ExpressResponse) => void
}

export default (Model: Mongoose.Model<Mongoose.Document, {}>) => {
    return {
        list: async (req, res) => {
            Model.find( (err, data)=> {
                if (err) res.send(err)
                res.json({ message: 'index', data })
            })

        },

        create: async (req, res) => {
            const Resource = new Model({...req.body})

            // save the resource and check for errors
            Resource.save(function(err) {
                if (err) res.send(err);
                res.json({ message: `${Resource.modelName} created!` });
            });

        },

        request: async (req, res) => {
            Model.find({ id: req.body.slug }, (err, data) => {
                if (err) res.send(err)
                res.json({ message: 'request', data })
            })
        },

        update: async (req, res) => {
            var titles = ['Rock', 'Paper', 'Scissor']
            var title = titles[Math.floor(Math.random()*titles.length)]

            Model.find({ id: req.body.slug }, (err, data) => {
                if (err) res.send(err)
                res.json({ message: 'update', data })
            })
        },

        delete: async (req, res) => {
            res.json({ message: 'delete' })
        }

    } as methods
}