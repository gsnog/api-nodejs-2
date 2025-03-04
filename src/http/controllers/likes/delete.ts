import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.user.sub;

    try {
        const like = await prisma.like.findUnique({ where: { id: Number(id) } });

        if (!like || like.userId !== userId) {
            return reply.status(403).send({ message: "Você só pode deletar seus próprios likes" });
        }

        await prisma.like.delete({ where: { id: Number(id) } });

        return reply.status(204).send();
    } catch (err) {
        console.error("ERRO AO DELETAR LIKE:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar like" });
    }
}
