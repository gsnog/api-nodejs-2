import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createPostSchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
    });

    try {
        const { titulo, conteudo } = createPostSchema.parse(request.body);
        const userId = Number(request.user.sub); // ✅ Convertendo userId para número

        const prismaPostRepository = new PrismaPostRepository();
        const post = await prismaPostRepository.create({ titulo, conteudo, userId });

        return reply.status(201).send(post);
    } catch (err) {
        console.error("ERRO AO CRIAR POST:", err);
        return reply.status(500).send({ 
            message: "Erro interno ao criar post", 
            error: err instanceof Error ? err.message : "Erro desconhecido"
        });
    }
}


    