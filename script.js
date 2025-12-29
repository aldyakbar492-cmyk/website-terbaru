const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
let selectedMonth = new Date().getMonth();
let selectedYear = new Date().getFullYear();
let currentDay = null;

function init() {
    const mSelect = document.getElementById('monthSelect');
    const ySelect = document.getElementById('yearSelect');

    let monthOptions = "";
    months.forEach((m, i) => monthOptions += `<option value="${i}">${m}</option>`);
    mSelect.innerHTML = monthOptions;
    mSelect.value = selectedMonth;

    let yearOptions = "";
    for(let i = 2024; i <= 3000; i++) yearOptions += `<option value="${i}">${i}</option>`;
    ySelect.innerHTML = yearOptions;
    ySelect.value = selectedYear;

    render();
}

function render() {
    const roadmap = document.getElementById('roadmap');
    const days = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const storageKey = `roadmap_${selectedMonth}_${selectedYear}`;
    const data = JSON.parse(localStorage.getItem(storageKey)) || {};

    let cardsHTML = "";
    for (let i = 1; i <= days; i++) {
        const hasData = data[i] && data[i].trim() !== "";
        // Logika baru: jika ada data tampilkan "Tersimpan", jika tidak tampilkan "Kosong"
        const displayText = hasData ? "Tersimpan" : "<i>Kosong</i>";
        const statusClass = hasData ? "saved" : "";
        
        cardsHTML += `
            <div class="day-card ${hasData ? 'active' : ''}" onclick="openModal(${i})">
                <div class="day-num">${i}</div>
                <div class="task-content ${statusClass}">${displayText}</div>
            </div>
        `;
    }
    roadmap.innerHTML = cardsHTML;
}

function openModal(day) {
    currentDay = day;
    const storageKey = `roadmap_${selectedMonth}_${selectedYear}`;
    const data = JSON.parse(localStorage.getItem(storageKey)) || {};
    document.getElementById('modalDateDisplay').innerText = `${day} ${months[selectedMonth]} ${selectedYear}`;
    document.getElementById('taskInput').value = data[day] || '';
    document.getElementById('taskModal').style.display = 'flex';
}

function closeModal() { document.getElementById('taskModal').style.display = 'none'; }

function saveTask() {
    const storageKey = `roadmap_${selectedMonth}_${selectedYear}`;
    const data = JSON.parse(localStorage.getItem(storageKey)) || {};
    const val = document.getElementById('taskInput').value;
    if (val.trim()) data[currentDay] = val; else delete data[currentDay];
    localStorage.setItem(storageKey, JSON.stringify(data));
    closeModal();
    render();
}

function changePeriod() {
    selectedMonth = parseInt(document.getElementById('monthSelect').value);
    selectedYear = parseInt(document.getElementById('yearSelect').value);
    render();
}

// Jalankan fungsi inisialisasi saat script dimuat
init();