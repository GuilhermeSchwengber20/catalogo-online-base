import { IClienteRepository } from '../../repositories/IClienteRepository';
import { AppError } from '../../shared/AppError';
import { UpdateClienteDTO } from '../../dtos/ClienteDTO';

export class UpdateClienteService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(id: string, data: UpdateClienteDTO) {
    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado', 404);
    }

    return this.clienteRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
