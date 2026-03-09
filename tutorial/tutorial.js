const cLessons = [
    {
        title: "1. Hello World!",
        desc: "ยินดีต้อนรับสู่ภาษา C! คำสั่งพื้นฐานที่สุดคือการแสดงข้อความออกทางหน้าจอ เราจะใช้คำสั่ง <code>printf()</code><br><br><strong>ภารกิจ:</strong> จงเขียนคำสั่งเพื่อแสดงคำว่า <code>Hello World</code>",
        expected: "Hello World",
        initialCode: `#include <stdio.h>\n\nint main() {\n    // เขียนโค้ดของคุณที่นี่\n    \n    return 0;\n}`,
        getSimulatedOutput: (code) => {
            const cleanCode = code.replace(/\/\/.*$/gm, ''); 
            const match = cleanCode.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
            if (!match) return "Compilation Error: รูปแบบคำสั่ง printf ไม่ถูกต้อง หรือลืมปิดวงเล็บ/เซมิโคลอน (;)";
            return match[1];
        }
    },
    {
        title: "2. ตัวแปร (Variables)",
        desc: "ตัวแปรใช้เก็บข้อมูล ในภาษา C เราต้องระบุชนิดข้อมูลด้วย เช่น <code>int</code> สำหรับจำนวนเต็ม การแสดงผลตัวแปรจะใช้ <code>%d</code> ใน printf<br><br><strong>ภารกิจ:</strong> จงใช้ printf แสดงผลตัวแปร age ให้ได้ข้อความว่า <code>Age is 20</code>",
        expected: "Age is 20",
        initialCode: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    // แสดงผลที่นี่\n    \n    return 0;\n}`,
        getSimulatedOutput: (code) => {
            const cleanCode = code.replace(/\/\/.*$/gm, '');
            const match = cleanCode.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\)\s*;/);
            if (!match) return "Compilation Error: ไม่พบคำสั่ง printf หรือเขียนผิดรูปแบบ";
            let text = match[1];
            let vars = (match[2] || "").replace(/\s/g, '');
            if (!text.includes("%d")) {
                if (text.includes("20")) return "Logic Error: ห้ามพิมพ์เลข 20 ลงไปตรงๆ ต้องใช้ %d เพื่อรับค่าจากตัวแปร";
                return text; 
            }
            if (vars === "") return "Compilation Error: มีการใช้ %d แต่ไม่ได้ระบุตัวแปรด้านหลังเครื่องหมายลูกน้ำ";
            if (vars.includes("20")) return "Logic Error: ห้ามระบุตัวเลขตรงๆ ด้านหลัง ให้ใช้ชื่อตัวแปร age เท่านั้น";
            if (vars !== "age") return `Compilation Error: ไม่รู้จักตัวแปร '${vars}' (โจทย์กำหนดให้ใช้ตัวแปร age)`;
            return text.replace("%d", "20");
        }
    },
    {
        title: "3. คณิตศาสตร์เบื้องต้น",
        desc: "เราสามารถนำตัวแปรมาบวก ลบ คูณ หาร กันได้<br><br><strong>ภารกิจ:</strong> มีตัวแปร a=5 และ b=10 จงใช้ printf แสดงผลรวม โดยให้แสดงข้อความว่า <code>Sum is 15</code>",
        expected: "Sum is 15",
        initialCode: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    int b = 10;\n    // แสดงผลรวมที่นี่\n    \n    return 0;\n}`,
        getSimulatedOutput: (code) => {
            const cleanCode = code.replace(/\/\/.*$/gm, '');
            const match = cleanCode.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\)\s*;/);
            if (!match) return "Compilation Error: รูปแบบคำสั่ง printf ไม่ถูกต้อง";
            let text = match[1];
            let vars = (match[2] || "").replace(/\s/g, '');
            if (!text.includes("%d")) {
                if (text.includes("15")) return "Logic Error: ไม่ควรพิมพ์เลข 15 ลงไปตรงๆ กรุณาใช้ %d เพื่อรับค่าจากการบวกตัวแปร";
                return text; 
            }
            if (vars === "") return "Compilation Error: มีการใช้ %d แต่ไม่ได้ระบุค่าหรือตัวแปรด้านหลัง";
            if (vars.includes("15") || vars.includes("5") || vars.includes("10")) {
                return "Logic Error: กรุณาใช้ชื่อตัวแปร a และ b ในการคำนวณ ห้ามพิมพ์ตัวเลขลงไปตรงๆ";
            }
            if (vars === "a+b" || vars === "b+a") {
                return text.replace("%d", "15");
            } else if (vars === "a-b") {
                return text.replace("%d", "-5");
            } else if (vars === "b-a") {
                return text.replace("%d", "5");
            } else if (vars === "a*b" || vars === "b*a") {
                return text.replace("%d", "50");
            } else {
                return "Logic Error: ใช้ตัวแปรหรือเครื่องหมายคณิตศาสตร์ไม่ถูกต้อง (ควรใช้ a + b)";
            }
        }
    },
    {
        title: "4. เงื่อนไข If-Else",
        desc: "<code>if</code> ใช้สำหรับให้โปรแกรมตัดสินใจตามเงื่อนไขที่กำหนด<br><br><strong>ภารกิจ:</strong> เขียนเงื่อนไข if หาก score มีค่ามากกว่าหรือเท่ากับ 50 ให้พิมพ์คำว่า <code>Pass</code>",
        expected: "Pass",
        initialCode: `#include <stdio.h>\n\nint main() {\n    int score = 75;\n    // เขียน if เพื่อตรวจสอบเงื่อนไข\n    \n    return 0;\n}`,
        getSimulatedOutput: (code) => {
            const cleanCode = code.replace(/\/\/.*$/gm, '');
            if (!cleanCode.includes("if")) {
                const ptMatch = cleanCode.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
                if (ptMatch && ptMatch[1].includes("Pass")) {
                    return "Logic Error: ไม่ควรพิมพ์ Pass ออกมาตรงๆ ต้องใช้คำสั่ง if เพื่อตรวจสอบเงื่อนไขของคะแนนก่อน";
                }
                return "Compilation Error: ไม่พบคำสั่ง if ในโค้ดของคุณ";
            }
            const ifMatch = cleanCode.match(/if\s*\(([^)]+)\)\s*\{?\s*printf\s*\(\s*"([^"]*)"\s*\)\s*;?\s*\}?/);
            if (!ifMatch) return "Compilation Error: โครงสร้างคำสั่ง if หรือ printf ภายในไม่ถูกต้อง";
            let condition = ifMatch[1].replace(/\s/g, '');
            let outputText = ifMatch[2];
            if (!condition.includes("score")) {
                return "Logic Error: เงื่อนไขใน if ต้องตรวจสอบจากตัวแปร 'score'";
            }
            if (condition === "score>=50" || condition === "score>49" || condition === "50<=score") {
                return outputText;
            } else {
                return `Logic Error: เงื่อนไข '${condition}' ยังไม่ถูกต้องตามโจทย์`;
            }
        }
    },
    {
        title: "5. การวนซ้ำ (For Loop)",
        desc: "<code>for loop</code> ใช้ทำงานซ้ำๆ ตามรอบที่กำหนด โครงสร้างคือ <code>for(เริ่มต้น; เงื่อนไข; การเพิ่มค่า)</code><br><br><strong>ภารกิจ:</strong> จงเขียน loop ให้พิมพ์เลข 1 ถึง 5 เว้นวรรคกัน",
        expected: "1 2 3 4 5 ",
        initialCode: `#include <stdio.h>\n\nint main() {\n    // ใช้ for loop พิมพ์ 1 ถึง 5\n    \n    return 0;\n}`,
        getSimulatedOutput: (code) => {
            const cleanCode = code.replace(/\/\/.*$/gm, '');
            const ptMatch = cleanCode.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
            if (ptMatch && ptMatch[1].includes("1") && ptMatch[1].includes("5")) {
                return "Logic Error: ห้ามพิมพ์ตัวเลข 1 ถึง 5 ลงไปตรงๆ ต้องใช้ For Loop และ %d";
            }
            if (!cleanCode.includes("for")) return "Compilation Error: ไม่พบคำสั่ง for ในโค้ด";
            const loopRegex = /for\s*\(\s*(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(-?\d+)\s*;\s*\1\s*(<|<=)\s*(-?\d+)\s*;[^)]+\)\s*\{?\s*printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\)\s*;\s*\}?/;
            const match = cleanCode.match(loopRegex);
            if (!match) return "Compilation Error: โครงสร้าง For Loop (การกำหนดค่าเริ่มต้น, เงื่อนไข) หรือการใช้ printf ด้านในยังไม่ถูกต้อง";
            let loopVar = match[1];
            let start = parseInt(match[2]);
            let op = match[3];
            let limit = parseInt(match[4]);
            let formatStr = match[5];
            let printVar = (match[6] || "").replace(/\s/g, '');
            if (!formatStr.includes("%d")) return "Logic Error: ใน printf ต้องมี %d เพื่อแสดงค่าตัวเลขของรอบนั้นๆ";
            if (printVar !== loopVar) return `Logic Error: ตัวแปรที่ใช้แสดงผลใน printf ต้องเป็นตัวแปรเดียวกับของ Loop (ควรเป็น ${loopVar})`;
            let output = "";
            let endLimit = op === '<=' ? limit : limit - 1;
            if (endLimit - start > 100) return "Runtime Error: จำนวนรอบของ Loop มากเกินไป หรือเกิด Infinite Loop";
            for (let i = start; i <= endLimit; i++) {
                output += formatStr.replace("%d", i);
            }
            return output;
        }
    }
];

