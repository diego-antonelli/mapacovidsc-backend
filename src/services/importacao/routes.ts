import { Request, Response } from "express";
import { importarDados } from "./importacao.service";

export default [
    {
        path: "/api/v1/importar",
        method: "get",
        handler: [
            async (_req: Request, res: Response) => {
                const result = await importarDados();
                res.status(200).send(result);
            },
        ],
    },
];
