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
  let tabel = document.getElementById("tabel");
  tabel.innerHTML = "";

  let total = 0;

  data.forEach((item, index) => {
    let row = tabel.insertRow();

    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.keterangan}</td>
      <td>Rp ${formatRupiah(item.jumlah)}</td>
      <td><button onclick="hapus(${index})">❌</button></td>
    `;

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