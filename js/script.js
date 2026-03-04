document.getElementById("beamForm").addEventListener("submit", function(e){

e.preventDefault(); // mencegah reload

let fc = parseFloat(document.getElementById("fc").value);
let fy = parseFloat(document.getElementById("fy").value);
let b = parseFloat(document.getElementById("b").value);
let h = parseFloat(document.getElementById("h").value);
let cover = parseFloat(document.getElementById("cover").value);
let db = parseFloat(document.getElementById("db").value);
let ds = parseFloat(document.getElementById("ds").value);
let Mu_kNm = parseFloat(document.getElementById("Mu").value);
let Vu_kN = parseFloat(document.getElementById("Vu").value);

if(isNaN(fc)||isNaN(fy)||isNaN(b)||isNaN(h)||isNaN(Mu_kNm)||isNaN(Vu_kN)){
alert("Input belum lengkap!");
return;
}

let Mu = Mu_kNm*1e6;
let Vu = Vu_kN*1e3;

let phi_flex=0.9;
let phi_shear=0.75;

let d = h-cover-ds-db/2;

let Ab = Math.PI*db*db/4;

// TUMPUAN
let As_t = (Mu/phi_flex)/(fy*d);
let n_t = Math.ceil(As_t/Ab);
let a_t = (As_t*fy)/(0.85*fc*b);
let Mn_t = As_t*fy*(d-a_t/2);
let phiMn_t = phi_flex*Mn_t;

// LAPANGAN
let Mu_l = 0.7*Mu;
let As_l = (Mu_l/phi_flex)/(fy*d);
let n_l = Math.ceil(As_l/Ab);
let a_l = (As_l*fy)/(0.85*fc*b);
let Mn_l = As_l*fy*(d-a_l/2);
let phiMn_l = phi_flex*Mn_l;

// GESER
let Vc = 0.17*Math.sqrt(fc)*b*d;
let Vs = Vu/phi_shear - Vc;
if(Vs<0) Vs=0;

let Av = 2*(Math.PI*ds*ds/4);
let s = (Av*fy*d)/Vs;
if(!isFinite(s)||s<=0) s=300;

let Vn = Vc+Vs;
let phiVn = phi_shear*Vn;

// STATUS
let statusFlex = phiMn_t>=Mu ?
"<span class='status-aman'>AMAN</span>" :
"<span class='status-tidak'>TIDAK AMAN</span>";

let statusShear = phiVn>=Vu ?
"<span class='status-aman'>AMAN</span>" :
"<span class='status-tidak'>TIDAK AMAN</span>";

document.getElementById("output").innerHTML=`

<div class="result-box gaya">
<b>Gaya Bekerja:</b><br>
Mu = ${Mu_kNm} kNm<br>
Vu = ${Vu_kN} kN
</div>

<div class="result-box tumpuan">
<b>Tulangan Tumpuan</b><br>
As = ${As_t.toFixed(2)} mm²<br>
Gunakan = ${n_t} D${db}<br>
φMn = ${(phiMn_t/1e6).toFixed(2)} kNm<br>
Status Lentur = ${statusFlex}
</div>

<div class="result-box lapangan">
<b>Tulangan Lapangan</b><br>
As = ${As_l.toFixed(2)} mm²<br>
Gunakan = ${n_l} D${db}<br>
φMn = ${(phiMn_l/1e6).toFixed(2)} kNm
</div>

<div class="result-box gaya">
<b>Tulangan Geser</b><br>
Spasi ≈ ${Math.min(s,300).toFixed(0)} mm<br>
φVn = ${(phiVn/1000).toFixed(2)} kN<br>
Status Geser = ${statusShear}
</div>

`;

});
