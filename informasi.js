/* =========================================================
   MOUNTSEARCH - HALAMAN INFORMASI
   Menampilkan 38 provinsi & filter gunung per provinsi.
   JavaScript Vanilla, data statis (tanpa API/database).
   ========================================================= */

/* ---------------------------------------------------------
   1. DAFTAR 38 PROVINSI INDONESIA
   ---------------------------------------------------------
   Urutan dari barat (Aceh) sampai timur (Papua Barat Daya).
--------------------------------------------------------- */
const provinsiList = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Sumatera Selatan",
    "Kepulauan Bangka Belitung",
    "Bengkulu",
    "Lampung",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Banten",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Kalimantan Barat",
    "Kalimantan Tengah",
    "Kalimantan Selatan",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Sulawesi Utara",
    "Sulawesi Tengah",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Gorontalo",
    "Sulawesi Barat",
    "Maluku",
    "Maluku Utara",
    "Papua",
    "Papua Barat",
    "Papua Selatan",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat Daya"
];

/* ---------------------------------------------------------
   2. DATABASE GUNUNG (statis)
   ---------------------------------------------------------
   Setiap gunung punya properti:
   id, nama, provinsi, kabupaten, ketinggian, deskripsi, gambar

   PENTING:
   - Nama "provinsi" harus sama persis dengan isi provinsiList
     agar filter berfungsi.
   - "gambar" diambil dari folder images/ (elemen <img>).
   - Jika gambar belum ada, akan muncul placeholder otomatis.

   Cara menambah gunung baru: salin salah satu blok objek,
   ubah nilainya, lalu tambahkan path gambar di folder images/.
--------------------------------------------------------- */
const gunungData = [
    {
        id: 1,
        nama: "Gunung Bromo",
        provinsi: "Jawa Timur",
        kabupaten: "Kab. Probolinggo",
        ketinggian: 2329,
        deskripsi: "Gunung dengan panorama matahari terbit yang memukau.",
        gambar: "images/bromo.jpg"
    },
    {
        id: 2,
        nama: "Gunung Semeru",
        provinsi: "Jawa Timur",
        kabupaten: "Kab. Malang",
        ketinggian: 3676,
        deskripsi: "Puncak tertinggi di Pulau Jawa dengan asap kawah yang mengepul.",
        gambar: "images/semeru.jpg"
    },
    {
        id: 3,
        nama: "Gunung Arjuno",
        provinsi: "Jawa Timur",
        kabupaten: "Kab. Malang",
        ketinggian: 3339,
        deskripsi: "Gunung dengan jalur pendakian populer dekat Surabaya.",
        gambar: "images/arjuno.jpg"
    },
    {
        id: 4,
        nama: "Gunung Papandayan",
        provinsi: "Jawa Barat",
        kabupaten: "Kab. Garut",
        ketinggian: 2665,
        deskripsi: "Destinasi alam dengan padang rumput luas dan kawah.",
        gambar: "images/papandayan.jpg"
    },
    {
        id: 5,
        nama: "Gunung Ciremai",
        provinsi: "Jawa Barat",
        kabupaten: "Kab. Kuningan",
        ketinggian: 3078,
        deskripsi: "Gunung tertinggi di Jawa Barat dengan kawah yang lebar.",
        gambar: "images/ciremai.jpg"
    },
    {
        id: 6,
        nama: "Gunung Guntur",
        provinsi: "Jawa Barat",
        kabupaten: "Kab. Garut",
        ketinggian: 2249,
        deskripsi: "Gunung dengan kawah dan sejarah panjang di Garut.",
        gambar: "images/guntur.jpg"
    },
    {
        id: 7,
        nama: "Gunung Merapi",
        provinsi: "Jawa Tengah",
        kabupaten: "Kab. Boyolali",
        ketinggian: 2930,
        deskripsi: "Gunung api aktif dengan pemandangan yang dramatis.",
        gambar: "images/merapi.jpg"
    },
    {
        id: 8,
        nama: "Gunung Slamet",
        provinsi: "Jawa Tengah",
        kabupaten: "Kab. Banyumas",
        ketinggian: 3432,
        deskripsi: "Gunung api tertinggi di Jawa Tengah.",
        gambar: "images/slamet.jpg"
    },
    {
        id: 9,
        nama: "Gunung Sindoro",
        provinsi: "Jawa Tengah",
        kabupaten: "Kab. Temanggung",
        ketinggian: 3136,
        deskripsi: "Gunung dengan puncak runcing yang khas.",
        gambar: "images/sindoro.jpg"
    },
    {
        id: 10,
        nama: "Gunung Sumbing",
        provinsi: "Jawa Tengah",
        kabupaten: "Kab. Wonosobo",
        ketinggian: 3371,
        deskripsi: "Gunung dengan danau kecil di kawasan puncaknya.",
        gambar: "images/sumbing.jpg"
    },
    {
        id: 11,
        nama: "Gunung Rinjani",
        provinsi: "Nusa Tenggara Barat",
        kabupaten: "Kab. Lombok Utara",
        ketinggian: 3726,
        deskripsi: "Gunung dengan danau indah di dalam kawahnya.",
        gambar: "images/rinjani.jpg"
    },
    {
        id: 12,
        nama: "Gunung Tambora",
        provinsi: "Nusa Tenggara Barat",
        kabupaten: "Kab. Dompu",
        ketinggian: 2850,
        deskripsi: "Gunung dengan sejarah letusan besar yang terkenal di dunia.",
        gambar: "images/tambora.jpg"
    },
    {
        id: 13,
        nama: "Gunung Kerinci",
        provinsi: "Jambi",
        kabupaten: "Kab. Kerinci",
        ketinggian: 3805,
        deskripsi: "Gunung tertinggi di Sumatra dengan udara yang sejuk.",
        gambar: "images/kerinci.jpg"
    },
    {
        id: 14,
        nama: "Gunung Leuser",
        provinsi: "Aceh",
        kabupaten: "Kab. Aceh Tenggara",
        ketinggian: 3466,
        deskripsi: "Bagian dari Taman Nasional Gunung Leuser yang kaya satwa.",
        gambar: "images/leuser.jpg"
    },
    {
        id: 15,
        nama: "Gunung Seulawah Agam",
        provinsi: "Aceh",
        kabupaten: "Kab. Aceh Besar",
        ketinggian: 1717,
        deskripsi: "Gunung strategis dengan pemandangan Kota Banda Aceh.",
        gambar: "images/seulawah.jpg"
    },
    {
        id: 16,
        nama: "Gunung Sibuatan",
        provinsi: "Sumatera Utara",
        kabupaten: "Kab. Dairi",
        ketinggian: 2457,
        deskripsi: "Gunung dengan hutan pinus dan udara yang dingin.",
        gambar: "images/sibuatan.jpg"
    },
    {
        id: 17,
        nama: "Gunung Pusuk Buhit",
        provinsi: "Sumatera Utara",
        kabupaten: "Kab. Toba Samosir",
        ketinggian: 1981,
        deskripsi: "Bukit sakral di tepi Danau Toba.",
        gambar: "images/pusukbuhit.jpg"
    },
    {
        id: 18,
        nama: "Gunung Singgalang",
        provinsi: "Sumatera Barat",
        kabupaten: "Kab. Solok",
        ketinggian: 2877,
        deskripsi: "Gunung kembar dengan kawah yang masih aktif.",
        gambar: "images/singgalang.jpg"
    },
    {
        id: 19,
        nama: "Gunung Tandikat",
        provinsi: "Sumatera Barat",
        kabupaten: "Kab. Tanah Datar",
        ketinggian: 2438,
        deskripsi: "Gunung dengan jalur pendakian yang menantang.",
        gambar: "images/tandikat.jpg"
    },
    {
        id: 20,
        nama: "Gunung Talamau",
        provinsi: "Sumatera Barat",
        kabupaten: "Kab. Pasaman Barat",
        ketinggian: 2919,
        deskripsi: "Gunung berhutan lebat di kawasan Pasaman.",
        gambar: "images/talamau.jpg"
    },
    {
        id: 21,
        nama: "Gunung Dempo",
        provinsi: "Sumatera Selatan",
        kabupaten: "Kota Pagar Alam",
        ketinggian: 3173,
        deskripsi: "Gunung dengan kawah dan padang rumput yang luas.",
        gambar: "images/dempo.jpg"
    },
    {
        id: 22,
        nama: "Gunung Kaba",
        provinsi: "Bengkulu",
        kabupaten: "Kab. Bengkulu Tengah",
        ketinggian: 1952,
        deskripsi: "Gunung dengan kawah yang berasap.",
        gambar: "images/kaba.jpg"
    },
    {
        id: 23,
        nama: "Gunung Pesagi",
        provinsi: "Lampung",
        kabupaten: "Kab. Tanggamus",
        ketinggian: 2262,
        deskripsi: "Gunung tertinggi di Lampung dengan pemandangan hijau.",
        gambar: "images/pesagi.jpg"
    },
    {
        id: 24,
        nama: "Gunung Rajabasa",
        provinsi: "Lampung",
        kabupaten: "Kab. Lampung Selatan",
        ketinggian: 1281,
        deskripsi: "Gunung di kawasan Taman Nasional Way Kambas.",
        gambar: "images/rajabasa.jpg"
    },
    {
        id: 25,
        nama: "Gunung Krakatau",
        provinsi: "Banten",
        kabupaten: "Kab. Serang",
        ketinggian: 813,
        deskripsi: "Gunung api pulau yang terkenal di dunia.",
        gambar: "images/krakatau.jpg"
    },
    {
        id: 26,
        nama: "Gunung Karang",
        provinsi: "Banten",
        kabupaten: "Kab. Pandeglang",
        ketinggian: 1694,
        deskripsi: "Gunung berhutan di kawasan Pandeglang.",
        gambar: "images/karang.jpg"
    },
    {
        id: 27,
        nama: "Gunung Agung",
        provinsi: "Bali",
        kabupaten: "Kab. Karangasem",
        ketinggian: 3031,
        deskripsi: "Gunung suci tertinggi di Bali.",
        gambar: "images/agung.jpg"
    },
    {
        id: 28,
        nama: "Gunung Batur",
        provinsi: "Bali",
        kabupaten: "Kab. Bangli",
        ketinggian: 1717,
        deskripsi: "Gunung dengan danau kawah yang indah.",
        gambar: "images/batur.jpg"
    },
    {
        id: 29,
        nama: "Gunung Kelimutu",
        provinsi: "Nusa Tenggara Timur",
        kabupaten: "Kab. Ende",
        ketinggian: 1639,
        deskripsi: "Gunung dengan tiga danau kawah berwarna.",
        gambar: "images/kelimutu.jpg"
    },
    {
        id: 30,
        nama: "Gunung Inerie",
        provinsi: "Nusa Tenggara Timur",
        kabupaten: "Kab. Ngada",
        ketinggian: 2245,
        deskripsi: "Gunung dengan bentuk kerucut yang rapi.",
        gambar: "images/inerie.jpg"
    },
    {
        id: 31,
        nama: "Gunung Lawit",
        provinsi: "Kalimantan Barat",
        kabupaten: "Kab. Kapuas Hulu",
        ketinggian: 1767,
        deskripsi: "Gunung di kawasan hutan pedalaman Kalimantan.",
        gambar: "images/lawit.jpg"
    },
    {
        id: 32,
        nama: "Bukit Raya",
        provinsi: "Kalimantan Tengah",
        kabupaten: "Kab. Katingan",
        ketinggian: 2278,
        deskripsi: "Puncak di Taman Nasional Bukit Baka Bukit Raya.",
        gambar: "images/bukitraya.jpg"
    },
    {
        id: 33,
        nama: "Gunung Beratus",
        provinsi: "Kalimantan Timur",
        kabupaten: "Kab. Kutai Kartanegara",
        ketinggian: 1600,
        deskripsi: "Gunung berhutan di kawasan Kalimantan Timur.",
        gambar: "images/beratus.jpg"
    },
    {
        id: 34,
        nama: "Gunung Lokon",
        provinsi: "Sulawesi Utara",
        kabupaten: "Kab. Minahasa",
        ketinggian: 1580,
        deskripsi: "Gunung api aktif dekat Kota Tomohon.",
        gambar: "images/lokon.jpg"
    },
    {
        id: 35,
        nama: "Gunung Karangetang",
        provinsi: "Sulawesi Utara",
        kabupaten: "Kab. Sitaro",
        ketinggian: 1784,
        deskripsi: "Gunung api aktif di Pulau Siau.",
        gambar: "images/karangetang.jpg"
    },
    {
        id: 36,
        nama: "Gunung Dako",
        provinsi: "Sulawesi Tengah",
        kabupaten: "Kab. Banggai",
        ketinggian: 2072,
        deskripsi: "Gunung di Semenanjung Sulawesi Tengah.",
        gambar: "images/dako.jpg"
    },
    {
        id: 37,
        nama: "Gunung Bawakaraeng",
        provinsi: "Sulawesi Selatan",
        kabupaten: "Kab. Gowa",
        ketinggian: 2830,
        deskripsi: "Gunung dengan jalur mendaki dekat Makassar.",
        gambar: "images/bawakaraeng.jpg"
    },
    {
        id: 38,
        nama: "Gunung Lompobattang",
        provinsi: "Sulawesi Selatan",
        kabupaten: "Kab. Jeneponto",
        ketinggian: 2871,
        deskripsi: "Gunung dengan kawah dan pemandangan laut.",
        gambar: "images/lompobattang.jpg"
    },
    {
        id: 39,
        nama: "Gunung Binaya",
        provinsi: "Maluku",
        kabupaten: "Kab. Maluku Tengah",
        ketinggian: 3027,
        deskripsi: "Gunung tertinggi di kawasan Maluku.",
        gambar: "images/binaya.jpg"
    },
    {
        id: 40,
        nama: "Gunung Gamalama",
        provinsi: "Maluku Utara",
        kabupaten: "Kota Ternate",
        ketinggian: 1715,
        deskripsi: "Gunung api aktif yang menjulang di Kota Ternate.",
        gambar: "images/gamalama.jpg"
    },
    {
        id: 41,
        nama: "Puncak Jaya (Carstensz)",
        provinsi: "Papua Tengah",
        kabupaten: "Kab. Puncak",
        ketinggian: 4884,
        deskripsi: "Puncak tertinggi di Indonesia dengan gletser.",
        gambar: "images/carstensz.jpg"
    },
    {
        id: 42,
        nama: "Puncak Trikora",
        provinsi: "Papua Pegunungan",
        kabupaten: "Kab. Lanny Jaya",
        ketinggian: 4730,
        deskripsi: "Puncak di Pegunungan Tengah Papua.",
        gambar: "images/trikora.jpg"
    },
    {
        id: 43,
        nama: "Pegunungan Arfak",
        provinsi: "Papua Barat",
        kabupaten: "Kab. Manokwari",
        ketinggian: 2940,
        deskripsi: "Pegunungan dengan keanekaragaman hayati yang tinggi.",
        gambar: "images/arfak.jpg"
    }
];

