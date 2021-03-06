import JWT from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import msg from '../../config/msgs';

import User from '../models/User';
import File from '../models/File';

class SessionController {
    async index(req, res) {
        return res.json();
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({error: msg.session.create.error.err_request_format_invalid});
        }

        const {email, password} = req.body;

        const user = await User.findOne({
            where: {
                email: email
            },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                }
            ]
        })

        if (!user) {
            return res
                .status(401)
                .json({error: msg.session.create.error.err_email_not_found})
        }

        if (!(await user.checkPassword(password))){
            return res
                .status(401)
                .json({error: msg.session.create.error.err_password_invalid})
        }

        const {id, name, avatar, provider} = user;

        return res
            .json({
                success: msg.session.create.success,
                user: {
                    id,
                    name,
                    email,
                    avatar,
                    provider
                },
                token: JWT.sign({id}, authConfig.secret,{
                    expiresIn: authConfig.expiresIn
                })
            });
    }

    async update(req, res) {
        return res.json();
    }
    
    async delete(req, res) {
        return res.json();
    }    
}

export default new SessionController();