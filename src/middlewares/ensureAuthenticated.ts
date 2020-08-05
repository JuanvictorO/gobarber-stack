import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validação token jwt
    // Pega o valor do header com o token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing.');
    }

    /*
    o Token vai vir com: Bearrer asijdfhlkasgfh(token)
    ele vai repartir para pegar apenas o token
    A primeira parte, o "Bearrer", não vai existir, está antes da vírgula
    o token será atribuído a const token
    */
    const [, token] = authHeader.split('');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        console.log(decoded);

        return next();
    } catch {
        throw new Error('Invalid JWT token.');
    }
}