const circuitLessons = [
    {
        title: "1. วงจรไฟแสงสว่างที่ปลอดภัย",
        desc: " <b>แบตเตอรี่</b> ทำหน้าที่เป็นตัวจ่ายกระแสไฟฟ้าออกไป<br><b>ตัวต้านทาน</b> ทำหน้าที่เหมือนคอขวดที่คอยบีบและลดปริมาณกระแสให้น้อยลง<br><b>หลอด LED</b> ทำหน้าที่เปลี่ยนพลังงานไฟฟ้าเป็นแสงผ่านสารกึ่งตัวนำโดยตรง<br><b>วงจรอนุกรมกระแสเท่ากัน</b><br><br><strong style='color: #ff0000ff;'>คำเตือน:</strong> การปล่อยกระแสจากแบตเตอรี่เข้าหลอดLEDมากไปจะทำให้หลอดพัง (วงจรนี้จะต้องเรียงลำดับจากซ้ายไปขวา)",
        expected: "ทำให้หลอด LED สว่าง",
        checkCircuit: (comps) => {
            const seq = comps.filter(c => c !== 'empty');
            if (seq.length < 2) return { status: 'error', msg: 'วงจรยังขาดอุปกรณ์' };
            if (seq[0] !== 'comp-battery') return { status: 'error', msg: 'กระแสไฟต้องเริ่มต้นจากแบตเตอรี่ (ซ้ายสุด)' };
            if (!seq.includes('comp-led')) return { status: 'error', msg: 'วงจรไม่สมบูรณ์ ขาดหลอดไฟ LED' };
            if (!seq.includes('comp-resistor')) return { status: 'error', msg: '💥 ล้มเหลว: หลอดไฟขาด! คุณลืมใส่ "ตัวต้านทาน" เพื่อลดกระแสไฟ' };
            if (seq.includes('comp-buzzer', 'comp-switch')) return { status: 'error', msg: 'ใส่มาทุกอย่างก็ไม่ไหวนะ 😅' };
            if (seq.includes('comp-switch')) return { status: 'error', msg: 'ยังไม่ได้สอนเลยไปทีละสเต็ปนะ ลองเอาบัซเซอร์ ออกก่อนนะ' };
            if (seq.includes('comp-buzzer')) return { status: 'error', msg: 'ยังไม่ได้สอนเลยไปทีละสเต็ปนะ ลองเอาสวิตซ์ ออกก่อนนะ' };
            return { status: 'success', msg: 'เยี่ยมมาก! ตัวต้านทานช่วยให้วงจรของคุณปลอดภัย ไฟสว่างแล้ว 💡' };
        }
    },
    {
        title: "2. การควบคุมวงจรด้วยสวิตช์",
        desc: "<b>สวิตซ์</b> ใช้เชื่อมหรือแยกวงจรไฟฟ้าผ่านการกดปุ่มเพียงครั้งเดียว ซึ่งสามารถทำได้ทั้งแบบกดติดและปล่อยดับ<br><br><strong style='color: #ff0000ff;'>คำเตือน:</strong> อย่าลืมที่จะใส่ตัวต้านทานเพื่อลดกระแสในวงจรนี้ (วงจรนี้จะต้องเรียงลำดับจากซ้ายไปขวา)",
        expected: "ควบคุมการเปิดปิดไฟ",
        checkCircuit: (comps) => {
            const seq = comps.filter(c => c !== 'empty');
            if (seq[0] !== 'comp-battery') return { status: 'error', msg: 'กระแสไฟต้องเริ่มต้นจากแบตเตอรี่' };
            if (!seq.includes('comp-switch')) return { status: 'error', msg: 'ล้มเหลว: คุณยังไม่ได้ใส่สวิตช์ลงไป' };
            if (!seq.includes('comp-resistor')) return { status: 'error', msg: '💥 ล้มเหลว: ลืมตัวต้านทาน หลอดขาดไปแล้ว!' };
            if (!seq.includes('comp-led')) return { status: 'error', msg: 'ขาดอุปกรณ์แสดงผล (หลอด LED)' };
            if (seq.includes('comp-buzzer')) return { status: 'error', msg: 'ยังไม่ได้สอนเลยไปทีละสเต็ปนะ ลองเอาบัซเซอร์ ออกก่อนนะ' };
            return { status: 'success', msg: 'ถูกต้อง! สวิตช์ช่วยให้คุณตัดต่อกระแสไฟเพื่อเปิดปิดหลอดไฟได้ 🔘' };
        }
    },
    {
        title: "3. พลังงานเสียง",
        desc: "<b>บัซเซอร์</b> คืออุปกรณ์ไฟฟ้าที่เปลี่ยนพลังงานไฟฟ้าเป็นเสียงผ่านการสั่นสะเทือนของขดลวดแม่เหล็กหรือแผ่นเซรามิกภายใน<br><br><strong style='color: #ff0000ff;'>คำเตือน:</strong> บัซเซอร์มีขดลวดขนาดเล็กอยู่ภายใน การได้รับกระแสสูงเกินไปจะทำให้เกิดความร้อนสะสมจนอุปกรณ์เสียหายได้",
        expected: "สร้างวงจรที่ทำให้เกิดเสียง",
        checkCircuit: (comps) => {
            const seq = comps.filter(c => c !== 'empty');
            if (seq[0] !== 'comp-battery') return { status: 'error', msg: 'กระแสไฟต้องเริ่มต้นจากแบตเตอรี่' };
            if (seq.includes('comp-led')) return { status: 'error', msg: 'ด่านนี้เราจะใช้เสียง กรุณาเอาหลอด LED ออกก่อนนะ' };
            if (!seq.includes('comp-buzzer')) return { status: 'error', msg: 'ล้มเหลว: ยังไม่มีออดไฟฟ้าในวงจร' };
            if (!seq.includes('comp-resistor')) return { status: 'error', msg: 'ออดไฟฟ้าก็ต้องการตัวต้านทานเพื่อป้องกันขดลวดด้านในพังนะ' };
            
            return { status: 'success', msg: 'ตี๊ดดดด! 🔔 ถูกต้อง วงจรทำงานและส่งเสียงเตือนแล้ว' };
        }
    },
    {
        title: "4. กริ่งหน้าบ้าน",
        desc: "นำความรู้จากบทที่แล้วมารวมกัน สร้างระบบกริ่งประตูหน้าบ้าน ให้กับลูกบ้านของเราหน่อยสิ<br><br><strong style='color: #ff0000ff;'>คำเตือน:</strong> ลูกบ้านไม่อยากได้ไฟLED",
        expected: "เสียงดังเมื่อกดสวิตช์",
        checkCircuit: (comps) => {
            const seq = comps.filter(c => c !== 'empty');
            if (seq[0] !== 'comp-battery') return { status: 'error', msg: 'ต้องเริ่มต้นด้วยแบตเตอรี่เสมอ' };
            if (seq.includes('comp-led')) return { status: 'error', msg: 'ลูกบ้านสั่นกลัว จากการเปิดปิดไฟในบ้านทุกครั้งที่มีการกดกริ่ง 👻' };
            const required = ['comp-switch', 'comp-resistor', 'comp-buzzer'];
            const hasAll = required.every(req => seq.includes(req));
            if (!hasAll) return { status: 'error', msg: 'อุปกรณ์ยังไม่ครบตามที่โจทย์กำหนด ลองตรวจสอบดูอีกครั้ง' };
            
            return { status: 'success', msg: 'สุดยอด! คุณสร้างระบบกริ่งประตูหน้าบ้านสำเร็จแล้ว 🚪🔔' };
        }
    },
    {
        title: "5. Master of Circuit (แสงและเสียง)",
        desc: "บททดสอบสุดท้าย! ในวงจรอนุกรม กระแสไฟสามารถไหลผ่านอุปกรณ์หลายชิ้นที่ต่อเรียงกันได้",
        expected: "มีทั้งแสงและเสียง",
        checkCircuit: (comps) => {
            const seq = comps.filter(c => c !== 'empty');
            const required = ['comp-battery', 'comp-switch', 'comp-resistor', 'comp-led', 'comp-buzzer'];
            const hasAll = required.every(req => seq.includes(req));
            if (!hasAll) return { status: 'error', msg: 'วงจรไม่สมบูรณ์ ต้องใช้อุปกรณ์ให้ครบทั้ง 5 ชิ้นนะ' };
            if (seq[0] !== 'comp-battery') return { status: 'error', msg: 'กระแสไฟต้องเริ่มจากแบตเตอรี่' };
            return { status: 'success', msg: '🎉 สมบูรณ์แบบ! ไฟติดและมีเสียงดัง คุณเป็นเซียนต่อวงจรแล้ว!' };
        }
    }
];

