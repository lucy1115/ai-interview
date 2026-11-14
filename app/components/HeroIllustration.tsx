// 日系卡通風插圖：穿套裝、抱著履歷準備進面試室的女孩
const SKIN = "#f8dcc8";
const SKIN_SHADE = "#ecc2a8";
const HAIR = "#3b2a24";
const HAIR_LIGHT = "#5a4036";
const SUIT = "#2b3350";
const SUIT_DARK = "#20263d";
const SUIT_LIGHT = "#3a4466";
const EYE = "#6b3f2a";
const LINE = "#2a1712";

function Eye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="12" ry="15" fill="#fff" />
      <ellipse cx={cx} cy={cy + 2} rx="9.5" ry="12.5" fill={EYE} />
      <ellipse cx={cx} cy={cy + 6} rx="7" ry="6" fill="#a0603e" opacity="0.55" />
      <ellipse cx={cx} cy={cy + 1} rx="4.5" ry="6" fill={LINE} />
      <circle cx={cx - 3.5} cy={cy - 4} r="3.6" fill="#fff" />
      <circle cx={cx + 3.5} cy={cy + 6} r="1.6" fill="#fff" />
      <path
        d={`M${cx - 14} ${cy - 7} Q${cx} ${cy - 20} ${cx + 14} ${cy - 9}`}
        fill="none"
        stroke={LINE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Sparkle({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -12 Q2 -2 12 0 Q2 2 0 12 Q-2 2 -12 0 Q-2 -2 0 -12 Z"
      fill={color}
    />
  );
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 520"
      className={className}
      role="img"
      aria-label="穿著套裝、抱著履歷的女孩站在面試室門口，準備進去面試"
    >
      {/* 背景圓 */}
      <circle cx="255" cy="270" r="215" fill="var(--accent-soft)" />

      {/* 面試室的門 */}
      <rect x="36" y="128" width="116" height="352" rx="6" fill="var(--card)" stroke="var(--line)" strokeWidth="3" />
      <rect x="52" y="150" width="84" height="150" rx="4" fill="none" stroke="var(--line)" strokeWidth="2" />
      <rect x="52" y="318" width="84" height="140" rx="4" fill="none" stroke="var(--line)" strokeWidth="2" />
      <circle cx="130" cy="310" r="6" fill="var(--muted)" />
      <rect x="58" y="96" width="72" height="28" rx="6" fill="var(--accent)" />
      <text x="94" y="115.5" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
        面試室
      </text>

      {/* 對話框 */}
      <g>
        <rect x="282" y="38" width="168" height="54" rx="27" fill="var(--card)" stroke="var(--line)" strokeWidth="2.5" />
        <path d="M318 90 L306 112 L336 91" fill="var(--card)" stroke="var(--line)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M316 89.5 L338 89.5" stroke="var(--card)" strokeWidth="4" />
        <text x="366" y="71" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink)">
          下一位，請進～
        </text>
      </g>

      {/* 地面陰影 */}
      <ellipse cx="245" cy="486" rx="78" ry="11" fill="var(--ink)" opacity="0.12" />

      {/* 後髮 */}
      <path
        d="M168 150 Q160 72 245 70 Q330 72 322 150 L330 262 Q306 276 290 254 L200 254 Q184 276 160 262 Z"
        fill={HAIR}
      />

      {/* 腿與鞋 */}
      <rect x="219" y="388" width="19" height="86" rx="8" fill={SKIN} />
      <rect x="253" y="388" width="19" height="86" rx="8" fill={SKIN} />
      <path d="M214 470 Q214 462 228 462 Q242 462 242 474 L242 480 L212 480 Z" fill={LINE} />
      <path d="M249 474 Q249 462 263 462 Q277 462 277 470 L279 480 L249 480 Z" fill={LINE} />

      {/* 裙子 */}
      <path d="M194 330 L296 330 L306 398 L184 398 Z" fill={SUIT_DARK} />
      <path d="M245 340 L245 398" stroke={SUIT} strokeWidth="3" />

      {/* 脖子 */}
      <rect x="233" y="216" width="24" height="30" rx="6" fill={SKIN} />
      <path d="M233 228 Q245 238 257 228 L257 236 Q245 244 233 236 Z" fill={SKIN_SHADE} />

      {/* 西裝外套 */}
      <path d="M198 248 Q245 234 292 248 L304 344 L186 344 Z" fill={SUIT} />
      <path d="M230 242 L245 282 L260 242 Z" fill="#fff" />
      <path d="M230 242 L216 256 L240 300 L245 282 Z" fill={SUIT_LIGHT} />
      <path d="M260 242 L274 256 L250 300 L245 282 Z" fill={SUIT_LIGHT} />
      <circle cx="245" cy="318" r="3.5" fill={SUIT_LIGHT} />

      {/* 手臂 */}
      <path d="M200 254 Q186 290 214 310" fill="none" stroke={SUIT} strokeWidth="24" strokeLinecap="round" />
      <path d="M290 254 Q304 290 276 310" fill="none" stroke={SUIT} strokeWidth="24" strokeLinecap="round" />

      {/* 履歷資料夾 */}
      <g transform="rotate(-6 245 300)">
        <rect x="212" y="270" width="70" height="56" rx="5" fill="var(--accent)" />
        <rect x="220" y="262" width="54" height="14" rx="2" fill="#fff" />
        <path d="M226 268 L262 268" stroke="#cfc6b7" strokeWidth="2" />
        <rect x="226" y="286" width="42" height="5" rx="2.5" fill="#fff" opacity="0.6" />
      </g>
      <circle cx="214" cy="310" r="10" fill={SKIN} />
      <circle cx="276" cy="306" r="10" fill={SKIN} />

      {/* 臉 */}
      <path d="M180 138 Q180 206 245 230 Q310 206 310 138 Z" fill={SKIN} />

      {/* 側髮 */}
      <path d="M180 132 Q170 190 182 236 L194 232 Q186 186 194 140 Z" fill={HAIR} />
      <path d="M310 132 Q320 190 308 236 L296 232 Q304 186 296 140 Z" fill={HAIR} />

      {/* 瀏海 */}
      <path
        d="M174 150 Q170 80 245 78 Q320 80 316 150 L302 138 L294 116 L284 146 L268 112 L256 144 L242 108 L228 146 L214 114 L204 144 L190 122 Z"
        fill={HAIR}
      />
      <path d="M206 98 Q232 86 258 90" fill="none" stroke={HAIR_LIGHT} strokeWidth="6" strokeLinecap="round" />
      {/* 髮夾 */}
      <rect x="282" y="118" width="22" height="7" rx="3.5" fill="var(--accent)" transform="rotate(-28 293 121)" />

      {/* 眉毛 */}
      <path d="M208 151 Q218 146 228 150" fill="none" stroke={HAIR} strokeWidth="3" strokeLinecap="round" />
      <path d="M262 150 Q272 146 282 151" fill="none" stroke={HAIR} strokeWidth="3" strokeLinecap="round" />

      {/* 眼睛 */}
      <Eye cx={219} cy={176} />
      <Eye cx={271} cy={176} />

      {/* 腮紅與嘴 */}
      <ellipse cx="203" cy="199" rx="11" ry="6" fill="#f4a1a1" opacity="0.6" />
      <ellipse cx="287" cy="199" rx="11" ry="6" fill="#f4a1a1" opacity="0.6" />
      <path d="M236 204 Q245 213 254 204" fill="none" stroke={LINE} strokeWidth="2.6" strokeLinecap="round" />

      {/* 小緊張的汗滴 */}
      <path d="M324 150 Q330 162 324 168 Q318 162 324 150 Z" fill="#9fd3f0" />

      {/* 閃亮與加油 */}
      <Sparkle x={352} y={208} s={1.1} color="var(--accent)" />
      <Sparkle x={380} y={238} s={0.6} color="#f5b83d" />
      <Sparkle x={168} y={58} s={0.7} color="#f5b83d" />
      <g transform="rotate(8 390 330)">
        <rect x="344" y="310" width="96" height="40" rx="20" fill="var(--leaf)" />
        <text x="392" y="336" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">
          加油！
        </text>
      </g>
    </svg>
  );
}
