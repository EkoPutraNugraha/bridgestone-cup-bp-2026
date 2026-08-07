import{shell}from'./sports.js';
const host=document.querySelector('#sport-view');
const teams=[
 ['BANBURY','BANGUN','HENDI'],['EXT','RODI','DOLI'],['CUTT','KARIRI','SUPRIYADI'],['TAS','SUMEDI','IQBAL'],
 ['RMH . TWH','SUKANDAR','INDRAYANA'],['TUBE','UJANG','DINDIN'],['TBS','MAHMUDI','ICHSAN'],['ENG','ARIS H','KASWOTO'],
 ['PSS','ALAMUDIN','ARI M'],['CURING','LUCKY K','APEP'],['FINAL INSP','ROHMAT','MINAN'],['W/S','M AIYAR','YOYO S'],
 ['INMEC','IKHSAN S.','ARIEF S.'],['TECH. QA','PROBINSA','WAWAN R.'],['SHE/KSP','SAMSUL H','YUYUN F']
];
const winner=()=>`<section class="fishing-layout"><div><p class="section-kicker">BRIDGESTONE CUP BP 2026</p><h1 class="section-title">WINNER FISHING</h1><div class="champion"><small>CHAMPION</small><strong>CURING</strong></div></div><article class="winner-panel"><h2>STANDING SCORE</h2>${teams.slice(0,7).map((team,i)=>`<div class="ranking-row"><small>RANK ${i+1}</small><strong>${team[0]}</strong><b>${8-i} POINT</b></div>`).join('')}</article></section>`;
const teamCards=()=>`<h1 class="section-title">FISHING TEAM PAIRS</h1><section class="participant-grid">${teams.map(team=>`<article class="participant"><b>${team[0]}</b><div class="team-pair"><strong>${team[1]}</strong><strong>${team[2]}</strong></div></article>`).join('')}<article class="participant event-date"><b>PERTANDINGAN DILAKSANAKAN</b><strong>SABTU, 13 DESEMBER 2025</strong><small>07.00 WIB • EMPANG IKAN MAS BUNGUR</small></article></section>`;
shell('Fishing',[{id:'bracket',label:'Bracket'},{id:'winner',label:'Winner Fishing'}],id=>host.innerHTML=id==='bracket'?teamCards():winner());
