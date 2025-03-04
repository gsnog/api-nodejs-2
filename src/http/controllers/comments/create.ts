import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
    const createCommentSchema = z.object({
        postId: z.number(),
        conteudo: z.string().min(1, "Comentário não pode ser vazio")
    });

    try {
        const { postId, conteudo } = createCommentSchema.parse(request.body);
        const userId = request.user.sub; 

        const comment = await prisma.comentario.create({
            data: {
                userId,
                postId,
                conteudo
            }
        });

        return reply.status(201).send(comment);
    } catch (err) {
        console.error("ERRO AO CRIAR COMENTÁRIO:", err);
        return reply.status(500).send({ message: "Erro interno ao criar comentário" });
    }
}
