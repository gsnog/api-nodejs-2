import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function findCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };

    try {
        const comments = await prisma.comentario.findMany({
            where: { userId: Number(userId) },
            include: { post: true }
        });

        return reply.status(200).send(comments);
    } catch (err) {
        console.error("ERRO AO BUSCAR COMENTÁRIOS DO USUÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar comentários do usuário" });
    }
}
