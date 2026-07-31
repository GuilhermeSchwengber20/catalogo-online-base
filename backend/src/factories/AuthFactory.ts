import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { LoginService } from '../services/auth/LoginService';
import { AuthController } from '../controllers/AuthController';

export function makeAuthController(): AuthController {
  const repository = new UsuarioRepository();
  const loginService = new LoginService(repository);
  return new AuthController(loginService);
}
