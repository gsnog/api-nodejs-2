import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const post = await prisma.post.findUnique({
        where: { id: Number(id) }
    });

    if (!post || post.userId !== request.user.sub) {
        return reply.status(403).send({ message: "Você só pode atualizar seus próprios posts" });
    }

    const updatePostSchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional(),
    });

    try {
        const data = updatePostSchema.parse(request.body);

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data
        });

        return reply.status(200).send(updatedPost);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR POST:", err);
        return reply.status(500).send({ message: "Erro interno ao atualizar post" });
    }
}

