function designBeam() {

    let fc = parseFloat(document.getElementById("fc").value);
    let fy = parseFloat(document.getElementById("fy").value);
    let b = parseFloat(document.getElementById("b").value);
    let h = parseFloat(document.getElementById("h").value);
    let cover = parseFloat(document.getElementById("cover").value);
    let db = parseFloat(document.getElementById("db").value);
    let ds = parseFloat(document.getElementById("ds").value);
    let Mu = parseFloat(document.getElementById("Mu").value) * 1e6;
    let Vu = parseFloat(document.getElementById("Vu").value) * 1e3;

    if (!fc || !fy || !b || !h || !Mu || !Vu) {
        alert("Input tidak boleh kosong!");
        return;
    }

    let phi = 0.9;
    let d = h - cover - ds - db/2;

    // ==== TUMPUAN (100% Mu) ====
    let Mn_req_tumpuan = Mu / phi;
    let As_tumpuan = Mn_req_tumpuan / (fy * d);

    // ==== LAPANGAN (70% Mu) ====
    let Mn_req_lapangan = (0.7 * Mu) / phi;
    let As_lapangan = Mn_req_lapangan / (fy * d);

    // Luas 1 batang
    let Ab = 3.1416 * Math.pow(db,2) / 4;

    let n_tumpuan = Math.ceil(As_tumpuan / Ab);
    let n_lapangan = Math.ceil(As_lapangan / Ab);

    // Geser
    let Vc = 0.17 * Math.sqrt(fc) * b * d;
    let Vs = Vu/0.75 - Vc;
    if (Vs < 0) Vs = 0;

    let Av = 2 * (3.1416 * Math.pow(ds,2) / 4);
    let s = (Av * fy * d) / Vs;
    if (!isFinite(s)) s = 300;

    document.getElementById("output").innerHTML = `
        <div class="result-box tumpuan">
            <h4>Tulangan Daerah Tumpuan</h4>
            As dibutuhkan = ${As_tumpuan.toFixed(2)} mm² <br>
            Gunakan = <b>${n_tumpuan} D${db}</b>
        </div>

        <div class="result-box lapangan">
            <h4>Tulangan Daerah Lapangan</h4>
            As dibutuhkan = ${As_lapangan.toFixed(2)} mm² <br>
            Gunakan = <b>${n_lapangan} D${db}</b>
        </div>

        <div class="result-box">
            <h4>Tulangan Geser (Sengkang)</h4>
            Spasi sengkang ≈ <b>${Math.min(s,300).toFixed(0)} mm</b>
        </div>
    `;
}
