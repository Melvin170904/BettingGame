// Simple in-memory data to simulate backend data
const events = {
    live: [
        {
            id: 1,
            name: "Team A vs Team B",
            time: "In-Play",
            markets: [
                { id: "1H", label: "Team A", odds: 1.85 },
                { id: "1D", label: "Draw", odds: 3.40 },
                { id: "1A", label: "Team B", odds: 2.10 }
            ]
        },
        {
            id: 2,
            name: "Racer X vs Racer Y",
            time: "In-Play",
            markets: [
                { id: "2H", label: "Racer X", odds: 1.60 },
                { id: "2A", label: "Racer Y", odds: 2.50 }
            ]
        }
    ],
    football: [
        {
            id: 3,
            name: "United FC vs City FC",
            time: "Today 19:45",
            markets: [
                { id: "3H", label: "United FC", odds: 2.05 },
                { id: "3D", label: "Draw", odds: 3.20 },
                { id: "3A", label: "City FC", odds: 2.70 }
            ]
        },
        {
            id: 4,
            name: "Lions vs Tigers",
            time: "Today 21:00",
            markets: [
                { id: "4H", label: "Lions", odds: 1.95 },
                { id: "4D", label: "Draw", odds: 3.60 },
                { id: "4A", label: "Tigers", odds: 3.10 }
            ]
        }
    ],
    horses: [
        {
            id: 5,
            name: "3:15 Kempton - Sprint Handicap",
            time: "Today 15:15",
            markets: [
                { id: "5H1", label: "Lightning Bolt", odds: 4.00 },
                { id: "5H2", label: "Thunder Hooves", odds: 5.50 },
                { id: "5H3", label: "Midnight Runner", odds: 7.00 }
            ]
        }
    ],
    specials: [
        {
            id: 6,
            name: "Weekend Special - Goals",
            time: "This Weekend",
            markets: [
                { id: "6M1", label: "Over 3.5 Goals", odds: 2.80 },
                { id: "6M2", label: "Both Teams To Score", odds: 1.90 }
            ]
        }
    ]
};

let currentSection = "live";
let selectedBets = [];
let userBalance = 100.0;

// Render events for current section
function renderEvents() {
    const list = document.getElementById("event-list");
    const title = document.getElementById("section-title");

    list.innerHTML = "";

    if (currentSection === "live") {
        title.textContent = "Live Bets";
    } else if (currentSection === "football") {
        title.textContent = "Football";
    } else if (currentSection === "horses") {
        title.textContent = "Horse Racing";
    } else if (currentSection === "specials") {
        title.textContent = "Specials";
    }

    const sectionEvents = events[currentSection];

    sectionEvents.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";

        const header = document.createElement("div");
        header.className = "event-header";

        const nameSpan = document.createElement("span");
        nameSpan.className = "event-name";
        nameSpan.textContent = ev.name;

        const timeSpan = document.createElement("span");
        timeSpan.className = "event-time";
        timeSpan.textContent = ev.time;

        header.appendChild(nameSpan);
        header.appendChild(timeSpan);
        card.appendChild(header);

        const marketRow = document.createElement("div");
        marketRow.className = "market-row";

        ev.markets.forEach(market => {
            const btn = document.createElement("button");
            btn.className = "odds-btn";

            const labelSpan = document.createElement("span");
            labelSpan.className = "odds-label";
            labelSpan.textContent = market.label;

            const oddsSpan = document.createElement("span");
            oddsSpan.className = "odds-value";
            oddsSpan.textContent = market.odds.toFixed(2);

            btn.appendChild(labelSpan);
            btn.appendChild(oddsSpan);

            btn.onclick = () => addSelection(ev, market);

            marketRow.appendChild(btn);
        });

        card.appendChild(marketRow);
        list.appendChild(card);
    });
}

// Add selection to bet slip
function addSelection(eventObj, market) {
    const exists = selectedBets.some(b => b.marketId === market.id);
    if (exists) {
        showMessage("Selection already in bet slip.", false);
        return;
    }

    selectedBets.push({
        eventId: eventObj.id,
        eventName: eventObj.name,
        marketId: market.id,
        marketLabel: market.label,
        odds: market.odds
    });

    renderBetSlip();
}

// Remove selection
function removeSelection(marketId) {
    selectedBets = selectedBets.filter(b => b.marketId !== marketId);
    renderBetSlip();
}

