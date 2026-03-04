document.getElementById('uploadExcel').addEventListener('change', function(e){
const reader = new FileReader();

reader.onload = function(e){
const data = new Uint8Array(e.target.result);
const workbook = XLSX.read(data, {type: 'array'});
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const json = XLSX.utils.sheet_to_json(sheet);
const row = json[0];

for (let key in row) {
if (document.getElementById(key)) {
document.getElementById(key).value = row[key];
}
}
};

reader.readAsArrayBuffer(e.target.files[0]);
});

function hitung(){

const fc = parseFloat(document.getElementById("fc").value);
const fy = parseFloat(document.getElementById("fy").value);
const b = parseFloat(document.getElementById("b").value);
const h = parseFloat(document.getElementById("h").value);
const cover = parseFloat(document.getElementById("cover").value);
const diaTul = parseFloat(document.getElementById("diaTul").value);
const jumlahTul = parseFloat(document.getElementById("jumlahTul").value);
const diaSengkang = parseFloat(document.getElementById("diaSengkang").value);
const spasi = parseFloat(document.getElementById("spasiSengkang").value);
const Mu = parseFloat(document.getElementById("Mu").value) * 1e6;
const Vu = parseFloat(document.getElementById("Vu").value) * 1e3;

if(isNaN(fc) || isNaN(fy)){
alert("Data belum lengkap!");
return;
}

const d = h - cover - diaSengkang - diaTul/2;
const As = jumlahTul * (Math.PI * diaTul**2 / 4);
const a = (As*fy)/(0.85*fc*b);
const Mn = As*fy*(d-a/2);
const phiMn = 0.9*Mn;

const Vc = 0.17*Math.sqrt(fc)*b*d;
const Av = 2*(Math.PI*diaSengkang**2/4);
const Vs = (Av*fy*d)/spasi;
const Vn = Vc+Vs;
const phiVn = 0.75*Vn;

let lentur = phiMn>Mu ? "AMAN" : "TIDAK AMAN";
let geser = phiVn>Vu ? "AMAN" : "TIDAK AMAN";

document.getElementById("hasil").innerHTML = `
<h3>HASIL</h3>
<p>As = ${As.toFixed(2)} mm²</p>
<p>φMn = ${(phiMn/1e6).toFixed(2)} kNm → ${lentur}</p>
<p>φVn = ${(phiVn/1e3).toFixed(2)} kN → ${geser}</p>
`;
}

function exportPDF(){
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
doc.text("Hasil Perhitungan Balok",10,10);
doc.text(document.getElementById("hasil").innerText,10,20);
doc.save("hasil_balok.pdf");
}