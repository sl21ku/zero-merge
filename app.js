/* ==========================================================================
   Zero Merge - Game Logic
   ========================================================================== */

// --------------------------------------------------------------------------
// 0. Internationalization (i18n)
// --------------------------------------------------------------------------
const I18N = {
    _lang: localStorage.getItem('zm_lang') || 'en',

    translations: {
        en: {
            // Start modal
            start_title: 'Welcome to Zero Merge!',
            start_sub: 'Math Physics Puzzle',
            start_step1: '<strong>Red balls = positive numbers</strong>, <strong>Blue balls = negative numbers</strong>. Only the absolute value is shown on each ball. Aim and drop!',
            start_step2: 'Balls with the <strong>same operator symbol</strong> merge on contact and calculate the result.<br>e.g. <span class="badge-inline red">3(×)</span> and <span class="badge-inline blue">2(×)</span> share <span class="badge-inline" style="background:#3b82f6;">×</span>, so they merge: <b>3 × (-2) = -6</b> (blue 6).',
            start_step3: '<strong>Calculation order:</strong> The ball already in the container (older) becomes the <b>left operand</b>, and the incoming ball (newer) becomes the <b>right operand</b>. The formula is displayed on screen!',
            start_step4: 'After merging, the operator evolves in a fixed cycle: <b>+ → - → × → ÷ → ^ → +</b>. Plan your drops to create massive chain combos!',
            start_btn: 'START GAME',
            // Rules modal
            rules_title: 'Merge & Operator Rules',
            rules_summary: 'Balls with the <strong>same operator</strong> merge! (Older ball = left, Newer ball = right)<br>After merging, operator evolves: <b>+ → - → × → ÷ → ^ → +</b>. Plan your chains!',
            rule_add_name: 'Addition (Add)',
            rule_add_ex: 'e.g. <span class="text-red">Red 3</span> + <span class="text-blue">Blue 3</span> = <span class="text-gold">0 (vanish!)</span>',
            rule_sub_name: 'Subtraction (Sub)',
            rule_sub_ex: 'e.g. <span class="text-red">Red 3</span> - <span class="text-red">Red 3</span> = <span class="text-gold">0 (vanish!)</span>',
            rule_mul_name: 'Multiplication (Mul)',
            rule_mul_ex: 'e.g. <span class="text-blue">Blue 2</span> × <span class="text-blue">Blue 2</span> = <span class="text-red">Red 4</span>',
            rule_div_name: 'Division (Div)',
            rule_div_ex: 'e.g. <span class="text-red">Red 10</span> ÷ <span class="text-red">Red 3</span> = <span class="text-red">Red 3</span> <small>(10/3 ≈ 3)</small>',
            rule_pow_name: 'Power (Pow)',
            rule_pow_ex: 'e.g. <span class="text-red">Red 2</span> ^ <span class="text-red">Red 3</span> = <span class="text-red">Red 8</span> <small>(2<sup>3</sup> = 8)</small>',
            rules_annihilation: '<strong>Annihilation:</strong> When the result equals <b>0</b>, the ball vanishes and frees up space!',
            rules_close: 'CLOSE',
            // Game over modal
            gameover_sub: 'The balls exceeded the deadline!',
            gameover_score: 'SCORE',
            gameover_best: 'BEST',
            gameover_retry: 'TRY AGAIN',
            gameover_revive: 'WATCH AD TO REVIVE',
            // In-game text
            vanish: 'Vanish!',
            warning: 'WARNING! GAME OVER IN',
        },
        ja: {
            // Start modal
            start_title: 'Zero Merge へようこそ！',
            start_sub: '物理演算 × 数式合体パズル',
            start_step1: '<strong>赤ボール ＝ 正の数</strong>、<strong>青ボール ＝ 負の数</strong>を表し、ボールには数字のみ（絶対値）が表示されます。狙いを定めて落としましょう！',
            start_step2: '<strong>同じ演算子（記号）</strong>のボール同士がぶつかると合体・計算されます。<br>例: <span class="badge-inline red">3(×)</span> と <span class="badge-inline blue">2(×)</span> は、同じ <span class="badge-inline" style="background:#3b82f6;">×</span> なので合体し、<b>3 × (-2) = -6</b>（青の6）になります。',
            start_step3: '<strong>計算の順序:</strong> 「コンテナに先にあったボール（古い方）」が<b>左辺</b>となり、「後からぶつかったボール（新しい方）」が<b>右辺</b>になります。合体時に画面に計算式が表示されます！',
            start_step4: '合体後の記号は <b>＋ → － → × → ÷ → ^ → ＋</b> の順に固定で進化します。このサイクルを計算して落とすことで、意図的に大連鎖（コンボ）を起こせます！',
            start_btn: 'ゲーム開始',
            // Rules modal
            rules_title: '合体・演算ルール',
            rules_summary: '<strong>同じ演算子</strong>で合体・計算！（古い球が左辺、新しい球が右辺）<br>合体後は <b>＋ → － → × → ÷ → ^ → ＋</b> の順に進化するため、計画的に連鎖を狙えます。',
            rule_add_name: '加算 (Add)',
            rule_add_ex: '例: <span class="text-red">赤の3</span> ＋ <span class="text-blue">青の3</span> ＝ <span class="text-gold">0 (消滅)</span>',
            rule_sub_name: '減算 (Sub)',
            rule_sub_ex: '例: <span class="text-red">赤の3</span> － <span class="text-red">赤の3</span> ＝ <span class="text-gold">0 (消滅)</span>',
            rule_mul_name: '乗算 (Mul)',
            rule_mul_ex: '例: <span class="text-blue">青の2</span> × <span class="text-blue">青の2</span> ＝ <span class="text-red">赤の4</span>',
            rule_div_name: '除算 (Div)',
            rule_div_ex: '例: <span class="text-red">赤の10</span> ÷ <span class="text-red">赤の3</span> ＝ <span class="text-red">赤の3</span> <small>(10/3 ≒ 3)</small>',
            rule_pow_name: '累乗 (Pow)',
            rule_pow_ex: '例: <span class="text-red">赤の2</span> ＾ <span class="text-red">赤の3</span> ＝ <span class="text-red">赤の8</span> <small>(2<sup>3</sup> = 8)</small>',
            rules_annihilation: '<strong>アナイアレイション:</strong> 計算結果が <b>0</b> になるとボールが消滅し、スペースが空きます！',
            rules_close: '閉じる',
            // Game over modal
            gameover_sub: 'コンテナの上限ラインを超えてしまいました',
            gameover_score: '今回のスコア',
            gameover_best: 'ハイスコア',
            gameover_retry: 'もう一度挑戦',
            gameover_revive: '広告を見て復活！',
            // In-game text
            vanish: '消滅!',
            warning: '警告! ゲームオーバーまで',
        }
    },

    get lang() { return this._lang; },

    t(key) {
        const dict = this.translations[this._lang] || this.translations['en'];
        return dict[key] || this.translations['en'][key] || key;
    },

    setLang(lang) {
        this._lang = lang;
        localStorage.setItem('zm_lang', lang);
        document.documentElement.lang = lang;
        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.t(key);
            if (text) el.innerHTML = text;
        });
        // Update lang button text
        const btn = document.getElementById('btn-lang');
        if (btn) btn.textContent = lang.toUpperCase();
    },

    toggle() {
        this.setLang(this._lang === 'en' ? 'ja' : 'en');
    },

    init() {
        this.setLang(this._lang);
    }
};

