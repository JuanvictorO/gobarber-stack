import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

// TODO SERVICE TEM UM ÚNICO MÉTODO
// Não tem acesso aos dados da requisitação e resposta
/**
 * Recebimento das informações
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('this appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
