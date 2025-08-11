
// script.js

let playerHP = 100;
let currentAnimal = null;

const animals = [
    { name: "หมาป่า", hp: 30, damage: 10 },
    { name: "หมี", hp: 50, damage: 20 },
    { name: "เสือ", hp: 40, damage: 15 },
    { name: "กระต่าย", hp: 10, damage: 2 },
    { name: "หมูป่า", hp: 35, damage: 8 }
];

function logMessage(msg) {
    const log = document.getElementById("log");
    log.innerHTML += msg + "<br>";
    log.scrollTop = log.scrollHeight;
}

function updatePlayerHP() {
    document.getElementById("player-hp").textContent = playerHP;
}

function findAnimal() {
    if (currentAnimal) {
        logMessage("คุณยังไม่ได้กำจัดสัตว์ตัวก่อน!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * animals.length);
    const foundAnimal = { ...animals[randomIndex] };
    currentAnimal = foundAnimal;
    document.getElementById("current-animal").textContent = `${foundAnimal.name} (HP: ${foundAnimal.hp})`;
    logMessage(`คุณพบ ${foundAnimal.name}!`);
}

function attackAnimal() {
    if (!currentAnimal) {
        logMessage("ยังไม่มีสัตว์ให้โจมตี");
        return;
    }

    const playerDamage = Math.floor(Math.random() * 10) + 5;
    currentAnimal.hp -= playerDamage;
    logMessage(`คุณโจมตี ${currentAnimal.name} และทำดาเมจ ${playerDamage}`);

    if (currentAnimal.hp <= 0) {
        logMessage(`คุณกำจัด ${currentAnimal.name} ได้สำเร็จ!`);
        currentAnimal = null;
        document.getElementById("current-animal").textContent = "-";
        return;
    } else {
        document.getElementById("current-animal").textContent = `${currentAnimal.name} (HP: ${currentAnimal.hp})`;
    }

    // สัตว์โต้กลับ
    const enemyDamage = currentAnimal.damage;
    playerHP -= enemyDamage;
    updatePlayerHP();
    logMessage(`${currentAnimal.name} โต้กลับและทำดาเมจ ${enemyDamage}`);

    if (playerHP <= 0) {
        logMessage("คุณตายแล้ว... เกมจบ");
        playerHP = 0;
        updatePlayerHP();
    }
}
