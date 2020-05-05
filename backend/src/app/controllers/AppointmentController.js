import * as Yup from 'yup';
import {startOfHour, parseISO, isBefore, format, subHours} from 'date-fns';
import pt from 'date-fns/locale/pt';

import msg from '../../config/msgs';

import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
    async index(req, res) {
        const {page = 1, perPage = 5} = req.query;

        if (perPage == 0) {
            perPage = 1;
        }

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            limit: perPage,
            offset: (page - 1) * perPage,
            attributes: ['id', 'date', 'past', 'cancelable'],
            order: ['date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['path', 'url']
                        }
                    ]
                }
            ]
        });

        return res.json(appointments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_request_format_invalid});
        }

        const {provider_id, date} = req.body;

        if (provider_id == req.userId) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_user_same_as_provider});
        }

        const userExists = await User.findOne({
            where: {
                id: provider_id
            }
        })

        if (!userExists) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_user_not_found});
        }

        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true
            }
        })

        if (!isProvider) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_user_not_provider});
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_date_past});
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id: provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({error: msg.appointment.create.error.err_date_not_available});
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id: provider_id,
            date: hourStart
        });

        const {name} = await User.findByPk(req.userId);

        await Notification.create({
            content: 'Novo agendamento de '+ name +' para ' + format(hourStart, "dd 'de' MMMM', às' H'h'mm", {locale: pt}),
            user: provider_id
        })

        return res
            .json({
                success: msg.appointment.create.success,
                appointment: {
                    id: appointment.id,
                    date: appointment.date
                }
        });
    }

    async update(req, res) {
        return res.json();
    }
    
    async delete(req, res) {
        const {id} = req.params;

        const appointment = await Appointment.findByPk(id,
            {include: [
                {
                model: User,
                as: 'provider',
                attributes: ['name', 'email']
                },
                {
                model: User,
                as: 'user',
                attributes: ['name', 'email']
                }
            ]}
        );

        if (!appointment) {
            return res
                .status(400)
                .json({error: msg.appointment.delete.error.err_appointment_not_found});
        }

        if (appointment.canceled_at !== null) {
            return res
                .status(400)
                .json({error: msg.appointment.delete.error.err_appintment_already_cancelled});
        }

        if (appointment.user_id !== req.userId) {
            return res
                .status(401)
                .json({error: msg.appointment.delete.error.err_user_not_owner});
        }

        const dateLimit = subHours(appointment.date, 2);
        
        if (isBefore(dateLimit, new Date())) {
            return res
                .status(401)
                .json({error: msg.appointment.delete.error.err_appointment_too_soon});
        }

        await appointment.update({canceled_at: new Date()});

        await Queue.add(CancellationMail.key, {appointment});

        return res
            .status(200)
            .json({success: msg.appointment.delete.success});
    }    
}

export default new AppointmentController();