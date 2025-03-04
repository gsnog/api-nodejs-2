import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { updateUser } from "./update";
import { profile } from "./profile";
import { verifyJWT } from "@/http/controllers/middlewares/verify-jwt";
import { refresh } from "./refresh";
import { listUsers } from "./list";

export function userRoutes(app: FastifyInstance) {
    app.post("/users", register); 
    app.post("/authenticate", authenticate); 
    
    app.patch("/token/refresh", refresh); 

    // Rotas protegidas com `verifyJWT`
    app.get("/users/:userId", { preHandler: [verifyJWT] }, get); 
    app.delete("/users/:id", { preHandler: [verifyJWT] }, deleteUser); 
    app.patch("/users/:id", { preHandler: [verifyJWT] }, updateUser); 
    app.get("/profile", { preHandler: [verifyJWT] }, profile); 
    app.get("/users", listUsers)
}