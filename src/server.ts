import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { Database } from "./database";
import { schedule } from "node-cron";
import { importarDados } from "./services/importacao/importacao.service";

process.on("uncaughtException", (e) => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

(async () => {
    await Database.connect();

    const task = schedule("0 6,12,18,0 * * *", async () => {
        console.log("JOB: Executando processo de importação automático");
        await importarDados();
        console.log("JOB: Feito");
    });

    server.listen(PORT, () => {
        task.start();
        console.log(`Server is running http://localhost:${PORT}...`);
    });
})();
