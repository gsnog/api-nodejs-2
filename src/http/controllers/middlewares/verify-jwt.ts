import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        user: {
            sub: number;
        };
    }
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify(); 

        console.log("🔑 Payload JWT:", request.user); 

        request.user.sub = Number(request.user.sub);

    } catch (err) {
        console.error("ERRO JWT:", err);
        return reply.status(401).send({ message: "unauthorized" });
    }
}
