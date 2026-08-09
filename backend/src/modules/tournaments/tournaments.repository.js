import { tournaments } from "../../data/tournaments.data.js";

export function findTournamentById(id) {
  return tournaments.find((tournament) => tournament.id === id);
}

export function findTournamentsBySportId(sportId) {
  return tournaments.filter((tournament) => tournament.sportId === sportId);
}
