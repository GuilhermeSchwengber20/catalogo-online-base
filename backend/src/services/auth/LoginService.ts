import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUsuarioRepository } from '../../repositories/IUsuarioRepository';
import { AppError } from '../../shared/AppError';
import { env } from '../../config/env';

export class LoginService {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async execute(email: string, senha: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    if (!usuario.ativo) {
      throw new AppError('Usuário inativo', 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const token = jwt.sign({ id: usuario.id }, env.jwtSecret, { expiresIn: '7d' });

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}
