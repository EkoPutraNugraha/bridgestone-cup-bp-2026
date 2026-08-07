import{shell,scheduleView,standingView,bracketView}from'./sports.js';
import{futsalEntries,futsalGroups,futsalSchedule,futsalScorers}from'./data/futsal-data.js';
const host=document.querySelector('#sport-view');
const scorers=()=>`<aside class="top-scorers"><header><span>PLAYER RANKING</span><h2>TOP SCORER</h2></header><div>${futsalScorers.map((player,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><strong>${player[0]}</strong><span>${player[1]} GOALS</span></article>`).join('')}</div></aside>`;
shell('Futsal',[{id:'group-standing',label:'Group Standing'},{id:'bracket',label:'Bracket'},{id:'schedule',label:'Schedule'}],id=>{host.innerHTML=id==='group-standing'?standingView(futsalGroups.map(g=>g.teams)):id==='schedule'?scheduleView(futsalSchedule.map(x=>[x.time,x.home,x.away,x.round])):bracketView('TOURNAMENT BRACKET',futsalEntries.map(x=>[x.name,x.score]))+scorers()});
