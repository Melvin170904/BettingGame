// -------------------------------
// DATA
// -------------------------------

const matches = [
    {
        teams: "Arsenal vs Chelsea",
        time: "Today 20:00",
        odds: { home: 1.90, draw: 3.40, away: 3.80 }
    },
    {
        teams: "Liverpool vs Man City",
        time: "Today 17:30",
        odds: { home: 2.40, draw: 3.60, away: 2.60 }
    },
    {
        teams: "Spurs vs Newcastle",
        time: "Tomorrow 16:00",
        odds: { home: 2.10, draw: 3.50, away: 3.20 }
    }
];

const results = [
    { match: "Arsenal 2 - 1 Chelsea", date: "Today" },
    { match: "Liverpool 1 - 1 Man City", date: "Today" },
    { match: "Spurs 3 - 0 Newcastle", date: "Yesterday" }
];

let betHistory = JSON.parse(localStorage.getItem("betHistory")) || [];
let selections = [];


// -------------------------------
// RENDER MATCHES
// -------------------------------

function renderMatches() {
    const container = document.getElementById("matchesContainer");
    container.innerHTML = "";

    matches.forEach(m => {
        const card = document.createElement("div");
        card.className = "match-card";

        card.innerHTML = `
            <div class="match-teams">${m.teams}</div>
            <div class="match-time">${m.time}</div>

            <div class="odds-group">
                <button class="odds-btn">Home ${m.odds.home}</button>
                <button class="odds-btn">Draw ${m.odds.draw}</button>
                <button class="odds-btn">Away ${m.odds.away}</button>
            </div>
        `;

        const buttons = card.querySelectorAll(".odds-btn");
        buttons[0].onclick = () => addSelection(m, "Home", m.odds.home);
        buttons[1].onclick = () => addSelection(m, "Draw", m.odds.draw);
        buttons[2].onclick = () => addSelection(m, "Away", m.odds.away);

        container.appendChild(card);
    });
}


// -------------------------------
// ADD SELECTION
// -------------------------------

function addSelection(match, pick, odds) {
    selections.push({
        teams: match.teams,
        pick,
        odds
    });

    renderBetslip();
}


// -------------------------------
// RENDER BET SLIP
// -------------------------------

function renderBetslip() {
    const container = document.getElementById("betslipSelections");

    if (selections.length === 0) {
        container.textContent = "No selections yet. Tap odds to add a bet.";
        updateTotals();
        return;
    }

    container.innerHTML = "";

    selections.forEach(sel => {
        const div = document.createElement("div");
        div.className = "betslip-selection-item";

        div.innerHTML = `
            <strong>${sel.teams}</strong><br>
            ${sel.pick} @ ${sel.odds}
        `;

        container.appendChild(div);
    });

    updateTotals();
}


// -------------------------------
// UPDATE TOTALS
// -------------------------------

function updateTotals() {
    let totalOdds = 1;
    selections.forEach(s => totalOdds *= s.odds);

    document.getElementById("totalOdds").textContent = totalOdds.toFixed(2);

    const stake = parseFloat(document.getElementById("stakeInput").value) || 0;
    const potential = stake * totalOdds;

    document.getElementById("potentialReturn").textContent = `£${potential.toFixed(2)}`;
}


// -------------------------------
// PLACE BET
// -------------------------------

document.getElementById("placeBetBtn").onclick = () => {
    const stake = parseFloat(document.getElementById("stakeInput").value);

    if (selections.length === 0 || stake <= 0) return;

    let totalOdds = 1;
    selections.forEach(s => totalOdds *= s.odds);

    const potentialReturn = stake * totalOdds;

    betHistory.push({
        selections: [...selections],
        stake,
        totalOdds,
        potentialReturn,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("betHistory", JSON.stringify(betHistory));

    selections = [];
    document.getElementById("stakeInput").value = 0;

    renderBetslip();
    renderMyBets();
};


// -------------------------------
// RENDER RESULTS
// -------------------------------

function renderResults() {
    const container = document.getElementById("resultsList");
    container.innerHTML = "";

    results.forEach(r => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.textContent = `${r.match} — ${r.date}`;
        container.appendChild(div);
    });
}


// -------------------------------
// RENDER MY BETS
// -------------------------------

function renderMyBets() {
    const container = document.getElementById("myBetsList");
    container.innerHTML = "";

    if (betHistory.length === 0) {
        container.textContent = "You have no bets yet.";
        return;
    }

    betHistory.forEach(b => {
        const div = document.createElement("div");
        div.className = "mybet-item";

        div.innerHTML = `
            <strong>${b.selections[0].teams}</strong><br>
            ${b.selections[0].pick} @ ${b.selections[0].odds}<br>
            Stake: £${b.stake}<br>
            Return: £${b.potentialReturn.toFixed(2)}<br>
            <span class="bet-date">${b.date}</span>
        `;

        container.appendChild(div);
    });
}


// -------------------------------
// TAB SWITCHING
// -------------------------------

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.dataset.tab;

        document.querySelectorAll(".tab-section").forEach(sec => {
            sec.style.display = sec.id === tab ? "block" : "none";
        });
    });
});


// -------------------------------
// INITIAL LOAD
// -------------------------------

renderMatches();
renderResults();
renderMyBets();
renderBetslip();
