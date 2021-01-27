import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta // Trabalha o dado

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
/*
    É verificada a autenticação em todas as rotas
    Caso queira aplicar a verificação em rotas específicas, use ex: get('/', ensureAuthenticated, async ...)
*/
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
}); */

// POST https://localhost:3333/apointments
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
