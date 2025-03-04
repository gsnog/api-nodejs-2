import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.user.sub;

    try {
        const comment = await prisma.comentario.findUnique({ where: { id: Number(id) } });

        if (!comment || comment.userId !== userId) {
            return reply.status(403).send({ message: "Você só pode deletar seus próprios comentários" });
        }

        await prisma.comentario.delete({ where: { id: Number(id) } });

        return reply.status(204).send();
    } catch (err) {
        console.error("ERRO AO DELETAR COMENTÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar comentário" });
    }
}