// --------------------------------------------------------------------------
// 0.5. AdMob Manager (Safe Wrapper for Native Ads)
// --------------------------------------------------------------------------
const AdManager = {
    isCapacitor: typeof window !== 'undefined' && !!window.Capacitor,
    bannerVisible: false,
    
    get adMob() {
        if (this.isCapacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
            return window.Capacitor.Plugins.AdMob;
        }
        return null;
    },

    async init() {
        if (!this.adMob) {
            console.log("AdMob not available: running in browser or plugin not loaded.");
            return;
        }
        try {
            await this.adMob.initialize({
                initializeOnJSInit: true
            });
            console.log("AdMob initialized successfully.");
            
            // Start showing the banner ad immediately
            this.showBanner();
        } catch (e) {
            console.error("Error initializing AdMob:", e);
        }
    },

    async showBanner() {
        if (!this.adMob) return;
        try {
            await this.adMob.showBanner({
                adId: 'ca-app-pub-3940256099942544/6300978111', // Test Banner ID
                position: 'BOTTOM_CENTER',
                margin: 0,
                isTesting: true
            });
            this.bannerVisible = true;
            
            // Adjust layout spacing
            const container = document.getElementById('app-container');
            if (container) container.classList.add('has-banner-ad');
            
            console.log("Banner ad shown.");
        } catch (e) {
            console.error("Error showing banner:", e);
        }
    },

    async hideBanner() {
        if (!this.adMob) return;
        try {
            await this.adMob.removeBanner();
            this.bannerVisible = false;
            
            const container = document.getElementById('app-container');
            if (container) container.classList.remove('has-banner-ad');
            
            console.log("Banner ad hidden.");
        } catch (e) {
            console.error("Error hiding banner:", e);
        }
    },

    async showInterstitial(callback) {
        if (!this.adMob) {
            console.log("AdMob not available: skipping Interstitial.");
            if (callback) callback();
            return;
        }
        try {
            let adResolved = false;
            const cleanupAndCall = () => {
                if (adResolved) return;
                adResolved = true;
                dismissListener.then(l => l.remove());
                failListener.then(l => l.remove());
                if (callback) callback();
            };

            // Register ad events for resume on dismiss/failure
            const dismissListener = this.adMob.addListener('onInterstitialAdDismissed', cleanupAndCall);
            const failListener = this.adMob.addListener('onInterstitialAdFailedToLoad', cleanupAndCall);

            await this.adMob.prepareInterstitial({
                adId: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial ID
                isTesting: true
            });
            await this.adMob.showInterstitial();
            console.log("Interstitial ad shown.");
        } catch (e) {
            console.error("Error showing interstitial:", e);
            if (callback) callback();
        }
    },

    async showRewarded(onRewardEarned, onAdDismissedOrFailed) {
        if (!this.adMob) {
            console.log("AdMob not available: auto-rewarding for testing.");
            if (onRewardEarned) onRewardEarned();
            return;
        }
        
        let rewardEarned = false;
        let adResolved = false;
        
        const cleanup = () => {
            adResolved = true;
            rewardListener.then(l => l.remove());
            dismissListener.then(l => l.remove());
            failListener.then(l => l.remove());
        };

        try {
            // Listen for the reward event
            const rewardListener = this.adMob.addListener('onAdReward', (reward) => {
                rewardEarned = true;
            });
            
            const dismissListener = this.adMob.addListener('onRewardedAdDismissed', () => {
                cleanup();
                if (rewardEarned) {
                    if (onRewardEarned) onRewardEarned();
                } else {
                    if (onAdDismissedOrFailed) onAdDismissedOrFailed();
                }
            });
            
            const failListener = this.adMob.addListener('onRewardedAdFailedToLoad', () => {
                cleanup();
                if (onAdDismissedOrFailed) onAdDismissedOrFailed();
            });

            await this.adMob.prepareRewardVideoAd({
                adId: 'ca-app-pub-3940256099942544/5224354917', // Test Rewarded ID
                isTesting: true
            });
            
            await this.adMob.showRewardVideoAd();
            console.log("Rewarded ad shown.");
        } catch (e) {
            console.error("Error showing rewarded ad:", e);
            if (onAdDismissedOrFailed) onAdDismissedOrFailed();
        }
    }
};

// --------------------------------------------------------------------------
// 1. Sound Synthesizer (Web Audio API)
// --------------------------------------------------------------------------
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('sound_enabled') !== 'false';
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('sound_enabled', this.enabled);
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.08);

        gain.gain.setValueAtTime(0.24, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playDrop() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.18);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
    }

    playCollision(vel) {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let volume = Math.min(vel / 140, 0.4);
        if (volume < 0.02) return;

        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(125 + Math.random() * 35, now);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playMerge(comboCount = 1) {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const multiplier = 1 + (comboCount - 1) * 0.12;
        const playTone = (freq, start, duration, type = 'sine') => {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq * multiplier, start);
            gain.gain.setValueAtTime(0.1, start);
            gain.gain.linearRampToValueAtTime(0.0, start + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + duration);
        };
        // 明るい和音アルペジオ
        playTone(392, now, 0.08);        // G4
        playTone(523.25, now + 0.04, 0.08); // C5
        playTone(659.25, now + 0.08, 0.1);  // E5
        playTone(783.99, now + 0.12, 0.18); // G5
    }

    playAnnihilator() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();
        let filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.45);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.45);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    playGameOver() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();
        let filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(65, now + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);
        filter.frequency.linearRampToValueAtTime(80, now + 1.2);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
    }

    playScoreTick() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1300, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.02);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
    }

    playHoldSwap() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    }

    playWarningAlarm() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        let osc = this.ctx.createOscillator();
        let gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.setValueAtTime(550, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.0, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    }
}

const synth = new SoundSynth();

// --------------------------------------------------------------------------
// 2. 物理演算オブジェクトクラス
// --------------------------------------------------------------------------
class Ball {
    constructor(x, y, value, op, isDropped = false) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.value = value;
        this.op = op; // '+', '-', '×', '÷', '^'
        this.createdAt = performance.now(); // 左右判定用 (コンテナに先にある方が左辺)
        
        // 半径の計算 (対数スケール)
        this.radius = Ball.calculateRadius(value);
        this.mass = this.radius * this.radius; // 質量は面積比例
        this.isDropped = isDropped;
        this.isMerging = false;
        
