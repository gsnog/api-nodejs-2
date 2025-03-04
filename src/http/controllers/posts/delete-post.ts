import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const post = await prisma.post.findUnique({
        where: { id: Number(id) }
    });

    if (!post || post.userId !== request.user.sub) {
        return reply.status(403).send({ message: "Você só pode deletar seus próprios posts" });
    }

    try {
        await prisma.post.delete({ where: { id: Number(id) } });

        return reply.status(204).send();
    } catch (err) {
        console.error("ERRO AO DELETAR POST:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar post" });
    }
}
