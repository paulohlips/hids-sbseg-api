import { Router } from "express";
import cors from "cors";

import RulesController from "./app/controllers/RulesController";

const routes = new Router();

routes.use(cors());

routes.get("/tweets", (req, res) => {
    return res.json([{ _id: 1, tweet: "ESSE É UM TESTE" }]);
});

routes.post("/tweets", (req, res) => {
    //console.log("INFO NO SOCKET", req.io);

    //req.io.emit("tweet", { _id: 1, tweet: "AAAAAAAAAAAAAAA" });
    return res.json({ tweet: "É O QUE TEM", _id: 1 });
});

routes.get("/", (req, res) => {
    return res.send("Bem-vindo");
});

routes.get("/rules", RulesController.index);
routes.post("/rules", RulesController.store);
routes.put("/rules/:id", RulesController.update);
routes.delete("/rules/:id", RulesController.delete);

export default routes;
