import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function createLike(request: FastifyRequest, reply: FastifyReply) {
    const createLikeSchema = z.object({
        postId: z.number().optional(),
        comentarioId: z.number().optional()
    });

    try {
        const { postId, comentarioId } = createLikeSchema.parse(request.body);
        const userId = request.user.sub; 

        if (!postId && !comentarioId) {
            return reply.status(400).send({ message: "Você deve fornecer um postId ou comentarioId" });
        }

        const like = await prisma.like.create({
            data: {
                userId,
                postId,
                comentarioId
            }
        });

        return reply.status(201).send(like);
    } catch (err) {
        console.error("ERRO AO CRIAR LIKE:", err);
        return reply.status(500).send({ message: "Erro interno ao criar like" });
    }
}
