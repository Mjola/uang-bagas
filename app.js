// Ambil data dari localStorage
let data = JSON.parse(localStorage.getItem("pengeluaran")) || [];

// Format angka jadi Rupiah
function formatRupiah(angka) {
  return angka.toLocaleString("id-ID");
}

// Simpan ke localStorage
function simpan() {
  localStorage.setItem("pengeluaran", JSON.stringify(data));
}

// Render / tampilkan data ke tabel
function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  data.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="item-left">
        <strong>${item.keterangan}</strong>
        <small>${item.tanggal}</small>
      </div>
      <div class="item-right">
        - Rp ${formatRupiah(item.jumlah)}
      </div>
      <button onclick="hapus(${index})">❌</button>
    `;

    list.appendChild(div);
    total += item.jumlah;
  });

  document.getElementById("total").innerText = formatRupiah(total);
}
// Tambah data baru
function tambahData() {
  let tanggal = document.getElementById("tanggal").value;
  let keterangan = document.getElementById("keterangan").value;
  let jumlah = parseInt(document.getElementById("jumlah").value);

  if (!tanggal || !keterangan || !jumlah) {
    alert("Isi semua data dulu!");
    return;
  }

  data.push({
    tanggal: tanggal,
    keterangan: keterangan,
    jumlah: jumlah
  });

  simpan();
  render();

  // Reset input
  document.getElementById("keterangan").value = "";
  document.getElementById("jumlah").value = "";
}

// Hapus data
function hapus(index) {
  data.splice(index, 1);
  simpan();
  render();
}

// Jalankan saat pertama kali buka
render();
