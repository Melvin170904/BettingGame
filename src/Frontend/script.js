// Simple in-memory data for leagues and matches
const leagues = {
    premier: {
        name: "Premier League",
        matches: [
            {
                teams: "Arsenal vs Chelsea",
                time: "Today 20:00",
                market: "Match Result",
                odds: { home: 1.90, draw: 3.40, away: 3.80 }
            },
            {
                teams: "Liverpool vs Man City",
                time: "Today 17:30",
                market: "Match Result",
                odds: { home: 2.40, draw: 3.60, away: 2.60 }
            },
            {
                teams: "Spurs vs Newcastle",
                time: "Tomorrow 16:00",
                market: "Match Result",
                odds: { home: 2.10, draw: 3.50, away: 3.20 }
            }
        ]
    },
    champions: {
        name: "Champions League",
        matches: [
            {
                teams: "Real Madrid vs Bayern",
                time: "Wed 20:00",
                market: "Match Result",
                odds: { home: 2.00, draw: 3.70, away: 3.30 }
            },
            {
                teams: "PSG vs Barcelona",
                time: "Tue 20:00",
                market: "Match Result",
                odds: { home: 2.30, draw: 3.60, away: 2.90 }
            }
        ]
    },
    championship: {
        name: "Championship",
        matches: [
            {
                teams: "Leeds vs Southampton",
                time: "Sat 15:00",
                market: "Match Result",
                odds: { home: 2.10, draw: 3.20, away: 3.40 }
            },
            {
                teams: "Leicester vs Ipswich",
                time: "Sat 12:30",
                market: "Match Result",
                odds: { home: 1.85, draw: 3.50, away: 4.20 }
            }
        ]
    },
    international: {
        name: "International",
        matches: [
            {
                teams: "England vs France",
                time: "Fri 19:45",
                market: "Match Result",
                odds: { home: 2.60, draw: 3.10, away: 2.70 }
            },
            {
                teams: "Brazil vs Argentina",
                time: "Sat 01:00",
                market: "Match Result",
                odds: { home: 2.20, draw: 3.40, away: 3.00 }
            }
        ]
    }
};

let currentLeagueKey = "premier";
let selections = []; // each selection: {teams, market, pick, odds}

// DOM elements
const leagueTitle = document.getElementById("leagueTitle");
const matchesContainer = document.getElementById("matchesContainer");
const navButtons = document.querySelectorAll(".nav-btn");
const betslipSelectionsDiv = document.getElementById("betslipSelections");
const stakeInput = document.getElementById("stakeInput");
const totalOddsSpan = document.getElementById("totalOdds");
const potentialReturnSpan = document.getElementById("potentialReturn");
const placeBetBtn = document.getElementById("placeBetBtn");

// Render matches for current league
function renderMatches() {
    const league = leagues[currentLeagueKey];
    leagueTitle.textContent = league.name;
    matchesContainer.innerHTML = "";

    league.matches.forEach((match, index) => {
        const card = document.createElement("div");
        card.className = "match-card";

        const infoDiv = document.createElement("div");
        infoDiv.className = "match-info";
        infoDiv.innerHTML = `
            <div class="match-teams">${match.teams}</div>
            <div class="match-time">${match.time}</div>
            <div class="match-market">${match.market}</div>
        `;

        const homeAwayDiv = document.createElement("div");
        homeAwayDiv.className = "odds-group";

        const homeBtn = document.createElement("button");
        homeBtn.className = "odds-btn";
        homeBtn.textContent = `Home ${match.odds.home.toFixed(2)}`;
        homeBtn.addEventListener("click", () => addSelection(match, "Home", match.odds.home));

        const drawBtn = document.createElement("button");
        drawBtn.className = "odds-btn";
        drawBtn.textContent = `Draw ${match.odds.draw.toFixed(2)}`;
        drawBtn.addEventListener("click", () => addSelection(match, "Draw", match.odds.draw));

        const awayBtn = document.createElement("button");
        awayBtn.className = "odds-btn";
        awayBtn.textContent = `Away ${match.odds.away.toFixed(2)}`;
        awayBtn.addEventListener("click", () => addSelection(match, "Away", match.odds.away));

        homeAwayDiv.appendChild(homeBtn);
        homeAwayDiv.appendChild(drawBtn);
        homeAwayDiv.appendChild(awayBtn);

        // Empty third column for spacing / future markets
        const emptyDiv = document.createElement("div");

        card.appendChild(infoDiv);
        card.appendChild(homeAwayDiv);
        card.appendChild(emptyDiv);

        matchesContainer.appendChild(card);
    });
}

// Add selection to bet slip
function addSelection(match, pick, odds) {
    selections.push({
        teams: match.teams,
        market: match.market,
        pick: pick,
        odds: odds
    });
    renderBetslip();
}

// Render bet slip
function renderBetslip() {
    if (selections.length === 0) {
        betslipSelectionsDiv.textContent = "No selections yet. Tap odds to add a bet.";
        totalOddsSpan.textContent = "1.00";
        potentialReturnSpan.textContent = "£0.00";
        return;
    }

    betslipSelectionsDiv.innerHTML = "";
    selections.forEach((sel, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "betslip-selection-item";

        const headerDiv = document.createElement("div");
        headerDiv.className = "betslip-selection-header";
        headerDiv.innerHTML = `
            <span>${sel.teams}</span>
            <span>${sel.odds.toFixed(2)}</span>
        `;

        const marketDiv = document.createElement("div");
        marketDiv.className = "betslip-selection-market";
        marketDiv.textContent = `${sel.market} – ${sel.pick}`;

        itemDiv.appendChild(headerDiv);
        itemDiv.appendChild(marketDiv);

        betslipSelectionsDiv.appendChild(itemDiv);
    });

    updateTotals();
}

// Update total odds and potential return
function updateTotals() {
    let totalOdds = 1.0;
    selections.forEach(sel => {
        totalOdds *= sel.odds;
    });

    totalOddsSpan.textContent = totalOdds.toFixed(2);

    const stake = parseFloat(stakeInput.value) || 0;
    const potential = stake * totalOdds;
    potentialReturnSpan.textContent = `£${potential.toFixed(2)}`;
}

// Handle league switching
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentLeagueKey = btn.getAttribute("data-league");
        renderMatches();
        // Clear selections when switching league (simpler for coursework)
        selections = [];
        renderBetslip();
    });
});

// Update potential return when stake changes
stakeInput.addEventListener("input", updateTotals);

// Place bet (simple alert for now)
placeBetBtn.addEventListener("click", () => {
    const stake = parseFloat(stakeInput.value) || 0;
    if (selections.length === 0) {
        alert("Please add at least one selection to your bet slip.");
        return;
    }
    if (stake <= 0) {
        alert("Please enter a valid stake amount.");
        return;
    }

    const totalOdds = parseFloat(totalOddsSpan.textContent);
    const potential = stake * totalOdds;

    alert(
        `Bet placed!\n\nSelections: ${selections.length}\nStake: £${stake.toFixed(2)}\nTotal Odds: ${totalOdds.toFixed(2)}\nPotential Return: £${potential.toFixed(2)}`
    );

    // After placing bet, clear slip (for now)
    selections = [];
    stakeInput.value = "0";
    renderBetslip();
});

// Initial render
renderMatches();
renderBetslip();
