import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function listComments(request: FastifyRequest, reply: FastifyReply) {
    try {
        const comments = await prisma.comentario.findMany({
            include: { user: { select: { nome: true, foto: true } }, post: true }
        });

        return reply.status(200).send(comments);
    } catch (err) {
        console.error("ERRO AO LISTAR COMENTÁRIOS:", err);
        return reply.status(500).send({ message: "Erro interno ao listar comentários" });
    }
}