        // 静止警告用タイマー (秒単位)
        this.warningTime = 0;

        // 音声・衝突のクールダウン用
        this.lastCollisionSoundTime = 0;
    }

    static calculateRadius(val) {
        const absVal = Math.abs(val);
        // 基本半径 22px。値が大きくなると対数的に増大する
        return 22 + 7.5 * Math.log(absVal + 1);
    }
}

class Particle {
    constructor(x, y, color, type = 'normal') {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = type === 'annihilation' ? (2 + Math.random() * 6) : (1 + Math.random() * 4);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (type === 'annihilation' ? 1 : 0.5); // 上方向への浮遊感
        this.color = color;
        this.radius = type === 'annihilation' ? (1.5 + Math.random() * 3.5) : (1 + Math.random() * 3);
        this.alpha = 1.0;
        this.life = type === 'annihilation' ? (45 + Math.random() * 30) : (30 + Math.random() * 20); // 寿命フレーム数
        this.maxLife = this.life;
        this.type = type;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // わずかに減速
        this.vx *= 0.98;
        this.vy *= 0.98;
        
        // 寿命の減少とアルファフェードアウト
        this.life--;
        this.alpha = this.life / this.maxLife;
    }
}

class FloatingText {
    constructor(x, y, text, color = '#ffbe0b') {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.alpha = 1.0;
        this.life = 75; // 表示フレーム数
        this.maxLife = 75;
    }

    update() {
        this.y -= 0.55; // 上方向にゆっくり浮遊
        this.life--;
        this.alpha = this.life / this.maxLife;
    }
}

