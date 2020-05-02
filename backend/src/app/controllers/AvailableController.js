import {startOfDay, endOfDay, parseISO, addHours, isWeekend} from 'date-fns';
import {Op} from 'sequelize';

import msg from '../../config/msgs';

import Appointment from '../models/Appointment';

class AvailableController {
    async index(req, res) {
        const provider_id = req.params.id;
        const date = req.body.date;

        const appointments = Appointment.findAll({
            where: {
                provider_id : provider_id,
                date: {
                    [Op.between]: [
                        startOfDay(parseISO(date)),
                        endOfDay(parseISO(date)),
                    ]
                }
            }
        });

        const businessDay = [];

        for (let i = 8; i <= 18; i++) {
            businessDay.push(startOfDay(parseISO(date)).addHours(i));
        }

        return res.json(businessDay);
    }  
}

export default new AvailableController();