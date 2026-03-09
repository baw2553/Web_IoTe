const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const jumpSound = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg"); 
jumpSound.volume = 0.5; 

const bgMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
bgMusic.loop = true; 
bgMusic.volume = 0.2; 
let currentUser = { name: "Guest", avatarSrc: "https://cdn-icons-png.flaticon.com/512/149/149071.png", avatarImg: new Image() };
currentUser.avatarImg.crossOrigin = "Anonymous"; 
currentUser.avatarImg.referrerPolicy = "no-referrer";
let isGameOver = false, isPaused = false;
let lastRenderTime = 0;
const FPS = 60;
const fpsInterval = 1000 / FPS;
let distance = 0, score = 0, speed = 5;
let obstacles = [];
let clouds = []; 
let buildings = []; 
let items = []; 
const maxLives = 3;
let lives = 3;
let safeZoneUntil = 0;   
let dangerZoneUntil = 0; 
let invincibleFrames = 0; 
let currentFactText = "";
let factTimer = 0;
const player = { x: 100, y: 300, width: 40, height: 40, dy: 0, gravity: 0.6, jumpPower: -10, jumps: 0, maxJumps: 2 };

let isBossFight = false;
let bossLevel = 1;
let currentBossType = 0; 
let bossDuration = 0; 
let nextBossSpawn = 5000; // รอบการเกิดบอสตัวต่อไป
let boss = { x: 0, y: 100, width: 60, height: 60, dy: 2 };
let bossProjectiles = []; 

let wrongAnswers = 0; // เก็บสถิติตอบผิด (ใช้เพิ่ม HP บอสไล่ล่า)
let poisonStacks = 0; // เก็บสเตคพิษจากไวรัส (ครบ 3 ตายทันที)
let boss1Hp = 0; // จำนวนการกระโดดที่ต้องทำเพื่อฆ่าบอส 1

// ☁️ คลาสสำหรับก้อนเมฆ
class Cloud {
    constructor(startX) {
        this.x = startX !== undefined ? startX : canvas.width + 50;
        this.y = Math.random() * 120 + 20; 
        this.speed = Math.random() * 0.5 + 0.2; 
        this.size = Math.random() * 0.8 + 0.5; 
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20 * this.size, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(this.x + 15 * this.size, this.y - 15 * this.size, 20 * this.size, Math.PI * 1, Math.PI * 2);
        ctx.arc(this.x + 35 * this.size, this.y - 10 * this.size, 20 * this.size, Math.PI * 1, Math.PI * 2);
        ctx.arc(this.x + 50 * this.size, this.y, 20 * this.size, Math.PI * 1.5, Math.PI * 0.5);
        ctx.fill();
    }
    update() {
        this.x -= this.speed;
        this.draw();
    }
}

class Building {
    constructor(startX, isForeground) {
        this.x = startX;
        this.isForeground = isForeground; 
        this.width = Math.random() * 80 + 60;
        this.height = Math.random() * 100 + (isForeground ? 80 : 150);
        this.y = 340 - this.height; 
        this.speed = isForeground ? 1.5 : 0.5; 
        this.color = isForeground ? "#e67e22" : "#95a5a6"; 
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.isForeground ? "#d35400" : "#7f8c8d";
        for (let wx = this.x + 10; wx < this.x + this.width - 20; wx += 25) {
            for (let wy = this.y + 20; wy < this.y + this.height - 20; wy += 30) {
                ctx.fillRect(wx, wy, 15, 20);
            }
        }
    }
    update() {
        this.x -= this.speed;
        this.draw();
    }
}

const factTexts = [
    "สาขาวิศวกรรมคอมพิวเตอร์และ IoT ยินดีต้อนรับ!",
    "เราเน้นเรียนรู้ทั้ง Hardware และ Software 💻🔌",
    "จบไปเป็นโปรแกรมเมอร์ หรือ IoT Engineer ได้สบาย!",
    "รู้หรือไม่? IoT ทำให้สิ่งของคุยกันเองได้ผ่านเน็ต",
    "เรียนจริง ทำจริง พร้อมต่อยอด",
    "อยากทำsmart home smart city smart iot ต้องที่นี่ IoTEำ",
    "เรียนรู้ ลงมือทำ ต่อยอด IOTE",
    "ทั้งซอฟต์แวร์ ทั้งฮาร์ดแวร์ ต้องIoTE",
    "One two three IOT ยินดีต้อนรับ",
    "น้องๆคนดี พี่ๆiot รออยู่ค้าบบบ",
    "Iote สจล ไม่ต้องรอ ได้ทำจริง",
    "ทำเป็น ทำได้ ทำดี ต้องที่ iot",
    "จบที่นี่เข้าสายงาน วิศวกรระบบไอโอที ได้นะ",
    "จบที่นี่เข้าสายงาน นักวิเคราะห์ระบบ ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรซอฟต์แวร์ ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรระบบเครือข่าย ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรระบบโทรคมนาคม ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรระบบเซนเซอร์และการวัด ได้นะ",
    "จบที่นี่เข้าสายงาน นักพัฒนาซอฟต์แวร์ ได้นะ",
    "จบที่นี่เข้าสายงาน โปรแกรมเมอร์ ได้นะ",
    "จบที่นี่เข้าสายงาน นักออกแบบระบบเครือข่าย ได้นะ",
    "จบที่นี่เข้าสายงาน นักบริหารฐานข้อมูล ได้นะ",
    "จบที่นี่เข้าสายงาน นักพัฒนาเว็บไซต์ ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรระบบเครือข่ายคอมพิวเตอร์ ได้นะ",
    "จบที่นี่เข้าสายงาน ผู้ดูแลระบบเครือข่าย ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรข้อมูล ได้นะ",
    "จบที่นี่เข้าสายงาน ผู้เชี่ยวชาญด้านปัญญาประดิษฐ์ และเทคโนโลยีที่เกี่ยวข้องกับการสื่อสารและโทรคมนาคมสมัยใหม่ ได้นะ",
    "จบที่นี่เข้าสายงาน นักวิจัย/นักพัฒนานวัตกรรม ได้นะ",
    "จบที่นี่เข้าสายงาน ผู้ประกอบการทางธุรกิจและเทคโนโลยี ได้นะ",
    "จบที่นี่เข้าสายงาน นักวิทยาศาสตร์ข้อมูล ได้นะ",
    "จบที่นี่เข้าสายงาน นักฟิสิกส์อุตสาหกรรม ได้นะ",
    "จบที่นี่เข้าสายงาน วิศวกรมาตรวิทยา ได้นะ",
    "อยากเขียนโค้ด ควบคุมอุปกรณ์ และวิเคราะห์ข้อมูล? IoT คือคำตอบ"
];

