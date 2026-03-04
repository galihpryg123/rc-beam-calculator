function designBeam() {

    // Ambil input
    let fc = parseFloat(document.getElementById("fc").value);
    let fy = parseFloat(document.getElementById("fy").value);
    let b = parseFloat(document.getElementById("b").value);
    let h = parseFloat(document.getElementById("h").value);
    let cover = parseFloat(document.getElementById("cover").value);
    let db = parseFloat(document.getElementById("db").value);
    let ds = parseFloat(document.getElementById("ds").value);
    let Mu_kNm = parseFloat(document.getElementById("Mu").value);
    let Vu_kN = parseFloat(document.getElementById("Vu").value);

    if (isNaN(fc)||isNaN(fy)||isNaN(b)||isNaN(h)||isNaN(Mu_kNm)||isNaN(Vu_kN)) {
        alert("Input belum lengkap!");
        return;
    }

    // Konversi satuan
    let Mu = Mu_kNm * 1e6;   // Nmm
    let Vu = Vu_kN * 1e3;    // N

    let phi_flex = 0.9;
    let phi_shear = 0.75;

    let d = h - cover - ds - db/2;

    // =============================
    // TUMPUAN (100% Mu)
    // =============================
    let As_tump = (Mu/phi_flex)/(fy*d);
    let Ab = Math.PI*db*db/4;
    let n_tump = Math.ceil(As_tump/Ab);

    let a_tump = (As_tump*fy)/(0.85*fc*b);
    let Mn_tump = As_tump*fy*(d-a_tump/2);
    let phiMn_tump = phi_flex*Mn_tump;

    // =============================
    // LAPANGAN (70% Mu)
    // =============================
    let Mu_lap = 0.7*Mu;
    let As_lap = (Mu_lap/phi_flex)/(fy*d);
    let n_lap = Math.ceil(As_lap/Ab);

    let a_lap = (As_lap*fy)/(0.85*fc*b);
    let Mn_lap = As_lap*fy*(d-a_lap/2);
    let phiMn_lap = phi_flex*Mn_lap;

    // =============================
    // GESER
    // =============================
    let Vc = 0.17*Math.sqrt(fc)*b*d;
    let Vs = Vu/phi_shear - Vc;
    if (Vs < 0) Vs = 0;

    let Av = 2*(Math.PI*ds*ds/4);
    let s = (Av*fy*d)/Vs;
    if (!isFinite(s)||s<=0) s=300;

    let Vn = Vc+Vs;
    let phiVn = phi_shear*Vn;

    // =============================
    // STATUS
    // =============================
    let statusFlex = (phiMn_tump>=Mu) ? 
        "<span class='status-aman'>AMAN</span>" :
        "<span class='status-tidak'>TIDAK AMAN</span>";

    let statusShear = (phiVn>=Vu) ?
        "<span class='status-aman'>AMAN</span>" :
        "<span class='status-tidak'>TIDAK AMAN</span>";

    // =============================
    // OUTPUT
    // =============================
    document.getElementById("output").innerHTML = `

    <div class="result-box gaya">
        <h3>Gaya yang Bekerja</h3>
        Mu = ${Mu_kNm} kNm <br>
        Vu = ${Vu_kN} kN
    </div>

    <div class="result-box tumpuan">
        <h3>Tulangan Tumpuan</h3>
        As = ${As_tump.toFixed(2)} mm² <br>
        Gunakan = ${n_tump} D${db} <br>
        φMn = ${(phiMn_tump/1e6).toFixed(2)} kNm <br>
        Status Lentur = ${statusFlex}
    </div>

    <div class="result-box lapangan">
        <h3>Tulangan Lapangan</h3>
        As = ${As_lap.toFixed(2)} mm² <br>
        Gunakan = ${n_lap} D${db} <br>
        φMn = ${(phiMn_lap/1e6).toFixed(2)} kNm
    </div>

    <div class="result-box gaya">
        <h3>Tulangan Geser</h3>
        Spasi Sengkang ≈ ${Math.min(s,300).toFixed(0)} mm <br>
        φVn = ${(phiVn/1000).toFixed(2)} kN <br>
        Status Geser = ${statusShear}
    </div>
    `;
}