// Render bet slip
function renderBetSlip() {
    const container = document.getElementById("selected-bets");
    container.innerHTML = "";

    if (selectedBets.length === 0) {
        const p = document.createElement("p");
        p.className = "empty-slip";
        p.textContent = "No selections yet. Click odds to add a bet.";
        container.appendChild(p);
    } else {
        selectedBets.forEach(bet => {
            const div = document.createElement("div");
            div.className = "bet-slip-item";

            const line1 = document.createElement("div");
            line1.className = "bet-slip-line1";

            const nameSpan = document.createElement("span");
            nameSpan.textContent = bet.eventName;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-bet";
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => removeSelection(bet.marketId);

            line1.appendChild(nameSpan);
            line1.appendChild(removeBtn);

            const line2 = document.createElement("div");
            line2.className = "bet-slip-line2";

            const marketSpan = document.createElement("span");
            marketSpan.textContent = bet.marketLabel;

            const oddsSpan = document.createElement("span");
            oddsSpan.textContent = `@ ${bet.odds.toFixed(2)}`;

            line2.appendChild(marketSpan);
            line2.appendChild(oddsSpan);

            div.appendChild(line1);
            div.appendChild(line2);

            container.appendChild(div);
        });
    }

    updateSummary();
}

// Update odds and potential return
function updateSummary() {
    let totalOdds = 1;
    selectedBets.forEach(b => {
        totalOdds *= b.odds;
    });

    const stakeInput = document.getElementById("stake-input");
    const stake = parseFloat(stakeInput.value) || 0;

    document.getElementById("total-odds").textContent = totalOdds.toFixed(2);
    document.getElementById("potential-return").textContent = `£${(stake * totalOdds).toFixed(2)}`;
}

// Show message under bet button
function showMessage(text, success) {
    const msg = document.getElementById("bet-message");
    msg.textContent = text;
    msg.style.color = success ? "#22c55e" : "#f97316";
}

// Handle placing bet (frontend only)
function placeBet() {
    const stakeInput = document.getElementById("stake-input");
    const stake = parseFloat(stakeInput.value) || 0;

    if (selectedBets.length === 0) {
        showMessage("Add at least one selection.", false);
        return;
    }

    if (stake <= 0) {
        showMessage("Enter a valid stake.", false);
        return;
    }

    if (stake > userBalance) {
        showMessage("Insufficient balance.", false);
        return;
    }

    let totalOdds = 1;
    selectedBets.forEach(b => totalOdds *= b.odds);
    const potentialReturn = stake * totalOdds;

    userBalance -= stake;
    document.getElementById("user-balance").textContent = `£${userBalance.toFixed(2)}`;

    selectedBets = [];
    renderBetSlip();
    document.getElementById("stake-input").value = "0";
    updateSummary();

    showMessage(`Bet placed! Potential return: £${potentialReturn.toFixed(2)} (simulated).`, true);
}

// Navigation setup
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-item");
    const sideLinks = document.querySelectorAll(".side-link");

    navButtons.forEach(btn => {
        btn.onclick = () => {
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const section = btn.dataset.section;
            if (section) {
                currentSection = section;
                highlightSide(section);
                renderEvents();
            }
        };
    });

    sideLinks.forEach(link => {
        link.onclick = () => {
            const section = link.dataset.section;
            if (section) {
                currentSection = section;
                highlightNav(section);
                highlightSide(section);
                renderEvents();
            }
        };
    });
}

function highlightNav(section) {
    const navButtons = document.querySelectorAll(".nav-item");
    navButtons.forEach(b => {
        if (b.dataset.section === section) {
            b.classList.add("active");
        } else {
            b.classList.remove("active");
        }
    });
}

function highlightSide(section) {
    const sideLinks = document.querySelectorAll(".side-link");
    sideLinks.forEach(l => {
        if (l.dataset.section === section) {
            l.classList.add("active");
        } else {
            l.classList.remove("active");
        }
    });
}

// Stake input listener
document.getElementById("stake-input").oninput = updateSummary;

// Place bet button
document.getElementById("place-bet").onclick = placeBet;

// Initial setup
setupNavigation();
renderEvents();
renderBetSlip();
document.getElementById("user-balance").textContent = `£${userBalance.toFixed(2)}`;