const questions = [
    { q: "IoT ย่อมาจากคำว่าอะไร?", choices: ["Internet of Technology", "Internet of Things", "Information of Technology", "Internet of Tools"], ans: 1 },
    { q: "บอร์ดใดนิยมใช้ในการเรียนรู้ IoT มากที่สุด?", choices: ["VGA Card", "Motherboard", "ESP32 / Arduino"], ans: 2 },
    { q: "1 Byte มีค่าเท่ากับกี่ Bit?", choices: ["4 Bit", "8 Bit", "16 Bit", "32 Bit"], ans: 1 },
    { q: "กฎของโอห์ม (Ohm's Law) คือสมการใด?", choices: ["P = I * V", "F = m * a", "V = I * R", "E = mc^2"], ans: 2 },
    { q: "IoT ควบคุมอุปกรณ์จากระยะไกลได้ไหม?", choices: ["ได้", "ไม่ได้"], ans: 0 },
    { q: "ข้อใดคือแนวคิดของคำว่า IoT", choices: ["การเชื่อมต่ออุปกรณ์ต่าง ๆ ผ่านอินเทอร์เน็ต", "การสร้างเว็บไซต์", "การออกแบบกราฟิก", "การเขียนบทความ"], ans: 0 },
    { q: "เซนเซอร์ในระบบ IoT มีหน้าที่อะไร", choices: ["ตรวจจับข้อมูลจากสิ่งแวดล้อม", "วาดภาพ", "พิมพ์เอกสาร", "เล่นเพลง"], ans: 0 },
    { q: "ข้อมูลที่ได้จากเซนเซอร์จะถูกส่งไปที่ใด", choices: ["กระดาษ", "สมุดบันทึก", "หนังสือ", "ระบบประมวลผลหรือ Cloud"], ans: 3 },
    { q: "Cloud Computing ใน IoT ใช้ทำอะไร", choices: ["วิเคราะห์ข้อมูล", "เก็บและประมวลผลข้อมูล", "รวบรวมข้อมูล", "ไม่มีข้อใดถูกต้อง"], ans: 1 },
    { q: "ข้อใดสามารถควบคุมอุปกรณ์ผ่านระบบ IOT ได้บ้าง", choices: ["สวิตไฟ", "แอร์", "ลำโพง", "ถูกทุกข้อ"], ans: 3 },
    { q: "ข้อใดเป็นตัวอย่างของ Smart Home", choices: ["เปิด–ปิดไฟผ่านมือถือ", "ระบบล็อกประตู", "กล้องวงจรปิดออนไลน์", "ถูกทุกข้อ"], ans: 3 },
    { q: "ข้อใดคือประโยชน์ของ IoT", choices: ["เพิ่มความสะดวกสบาย", "ประหยัดพลังงาน", "เพิ่มประสิทธิภาพการทำงาน", "ถูกทุกข้อ"], ans: 3 },
    { q: "IoT สามารถใช้ในด้านใดได้บ้าง", choices: ["การแพทย์", "การเกษตร", "การค้า", "ถูกทุกข้อ"], ans: 3 },
    { q: "ไมโครคอนโทรลเลอร์คืออะไร?", choices: ["ไมโครคอนโทรลเลอร์คืออุปกรณ์ที่ใช้ในการเก็บข้อมูลเท่านั้น", "ไมโครคอนโทรลเลอร์คืออุปกรณ์ที่ใช้ในการสื่อสารระหว่างผู้คน", "ไมโครคอนโทรลเลอร์คือคอมพิวเตอร์ขนาดใหญ่ที่ใช้ในการประมวลผลข้อมูล", "ไมโครคอนโทรลเลอร์คืออุปกรณ์อิเล็กทรอนิกส์ที่ใช้ในการควบคุมอุปกรณ์ต่างๆ โดยรวม CPU, หน่วยความจำ, และอุปกรณ์เชื่อมต่อในชิปเดียว"], ans: 3 },
    { q: "ไมโครคอนโทรลเลอร์ทำงานอย่างไร?", choices: ["ไมโครคอนโทรลเลอร์ทำงานโดยการเชื่อมต่อกับอินเทอร์เน็ต", "ไมโครคอนโทรลเลอร์ทำงานโดยการประมวลผลข้อมูลและควบคุมอุปกรณ์ต่างๆ ตามโปรแกรมที่กำหนด", "ไมโครคอนโทรลเลอร์ทำงานโดยการเก็บข้อมูลในหน่วยความจำ", "ไมโครคอนโทรลเลอร์ทำงานโดยการสร้างภาพกราฟิก"], ans: 1 },
    { q: "MCU เป็นชื่อเรียกของอะไร", choices: ["หน่วยประมวลผลกลาง", "ไมโครโปรเซสเซอร์", "ไมโครคอนโทรลเลอร", "หน่วยความจำ"], ans: 2 },
    { q: "โปรแกรมของ Arduino แบ่งได้ เป็นสองส่วนคือ", choices: ["void setup() และ void loop()", "voidvoid () และ setup loop()", "setupvoid () และ loopvoid ()", "setup() และ loop()"], ans: 0 },
    { q: "ในการทดลองเขียนโปรแกรมควบคุมอุปกรณ์อิเล็กทรอนิคหรืออุปกรณ์ไฟฟ้า เพื่อความสะดวกและไม่ต้องบัคกรีเรานิยม เสียบอุปกรณ์ดังกล่าวกับ อุปกรณ์ใด", choices: ["microcontroller board", "Breadboard หรือ Protoboard", "Key board", "Arduino UNO R3"], ans: 1 },
    { q: "delay(500); คือ", choices: ["หน่วงเวลา 500 มิลลิวินาที", "หน่วงเวลา 500 วินาที", "หน่วงเวลา 50 มิลลิวินาที", "หน่วงเวลา 50 วินาที"], ans: 0 },
    { q: "ไฟเลี้ยงของบอร์ดเมื่อต้องการจ่ายไฟให้กับวงจรภายนอก ประกอบด้วยขาไฟเลี้ยง +3.3 V, +5V, GND, Vin ใช้ช่องใด", choices: ["Power Port", "MCU", "GND", "INPUT"], ans: 0 },
    { q: "ในการเขียนโปรแกรม และคอมไพล์ลงบอร์ด ใช้โปรแกรมใด", choices: ["Arduino DIE", "Arduino IDE", "Arduino EDI", "Arduino EDR"], ans: 1 },
    { q: "ข้อใดต่อไปนี้ไม่ถูกต้อง", choices: ["เซอร์ไอแซค นิวตัน เป็นผู้ตั้งกฎสามข้อของการเคลื่อนที่", "ชาร์ล ดาร์วิน เป็นผู้เขียนหนังสือ On the Origin of Species", "สตีฟ จอบส์ เคยถูกปลดออกจากบริษัท Apple", "อัลเบิร์ต ไอน์สไตน์ ได้รับรางวัลโนเบลจากทฤษฎีสัมพันธภาพพิเศษ"], ans: 3 },
    { q: "ไมโครคอนโทรลเลอร์มีความแตกต่างจากไมโครโปรเซสเซอร์อย่างไร?", choices: ["ไมโครคอนโทรลเลอร์มีความเร็วสูงกว่าไมโครโปรเซสเซอร์", "ไมโครโปรเซสเซอร์ใช้พลังงานมากกว่าไมโครคอนโทรลเลอร์", "ไมโครคอนโทรลเลอร์รวมทุกอย่างในตัวเดียว ขณะที่ไมโครโปรเซสเซอร์ต้องการอุปกรณ์ภายนอก", "ไมโครคอนโทรลเลอร์ไม่สามารถทำงานได้โดยไม่มีไมโครโปรเซสเซอร์"], ans: 2 },
    { q: "อุปกรณ์ใดในปัจจุบันไม่นิยมใช้ ไมโครคอนโทลเลอร์ มีส่วนในการควบคุม", choices: ["สัญญาณไฟจราจร", "รถยนต์", "เครื่องซักผ้า", "ชั้นวางรองเท้า"], ans: 3 },
    { q: "Iron Dome คืออะไร", choices: ["ระบบเลเซอร์วัดระยะห่างอากาศยาน", "ระบบเรดาห์ตรวจจับอากาศยาน", "ระบบป้องกันขีปนาวุธ", "ระบบเตือนภัยอัจฉริยะ"], ans: 2 },
    { q: "โซลาเซลล์ไฮบริดลอยนำ้าที่ใหญ่ที่สุดในโลกอยู่ที่ประเทศอะไร", choices: ["ไทย", "ญี่ปุ่น", "สาธารณรัฐประชาชนจีน", "อินเดีย"], ans: 0 },
    { q: "Net-Zero Emission คืออะไร", choices: ["การยับยั้งการปล่อยก๊าซเรือนกระจกให้เป็นศูนย์", "การปล่อยก๊าซเรือนกระจกให้น้อยที่สุดเท่าที่จะเป็นไปได้", "การชดเชยการปล่อยก๊าซเรือนกระจกทั้งหมด โดยการดูดซับหรือกำาจัดออกจากบรรยากาศ", "การเพิ่มการใช้พลังงานหมุนเวียนในสัดส่วนที่สูงที่สุด"], ans: 2 },
    { q: "เพราะเหตุใดจึงเรียกเครื่องปฏิกรณ์ฟิวชันว่า “ดวงอาทิตย์จำาลอง”", choices: ["เพราะเครื่องปฏิกรณ์ฟิวชันมีอุณหภูมิเท่ากับดวงอาทิตย์", "เพราะเครื่องปฏิกรณ์ฟิวชันใช้พลังงานแสงอาทิตย์ในการทำางาน", "เพราะเครื่องปฏิกรณ์ฟิวชันสามารถสร้างแสงสว่างเท่ากับดวงอาทิตย์", "เพราะเครื่องปฏิกรณ์ฟิวชันจำาลองกระบวนการเกิดพลังงานเช่นเดียวกับในดวงอาทิตย์"], ans: 3 },
    { q: "ประเทศญี่ปุ่นได้ดำเนินการปล่อยนที่ใช้ในการหล่อเย็นเครื่องปฏิกรณ์ที่เกิดอุบัติเหตุที่ฟูกุชิมะ น้ำดังกล่าว ได้ถูกพิจารณาว่ามีสารปนเปื้อนจากรังสี รังสีดังกล่าวมาจากไอโซโทปใด", choices: ["H-13", "U-235", "Ra-226", "Sr-90"], ans: 0 },
    { q: "อุบัติเหตุที่เกิดขึ้นกับเรือดำาน้ำ Titan เกิดจากสาเหตุใด", choices: ["การขาดแคลนออกซิเจนภายในเรือดำาน้ำ", "การขัดข้องของเครื่องยนต์", "โครงสร้างเรือดำาน้ำรับแรงดันใต้น้ำไม่ไหว", "การชนกับภูเขาใต้ทะเล"], ans: 2 },
    { q: "ปรากฏการณ์ “ลานีญา” ส่งผลต่อภูมิอากาศในประเทศไทยอย่างไร", choices: ["ฤดูร้อนจะยาวนานขึ้นและมีอุณหภูมิสูงกว่าปกติ", "ฤดูฝนจะมีฝนตกมากขึ้นและมีความเสี่ยงน้ำท่วมสูงขึ้น", "ฤดูหนาวจะมีอากาศเย็นและแห้งกว่าปกติ", "ฤดูฝนจะมีฝนน้อยลงและมีภัยแล้งบ่อยขึ้น"], ans: 1 },
    { q: "ในสงครามระหว่างรัสเซียกับยูเครน ได้มีการต่อต้านกระสุนเจาะเกราะ เนื่องจากการปนเปื้อนของสาร กัมมันตรังสีในธรรมชาติ สารกัมมันตรังสีในหัวกระสุนเจาะเกราะคือธาตุใด", choices: ["ตะกั่ว", "ซีเซียม", "พลูโตเนียม", "ยูเรเนียม"], ans: 3 },
    { q: "การทำงานของไมโครคอนโทรลเลอร์มีความสำคัญอย่างไรในระบบอัตโนมัติ?", choices: ["ไมโครคอนโทรลเลอร์ช่วยในการควบคุมและประมวลผลข้อมูลในระบบอัตโนมัติ ทำให้การทำงานเป็นไปอย่างมีระเบียบและแม่นยำ", "ไมโครคอนโทรลเลอร์ทำให้ระบบทำงานช้าลง", "ไมโครคอนโทรลเลอร์ไม่เกี่ยวข้องกับระบบอัตโนมัติ", "ไมโครคอนโทรลเลอร์ใช้ในการเก็บข้อมูลเท่านั้น"], ans: 0 },
    { q: "เครื่องบินขับไล่ F-22 และ F-35 ถูกเรียกเป็น Stealth Fighter เพราะเหตุใด", choices: ["ไม่สามารถมองเห็นได้ด้วยสายตา", "ขับเคลื่อนด้วยพลังงานนิวเคลียร์", "ตรวจพบได้ยากด้วยเรดาร์", "ความเร็วสูงกว่าเสียง 3 เท่า"], ans: 2 },
    { q: "ข้อใดต่อไปนี้เป็นวิธีที่ดีที่สุดที่ช่วยให้ปรากฎการณ์เรือนกระจกเกิดขึ้นน้อยที่สุด", choices: ["ปลูกผักสวนครัวเพื่อประกอบอาหารเอง", "ลดการดูโทรทัศน์โดยไม่จำเป็น", "งดการใช้จ่ายที่ห้างสรรพสินค้าโดยไม่จำเป็น", "ลดการใช้เชื้อเพลิงให้มาก"], ans: 3 },
    { q: "ข้อใดเป็นความแตกต่างระหว่างไมโครโปรเซสเซอร์กับไมโครคอนโทรลเลอร์", choices: ["ไมโครคอนโทรลเลอร์มีหน่วยความจำและพอร์ตเชื่อมต่ออุปกรณ์อินพุตและเอาต์พุต", "ไมโครโปรเซสเซอร์มีหน่วยความจำภายใน", "ไมโครโปรเซสเซอร์มีหน่วยความจำและพอร์ตเชื่อมต่ออุปกรณ์อินพุตและเอาต์พุต", "ไมโครคอนโทรลเลอร์ไม่มีความจำภายใน"], ans: 0 },
    { q: "วัคซีนแอสตราเซเนก้า เป็นวัคซีนชนิดใด", choices: ["เชื้อตาย", "เอ็มอาร์เอ็นเอ", "ไวรัลเวคเตอร์", "โปรตีนส่วนหนึ่งของเชื้อ"], ans: 2 },
    { q: "การผลิตไฟฟ้าจากพลังงานทดแทนในข้อใดต่อไปนี้ ที่ให้กำลังผลิตสูงที่สุดในประเทศไทย", choices: ["พลังงานแสงแดด", "พลังงานลม", "พลังงานนิวเคลียร์", "พลังงานน้ำ"], ans: 3 },
    { q: "ข้อใดไม่เป็นการช่วยลดการใช้พลังงานของเครื่องปรับอากาศ", choices: ["ตั้งอุณหภูมิเครื่องปรับอากาศสูงขึ้น 1-2 องศา", "ตากผ้าขณะเปิดเครื่องปรับอากาศ", "ทำความสะอาดแผ่นกรองเดือนละครั้ง", "เปิดพัดลมขณะเปิดเครื่องปรับอากาศ"], ans: 1 },
    { q: "ข้อใดต่อไปนี้ไม่ใช่แรงพื้นฐานในธรรมชาติ", choices: ["แรงลอยตัว", "แรงโน้มถ่วง", "แรงแม่เหล็กไฟฟ้า", "แรงเข้ม"], ans: 0 },
    { q: "เทคโนโลยีในข้อใดต่อไปนี้ไม่ใช่ตัวอย่างของการใช้ปัญญาประดิษฐ์", choices: ["การค้นหาบน Google", "การซื้อสินค้าผ่านเครื่องจำหน่ายสินค้าอัตโนมัติ", "การแนะนำคลิปวิดีโอทาง Youtube", "การปลดล็อกหน้าจอโทรศัพท์ด้วย Face ID"], ans: 1 },
    { q: "ไมโครคอนโทรลเลอร์สามารถเชื่อมต่อกับเซนเซอร์ได้หรือไม่?", choices: ["เฉพาะบางเซนเซอร์", "ไม่ใช่", "ต้องใช้บอร์ดเสริม", "ใช่"], ans: 3 },
    { q: "โครงสร้างพื้นฐานของไมโครคอนโทรลเลอร์ข้อใดไม่ใช่ส่วนประกอบของโครงสร้าง", choices: ["หน่วยความจำข้อมูล", "หน่วยประมวลกลาง", "วงจรกำเนิดสัญญาณไซน์", "ส่วนติดต่อกับอุปกรณ์ภายนอกหรือพอร์ต"], ans: 2 },
    { q: "ขณะเดินทางโดยรถยนต์ มีผู้โดยสารวางกระเป๋าเดินทางไว้ท้ายรถ พุ่งไปด้านหน้าและชนผู้โดยสารอีกคนจนบาดเจ็บ จากสถานการณ์ต่อไปนี้ ข้อใด เป็นไปได้มากที่สุด ที่จะทำให้เกิดเหตุการณ์นี้", choices: ["รถแล่นไปด้านหน้าอย่างรวดเร็ว", "รถแล่นไปด้านหน้าอย่างช้าๆ", "รถแล่นไปด้านหลังอย่างรวดเร็ว", "รถแล่นไปด้านหลังอย่างช้าๆ"], ans: 2 },
    { q: "ถ้าม้ากำลังวิ่งลงสู่พื้นที่ที่ต่ำลงจากภูเขา และกำลังวิ่งมาด้วยความเร็วสูง ม้ากำลังพยายาม “กระโดด” ก่อนที่ลำตัวจะกระแทกพื้น ถามว่าจะเกิดอะไรขึ้น", choices: ["ม้าจะปลอดภัย เพราะการกระโดดช่วยลดแรงกระแทกจากการตก", "ม้าจะปลอดภัย ถ้าการกระโดดทำให้แรงลัพธ์เป็นศูนย์ก่อนชน", "ม้าจะไม่ปลอดภัย เพราะหลังจากกระโดด ความเร็วจะลดลงมากกว่าเดิม", "ม้าจะไม่ปลอดภัย แรงกระแทกยังเกิดขึ้นรุนแรง แม้จะกระโดดขึ้น"], ans: 3 },
    { q: "ในโครงการดักจับคาร์บอนไดออกไซด์ (Carbon Capture) ที่ประเทศไอซ์แลนด์ หลังจากดักจับก๊าซคาร์บอนไดออกไซด์จากชั้นบรรยากาศแล้ว จะมีการจัดการกับคาร์บอนอย่างไรต่อไป", choices: ["ทราย", "หิน", "ออกซิเจน", "ถ่านโค้กคาร์บอน"], ans: 1 },
    { q: "จากภาพยนตร์แนว Sci-fi ข้อใดต่อไปนี้คือเหตุการณ์ที่ สามารถเกิดขึ้นจริง ได้ในปัจจุบันตามหลักวิทยาศาสตร์", choices: ["มนุษย์สามารถสร้างวัตถุที่เคลื่อนที่เร็วกว่าความเร็วแสงในสุญญากาศได้", "มนุษย์สามารถสร้างเครื่องย้อนเวลาเพื่อเดินทางกลับสู่อดีต", "มนุษย์สามารถส่งยานอวกาศเพื่อเข้าไปในหลุมดำ", "มนุษย์สามารถสร้างวัตถุเพื่อส่งออกนอกระบบสุริยะได้"], ans: 3 },
    { q: "หากต้องการติดตั้งแผงโซลาร์เซลล์ในประเทศไทยเพื่อให้ผลิตไฟฟ้าได้อย่างมีประสิทธิภาพสูงสุดตลอดทั้งปี ควรติดตั้งในลักษณะใดมากที่สุด", choices: ["ติดตั้งแผงโซลาร์เซลล์โดยเอียงไปทางทิศใต้", "ติดตั้งแผงโซลาร์เซลล์โดยเอียงไปทางทิศเหนือ", "ติดตั้งแผงโซลาร์เซลล์โดยเอียงไปทางทิศตะวันตก", "ตั้งแผงโซลาร์เซลล์ให้ตั้งฉากกับแกนโลก"], ans: 0 },
    { q: "ข้อใดกล่าวถูกต้องเกี่ยวกับ Machine Learning", choices: ["เป็นระบบที่ต้องมีมนุษย์เข้ามาในการอัปเดตคำสั่งทุกครั้งก่อนใช้งาน", "เป็นระบบที่ใช้สำหรับจัดเก็บข้อมูลขนาดใหญ่เท่านั้น", "เป็นกระบวนการที่วิเคราะห์ข้อมูลตามชุดคำสั่งที่เขียนไว้ล่วงหน้า โดยไม่สามารถเปลี่ยนแปลงตนเองได้", "เป็นระบบที่สามารถเรียนรู้ จดจำ ปรับปรุง แก้ไขจากประสบการณ์ คล้ายการทำงานของสมองมนุษย์"], ans: 3 },
    { q: "จังหวัดใดในประเทศไทยที่มีความเสี่ยงต่อการได้รับผลกระทบจากพายุไซโคลนหรือพายุไต้ฝุ่นมากที่สุด", choices: ["สุราษฎร์ธานี", "เชียงใหม่", "หนองคาย", "อุบลราชธานี"], ans: 0 },
    { q: "ระเบิดปรมาณูที่ถูกใช้ในช่วงปลายสงครามโลกครั้งที่ 2 พลังงานจากการระเบิดมาจากกระบวนการในข้อใด", choices: ["กระบวนการสลายตัวทางรังสี (Radioactive Decay)", "กระบวนการนิวเคลียร์แบบแตกตัว (Fission)", "กระบวนการเชิงกล (Physical Impact)", "กระบวนการเคมี (Chemical Reaction)"], ans: 1 },
    { q: "ผู้ที่อยู่เบื้องหลังในการสร้าง Bitcoin ซึ่งมีนามแฝงว่า ซาโตชิ นากาโมโตะ (Satoshi Nakamoto) เป็นผู้มีสัญชาติในข้อใด", choices: ["ไม่ทราบสัญชาติ", "อังกฤษ", "เยอรมนี", "สหรัฐอเมริกา"], ans: 0 },
    { q: "การเปลี่ยนแปลงที่เกิดขึ้นอย่างรวดเร็วที่เรียกว่า “Digital Disruption” ในข้อใดที่ปรากฏให้เห็นได้อย่างชัดเจนและเป็นอันดับแรก", choices: ["Block Chain", "Cryptocurrency", "Digital Camera", "Smart Phone"], ans: 2 },
    { q: "สมการ E = mc² มีผลกับกฎทางฟิสิกส์ในข้อใด", choices: ["กฎการอนุรักษ์มวลและโมเมนตัมเชิงเส้น", "กฎการอนุรักษ์มวลและโมเมนตัมเชิงมุม", "กฎการอนุรักษ์มวลและพลังงาน", "กฎการอนุรักษ์มวลและประจุ"], ans: 2 },
    { q: "ท่านอยู่ที่จุดศูนย์กลางห้องวงกลมรัศมีกว้างมากซึ่งหมุนได้ 360 องศา วิ่งหน้าของท่านคือดวงอาทิตย์กำลังขึ้น ที่เวลาเท่ากับ 0 ห้องจะเริ่มหมุนในทิศทางทวนเข็มนาฬิกา ๆ ด้วยอัตราเร็วเชิงมุมคงที่ ถ้าให้ท่านก้าวข้ามห้องไปยังผนังฝั่งตรงข้าม โดยก้าวหันหน้าทางดวงอาทิตย์ตลอดเวลา ท่านจะต้องเดินอย่างไร", choices: ["เดินในแนวทแยง โดยมีอัตราเร็วเชิงเส้นในทิศทางด้านหน้าและอัตราเร็วเชิงเส้นทางซ้ายคงที่", "เดินในแนวทแยง โดยมีอัตราเร็วเชิงเส้นในทิศทางด้านหน้าคงที่แต่อัตราเร็วเชิงเส้นทางขวาเพิ่มขึ้น", "เดินตรงไปข้างหน้า ด้วยอัตราเร็วเชิงเส้นเพิ่มขึ้น", "เดินตรงไปข้างหน้า ด้วยอัตราเร็วเชิงเส้นคงที่"], ans: 0 },
    { q: "ข้อใดต่างจากพวก", choices: ["Cryptolocker", "Bitcoin", "Zcryptors", "Crytrowall"], ans: 1 },
    { q: "ข้อใดกล่าวถูกต้องเกี่ยวกับ “Green Screen” ในงานถ่ายภาพยนตร์และสื่อดิจิทัล", choices: ["เป็นฉากหลังสีเขียวที่ใช้สำหรับการตัดต่อภาพหรือใส่เอฟเฟกต์ในงานวิดีโอ", "โปรแกรมปลูกต้นไม้โดยคำนวณพื้นที่สีเขียวของเมืองและใช้พลังงานสะอาด", "ผ้าสีเขียวที่ใช้ปูโต๊ะในสตูดิโอถ่ายรูปทุกประเภท", "เครื่องมือสำหรับกรองแสงสีเขียวในกล้องถ่ายภาพ"], ans: 0 },
    { q: "หากคุณโพสต์รูปของตัวเองและเพื่อนลงโซเชียลมีเดีย เช่น เฟซบุ๊ก สิ่งที่ควรคำนึงถึงมากที่สุดคือ", choices: ["อาจมีคนที่ไม่รู้จักเข้ามาแสดงความคิดเห็นที่ไม่เหมาะสม", "ทำให้เราเสียเพื่อนได้หากเพื่อนไม่พอใจ", "ทำให้เราเสียเวลาเมื่อมีคนเข้ามาแสดงความคิดเห็น", "รูปอาจถูกนำไปเผยแพร่ในที่อื่น"], ans: 3 },
    { q: "ข้อใดเป็นการพัฒนาเว็บไซต์อย่างเหมาะสม", choices: ["การกำหนดขอบเขตเนื้อหาและองค์ประกอบ", "การเขียนโปรแกรมโดยไม่มีการวางแผน", "การเขียนโปรแกรมให้ซับซ้อนเพื่อความสวยงาม", "การพัฒนาเว็บไซต์เพียงอย่างเดียวโดยไม่คำนึงถึงผู้ใช้"], ans: 0 },
    { q: "หากนักเรียนพบข้อมูลบนอินเทอร์เน็ตที่ทำให้รู้สึกไม่สบายใจ หรือรู้สึกถูกคุกคาม นักเรียนควรทำอย่างไรเป็นอันดับแรก", choices: ["ไม่ดูหรือไม่เข้าเว็บไซต์นั้น", "ปิดเว็บไซต์นั้นไป", "บอกผู้ปกครองหรือครูที่ดูแลให้ทราบ", "ลบแอปพลิเคชันนั้นทิ้งทันที"], ans: 2 },
    { q: "ข้อใดคือผลกระทบจากการ “ติดเกมคอมพิวเตอร์” มากเกินไป", choices: ["ทำให้สายตาอ่อนล้า มองเห็นไม่ชัด", "ทำให้มีความเครียดและหงุดหงิดง่าย", "ทำให้เสียเวลาศึกษาเล่าเรียน", "ทำให้สุขภาพกายอ่อนแอ"], ans: 2 },
    { q: "ข้อใดเป็นผลกระทบที่เกิดจากการใช้อินเทอร์เน็ต", choices: ["มีความสามารถในการตัดสินใจเพิ่มขึ้น", "สังคมมีการติดต่อสื่อสารและแลกเปลี่ยนข้อมูลข่าวสารมากขึ้น", "มนุษย์ไม่จำเป็นต้องทำงานร่วมกับผู้อื่น", "ตรวจสอบความถูกต้องของข้อมูลก่อนเผยแพร่"], ans: 1 },
    { q: "เมื่อนักเรียนใช้งานคอมพิวเตอร์ที่ห้องคอมพิวเตอร์โรงเรียนเสร็จแล้ว สิ่งที่ควรทำคือข้อใด", choices: ["เปิดเครื่องทิ้งไว้ให้เพื่อนคนต่อไป", "ออกจากระบบ จากนั้นผู้ดูแลจึงปิดทุกครั้ง", "จดรหัสผ่านที่ใช้เข้าเครื่องคอมพิวเตอร์", "เปลี่ยนรหัสผ่านของเครื่องเป็นรหัสที่เราคิดได้คนเดียว"], ans: 1 },
    { q: "ใครคือบุคคลที่นักเรียน “ไม่ควร” รับเป็นเพื่อนในโซเชียลมีเดีย", choices: ["เพื่อนที่นั่งเรียนข้าง ๆ กัน", "คุณครูที่สอนประจำชั้น", "พี่ชายที่อยู่บ้านเดียวกัน", "คนแปลกหน้าที่ไม่มีรูปโปรไฟล์และทักมาขอคุยด้วยทันที"], ans: 3 },
    { q: "ถ้าต้องการข้อมูลคำว่า “น้ำเชื้อ” จาก Google นักเรียนควรเลือกดูจากอะไร?", choices: ["เลือกเว็บไซต์ที่มีรูปภาพสวยงามที่สุด", "เลือกเว็บไซต์ที่มีจำนวนผู้อ่านเยอะ", "เลือกเว็บไซต์ที่มีข้อมูลอัปเดตเสมอ", "อ่านความคิดเห็นหลังข่าวร่วมด้วย"], ans: 2 },
    { q: "สัญลักษณ์รูป “แว่นขยาย” ในเว็บไซต์ค้นหาข้อมูล (Search Engine) มีไว้เพื่ออะไร", choices: ["เพื่อขยายหน้าหนังสือให้ใหญ่ขึ้น", "เพื่อบันทึกรูปภาพ", "เพื่อกดตกลงเริ่มการค้นหา", "เพื่อแสดงความเห็นหลังข่าว"], ans: 2 },
    { q: "การค้นหารูปภาพ “รูปภาพ” ใน Google นักเรียนต้องคลิกที่เมนูใด", choices: ["ทั้งหมด (All)", "วิดีโอ (Videos)", "ค้นรูป (Images)", "แผนที่ (Maps)"], ans: 2 },
    { q: "ข้อมูลใดที่ “ไม่ควร” บอกให้คนแปลกหน้าในอินเทอร์เน็ตทราบ", choices: ["สีที่นักเรียนชอบมากที่สุด", "ชื่อเล่นของสัตว์เลี้ยงที่บ้าน", "การ์ตูนเรื่องที่ชอบดูตอนเย็น", "ที่อยู่บ้านและเบอร์โทรศัพท์"], ans: 3 },
    { q: "คอมพิวเตอร์รับข้อมูลโดยใช้สิ่งใด", choices: ["แป้นพิมพ์และเมาส์", "โปรแกรม", "ซีดีรอม", "ซีพียู"], ans: 0 },
    { q: "ฮาร์ดแวร์  คืออะไร", choices: ["ผู้ที่ใช้งานเครื่องคอมพิวเตอร์", "โปรแกรมคอมพิวเตอร์", "อุปกรณ์คอมพิวเตอร์", "หน่วยประมวลผล"], ans: 2 },
    { q: "การจัดเรียง จัดกลุ่ม ใช้สูตรคำนวณ ข้อมูลควรใช้โปรแกรมใดกับงานนี้", choices: ["Microsoft Word", "Microsoft Excel", "PowerPoint", "Paint"], ans: 1 },
    { q: "การเลือกไมโครคอนโทรลเลอร์สำหรับโปรเจกต์ควรพิจารณาอะไรบ้าง?", choices: ["สีของไมโครคอนโทรลเลอร์", "ขนาดของบรรจุภัณฑ์ไมโครคอนโทรลเลอร์", "ควรพิจารณาความต้องการของโปรเจกต์, จำนวนขา I/O, ความเร็วของ CPU, ขนาดหน่วยความจำ, แหล่งจ่ายไฟ, และความสามารถในการเชื่อมต่อ", "ราคาของไมโครคอนโทรลเลอร์"], ans: 2 }
];
let currentQuestion = null;
window.onload = function() { checkLoginStatus(); };

