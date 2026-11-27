/* =========================================================
   MOUNTSEARCH - SEARCH GUNUNG + CAROUSEL INFINITE
   JavaScript Vanilla, tanpa library / API / database.
   ========================================================= */

/* ---------------------------------------------------------
   1. DATA GUNUNG (statis)
   ---------------------------------------------------------
   Setiap gunung punya properti:
   id, nama, lokasi, ketinggian, deskripsi, gambar

   Untuk mengganti gambar, cukup ubah nilai "gambar"
   pada path berikut, lalu letakkan file di folder images/.
   Contoh: gambar: "images/bromo.jpg"
--------------------------------------------------------- */
const gunungList = [
    {
        id: 1,
        nama: "Gunung Bromo",
        lokasi: "Jawa Timur",
        ketinggian: 2329,
        deskripsi: "Gunung dengan panorama matahari terbit yang memukau.",
        gambar: "images/bromo.jpg"
    },
    {
        id: 2,
        nama: "Gunung Semeru",
        lokasi: "Jawa Timur",
        ketinggian: 3676,
        deskripsi: "Keindahan alam dan lanskap pegunungan yang menakjubkan.",
        gambar: "images/semeru.jpg"
    },
    {
        id: 3,
        nama: "Gunung Papandayan",
        lokasi: "Jawa Barat",
        ketinggian: 2665,
        deskripsi: "Destinasi alam dengan padang rumput dan kawah.",
        gambar: "images/papandayan.jpg"
    },
    {
        id: 4,
        nama: "Gunung Rinjani",
        lokasi: "Nusa Tenggara Barat",
        ketinggian: 3726,
        deskripsi: "Gunung dengan danau indah di dalam kawahnya.",
        gambar: "images/rinjani.jpg"
    },
    {
        id: 5,
        nama: "Gunung Merapi",
        lokasi: "Jawa Tengah",
        ketinggian: 2930,
        deskripsi: "Gunung api aktif dengan pemandangan yang dramatis.",
        gambar: "images/merapi.jpg"
    },
    {
        id: 6,
        nama: "Gunung Kerinci",
        lokasi: "Jambi",
        ketinggian: 3805,
        deskripsi: "Gunung tertinggi di Sumatra dengan udara yang sejuk.",
        gambar: "images/kerinci.jpg"
    }
];

/* ---------------------------------------------------------
   2. AMBIL ELEMEN DARI HTML
--------------------------------------------------------- */
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearSearch");
const track = document.getElementById("mountainContainer");
const carousel = document.getElementById("carousel");
const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");
const resultsCount = document.getElementById("resultsCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("carouselDots");

/* ---------------------------------------------------------
   3. STATE CAROUSEL
---------------------------------------------------------
   currentIndex : posisi card paling kiri dalam daftar "extended"
                  (card asli + card kloningan di ujung).
   loopEnabled  : true jika carousel bisa digeser (infinite).
--------------------------------------------------------- */
let currentIndex = 0;
let currentData = [];
let loopEnabled = false;

// Keadaan animasi wrap (cegah klik cepat yang membuat area kosong).
const TRANSITION_MS = 500; // samakan dengan durasi transisi CSS (0.5s)
let isAnimating = false;
let snapTimer = null;
let snapToken = 0; // penanda agar callback lama tidak berlaku

/* ---------------------------------------------------------
   4. BUAT SATU CARD GUNUNG
   ---------------------------------------------------------
   Mengembalikan elemen HTML card berdasarkan data gunung.
   Gambar memakai elemen <img> dengan fallback lokal.
--------------------------------------------------------- */
function buatCard(gunung) {
    const card = document.createElement("div");
    card.className = "mountain-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "mountain-image";

    const img = document.createElement("img");
    img.src = gunung.gambar;
    img.alt = gunung.nama;
    img.loading = "lazy";

    // Jika gambar gagal dimuat, tampilkan placeholder sederhana
    img.onerror = function () {
        this.onerror = null; // cegah loop tak berujung
        this.src = "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">' +
                '<rect width="100%" height="100%" fill="#edf5e7"/>' +
                '<text x="50%" y="50%" font-family="Arial" font-size="28" ' +
                'fill="#568b25" text-anchor="middle" dominant-baseline="middle">' +
                'Gambar tidak tersedia</text></svg>'
            );
    };

    imageWrapper.appendChild(img);

    const info = document.createElement("div");
    info.className = "mountain-info";

    const location = document.createElement("span");
    location.className = "location";
    location.textContent = gunung.lokasi;

    const title = document.createElement("h3");
    title.textContent = gunung.nama;

    const height = document.createElement("span");
    height.className = "mountain-height";
    height.textContent = "⛰ " + gunung.ketinggian + " mdpl";

    const desc = document.createElement("p");
    desc.textContent = gunung.deskripsi;

    const detailBtn = document.createElement("button");
    detailBtn.type = "button";
    detailBtn.className = "detail-button";
    detailBtn.textContent = "Lihat Detail";

    info.appendChild(location);
    info.appendChild(title);
    info.appendChild(height);
    info.appendChild(desc);
    info.appendChild(detailBtn);

    card.appendChild(imageWrapper);
    card.appendChild(info);

    return card;
}

