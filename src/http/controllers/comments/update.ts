import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.user.sub;

    const updateCommentSchema = z.object({
        conteudo: z.string().min(1, "Comentário não pode estar vazio").optional()
    });

    try {
        const comment = await prisma.comentario.findUnique({ where: { id: Number(id) } });

        if (!comment || comment.userId !== userId) {
            return reply.status(403).send({ message: "Você só pode editar seus próprios comentários" });
        }

        const data = updateCommentSchema.parse(request.body);

        const updatedComment = await prisma.comentario.update({
            where: { id: Number(id) },
            data
        });

        return reply.status(200).send(updatedComment);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR COMENTÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao atualizar comentário" });
    }
}