// --------------------------------------------------------------------------
// 3. ゲームのメイン管理クラス
// --------------------------------------------------------------------------
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 論理キャンバスサイズ (物理演算はこの座標系で動作)
        this.LOGICAL_W = 450;
        this.LOGICAL_H = 650;
        this.canvas.width = this.LOGICAL_W;
        this.canvas.height = this.LOGICAL_H;
        
        // 定数定義
        this.leftWall = 25;
        this.rightWall = 425;
        this.bottomWall = 620;
        this.deathLineY = 120;
        this.gravity = 420; // px/s^2
        this.bounce = 0.28; // 反発係数
        this.friction = 0.985; // 横摩擦
        this.maxValLimit = 999; // 上限値キャップ
        
        // ゲーム状態
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('zero_merge_best') || '0', 10);
        this.balls = [];
        this.particles = [];
        this.floatingTexts = [];
        this.isGameOver = false;
        this.hasRevivedThisGame = false;
        this.gameOversCount = 0;
        
        // ドロッパー状態
        this.currentDropperX = this.LOGICAL_W / 2;
        this.heldBall = null;
        this.nextBallInfo = null;
        this.dropCooldown = false;
        
        // HOLD (キープ) 状態
        this.heldStock = null;
        this.hasSwappedThisTurn = false;
        
        // 演算子の進化サイクルとコンボ状態
        this.opCycle = {
            '+': '-',
            '-': '×',
            '×': '÷',
            '÷': '^',
            '^': '+'
        };
        this.currentCombo = 0;
        
        // 演出・臨場感用の状態変数
        this.displayedScore = 0;
        this.shakeIntensity = 0;
        this.shakeTime = 0;
        this.alarmTimer = 0;
        
        // ゲーム警告
        this.warningActive = false;
        this.warningTimeLeft = 1.5; // 秒数
        
        // UI更新
        document.getElementById('best-score-val').textContent = this.bestScore;
        
        // キャンバスを画面にフィットさせる
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // イベント登録
        this.initEvents();
        
        // 次のボールと初期ボールの生成
        this.generateNextBall();
        this.loadNextBall();
        
        // ループ開始
        this.lastTime = performance.now();
        this.animate();
    }

    resizeCanvas() {
        // canvas-area の実際のサイズを取得してキャンバスのCSS表示サイズを合わせる
        const area = document.querySelector('.canvas-area');
        if (!area) return;
        const areaW = area.clientWidth;
        const areaH = area.clientHeight;
        
        // 論理アスペクト比を維持してフィット
        const aspect = this.LOGICAL_W / this.LOGICAL_H;
        let displayW, displayH;
        if (areaW / areaH > aspect) {
            // 高さ基準でフィット
            displayH = areaH;
            displayW = displayH * aspect;
        } else {
            // 幅基準でフィット
            displayW = areaW;
            displayH = displayW / aspect;
        }
        
        // CSS表示サイズ（論理canvas解像度は変えない）
        this.canvas.style.width = displayW + 'px';
        this.canvas.style.height = displayH + 'px';
    }

    initEvents() {
        // マウス移動
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isGameOver || !this.heldBall) return;
            const rect = this.canvas.getBoundingClientRect();
            // キャンバス実ピクセル比で座標計算
            const scaleX = this.canvas.width / rect.width;
            const mouseX = (e.clientX - rect.left) * scaleX;
            this.updateDropper(mouseX);
        });

        // タッチ移動 (スマホ対応)
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.isGameOver || !this.heldBall) return;
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const touchX = (e.touches[0].clientX - rect.left) * scaleX;
            this.updateDropper(touchX);
        }, { passive: false });

        // クリックで落とす
        this.canvas.addEventListener('click', (e) => {
            if (this.isGameOver) return;
            this.dropBall();
        });

        this.canvas.addEventListener('touchend', (e) => {
            if (this.isGameOver) return;
            e.preventDefault();
            this.dropBall();
        }, { passive: false });

        // サウンド切り替えボタン（アイコンのみ）
        const soundBtn = document.getElementById('btn-sound');
        const updateSoundUI = (enabled) => {
            const icon = document.getElementById('sound-icon');
            if (enabled) {
                soundBtn.classList.remove('muted');
                icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
            } else {
                soundBtn.classList.add('muted');
                icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                  <line x1="23" y1="9" x2="17" y2="15"></line>
                                  <line x1="17" y1="9" x2="23" y2="15"></line>`;
            }
        };
        updateSoundUI(synth.enabled);

        soundBtn.addEventListener('click', () => {
            const enabled = synth.toggle();
            updateSoundUI(enabled);
            synth.playClick();
        });

        // ヘルプ (ルール説明) モーダルの開閉
        const helpBtn = document.getElementById('btn-help');
        const rulesModal = document.getElementById('modal-rules');
        const closeRulesBtn = document.getElementById('btn-close-rules');
        if (helpBtn && rulesModal) {
            helpBtn.addEventListener('click', () => {
                synth.playClick();
                rulesModal.classList.add('active');
            });
        }
        if (closeRulesBtn && rulesModal) {
            closeRulesBtn.addEventListener('click', () => {
                synth.playClick();
                rulesModal.classList.remove('active');
            });
        }

        // リスタートボタン
        document.getElementById('btn-restart').addEventListener('click', () => {
            synth.playClick();
            this.restart();
        });

        // HOLD クリックゾーン (タップ・クリックで入れ替え)
        document.getElementById('hold-click-zone').addEventListener('click', (e) => {
            e.stopPropagation(); // 落下トリガーを防ぐ
            this.swapHold();
        });
        document.getElementById('hold-click-zone').addEventListener('touchend', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.swapHold();
        }, { passive: false });

        // キーボード操作 (Cキー または ShiftキーでHOLD)
        window.addEventListener('keydown', (e) => {
            if (this.isGameOver) return;
            if (e.code === 'KeyC' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.swapHold();
            }
        });
    }

    updateDropper(x) {
        if (!this.heldBall) return;
        // 壁の内側に制限
        const minX = this.leftWall + this.heldBall.radius;
        const maxX = this.rightWall - this.heldBall.radius;
        this.currentDropperX = Math.max(minX, Math.min(maxX, x));
        this.heldBall.x = this.currentDropperX;
    }

    generateNextBall() {
        // -3 ~ +3 のうち 0 を除いたランダムな数
        const possibleVals = [-3, -2, -1, 1, 2, 3];
        const val = possibleVals[Math.floor(Math.random() * possibleVals.length)];
        
        // ランダムな演算子
        const ops = ['+', '-', '×', '÷', '^'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        
        this.nextBallInfo = { value: val, op: op };
        
        // プレビューUIの更新
        const nextPreview = document.getElementById('next-ball-preview');
        const nextValText = document.getElementById('next-val-text');
        const nextOpBadge = document.getElementById('next-op-badge');
        
        // previewには絶対値のみを表示
        nextValText.textContent = Math.abs(val);
        nextOpBadge.textContent = op;
        
        // 演算子バッジの色付け (黒背景・白枠・各カラー文字)
        nextOpBadge.className = 'op-badge';
        nextOpBadge.style.backgroundColor = '#000000';
        nextOpBadge.style.borderColor = '#ffffff';
        if (op === '+') nextOpBadge.style.color = 'var(--color-add)';
        else if (op === '-') nextOpBadge.style.color = 'var(--color-sub)';
        else if (op === '×') nextOpBadge.style.color = 'var(--color-mul)';
        else if (op === '÷') nextOpBadge.style.color = 'var(--color-div)';
        else if (op === '^') nextOpBadge.style.color = 'var(--color-pow)';

        // プレビュー球自体の色
        nextPreview.className = 'ball-preview';
        if (val > 0) {
            nextPreview.classList.add('pos');
            nextPreview.style.background = `radial-gradient(circle at 35% 35%, #ff7ea5 0%, var(--color-red) 70%, #991b1b 100%)`;
            nextPreview.style.boxShadow = `0 0 15px var(--color-red-glow)`;
        } else {
            nextPreview.classList.add('neg');
            nextPreview.style.background = `radial-gradient(circle at 35% 35%, #7ef7ff 0%, var(--color-blue) 70%, #0f766e 100%)`;
            nextPreview.style.boxShadow = `0 0 15px var(--color-blue-glow)`;
        }
    }

    loadNextBall() {
        if (!this.nextBallInfo) return;
        
        // 落下前の待機位置 (y=70 固定)
        this.heldBall = new Ball(
            this.currentDropperX, 
            70, 
            this.nextBallInfo.value, 
            this.nextBallInfo.op, 
            false
        );
        
        this.generateNextBall();
    }

    dropBall() {
        if (this.dropCooldown || !this.heldBall || this.isGameOver) return;
        
        // 新しいボールを落としたのでコンボカウントをリセット
        this.currentCombo = 0;
        
        // 保持しているボールを物理ワールドに投入
        this.heldBall.isDropped = true;
        this.balls.push(this.heldBall);
        this.heldBall = null;
        
        synth.playDrop();
        
        // ドロップしたため、このターンのスワップ制限を解除
        this.hasSwappedThisTurn = false;
        
        // クールダウン設定 (連続投下防止)
        this.dropCooldown = true;
        setTimeout(() => {
            if (!this.isGameOver) {
                this.loadNextBall();
                this.dropCooldown = false;
            }
        }, 550);
    }

    // --------------------------------------------------------------------------
    // HOLD (キープ) 入れ替えシステム
    // --------------------------------------------------------------------------
    swapHold() {
        if (this.isGameOver || this.dropCooldown || this.hasSwappedThisTurn) return;
        
        synth.playHoldSwap();
        
        if (this.heldStock === null) {
            // ストックが空の場合: 現在のボールをストックに入れ、次のボールをロード
            this.heldStock = { value: this.heldBall.value, op: this.heldBall.op };
            this.heldBall = null;
            this.loadNextBall();
        } else {
            // ストックがある場合: 現在のボールとストックのボールをスワップ
            const temp = { value: this.heldBall.value, op: this.heldBall.op };
            
            // ストックされていたボールから新規生成
            this.heldBall = new Ball(
                this.currentDropperX, 
                70, 
                this.heldStock.value, 
                this.heldStock.op, 
                false
            );
            
            this.heldStock = temp;
        }
        
        this.hasSwappedThisTurn = true;
        this.updateHoldUI();
    }

    updateHoldUI() {
        const holdPreview = document.getElementById('hold-ball-preview');
        const holdValText = document.getElementById('hold-val-text');
        const holdOpBadge = document.getElementById('hold-op-badge');
        
        if (this.heldStock === null) {
            holdPreview.className = 'ball-preview empty';
            holdOpBadge.style.display = 'none';
            holdValText.textContent = '';
        } else {
            holdPreview.className = 'ball-preview';
            holdOpBadge.style.display = 'flex';
            
            const val = this.heldStock.value;
            const op = this.heldStock.op;
            
            holdValText.textContent = Math.abs(val);
            holdOpBadge.textContent = op;
            
            // 演算子バッジスタイル
            holdOpBadge.className = 'op-badge';
            holdOpBadge.style.backgroundColor = '#000000';
            holdOpBadge.style.borderColor = '#ffffff';
            if (op === '+') holdOpBadge.style.color = 'var(--color-add)';
            else if (op === '-') holdOpBadge.style.color = 'var(--color-sub)';
            else if (op === '×') holdOpBadge.style.color = 'var(--color-mul)';
            else if (op === '÷') holdOpBadge.style.color = 'var(--color-div)';
            else if (op === '^') holdOpBadge.style.color = 'var(--color-pow)';
            
            // プレビュー球の色
            if (val > 0) {
                holdPreview.className = 'ball-preview pos';
                holdPreview.style.background = `radial-gradient(circle at 35% 35%, #ff7ea5 0%, var(--color-red) 70%, #991b1b 100%)`;
                holdPreview.style.boxShadow = `4px 4px 0px rgba(0,0,0,0.5)`;
            } else {
                holdPreview.className = 'ball-preview neg';
                holdPreview.style.background = `radial-gradient(circle at 35% 35%, #7ef7ff 0%, var(--color-blue) 70%, #0f766e 100%)`;
                holdPreview.style.boxShadow = `4px 4px 0px rgba(0,0,0,0.5)`;
            }
        }
    }

    // --------------------------------------------------------------------------
    // 物理演算ロジック (Verlet/Euler複合 + 安定化マルチサブステップ)
    // --------------------------------------------------------------------------
    updatePhysics(dt) {
        if (this.isGameOver) return;

        // dtをクランプしてハング時の跳躍防止
        dt = Math.min(dt, 0.03); 

        // 8回のサブステップに分割して計算することで、貫通や激しい振動を防止
        const substeps = 8;
        const subDt = dt / substeps;

        for (let step = 0; step < substeps; step++) {
            // 1. 位置の更新と重力適用
            for (let i = 0; i < this.balls.length; i++) {
                const b = this.balls[i];
                if (!b.isDropped) continue;

                // 重力加速
                b.vy += this.gravity * subDt;
                // 位置加算
                b.x += b.vx * subDt;
                b.y += b.vy * subDt;

                // 横摩擦
                b.vx *= Math.pow(this.friction, subDt * 60);

                // 2. コンテナ境界衝突 (左右の壁・底面)
                // 左壁
                const minX = this.leftWall + b.radius;
                if (b.x < minX) {
                    b.x = minX;
                    const currentBounce = Math.abs(b.vx) < 35 ? 0 : this.bounce;
                    b.vx = -b.vx * currentBounce;
                    const now = performance.now();
                    if (now - b.lastCollisionSoundTime > 120 && Math.abs(b.vx) > 20) {
                        synth.playCollision(Math.abs(b.vx));
                        b.lastCollisionSoundTime = now;
                    }
                }
                // 右壁
                const maxX = this.rightWall - b.radius;
                if (b.x > maxX) {
                    b.x = maxX;
                    const currentBounce = Math.abs(b.vx) < 35 ? 0 : this.bounce;
                    b.vx = -b.vx * currentBounce;
                    const now = performance.now();
                    if (now - b.lastCollisionSoundTime > 120 && Math.abs(b.vx) > 20) {
                        synth.playCollision(Math.abs(b.vx));
                        b.lastCollisionSoundTime = now;
                    }
                }
                // 底面
                const maxY = this.bottomWall - b.radius;
                if (b.y > maxY) {
                    b.y = maxY;
                    const currentBounce = Math.abs(b.vy) < 35 ? 0 : this.bounce;
                    b.vy = -b.vy * currentBounce;
                    b.vx *= 0.85; // 接地摩擦
                    const now = performance.now();
                    if (now - b.lastCollisionSoundTime > 120 && Math.abs(b.vy) > 20) {
                        synth.playCollision(Math.abs(b.vy));
                        b.lastCollisionSoundTime = now;
                    }
                }
            }

            // 3. ボール同士の衝突検知 & 応答
            for (let i = 0; i < this.balls.length; i++) {
                for (let j = i + 1; j < this.balls.length; j++) {
                    const b1 = this.balls[i];
                    const b2 = this.balls[j];
                    if (!b1.isDropped || !b2.isDropped) continue;

                    const dx = b2.x - b1.x;
                    const dy = b2.y - b1.y;
                    const distSq = dx * dx + dy * dy;
                    const minDist = b1.radius + b2.radius;

                    if (distSq < minDist * minDist) {
                        const dist = Math.sqrt(distSq);
                        const overlap = minDist - dist;

                        // 衝突法線ベクトル
                        const nx = dx / (dist || 1);
                        const ny = dy / (dist || 1);

                        // 3.1 めり込みの補正 (位置の即時修正)
                        const totalMass = b1.mass + b2.mass;
                        b1.x -= nx * overlap * (b2.mass / totalMass);
                        b1.y -= ny * overlap * (b2.mass / totalMass);
                        b2.x += nx * overlap * (b1.mass / totalMass);
                        b2.y += ny * overlap * (b1.mass / totalMass);

                        // 3.2 衝突応答 (運動量保存に基づいた反発)
                        const rvx = b2.vx - b1.vx;
                        const rvy = b2.vy - b1.vy;
                        const velAlongNormal = rvx * nx + rvy * ny;

                        // お互いに近づく方向の速度を持つ場合のみ応答
                        if (velAlongNormal < 0) {
                            const currentBounce = Math.abs(velAlongNormal) < 25 ? 0 : this.bounce;
                            const impulseScalar = -(1 + currentBounce) * velAlongNormal / (1/b1.mass + 1/b2.mass);
                            
                            b1.vx -= (impulseScalar / b1.mass) * nx;
                            b1.vy -= (impulseScalar / b1.mass) * ny;
                            b2.vx += (impulseScalar / b2.mass) * nx;
                            b2.vy += (impulseScalar / b2.mass) * ny;

                            const relSpeed = Math.abs(velAlongNormal);
                            const now = performance.now();
                            if (now - b1.lastCollisionSoundTime > 120 && now - b2.lastCollisionSoundTime > 120 && relSpeed > 20) {
                                synth.playCollision(relSpeed);
                                b1.lastCollisionSoundTime = now;
                                b2.lastCollisionSoundTime = now;
                            }
                        }

                        // 3.3 合体判定: 演算子（サブ属性）が等しく、どちらもマージ処理中でない場合
                        if (b1.op === b2.op && !b1.isMerging && !b2.isMerging) {
                            b1.isMerging = true;
                            b2.isMerging = true;
                            
                            // メインスレッド処理用にマージイベントをキューイング
                            setTimeout(() => this.processMerge(b1, b2), 0);
                        }
                    }
                }
            }
        }

        // パーティクルの更新
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // 浮遊数式の更新
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.update();
            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // デッドライン警告チェック
        this.checkDeathLine(dt);
    }

    // --------------------------------------------------------------------------
    // 4. 合体計算ロジック
    // --------------------------------------------------------------------------
    processMerge(b1, b2) {
        // すでに配列から消えているなどのガード
        if (!this.balls.includes(b1) || !this.balls.includes(b2)) return;

        // 作成日時が古い（コンテナに先にある）方を「左辺（土台）」とし、新しい方を「右辺」とする
        const baseBall = b1.createdAt <= b2.createdAt ? b1 : b2;
        const incomingBall = b1.createdAt > b2.createdAt ? b1 : b2;

        const A = baseBall.value;
        const B = incomingBall.value;
        const op = baseBall.op;

        let result = 0;

        switch (op) {
            case '+':
                result = A + B;
                break;
            case '-':
                result = A - B;
                break;
            case '×':
                result = A * B;
                break;
            case '÷':
                // 分母が0になるのを防ぐ安全処理
                if (B === 0) {
                    result = A;
                } else {
                    result = Math.round(A / B);
                }
                break;
            case '^':
                if (A === 0) {
                    result = 0;
                } else {
                    const power = Math.pow(A, B);
                    result = isNaN(power) || !isFinite(power) ? (A > 0 ? this.maxValLimit : -this.maxValLimit) : Math.round(power);
                }
                break;
        }

        // 値上限のキャップ処理
        if (result > this.maxValLimit) result = this.maxValLimit;
        if (result < -this.maxValLimit) result = -this.maxValLimit;

        // 二つのボールの重心位置
        const midX = (b1.x + b2.x) / 2;
        const midY = (b1.y + b2.y) / 2;

        // ボール削除
        this.balls = this.balls.filter(b => b !== b1 && b !== b2);

        // 連鎖コンボ数を加算
        this.currentCombo++;

        // 獲得スコアの計算 (大きい数を演算するほど高スコアを獲得)
        let pointsEarned = 0;
        if (result === 0) {
            // 0消滅（アナイアレイション）: 基本150点 + 入力の絶対値の合計に応じたボーナス (コンボ倍率を乗算)
            pointsEarned = (150 + (Math.abs(A) + Math.abs(B)) * 12) * this.currentCombo;
        } else {
            // 通常合体: (入力の絶対値の和 * 12 + 結果の絶対値 * 8) * コンボ倍率
            pointsEarned = ((Math.abs(A) + Math.abs(B)) * 12 + Math.abs(result) * 8) * this.currentCombo;
        }

        // 浮遊数式テキストの作成と追加
        const fmt = (v, isFirst = false) => {
            if (v >= 0) return `${v}`;
            return isFirst ? `${v}` : `(${v})`;
        };
        const formula = `${fmt(A, true)} ${op} ${fmt(B)} = ${result === 0 ? '0 (' + I18N.t('vanish') + ')' : result}`;
        this.floatingTexts.push(new FloatingText(midX, midY - 15, formula, result === 0 ? '#ffcc00' : '#ffffff'));

        // 獲得スコアのポップアップ表示 (+PTS)
        this.floatingTexts.push(new FloatingText(midX, midY + 10, `+${pointsEarned} PTS`, '#39ff14'));

        // 連鎖コンボ数が2以上ならCOMBO!メッセージを表示
        if (this.currentCombo > 1) {
            this.floatingTexts.push(new FloatingText(midX, midY - 35, `${this.currentCombo} COMBO!`, '#ffcc00'));
        }

        // カラー判定 (正：赤, 負：青, 0：ゴールド爆発)
        const getParticleColor = (val) => {
            if (val > 0) return 'rgba(255, 71, 126, 0.8)';
            if (val < 0) return 'rgba(0, 240, 255, 0.8)';
            return 'rgba(255, 190, 11, 0.9)';
        };

        if (result === 0) {
            // --- 0消滅（アナイアレイション） ---
            synth.playAnnihilator();
            this.createExplosion(midX, midY, getParticleColor(0), 'annihilation');
            
            // 0消滅は大爆発なので強いシェイク
            this.triggerScreenShake(7, 0.25);
            
            this.addScore(pointsEarned);
        } else {
            // --- 通常合体 ---
            synth.playMerge(this.currentCombo);
            const newColor = getParticleColor(result);
            this.createExplosion(midX, midY, newColor, 'merge');

            // 新しいボールの生成 (進化サイクルにより次の演算子を決定)
            const nextOp = this.opCycle[op] || '+';
            const mergedBall = new Ball(midX, midY, result, nextOp, true);
            
            // 平均速度を引き継ぎ＋少し上に跳ね上げる
            mergedBall.vx = (b1.vx + b2.vx) / 2;
            mergedBall.vy = Math.min((b1.vy + b2.vy) / 2, -70); // 上向きのポップ

            this.balls.push(mergedBall);

            // 合体結果の大きさに応じたマイルドなシェイク
            this.triggerScreenShake(Math.min(1.5 + Math.abs(result) * 0.1, 5), 0.2);

            this.addScore(pointsEarned);
        }
    }

    triggerScreenShake(intensity, duration) {
        this.shakeIntensity = intensity;
        this.shakeTime = duration;
    }

    createExplosion(x, y, color, type) {
        const count = type === 'annihilation' ? 26 : 14;
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color, type));
        }
    }

    addScore(pts) {
        this.score += pts;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            document.getElementById('best-score-val').textContent = this.bestScore;
            localStorage.setItem('zero_merge_best', this.bestScore);
        }
    }

    // --------------------------------------------------------------------------
    // 5. デッドライン（ゲームオーバー）判定
    // --------------------------------------------------------------------------
    checkDeathLine(dt) {
        let isAnyBallAbove = false;
        
        for (let i = 0; i < this.balls.length; i++) {
            const b = this.balls[i];
            // 落下中で、中心がデッドラインより上で静止に近いもの
            if (b.isDropped && b.y - b.radius < this.deathLineY) {
                // 動きが遅いか静止している
                const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                if (speed < 12) {
                    isAnyBallAbove = true;
                    break;
                }
            }
        }

        if (isAnyBallAbove) {
            this.warningActive = true;
            this.warningTimeLeft -= dt;

            // アラーム音の周期再生 (0.4秒間隔)
            this.alarmTimer = (this.alarmTimer || 0) + dt;
            if (this.alarmTimer >= 0.4) {
                synth.playWarningAlarm();
                this.alarmTimer = 0;
            }

            if (this.warningTimeLeft <= 0) {
                this.triggerGameOver();
            }
        } else {
            this.warningActive = false;
            this.alarmTimer = 0;
            // 回復は少し早めに
            this.warningTimeLeft = Math.min(1.5, this.warningTimeLeft + dt * 2);
        }
    }

    triggerGameOver() {
        this.isGameOver = true;
        synth.playGameOver();
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-best').textContent = this.bestScore;
        
        // Show/hide revive button based on whether they have already revived in this game
        const reviveBtn = document.getElementById('btn-revive');
        if (reviveBtn) {
            if (!this.hasRevivedThisGame && this.balls.length > 0) {
                reviveBtn.style.display = 'block';
            } else {
                reviveBtn.style.display = 'none';
            }
        }
        
        const modal = document.getElementById('modal-gameover');
        modal.classList.add('active');
    }

    restart() {
        this.balls = [];
        this.particles = [];
        this.floatingTexts = [];
        this.heldStock = null;
        this.hasSwappedThisTurn = false;
        this.currentCombo = 0;
        this.score = 0;
        this.displayedScore = 0;
        this.shakeIntensity = 0;
        this.shakeTime = 0;
        this.alarmTimer = 0;
        document.getElementById('score-val').textContent = "0";
        this.isGameOver = false;
        this.warningActive = false;
        this.warningTimeLeft = 1.5;
        this.hasRevivedThisGame = false;
        
        document.getElementById('modal-gameover').classList.remove('active');
        
        this.updateHoldUI();
        this.generateNextBall();
        this.loadNextBall();
    }

    revive() {
        // 1. Sort balls by y-coordinate ascending (highest balls first, i.e., smallest y)
        this.balls.sort((a, b) => a.y - b.y);
        
        // 2. Delete top 30% of balls to free up container space
        const deleteCount = Math.ceil(this.balls.length * 0.3);
        this.balls.splice(0, deleteCount);
        
        // 3. Reset game over / warning state
        this.isGameOver = false;
        this.warningActive = false;
        this.warningTimeLeft = 1.5;
        this.hasRevivedThisGame = true;
        this.alarmTimer = 0;
        
        // 4. Hide game over modal
        document.getElementById('modal-gameover').classList.remove('active');
        
        // 5. Visual explosion effect in the center of the container
        const midX = this.LOGICAL_W / 2;
        const midY = 300;
        this.createExplosion(midX, midY, 'rgba(0, 229, 255, 0.95)', 'annihilation');
        this.triggerScreenShake(8, 0.3);
        
        // Floating Text
        const message = I18N.lang === 'ja' ? '復活！' : 'REVIVED!';
        this.floatingTexts.push(new FloatingText(midX, midY, message, '#ffcc00'));
        
        // 6. Play retro synth revival sound
        const playTone = (freq, start, duration) => {
            if (!synth.enabled) return;
            synth.init();
            const now = synth.ctx.currentTime;
            let osc = synth.ctx.createOscillator();
            let gain = synth.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + start);
            gain.gain.setValueAtTime(0.12, now + start);
            gain.gain.linearRampToValueAtTime(0.0, now + start + duration);
            osc.connect(gain);
            gain.connect(synth.ctx.destination);
            osc.start(now + start);
            osc.stop(now + start + duration);
        };
        // Arpeggio up
        playTone(261.63, 0, 0.1);    // C4
        playTone(329.63, 0.05, 0.1); // E4
        playTone(392.00, 0.1, 0.1);  // G4
        playTone(523.25, 0.15, 0.1); // C5
        playTone(659.25, 0.2, 0.1);  // E5
        playTone(783.99, 0.25, 0.15); // G5
        playTone(1046.50, 0.3, 0.25); // C6
        
        // 7. Prevent time jump in physics
        this.lastTime = performance.now();
    }

    // --------------------------------------------------------------------------
    // 6. Canvas 描画エンジン
    // --------------------------------------------------------------------------
    draw() {
        // キャンバスのクリア
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. デッドライン（警告線）の描画
        this.ctx.beginPath();
        this.ctx.setLineDash([6, 6]);
        this.ctx.lineWidth = 2;
        if (this.warningActive) {
            // 警告中は赤く激しくパルス
            const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.012);
            this.ctx.strokeStyle = `rgba(255, 71, 126, ${0.4 + pulse * 0.6})`;
            this.ctx.shadowColor = 'rgba(255, 71, 126, 0.8)';
            this.ctx.shadowBlur = 10;
        } else {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.shadowBlur = 0;
        }
        this.ctx.moveTo(this.leftWall, this.deathLineY);
        this.ctx.lineTo(this.rightWall, this.deathLineY);
        this.ctx.stroke();
        this.ctx.setLineDash([]); // ダッシュ解除
        this.ctx.shadowBlur = 0; // シャドウ解除

        // 警告文字のオーバーレイ
        if (this.warningActive && !this.isGameOver) {
            this.ctx.font = "800 13px 'Outfit'";
            this.ctx.fillStyle = 'rgba(255, 71, 126, 0.9)';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${I18N.t('warning')} ${this.warningTimeLeft.toFixed(1)}s`, this.rightWall - 10, this.deathLineY - 10);
        }

        // 2. ドロップ用ガイドライン
        if (this.heldBall && !this.isGameOver) {
            this.ctx.beginPath();
            this.ctx.setLineDash([4, 8]);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            this.ctx.lineWidth = 1.5;
            
            // 縦に下に伸ばすガイドライン
            // 簡易的に一番下までか、下にあるボールの最上部まで引く
            let stopY = this.bottomWall;
            for (let i = 0; i < this.balls.length; i++) {
                const b = this.balls[i];
                if (b.isDropped && Math.abs(b.x - this.heldBall.x) < (b.radius + this.heldBall.radius)) {
                    // 交差する可能性がある高さ
                    const touchY = b.y - b.radius;
                    if (touchY > this.deathLineY && touchY < stopY) {
                        stopY = touchY;
                    }
                }
            }
            
            this.ctx.moveTo(this.heldBall.x, this.heldBall.y + this.heldBall.radius);
            this.ctx.lineTo(this.heldBall.x, stopY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }

        // 3. ボールの描画
        // すべてのボールのisBaseをリセット
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].isBase = false;
        }

        // 演算子ごとに最も古い（マージ時に左辺＝ベースになる）ボールを特定してisBase=trueにする
        const opsList = ['+', '-', '×', '÷', '^'];
        for (const op of opsList) {
            const matchingBalls = this.balls.filter(b => b.isDropped && b.op === op);
            if (matchingBalls.length > 0) {
                let oldest = matchingBalls[0];
                for (let i = 1; i < matchingBalls.length; i++) {
                    if (matchingBalls[i].createdAt < oldest.createdAt) {
                        oldest = matchingBalls[i];
                    }
                }
                oldest.isBase = true;
            }
        }

        // 現在保持しているボールがあれば描画
        if (this.heldBall && !this.isGameOver) {
            this.drawBall(this.heldBall);
        }

        // 落下済みのボールの描画
        for (let i = 0; i < this.balls.length; i++) {
            this.ctx.save();
            this.drawBall(this.balls[i]);
            this.ctx.restore();
        }

        // 4. パーティクルの描画 (レトロな四角ドット)
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            
            // 0消滅（アナイアレイション）はスパークル風十字ドット
            if (p.type === 'annihilation') {
                this.ctx.fillStyle = p.color;
                this.ctx.translate(p.x, p.y);
                this.ctx.fillRect(-p.radius, -p.radius/3, p.radius*2, p.radius*0.66);
                this.ctx.fillRect(-p.radius/3, -p.radius, p.radius*0.66, p.radius*2);
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
            }
            this.ctx.restore();
        }

        // 5. 浮遊数式の描画
        for (let i = 0; i < this.floatingTexts.length; i++) {
            const ft = this.floatingTexts[i];
            this.ctx.save();
            this.ctx.globalAlpha = ft.alpha;
            this.ctx.font = "bold 15px 'DotGothic16', sans-serif";
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // 黒縁取り
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3.5;
            this.ctx.strokeText(ft.text, ft.x, ft.y);
            
            // 文字塗りつぶし
            this.ctx.fillStyle = ft.color;
            this.ctx.fillText(ft.text, ft.x, ft.y);
            this.ctx.restore();
        }

        // 5. コンテナ壁面枠の描画 (ネオン風)
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        this.ctx.moveTo(this.leftWall, 30);
        this.ctx.lineTo(this.leftWall, this.bottomWall);
        this.ctx.lineTo(this.rightWall, this.bottomWall);
        this.ctx.lineTo(this.rightWall, 30);
        this.ctx.stroke();

        // メインコンテナの太枠
        this.ctx.beginPath();
        this.ctx.lineWidth = 2.5;
        this.ctx.strokeStyle = 'rgba(147, 51, 234, 0.35)'; // 紫のネオン
        this.ctx.shadowColor = 'rgba(147, 51, 234, 0.6)';
        this.ctx.shadowBlur = 12;
        this.ctx.moveTo(this.leftWall, 30);
        this.ctx.lineTo(this.leftWall, this.bottomWall);
        this.ctx.lineTo(this.rightWall, this.bottomWall);
        this.ctx.lineTo(this.rightWall, 30);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0; // リセット
    }

    drawBall(ball) {
        this.ctx.save();

        const x = ball.x;
        const y = ball.y;
        const r = ball.radius;
        const val = ball.value;

        // レトロ2Dのフラットカラーとシャドウ (135度の急な境界で影を表現)
        const baseColor = val > 0 ? '#ff3366' : '#00e5ff';
        const shadowColor = val > 0 ? '#b3002d' : '#008ca3';

        const grad = this.ctx.createLinearGradient(x - r, y - r, x + r, y + r);
        grad.addColorStop(0, baseColor);
        grad.addColorStop(0.70, baseColor);
        grad.addColorStop(0.70, shadowColor);
        grad.addColorStop(1.0, shadowColor);

        // ボール本体の描画 (ベース球＝最古球の場合は枠線を白にして強調)
        let outlineColor = '#000000';
        if (ball.isBase) {
            outlineColor = '#ffffff';
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();
        this.ctx.strokeStyle = outlineColor;
        this.ctx.lineWidth = 3.5;
        this.ctx.stroke();

        // 8-bit風の矩形光沢ハイライト (左上に白の四角形)
        const pSize = Math.max(4, Math.round(r * 0.16));
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x - r * 0.45, y - r * 0.45, pSize, pSize);

        // ----------------------------------
        // 数値テキストの描画 (黒枠のアウトライン付きで視認性最大)
        // ----------------------------------
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const fontSize = Math.max(12, Math.round(r * 0.52));
        this.ctx.font = `bold ${fontSize}px 'DotGothic16', sans-serif`;
        
        const textVal = Math.abs(val).toString();
        const textOffsetY = -r * 0.12;
        
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3.5;
        this.ctx.strokeText(textVal, x, y + textOffsetY);
        this.ctx.fillText(textVal, x, y + textOffsetY);

        // ----------------------------------
        // 演算子バッジの描画 (四角いレトロバッジ：黒背景に各演算子カラーの記号)
        // ----------------------------------
        const badgeSize = Math.max(8, r * 0.28) * 2;
        const badgeX = x - badgeSize / 2;
        const badgeY = y + r * 0.42 - badgeSize / 2;

        let symbolColor = '#ffffff';
        if (ball.op === '+') symbolColor = '#39ff14'; // 加算：ネオングリーン
        else if (ball.op === '-') symbolColor = '#ff073a'; // 減算：ネオンレッド
        else if (ball.op === '×') symbolColor = '#00f0ff'; // 乗算：ネオンシアン
        else if (ball.op === '÷') symbolColor = '#ff007f'; // 除算：ネオンピンク
        else if (ball.op === '^') symbolColor = '#cc00ff'; // 累乗：ネオンパープル

        // バッジ外側の太黒枠
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(badgeX - 1.5, badgeY - 1.5, badgeSize + 3, badgeSize + 3);

        // バッジ内側塗りつぶし (レトロな黒窓窓)
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(badgeX, badgeY, badgeSize, badgeSize);
        
        // バッジ白内枠
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1.2;
        this.ctx.strokeRect(badgeX, badgeY, badgeSize, badgeSize);

        // 記号描画 (それぞれのカラーで描画)
        this.ctx.fillStyle = symbolColor;
        this.ctx.font = `900 ${Math.round(badgeSize * 0.85)}px sans-serif`;
        this.ctx.fillText(ball.op, x, y + r * 0.42 + 0.5);

        this.ctx.restore();
    }

    // --------------------------------------------------------------------------
    // アニメーションループ
    // --------------------------------------------------------------------------
    animate() {
        const now = performance.now();
        const dt = (now - this.lastTime) / 1000; // 秒に変換
        this.lastTime = now;

        // 1. 物理演算の更新
        this.updatePhysics(dt);

        // 2. スコアのロール（カタカタカウントアップ）アニメーション
        if (this.displayedScore < this.score) {
            const diff = this.score - this.displayedScore;
            const step = Math.max(1, Math.ceil(diff * 0.12)); // イージング
            this.displayedScore += step;
            
            document.getElementById('score-val').textContent = this.displayedScore;
            
            // レトロなクリックビープ音 (2ステップ毎に発音)
            if (this.displayedScore % 2 === 0) {
                synth.playScoreTick();
            }
        } else if (this.displayedScore > this.score) {
            this.displayedScore = this.score;
            document.getElementById('score-val').textContent = this.displayedScore;
        }

        // 3. 画面シェイク（振動）エフェクト
        if (this.shakeTime > 0) {
            this.shakeTime -= dt;
            const dx = (Math.random() - 0.5) * this.shakeIntensity;
            const dy = (Math.random() - 0.5) * this.shakeIntensity;
            this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
        } else {
            this.canvas.style.transform = 'translate(0px, 0px)';
        }

        // 4. 描画
        this.draw();

        requestAnimationFrame(() => this.animate());
    }
}

// --------------------------------------------------------------------------
// 4. Game Initialization
// --------------------------------------------------------------------------
let gameInstance = null;

// Initialize i18n on page load
I18N.init();

// Language toggle button
document.getElementById('btn-lang').addEventListener('click', () => {
    synth.playClick();
    I18N.toggle();
});

// Start button
document.getElementById('btn-start-game').addEventListener('click', () => {
    synth.init();
    synth.playClick();
    document.getElementById('modal-start').classList.remove('active');
    gameInstance = new Game();
    // Initialize AdMob and load banner immediately
    AdManager.init();
});

// Retry button
document.getElementById('btn-retry').addEventListener('click', () => {
    synth.playClick();
    if (gameInstance) {
        gameInstance.gameOversCount++;
        // Show Interstitial ad every 3rd Game Over restart
        if (gameInstance.gameOversCount % 3 === 0) {
            AdManager.showInterstitial(() => {
                gameInstance.restart();
            });
        } else {
            gameInstance.restart();
        }
    }
});

// Revive button (Watch rewarded ad to revive)
document.getElementById('btn-revive').addEventListener('click', () => {
    synth.playClick();
    if (gameInstance) {
        AdManager.showRewarded(() => {
            // Success: Reward the player by reviving!
            gameInstance.revive();
        }, () => {
            // Failure or user skipped
            console.log("Rewarded ad skipped or failed to show.");
        });
    }
});
