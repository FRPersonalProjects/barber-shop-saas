import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  @Inject() // injetando o prisma service
  private readonly prisma: PrismaService; // criando uma propriedade prisma do tipo PrismaService

  // metodo para buscar usuario por id
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    // retorna o usuario encontrado ou null
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput, // id do usuario
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // metodo para buscar todos os usuarios
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // metodo para criar usuario
  async create(data: Prisma.UserCreateInput): Promise<User> {
    // retorna o usuario criado
    const saltOrRounds = 10;
    const password = data.password;
    data.password = await bcrypt.hash(password, saltOrRounds);
    return this.prisma.user.create({
      data, // dados do usuario para criar
    });
  }

  // metodo para atualizar usuario
  async update(params: {
    // metodo para atualizar usuario
    where: Prisma.UserWhereUniqueInput; // id
    data: Prisma.UserUpdateInput; // dados para atualizar o usuario
  }): Promise<User> {
    if (params.data.password) {
      // se senha for alterada, criptografar novamente
      const saltOrRounds = 10;
      const pwdField = params.data.password;
      if (typeof pwdField === 'string') {
        params.data.password = await bcrypt.hash(pwdField, saltOrRounds);
      } else if ('set' in pwdField && typeof pwdField.set === 'string') {
        params.data.password = {
          set: await bcrypt.hash(pwdField.set, saltOrRounds),
        };
      }
    }
    const { where, data } = params; // mandando conteudo do params para where e data
    return this.prisma.user.update({
      // atualizando o usuario
      data, // dados para atualizar
      where, // id
    });
  }

  // metodo para deletar usuario
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    // retorna o usuario deletado
    return this.prisma.user.delete({
      where, // id
    });
  }
}
