import { Request, Response } from "express";
import { listarResultados } from "./resultados.service";

export default [
    {
        path: "/api/v1/resultados",
        method: "get",
        handler: [
            async (_req: Request, res: Response) => {
                const resultado = await listarResultados();
                res.status(200).send(resultado);
            },
        ],
    },
];
