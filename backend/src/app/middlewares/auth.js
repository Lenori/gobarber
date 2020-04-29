import JWT from 'jsonwebtoken';
import {promisify} from 'util';

import authConfig from '../../config/auth';
import msg from '../../config/msgs';

export default async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res
            .status(401)
            .json({error: msg.auth.error.err_token_not_sent});
    }

    const [, token] = auth.split(' ');

    try {
        const decoded = await promisify(JWT.verify)(token, authConfig.secret);       
        req.userId = decoded.id;

        return next();
    } catch(err) {
        return res
        .status(401)
        .json({error: msg.auth.error.err_token_invalid});
    }
};