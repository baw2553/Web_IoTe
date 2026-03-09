const professors = [

{ img:"img_phy/Screenshot 2026-01-16 130710.png",
nameEN:"Assoc.Prof.Dr.Pattareeya Damrongsak", 
nameTH:"รศ.ดร.ภัทรียา ดำรงศักดิ์", 
position:"หัวหน้าภาควิชาฟิสิกส์ (ฟิสิกส์อุตสาหกรรม)",    
email: "pattareeya.da@kmitl.ac.th",
edu: "Doctor of Philosophy/Engineering Materials University of Southampton อังกฤษ",
skill:"OPTICAL SPECTROSCOPY,SILICON PHOTOVOLTAICS,FLUORESCENT CONCENTRATORS,THIN FILM LUMINESCENCE,FLUORESCENCE SPECTROSCOPY"},

{ img:"img_phy/Screenshot 2026-01-16 130742.png", 
nameEN:"Assoc.Prof.Dr.Attasit Lasakul", 
nameTH:"รศ.ดร.สาหร่าย เล็กชะอุ่ม", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "sarai.le@kmitl.ac.th",
edu: "ปริญญาโท/วศ.ม.(นิวเคลียร์เทคโนโลยี) จุฬาลงกรณ์มหาวิทยาลัย",
skill:"STIRLING ENGINE,TISSUE,SIMULATION,MEASURING METHOD,INTERNET OF THING TECHNOLOGY"},

{ img:"img_phy/Screenshot 2026-01-16 130755.png", 
nameEN:"Assoc.Prof.Dr.Ratchanok Somphonsane", 
nameTH:"รศ.ดร.รัชนก สมพรเสน่ห์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "ratchanok.so@kmitl.ac.th",
edu: " Doctor of Philosophy/Physics, University at Buffalo,The State University of NY",
skill:"NANOELECTRONICS,2D MATERIALS,GRAPHENE,QUANTUM TRANSPORT PHENOMENA,ELECTRICAL CHARACTERIZATION"},

{ img:"img_phy/Screenshot 2026-01-16 130808.png", 
nameEN:"Asst. Prof. Dr. S.Tipawan Khlayboonme", 
nameTH:"ผศ.ดร.ศ.ทิพวรรณ คล้ายบุญมี", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "s.tipawan.kh@kmitl.ac.th",
edu: "วท.บ. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง,วท.ม. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง,ปร.ด. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 130825.png", 
nameEN:"Assoc.Prof.Dr.Aparporn Sakulkalavek", 
nameTH:"รศ.ดร.อาภาภรณ์ สกุลการะเวก", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "aparporn.sa@kmitl.ac.th",
edu: " วิทยาศาสตรดุษฎีบัณฑิต/ฟิสิกส์ จุฬาลงกรณ์มหาวิทยาลัย",
skill:"THIN FILM,THERMOELECTRIC MATERIAL,THERMAL PROPERTY,MATERIAL SCIENCE,MATERIAL CHARACTERIZATION"},

{ img:"img_phy/Screenshot 2026-01-16 130841.png", 
nameEN:"Dr. Pichanan Teesetsopon", 
nameTH:"ดร.พิชชานันท์ ธีเศรษฐ์โศภน", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "pichanan.te@kmitl.ac.th",
edu: "วท.บ. ฟิสิกส์, มหาวิทยาลัยเกษตรศาสตร์,วท.ม. ฟิสิกส์เชิงเคมี, มหาวิทยาลัยมหิดล,Ph.D. Energy, สถาบันเทคโนโลยีแห่งเอเซีย",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 130855.png", 
nameEN:"Asst.Prof.Dr.Mettaya Kitiwan", 
nameTH:"ผศ.ดร.เมตยา กิติวรรณ", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "mettaya.ki@kmitl.ac.th",
edu: "Ph.D.(Materials Processing), Tohoku University, Japan",
skill:"NANO-COATING BY ROTARY CHEMICAL VAPOR DEPOSITION,SINTERING OF ADVANCED CERAMICS,MICROWAVE PROCESSING OF MATERIALS,HYDROGEN SEPARATION MEMBRANE"},

{ img:"img_phy/Screenshot 2026-01-16 130909.png", 
nameEN:"Asst.Prof.Thanaporn Leelawattananon", 
nameTH:"ผศ.ธนภรณ์ ลีลาวัฒนานนท์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "tanaporn.le@kmitl.ac.th",
edu: "วท.ม./เทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"MODELING AND SIMULATION,SURFACE PLASMONS,OPTICAL DATA COMMUNICATION"},

{ img:"img_phy/Screenshot 2026-01-16 130927.png", 
nameEN:"Asst.Prof.Surasak Pipatsart", 
nameTH:"ผศ.สุรศักดิ์ พิพัฒน์ศาสตร์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "",
edu: " วท.ม.(ฟิสิกส์ประยุกต์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"OPTICS,ENERGY"},

{ img:"img_phy/Screenshot 2026-01-16 131318.png", 
nameEN:"Asst.Prof.Dr.Prathan Buranasiri", 
nameTH:"ผศ.ดร.ประธาน บุรณศิริ", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "prathan.bu@kmitl.ac.th",
edu: "Doctor of Philosophy/Electrical Engineering ,University of Dayton, USA",
skill:"QUANTITATIVE PHASE IMAGING,DIGITAL HOLOGRAPHY,NONLINEAR OPTIC,LASER STABILIZEATION,PHOTONIC CRYSTAL,METAMATERIAL,METAMATERIAL-MEDICAL PHYSICS,APPLICATIONS OF SYNCHROTRON RADIATION"},

{ img:"img_phy/Screenshot 2026-01-16 131343.png", 
nameEN:"Aj.Thammarat Taengtang", 
nameTH:"อ.ธรรมรัตน์ แต่งตั้ง", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "thammarat.ta@kmitl.ac.th",
edu: "วศ.ม.วิศวกรรมไฟฟ้า สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"IMAGE PROCESSING,DATA PROCESSING,NP-HARD PROBLEM,ARTIFICIAL INTELLIGENCE,OPTIMIZATION PROBLEM"},

{ img:"img_phy/Screenshot 2026-01-16 131355.png", 
nameEN:"Aj.Surachart Kamoldilok", 
nameTH:"อ.สุรชาติ กมลดิลก", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "kamoldiloks@gmail.com",
edu: "ปริญญาโท/วท.ม.(สาขาฟิสิกส์ประยุกต์)สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"LASERS,OPTICAL INSTRUMENTS,PHOTONICS,FORENSIC SCIENCE,PHYSICS EDUCATION "},

{ img:"img_phy/Screenshot 2026-01-16 131410.png", 
nameEN:"Asst.Prof.Dr.Nathaporn Promros", 
nameTH:"ผศ.ดร.ณัฐพร พรหมรส", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "kpnathap@kmitl.ac.th",
edu: "Doctor of Engineering/Applied Science fro Electronics and Materials,Kyushu University. ญี่ปุ่น",
skill:"THIN FILM,THERMOELECTRIC MATERIAL,THERMAL PROPERTY,MATERIAL SCIENCE,MATERIAL CHARACTERIZATION"},

{ img:"img_phy/Screenshot 2026-01-16 131424.png", 
nameEN:"Assoc.Prof.Dr.Chesta ", 
nameTH:"รศ.ดร.เชรษฐา รัตนพันธ์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "chesta.ru@kmitl.ac.th",
edu: "ปรัชญาดุษฎีบัณฑิต/ฟิสิกส์ประยุกต์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"SYNTHESIS,CHARACTERIZATION,IMPROVEMENT OF THERMOELECTRIC MATERIALS"},

{ img:"img_phy/Screenshot 2026-01-16 131435.png", 
nameEN:"Assoc.Prof.Dr.Kitsakorn Locharoenrat", 
nameTH:"รศ.ดร.กฤษกร โล้เจริญรัตน์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "kitsakorn.lo@kmitl.ac.th",
edu: "Ph.D./ Physical Materials Science , Japan Advanced Institute of Scienceand Technology, 2550, Japan",
skill:"CANCER,PLASMONIC,NANOPARTICLES"},

{ img:"img_phy/Screenshot 2026-01-16 131452.png", 
nameEN:"Asst.Prof.Dr.Bhanupol Klongratog", 
nameTH:"ผศ.ดร.ภาณุพล โขลนกระโทก", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "bhanupol.kl@kmitl.ac.th",
edu: " วิศวกรรมศาสตรดุษฎีบัณฑิต/วิศวกรรมไฟฟ้าสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:" MEASUREMENT AND INSTRUMENTATIONS,FORENSIC SCIENCE,IMAGE PROCESSING,SPORT SCIENCE,COMPUTER AND ELECTRONICS IN AGRICULTURE"},

{ img:"img_phy/Screenshot 2026-01-16 131509.png", 
nameEN:"Asst.Prof.Dr.Pisan Sukwisute", 
nameTH:"ผศ.ดร.พิศาล สุขวิสูตร", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "pisan.su@kmitl.ac.th",
edu: "ปรัชญาดุษฎีบัณฑิต/ฟิสิกส์ มหาวิทยาลัยสงขลานครินทร์",
skill:"PIEZOELECTRIC MATERIAL,MATERIALS SCIENCE,ENERGY HARVESTING SENSOR,MATERIAL CHARACTERIZATION"},

{ img:"img_phy/Screenshot 2026-01-16 131521.png", 
nameEN:"Dr.Chinnapat Ruttanasirawit", 
nameTH:"ดร.ชินพรรธน์ รัตนศิรวิทย์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "woraka.ne@kmitl.ac.th",
edu: "Ph.D. Physics North Carolina State University, USA",
skill:"SURFACE PLASMONIC RESONANCE,NANOTECHNOLOGY,OPTICAL SENSOR,SMART FARMING,STEM EDUCATION"},

{ img:"img_phy/Screenshot 2026-01-16 131535.png", 
nameEN:"Dr.Keerayoot Srinuanjan", 
nameTH:"ผศ.ดร.กีรยุทธ์ ศรีนวลจันทร์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "keerayoot.sr@kmitl.ac.th",
edu: "วท.ม.(ฟิสิกส์ประยุกต์)/ฟิสิกส์ประยุกต์สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 131549.png", 
nameEN:"Dr.Witoon Yindeesuk", 
nameTH:"ดร.วิฑูรย์ ยินดีสุข", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "witoon.yi@kmitl.ac.th",
edu: "Doctor of Philosophy/Engineering Science,The University of Electro-Communications, Japan",
skill:"SOLAR CELLS,QUANTUM DOTS,SOLAR ENERGY,THIN FILMS,SILAR METHODS"},

{ img:"img_phy/Screenshot 2026-01-16 131601.png", 
nameEN:"Dr.Nuttakrit Somdock", 
nameTH:"ดร.ณัฏกฤษ สมดอก", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "nuttakrit.so@kmitl.ac.th",
edu: "",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 131615.png", 
nameEN:"Dr.Lunchakurn Tannukij", 
nameTH:"ดร.ลัญจกร ตันนุกิจ", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "Lunchakurn.ta@kmitl.ac.th",
edu: "",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 131626.png", 
nameEN:"Dr. Chalermpol Rudradawong", 
nameTH:"ดร.เฉลิมพล รุจรดาวงศ์", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "chalermpol.ru@kmitl.ac.th",
edu: "",
skill:""},

{ img:"img_phy/Screenshot 2026-01-16 131642.png", 
nameEN:"Dr. Yongyut Kaewjumras", 
nameTH:"ดร.ยงยุทธ แก้วจำรัส", 
position:"อาจารย์ผู้รับผิดชอบหลักสูตร",    
email: "yongyut.ka@kmitl.ac.th",
edu: "วศ.ด. วิศวกรรมไฟฟ้า สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง,วศ.ม. วิศวกรรมไมโครอิเล็กทรอนิกส์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง,วท.บ. วิทยาศาสตร์ฟิสิกส์ประยุกต์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
skill:"IC Fabrication Technology, Sensors and Transducers,Material Sensing Electronic Circuit designs, Internet of Things (IoTs)"},


];

const staff = [
{img:"img_phy/Screenshot 2026-01-16 131653.png", 
nameEN:"Saisudawan Suttiyan", 
nameTH:"นางสาวสายสุดาวัลย์ สุทธิญาณ", 
position:"นักวิทยาศาสตร์",    
email: "saisudawan1@hotmail.com"},

{img:"img_phy/Screenshot 2026-01-16 131704.png", 
nameEN:"Mrs.Pimporn Onlaor", 
nameTH:"นางพิมพร อ่อนละออ", 
position:"นักวิทยาศาสตร์",    
email: "pimporn.be@kmitl.ac.th"},

{img:"img_phy/Screenshot 2026-01-16 131712.png", 
nameEN:"Miss Nalita Sawangjit", 
nameTH:"น.ส.นลิตา สว่างจิตต์", 
position:"นักวิทยาศาสตร์",    
email: "nalita.sa@kmitl.ac.th"},

{img:"img_phy/Screenshot 2026-01-16 131726.png", 
nameEN:"Miss Kesanee Ketnuam", 
nameTH:"น.ส.เกศณี เกตุนวม", 
position:"เจ้าหน้าบริหารงานทั่วไป เลขานุการ",    
email: "kesanee.ke@kmitl.ac.th"},

{img:"img_phy/Screenshot 2026-01-16 131738.png", 
nameEN:"Mr.Weraphan Tipaphong", 
nameTH:"นายวีระพันธ์ ทิพาพงศ์", 
position:"นักวิทยาศาสตร์",    
email: "weraphan.ti@kmitl.ac.th"},

{img:"img_phy/Screenshot 2026-01-16 131750.png", 
nameEN:"Mr.Chawanon Mano", 
nameTH:"นายชวนนท์ มะโน", 
position:"นักวิทยาศาสตร์",    
email: "chawanon.ma@kmitl.ac.th"},

{
img:"img_phy/unnamed.jpg",
nameEN:"Mr.Saorj Chooampai", 
nameTH:"นายสาโรจน์ ชูอำไพ",
position:"ผู้ปฏิบัติการนักวิทยาศาสตร์",
email:"saroj.ch@kmitl.ac.th"
}

];
function render(){

const profGrid=document.getElementById("profGrid");
const staffGrid=document.getElementById("staffGrid");

professors.forEach(p=>{
    const card=createCard(p);
    profGrid.appendChild(card);
});

staff.forEach(p=>{
    const card=createCard(p);
    staffGrid.appendChild(card);
});

}

function createCard(p) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${p.img}" alt="${p.nameTH}">
        <div class="card-info">
            <h3>${p.nameEN}</h3>
            <h3>${p.nameTH}</h3>
            <p>${p.position}</p>
        </div>
    `;
    card.onclick = () => openOverlay(p);
    return card;
}
function openOverlay(p) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    
    // 1. จัดการรูปภาพ
    document.getElementById("ov-img").src = p.img;

    // 2. จัดการข้อมูลใต้รูป (ฝั่งซ้าย)
    document.getElementById("ov-sub-name").innerHTML = `
        <div style="font-weight: bold; color: var(--primary-color);">${p.position}</div>
        <div style="font-size: 0.9rem; font-weight: bold;">${p.nameTH || p.name}</div>
    `;

    // 3. จัดการชื่อและข้อมูลติดต่อ (ฝั่งขวา)
    document.getElementById("ov-name").innerHTML = `
        <div class="name-th-large">${p.nameTH || p.name}</div>
        <div class="name-en-sub">${p.nameEN || ''}</div>
        <div style="margin-top: 10px;"><strong>ตำแหน่ง :</strong> ${p.position}</div>
        ${p.email && p.email !== '-' ? `<div><strong>e-mail :</strong> ${p.email}</div>` : ''}
    `;

    // 4. จัดการประวัติการศึกษา (ถ้ามีข้อมูล)
    const eduBox = document.getElementById("ov-edu");
    if (p.edu && p.edu.trim() !== "") {
        const list = p.edu.split(',').map(i => `<li>${i.trim()}</li>`).join('');
        eduBox.innerHTML = `<strong>ประวัติการศึกษา</strong><ul>${list}</ul>`;
        eduBox.style.display = "block";
    } else {
        eduBox.style.display = "none";
    }

    // 5. จัดการความเชี่ยวชาญ (ถ้ามีข้อมูล)
    const skillBox = document.getElementById("ov-skill");
    if (p.skill && p.skill.trim() !== "" && p.skill !== "-") {
        const list = p.skill.split(',').map(i => `<li>${i.trim()}</li>`).join('');
        skillBox.innerHTML = `<strong>ความเชี่ยวชาญ</strong><ul>${list}</ul>`;
        skillBox.style.display = "block";
    } else {
        skillBox.style.display = "none";
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}

// ปิดเมื่อคลิกข้างนอก
window.onclick = (e) => {
    if (e.target == document.getElementById("overlay")) closeOverlay();
}
render();
// ปิด popup เมื่อคลิกพื้นที่ด้านนอกการ์ด
window.onclick = function(event) {
    const overlay = document.getElementById("overlay");
    const card = document.querySelector(".overlay-card");

    if (event.target === overlay) {
        closeOverlay();
    }
};