/* ---------------------------------------------------------
   5. HELPER UKURAN & POSISI
--------------------------------------------------------- */

// Jumlah card yang terlihat sesuai breakpoint CSS.
function getVisibleCount() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
}

// Posisi awal (real) terjauh untuk mode non-loop.
function getMaxIndex() {
    return Math.max(0, currentData.length - getVisibleCount());
}

// Jarak geser satu card = lebar card + gap.
function getStep() {
    const firstCard = track.querySelector(".mountain-card");
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cardWidth + gap;
}

/* ---------------------------------------------------------
   6. INTI RENDER CAROUSEL
   ---------------------------------------------------------
   Membangun track. Jika data lebih banyak dari yang terlihat,
   card di ujung dikloning agar loop terlihat mulus (infinite).
--------------------------------------------------------- */
function tampilkanDaftar(daftar) {
    clearSnap(); // batalkan proses wrap yang mungkin sedang berjalan
    currentData = daftar;

    const n = daftar.length;
    const v = getVisibleCount();
    loopEnabled = n > v;

    // Posisi awal: card asli pertama (setelah kloningan awal).
    currentIndex = loopEnabled ? v : 0;

    track.innerHTML = "";
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";

    if (!loopEnabled) {
        // Semua card muat -> tampilkan apa adanya.
        daftar.forEach(function (gunung) {
            track.appendChild(buatCard(gunung));
        });
    } else {
        // 1) Kloningan card terakhir (v card) di paling depan.
        for (let i = n - v; i < n; i++) {
            track.appendChild(buatCard(daftar[i]));
        }
        // 2) Card asli.
        daftar.forEach(function (gunung) {
            track.appendChild(buatCard(gunung));
        });
        // 3) Kloningan card pertama (v card) di paling belakang.
        for (let i = 0; i < v; i++) {
            track.appendChild(buatCard(daftar[i]));
        }
    }

    // Paksa layout lalu aktifkan kembali transisi.
    track.offsetHeight;
    track.style.transition = "";

    buildDots();
    updateCarousel(false); // pasang posisi awal tanpa animasi
}

/* ---------------------------------------------------------
   7. BANGUN INDIKATOR TITIK
--------------------------------------------------------- */
function buildDots() {
    dotsContainer.innerHTML = "";

    const n = currentData.length;
    const total = loopEnabled ? n : (getMaxIndex() + 1);

    for (let i = 0; i < total; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Ke posisi " + (i + 1));
        dot.addEventListener("click", function () {
            goToDot(i);
        });
        dotsContainer.appendChild(dot);
    }
}

