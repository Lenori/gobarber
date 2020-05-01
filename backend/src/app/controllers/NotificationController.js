import msg from '../../config/msgs';

import User from '../models/User';

import Notification from '../schemas/Notification';

class NotificationController {
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
                .json({error: msg.notification.index.error.err_user_not_provider});
        }

        const notifications = await Notification
        .find({
            user: req.userId
        })
        .sort({createdAt: 'desc'})
        .limit(20);

        return res
            .status(200)
            .json(notifications);
    }

    async store(req, res) {
        return res
            .status(200)
            .json();
    }

    async update(req, res) {
        const {id} = req.params;

        const isProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true
            }
        })

        if (!isProvider) {
            return res
                .status(401)
                .json({error: msg.notification.update.error.err_user_not_provider});
        }

        const notificationExists = await Notification
            .findOne({
                user: req.userId,
                _id: id
            });

        if (!notificationExists) {
            return res
                .status(400)
                .json({error: msg.notification.update.error.err_notification_not_found});
        }

        const notification = await Notification
            .findByIdAndUpdate(
                id,
                {read: true},
                {new: true}
            )

        return res
            .status(200)
            .json(notification);

    }
    
    async delete(req, res) {
        return res.json();
    }    
}

export default new NotificationController();