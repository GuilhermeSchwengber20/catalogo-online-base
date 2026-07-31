import { IClienteRepository } from '../../repositories/IClienteRepository';
import { AppError } from '../../shared/AppError';

export class GetClienteService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(id: string) {
    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado', 404);
    }

    return cliente;
  }
}
