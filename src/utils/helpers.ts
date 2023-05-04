import {Request, Response} from 'express';

function checkMethod (req: Request, res: Response) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}

export = checkMethod;