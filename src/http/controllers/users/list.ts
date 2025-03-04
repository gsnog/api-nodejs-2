import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, nome: true, email: true, foto: true }
        });
        

        return reply.status(200).send(users);
    } catch (err) {
        console.error("ERRO AO LISTAR USUÁRIOS:", err);
        return reply.status(500).send({ message: "Erro interno ao listar usuários" });
    }
}
