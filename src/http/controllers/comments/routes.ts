import { FastifyInstance } from "fastify";
import { createComment } from "./create";
import { verifyJWT } from "@/http/controllers/middlewares/verify-jwt";
import { listComments } from "./list";
import { deleteComment } from "./delete";
import { updateComment } from "./update";
import { findCommentsByUser } from "./find-by-user";
import { getComment } from "./get";

export function commentsRoutes(app: FastifyInstance) {
    app.post("/comments", { preHandler: [verifyJWT] }, createComment);
    app.get("/comments", listComments); 
    app.delete("/comments/:id", { preHandler: [verifyJWT] }, deleteComment);
    app.patch("/comments/:id", { preHandler: [verifyJWT] }, updateComment);
    app.get("/comments/user/:userId", findCommentsByUser);
    app.get("/comments/:id", getComment);
}