// --- 3. ตัวแปรจัดการสถานะ ---
let currentSubject = ''; 
let currentLesson = 0;
let activeLessons = [];

// --- 4. ดึง Element จาก HTML ---
const elSelection = document.getElementById('selection-screen');
const elTutorial = document.getElementById('tutorial-container');
const elTitle = document.getElementById('lesson-title');
const elDesc = document.getElementById('lesson-desc');
const elExpected = document.getElementById('expected-output');
const elCounter = document.getElementById('lesson-counter');

const elCWorkspace = document.getElementById('c-workspace');
const elCircuitWorkspace = document.getElementById('circuit-workspace');
const btnRun = document.getElementById('run-btn');
const btnNext = document.getElementById('next-btn');

const elEditor = document.getElementById('code-editor');
const elTerminal = document.getElementById('terminal-content');
const elCircuitBoard = document.getElementById('circuit-board');
const elCircuitFeedback = document.getElementById('circuit-feedback');

// --- 5. ฟังก์ชันนำทาง (เลือกวิชา) ---
window.startSubject = function(subject) {
    currentSubject = subject;
    currentLesson = 0;
    activeLessons = subject === 'C' ? cLessons : circuitLessons;
    
    elSelection.style.display = 'none';
    elTutorial.style.display = 'grid'; 
    
    if (subject === 'C') {
        elCWorkspace.style.display = 'block';
        elCircuitWorkspace.style.display = 'none';
        btnRun.innerHTML = '<i class="fas fa-play"></i> Run Code';
    } else {
        elCWorkspace.style.display = 'none';
        elCircuitWorkspace.style.display = 'flex';
        elCircuitWorkspace.style.flexDirection = 'column';
        btnRun.innerHTML = '<i class="fas fa-check"></i> ตรวจสอบวงจร';
    }
    
    loadLesson(0);
}

