// Simple in-memory data (later replaced by backend)
const markets = {
    football: [
        { id: 1, name: "Team A to Win", odds: 1.8 },
        { id: 2, name: "Team B to Win", odds: 2.2 },
        { id: 3, name: "Draw", odds: 3.5 }
    ],
    horses: [
        { id: 4, name: "Lightning Bolt", odds: 4.0 },
        { id: 5, name: "Thunder Hooves", odds: 6.5 }
    ],
    specials: [
        { id: 6, name: "Over 3.5 Goals", odds: 2.8 },
        { id: 7, name: "Both Teams to Score", odds: 1.9 }
    ]
};

let currentSection = "football";
let selectedBets = [];

function renderMarkets() {
    const list = document.getElementById("market-list");
    list.innerHTML = "";

    markets[currentSection].forEach(bet => {
        const div = document.createElement("div");
        div.className = "bet-item";

        const text = document.createElement("span");
        text.textContent = `${bet.name} (Odds: ${bet.odds})`;

        const btn = document.createElement("button");
        btn.textContent = "Add";
        btn.onclick = () => addBet(bet);

        div.appendChild(text);
        div.appendChild(btn);
        list.appendChild(div);
    });
}

function addBet(bet) {
    if (!selectedBets.some(b => b.id === bet.id)) {
        selectedBets.push(bet);
        renderSlip();
    }
}

function removeBet(id) {
    selectedBets = selectedBets.filter(b => b.id !== id);
    renderSlip();
}

function renderSlip() {
    const container = document.getElementById("selected-bets");
    container.innerHTML = "";

    selectedBets.forEach(bet => {
        const div = document.createElement("div");
        div.className = "bet-item";

        const text = document.createElement("span");
        text.textContent = `${bet.name} (${bet.odds})`;

        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.onclick = () => removeBet(bet.id);

        div.appendChild(text);
        div.appendChild(btn);
        container.appendChild(div);
    });

    updateSummary();
}

function updateSummary() {
    let totalOdds = 1;
    selectedBets.forEach(b => totalOdds *= b.odds);

    const stake = parseFloat(document.getElementById("stake-input").value) || 0;

    document.getElementById("total-odds").textContent = totalOdds.toFixed(2);
    document.getElementById("potential-return").textContent = (stake * totalOdds).toFixed(2);
}

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => {
        currentSection = btn.dataset.section;
        renderMarkets();
    };
});

document.getElementById("stake-input").oninput = updateSummary;

document.getElementById("place-bet").onclick = () => {
    if (selectedBets.length === 0) {
        alert("Select at least one bet.");
        return;
    }
    alert("Bet placed (frontend only).");
};

renderMarkets();
