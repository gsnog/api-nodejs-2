import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function getComment(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const comment = await prisma.comentario.findUnique({
            where: { id: Number(id) },
            include: { user: { select: { nome: true, foto: true } }, post: true }
        });

        if (!comment) {
            return reply.status(404).send({ message: "Comentário não encontrado" });
        }

        return reply.status(200).send(comment);
    } catch (err) {
        console.error("ERRO AO BUSCAR COMENTÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar comentário" });
    }
}
