import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function getLike(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const like = await prisma.like.findUnique({
            where: { id: Number(id) }
        });

        if (!like) {
            return reply.status(404).send({ message: "Like não encontrado" });
        }

        return reply.status(200).send(like);
    } catch (err) {
        console.error("ERRO AO BUSCAR LIKE:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar like" });
    }
}
