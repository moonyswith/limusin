// СПИСОК ВАШИХ ПЕСЕН (Укажите точные названия файлов из папки songs)
const tracks = [
    "Caramelldancing (Christmas Version).mp3",
    "Jenny .mp3",
    "The Weeknd - Blinding Lights.mp3",
    "Джиган - На расслабоне.mp3",
    "MACAN - Спой.mp3",
    "MACAN - Спой.mp3",   // Добавьте сюда остальные треки через запятую
];

const audio = document.getElementById('audio-player');
const playlistElement = document.getElementById('playlist');
const currentTitle = document.getElementById('current-title');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const searchInput = document.getElementById('search-input');
document.getElementById('count').innerText = tracks.length;

let currentIndex = 0;

// Инициализация списка
function initPlaylist() {
    playlistElement.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerText = track.replace('.mp3', '');
        li.setAttribute('data-index', index); // Сохраняем исходный индекс
        li.addEventListener('click', () => loadTrack(index, true));
        playlistElement.appendChild(li);
    });
}

// Загрузка трека
function loadTrack(index, autoPlay = false) {
    if (tracks.length === 0) return;

    const listItems = playlistElement.getElementsByTagName('li');

    // Снимаем класс active со всех элементов плейлиста
    for (let item of listItems) {
        item.classList.remove('active');
    }

    currentIndex = index;

    // Ищем элемент, у которого сохраненный data-index равен текущему
    const activeItem = Array.from(listItems).find(item => parseInt(item.getAttribute('data-index')) === currentIndex);

    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    audio.src = 'songs/' + tracks[currentIndex];
    currentTitle.innerText = tracks[currentIndex].replace('.mp3', '');

    if (autoPlay) {
        audio.play().catch(e => console.log("Нажмите Play для старта"));
    }
}

// Следующий трек
function nextTrack() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= tracks.length) nextIndex = 0;
    loadTrack(nextIndex, true);
}

// Предыдущий трек
function prevTrack() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = tracks.length - 1;
    loadTrack(prevIndex, true);
}

// ЛОГИКА ЖИВОГО ПОИСКА
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const listItems = playlistElement.getElementsByTagName('li');

    for (let item of listItems) {
        const text = item.innerText.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block'; // Показываем трек
        } else {
            item.style.display = 'none';  // Скрываем трек
        }
    }
});

// Слушатели событий управления
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audio.addEventListener('ended', nextTrack);

// Старт плеера
initPlaylist();
loadTrack(0, false);
