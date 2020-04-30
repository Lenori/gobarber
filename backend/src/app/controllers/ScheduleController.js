import {startOfDay, endOfDay, parseISO} from 'date-fns';
import {Op} from 'sequelize';

import msg from '../../config/msgs';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
    async index(req, res) {
        const isProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true
            }
        })

        if (!isProvider) {
            return res
                .status(401)
                .json({error: msg.schedule.index.error.err_user_not_provider});
        }

        const {page = 1, perPage = 5, date = new Date()} = req.query;

        if (perPage == 0) {
            perPage = 1;
        }

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parseISO(date)),
                        endOfDay(parseISO(date)),
                    ]
                }
            },
            limit: perPage,
            offset: (page - 1) * perPage,
            attributes: ['id', 'date'],
            order: ['date'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        return res.json(appointments);
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

export default new ScheduleController();