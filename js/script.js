document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("designBtn").addEventListener("click", function () {

        let fc = parseFloat(document.getElementById("fc").value);
        let fy = parseFloat(document.getElementById("fy").value);
        let b = parseFloat(document.getElementById("b").value);
        let h = parseFloat(document.getElementById("h").value);
        let cover = parseFloat(document.getElementById("cover").value);
        let db = parseFloat(document.getElementById("db").value);
        let ds = parseFloat(document.getElementById("ds").value);
        let Mu = parseFloat(document.getElementById("Mu").value) * 1e6;
        let Vu = parseFloat(document.getElementById("Vu").value) * 1e3;

        if (isNaN(fc) || isNaN(fy) || isNaN(b) || isNaN(h) || isNaN(Mu) || isNaN(Vu)) {
            alert("Semua input harus diisi!");
            return;
        }

        let phi = 0.9;
        let d = h - cover - ds - db / 2;

        // TUMPUAN (100%)
        let As_tumpuan = (Mu / phi) / (fy * d);

        // LAPANGAN (70%)
        let As_lapangan = ((0.7 * Mu) / phi) / (fy * d);

        let Ab = Math.PI * db * db / 4;

        let n_tumpuan = Math.ceil(As_tumpuan / Ab);
        let n_lapangan = Math.ceil(As_lapangan / Ab);

        // GESER
        let Vc = 0.17 * Math.sqrt(fc) * b * d;
        let Vs = (Vu / 0.75) - Vc;
        if (Vs < 0) Vs = 0;

        let Av = 2 * (Math.PI * ds * ds / 4);
        let s = (Av * fy * d) / Vs;
        if (!isFinite(s) || s <= 0) s = 300;

        document.getElementById("output").innerHTML = `
            <div class="result tumpuan">
                <h3>Tulangan Tumpuan</h3>
                As diperlukan = ${As_tumpuan.toFixed(2)} mm² <br>
                Gunakan = <b>${n_tumpuan} D${db}</b>
            </div>

            <div class="result lapangan">
                <h3>Tulangan Lapangan</h3>
                As diperlukan = ${As_lapangan.toFixed(2)} mm² <br>
                Gunakan = <b>${n_lapangan} D${db}</b>
            </div>

            <div class="result geser">
                <h3>Tulangan Geser</h3>
                Spasi sengkang ≈ <b>${Math.min(s, 300).toFixed(0)} mm</b>
            </div>
        `;

    });

});
