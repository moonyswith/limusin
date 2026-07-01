const tracks = [
    "Balada x Danza Kuduro.mp3",
    "BEAUTIFUL.mp3",
    "купер.mp3",
    "CUPSIZE ты любишь танцевать.mp3",
    "темный принц - вклубе.mp3",
    "Наступит ночь.mp3",
    "CUPSIZE семнадцать ножевых.mp3",
    "Jenny.mp3",
    "Caramelldancing.mp3",
    "супермаркет.mp3",
    "карта в блоке.mp3",
    "madk1d - ты че обиделась.mp3",
    "Бабки.mp3",
    "THE SWEET ESCAPE.mp3",
    "Where Them Girls At.mp3",
    "Stereo Love speed up.mp3",
    "Сайт.mp3",
    "The days.mp3",
    "Memories.mp3",
    "LIT.mp3",
    "КОЛПАКИ.mp3",
    "Just Dance (speed up).mp3",
    "Eva (Kavkaz remix).mp3",
    "Borderline.mp3",
    "2 pac kavkaz.mp3",
    "Martine Rose.mp3",
    "я с карамельной сучкой.mp3",
    "No Broke Boys.mp3",
    "Moscow Never Sleeps.mp3",
    "Spotlight.mp3",
    "In My Mind.mp3",
    "PSYCHO UMI.mp3",
    "All Star.mp3",
    "Shape Of You.mp3",
    "Queen St.mp3",
    "Деньги не главное.mp3",
    "киса потеряла интерес.mp3",
    "I like the you kiss me.mp3",
    "Paper Planes.mp3",
    "Джована.mp3",
    "Четыре Украинки.mp3",
    "бродяга.mp3",
    "Чумачечая весна.mp3",
    "18 мне уже.mp3",
    "Женщина, я не танцую.mp3",
    "До рассвета.mp3",
    "Именно та.mp3",
    "Черные глаза.mp3",
    "Между нами любовь.mp3",
    "маршрутка.mp3",
    "Ты Говорила 2.mp3",
    "Три дня дождя - Демоны.mp3",
    "темный принц - ПАПА.mp3",
    "Страшный дом.mp3",
    "распять.mp3",
    "Бьёт бит.mp3",
    "гладиатор рыцарь.mp3",
    "Ты не мой.mp3",
    "Мелом.mp3",
    "Макс Корж Жить в кайф.mp3",
    "Light It Up.mp3"

];


const audio = document.getElementById('audio-player');
const playlistElement = document.getElementById('playlist');
const currentTitle = document.getElementById('current-title');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const searchInput = document.getElementById('search-input');
document.getElementById('count').innerText = tracks.length;


let currentIndex = 0;


function initPlaylist() {
    playlistElement.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerText = track.replace('.mp3', '');
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => loadTrack(index, true));
        playlistElement.appendChild(li);
    });
}

function loadTrack(index, autoPlay = false) {
    if (tracks.length === 0) return;

    const listItems = playlistElement.getElementsByTagName('li');

    // Снимаем класс active со всех элементов плейлиста
    for (let item of listItems) {
        item.classList.remove('active');
    }

    currentIndex = index;

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
