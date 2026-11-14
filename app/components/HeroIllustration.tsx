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
      <ellipse cx={cx} cy={cy} rx="14.5" ry="18" fill="#fff" />
      <ellipse cx={cx} cy={cy + 2} rx="12" ry="15.5" fill={EYE} />
      <ellipse cx={cx} cy={cy + 8} rx="9" ry="7" fill="#c07a4e" opacity="0.6" />
      <ellipse cx={cx} cy={cy + 1} rx="5.5" ry="7.5" fill={LINE} />
      <circle cx={cx - 4.5} cy={cy - 5} r="5" fill="#fff" />
      <circle cx={cx + 4.5} cy={cy + 7} r="2.2" fill="#fff" />
      <circle cx={cx + 5.5} cy={cy - 6} r="1.4" fill="#fff" />
      {/* 上睫毛＋眼尾小翹 */}
      <path
        d={`M${cx - 16} ${cy - 6} Q${cx} ${cy - 23} ${cx + 16} ${cy - 8} L${cx + 19} ${cy - 12}`}
        fill="none"
        stroke={LINE}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 下睫毛 */}
      <path
        d={`M${cx - 6} ${cy + 18.5} Q${cx} ${cy + 20} ${cx + 6} ${cy + 18.5}`}
        fill="none"
        stroke={LINE}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
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

      {/* 高馬尾（在頭後方，往右後甩） */}
      <path
        d="M306 96 Q380 88 386 170 Q390 240 352 304 Q358 262 346 222 Q336 176 314 132 Z"
        fill={HAIR}
      />
      <path d="M340 120 Q368 150 366 220" fill="none" stroke={HAIR_LIGHT} strokeWidth="5" strokeLinecap="round" />

      {/* 後髮（綁起來，只剩頭型） */}
      <path
        d="M168 150 Q160 72 245 70 Q330 72 322 150 L318 204 Q300 216 290 204 L200 204 Q190 216 172 204 Z"
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
      <path
        d="M178 132 Q174 188 206 214 Q228 230 245 230 Q262 230 284 214 Q316 188 312 132 Z"
        fill={SKIN}
      />

      {/* 側髮 */}
      <path d="M180 132 Q170 190 182 236 L194 232 Q186 186 194 140 Z" fill={HAIR} />
      <path d="M310 132 Q320 190 308 236 L296 232 Q304 186 296 140 Z" fill={HAIR} />

      {/* 瀏海 */}
      <path
        d="M174 150 Q170 80 245 78 Q320 80 316 150 L308 138 L300 114 Q284 130 268 146 Q272 124 272 106 Q248 132 218 146 Q228 126 230 110 Q208 130 190 142 Z"
        fill={HAIR}
      />
      <path d="M206 98 Q232 86 258 90" fill="none" stroke={HAIR_LIGHT} strokeWidth="6" strokeLinecap="round" />
      {/* 蝴蝶結 */}
      <g transform="rotate(-18 312 104)">
        <path d="M312 104 L290 90 Q284 104 290 118 Z" fill="var(--accent)" />
        <path d="M312 104 L334 90 Q340 104 334 118 Z" fill="var(--accent)" />
        <path d="M308 108 L300 128 L308 124 Z M316 108 L324 128 L316 124 Z" fill="var(--accent)" />
        <circle cx="312" cy="104" r="6" fill="#c63f1c" />
      </g>

      {/* 眉毛 */}
      <path d="M207 150 Q215 146 223 149" fill="none" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M267 149 Q275 146 283 150" fill="none" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />

      {/* 眼睛（大一點、靠下一點更顯稚氣） */}
      <Eye cx={215} cy={180} />
      <Eye cx={275} cy={180} />

      {/* 腮紅：圓腮紅＋斜線 */}
      <ellipse cx="200" cy="206" rx="14" ry="8" fill="#f59a9a" opacity="0.55" />
      <ellipse cx="290" cy="206" rx="14" ry="8" fill="#f59a9a" opacity="0.55" />
      <path d="M193 208 L197 202 M200 209 L204 203 M207 208 L211 202" stroke="#e77b7b" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M283 208 L287 202 M290 209 L294 203 M297 208 L301 202" stroke="#e77b7b" strokeWidth="1.6" strokeLinecap="round" />

      {/* 小鼻子 */}
      <path d="M244 198 Q246 200 248 198" fill="none" stroke={SKIN_SHADE} strokeWidth="2" strokeLinecap="round" />

      {/* 張口笑 */}
      <path d="M237 207 Q245 207 253 207 Q252 218 245 218 Q238 218 237 207 Z" fill="#c4495a" stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M240.5 214 Q245 211 249.5 214 Q247.5 217 245 217 Q242.5 217 240.5 214 Z" fill="#f08a96" />


      {/* 閃亮與加油 */}
      <Sparkle x={414} y={190} s={1.1} color="var(--accent)" />
      <Sparkle x={432} y={232} s={0.6} color="#f5b83d" />
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
