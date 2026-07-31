import { IClienteRepository } from '../../repositories/IClienteRepository';

export class ListClientesService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute() {
    return this.clienteRepository.findAll();
  }
}
