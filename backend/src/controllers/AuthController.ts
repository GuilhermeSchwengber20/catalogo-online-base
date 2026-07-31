import { Request, Response } from 'express';
import { LoginService } from '../services/auth/LoginService';
import { loginSchema } from '../schemas/loginSchema';

export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await this.loginService.execute(data.email, data.senha);
    res.json({ success: true, data: result });
  }
}