/* ---------------------------------------------------------
   8. PERBARUI TAMPILAN (transform, titik, panah)
   ---------------------------------------------------------
   animate = false -> tanpa transisi (untuk lompatan diam).
--------------------------------------------------------- */
function updateCarousel(animate) {
    const step = getStep();

    if (animate === false) {
        track.style.transition = "none";
    } else {
        track.style.transition = "";
    }

    track.style.transform = "translateX(" + (-currentIndex * step) + "px)";

    // Paksa reflow agar lompatan tanpa animasi benar-benar diam.
    if (animate === false) {
        track.offsetHeight;
        track.style.transition = "";
    }

    updateDotsAndArrows();
}

/* Perbarui status titik aktif & panah */
function updateDotsAndArrows() {
    const n = currentData.length;
    const v = getVisibleCount();
    const dots = dotsContainer.children;

    // Tentukan titik aktif (modulo agar konsisten saat di area kloningan).
    let active;
    if (loopEnabled) {
        active = (((currentIndex - v) % n) + n) % n;
    } else {
        active = currentIndex;
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === active);
    }

    // Panah nonaktif hanya jika memang tidak ada yang bisa digeser.
    const canScroll = loopEnabled || getMaxIndex() > 0;
    prevBtn.disabled = !canScroll;
    nextBtn.disabled = !canScroll;
    dotsContainer.style.display = canScroll ? "flex" : "none";
}

/* ---------------------------------------------------------
   9. LOMPATAN TANPA ANIMASI (penyempurnaan loop)
--------------------------------------------------------- */
function jumpNoAnim(index) {
    currentIndex = index;
    updateCarousel(false);
}

/* Batalkan proses wrap yang sedang berjalan (jika ada). */
function clearSnap() {
    snapToken++; // buat callback lama menjadi tidak berlaku
    if (snapTimer) {
        clearTimeout(snapTimer);
        snapTimer = null;
    }
    isAnimating = false;
}

/* Setelah animasi selesai, lompat diam ke posisi yang setara.
   Dipakai saat slide melewati area kloningan ujung.
   Menggunakan penguncian + fallback timer agar klik cepat aman. */
function snapAfterTransition(targetIndex) {
    isAnimating = true;
    const myToken = snapToken;
    let done = false;

    function finish() {
        if (done) return;
        done = true;
        if (myToken !== snapToken) return; // sudah dibatalkan / list berubah

        track.removeEventListener("transitionend", onEnd);
        if (snapTimer) {
            clearTimeout(snapTimer);
            snapTimer = null;
        }
        jumpNoAnim(targetIndex);
        isAnimating = false;
    }

    function onEnd(event) {
        // Hanya tanggapi transisi transform pada track.
        if (event.target !== track || event.propertyName !== "transform") return;
        finish();
    }

    track.addEventListener("transitionend", onEnd);

    // Fallback bila transitionend tidak sempat muncul (mis. tab tidak aktif).
    snapTimer = setTimeout(finish, TRANSITION_MS + 60);
}

/* ---------------------------------------------------------
   10. PINDAH SLIDE (INFINITE)
--------------------------------------------------------- */
function slideNext() {
    if (isAnimating) return; // abaikan klik saat proses wrap berlangsung
    const n = currentData.length;
    const v = getVisibleCount();

    if (!loopEnabled) {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateCarousel(true);
        }
        return;
    }

    currentIndex++;
    updateCarousel(true);

    // Sudah masuk area kloningan ujung -> lompat diam ke card asli pertama.
    if (currentIndex >= v + n) {
        snapAfterTransition(currentIndex - n);
    }
}

function slidePrev() {
    if (isAnimating) return; // abaikan klik saat proses wrap berlangsung
    const n = currentData.length;
    const v = getVisibleCount();

    if (!loopEnabled) {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel(true);
        }
        return;
    }

    currentIndex--;
    updateCarousel(true);

    // Sudah masuk area kloningan awal -> lompat diam ke card asli terakhir.
    if (currentIndex < v) {
        snapAfterTransition(currentIndex + n);
    }
}

/* Klik titik indikator */
function goToDot(i) {
    clearSnap(); // batalkan wrap yang mungkin sedang berjalan
    if (loopEnabled) {
        currentIndex = getVisibleCount() + i; // card asli ke-i
    } else {
        currentIndex = i;
    }
    updateCarousel(true);
}

