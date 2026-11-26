/* =========================================================
   MOUNTSEARCH - FITUR SEARCH GUNUNG (TAHAP 2)
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
const container = document.getElementById("mountainContainer");
const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");
const resultsCount = document.getElementById("resultsCount");

/* ---------------------------------------------------------
   3. BUAT SATU CARD GUNUNG
   ---------------------------------------------------------
   Mengembalikan elemen HTML card berdasarkan data gunung.
   Gambar memakai elemen <img> dengan fallback lokal.
--------------------------------------------------------- */
function buatCard(gunung) {
    // Elemen utama card
    const card = document.createElement("div");
    card.className = "mountain-card";

    // Wrapper gambar + elemen <img>
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

    // Bagian informasi
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

    // Gabungkan informasi ke dalam card
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
   4. TAMPILKAN DAFTAR GUNUNG KE DALAM CONTAINER
   ---------------------------------------------------------
   Menghapus isi container lama agar card tidak menumpuk.
--------------------------------------------------------- */
function tampilkanGunung(daftar) {
    container.innerHTML = ""; // bersihkan card sebelumnya

    daftar.forEach(function (gunung) {
        container.appendChild(buatCard(gunung));
    });
}

/* ---------------------------------------------------------
   5. TAMPILKAN PESAN "TIDAK DITEMUKAN"
--------------------------------------------------------- */
function tampilkanTidakDitemukan() {
    container.innerHTML = ""; // bersihkan card sebelumnya

    const box = document.createElement("div");
    box.className = "not-found";

    const title = document.createElement("h3");
    title.textContent = "Gunung tidak ditemukan";

    const desc = document.createElement("p");
    desc.textContent = "Coba cari dengan nama gunung yang lain.";

    box.appendChild(title);
    box.appendChild(desc);
    container.appendChild(box);
}

/* ---------------------------------------------------------
   6. TAMPILKAN MODE "GUNUNG POPULER" (input kosong)
--------------------------------------------------------- */
function tampilkanPopuler() {
    tampilkanGunung(gunungList);

    sectionSubtitle.textContent = "DESTINASI PILIHAN";
    sectionTitle.textContent = "Gunung Populer";
    resultsCount.textContent = "";
}

/* ---------------------------------------------------------
   7. JALANKAN PENCARIAN
   ---------------------------------------------------------
   - Tidak sensitif huruf besar/kecil
   - Mendukung pencarian sebagian kata
   - Input kosong -> kembali ke Gunung Populer
--------------------------------------------------------- */
function jalankanPencarian() {
    const kata = searchInput.value.trim().toLowerCase();

    // Tampilkan / sembunyikan tombol hapus
    if (kata.length > 0) {
        clearButton.classList.add("show");
    } else {
        clearButton.classList.remove("show");
    }

    // Input kosong -> tampilkan daftar populer
    if (kata === "") {
        tampilkanPopuler();
        return;
    }

    // Filter data berdasarkan nama (sebagian kata, case-insensitive)
    const hasil = gunungList.filter(function (gunung) {
        return gunung.nama.toLowerCase().includes(kata);
    });

    // Ubah judul section menjadi "Hasil Pencarian"
    sectionSubtitle.textContent = "HASIL PENCARIAN";
    sectionTitle.textContent = "Hasil Pencarian";
    resultsCount.textContent =
        "Ditemukan " + hasil.length + " gunung untuk \"" + searchInput.value.trim() + "\"";

    if (hasil.length === 0) {
        tampilkanTidakDitemukan();
    } else {
        tampilkanGunung(hasil);
    }
}

/* ---------------------------------------------------------
   8. EVENT LISTENER
--------------------------------------------------------- */

// Hasil muncul otomatis ketika pengguna mengetik
searchInput.addEventListener("input", jalankanPencarian);

// Tekan Enter untuk mencari
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        jalankanPencarian();
    }
});

// Klik tombol "Cari Gunung"
searchButton.addEventListener("click", jalankanPencarian);

// Klik tombol hapus (X) -> kosongkan input & kembali ke populer
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    clearButton.classList.remove("show");
    tampilkanPopuler();
    searchInput.focus(); // kembalikan fokus ke input
});

/* ---------------------------------------------------------
   9. TAMPILKAN DAFTAR AWAL SAAT HALAMAN DIMUAT
--------------------------------------------------------- */
tampilkanPopuler();