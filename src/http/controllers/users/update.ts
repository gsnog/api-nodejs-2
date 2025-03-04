import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    console.log("ID na URL:", id);
    console.log("ID do usuário autenticado:", request.user.sub);

    if (Number(id) !== request.user.sub) {
        return reply.status(403).send({ message: "Você só pode atualizar seu próprio perfil" });
    }

    const updateUserSchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        foto: z.string().optional(),
    });

    try {
        const data = updateUserSchema.parse(request.body);

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data
        });

        return reply.status(200).send(updatedUser);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR USUÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao atualizar usuário" });
    }
}