window.goBack = function() {
    elSelection.style.display = 'block';
    elTutorial.style.display = 'none';
}

function loadLesson(index) {
    const lesson = activeLessons[index];
    elCounter.innerText = `Lesson ${index + 1} / ${activeLessons.length}`;
    elTitle.innerHTML = lesson.title;
    elDesc.innerHTML = lesson.desc;
    elExpected.innerText = lesson.expected;
    btnNext.style.display = 'none';

    if (currentSubject === 'C') {
        elEditor.value = lesson.initialCode;
        elTerminal.innerHTML = `> Ready to compile...\n`;
    } else {
        elCircuitFeedback.style.display = 'none';
        setupCircuitBoard(lesson);
    }
}

// ฟังก์ชันสร้างปุ่ม Next / Return Home แบบรวมศูนย์
// ฟังก์ชันสร้างปุ่ม Next / Return Home แบบรวมศูนย์ (แก้ไขแล้ว)
function setupNextButton() {
    btnNext.style.display = 'inline-block';
    
    if (currentLesson < activeLessons.length - 1) {
        btnNext.innerHTML = 'Next Lesson <i class="fas fa-arrow-right"></i>';
        btnNext.className = 'btn btn-success';
        
        // ใช้ .onclick เพื่อเขียนทับ Event เดิมได้อย่างปลอดภัย ไม่ต้อง clone
        btnNext.onclick = () => {
            currentLesson++;
            loadLesson(currentLesson);
        };
    } else {
        btnNext.innerHTML = '<i class="fas fa-home"></i> กลับหน้าหลัก';
        btnNext.className = 'btn btn-primary'; // เปลี่ยนสีให้เด่นขึ้น
        
        btnNext.onclick = () => {
            window.location.href = '../index.html';
        };
    }
}

