import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserUseCase } from "@/use-cases/get-user-use-case"
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error"

export async function get(request: FastifyRequest, reply: FastifyReply) {
    // ✅ Criando a validação correta para userId nos parâmetros da rota
    const getParamsSchema = z.object({
        userId: z.coerce.number(), // 🔥 Converte userId para número automaticamente
    });

    const { userId } = getParamsSchema.parse(request.params);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository);
        const user = await getUserUseCase.execute({ userId });

        return reply.status(200).send({ user });
    } catch (err) {
        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
