import { AppError } from "../../shared/app-error.js";
import { getSport } from "../sports/sports.service.js";
import { findTournamentById, findTournamentsBySportId } from "./tournaments.repository.js";

export function getTournament(id) {
  const tournament = findTournamentById(id);
  if (!tournament) throw new AppError(404, "Tournament not found");
  return tournament;
}

export function listTournamentsBySport(slug) {
  const sport = getSport(slug);
  return {
    sport,
    tournaments: findTournamentsBySportId(sport.id),
  };
}
