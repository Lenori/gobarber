import {startOfDay, endOfDay, setSeconds, setMinutes, setHours,format, isAfter} from 'date-fns';
import {Op} from 'sequelize';

import msg from '../../config/msgs';

import Appointment from '../models/Appointment';

class AvailableController {
    async index(req, res) {
        const provider_id = req.params.id;
        const {date} = req.query;

        if (!date) {
            return res
                .status(400)
                .json(msg.available.index.error.err_date_not_provided);
        }

        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id : provider_id,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(searchDate),
                        endOfDay(searchDate),
                    ]
                }
            }
        });

        const schedule = [];

        for (let i = 8; i <= 18; i++) {
            let hour = ('0' + i).slice(-2);
            schedule.push(`${hour}:00`);
        }

        const available = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available: isAfter(value, new Date()) && !appointments.find(a => format(a.date, 'HH:mm') === time)
            }
        });

        return res.json(available);
    }
}

export default new AvailableController();