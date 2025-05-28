const soalContainer = document.getElementById("soal");
const jawabanContainer = document.getElementById("jawaban");
const hasilContainer = document.getElementById("hasil");
const skorContainer = document.getElementById("skor");
const nomorSoalContainer = document.getElementById("nomor-soal");
const startButton = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const kuisContainer = document.getElementById("kuis-container");


const pertanyaan = [
    {
        soal: "Apa ibu kota Indonesia?",
        jawaban: ["Jakarta", "Surabaya", "Bandung", "Medan"],
        jawabanBenar: "Jakarta",
    },
    {
        soal: "Apa ibu kota Jepang?",
        jawaban: ["Hiroshima", "Tokyo", "Kyoto", "Nagasaki"],
        jawabanBenar: "Tokyo",
    },
    {
        soal: "Indonesia merdeka pada tahun?",
        jawaban: ["1947", "1950", "1945", "1965"],
        jawabanBenar: "1945",
    },
    {
        soal: "Siapa yang menjadi presiden pertama Indonesia",
        jawaban: ["Mohammad Hatta", "Soeharto", "Soekarno", "Megawati Soekarno Putri"],
        jawabanBenar: "Soekarno",
    },
    {
        soal: "Siapakah yang menciptakan lagu Indonesia Raya?",
        jawaban: ["Soekarno", "W.R Supratman", "Ismail Marzuki", "Husein Mutahar"],
        jawabanBenar: "W.R Supratman",
    },
];

let skor = 0;
let soalSaatIni = 0;
let timerInterval;
let waktu = 5;
const timerContainer = document.createElement("div");
document.getElementById("kuis-container").prepend(timerContainer);

const beepSound = new Audio('audio/beep.mp3');

startButton.addEventListener("click", () => {
    startContainer.style.display = "none";
    kuisContainer.style.display = "block";
    updateSkor();
    updateNomorSoal();
    tampilkanSoal();
});

function updateSkor() {
    skorContainer.textContent = `Skor: ${skor}`;
}

function updateNomorSoal() {
    nomorSoalContainer.textContent = `Soal: ${soalSaatIni + 1} / ${pertanyaan.length}`;
}

function mulaiTimer() {
    waktu = 5;
    timerContainer.textContent = `Waktu: ${waktu} detik`;
    beepSound.play();
    timerInterval = setInterval(() => {
        waktu--;
        if (waktu > 0) {
            timerContainer.textContent = `Waktu: ${waktu} detik`;
            beepSound.play();
        } else {
            clearInterval(timerInterval);
            timerContainer.textContent = `Waktu: 0 detik`;
            cekJawaban(null);
        }
    }, 1000);
}

function tampilkanSoal() {
    clearInterval(timerInterval);
    const soal = pertanyaan[soalSaatIni];
    soalContainer.textContent = soal.soal;
    jawabanContainer.innerHTML = "";
    soal.jawaban.forEach((jawaban) => {
        const tombol = document.createElement("button");
        tombol.textContent = jawaban;
        tombol.addEventListener("click", () => {
            cekJawaban(jawaban);
        });
        jawabanContainer.appendChild(tombol);
    });
    updateNomorSoal();
    mulaiTimer();
}

function cekJawaban(jawaban) {
    clearInterval(timerInterval);
    const soal = pertanyaan[soalSaatIni];
    if (jawaban === soal.jawabanBenar) {
        skor++;
        updateSkor();
    }
    soalSaatIni++;
    if (soalSaatIni < pertanyaan.length) {
        tampilkanSoal();
    } else {
        tampilkanHasil();
    }
}

function tampilkanHasil() {
    soalContainer.textContent = "";
    jawabanContainer.innerHTML = "";
    timerContainer.textContent = "";
    nomorSoalContainer.textContent = "";

    hasilContainer.textContent = "";
    const hasilText = document.createElement("p");
    hasilText.textContent = `Kuis selesai! Skor akhir Anda: ${skor} dari ${pertanyaan.length}.`;
    hasilContainer.appendChild(hasilText);

    setTimeout(() => {
        window.location.href = "Portofolio.html";
    }, 2000);
}


















