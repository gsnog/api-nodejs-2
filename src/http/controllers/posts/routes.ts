import { FastifyInstance } from "fastify";
import { register } from "./register";
import { list } from "./list";
import { deletePost } from "./delete-post";
import { updatePost } from "./update-post";
import { findPostById } from "./find-post-by-id";
import { findPostsByUser } from "./find-by-user";
import { verifyJWT } from "@/http/controllers/middlewares/verify-jwt";

export function postsRoutes(app: FastifyInstance) {
    app.post("/posts", { preHandler: [verifyJWT] }, register); 
    app.get("/posts", list); 
    app.get("/posts/:id", findPostById); 
    app.get("/posts/user/:userId", findPostsByUser); 

    app.patch("/posts/:id", { preHandler: [verifyJWT] }, updatePost); 
    app.delete("/posts/:id", { preHandler: [verifyJWT] }, deletePost); 
}

