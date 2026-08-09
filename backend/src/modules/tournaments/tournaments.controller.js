import { getTournament, listTournamentsBySport } from "./tournaments.service.js";

export function getTournamentById(request, response) {
  response.status(200).json({ success: true, data: getTournament(request.params.id) });
}

export function getTournamentsBySport(request, response) {
  const result = listTournamentsBySport(request.params.slug);
  response.status(200).json({
    success: true,
    data: result.tournaments,
    meta: { total: result.tournaments.length, sport: result.sport.slug },
  });
}
