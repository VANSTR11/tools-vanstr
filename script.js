// EFEK CMATRIX BACKGROUND - LANGSUNG JALAN
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
resizeCanvas();

const letters = '01ABCDEFVANSTR11';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
for(let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    for(let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
let matrixInterval = setInterval(drawMatrix, 33);
window.addEventListener('resize', resizeCanvas);

// LOGIC UTAMA
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('warningPopup');
    const loadingScreen = document.getElementById('loadingScreen');
    const loginScreen = document.getElementById('loginScreen');
    const mainMenu = document.getElementById('mainMenu');
    const malwarePopup = document.getElementById('malwarePopup');
    
    // 1. MUNCULIN POPUP SETELAH 5 DETIK
    setTimeout(() => { popup.style.display = 'flex'; }, 5000);

    // 2. OFFLINE = KELUAR
    document.getElementById('btnOffline').onclick = () => window.location.href = 'about:blank';

    // 3. ONLINE = MULAI LOADING
    document.getElementById('btnOnline').onclick = function() {
        popup.style.display = 'none';
        loadingScreen.style.display = 'flex';
        startLoading();
    };

    // 4. LOADING 10 DETIK, ABIS ITU MUNCUL LOGIN
    function startLoading() {
        let progress = 0;
        const loadingText = document.getElementById('loadingText');
        const progressBar = document.getElementById('progress');
        let interval = setInterval(() => {
            progress++;
            progressBar.style.width = progress + '%';
            loadingText.innerText = `Connecting to server ${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                loadingScreen.style.display = 'none';
                loginScreen.style.display = 'flex';
            }
        }, 100);
    }

    // 5. LOGIC LOGIN
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');

        // GANTI USERNAME & PASSWORD DI SINI
        const usernameBenar = 'admin';
        const passwordBenar = '12345';

        if (user === usernameBenar && pass === passwordBenar) {
            errorMsg.innerText = '';
            clearInterval(matrixInterval); // MATIIN CMATRIX BIAR GAK BERAT
            canvas.style.display = 'none';
            loginScreen.style.display = 'none';
            mainMenu.style.display = 'flex';
            
            // MUNCULIN POPUP MALWARE SETELAH 2 DETIK
            setTimeout(() => {
                malwarePopup.style.display = 'flex';
            }, 2000);
        } else {
            errorMsg.innerText = 'Username atau Password salah!';
        }
    });

    // 6. LOGIC TOMBOL POPUP MALWARE
    document.getElementById('btnReset').onclick = function() {
        malwarePopup.style.display = 'none';
        mainMenu.style.display = 'none';
        loginScreen.style.display = 'flex';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        // NYALAIN LAGI CMATRIX DI LOGIN
        canvas.style.display = 'block';
        matrixInterval = setInterval(drawMatrix, 33);
    };

    document.getElementById('btnLanjut').onclick = function() {
        malwarePopup.style.display = 'none';
    };

    // 7. FALLBACK KALO VIDEO ERROR
    const video1 = document.getElementById('bgVideo');
    const video2 = document.getElementById('toolsBgVideo');
    if(video1) video1.onerror = () => { canvas.style.display = 'block'; }
    if(video2) video2.onerror = () => { canvas.style.display = 'block'; }
});
