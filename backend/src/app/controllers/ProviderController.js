import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

import authConfig from '../../config/auth';
import msg from '../../config/msgs';

class ProviderController {
    async index(req, res) {
        const providers = await User.findAll({
            where:{
                provider: true
            },            
            attributes: ['id', 'name', 'email', 'createdAt'],
            include: [
                {
                model: File,
                as: 'avatar',
                attributes: ['path', 'url']
                }
            ]

        })

        return res.json(providers);
    }

    async store(req, res) {
        return res.json();
    }

    async update(req, res) {
        return res.json();
    }
    
    async delete(req, res) {
        return res.json();
    }
}

export default new ProviderController();