import { Request, response, Response } from 'express';

import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({ relations: ['images'] });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, { relations: ['images'] });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
    
        const orphanageRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];

        const images =  requestImages.map( image => {
            return { path: image.filename };
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().min(3).max(100).required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });
    
        const orphanage = orphanageRepository.create(data);
    
        await orphanageRepository.save(orphanage);
    
        return res.status(201).json(orphanage);
    }, 

    async update(req: Request, res: Response) {
        const {
            id,
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
    
        const orphanageRepository = getRepository(Orphanage);
    
        const orphanage = orphanageRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });
    
        await orphanageRepository.save(orphanage);
    
        return res.status(201).json(orphanage);
    }
}