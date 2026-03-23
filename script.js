// Elements
const loading = document.getElementById('loading');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const textarea = document.getElementById('loveLetter');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const backBtn = document.getElementById('backBtn');
const newLetterBtn = document.getElementById('newLetterBtn');
const shareBtn = document.getElementById('shareAllBtn');
const sharePages = document.getElementById('sharePages');

// Init - ULTRA CLEAN
document.addEventListener('DOMContentLoaded', function() {
    loading.style.display = 'none';
    
    textarea.oninput = function() {
        charCount.textContent = this.value.length;
        const len = this.value.length;
        charCount.style.color = len > 1400 ? '#ff6b6b' : len > 1200 ? '#ffd43b' : '#ffd4e6';
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 350) + 'px';
    };
    
    generateBtn.onclick = generateLoveLetter;
    backBtn.onclick = newLetterBtn.onclick = goToPage1;
    shareBtn.onclick = guideScreenshot; // NEW: Screenshot guide
    
    textarea.focus();
});

function generateLoveLetter() {
    const content = textarea.value.trim();
    if (!content) return shake(generateBtn);
    
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Perfecting...';
    generateBtn.disabled = true;
    
    setTimeout(() => {
        createPerfectPages(content);
        goToPage2();
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Buat Lagi';
        generateBtn.disabled = false;
        shareBtn.innerHTML = '<i class="fas fa-camera"></i> Screenshot Guide';
    }, 800);
}

function createPerfectPages(content) {
    sharePages.innerHTML = '';
    const maxLen = 360; // Perfect for screenshot
    let pages = content.match(new RegExp(`[\\s\\S]{1,${maxLen}}`, 'g')) || [content];
    
    pages.forEach((pageContent, i) => {
        const page = document.createElement('div');
        page.className = 'share-page screenshot-ready';
        page.style.cssText = `
            background: linear-gradient(145deg, #2d1b69 0%, #1e0f3d 100%) !important;
            border: 4px solid #ff69b4 !important;
            border-radius: 28px !important;
            padding: 40px 30px !important;
            margin: 20px 0 !important;
            box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,105,180,0.4) !important;
            position: relative !important;
        `;
        
        page.innerHTML = `
            <div class="screenshot-header" style="
                position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
                background: linear-gradient(45deg, #ff69b4, #ff1493); color: white;
                padding: 8px 25px; border-radius: 25px; font-weight: 700; font-size: 14px;
                box-shadow: 0 8px 25px rgba(255,105,180,0.6);
            ">
                💌 SURAT CINTA ${i === 0 ? '' : `(${i + 1})`}
            </div>
            <div class="share-content" style="
                font-size: 18px; line-height: 1.7; color: #fff; 
                min-height: 280px; padding-top: 25px;
                font-weight: 400; text-align: justify;
            ">${pageContent.trim()}</div>
            <div class="screenshot-footer" style="
                margin-top: 25px; padding-top: 20px;
                border-top: 2px dashed rgba(255,105,180,0.5);
                text-align: center; color: #ffd4e6; font-size: 14px;
                font-style: italic;
            ">
                <i class="fas fa-heart" style="color: #ff69b4; margin-right: 5px;"></i>
                Dibuat dengan cinta untukmu 💕
            </div>
        `;
        
        // Screenshot copy button
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.style.cssText = `
            position: absolute; top: 15px; right: 20px;
            background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3);
            color: white; width: 45px; height: 45px; border-radius: 50%;
            font-size: 16px; backdrop-filter: blur(15px);
            cursor: pointer; transition: all 0.3s;
        `;
        copyBtn.onmouseenter = () => copyBtn.style.background = 'rgba(255,105,180,0.4)';
        copyBtn.onmouseleave = () => copyBtn.style.background = 'rgba(255,255,255,0.15)';
        copyBtn.onclick = (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(pageContent.trim()).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => copyBtn.innerHTML = '<i class="fas fa-copy"></i>', 1500);
            });
        };
        
        page.appendChild(copyBtn);
        sharePages.appendChild(page);
    });
}

function guideScreenshot() {
    // PERFECT SCREENSHOT GUIDE
    showToast(`
📱 CARA SCREENSHOT MOBILE:

iPhone: 
- Tekan Power + Volume UP

Android:
- Tekan Power + Volume DOWN

Instagram Story:
- Screenshot → Tap "+" → Story

Hasilnya SIAP POST! ✨💕
    `);
    
    // Scroll to first page
    sharePages.scrollTop = 0;
    showScreenshotHint();
}

function showScreenshotHint() {
    const hint = document.createElement('div');
    hint.id = 'screenshot-hint';
    hint.innerHTML = `
        <div style="
            background: rgba(255,105,180,0.95); color: white; 
            padding: 20px; border-radius: 20px; margin: 20px 0;
            text-align: center; font-weight: 600; font-size: 16px;
            box-shadow: 0 10px 30px rgba(255,105,180,0.5);
        ">
            📸 <strong>Screenshot sekarang!</strong><br>
            <small style="font-size: 14px; opacity: 0.9;">
                Hasilnya sempurna untuk IG Story 💖
            </small>
        </div>
    `;
    sharePages.insertBefore(hint, sharePages.firstChild);
    
    setTimeout(() => {
        if (document.getElementById('screenshot-hint')) {
            document.getElementById('screenshot-hint').remove();
        }
    }, 5000);
}

function goToPage2() { 
    page1.classList.remove('active'); 
    page2.classList.add('active'); 
    sharePages.scrollTop = 0;
}
function goToPage1() { 
    page2.classList.remove('active'); 
    page1.classList.add('active'); 
    textarea.focus(); 
}

function shake(el) {
    el.style.animation = 'shake 0.5s ease';
    setTimeout(() => el.style.animation = '', 500);
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; top:20px; left:50%; transform:translateX(-50%);
        background:linear-gradient(45deg,#ff69b4,#ff1493); color:white;
        padding:20px 30px; border-radius:25px; z-index:9999;
        font-family:Poppins; font-weight:500; box-shadow:0 15px 40px rgba(0,0,0,0.4);
        max-width:90vw; white-space:pre-line; text-align:center; line-height:1.5;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
}

// Shake CSS
if(!document.getElementById('shake-css')) {
    const css = document.createElement('style');
    css.id = 'shake-css';
    css.textContent = `
        @keyframes shake {
            0%,100%{transform:translateX(0)}
            10%,30%,50%,70%,90%{transform:translateX(-8px)}
            20%,40%,60%,80%{transform:translateX(8px)}
        }
    `;
    document.head.appendChild(css);
}
