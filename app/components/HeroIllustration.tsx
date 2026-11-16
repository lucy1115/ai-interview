// 禮儀海報風插圖：兩格漫畫。上格是準備好的職缺描述與履歷特寫，
// 下格是淺藍線稿的面試室，穿粉紅套裝的應徵者握拳替自己打氣。
const INK = "#161616";
const PANEL = "#d4eefb";
const RULE = "#6db8e3";
const RULE_FILL = "#eaf7fe";
const PEACH = "#f19a9a";
const LEMON = "#f8e45c";
const COBALT = "#2c5cc5";
const SKIN = "#fbe3d3";
const HAIR = "#c0613a";

const PANEL_A = "M34 16 H446 Q464 16 464 34 V144 L16 178 V34 Q16 16 34 16 Z";
const PANEL_B = "M16 196 L464 162 V526 Q464 544 446 544 H34 Q16 544 16 526 Z";

// 先畫粗黑外框再疊上顏色，做出漫畫描線的手臂
function Limb({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={PEACH} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 560"
      className={className}
      role="img"
      aria-label="兩格漫畫：上格是職缺描述與履歷特寫；下格是穿粉紅套裝的應徵者在面試室裡握拳打氣，面試官說「請先自我介紹」"
    >
      <defs>
        <pattern id="hero-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.2" fill={RULE} />
        </pattern>
        <clipPath id="hero-clip-a">
          <path d={PANEL_A} />
        </clipPath>
        <clipPath id="hero-clip-b">
          <path d={PANEL_B} />
        </clipPath>
      </defs>

      {/* ───── 上格：職缺描述＋履歷特寫 ───── */}
      <g clipPath="url(#hero-clip-a)">
        <rect width="480" height="200" fill={PANEL} />
        <rect width="480" height="200" fill="url(#hero-dots)" opacity="0.55" />
        <path d="M0 20 L200 90 M0 70 L180 110 M480 10 L300 80 M480 120 L320 110" stroke={RULE} strokeWidth="2" />

        {/* 職缺描述 */}
        <g transform="rotate(-7 140 95)">
          <rect x="62" y="40" width="150" height="112" rx="6" fill="#fff" stroke={INK} strokeWidth="3" />
          <text x="80" y="70" fontSize="17" fontWeight="900" fill={INK}>
            職缺描述
          </text>
          <rect x="80" y="84" width="112" height="6" rx="3" fill={RULE} />
          <rect x="80" y="98" width="96" height="6" rx="3" fill={RULE} />
          <rect x="80" y="112" width="104" height="6" rx="3" fill={RULE} />
          <rect x="80" y="126" width="64" height="6" rx="3" fill={RULE} />
          <circle cx="188" cy="128" r="13" fill={PEACH} stroke={INK} strokeWidth="2.5" />
          <path d="M182 128 L187 133 L195 123" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* 履歷資料夾 */}
        <g transform="rotate(5 340 95)">
          <rect x="268" y="36" width="140" height="96" rx="4" fill="#fff" stroke={INK} strokeWidth="3" />
          <path
            d="M258 62 H316 L326 52 H420 Q426 52 426 58 V148 Q426 154 420 154 H264 Q258 154 258 148 Z"
            fill={LEMON}
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="300" y="92" width="92" height="30" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <text x="346" y="113" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK}>
            履歷
          </text>
        </g>
        <path d="M436 40 l12 -10 M442 58 l16 -3" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d={PANEL_A} fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />

      {/* ───── 下格：面試室 ───── */}
      <g clipPath="url(#hero-clip-b)">
        <rect y="150" width="480" height="420" fill={PANEL} />
        <rect y="150" width="480" height="70" fill="url(#hero-dots)" opacity="0.6" />
        <rect y="468" width="480" height="100" fill="url(#hero-dots)" />
        <path d="M0 468 H480" stroke={RULE} strokeWidth="2.5" />

        {/* 面試室的門（淺藍線稿） */}
        <rect x="44" y="232" width="112" height="236" rx="3" fill={RULE_FILL} stroke={RULE} strokeWidth="3" />
        <rect x="58" y="248" width="84" height="96" rx="3" fill="none" stroke={RULE} strokeWidth="2" />
        <rect x="58" y="356" width="84" height="98" rx="3" fill="none" stroke={RULE} strokeWidth="2" />
        <circle cx="144" cy="350" r="5" fill={RULE} />
        <rect x="64" y="204" width="72" height="22" rx="5" fill="#fff" stroke={RULE} strokeWidth="2.5" />
        <text x="100" y="220" textAnchor="middle" fontSize="13" fontWeight="700" fill={RULE}>
          面試室
        </text>

        {/* 面試官（淺藍線稿） */}
        <rect x="352" y="318" width="70" height="72" rx="10" fill={RULE_FILL} stroke={RULE} strokeWidth="2.5" />
        <path d="M352 392 Q354 352 387 350 Q420 352 422 392 Z" fill={RULE_FILL} stroke={RULE} strokeWidth="3" strokeLinejoin="round" />
        <path d="M387 352 L382 366 L387 384 L392 366 Z" fill="none" stroke={RULE} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="387" cy="322" r="20" fill="#f6fbfe" stroke={RULE} strokeWidth="3" />
        <path d="M367 318 Q369 298 387 298 Q406 298 407 318 Q398 308 387 310 Q375 310 367 318 Z" fill="#bfe2f5" stroke={RULE} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="380" cy="324" r="5" fill="none" stroke={RULE} strokeWidth="2" />
        <circle cx="395" cy="324" r="5" fill="none" stroke={RULE} strokeWidth="2" />
        <path d="M385 324 H390 M381 334 Q387 338 393 334" fill="none" stroke={RULE} strokeWidth="2" strokeLinecap="round" />
        <path d="M332 388 L340 360 H372 L368 388 Z" fill="#f6fbfe" stroke={RULE} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="318" y="388" width="146" height="12" rx="3" fill={RULE_FILL} stroke={RULE} strokeWidth="3" />
        <path d="M332 400 V468 M450 400 V468" stroke={RULE} strokeWidth="3" />

        {/* 面試官的對話框 */}
        <rect x="300" y="202" width="156" height="50" rx="14" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M390 250 L398 272 L410 250" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M392 250 H408" stroke="#fff" strokeWidth="4" />
        <text x="378" y="234" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
          請先自我介紹。
        </text>

        {/* ── 應徵者 ── */}
        <ellipse cx="250" cy="528" rx="54" ry="7" fill={RULE} opacity="0.6" />

        {/* 後髮 */}
        <path
          d="M222 232 Q218 196 250 194 Q282 196 278 232 Q284 262 272 276 Q262 270 262 258 L238 258 Q238 270 228 276 Q216 262 222 232 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 褲子與鞋 */}
        <path d="M222 376 L249 376 L246 508 L229 508 Z" fill={PEACH} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M251 376 L278 376 L272 508 L254 508 Z" fill={PEACH} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M226 504 L248 504 L249 520 Q236 524 214 520 Q214 510 226 504 Z" fill={COBALT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M252 504 L274 504 Q286 510 286 520 Q266 524 251 520 Z" fill={COBALT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />

        {/* 脖子、外套、襯衫 */}
        <rect x="243" y="254" width="14" height="28" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <path
          d="M228 280 Q250 272 272 280 Q284 284 286 300 L284 382 L216 382 L214 300 Q216 284 228 280 Z"
          fill={PEACH}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M240 278 L250 304 L260 278 Z" fill="#fff" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M240 280 L232 300 L250 334 M260 280 L268 300 L250 334" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />

        {/* 抱在胸前的履歷 */}
        <g transform="rotate(-8 250 325)">
          <rect x="229" y="292" width="44" height="14" fill="#fff" stroke={INK} strokeWidth="2" />
          <rect x="222" y="300" width="58" height="70" rx="4" fill={LEMON} stroke={INK} strokeWidth="3" />
          <rect x="234" y="322" width="34" height="5" rx="2.5" fill={INK} opacity="0.25" />
        </g>
        <Limb d="M224 292 Q206 318 214 344 L238 340" />
        <circle cx="242" cy="339" r="8" fill={SKIN} stroke={INK} strokeWidth="2.5" />

        {/* 握拳打氣的手 */}
        <Limb d="M276 292 L302 320 L306 282" />
        <circle cx="306" cy="272" r="10" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <path d="M300 268 H312 M300 274 H311" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M322 250 l10 -10 M328 266 l14 -3 M316 240 l2 -14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />

        {/* 臉 */}
        <ellipse cx="250" cy="236" rx="22" ry="26" fill={SKIN} stroke={INK} strokeWidth="3" />
        <path
          d="M227 236 Q222 204 250 202 Q280 204 274 238 Q268 222 254 218 Q240 228 227 236 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M252 206 Q245 214 238 226" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M236 228 Q241 225 245 227 M256 227 Q261 225 265 228" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="241" cy="236" rx="2.6" ry="3.6" fill={INK} />
        <ellipse cx="259" cy="236" rx="2.6" ry="3.6" fill={INK} />
        <path d="M250 240 L248 247 L251 247" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="234" cy="248" rx="5" ry="3" fill={PEACH} opacity="0.8" />
        <ellipse cx="266" cy="248" rx="5" ry="3" fill={PEACH} opacity="0.8" />
        <path d="M242 252 Q250 254 258 252 Q256 262 250 262 Q244 262 242 252 Z" fill="#c94a55" stroke={INK} strokeWidth="2" strokeLinejoin="round" />

        {/* 幹勁線 */}
        <path d="M206 206 l-10 -8 M203 222 l-13 -2 M212 192 l-6 -11" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d={PANEL_B} fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}
