import { Router } from "express";
import { getTournamentById } from "./tournaments.controller.js";

export const tournamentsRouter = Router();

tournamentsRouter.get("/:id", getTournamentById);
