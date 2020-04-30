import msg from '../../config/msgs';

import File from '../models/File';

class FileController {
    async index(req, res) {
        return res.json();
    }

    async store(req, res) {
        const {originalname: name, filename: path} = req.file;

        const file = await File.create({
            name,
            path
        });

        return res.json({
            success: msg.file.create.success,
            file: {
                id: file.id,
                path: file.path
            }
        });
    }

    async update(req, res) {
        return res.json();
    }
    
    async delete(req, res) {
        return res.json();
    }    
}

export default new FileController();