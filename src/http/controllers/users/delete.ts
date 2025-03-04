import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    if (Number(id) !== request.user.sub) {
        return reply.status(403).send({ message: "Você só pode deletar sua própria conta" });
    }

    try {
        await prisma.user.delete({ where: { id: Number(id) } });

        return reply.status(204).send();
    } catch (err) {
        console.error("ERRO AO DELETAR USUÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar usuário" });
    }
}
