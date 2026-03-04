<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RC Beam Design Calculator</title>

<style>
body {
    font-family: Arial, sans-serif;
    background: #f3f4f6;
    padding: 30px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    margin-bottom: 25px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

.input-wrapper {
    display: flex;
}

.input-wrapper input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 5px 0 0 5px;
}

.input-wrapper span {
    background: #e5e7eb;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 0 5px 5px 0;
}

button {
    width: 100%;
    padding: 12px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #1e40af;
}

.result {
    margin-top: 20px;
    padding: 15px;
    background: #f9fafb;
    border-radius: 8px;
}
</style>
</head>

<body>

<div class="container">
<h1>RC Beam Design Calculator</h1>

<div class="input-group">
<label>fc'</label>
<div class="input-wrapper">
<input type="number" id="fc" value="25">
<span>MPa</span>
</div>
</div>

<div class="input-group">
<label>fy</label>
<div class="input-wrapper">
<input type="number" id="fy" value="400">
<span>MPa</span>
</div>
</div>

<div class="input-group">
<label>Lebar Balok (b)</label>
<div class="input-wrapper">
<input type="number" id="b" value="300">
<span>mm</span>
</div>
</div>

<div class="input-group">
<label>Tinggi Balok (h)</label>
<div class="input-wrapper">
<input type="number" id="h" value="500">
<span>mm</span>
</div>
</div>

<div class="input-group">
<label>Selimut Beton</label>
<div class="input-wrapper">
<input type="number" id="cover" value="40">
<span>mm</span>
</div>
</div>

<div class="input-group">
<label>Momen Ultimate (Mu)</label>
<div class="input-wrapper">
<input type="number" id="Mu" value="200">
<span>kNm</span>
</div>
</div>

<button onclick="hitung()">Hitung Tulangan</button>

<div class="result" id="hasil"></div>

</div>

<script>
function hitung(){

const fc = parseFloat(document.getElementById("fc").value);
const fy = parseFloat(document.getElementById("fy").value);
const b = parseFloat(document.getElementById("b").value);
const h = parseFloat(document.getElementById("h").value);
const cover = parseFloat(document.getElementById("cover").value);
const Mu = parseFloat(document.getElementById("Mu").value) * 1e6;

const phi = 0.9;

// asumsi sengkang 10 mm & 1/2 tul utama 8 mm
const d = h - cover - 10 - 8;

const j = 0.9;

const As_req = Mu / (phi * fy * j * d);

// Luas tulangan D16
const luasD16 = Math.PI * 16 * 16 / 4;

const jumlahD16 = Math.ceil(As_req / luasD16);

document.getElementById("hasil").innerHTML = `
<h3>Hasil Desain</h3>
<p>Effective Depth (d) = ${d.toFixed(2)} mm</p>
<p>As dibutuhkan = ${As_req.toFixed(2)} mm²</p>
<p>Rekomendasi tulangan = ${jumlahD16}D16</p>
`;
}
</script>

</body>
</html>