/* ---------------------------------------------------------
   3. AMBIL ELEMEN DARI HTML
--------------------------------------------------------- */
const provinsiGrid = document.getElementById("provinsiGrid");
const provinsiSearch = document.getElementById("provinsiSearch");
const provinsiCount = document.getElementById("provinsiCount");

const provinsiSection = document.getElementById("provinsiSection");
const gunungSection = document.getElementById("gunungSection");
const gunungGrid = document.getElementById("gunungGrid");
const gunungTitle = document.getElementById("gunungTitle");
const gunungCount = document.getElementById("gunungCount");
const backBtn = document.getElementById("backBtn");

/* ---------------------------------------------------------
   4. HITUNG JUMLAH GUNUNG PER PROVINSI
--------------------------------------------------------- */
function hitungGunung(provinsi) {
    return gunungData.filter(function (g) {
        return g.provinsi === provinsi;
    }).length;
}

/* ---------------------------------------------------------
   5. BUAT CARD PROVINSI
--------------------------------------------------------- */
function buatCardProvinsi(provinsi) {
    const card = document.createElement("div");
    card.className = "provinsi-card";

    const icon = document.createElement("div");
    icon.className = "provinsi-icon";
    icon.textContent = "📍"; // ikon lokasi sederhana

    const title = document.createElement("h3");
    title.textContent = provinsi;

    const total = document.createElement("span");
    total.className = "provinsi-total";
    total.textContent = hitungGunung(provinsi) + " gunung tersedia";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lihat-gunung-btn";
    btn.textContent = "Lihat Gunung";

    // Klik -> tampilkan gunung di provinsi ini
    btn.addEventListener("click", function () {
        tampilkanGunungProvinsi(provinsi);
    });

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(total);
    card.appendChild(btn);

    return card;
}

