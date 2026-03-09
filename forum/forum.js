// ==========================================
// ตัวแปรเก็บสถานะระบบ
// ==========================================
let topics = []; 
let isAdmin = sessionStorage.getItem('isAdmin') === 'true'; 
let isGoogleLoggedIn = localStorage.getItem('isGoogleLoggedIn') === 'true';
let googleUserData = JSON.parse(localStorage.getItem('googleUserData') || 'null');

// อ้างอิง HTML Elements
const topicList = document.getElementById('topicList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const createModal = document.getElementById('createModal');
const openCreateModalBtn = document.getElementById('openCreateModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const topicForm = document.getElementById('topicForm');

const loginModal = document.getElementById('loginModal');
const mainLoginBtn = document.getElementById('mainLoginBtn');
const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
const adminLoginBtn = document.getElementById('adminLoginBtn');

function updateMainUI() {
    const userProfileBox = document.getElementById('user-profile');
    const userPic = document.getElementById('user-pic');
    const userNameDisplay = document.getElementById('user-name-display');

    if (isGoogleLoggedIn && googleUserData) {
        // ล็อคอินสำเร็จ (รวมทั้งแอดมินและผู้เล่นทั่วไป)
        mainLoginBtn.style.display = 'none';
        userProfileBox.style.display = 'flex';
        userPic.style.display = 'block';
        userPic.src = googleUserData.picture; // ใช้รูปจาก Google เสมอ
        openCreateModalBtn.style.display = 'block'; 

        // จัดการชื่อที่จะแสดง
        let displayName = isAdmin ? "👑 Admin (" + googleUserData.name + ")" : googleUserData.name;
        userNameDisplay.textContent = displayName;
        userNameDisplay.style.color = isAdmin ? '#f37b21' : ''; // แอดมินชื่อสีส้ม
        
        // เซ็ตชื่อคนโพสต์กระทู้
        document.getElementById('topic-author').value = displayName;
    } else {
        // ถ้ายังไม่ล็อคอิน
        mainLoginBtn.style.display = 'block';
        userProfileBox.style.display = 'none';
        openCreateModalBtn.style.display = 'none'; 
        document.getElementById('topic-author').value = '';
    }
    
    renderTopics(topics); 
}

// ==========================================
// 2. ระบบล็อคอิน (Google & Admin)
// ==========================================

// เปิด-ปิด หน้าต่างล็อคอิน
mainLoginBtn.addEventListener('click', () => loginModal.classList.add('active'));
closeLoginModalBtn.addEventListener('click', () => loginModal.classList.remove('active'));

window.onload = function () {
    // โหลด Google Login
    google.accounts.id.initialize({
        client_id: "970219683985-ril851rr9gf8i2bv9d9h49r65kd5i02p.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: "100%" } 
    );

    // อัปเดตหน้าจอครั้งแรก
    updateMainUI();
    loadTopicsFromDB();
};

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    isGoogleLoggedIn = true;
    googleUserData = responsePayload;
    localStorage.setItem('isGoogleLoggedIn', 'true');
    localStorage.setItem('googleUserData', JSON.stringify(responsePayload));
    localStorage.setItem('currentUser', responsePayload.name);
    //เมลที่รับอนุญาตให้เป็นแอดมิน
    const allowedAdminEmails = ['ballkill555@gmail.com', '67010411@kmitl.ac.th']; 
    if (allowedAdminEmails.includes(responsePayload.email)) {
        sessionStorage.setItem('isAdmin', 'true');
        isAdmin = true;
    } else {
        sessionStorage.removeItem('isAdmin');
        isAdmin = false;
    }
    loginModal.classList.remove('active'); 
    updateMainUI(); 
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

window.signOut = function() {
    if (isAdmin) {
        sessionStorage.setItem('isAdmin', 'false');
        isAdmin = false;
    }
    // ล้างค่าล็อคอินของ Google
    isGoogleLoggedIn = false;
    googleUserData = null;
    localStorage.removeItem('isGoogleLoggedIn');
    localStorage.removeItem('googleUserData');
    localStorage.removeItem('currentUser');
    updateMainUI();
}

// ==========================================
// 3. ระบบดึงข้อมูลและแสดงผลกระทู้
// ==========================================
function loadTopicsFromDB() {
    fetch('get_topics.php')
        .then(response => response.json())
        .then(data => {
            topics = data;
            renderTopics(topics); 
        })
        .catch(error => console.error('Error:', error));
}

function renderTopics(dataToRender) {
    topicList.innerHTML = ''; 
    if (dataToRender.length === 0) {
        topicList.innerHTML = '<p style="text-align:center; padding: 20px;">🔍 ไม่พบกระทู้</p>';
        return;
    }

    dataToRender.forEach(topic => {
        const div = document.createElement('div');
        div.className = 'topic-item';

        const deleteButtonHTML = isAdmin ? 
            `<button class="delete-btn" onclick="deleteTopic(event, ${topic.id})">🗑️ ลบ</button>` : '';

        div.innerHTML = `
            <div class="topic-details">
                <h3 class="topic-title">${topic.title}</h3>
                <span class="topic-meta">โดย: ${topic.author} | วันที่: ${topic.date} | หมวดหมู่: ${topic.category}</span>
            </div>
            <div class="topic-action">
                <span class="topic-replies">💬 ${topic.replies} ตอบ</span>
                ${deleteButtonHTML}
            </div>
        `;
        div.onclick = () => { window.location.href = `detail/detail.html?id=${topic.id}`; };
        topicList.appendChild(div);
    });
}

// ==========================================
// 4. ระบบค้นหา ตั้งกระทู้ และลบกระทู้
// ==========================================
searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase();
    renderTopics(topics.filter(t => t.title.toLowerCase().includes(keyword)));
});

// เปิด-ปิด หน้าต่างตั้งกระทู้
openCreateModalBtn.addEventListener('click', () => createModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => createModal.classList.remove('active'));

// ส่งข้อมูลตั้งกระทู้
topicForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let authorName = document.getElementById('topic-author').value;
    if (!authorName) {
        alert("เซสชันหมดอายุ กรุณาล็อคอินใหม่ครับ");
        return;
    }

    const newTopic = {
        title: document.getElementById('tTitle').value,
        author: authorName, 
        category: document.getElementById('tCategory').value,
        content: document.getElementById('tContent').value 
    };

    fetch('save_topic.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTopic)
    })
    .then(res => res.json())
    .then(result => {
        if(result.status === 'success') {
            alert('✅ ตั้งกระทู้สำเร็จ!');
            topicForm.reset();
            createModal.classList.remove('active');
            loadTopicsFromDB(); 
        } else {
            alert('❌ เกิดข้อผิดพลาด: ' + (result.message || 'ไม่สามารถบันทึกได้'));
        }
    })
    .catch(error => console.error('Error saving topic:', error));
});

window.deleteTopic = function(event, id) {
    event.stopPropagation(); 
    if (confirm('⚠️ ยืนยันการลบกระทู้นี้ออกจากฐานข้อมูล?')) {
        fetch('delete_topic.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(result => {
            if(result.status === 'success') {
                alert('🗑️ ลบกระทู้เรียบร้อย!');
                loadTopicsFromDB();
            }
        });
    }
};