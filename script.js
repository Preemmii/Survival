let player = {
    hp: 100,
    gold: 0
};

const animals = [
    { name: "กระต่าย", gold: 5, damage: 0 },
    { name: "หมูป่า", gold: 10, damage: 5 },
    { name: "หมาป่า", gold: 15, damage: 10 },
    { name: "หมี", gold: 25, damage: 20 }
];

function hunt() {
    const animal = animals[Math.floor(Math.random() * animals.length)];
    let log = `คุณพบ ${animal.name}! `;

    // ได้ทอง
    player.gold += animal.gold;
    log += `ได้ทอง +${animal.gold} 🪙 `;

    // ถ้าสัตว์ทำดาเมจ
    if (animal.damage > 0) {
        player.hp -= animal.damage;
        log += `แต่โดนโจมตีเสีย ❤️ ${animal.damage}`;
    }

    // ถ้าตาย
    if (player.hp <= 0) {
        player.hp = 0;
        log += " 😵 คุณตายแล้ว!";
        document.querySelector("button").disabled = true;
    }

    updateUI();
    addLog(log);
}

function updateUI() {
    document.getElementById("player-hp").textContent = player.hp;
    document.getElementById("player-gold").textContent = player.gold;
}

function addLog(message) {
    const logDiv = document.getElementById("log");
    const p = document.createElement("p");
    p.textContent = message;
    logDiv.prepend(p);
}
