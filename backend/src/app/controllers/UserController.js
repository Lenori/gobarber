import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';
import msg from '../../config/msgs';

class UserController {
    async index(req, res) {
        return res.json();
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(authConfig.minPasswordLength),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')])
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({error: msg.user.create.error.err_request_format_invalid});
        }

        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (userExists) {
            return res
                .status(400)
                .json({error: msg.user.create.error.err_email_already_used});
        }

        const {id, name, email, provider} = await User.create(req.body);

        return res.json({
            id,
            email,
            name,
            provider
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(authConfig.minPasswordLength),
            password: Yup.string().min(authConfig.minPasswordLength)
                .when('oldPassword', (oldPassword, field) => 
                    oldPassword ? field.required() : field),
            confirmPassword: Yup.string()
                .when('password', (password, field) => 
                password ? field.required().oneOf([Yup.ref('password')]) : field)
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({error: msg.user.update.error.err_request_format_invalid});
        }

        const {email, oldPassword} = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: {
                    email: email
                }
            });
    
            if (userExists) {
                return res
                    .status(400)
                    .json({error: msg.user.update.error.err_email_already_used});
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword, authConfig.secret))) {
            return res
                    .status(401)
                    .json({error: msg.user.update.error.err_password_invalid});
        }

        const update = await user.update(req.body);

        return res
            .json({success: msg.user.update.success});
    }
    
    async delete(req, res) {
        return res.json();
    }
}

export default new UserController();