// --- 6. ลอจิก Circuit (5 ช่อง) ---
function setupCircuitBoard(lesson) {
    elCircuitBoard.innerHTML = ''; 
    const numberOfSlots = 5; 
    
    for(let i=0; i<numberOfSlots; i++) {
        const slot = document.createElement('div');
        slot.className = 'drop-slot';
        
        slot.ondragover = (e) => e.preventDefault();
        slot.ondrop = (e) => handleDrop(e, slot);
        
        elCircuitBoard.appendChild(slot);
    }
}

window.drag = function(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

function handleDrop(e, slot) {
    e.preventDefault();
    const originalId = e.dataTransfer.getData("text/plain");
    if(!originalId) return;
    
    if (slot.querySelector('.component')) {
        alert("ช่องนี้มีอุปกรณ์อยู่แล้ว! กรุณาคลิกที่ตัวเดิมเพื่อลบออกก่อน");
        return;
    }

    const originalElement = document.getElementById(originalId);
    if (!originalElement || !originalElement.classList.contains('component')) return;
    
    slot.innerHTML = ''; 
    const clone = originalElement.cloneNode(true);
    clone.id = ''; 
    clone.dataset.type = originalId; 
    clone.draggable = false; 
    clone.style.cursor = 'pointer';
    clone.title = 'คลิกเพื่อลบออก';
    
    clone.onclick = function() {
        slot.innerHTML = '';
        slot.classList.remove('filled');
        elCircuitFeedback.style.display = 'none'; 
    };

    slot.appendChild(clone);
    slot.classList.add('filled');
}

// --- 7. ลอจิกตรวจสอบคำตอบ ---
btnRun.addEventListener('click', () => {
    const lesson = activeLessons[currentLesson];

    if (currentSubject === 'C') {
        const userCode = elEditor.value;
        elTerminal.innerHTML = "> Compiling...\n";
        
        setTimeout(() => {
            const simulatedOutput = lesson.getSimulatedOutput(userCode);
            
            if (simulatedOutput.includes("Error")) {
                elTerminal.innerHTML += `\n<span class="error-text">[Error] ${simulatedOutput}</span>`;
                elTerminal.innerHTML += `\n> <span class="error-text">❌ Compilation Failed.</span>`;
                return;
            }

            if (simulatedOutput === "") {
                elTerminal.innerHTML += `\n<span class="error-text">[No Output]</span>`;
                return;
            }

            elTerminal.innerHTML += `\n${simulatedOutput}\n`;

            // เทียบผลลัพธ์จากที่จำลองได้ กับสิ่งที่คาดหวังแบบตรงตัว
            if (simulatedOutput === lesson.expected) {
                elTerminal.innerHTML += `\n> <span class="success-text">✅ Correct!</span>`;
                setupNextButton(); // ดึงปุ่มถัดไปหรือหน้าหลักมาแสดง
            } else {
                elTerminal.innerHTML += `\n> <span class="error-text">❌ Incorrect output.</span>`;
            }
        }, 400); 

    } else if (currentSubject === 'Circuit') {
        const slots = document.querySelectorAll('.drop-slot');
        let placedComps = [];

        slots.forEach(slot => {
            const comp = slot.querySelector('.component');
            placedComps.push(comp ? comp.dataset.type : 'empty'); 
        });

        elCircuitFeedback.style.display = 'block';
        
        // เช็คว่าวงจรว่างเปล่าไหม
        if (placedComps.every(c => c === 'empty')) {
            elCircuitFeedback.style.backgroundColor = '#f8d7da';
            elCircuitFeedback.style.color = '#721c24';
            elCircuitFeedback.innerHTML = `❌ ไม่มีอุปกรณ์ในวงจร`;
            return;
        }

        const result = lesson.checkCircuit(placedComps);

        if (result.status === 'success') {
            elCircuitFeedback.style.backgroundColor = '#d4edda'; 
            elCircuitFeedback.style.color = '#155724';
            elCircuitFeedback.innerHTML = `✅ ${result.msg}`;
            setupNextButton(); // แสดงปุ่มทำงานถัดไป
        } else {
            elCircuitFeedback.style.backgroundColor = '#f8d7da'; 
            elCircuitFeedback.style.color = '#721c24';
            elCircuitFeedback.innerHTML = `❌ ${result.msg}`;
            btnNext.style.display = 'none'; 
        }
    }
});

// --- 8. รองรับการลากวาง (Drag & Drop) ด้วยระบบสัมผัส (มือถือ) ---
let activeTouchElement = null;
let touchGhost = null;

document.querySelectorAll('#toolbox .component').forEach(comp => {
    // 1. เมื่อเริ่มแตะอุปกรณ์
    comp.addEventListener('touchstart', function(e) {
        e.preventDefault(); // ป้องกันหน้าจอเลื่อนเวลาลาก
        activeTouchElement = this;

        // สร้างตัวโคลนลอยๆ (Ghost) ให้ขยับตามนิ้ว
        const touch = e.touches[0];
        touchGhost = this.cloneNode(true);
        touchGhost.style.position = 'fixed';
        touchGhost.style.opacity = '0.8';
        touchGhost.style.pointerEvents = 'none'; // ให้นิ้วทะลุไปจับช่องด้านล่างได้
        touchGhost.style.zIndex = '9999';
        touchGhost.style.width = this.offsetWidth + 'px';
        touchGhost.style.height = this.offsetHeight + 'px';
        touchGhost.style.margin = '0';
        
        document.body.appendChild(touchGhost);
        moveGhost(touch.clientX, touch.clientY);
    }, { passive: false });

    // 2. เมื่องลากนิ้วขยับ
    comp.addEventListener('touchmove', function(e) {
        if (!touchGhost) return;
        e.preventDefault();
        const touch = e.touches[0];
        moveGhost(touch.clientX, touch.clientY);
    }, { passive: false });

    // 3. เมื่อปล่อยนิ้วลง
    comp.addEventListener('touchend', function(e) {
        if (!touchGhost || !activeTouchElement) return;
        
        const touch = e.changedTouches[0];
        touchGhost.remove(); // ลบตัวโคลนทิ้ง
        touchGhost = null;

        // หาว่านิ้วปล่อยลงที่ช่อง (Slot) ไหน
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        const slot = dropTarget ? dropTarget.closest('.drop-slot') : null;

        if (slot) {
            if (slot.querySelector('.component')) {
                alert("ช่องนี้มีอุปกรณ์อยู่แล้ว! กรุณาคลิกที่ตัวเดิมเพื่อลบออกก่อน");
            } else {
                // จำลองการวางลงในช่อง
                slot.innerHTML = ''; 
                const clone = activeTouchElement.cloneNode(true);
                clone.id = ''; 
                clone.dataset.type = activeTouchElement.id; 
                clone.draggable = false; 
                clone.style.cursor = 'pointer';
                clone.title = 'คลิกเพื่อลบออก';
                
                // ลอจิกคลิกเพื่อลบออกเมื่ออยู่ในช่อง
                clone.onclick = function() {
                    slot.innerHTML = '';
                    slot.classList.remove('filled');
                    elCircuitFeedback.style.display = 'none'; 
                };

                slot.appendChild(clone);
                slot.classList.add('filled');
            }
        }
        activeTouchElement = null;
    });
});

// ฟังก์ชันจัดตำแหน่งตัวโคลนให้อยู่กลางนิ้ว
function moveGhost(x, y) {
    if (!touchGhost) return;
    touchGhost.style.left = (x - touchGhost.offsetWidth / 2) + 'px';
    touchGhost.style.top = (y - touchGhost.offsetHeight / 2) + 'px';
}