/* ---------------------------------------------------------
   11. PESAN "TIDAK DITEMUKAN"
--------------------------------------------------------- */
function tampilkanTidakDitemukan() {
    clearSnap(); // batalkan proses wrap yang mungkin sedang berjalan
    currentData = [];
    loopEnabled = false;
    currentIndex = 0;

    track.innerHTML = "";
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    track.offsetHeight;
    track.style.transition = "";

    const box = document.createElement("div");
    box.className = "not-found";

    const title = document.createElement("h3");
    title.textContent = "Gunung tidak ditemukan";

    const desc = document.createElement("p");
    desc.textContent = "Coba cari dengan nama gunung yang lain.";

    box.appendChild(title);
    box.appendChild(desc);
    track.appendChild(box);

    dotsContainer.innerHTML = "";
    updateDotsAndArrows();
}

/* ---------------------------------------------------------
   12. MODE "GUNUNG POPULER" (input kosong)
--------------------------------------------------------- */
function tampilkanPopuler() {
    sectionSubtitle.textContent = "DESTINASI PILIHAN";
    sectionTitle.textContent = "Gunung Populer";
    resultsCount.textContent = "";
    tampilkanDaftar(gunungList);
}

/* ---------------------------------------------------------
   13. JALANKAN PENCARIAN
   ---------------------------------------------------------
   - Tidak sensitif huruf besar/kecil
   - Mendukung pencarian sebagian kata
   - Input kosong -> kembali ke Gunung Populer
--------------------------------------------------------- */
function jalankanPencarian() {
    const kata = searchInput.value.trim().toLowerCase();

    if (kata.length > 0) {
        clearButton.classList.add("show");
    } else {
        clearButton.classList.remove("show");
    }

    if (kata === "") {
        tampilkanPopuler();
        return;
    }

    const hasil = gunungList.filter(function (gunung) {
        return gunung.nama.toLowerCase().includes(kata);
    });

    sectionSubtitle.textContent = "HASIL PENCARIAN";
    sectionTitle.textContent = "Hasil Pencarian";
    resultsCount.textContent =
        "Ditemukan " + hasil.length + " gunung untuk \"" + searchInput.value.trim() + "\"";

    if (hasil.length === 0) {
        tampilkanTidakDitemukan();
    } else {
        tampilkanDaftar(hasil);
    }
}

/* ---------------------------------------------------------
   14. EVENT LISTENER - PENCARIAN
--------------------------------------------------------- */
searchInput.addEventListener("input", jalankanPencarian);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        jalankanPencarian();
    }
});

searchButton.addEventListener("click", jalankanPencarian);

clearButton.addEventListener("click", function () {
    searchInput.value = "";
    clearButton.classList.remove("show");
    tampilkanPopuler();
    searchInput.focus();
});

/* ---------------------------------------------------------
   15. EVENT LISTENER - TOMBOL NAVIGASI
--------------------------------------------------------- */
prevBtn.addEventListener("click", slidePrev);
nextBtn.addEventListener("click", slideNext);

/* ---------------------------------------------------------
   16. SWIPE PADA SMARTPHONE
--------------------------------------------------------- */
let touchStartX = 0;

carousel.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchend", function (event) {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
            slideNext(); // geser ke kiri -> berikutnya
        } else {
            slidePrev(); // geser ke kanan -> sebelumnya
        }
    }
}, { passive: true });

/* ---------------------------------------------------------
   17. SESUAIKAN SAAT UKURAN LAYAR BERUBAH
   ---------------------------------------------------------
   Membangun ulang carousel agar jumlah card & kloningan pas.
--------------------------------------------------------- */
let resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (currentData.length === 0) {
            tampilkanTidakDitemukan();
        } else {
            tampilkanDaftar(currentData);
        }
    }, 150);
});

/* ---------------------------------------------------------
   18. TAMPILKAN DAFTAR AWAL SAAT HALAMAN DIMUAT
--------------------------------------------------------- */
tampilkanPopuler();