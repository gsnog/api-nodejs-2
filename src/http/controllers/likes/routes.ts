import { FastifyInstance } from "fastify";
import { createLike } from "./create";
import { verifyJWT } from "@/http/controllers/middlewares/verify-jwt";
import { deleteLike } from "./delete";
import { getLike } from "./get";
import { findLikesByPost } from "./find-by-post";

export function likesRoutes(app: FastifyInstance) {
    app.post("/likes", { preHandler: [verifyJWT] }, createLike); 
    app.delete("/likes/:id", { preHandler: [verifyJWT] }, deleteLike);
    app.get("/likes/:id", getLike);
    app.get("/likes/post/:postId", findLikesByPost);
}
