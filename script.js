const suaraKlik = document.getElementById('suaraKlik');
const laguLanjut = document.getElementById('laguLanjut');
const laguOnline = document.getElementById('laguOnline');
const malwarePopup = document.getElementById('malwarePopup');
const btnLanjut = document.getElementById('btnLanjut');
const btnReset = document.getElementById('btnReset');
const btnOnline = document.getElementById('btnOnline');
const btnOffline = document.getElementById('btnOffline');
const warningPopup = document.getElementById('warningPopup');
const loadingScreen = document.getElementById('loadingScreen');
const loginScreen = document.getElementById('loginScreen');
const mainMenu = document.getElementById('mainMenu');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

let getarInterval;

// MUNCULIN WARNING PERTAMA SETELAH 5 DETIK
setTimeout(() => {
    warningPopup.style.display = 'flex';
}, 5000);

// TOMBOL ONLINE - TAMBAH NYALAIN lagu2.mp3
btnOnline.onclick = () => {
    warningPopup.style.display = 'none';
    loadingScreen.style.display = 'flex';

    // TAMBAHAN: NYALAIN LAGU ONLINE
    laguOnline.currentTime = 0;
    laguOnline.play();

    let progress = 0;
    const progressBar = document.getElementById('progress');
    const loadingText = document.getElementById('loadingText');
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        loadingText.innerText = `Connecting to server ${progress}%`;
        if(progress >= 100){
            clearInterval(interval);
            loadingScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
        }
    }, 50);
};

// TOMBOL OFFLINE
btnOffline.onclick = () => {
    alert('Mode offline belum tersedia');
};

// LOGIN - TAMBAH MATIIN lagu2.mp3
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === "vanstr" && password === "113100") {
        // TAMBAHAN: MATIIN LAGU ONLINE PAS MASUK TOOLS
        laguOnline.pause();
        laguOnline.currentTime = 0;

        loginScreen.style.display = 'none';
        mainMenu.style.display = 'block';

        setTimeout(() => {
            malwarePopup.style.display = 'flex';
        }, 2000);
    } else {
        errorMsg.innerText = 'Username / Password salah!';
    }
};

// TOMBOL LANJUT - TAMBAH NYALAIN lagu.mp3
btnLanjut.onclick = () => {
    suaraKlik.currentTime = 0;
    suaraKlik.play();

    // TAMBAHAN: NYALAIN lagu.mp3
    laguLanjut.currentTime = 0;
    laguLanjut.play();

    if ("vibrate" in navigator) {
        clearInterval(getarInterval);
        getarInterval = setInterval(() => {
            navigator.vibrate(500);
        }, 1000);
    }

    malwarePopup.style.display = 'none';
};

// TOMBOL RESET - TAMBAH STOP SEMUA LAGU
btnReset.onclick = () => {
    navigator.vibrate(0);
    clearInterval(getarInterval);

    // TAMBAHAN: STOP SEMUA LAGU
    laguOnline.pause();
    laguLanjut.pause();

    location.reload();
};

// STOP GETAR KALO TUTUP TAB
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        navigator.vibrate(0);
        clearInterval(getarInterval);
    }
});

// MATRIX EFFECT - UTUH GAK DIUBAH
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;
const columns = canvas.width/fontSize;
const rainDrops = [];
for(let x = 0; x < columns; x++) rainDrops[x] = 1;
const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};
setInterval(draw, 30);