function checkLoginStatus() {
    let isGoogleLoggedIn = localStorage.getItem('isGoogleLoggedIn') === 'true';
    let googleUserData = JSON.parse(localStorage.getItem('googleUserData') || 'null');
    let isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const loginPanel = document.getElementById("loginPanel");

    if (isGoogleLoggedIn && googleUserData) {
        currentUser.name = isAdmin ? "👑 Admin (" + googleUserData.name + ")" : googleUserData.name;
        currentUser.avatarSrc = googleUserData.picture;
        currentUser.avatarImg.src = currentUser.avatarSrc;

        loginPanel.innerHTML = `
            <h2>🎮 พร้อมวิ่งหรือยัง?</h2>
            <img src="${currentUser.avatarSrc}" referrerpolicy="no-referrer" style="border-radius:50%; width:80px; height:80px; margin-bottom:15px; border:3px solid #f37b21; object-fit: cover;">
            <p>ยินดีต้อนรับ, <strong>${currentUser.name}</strong></p>
            ${isAdmin ? '<p style="color: #f37b21; font-weight: bold; margin-top: -10px;">(สถานะ: ผู้ดูแลระบบ)</p>' : ''}
            <button onclick="startGame()" class="btn-primary">เริ่มเกม!</button>
            <button onclick="logout()" class="btn-secondary" style="margin-top: 10px;">ออกจากระบบ</button>
        `;
    } else {
        loginPanel.innerHTML = `
            <h2>🔒 เข้าสู่ระบบเพื่อบันทึกสถิติ</h2>
            <p>กรุณาล็อคอินเพื่อนำรูปโปรไฟล์มาเป็นตัวละครของคุณ</p>
            <div id="google-login-btn" style="display: flex; justify-content: center; margin: 20px 0;"></div>
            <a href="../index.html" class="btn-secondary" style="font-size: 14px;">กลับหน้าหลัก</a>
        `;
        
        google.accounts.id.initialize({
            client_id: "970219683985-ril851rr9gf8i2bv9d9h49r65kd5i02p.apps.googleusercontent.com", 
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton( document.getElementById("google-login-btn"), { theme: "outline", size: "large" } );
    }
}

//เมลที่รับอนุญาตให้เป็นแอดมิน
function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    localStorage.setItem('isGoogleLoggedIn', 'true');
    localStorage.setItem('googleUserData', JSON.stringify(responsePayload));
    localStorage.setItem('currentUser', responsePayload.name);
    const allowedAdminEmails = ['ballkill555@gmail.com', '67010411@kmitl.ac.th']; 
    if (allowedAdminEmails.includes(responsePayload.email)) {
        sessionStorage.setItem('isAdmin', 'true');
    } else {
        sessionStorage.removeItem('isAdmin');
    }
    checkLoginStatus(); 
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
function logout() {
    sessionStorage.removeItem('isAdmin');
    localStorage.removeItem('isGoogleLoggedIn');
    localStorage.removeItem('googleUserData');
    localStorage.removeItem('currentUser');
    checkLoginStatus(); 
}


function startGame() {
    document.getElementById("hudName").innerText = currentUser.name;
    document.getElementById("hudAvatar").src = currentUser.avatarSrc;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("gameCanvas").classList.remove("hidden");
    document.getElementById("gameHud").classList.remove("hidden");
    document.getElementById("controlsHint").classList.remove("hidden");


    bgMusic.play().catch(e => console.log("รอให้ผู้เล่นคลิกก่อน เพลงถึงจะเล่นได้"));
    resetGame();
    animate();
}

function resetGame() {
    isGameOver = false; isPaused = false; 
    distance = 0; score = 0; speed = 5; 
    obstacles = []; items = []; clouds = []; buildings = [];
    player.y = 300; player.dy = 0;
    
    lives = 3; 
    safeZoneUntil = 0; dangerZoneUntil = 0; factTimer = 0; invincibleFrames = 0;
    
    isBossFight = false;
    bossProjectiles = [];
    bossLevel = 1;
    currentBossType = 0;
    nextBossSpawn = 5000;
    wrongAnswers = 0;
    poisonStacks = 0;
    boss1Hp = 0;

    let glitchOverlay = document.getElementById("glitchOverlay");
    if(glitchOverlay) {
        glitchOverlay.classList.add("hidden");
        glitchOverlay.classList.remove("glitch-active");
    }

    for(let i=0; i<5; i++) clouds.push(new Cloud(Math.random() * canvas.width));
    for(let i=0; i<8; i++) buildings.push(new Building(i * 120, false)); 
    for(let i=0; i<5; i++) buildings.push(new Building(i * 200, true)); 

    document.getElementById("gameOverScreen").classList.add("hidden");
}

function jump() {
    if (isGameOver || isPaused) return;

    //บังคับห้ามกระโดดโจมตีบอส 1 ด้วยการรัวปุ่มแทน
    if (isBossFight && currentBossType === 1 && boss1Hp > 0) {
        boss1Hp--;
        jumpSound.currentTime = 0;
        jumpSound.play();

        if (boss1Hp <= 0) {
            isBossFight = false;
            bossDuration = 0;
            speed += 0.5; 
            score += 1000; 
        }
        return;
    }

    if (player.jumps < player.maxJumps) {
        player.dy = player.jumpPower;
        player.jumps++;
        jumpSound.currentTime = 0;
        jumpSound.play();
    }
}
//window.addEventListener("keydown", (e) => { if (e.code === "Space") jump(); });
//window.addEventListener("touchstart", jump);
//window.addEventListener("mousedown", jump);
window.addEventListener("pointerdown", (e) => {
    let isClickingUI = e.target.closest("button") || 
                       e.target.closest("#loginScreen") || 
                       e.target.closest("#questionScreen") || 
                       e.target.closest("#gameOverScreen");
    
    if (!isClickingUI) {
        jump();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.key === " ") {
        e.preventDefault(); 
        jump();
    }
}, { passive: false });


function spawnObstacle() {
    if (distance <= safeZoneUntil) return; 
    if (isBossFight && currentBossType === 2) return; 

    let spawnRate = 0.015; 
    if (distance <= dangerZoneUntil) spawnRate = 0.04; 
    if (isBossFight && currentBossType === 3) spawnRate = 0.035; 

    if (Math.random() < spawnRate) {
        let isDrone = Math.random() > 0.7; 
        let isPoison = false;
        
        if (isBossFight && currentBossType === 3 && Math.random() < 0.4) {
            isPoison = true;
        }

        obstacles.push({
            x: canvas.width,
            y: (isDrone && !isPoison) ? 220 : 310, 
            width: (isDrone && !isPoison) ? 40 : 30,
            height: (isDrone && !isPoison) ? 20 : 30,
            isDrone: isDrone,
            isPoison: isPoison 
        });
    }
}

function spawnItem() {
    if (Math.random() < 0.01) { 
        let isHeart = Math.random() > 0.85; 
        items.push({
            x: canvas.width,
            y: Math.random() * 100 + 150, 
            width: 30, height: 30,
            type: isHeart ? 'heart' : 'gear'
        });
    }
}

function triggerQuiz() {
    isPaused = true;
    bgMusic.pause(); 

    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById("questionScreen").classList.remove("hidden");
    document.getElementById("qText").innerText = currentQuestion.q;
    document.getElementById("qResult").classList.add("hidden");
    
    let btnContainer = document.getElementById("qButtons");
    btnContainer.innerHTML = "";
    btnContainer.classList.remove("hidden");

    currentQuestion.choices.forEach((choice, index) => {
        let btn = document.createElement("button");
        btn.className = "btn-choice";
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(index);
        btnContainer.appendChild(btn);
    });
}

function checkAnswer(index) {
    document.getElementById("qButtons").classList.add("hidden");
    document.getElementById("qResult").classList.remove("hidden");
    let fb = document.getElementById("qFeedback");
    
    if (index === currentQuestion.ans) {
        fb.innerText = "✅ ยอดเยี่ยม! รับโบนัส 500 คะแนน\nคุณเข้าสู่สถานะ 'อมตะ' 3 วินาที";
        
        if (poisonStacks > 0) {
            fb.innerText += "\n🌿 ตอบถูก ล้างพิษไวรัสสำเร็จ!";
            poisonStacks = 0;
        }
        
        fb.style.color = "green";
        score += 500;
        safeZoneUntil = distance + 100; 
        invincibleFrames = 180; 
    } else {
        wrongAnswers++; // นับข้อผิดเพื่อเอาไปเพิ่ม HP บอส
        fb.innerText = "❌ ผิดครับ!\nระวัง! กับดักจะโผล่มาเยอะขึ้นในระยะ 100 เมตร!";
        fb.style.color = "red";
        dangerZoneUntil = distance + 100; 
        
        // ถ้าตอบผิด แล้วมีพิษอยู่แล้ว หรือกำลังสู้บอสไวรัส -> สเตคพิษ +1
        if (poisonStacks > 0 || (isBossFight && currentBossType === 3)) {
            poisonStacks++;
            fb.innerText += `\n☠️ ตอบผิดโดนพิษแทรกซ้อน! (ปัจจุบัน: ${poisonStacks}/3)`;
            if (poisonStacks >= 3) {
                fb.innerText += "\n💀 พิษเข้าระบบเต็มพิกัด! กำลังปิดเกม...";
                setTimeout(() => { gameOver(); }, 1500);
            }
        }
    }
}

function resumeGame() {
    if(isGameOver) return; 
    
    document.getElementById("questionScreen").classList.add("hidden");
    isPaused = false;
    bgMusic.play(); 
    animate(); 
}

function gameOver() {
    isGameOver = true;
    bgMusic.pause(); 
    bgMusic.currentTime = 0;
    let heartDisplay = document.getElementById("heartDisplay");
    if(heartDisplay) heartDisplay.innerHTML = " | ชีวิต: " + "🖤".repeat(maxLives);
    document.getElementById("gameOverScreen").classList.remove("hidden");
    document.getElementById("finalScore").innerText = score;
    saveScoreToDB();
}

function saveScoreToDB() {
    fetch('save_score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name: currentUser.name, avatar_url: currentUser.avatarSrc, score: score })
    }).then(() => loadLeaderboard()).catch(err => console.log(err));
}

function loadLeaderboard() {
    fetch('get_leaderboard.php')
    .then(res => res.json())
    .then(data => {
        let tbody = document.getElementById("leaderboardBody");
        tbody.innerHTML = "";
        data.forEach((row, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${index + 1}</td>
                            <td><img src="${row.avatar_url}" referrerpolicy="no-referrer" width="20" style="border-radius:50%; vertical-align:middle; margin-right:5px; object-fit: cover;">${row.player_name}</td>
                            <td>${row.score}</td>`;
            tbody.appendChild(tr);
        });
    });
}

function restartGame() { 
    resetGame(); 
    bgMusic.play(); 
    animate(); 
}


function animate(currentTime) {
    if (isGameOver || isPaused) return;
    requestAnimationFrame(animate);
    if (!currentTime) currentTime = performance.now();
    let elapsed = currentTime - lastRenderTime;
    if (elapsed < fpsInterval) return;
    lastRenderTime = currentTime - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let heartDisplay = document.getElementById("heartDisplay");
    if(heartDisplay) heartDisplay.innerHTML = " | ชีวิต: " + "❤️".repeat(lives) + "🖤".repeat(maxLives - lives);
    if (Math.random() < 0.01) clouds.push(new Cloud()); 
    clouds.forEach((c, index) => {
        c.update();
        if(c.x + 100 < 0) clouds.splice(index, 1); 
    });
    let activeBuildings = buildings.filter(b => !b.isForeground); 
    activeBuildings.forEach(b => b.update());
    activeBuildings = buildings.filter(b => b.isForeground); 
    activeBuildings.forEach(b => b.update());
    if (buildings.length < 15) {
        if (Math.random() > 0.5) buildings.push(new Building(canvas.width, false));
        else buildings.push(new Building(canvas.width, true));
    }
    buildings = buildings.filter(b => b.x + b.width > 0);
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(0, 340, canvas.width, 60); 
    ctx.fillStyle = "#fff"; 
    for(let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i - (distance * 2) % 40, 365, 20, 5);
    }

    let modDist = distance % 1000;
    if (distance > 0 && (modDist === 250 || modDist === 500 || modDist === 750)) {
        currentFactText = factTexts[Math.floor(Math.random() * factTexts.length)];
        factTimer = 180; 
    }
    if (distance >= nextBossSpawn && !isBossFight) {
        isBossFight = true;
        bossLevel = Math.floor(distance / 10000) + 1; 
        currentBossType = Math.floor(Math.random() * 3) + 1; 
        bossDuration = 5000;
        nextBossSpawn = distance + 10000;
        let warning = document.getElementById("bossWarningOverlay");
        let nameText = document.getElementById("bossNameText");
        let glitchOverlay = document.getElementById("glitchOverlay");
        if (currentBossType === 1) {
            boss1Hp = 20 + (wrongAnswers * 5); 
            nameText.innerText = `บอสไล่ล่า: กองทัพ Bug! (ต้องกระโดดโจมตี ${boss1Hp} ครั้ง)`;
        }
        else if (currentBossType === 2) nameText.innerText = "บอสดักยิง: เซิร์ฟเวอร์คลุ้มคลั่ง!";
        else if (currentBossType === 3) nameText.innerText = "บอสไวรัส: ระวังกล่องพิษสีเขียว!";

        if(warning) {
            warning.classList.remove("hidden");
            warning.classList.add("warning-pulse", "shake-active");
            
            setTimeout(() => {
                warning.classList.add("hidden");
                warning.classList.remove("warning-pulse", "shake-active");
                if (currentBossType === 3 && glitchOverlay) {
                    glitchOverlay.classList.remove("hidden");
                    glitchOverlay.classList.add("glitch-active");
                }
            }, 2500); 
        }

        if (currentBossType === 1) { 
            boss.x = -150; 
            boss.y = 200;
            boss.width = 100;
        } else if (currentBossType === 2) { 
            boss.x = canvas.width - 100;
            boss.y = 100;
            bossProjectiles = []; 
        }
    }

    if (isBossFight) {
        bossDuration--;

        if (bossDuration <= 0) {
            isBossFight = false;
            speed += 0.3; 
            let glitchOverlay = document.getElementById("glitchOverlay");
            if(glitchOverlay) {
                glitchOverlay.classList.add("hidden");
                glitchOverlay.classList.remove("glitch-active");
            }
        } else {
            if (currentBossType === 1) {
                if (boss.x < 10) boss.x += 0.5; 
                ctx.font = "100px Arial";
                ctx.fillText("🐛", boss.x, boss.y + 80);

                if (invincibleFrames === 0 && player.x < boss.x + boss.width - 30) {
                    lives--;
                    if (lives <= 0) { gameOver(); return; }
                    else { 
                        invincibleFrames = 180;
                        player.x = 100; 
                        boss.x = -150; 
                    }
                }
            }
            else if (currentBossType === 2) {
                boss.y += boss.dy;
                if (boss.y <= 50 || boss.y >= 250) boss.dy *= -1;

                ctx.font = "60px Arial";
                ctx.fillText("🤖", boss.x, boss.y + 50);

                if (Math.random() < 0.02 + (bossLevel * 0.005)) {
                    bossProjectiles.push({
                        x: boss.x, y: boss.y + 50 + (Math.random() * 50), width: 30, height: 20
                    });
                }
                for (let i = 0; i < bossProjectiles.length; i++) {
                    let p = bossProjectiles[i];
                    p.x -= (speed + 4); 
                    ctx.font = "25px Arial";
                    ctx.fillText("🚀", p.x, p.y + 20);

                    if (invincibleFrames === 0 && player.x < p.x + p.width - 5 && player.x + player.width - 5 > p.x &&
                        player.y < p.y + p.height - 5 && player.y + player.height - 5 > p.y) {
                        lives--; 
                        if (lives <= 0) { gameOver(); return; } 
                        else invincibleFrames = 180; 
                    }
                }
                bossProjectiles = bossProjectiles.filter(p => p.x > -50);
            }
        }
    }

    let factOverlay = document.getElementById("factOverlay");
    let factTextContent = document.getElementById("factTextContent");
    
    if (factTimer > 0 && factOverlay) {
        factTextContent.innerText = currentFactText;
        factOverlay.classList.remove("hidden"); 
        factOverlay.classList.add("show-trick"); 
        
        factTimer--;
    } else if (factOverlay) {
        factOverlay.classList.remove("show-trick"); 
    }
    ctx.textAlign = "left";
    ctx.font = "14px Prompt";
    let statusY = 70;

    if (invincibleFrames > 0) {
        ctx.fillStyle = "#ffc107"; 
        ctx.fillText(`✨ สถานะอมตะทำงาน: ${(invincibleFrames/60).toFixed(1)} วินาที`, 20, statusY);
        statusY += 20;
    } 
    if (isBossFight) {
        if (currentBossType === 1) {
            ctx.fillStyle = "#ff5722";
            ctx.fillText(`🐛 บอสไล่ล่า: กดกระโดดอีก ${boss1Hp} ครั้ง! (ระยะทนทาน: ${bossDuration} ม.)`, 20, statusY);
        } else if (currentBossType === 2) {
            ctx.fillStyle = "#dc3545";
            ctx.fillText(`🤖 บอสดักยิง: หลบมิสไซล์! (ระยะทนทาน: ${bossDuration} ม.)`, 20, statusY);
        } else if (currentBossType === 3) {
            ctx.fillStyle = "#28a745";
            ctx.fillText(`💻 บอสไวรัส: ห้ามชนกล่องพิษสีเขียว! (ระยะทนทาน: ${bossDuration} ม.)`, 20, statusY);
        }
        statusY += 20;
    } else if (distance <= safeZoneUntil) {
        ctx.fillStyle = "#28a745";
        ctx.fillText("🛡️ พลังป้องกันทำงาน! ทางโล่ง", 20, statusY);
        statusY += 20;
    }
    if (poisonStacks > 0) {
        ctx.fillStyle = "#28a745";
        ctx.fillText(`☠️ ติดพิษ: ${poisonStacks}/3 (ตอบคำถามหน้าให้ถูกเพื่อล้างพิษ!)`, 20, statusY);
        statusY += 20;
    }

    player.dy += player.gravity;
    player.y += player.dy;
    if (player.y >= 300) { player.y = 300; player.jumps = 0; }

    if (invincibleFrames > 0) {
        invincibleFrames--;
        ctx.globalAlpha = (invincibleFrames % 10 < 5) ? 0.5 : 1.0; 
    }

    try {
        if (currentUser.avatarImg.complete && currentUser.avatarImg.naturalHeight !== 0) {
            ctx.drawImage(currentUser.avatarImg, player.x, player.y, player.width, player.height);
        } else {
            ctx.fillStyle = "#f37b21";
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }
    } catch(e) {
        ctx.fillStyle = "#f37b21";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    
    ctx.globalAlpha = 1.0; 

    spawnItem();
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.x -= speed;
        ctx.font = "25px Arial";
        ctx.fillText(item.type === 'heart' ? "❤️" : "⚙️", item.x, item.y + 25);

        if (player.x < item.x + item.width && player.x + player.width > item.x &&
            player.y < item.y + item.height && player.y + player.height > item.y) {
            if (item.type === 'gear') score += 50; 
            else if (item.type === 'heart') {
                if (lives < maxLives) lives++; 
                else score += 50; 
            }
            items.splice(i, 1); 
            i--;
        }
    }
    items = items.filter(item => item.x > -50);

    spawnObstacle();
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= speed;

        if (obs.isPoison) {
            ctx.fillStyle = "#28a745"; 
            ctx.shadowColor = "#28a745";
            ctx.shadowBlur = 10;
        } else {
            ctx.fillStyle = obs.isDrone ? "#343a40" : "#343a40"; 
            ctx.shadowBlur = 0;
        }
        
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.shadowBlur = 0; 

        if (invincibleFrames === 0) {
            if (player.x < obs.x + obs.width - 5 && player.x + player.width - 5 > obs.x &&
                player.y < obs.y + obs.height - 5 && player.y + player.height - 5 > obs.y) {
                
                if (obs.isPoison) {
                    poisonStacks++;
                    invincibleFrames = 60; 
                    if (poisonStacks >= 3) {
                        gameOver(); 
                        return;
                    }
                } else {
                    lives--; 
                    if (lives <= 0) { gameOver(); return; } 
                    else invincibleFrames = 180; 
                }
            }
        }
    }
    obstacles = obstacles.filter(obs => obs.x > -50);

    distance += 1;
    if (distance % 10 === 0) score += 10;
    if (distance % 500 === 0) speed += 0.5; 
    if (distance > 0 && distance % 1000 === 0) triggerQuiz(); 

    document.getElementById("distanceScore").innerText = distance;
    document.getElementById("totalScore").innerText = score;

}