/* ---------------------------------------------------------
   6. TAMPILKAN DAFTAR PROVINSI (mendukung pencarian)
--------------------------------------------------------- */
function tampilkanProvinsi(kataKunci) {
    const kata = (kataKunci || "").trim().toLowerCase();

    provinsiGrid.innerHTML = "";

    const hasil = provinsiList.filter(function (provinsi) {
        return provinsi.toLowerCase().includes(kata);
    });

    if (hasil.length === 0) {
        provinsiGrid.appendChild(buatPesanKosong(
            "Provinsi tidak ditemukan",
            "Coba cari dengan nama provinsi yang lain."
        ));
    } else {
        hasil.forEach(function (provinsi) {
            provinsiGrid.appendChild(buatCardProvinsi(provinsi));
        });
    }

    provinsiCount.textContent =
        "Menampilkan " + hasil.length + " dari " + provinsiList.length + " provinsi";
}

/* ---------------------------------------------------------
   7. BUAT PESAN KOSONG (dipakai provinsi & gunung)
--------------------------------------------------------- */
function buatPesanKosong(judul, teks) {
    const box = document.createElement("div");
    box.className = "empty-message";

    const h = document.createElement("h3");
    h.textContent = judul;

    const p = document.createElement("p");
    p.textContent = teks;

    box.appendChild(h);
    box.appendChild(p);

    return box;
}

