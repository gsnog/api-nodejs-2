import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function findLikesByPost(request: FastifyRequest, reply: FastifyReply) {
    const { postId } = request.params as { postId: string };

    try {
        const likes = await prisma.like.findMany({
            where: { postId: Number(postId) }
        });

        return reply.status(200).send(likes);
    } catch (err) {
        console.error("❌ ERRO AO BUSCAR LIKES DO POST:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar likes do post" });
    }
}