/* ---------------------------------------------------------
   8. BUAT CARD GUNUNG (konsisten dengan Gunung Populer)
   ---------------------------------------------------------
   Memakai elemen <img> + fallback placeholder lokal.
--------------------------------------------------------- */
function buatCardGunung(gunung) {
    const card = document.createElement("div");
    card.className = "mountain-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "mountain-image";

    const img = document.createElement("img");
    img.src = gunung.gambar;
    img.alt = gunung.nama;
    img.loading = "lazy";

    // Fallback bila gambar belum tersedia
    img.onerror = function () {
        this.onerror = null;
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
    location.textContent = gunung.provinsi;

    const title = document.createElement("h3");
    title.textContent = gunung.nama;

    const height = document.createElement("span");
    height.className = "mountain-height";
    height.textContent = "⛰ " + gunung.ketinggian + " mdpl";

    const kab = document.createElement("p");
    kab.className = "gunung-kabupaten";
    kab.textContent = gunung.kabupaten;

    const desc = document.createElement("p");
    desc.textContent = gunung.deskripsi;

    const detailBtn = document.createElement("button");
    detailBtn.type = "button";
    detailBtn.className = "detail-button";
    detailBtn.textContent = "Lihat Detail";

    info.appendChild(location);
    info.appendChild(title);
    info.appendChild(height);
    info.appendChild(kab);
    info.appendChild(desc);
    info.appendChild(detailBtn);

    card.appendChild(imageWrapper);
    card.appendChild(info);

    return card;
}

/* ---------------------------------------------------------
   9. TAMPILKAN GUNUNG BERDASARKAN PROVINSI
--------------------------------------------------------- */
function tampilkanGunungProvinsi(provinsi) {
    const hasil = gunungData.filter(function (g) {
        return g.provinsi === provinsi;
    });

    gunungGrid.innerHTML = "";
    gunungTitle.textContent = "Gunung di " + provinsi;

    if (hasil.length === 0) {
        gunungGrid.appendChild(buatPesanKosong(
            "Belum tersedia data gunung untuk provinsi ini.",
            "Data gunung akan ditambahkan seiring waktu."
        ));
        gunungCount.textContent = "0 gunung ditemukan";
    } else {
        hasil.forEach(function (gunung) {
            gunungGrid.appendChild(buatCardGunung(gunung));
        });
        gunungCount.textContent = "Ditemukan " + hasil.length + " gunung di " + provinsi;
    }

    // Tampilkan section gunung, sembunyikan daftar provinsi
    provinsiSection.hidden = true;
    gunungSection.hidden = false;

    // Gulir ke atas agar hasil terlihat
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------------------------------------------------
   10. TOMBOL KEMBALI KE DAFTAR PROVINSI
--------------------------------------------------------- */
backBtn.addEventListener("click", function () {
    gunungSection.hidden = true;
    provinsiSection.hidden = false;
    gunungGrid.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------
   11. PENCARIAN PROVINSI (realtime)
--------------------------------------------------------- */
provinsiSearch.addEventListener("input", function () {
    tampilkanProvinsi(provinsiSearch.value);
});

/* ---------------------------------------------------------
   12. TAMPILKAN DAFTAR PROVINSI SAAT HALAMAN DIMUAT
--------------------------------------------------------- */
tampilkanProvinsi("");