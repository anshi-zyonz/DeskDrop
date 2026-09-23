/**
 * DeskDrop — PWA Client v3 (Offline-First Architecture)
 * - Microsoft 3D Animated Fluent Emojis (Stored Locally, 100% Offline)
 * - BroadcastChannel & WebRTC Dual-Mesh (Works without Internet on LAN/Localhost)
 * - Internet used EXCLUSIVELY for: Cloud AI Avatars, Giphy GIF searches, and Link Previews
 * - 64KB Chunked File Transfers, Custom Glassmorphic Wallpapers, and Reference Profile Sheet
 */

// ==========================================
// 1. CONSTANTS, COLOR PALETTES & EMOJIS
// ==========================================

const CHUNK_SIZE = 64 * 1024; // 64 KB binary chunks

const GROUP_ACCENT_COLORS = [
  { name: 'Indigo', hex: '#6C63FF' },
  { name: 'Teal', hex: '#4ECDC4' },
  { name: 'Coral', hex: '#FF6B6B' },
  { name: 'Amber', hex: '#FFE66D' },
  { name: 'Mint', hex: '#A8E6CF' },
  { name: 'Rose', hex: '#FF8B94' },
  { name: 'Lavender', hex: '#C7CEEA' },
  { name: 'Peach', hex: '#FFDAC1' }
];

// Bundled Microsoft Animated Fluent 3D Emojis (Offline Local Assets)
const FLUENT_EMOJIS = [
  { id: 'smile', name: 'Grinning Face', src: 'emojis/smile.png' },
  { id: 'joy', name: 'Tears of Joy', src: 'emojis/joy.png' },
  { id: 'rofl', name: 'Rolling on Floor', src: 'emojis/rofl.png' },
  { id: 'heart_eyes', name: 'Heart Eyes', src: 'emojis/heart_eyes.png' },
  { id: 'party', name: 'Partying Face', src: 'emojis/party.png' },
  { id: 'sunglasses', name: 'Cool Sunglasses', src: 'emojis/sunglasses.png' },
  { id: 'star_struck', name: 'Star Struck', src: 'emojis/star_struck.png' },
  { id: 'wink', name: 'Winking', src: 'emojis/wink.png' },
  { id: 'kiss', name: 'Blowing Kiss', src: 'emojis/kiss.png' },
  { id: 'thinking', name: 'Thinking', src: 'emojis/thinking.png' },
  { id: 'mind_blown', name: 'Mind Blown', src: 'emojis/mind_blown.png' },
  { id: 'zany', name: 'Zany Face', src: 'emojis/zany.png' },
  { id: 'salute', name: 'Salute', src: 'emojis/salute.png' },
  { id: 'heart', name: 'Red Heart', src: 'emojis/heart.png' },
  { id: 'hundred', name: '100 Points', src: 'emojis/hundred.png' },
  { id: 'alien', name: 'Alien Monster', src: 'emojis/alien.png' },
  { id: 'robot', name: 'Robot', src: 'emojis/robot.png' },
  { id: 'ghost', name: 'Ghost', src: 'emojis/ghost.png' },
  { id: 'thumbs_up', name: 'Thumbs Up', src: 'emojis/thumbs_up.png' },
  { id: 'clap', name: 'Clapping', src: 'emojis/clap.png' },
  { id: 'raised_hands', name: 'Raised Hands', src: 'emojis/raised_hands.png' },
  { id: 'love_you', name: 'Love You', src: 'emojis/love_you.png' },
  { id: 'victory', name: 'Victory', src: 'emojis/victory.png' },
  { id: 'rocket', name: 'Rocket', src: 'emojis/rocket.png' },
  { id: 'party_popper', name: 'Party Popper', src: 'emojis/party_popper.png' },
  { id: 'game', name: 'Video Game', src: 'emojis/game.png' }
];

const EMOJI_DICTIONARY = {
  smileys: [
    '😀', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌',
    '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨',
    '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🫣', '🤭',
    '🤫', '🤥', '😶', '😐', '😑', '😬', '🫨', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤',
    '😪', '😵', '😵‍💫', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺',
    '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'
  ],
  gestures: [
    '👋', '🤚', '🖐️', '✋', '🖖', '🫱', '🫲', '🫳', '🫴', '🫷', '🫸', '👌', '🤌', '🤏', '✌️', '🤞', '🫰',
    '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '🫵', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏',
    '🙌', '🫶', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
    '🫀', '🫁', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄', '🫦'
  ],
  animals: [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈',
    '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄',
    '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍',
    '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅',
    '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎',
    '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️',
    '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳',
    '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹',
    '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓',
    '🌔', '🌙', '🌎', '🪐', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅️',
    '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌨️', '❄️', '☃️', '⛄️', '🌬️', '💨', '💧', '💦', '🫧'
  ],
  food: [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
    '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯',
    '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕',
    '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱',
    '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰',
    '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕️', '🍵', '🧃',
    '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊'
  ],
  activities: [
    '⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏',
    '🪃', '🥅', '⛳️', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '🏂',
    '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴',
    '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹', '🎭', '🩰', '🎨', '🎬', '🎤',
    '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩'
  ],
  objects: [
    '💡', '🔦', '🏮', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🕹️', '💾', '💿', '📀', '📷', '📸', '📹',
    '🎥', '📽️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '⏱️', '⏲️', '⏰', '🕰️', '⌛️', '⏳', '📡', '🔋',
    '🔌', '🧯', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🪛', '🔧', '🔨',
    '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🧱', '⛓️', '🧲', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️',
    '🪦', '🔮', '💈', '🔭', '🔬', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧪', '🌡️', '🧹', '🪠', '🧴',
    '🧷', '🗑️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🧸', '🖼️', '🪞', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀',
    '🪄', '🎊', '🎉', '✉️', '📩', '📨', '📧', '💌', '📦', '🏷️', '📪', '📬', '📭', '📜', '📄', '📑', '🧾',
    '📊', '📈', '📉', '🗒️', '🗓️', '📅', '📇', '📁', '📂', '🗞️', '📰', '📓', '📕', '📗', '📘', '📙', '📚',
    '📖', '🔖', '🔗', '📎', '🖇️', '📐', '📏', '📌', '📍', '✂️', '🖊️', '🖋️', '✒️', '🖌️', '🖍️', '📝', '✏️',
    '🔍', '🔎', '🔒', '🔓'
  ],
  symbols: [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘',
    '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️',
    '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '☢️', '☣️', '📴', '📳', '🈶', '🈚️',
    '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑',
    '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '❗️', '❕', '❓', '❔', '‼️', '⁉️',
    '🔅', '🔆', '⚠️', '🚸', '♻️', '✅', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '♿️', '🅿️', '🈳', '🛅', '🚹',
    '🚺', '🚼', '📶', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣',
    '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '▶️', '⏸️', '⏹️', '⏺️', '⏭️',
    '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️',
    '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '🟰',
    '♾️', '💲', '💱', '™️', '©️', '®️', '👁️‍🗨️', '🔚', '🔙', '🔛', '🔝', '🔜', '〰️', '➰', '➿', '✔️', '🔘',
    '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲',
    '▪️', '▫️', '◾️', '◽️', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '🔈', '🔉',
    '🔊', '🔇', '📣', '📢', '🔔', '🔕', '♠️', '♣️', '♥️', '♦️'
  ]
};

const ALL_EMOJIS = Object.values(EMOJI_DICTIONARY).flat();

// ==========================================
// 2. APPLICATION STATE & PERSISTENCE
// ==========================================

const DEFAULT_GROUPS = [];

function loadStoredState() {
  const savedUsername = localStorage.getItem('deskdrop_username') || `Mac_${Math.floor(100 + Math.random() * 900)}`;
  const savedAvatar = localStorage.getItem('deskdrop_avatar') || '';
  const savedRoom = localStorage.getItem('deskdrop_active_room') || 'BWZ-98';
  const savedWallpaper = localStorage.getItem('deskdrop_wallpaper') || '';
  const savedOpacity = localStorage.getItem('deskdrop_wallpaper_opacity') || '0.78';
  const savedBlur = localStorage.getItem('deskdrop_wallpaper_blur') || '24';

  let savedGroups = [];
  try {
    const rawGroups = localStorage.getItem('deskdrop_groups');
    if (rawGroups) savedGroups = JSON.parse(rawGroups);
  } catch (e) {
    savedGroups = [];
  }

  let savedActiveChat = savedGroups.length > 0 ? savedGroups[0] : null;
  try {
    const rawChat = localStorage.getItem('deskdrop_active_chat');
    if (rawChat) {
      const parsed = JSON.parse(rawChat);
      if (parsed && (parsed.type === 'dm' || savedGroups.some(g => g.id === parsed.id))) {
        savedActiveChat = parsed;
      }
    }
  } catch (e) {}

  return {
    username: savedUsername,
    avatar: savedAvatar,
    roomCode: savedRoom,
    wallpaper: savedWallpaper,
    wallpaperOpacity: savedOpacity,
    wallpaperBlur: savedBlur,
    groups: savedGroups,
    activeChat: savedActiveChat,
    peerSlot: 0,
    myPeerId: 'peer_' + Math.random().toString(36).substr(2, 9),
    peer: null,
    connections: new Map(), // peerId -> DataConnection
    knownPeers: new Map(), // peerId -> { username, avatar, groupColor, groupName, status, isTyping }
    activeTransfers: new Map(),
    typingTimeout: null,
    isTyping: false
  };
}

const STATE = loadStoredState();

// Dual-Mesh: Offline local mesh via BroadcastChannel (100% offline communication on same device/browser tabs)
const localMesh = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('deskdrop_offline_mesh') : null;

if (localMesh) {
  localMesh.onmessage = (event) => {
    const packet = event.data;
    if (packet && packet.senderPeerId !== STATE.myPeerId) {
      handleIncomingData({ peer: packet.senderPeerId, open: true }, packet);
    }
  };
}

function persistActiveRoom(code) {
  STATE.roomCode = code;
  localStorage.setItem('deskdrop_active_room', code);
}

function persistGroups() {
  localStorage.setItem('deskdrop_groups', JSON.stringify(STATE.groups));
}

function persistActiveChat(target) {
  STATE.activeChat = target;
  localStorage.setItem('deskdrop_active_chat', JSON.stringify(target));
}

function getChatHistory(chatKey) {
  try {
    const raw = localStorage.getItem(`deskdrop_history_${chatKey}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveChatMessageToHistory(chatKey, msg) {
  try {
    const history = getChatHistory(chatKey);
    history.push(msg);
    if (history.length > 100) history.shift();
    localStorage.setItem(`deskdrop_history_${chatKey}`, JSON.stringify(history));
  } catch (e) {}
}

// ==========================================
// 3. SOUND SYNTHESIS & NOTIFICATIONS
// ==========================================

let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSentSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

function playReceivedSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.14, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.2);
    });
  } catch (e) {}
}

function playTransferSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.16, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.26);
    });
  } catch (e) {}
}

function triggerDesktopNotification(title, body, avatar) {
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, {
            body: body,
            icon: avatar || 'icons/icon_128x128.png',
            badge: 'icons/favicon.png',
            vibrate: [100, 50, 100]
          });
        });
      } else {
        new Notification(title, {
          body: body,
          icon: avatar || 'icons/icon_128x128.png'
        });
      }
    } catch (e) {}
  }
}

// ==========================================
// 4. UI HELPERS & TOASTS
// ==========================================

function showToast(message, icon = '✦') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let p1 = '', p2 = '';
  for (let i = 0; i < 3; i++) p1 += chars.charAt(Math.floor(Math.random() * chars.length));
  for (let i = 0; i < 2; i++) p2 += chars.charAt(Math.floor(Math.random() * chars.length));
  return `${p1}-${p2}`;
}

function sanitizeRoomCode(raw) {
  return (raw || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
}

// ==========================================
// 5. WEBRTC P2P SESSION & OFFLINE DUAL-MESH
// ==========================================

function initPeerSession(roomCode, desiredSlot = 0) {
  persistActiveRoom(roomCode);
  STATE.peerSlot = desiredSlot;
  STATE.connections.clear();
  STATE.knownPeers.clear();
  updatePeersUI();

  // Broadcast handshake on local offline channel
  announceLocalPresence();

  // If online, initialize PeerJS over WebRTC
  if (typeof Peer !== 'undefined' && navigator.onLine) {
    if (STATE.peer && !STATE.peer.destroyed) {
      try { STATE.peer.destroy(); } catch (e) {}
    }

    const cleanRoom = roomCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const peerId = `deskdrop-v3-${cleanRoom}-${desiredSlot}`;
    STATE.myPeerId = peerId;

    try {
      const peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      STATE.peer = peer;

      peer.on('open', (id) => {
        showToast(`Connected to room ${roomCode}`, '⚡️');
        for (let s = 0; s < desiredSlot; s++) {
          const targetId = `deskdrop-v3-${cleanRoom}-${s}`;
          connectToPeer(targetId);
        }
      });

      peer.on('connection', (conn) => setupDataConnection(conn));

      peer.on('error', (err) => {
        if (err.type === 'unavailable-id' && desiredSlot < 8) {
          initPeerSession(roomCode, desiredSlot + 1);
        }
      });
    } catch (e) {
      console.debug('PeerJS init fallback to offline mesh', e);
    }
  } else {
    showToast('Offline Mode: Local Mesh Active', '📡');
  }
}

function announceLocalPresence() {
  if (localMesh) {
    const primaryGroup = STATE.groups[0] || { name: 'Workspace', color: '#6C63FF' };
    localMesh.postMessage({
      type: 'handshake',
      senderPeerId: STATE.myPeerId,
      username: STATE.username,
      avatar: STATE.avatar,
      groupName: primaryGroup.name,
      groupColor: primaryGroup.color
    });
  }
}

function connectToPeer(targetPeerId) {
  if (!STATE.peer || STATE.peer.destroyed) return;
  if (STATE.connections.has(targetPeerId)) return;

  const conn = STATE.peer.connect(targetPeerId, { reliable: true, serialization: 'binary' });
  setupDataConnection(conn);
}

function setupDataConnection(conn) {
  conn.on('open', () => {
    STATE.connections.set(conn.peer, conn);

    const primaryGroup = STATE.groups[0] || { name: 'Workspace', color: '#6C63FF' };
    sendPayload(conn, {
      type: 'handshake',
      senderPeerId: STATE.myPeerId,
      username: STATE.username,
      avatar: STATE.avatar,
      groupName: primaryGroup.name,
      groupColor: primaryGroup.color
    });

    updatePeersUI();
    showToast('Teammate joined the room', '🟢');
    playReceivedSound();
  });

  conn.on('data', (data) => handleIncomingData(conn, data));

  conn.on('close', () => {
    STATE.connections.delete(conn.peer);
    STATE.knownPeers.delete(conn.peer);
    updatePeersUI();
  });
}

function sendPayload(conn, payload) {
  payload.senderPeerId = STATE.myPeerId;
  if (conn && conn.open) {
    try { conn.send(payload); } catch (e) {}
  }
}

function broadcastPayload(payload) {
  payload.senderPeerId = STATE.myPeerId;
  // Send via WebRTC DataChannels
  STATE.connections.forEach(conn => sendPayload(conn, payload));
  // Also send via local BroadcastChannel mesh (works 100% offline!)
  if (localMesh) {
    try { localMesh.postMessage(payload); } catch (e) {}
  }
}

// ==========================================
// 6. INCOMING DATA & MESSAGE HANDLER
// ==========================================

function handleIncomingData(conn, packet) {
  if (!packet || typeof packet !== 'object') return;

  switch (packet.type) {
    case 'handshake':
    case 'profile-update': {
      STATE.knownPeers.set(conn.peer, {
        username: packet.username || 'Peer',
        avatar: packet.avatar || '',
        groupName: packet.groupName || 'Teammate',
        groupColor: packet.groupColor || '#6C63FF',
        status: 'online',
        isTyping: false
      });
      updatePeersUI();
      break;
    }

    case 'chat-message': {
      handleIncomingChatMessage(conn.peer, packet);
      break;
    }

    case 'typing': {
      const peer = STATE.knownPeers.get(conn.peer);
      if (peer) {
        peer.isTyping = !!packet.isTyping;
        updatePeersUI();
      }
      break;
    }

    case 'file-start': {
      handleFileStart(conn.peer, packet);
      break;
    }
    case 'file-chunk': {
      handleFileChunk(packet);
      break;
    }
    case 'file-end': {
      handleFileEnd(packet);
      break;
    }
  }
}

function handleIncomingChatMessage(fromPeerId, msg) {
  const isDirect = msg.targetType === 'dm';
  const chatKey = isDirect ? fromPeerId : msg.groupId;

  saveChatMessageToHistory(chatKey, msg);

  const isViewingThisChat = (isDirect && STATE.activeChat.type === 'dm' && STATE.activeChat.id === fromPeerId) ||
                           (!isDirect && STATE.activeChat.type === 'group' && STATE.activeChat.id === msg.groupId);

  if (isViewingThisChat) {
    renderChatMessage(msg, false);
  } else {
    showToast(`New message from ${msg.senderName}`, '💬');
  }

  playReceivedSound();
  triggerDesktopNotification(
    msg.senderName,
    msg.msgType === 'gif' ? 'Sent a GIF' : (msg.msgType === 'fluent' ? 'Sent an Animated Emoji' : msg.text),
    msg.senderAvatar
  );
}

// ==========================================
// 7. CHUNKED 64KB FILE TRANSFERS
// ==========================================

async function sendFileInChunks(file) {
  if (!STATE.activeChat) {
    showToast('Please create or join a group first!', '⚠️');
    return;
  }
  const transferId = 'transfer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const chatKey = STATE.activeChat.id;

  const fileMeta = {
    transferId,
    name: file.name,
    size: file.size,
    mimeType: file.type || 'application/octet-stream',
    totalChunks,
    senderName: STATE.username,
    senderAvatar: STATE.avatar,
    senderGroupColor: STATE.activeChat.color || '#6C63FF',
    targetType: STATE.activeChat.type,
    targetId: STATE.activeChat.id,
    timestamp: Date.now()
  };

  renderFileTransferRow({ ...fileMeta, direction: 'sending' });

  const startPacket = { type: 'file-start', ...fileMeta };
  if (STATE.activeChat.type === 'dm') {
    const conn = STATE.connections.get(STATE.activeChat.id);
    sendPayload(conn, startPacket);
  } else {
    broadcastPayload(startPacket);
  }

  playSentSound();

  let offset = 0;
  let chunkIndex = 0;

  while (offset < file.size) {
    const slice = file.slice(offset, offset + CHUNK_SIZE);
    const arrayBuffer = await slice.arrayBuffer();

    const chunkPacket = {
      type: 'file-chunk',
      transferId,
      chunkIndex,
      data: arrayBuffer
    };

    if (STATE.activeChat.type === 'dm') {
      const conn = STATE.connections.get(STATE.activeChat.id);
      sendPayload(conn, chunkPacket);
    } else {
      broadcastPayload(chunkPacket);
    }

    offset += CHUNK_SIZE;
    chunkIndex++;

    const fraction = Math.min(1, offset / file.size);
    updateTransferProgress(transferId, fraction, 'sending');

    if (chunkIndex % 4 === 0) {
      await new Promise(r => setTimeout(r, 10));
    }
  }

  const endPacket = { type: 'file-end', transferId };
  if (STATE.activeChat.type === 'dm') {
    const conn = STATE.connections.get(STATE.activeChat.id);
    sendPayload(conn, endPacket);
  } else {
    broadcastPayload(endPacket);
  }

  updateTransferComplete(transferId, 'Sent to teammates', null, file);
  playTransferSound();
  showToast(`Sent ${file.name} (${formatBytes(file.size)})`, '🚀');
}

function handleFileStart(fromPeerId, packet) {
  const { transferId, name, size, mimeType, totalChunks, senderName, senderGroupColor, targetType, targetId } = packet;

  STATE.activeTransfers.set(transferId, {
    name,
    size,
    mimeType,
    totalChunks,
    receivedChunks: new Array(totalChunks),
    receivedBytes: 0,
    senderName,
    senderGroupColor,
    fromPeerId,
    targetType,
    targetId
  });

  const isCurrentChat = (targetType === 'dm' && STATE.activeChat.id === fromPeerId) ||
                       (targetType === 'group' && STATE.activeChat.id === targetId);

  if (isCurrentChat) {
    renderFileTransferRow({
      transferId,
      name,
      size,
      direction: 'receiving',
      senderName,
      senderGroupColor
    });
  }

  playReceivedSound();
}

function handleFileChunk(packet) {
  const { transferId, chunkIndex, data } = packet;
  const transfer = STATE.activeTransfers.get(transferId);
  if (!transfer) return;

  transfer.receivedChunks[chunkIndex] = data;
  transfer.receivedBytes += (data.byteLength || data.length || 0);

  const fraction = Math.min(1, transfer.receivedBytes / transfer.size);
  updateTransferProgress(transferId, fraction, 'receiving');
}

function handleFileEnd(packet) {
  const { transferId } = packet;
  const transfer = STATE.activeTransfers.get(transferId);
  if (!transfer) return;

  const blob = new Blob(transfer.receivedChunks, { type: transfer.mimeType });
  const objectUrl = URL.createObjectURL(blob);

  updateTransferComplete(transferId, 'Ready to Download', objectUrl, { name: transfer.name, size: transfer.size, type: transfer.mimeType });
  STATE.activeTransfers.delete(transferId);

  playTransferSound();
  showToast(`Received ${transfer.name}`, '📦');

  if (transfer.mimeType.startsWith('image/')) {
    renderInlineImagePreview(transferId, objectUrl, transfer.name);
  }
}

function renderFileTransferRow(info) {
  const feed = document.getElementById('chatFeed');
  hideWelcomeIfNeeded();

  const isSelf = info.direction === 'sending';
  const row = document.createElement('div');
  row.className = `message-row ${isSelf ? 'self' : 'peer'}`;
  row.id = `msg_${info.transferId}`;

  const iconGlyph = getFileIconGlyph(info.name);

  row.innerHTML = `
    ${!isSelf ? `
      <div class="message-sender-row">
        <span class="member-group-dot" style="background: ${info.senderGroupColor || '#4ECDC4'}; color: ${info.senderGroupColor || '#4ECDC4'};"></span>
        <span class="message-sender">${escapeHtml(info.senderName)}</span>
      </div>` : ''}
    <div class="file-card" id="card_${info.transferId}">
      <div class="file-card-top">
        <div class="file-icon-box">${iconGlyph}</div>
        <div class="file-meta-col">
          <div class="file-name" title="${escapeHtml(info.name)}">${escapeHtml(info.name)}</div>
          <div class="file-size-status">
            <span>${formatBytes(info.size)}</span>
            <span>•</span>
            <span class="status-label" id="status_${info.transferId}">${isSelf ? 'Sending 0%...' : 'Receiving 0%...'}</span>
          </div>
        </div>
      </div>
      <div class="transfer-progress-track">
        <div class="transfer-progress-fill" id="progress_${info.transferId}" style="width: 0%;"></div>
      </div>
      <div class="file-action-container" id="action_${info.transferId}" style="display: none;"></div>
    </div>
    <div class="message-meta">
      <span>${formatTime(new Date())}</span>
      ${isSelf ? '<span class="delivery-icon">✓</span>' : ''}
    </div>
  `;

  feed.appendChild(row);
  scrollChatToBottom();
  return row;
}

function updateTransferProgress(transferId, fraction, direction) {
  const bar = document.getElementById(`progress_${transferId}`);
  const label = document.getElementById(`status_${transferId}`);
  const pct = Math.floor(fraction * 100);

  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `${direction === 'sending' ? 'Sending' : 'Receiving'} ${pct}%`;
}

function updateTransferComplete(transferId, statusText, objectUrl, fileMeta) {
  const bar = document.getElementById(`progress_${transferId}`);
  const label = document.getElementById(`status_${transferId}`);
  const actionBox = document.getElementById(`action_${transferId}`);

  if (bar) bar.style.width = '100%';
  if (label) {
    label.textContent = statusText;
    label.style.color = 'var(--accent-teal)';
  }

  if (actionBox && objectUrl) {
    actionBox.style.display = 'block';
    actionBox.innerHTML = `
      <a href="${objectUrl}" download="${escapeHtml(fileMeta.name)}" class="file-action-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <span>Download File</span>
      </a>
    `;
  }
}

function renderInlineImagePreview(transferId, objectUrl, filename) {
  const card = document.getElementById(`card_${transferId}`);
  if (!card) return;
  const preview = document.createElement('div');
  preview.className = 'message-gif-card';
  preview.style.marginTop = '8px';
  preview.innerHTML = `<img src="${objectUrl}" alt="${escapeHtml(filename)}" title="Click to view full image">`;
  preview.onclick = () => window.open(objectUrl, '_blank');
  card.appendChild(preview);
  scrollChatToBottom();
}

function getFileIconGlyph(filename) {
  const ext = (filename.split('.').pop() || '').toLowerCase();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
  }
  if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext)) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`;
  }
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
}

// ==========================================
// 8. CHAT MESSAGING (1-on-1 & Groups)
// ==========================================

function sendTextMessage(text, msgType = 'text', mediaUrl = null) {
  if (!text && !mediaUrl) return;
  if (!STATE.activeChat) {
    showToast('Please create or join a group first!', '⚠️');
    return;
  }

  const isDirect = STATE.activeChat.type === 'dm';
  const chatKey = STATE.activeChat.id;
  const messageId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  const payload = {
    type: 'chat-message',
    id: messageId,
    msgType, // 'text' | 'fluent' | 'gif' | 'sticker'
    text: text || '',
    mediaUrl: mediaUrl || '',
    senderName: STATE.username,
    senderAvatar: STATE.avatar,
    senderGroupColor: STATE.activeChat.color || '#6C63FF',
    targetType: STATE.activeChat.type,
    groupId: !isDirect ? STATE.activeChat.id : null,
    targetPeerId: isDirect ? STATE.activeChat.id : null,
    timestamp: Date.now()
  };

  saveChatMessageToHistory(chatKey, payload);

  if (isDirect) {
    const conn = STATE.connections.get(STATE.activeChat.id);
    if (conn) sendPayload(conn, payload);
    if (localMesh) localMesh.postMessage(payload);
  } else {
    broadcastPayload(payload);
  }

  renderChatMessage(payload, true);
  playSentSound();
}

function renderChatMessage(msg, isSelf) {
  const feed = document.getElementById('chatFeed');
  hideWelcomeIfNeeded();

  const row = document.createElement('div');
  row.className = `message-row ${isSelf ? 'self' : 'peer'}`;
  row.id = msg.id;

  let bubbleHtml = '';
  if (msg.msgType === 'fluent') {
    bubbleHtml = `
      <div class="message-sticker-card" style="width: 80px; height: 80px; background: transparent; border: none; box-shadow: none;">
        <img src="${escapeHtml(msg.mediaUrl)}" alt="${escapeHtml(msg.text)}" style="width: 100%; height: 100%; object-fit: contain;">
      </div>`;
  } else if (msg.msgType === 'gif' || msg.msgType === 'sticker') {
    bubbleHtml = `
      <div class="${msg.msgType === 'gif' ? 'message-gif-card' : 'message-sticker-card'}">
        <img src="${escapeHtml(msg.mediaUrl || msg.text)}" alt="Media" loading="lazy">
      </div>`;
  } else {
    bubbleHtml = `<div class="message-bubble">${formatMessageText(msg.text)}</div>`;
  }

  row.innerHTML = `
    ${!isSelf ? `
      <div class="message-sender-row">
        <span class="member-group-dot" style="background: ${msg.senderGroupColor || '#4ECDC4'}; color: ${msg.senderGroupColor || '#4ECDC4'};"></span>
        <span class="message-sender">${escapeHtml(msg.senderName)}</span>
      </div>` : ''}
    ${bubbleHtml}
    <div class="message-meta">
      <span>${formatTime(msg.timestamp)}</span>
      ${isSelf ? '<span class="delivery-icon">✓</span>' : ''}
    </div>
  `;

  feed.appendChild(row);
  scrollChatToBottom();
}

function formatMessageText(text) {
  const escaped = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return escaped.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #FFF; text-decoration: underline;">${url}</a>`);
}

function switchActiveChat(target) {
  if (!target) {
    persistActiveChat(null);
    const titleEl = document.getElementById('chatTitle');
    const pillEl = document.getElementById('chatTypePill');
    const iconEl = document.getElementById('headerChatIcon');
    const subEl = document.getElementById('chatSubtitle');
    const chevron = document.getElementById('headerInfoChevron');

    if (titleEl) titleEl.textContent = 'DeskDrop';
    if (pillEl) {
      pillEl.textContent = 'Ready';
      pillEl.style.background = 'rgba(108, 99, 255, 0.2)';
      pillEl.style.color = 'var(--accent-indigo)';
    }
    if (iconEl) {
      iconEl.textContent = '✦';
      iconEl.style.background = 'var(--grad-accent)';
    }
    if (subEl) subEl.textContent = 'Click + to create or join a group';
    if (chevron) chevron.style.display = 'none';

    const feed = document.getElementById('chatFeed');
    if (feed) {
      feed.innerHTML = `
        <div class="feed-welcome">
          <div class="welcome-icon-box">
            <img src="icons/icon_128x128.png" alt="DeskDrop">
          </div>
          <h2 class="welcome-title">Welcome to DeskDrop</h2>
          <p class="welcome-desc">
            Your decentralized workspace is ready. Click the <b>+</b> button in the sidebar to create your first group or join friends with a room code.
          </p>
          <button class="btn-primary" id="btnFeedCreateGroup" style="padding: 10px 20px; font-size: 13px; margin-top: 10px; cursor: pointer;">+ Create or Join Group</button>
        </div>
      `;
      document.getElementById('btnFeedCreateGroup')?.addEventListener('click', () => {
        document.getElementById('groupModal')?.classList.add('open');
      });
    }

    applyWallpaperStyles();
    return;
  }

  persistActiveChat(target);

  const titleEl = document.getElementById('chatTitle');
  const pillEl = document.getElementById('chatTypePill');
  const iconEl = document.getElementById('headerChatIcon');
  const subEl = document.getElementById('chatSubtitle');

  if (target.type === 'group') {
    if (titleEl) titleEl.textContent = target.name;
    if (pillEl) {
      pillEl.textContent = 'Group';
      pillEl.style.background = `${target.color}25`;
      pillEl.style.color = target.color;
    }
    if (iconEl) {
      iconEl.textContent = target.name.charAt(0);
      iconEl.style.background = target.color;
    }
    if (subEl) subEl.textContent = `Group Channel • ${STATE.connections.size + 1} online in room`;
    const chevron = document.getElementById('headerInfoChevron');
    if (chevron) chevron.style.display = 'inline-block';
  } else {
    const peer = STATE.knownPeers.get(target.id) || { username: target.name, avatar: '' };
    if (titleEl) titleEl.textContent = peer.username;
    if (pillEl) {
      pillEl.textContent = '1-on-1 Direct';
      pillEl.style.background = 'rgba(78, 205, 196, 0.2)';
      pillEl.style.color = 'var(--accent-teal)';
    }
    if (iconEl) {
      iconEl.textContent = peer.username.charAt(0);
      iconEl.style.background = target.color || '#4ECDC4';
    }
    if (subEl) subEl.textContent = 'Direct WebRTC Encrypted Channel';
    const chevron = document.getElementById('headerInfoChevron');
    if (chevron) chevron.style.display = 'none';
  }

  // Update wallpaper if group has its own custom wallpaper
  applyWallpaperStyles();

  const feed = document.getElementById('chatFeed');
  if (feed) {
    feed.innerHTML = '';
    const history = getChatHistory(target.id);
    if (history.length === 0) {
      feed.innerHTML = `
        <div class="feed-welcome">
          <div class="welcome-icon-box" style="background: ${target.color || 'var(--grad-accent)'}">
            <span style="font-size: 24px; font-weight: 800; color: #FFF;">${target.name.charAt(0)}</span>
          </div>
          <h2 class="welcome-title">${escapeHtml(target.name)}</h2>
          <p class="welcome-desc">${target.type === 'group' ? 'This is the start of your group workspace chat.' : 'This is a private 1-on-1 direct channel.'}</p>
        </div>
      `;
    } else {
      history.forEach(msg => {
        const isSelf = msg.senderName === STATE.username;
        renderChatMessage(msg, isSelf);
      });
    }
  }

  updateGroupsUI();
  updatePeersUI();
}

function hideWelcomeIfNeeded() {
  const welcome = document.querySelector('.feed-welcome');
  if (welcome) welcome.style.display = 'none';
}

function scrollChatToBottom() {
  const feed = document.getElementById('chatFeed');
  if (feed) feed.scrollTop = feed.scrollHeight;
}

// ==========================================
// 9. MICROSOFT ANIMATED FLUENT EMOJIS (100% Offline)
// ==========================================

function renderFluentEmojiGrid() {
  const grid = document.getElementById('fluentEmojiGrid');
  if (!grid) return;
  grid.innerHTML = '';

  FLUENT_EMOJIS.forEach(item => {
    const cell = document.createElement('div');
    cell.className = 'fluent-emoji-cell';
    cell.title = item.name;
    cell.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.name)}" loading="lazy">`;
    cell.onclick = () => {
      sendTextMessage(item.name, 'fluent', item.src);
      document.getElementById('emojiDrawer').classList.remove('open');
    };
    grid.appendChild(cell);
  });
}

// Full Unicode Emoji Dictionary Picker
let activeEmojiCategory = 'all';

function renderEmojiGrid(category = 'all', filterQuery = '') {
  const grid = document.getElementById('fullEmojiGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let list = [];
  if (filterQuery && filterQuery.trim()) {
    list = ALL_EMOJIS;
  } else if (category === 'all') {
    list = ALL_EMOJIS;
  } else if (EMOJI_DICTIONARY[category]) {
    list = EMOJI_DICTIONARY[category];
  }

  list.forEach(emoji => {
    const cell = document.createElement('div');
    cell.className = 'emoji-cell';
    cell.textContent = emoji;
    cell.onclick = () => insertEmojiAtCursor(emoji);
    grid.appendChild(cell);
  });
}

function insertEmojiAtCursor(emoji) {
  const chatInput = document.getElementById('chatInput');
  if (!chatInput) return;

  const start = chatInput.selectionStart || 0;
  const end = chatInput.selectionEnd || 0;
  const text = chatInput.value;

  chatInput.value = text.substring(0, start) + emoji + text.substring(end);
  chatInput.focus();
  chatInput.selectionStart = chatInput.selectionEnd = start + emoji.length;
}

// ==========================================
// 10. GIPHY GIF SEARCH (Internet Feature)
// ==========================================

async function fetchGifs(query = '') {
  const grid = document.getElementById('gifGrid');
  if (!grid) return;

  grid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 24px; font-size: 12px; color: var(--accent-teal);">
      <div class="spinner" style="margin: 0 auto 10px auto;"></div>
      Searching GIFs...
    </div>
  `;

  if (!navigator.onLine) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; font-size: 12px; color: var(--text-tertiary);">GIF search requires an active internet connection.</div>`;
    return;
  }

  try {
    const endpoint = query && query.trim()
      ? `https://api.giphy.com/v1/gifs/search?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&q=${encodeURIComponent(query)}&limit=24&rating=g`
      : `https://api.giphy.com/v1/gifs/trending?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&limit=24&rating=g`;

    const res = await fetch(endpoint);
    const data = await res.json();

    if (data && data.data && data.data.length > 0) {
      renderGifResults(data.data.map(item => item.images?.fixed_height?.url || item.images?.downsized?.url));
      return;
    }
  } catch (e) {
    console.debug('Giphy fetch error', e);
  }

  grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; font-size: 12px; color: var(--text-tertiary);">No GIFs found. Try another search!</div>`;
}

function renderGifResults(urls) {
  const grid = document.getElementById('gifGrid');
  if (!grid) return;
  grid.innerHTML = '';

  urls.forEach(url => {
    if (!url) return;
    const cell = document.createElement('div');
    cell.className = 'gif-cell';
    cell.innerHTML = `<img src="${url}" alt="GIF" loading="lazy">`;
    cell.onclick = () => {
      sendTextMessage('', 'gif', url);
      document.getElementById('gifDrawer').classList.remove('open');
    };
    grid.appendChild(cell);
  });
}

// AI Emoji Sticker Generation (Internet Feature)
async function generateAiEmojiSticker(prompt) {
  const previewBox = document.getElementById('aiEmojiPreviewBox');
  const btn = document.getElementById('btnGenerateAiEmoji');
  if (!prompt || !prompt.trim() || !previewBox) return;

  if (!navigator.onLine) {
    showToast('AI sticker generation requires an internet connection', '⚠️');
    return;
  }

  btn.disabled = true;
  previewBox.innerHTML = `
    <div class="spinner"></div>
    <span style="font-size: 11px; color: var(--accent-teal);">Synthesizing 3D emoji sticker...</span>
  `;

  const enhancedPrompt = `${prompt.trim()}, 3d emoji icon sticker, glossy cute emoji, dark transparent background, clean vector render`;
  const seed = Math.floor(Math.random() * 999999);
  const stickerUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=256&height=256&nologo=true&seed=${seed}`;

  const img = new Image();
  img.src = stickerUrl;
  img.onload = () => {
    btn.disabled = false;
    previewBox.innerHTML = `
      <img src="${stickerUrl}" alt="Sticker" style="width: 100px; height: 100px; object-fit: contain;">
      <button class="btn-primary" id="btnSendAiEmoji" style="padding: 6px 14px; font-size: 11px;">Send to Chat</button>
    `;
    document.getElementById('btnSendAiEmoji').onclick = () => {
      sendTextMessage('', 'sticker', stickerUrl);
      document.getElementById('emojiDrawer').classList.remove('open');
    };
  };
  img.onerror = () => {
    btn.disabled = false;
    previewBox.innerHTML = `<span style="font-size: 11px; color: var(--accent-coral);">Could not generate. Try another prompt!</span>`;
  };
}

// ==========================================
// 11. AI AVATAR GENERATOR (Internet Feature)
// ==========================================

let selectedAvatarCandidateUrl = null;

async function generateAIAvatars(prompt) {
  const grid = document.getElementById('avatarGrid');
  const btnGen = document.getElementById('btnGenerateAvatar');
  const applyBtn = document.getElementById('btnApplyAvatar');

  if (!prompt || !prompt.trim() || !grid) return;

  if (!navigator.onLine) {
    showToast('AI Avatar generation requires an internet connection', '⚠️');
    return;
  }

  btnGen.disabled = true;
  applyBtn.disabled = true;
  selectedAvatarCandidateUrl = null;

  grid.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = document.createElement('div');
    card.className = 'avatar-choice';
    card.id = `avatarCandidateCard_${i}`;
    card.innerHTML = `
      <div class="avatar-card-skeleton">
        <div class="spinner"></div>
      </div>
      <div class="avatar-choice-check">✓</div>
    `;
    grid.appendChild(card);
  }

  const enhancedPrompt = `${prompt.trim()}, 3d cartoon character avatar portrait, colorful vibrant lighting, high quality render`;
  const baseSeed = Math.floor(Math.random() * 900000);

  for (let i = 0; i < 3; i++) {
    const seed = baseSeed + i * 277 + Math.floor(Math.random() * 50);
    const candidateUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=512&height=512&nologo=true&seed=${seed}`;

    const img = new Image();
    img.src = candidateUrl;
    img.onload = () => {
      const card = document.getElementById(`avatarCandidateCard_${i}`);
      if (card) {
        card.innerHTML = `
          <img src="${candidateUrl}" alt="Avatar candidate ${i + 1}">
          <div class="avatar-choice-check">✓</div>
        `;
        card.onclick = () => {
          document.querySelectorAll('.avatar-choice').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          selectedAvatarCandidateUrl = candidateUrl;
          applyBtn.disabled = false;
        };
      }
    };
    img.onerror = () => {
      const card = document.getElementById(`avatarCandidateCard_${i}`);
      if (card) card.innerHTML = `<span style="font-size: 11px; color: var(--accent-coral);">Retry</span>`;
    };
  }

  btnGen.disabled = false;
}

function saveAndBroadcastAvatar(avatarUrl) {
  STATE.avatar = avatarUrl;
  localStorage.setItem('deskdrop_avatar', avatarUrl);
  updateLocalProfileUI();

  const primaryGroup = STATE.groups[0] || { name: 'Workspace', color: '#6C63FF' };
  broadcastPayload({
    type: 'profile-update',
    username: STATE.username,
    avatar: STATE.avatar,
    groupName: primaryGroup.name,
    groupColor: primaryGroup.color
  });

  showToast('Profile avatar updated!', '✨');
}

// ==========================================
// 12. WALLPAPER & APPEARANCE CONTROLS
// ==========================================

function applyWallpaperStyles() {
  document.documentElement.style.setProperty('--wallpaper-opacity', STATE.wallpaperOpacity);
  document.documentElement.style.setProperty('--wallpaper-blur', `${STATE.wallpaperBlur}px`);

  const globalLayer = document.getElementById('globalWallpaperLayer');
  const previewImg = document.getElementById('wallpaperPreviewImg');
  const previewTint = document.getElementById('wallpaperPreviewTint');

  // Determine active wallpaper: Check if active chat has a group-specific wallpaper
  let activeWallpaper = STATE.wallpaper;
  if (STATE.activeChat && STATE.activeChat.type === 'group') {
    const groupCustomWp = localStorage.getItem('deskdrop_wallpaper_group_' + STATE.activeChat.id);
    if (groupCustomWp) {
      activeWallpaper = groupCustomWp;
    }
  }

  if (activeWallpaper) {
    if (globalLayer) globalLayer.style.backgroundImage = `url(${activeWallpaper})`;
  } else {
    if (globalLayer) globalLayer.style.backgroundImage = 'none';
  }

  if (previewImg) {
    previewImg.style.backgroundImage = STATE.wallpaper ? `url(${STATE.wallpaper})` : 'none';
  }
  if (previewTint) {
    previewTint.style.backgroundColor = `rgba(15, 12, 41, ${STATE.wallpaperOpacity})`;
  }
}

// ==========================================
// 13. UI SYNCHRONIZATION
// ==========================================

function updateLocalProfileUI() {
  const nameEl = document.getElementById('myUsernameDisplay');
  const imgEl = document.getElementById('myAvatarImg');
  const placeholderEl = document.getElementById('myAvatarPlaceholder');

  const sheetNameEl = document.getElementById('sheetUsernameDisplay');
  const sheetHandleEl = document.getElementById('sheetUserHandle');
  const sheetImgEl = document.getElementById('sheetAvatarImg');
  const sheetPlaceholderEl = document.getElementById('sheetAvatarPlaceholder');
  const sheetItemNameEl = document.getElementById('sheetItemCurrentName');
  const inputEl = document.getElementById('settingsUsernameInput');
  const roomSubEl = document.getElementById('sheetRoomCodeSub');

  if (nameEl) nameEl.textContent = STATE.username;
  if (sheetNameEl) sheetNameEl.textContent = STATE.username;
  if (sheetHandleEl) sheetHandleEl.textContent = `@${STATE.username.toLowerCase().replace(/[^a-z0-9]/g, '')} • ${navigator.onLine ? 'Online' : 'Offline'}`;
  if (sheetItemNameEl) sheetItemNameEl.textContent = STATE.username;
  if (inputEl) inputEl.value = STATE.username;
  if (roomSubEl) roomSubEl.textContent = `Active Room: ${STATE.roomCode}`;

  if (STATE.avatar) {
    if (imgEl) { imgEl.src = STATE.avatar; imgEl.style.display = 'block'; }
    if (placeholderEl) placeholderEl.style.display = 'none';
    if (sheetImgEl) { sheetImgEl.src = STATE.avatar; sheetImgEl.style.display = 'block'; }
    if (sheetPlaceholderEl) sheetPlaceholderEl.style.display = 'none';
  } else {
    if (imgEl) imgEl.style.display = 'none';
    if (placeholderEl) {
      placeholderEl.style.display = 'flex';
      placeholderEl.textContent = STATE.username.substring(0, 2).toUpperCase();
    }
    if (sheetImgEl) sheetImgEl.style.display = 'none';
    if (sheetPlaceholderEl) {
      sheetPlaceholderEl.style.display = 'flex';
      sheetPlaceholderEl.textContent = STATE.username.substring(0, 2).toUpperCase();
    }
  }
}

function updateGroupsUI() {
  const container = document.getElementById('groupsListContainer');
  const badge = document.getElementById('groupsCountBadge');
  if (!container) return;

  if (badge) badge.textContent = `${STATE.groups.length} active`;
  container.innerHTML = '';

  if (STATE.groups.length === 0) {
    container.innerHTML = `
      <div class="empty-state-notice" style="padding: 16px 12px; font-size: 11px;">
        No groups joined yet.<br>Click <b style="color: var(--accent-teal);">+</b> above to start or join one!
      </div>
    `;
    return;
  }

  STATE.groups.forEach(group => {
    const isActive = STATE.activeChat && STATE.activeChat.type === 'group' && STATE.activeChat.id === group.id;
    const item = document.createElement('div');
    item.className = `group-nav-item ${isActive ? 'active' : ''}`;
    item.innerHTML = `
      <div class="group-color-icon" style="background: ${group.color};">
        ${group.name.charAt(0)}
      </div>
      <div class="group-item-info">
        <div class="group-name" style="color: ${group.color};">${escapeHtml(group.name)}</div>
        <div class="group-sub">Workspace Channel</div>
      </div>
    `;

    item.onclick = () => {
      switchActiveChat({ type: 'group', id: group.id, name: group.name, color: group.color });
    };

    container.appendChild(item);
  });
}

function updatePeersUI() {
  const container = document.getElementById('peersListContainer');
  const badge = document.getElementById('peersCountBadge');
  const notice = document.getElementById('emptyPeersNotice');
  if (!container) return;

  const count = STATE.connections.size;
  if (badge) badge.textContent = `${count} active`;

  if (count === 0) {
    if (notice) notice.style.display = 'block';
    Array.from(container.children).forEach(ch => {
      if (ch !== notice) ch.remove();
    });
    return;
  }

  if (notice) notice.style.display = 'none';
  Array.from(container.children).forEach(ch => {
    if (ch !== notice) ch.remove();
  });

  STATE.connections.forEach((conn, peerId) => {
    const peer = STATE.knownPeers.get(peerId) || {
      username: 'Teammate',
      avatar: '',
      groupColor: '#6C63FF',
      groupName: 'Main Workspace'
    };

    const isActive = STATE.activeChat && STATE.activeChat.type === 'dm' && STATE.activeChat.id === peerId;
    const item = document.createElement('div');
    item.className = `peer-nav-item ${isActive ? 'active' : ''}`;
    item.innerHTML = `
      <div class="peer-avatar-wrapper">
        ${peer.avatar
          ? `<img src="${escapeHtml(peer.avatar)}" class="peer-avatar" alt="Peer">`
          : `<div class="peer-avatar">${escapeHtml(peer.username.substring(0, 2).toUpperCase())}</div>`
        }
        <span class="peer-status-dot"></span>
      </div>
      <div class="peer-details">
        <div class="peer-name-row">
          <span class="member-group-dot" style="background: ${peer.groupColor}; color: ${peer.groupColor};" title="Group: ${escapeHtml(peer.groupName)}"></span>
          <span class="peer-name">${escapeHtml(peer.username)}</span>
        </div>
        <div class="peer-meta">
          <span>1-on-1 P2P</span>
          ${peer.isTyping ? `
            <span class="typing-indicator-inline">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </span>` : ''}
        </div>
      </div>
    `;

    item.onclick = () => {
      switchActiveChat({ type: 'dm', id: peerId, name: peer.username, color: peer.groupColor });
    };

    container.appendChild(item);
  });
}

// ==========================================
// 14. EVENT HANDLERS & MODAL MANAGEMENT
// ==========================================

function setupEventHandlers() {
  // Offline & Online detection
  window.addEventListener('online', () => {
    showToast('Internet reconnected • WebRTC Active', '🌐');
    updateLocalProfileUI();
  });
  window.addEventListener('offline', () => {
    showToast('Offline Mode: Local Mesh Active', '📡');
    updateLocalProfileUI();
  });

  // Notifications prompt
  const notifBtn = document.getElementById('btnEnableNotifications');
  if (typeof Notification !== 'undefined') {
    if (Notification.permission === 'default' && notifBtn) {
      notifBtn.style.display = 'flex';
      notifBtn.onclick = () => {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            notifBtn.style.display = 'none';
            showToast('Desktop notifications enabled!', '🔔');
          }
        });
      };
    }
  }

  // Profile Card -> Open Reference-styled Profile Settings Sheet
  const profileModal = document.getElementById('profileModal');
  document.getElementById('profileCardClickArea')?.addEventListener('click', () => {
    updateLocalProfileUI();
    profileModal.classList.add('open');
  });
  document.getElementById('btnCloseProfileModal')?.addEventListener('click', () => {
    profileModal.classList.remove('open');
  });

  const setupAccordion = (itemHeaderId, expandBoxId) => {
    const header = document.querySelector(`#${itemHeaderId} .sheet-item-header`);
    const box = document.getElementById(expandBoxId);
    const parent = document.getElementById(itemHeaderId);
    header?.addEventListener('click', () => {
      const isVisible = box.style.display === 'block';
      box.style.display = isVisible ? 'none' : 'block';
      if (isVisible) {
        parent.classList.remove('expanded');
      } else {
        parent.classList.add('expanded');
      }
    });
  };

  setupAccordion('itemEditName', 'expandNameBox');
  setupAccordion('itemAvatarActions', 'expandAvatarBox');
  setupAccordion('itemWallpaperActions', 'expandWallpaperBox');
  setupAccordion('itemRoomActions', 'expandRoomBox');

  document.getElementById('btnSheetChangeAvatar')?.addEventListener('click', () => {
    document.getElementById('expandAvatarBox').style.display = 'block';
    document.getElementById('itemAvatarActions').classList.add('expanded');
  });

  document.getElementById('btnSaveUsername')?.addEventListener('click', () => {
    const val = document.getElementById('settingsUsernameInput').value.trim();
    if (val) {
      STATE.username = val;
      localStorage.setItem('deskdrop_username', val);
      updateLocalProfileUI();
      const primaryGroup = STATE.groups[0] || { name: 'Workspace', color: '#6C63FF' };
      broadcastPayload({
        type: 'profile-update',
        username: STATE.username,
        avatar: STATE.avatar,
        groupName: primaryGroup.name,
        groupColor: primaryGroup.color
      });
      showToast('Display name updated!', '👤');
    }
  });

  const avatarFileInput = document.getElementById('customAvatarFileInput');
  document.getElementById('btnUploadCustomAvatar')?.addEventListener('click', () => avatarFileInput.click());
  avatarFileInput?.addEventListener('change', () => {
    if (avatarFileInput.files && avatarFileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => saveAndBroadcastAvatar(e.target.result);
      reader.readAsDataURL(avatarFileInput.files[0]);
    }
  });

  const avatarModal = document.getElementById('avatarModal');
  document.getElementById('btnOpenAiAvatarFromSettings')?.addEventListener('click', () => {
    profileModal.classList.remove('open');
    avatarModal.classList.add('open');
  });
  document.getElementById('btnCloseAvatarModal')?.addEventListener('click', () => avatarModal.classList.remove('open'));
  document.getElementById('btnCancelAvatar')?.addEventListener('click', () => avatarModal.classList.remove('open'));

  document.getElementById('btnGenerateAvatar')?.addEventListener('click', () => {
    const input = document.getElementById('avatarPromptInput');
    generateAIAvatars(input.value);
  });

  document.querySelectorAll('[data-avatar-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-avatar-prompt');
      document.getElementById('avatarPromptInput').value = p;
      generateAIAvatars(p);
    });
  });

  document.getElementById('btnApplyAvatar')?.addEventListener('click', () => {
    if (selectedAvatarCandidateUrl) {
      saveAndBroadcastAvatar(selectedAvatarCandidateUrl);
      avatarModal.classList.remove('open');
    }
  });

  const wallpaperFileInput = document.getElementById('wallpaperFileInput');
  document.getElementById('btnChooseWallpaper')?.addEventListener('click', () => wallpaperFileInput.click());

  wallpaperFileInput?.addEventListener('change', () => {
    if (wallpaperFileInput.files && wallpaperFileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        STATE.wallpaper = e.target.result;
        localStorage.setItem('deskdrop_wallpaper', STATE.wallpaper);
        applyWallpaperStyles();
        showToast('Wallpaper updated!', '🎨');
      };
      reader.readAsDataURL(wallpaperFileInput.files[0]);
    }
  });

  document.getElementById('btnResetWallpaper')?.addEventListener('click', () => {
    STATE.wallpaper = '';
    localStorage.removeItem('deskdrop_wallpaper');
    applyWallpaperStyles();
    showToast('Wallpaper reset to default', '🔄');
  });

  const sliderOpacity = document.getElementById('sliderWallpaperOpacity');
  const sliderBlur = document.getElementById('sliderWallpaperBlur');
  const labelOpacity = document.getElementById('labelOpacityVal');
  const labelBlur = document.getElementById('labelBlurVal');

  sliderOpacity?.addEventListener('input', (e) => {
    STATE.wallpaperOpacity = e.target.value;
    localStorage.setItem('deskdrop_wallpaper_opacity', STATE.wallpaperOpacity);
    if (labelOpacity) labelOpacity.textContent = `${Math.round(STATE.wallpaperOpacity * 100)}% Dark`;
    applyWallpaperStyles();
  });

  sliderBlur?.addEventListener('input', (e) => {
    STATE.wallpaperBlur = e.target.value;
    localStorage.setItem('deskdrop_wallpaper_blur', STATE.wallpaperBlur);
    if (labelBlur) labelBlur.textContent = `${STATE.wallpaperBlur}px`;
    applyWallpaperStyles();
  });

  document.getElementById('btnSettingsCopyRoom')?.addEventListener('click', () => {
    const link = `${window.location.origin}${window.location.pathname}?room=${STATE.roomCode}`;
    navigator.clipboard.writeText(link).then(() => showToast(`Room link copied (${STATE.roomCode})`, '📋'));
  });

  document.getElementById('btnSettingsNewRoom')?.addEventListener('click', () => {
    const newCode = generateRoomCode();
    document.getElementById('sheetRoomCodeSub').textContent = `Active Room: ${newCode}`;
    initPeerSession(newCode, 0);
  });

  setupAccordion('itemCreatorInfo', 'expandCreatorBox');

  // Creator Details & Social Links
  const savedGithub = localStorage.getItem('deskdrop_creator_github') || 'anshi-zyonz';
  const savedInstagram = localStorage.getItem('deskdrop_creator_instagram') || 'anshi_zyonz';

  function updateCreatorLinks(github, instagram) {
    const linkGh = document.getElementById('linkCreatorGithub');
    const dispGh = document.getElementById('displayCreatorGithub');
    const linkIg = document.getElementById('linkCreatorInstagram');
    const dispIg = document.getElementById('displayCreatorInstagram');

    if (linkGh) linkGh.href = `https://github.com/${github}`;
    if (dispGh) dispGh.textContent = `@${github}`;
    if (linkIg) linkIg.href = `https://www.instagram.com/${instagram}/`;
    if (dispIg) dispIg.textContent = `@${instagram}`;
  }

  updateCreatorLinks(savedGithub, savedInstagram);

  const btnToggleSocials = document.getElementById('btnToggleEditSocials');
  const boxEditSocials = document.getElementById('boxEditSocials');
  btnToggleSocials?.addEventListener('click', () => {
    const isShowing = boxEditSocials.style.display === 'flex';
    boxEditSocials.style.display = isShowing ? 'none' : 'flex';
  });

  document.getElementById('btnSaveCreatorSocials')?.addEventListener('click', () => {
    const ghVal = document.getElementById('inputEditGithub').value.trim() || 'anshi-zyonz';
    const igVal = document.getElementById('inputEditInstagram').value.trim() || 'anshi.zyonz';
    localStorage.setItem('deskdrop_creator_github', ghVal);
    localStorage.setItem('deskdrop_creator_instagram', igVal);
    updateCreatorLinks(ghVal, igVal);
    if (boxEditSocials) boxEditSocials.style.display = 'none';
    showToast('Creator handles saved!', '✅');
  });

  // Group Create/Join Modal
  const groupModal = document.getElementById('groupModal');
  document.getElementById('btnOpenGroupModal')?.addEventListener('click', () => groupModal.classList.add('open'));
  document.getElementById('btnCloseGroupModal')?.addEventListener('click', () => groupModal.classList.remove('open'));

  const swatchesContainer = document.getElementById('groupColorSwatches');
  let selectedGroupColor = GROUP_ACCENT_COLORS[0].hex;
  if (swatchesContainer) {
    GROUP_ACCENT_COLORS.forEach((c, idx) => {
      const sw = document.createElement('button');
      sw.className = `swatch-btn ${idx === 0 ? 'selected' : ''}`;
      sw.style.backgroundColor = c.hex;
      sw.onclick = () => {
        document.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('selected'));
        sw.classList.add('selected');
        selectedGroupColor = c.hex;
      };
      swatchesContainer.appendChild(sw);
    });
  }

  const tabCreate = document.getElementById('tabCreateGroup');
  const tabJoin = document.getElementById('tabJoinGroup');
  const createContent = document.getElementById('createGroupTabContent');
  const joinContent = document.getElementById('joinGroupTabContent');

  tabCreate?.addEventListener('click', () => {
    tabCreate.classList.add('active');
    tabJoin.classList.remove('active');
    createContent.style.display = 'flex';
    joinContent.style.display = 'none';
  });

  tabJoin?.addEventListener('click', () => {
    tabJoin.classList.add('active');
    tabCreate.classList.remove('active');
    joinContent.style.display = 'flex';
    createContent.style.display = 'none';
  });

  document.getElementById('btnSubmitCreateGroup')?.addEventListener('click', () => {
    const nameInput = document.getElementById('inputNewGroupName');
    const groupName = nameInput.value.trim();
    if (groupName) {
      const newGroup = {
        id: 'group_' + Date.now(),
        name: groupName,
        color: selectedGroupColor
      };
      STATE.groups.push(newGroup);
      persistGroups();
      updateGroupsUI();
      switchActiveChat({ type: 'group', id: newGroup.id, name: newGroup.name, color: newGroup.color });
      nameInput.value = '';
      groupModal.classList.remove('open');
      showToast(`Group "${groupName}" created!`, '🎉');
    }
  });

  document.getElementById('btnSubmitJoinGroup')?.addEventListener('click', () => {
    const codeInput = document.getElementById('inputJoinGroupCode');
    const code = sanitizeRoomCode(codeInput.value);
    if (code) {
      initPeerSession(code, 0);
      codeInput.value = '';
      groupModal.classList.remove('open');
      showToast(`Joining room ${code}...`, '⚡️');
    }
  });

  // WhatsApp-Style Group Info Sheet & Group Wallpaper
  const groupInfoModal = document.getElementById('groupInfoModal');
  const groupWpInput = document.getElementById('groupWallpaperFileInput');

  function openGroupInfoModal() {
    if (!groupInfoModal) return;
    const currentGroup = STATE.activeChat;
    if (!currentGroup || currentGroup.type !== 'group') return;

    const titleEl = document.getElementById('groupInfoTitle');
    const subEl = document.getElementById('groupInfoSub');
    const iconBox = document.getElementById('groupInfoIconBox');
    const iconLetter = document.getElementById('groupInfoIconLetter');
    const countEl = document.getElementById('groupInfoMembersCount');
    const membersList = document.getElementById('groupMembersList');
    const wpStatus = document.getElementById('groupWallpaperStatusText');

    if (titleEl) titleEl.textContent = currentGroup.name;
    if (iconLetter) iconLetter.textContent = currentGroup.name.charAt(0);
    if (iconBox) iconBox.style.background = currentGroup.color || 'var(--accent-indigo)';

    const totalMembers = STATE.connections.size + 1;
    if (subEl) subEl.textContent = `Group Channel • ${totalMembers} member${totalMembers > 1 ? 's' : ''}`;
    if (countEl) countEl.textContent = `${totalMembers} connected`;

    const customGroupWp = localStorage.getItem('deskdrop_wallpaper_group_' + currentGroup.id);
    if (wpStatus) {
      wpStatus.textContent = customGroupWp 
        ? 'Custom wallpaper is active for this group' 
        : 'Set a distinct theme background only for this group';
    }

    if (membersList) {
      membersList.innerHTML = '';

      // 1. Current User (Host)
      const selfItem = document.createElement('div');
      selfItem.className = 'group-member-item';
      selfItem.innerHTML = `
        <div class="group-member-avatar-box">
          ${STATE.avatar ? `<img src="${STATE.avatar}" class="group-member-avatar-img" alt="${escapeHtml(STATE.username)}">` : `<span>${escapeHtml(STATE.username.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="group-member-text-col">
          <div class="group-member-name-row">
            <span class="group-member-name">${escapeHtml(STATE.username)} (You)</span>
            <span class="group-member-role-badge">Host</span>
          </div>
          <div class="group-member-status">
            <span class="status-dot"></span>
            <span>Online</span>
          </div>
        </div>
      `;
      membersList.appendChild(selfItem);

      // 2. Connected Peers
      for (const [peerId, conn] of STATE.connections.entries()) {
        const peer = STATE.knownPeers.get(peerId) || { username: 'Teammate', avatar: '' };
        const peerItem = document.createElement('div');
        peerItem.className = 'group-member-item';
        peerItem.innerHTML = `
          <div class="group-member-avatar-box">
            ${peer.avatar ? `<img src="${peer.avatar}" class="group-member-avatar-img" alt="${escapeHtml(peer.username)}">` : `<span>${escapeHtml(peer.username.charAt(0).toUpperCase())}</span>`}
          </div>
          <div class="group-member-text-col">
            <div class="group-member-name-row">
              <span class="group-member-name">${escapeHtml(peer.username)}</span>
              <span class="group-member-role-badge" style="background: rgba(108, 99, 255, 0.15); color: var(--accent-indigo);">Member</span>
            </div>
            <div class="group-member-status">
              <span class="status-dot"></span>
              <span>Online</span>
            </div>
          </div>
        `;
        membersList.appendChild(peerItem);
      }
    }

    groupInfoModal.classList.add('open');
  }

  document.getElementById('chatHeaderClickArea')?.addEventListener('click', () => {
    if (STATE.activeChat && STATE.activeChat.type === 'group') {
      openGroupInfoModal();
    } else {
      showToast(`1-on-1 Direct Channel with ${STATE.activeChat?.name || 'peer'}`, '💬');
    }
  });

  document.getElementById('btnCloseGroupInfoModal')?.addEventListener('click', () => {
    groupInfoModal?.classList.remove('open');
  });

  groupInfoModal?.addEventListener('click', (e) => {
    if (e.target === groupInfoModal) {
      groupInfoModal.classList.remove('open');
    }
  });

  document.getElementById('btnChooseGroupWallpaper')?.addEventListener('click', () => {
    groupWpInput?.click();
  });

  groupWpInput?.addEventListener('change', () => {
    if (groupWpInput.files && groupWpInput.files[0] && STATE.activeChat && STATE.activeChat.type === 'group') {
      const reader = new FileReader();
      const currentGroupId = STATE.activeChat.id;
      const currentGroupName = STATE.activeChat.name;
      reader.onload = (e) => {
        localStorage.setItem('deskdrop_wallpaper_group_' + currentGroupId, e.target.result);
        applyWallpaperStyles();
        const wpStatus = document.getElementById('groupWallpaperStatusText');
        if (wpStatus) wpStatus.textContent = 'Custom wallpaper is active for this group';
        showToast(`Wallpaper applied to "${currentGroupName}"!`, '🎨');
      };
      reader.readAsDataURL(groupWpInput.files[0]);
    }
  });

  document.getElementById('btnResetGroupWallpaper')?.addEventListener('click', () => {
    if (STATE.activeChat && STATE.activeChat.type === 'group') {
      localStorage.removeItem('deskdrop_wallpaper_group_' + STATE.activeChat.id);
      applyWallpaperStyles();
      const wpStatus = document.getElementById('groupWallpaperStatusText');
      if (wpStatus) wpStatus.textContent = 'Set a distinct theme background only for this group';
      showToast(`Group wallpaper reset to default`, '🔄');
    }
  });

  // Emojis Drawer Tabs
  const emojiDrawer = document.getElementById('emojiDrawer');
  const btnToggleEmoji = document.getElementById('btnToggleEmoji');
  btnToggleEmoji?.addEventListener('click', (e) => {
    e.stopPropagation();
    gifDrawer.classList.remove('open');
    emojiDrawer.classList.toggle('open');
    if (emojiDrawer.classList.contains('open')) {
      renderFluentEmojiGrid();
    }
  });

  document.getElementById('btnCloseEmojiDrawer')?.addEventListener('click', () => emojiDrawer.classList.remove('open'));

  const tabEmojiFluent = document.getElementById('tabEmojiFluent');
  const tabEmojiStd = document.getElementById('tabEmojiStandard');
  const tabEmojiAi = document.getElementById('tabEmojiAi');

  const contentEmojiFluent = document.getElementById('emojiTabFluentContent');
  const contentEmojiStd = document.getElementById('emojiTabStandardContent');
  const contentEmojiAi = document.getElementById('emojiTabAiContent');

  tabEmojiFluent?.addEventListener('click', () => {
    tabEmojiFluent.classList.add('active');
    tabEmojiStd.classList.remove('active');
    tabEmojiAi.classList.remove('active');
    contentEmojiFluent.style.display = 'block';
    contentEmojiStd.style.display = 'none';
    contentEmojiAi.style.display = 'none';
    renderFluentEmojiGrid();
  });

  tabEmojiStd?.addEventListener('click', () => {
    tabEmojiStd.classList.add('active');
    tabEmojiFluent.classList.remove('active');
    tabEmojiAi.classList.remove('active');
    contentEmojiStd.style.display = 'flex';
    contentEmojiFluent.style.display = 'none';
    contentEmojiAi.style.display = 'none';
    renderEmojiGrid(activeEmojiCategory);
  });

  tabEmojiAi?.addEventListener('click', () => {
    tabEmojiAi.classList.add('active');
    tabEmojiFluent.classList.remove('active');
    tabEmojiStd.classList.remove('active');
    contentEmojiAi.style.display = 'flex';
    contentEmojiFluent.style.display = 'none';
    contentEmojiStd.style.display = 'none';
  });

  // Category Pills for Unicode Emojis
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeEmojiCategory = btn.getAttribute('data-cat');
      renderEmojiGrid(activeEmojiCategory, document.getElementById('inputEmojiSearch')?.value);
    });
  });

  document.getElementById('inputEmojiSearch')?.addEventListener('input', (e) => {
    renderEmojiGrid(activeEmojiCategory, e.target.value);
  });

  document.getElementById('btnGenerateAiEmoji')?.addEventListener('click', () => {
    const p = document.getElementById('inputAiEmojiPrompt').value;
    generateAiEmojiSticker(p);
  });

  // GIF Drawer
  const gifDrawer = document.getElementById('gifDrawer');
  const btnToggleGif = document.getElementById('btnToggleGif');
  btnToggleGif?.addEventListener('click', (e) => {
    e.stopPropagation();
    emojiDrawer.classList.remove('open');
    gifDrawer.classList.toggle('open');
    if (gifDrawer.classList.contains('open')) {
      fetchGifs('');
    }
  });

  document.getElementById('btnCloseGifDrawer')?.addEventListener('click', () => gifDrawer.classList.remove('open'));

  let gifSearchDebounce = null;
  document.getElementById('inputGifSearch')?.addEventListener('input', (e) => {
    clearTimeout(gifSearchDebounce);
    gifSearchDebounce = setTimeout(() => fetchGifs(e.target.value), 400);
  });

  document.addEventListener('click', (e) => {
    if (!emojiDrawer.contains(e.target) && e.target !== btnToggleEmoji) emojiDrawer.classList.remove('open');
    if (!gifDrawer.contains(e.target) && e.target !== btnToggleGif) gifDrawer.classList.remove('open');
  });

  // Message Send Handlers
  const chatInput = document.getElementById('chatInput');
  const btnSend = document.getElementById('btnSend');

  const handleSend = () => {
    const text = chatInput.value;
    if (text.trim()) {
      sendTextMessage(text.trim(), 'text');
      chatInput.value = '';
      chatInput.style.height = 'auto';

      broadcastPayload({ type: 'typing', isTyping: false });
      STATE.isTyping = false;
    }
  };

  btnSend?.addEventListener('click', handleSend);

  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  chatInput?.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 120)}px`;

    if (!STATE.isTyping) {
      STATE.isTyping = true;
      broadcastPayload({ type: 'typing', isTyping: true });
    }
    clearTimeout(STATE.typingTimeout);
    STATE.typingTimeout = setTimeout(() => {
      STATE.isTyping = false;
      broadcastPayload({ type: 'typing', isTyping: false });
    }, 1500);
  });

  // File Attachments
  const fileInput = document.getElementById('fileInput');
  document.getElementById('btnAttach')?.addEventListener('click', () => fileInput.click());
  fileInput?.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      Array.from(fileInput.files).forEach(f => sendFileInChunks(f));
      fileInput.value = '';
    }
  });

  // Drag & drop
  const dropOverlay = document.getElementById('dropOverlay');
  ['dragenter', 'dragover'].forEach(name => {
    window.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropOverlay.classList.add('active');
    });
  });

  ['dragleave', 'dragend'].forEach(name => {
    dropOverlay.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropOverlay.classList.remove('active');
    });
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropOverlay.classList.remove('active');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(f => sendFileInChunks(f));
    }
  });
}

// ==========================================
// 15. FIRST-TIME USER ONBOARDING WIZARD
// ==========================================

let deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  const btnTxt = document.getElementById('txtInstallButton');
  if (btnTxt) btnTxt.textContent = '⬇️ Install DeskDrop App';
});

function initOnboardingWizard() {
  const modal = document.getElementById('onboardingModal');
  if (!modal) return;

  const isCompleted = localStorage.getItem('deskdrop_onboarding_completed') === 'true';
  if (isCompleted) {
    modal.style.display = 'none';
    return;
  }

  modal.style.display = 'flex';

  const step1 = document.getElementById('onboardingStep1');
  const step2 = document.getElementById('onboardingStep2');
  const step3 = document.getElementById('onboardingStep3');
  const step4 = document.getElementById('onboardingStep4');
  const step5 = document.getElementById('onboardingStep5');

  const progressFill = document.getElementById('onboardingProgressFill');
  const stepBadge = document.getElementById('onboardingStepBadge');
  const nameInput = document.getElementById('onboardingNameInput');

  if (nameInput) {
    nameInput.value = STATE.username.startsWith('Mac_') ? '' : STATE.username;
    setTimeout(() => nameInput.focus(), 300);
  }

  function goToStep(step) {
    const steps = [step1, step2, step3, step4, step5];
    steps.forEach((s, idx) => {
      if (s) s.style.display = (idx + 1 === step) ? 'flex' : 'none';
    });

    if (progressFill) progressFill.style.width = `${step * 20}%`;
    if (stepBadge) stepBadge.textContent = `Step ${step} of 5`;

    if (step === 1) {
      nameInput?.focus();
    } else if (step === 2) {
      updateOnboardingAvatarPreview();
    } else if (step === 3) {
      // Check if notification already granted
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        const notifStatus = document.getElementById('onboardingNotifStatus');
        const notifBtnTxt = document.getElementById('txtOnboardingNotifBtn');
        const btnNext3 = document.getElementById('btnOnboardingNext3');
        if (notifBtnTxt) notifBtnTxt.textContent = '✅ Notifications Allowed';
        if (notifStatus) notifStatus.innerHTML = '<span style="color: var(--accent-mint); font-weight: 600;">✅ Notifications already enabled!</span>';
        if (btnNext3) { btnNext3.disabled = false; btnNext3.style.opacity = '1'; }
      }
    } else if (step === 4) {
      initOnboardingSwatches();
    } else if (step === 5) {
      // Step 5: WebApp Download & Install
    }
  }

  function updateOnboardingAvatarPreview() {
    const img = document.getElementById('onboardingAvatarImg');
    const letter = document.getElementById('onboardingAvatarLetter');
    if (STATE.avatar) {
      if (img) { img.src = STATE.avatar; img.style.display = 'block'; }
      if (letter) letter.style.display = 'none';
    } else {
      if (img) img.style.display = 'none';
      if (letter) {
        letter.style.display = 'block';
        letter.textContent = STATE.username.substring(0, 2).toUpperCase();
      }
    }
  }

  // Step 1: Name
  document.getElementById('btnOnboardingNext1')?.addEventListener('click', () => {
    const entered = nameInput?.value.trim();
    if (entered) {
      STATE.username = entered;
      localStorage.setItem('deskdrop_username', entered);
      updateLocalProfileUI();
    }
    goToStep(2);
  });

  document.getElementById('btnOnboardingSkip1')?.addEventListener('click', () => {
    goToStep(2);
  });

  nameInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btnOnboardingNext1')?.click();
    }
  });

  // Step 2: Photo / AI Avatar
  const photoInput = document.getElementById('onboardingPhotoInput');
  document.getElementById('btnOnboardingUpload')?.addEventListener('click', () => {
    photoInput?.click();
  });

  photoInput?.addEventListener('change', () => {
    if (photoInput.files && photoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        STATE.avatar = e.target.result;
        localStorage.setItem('deskdrop_avatar', STATE.avatar);
        updateLocalProfileUI();
        updateOnboardingAvatarPreview();
        showToast('Photo uploaded!', '📸');
      };
      reader.readAsDataURL(photoInput.files[0]);
    }
  });

  document.getElementById('btnOnboardingGenerateAi')?.addEventListener('click', () => {
    const promptInput = document.getElementById('onboardingAiPromptInput');
    const prompt = promptInput?.value.trim() || '3D cute futuristic cyberpunk developer avatar, neon glow';
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=256&height=256&nologo=true&seed=${seed}`;
    
    showToast('Generating AI Avatar...', '✨');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 256, 256);
      try {
        const dataUrl = canvas.toDataURL('image/png');
        STATE.avatar = dataUrl;
        localStorage.setItem('deskdrop_avatar', dataUrl);
        updateLocalProfileUI();
        updateOnboardingAvatarPreview();
        showToast('AI Avatar created!', '✦');
      } catch (err) {
        STATE.avatar = url;
        localStorage.setItem('deskdrop_avatar', url);
        updateLocalProfileUI();
        updateOnboardingAvatarPreview();
      }
    };
    img.src = url;
  });

  document.getElementById('btnOnboardingNext2')?.addEventListener('click', () => {
    goToStep(3);
  });

  document.getElementById('btnOnboardingSkip2')?.addEventListener('click', () => {
    goToStep(3);
  });

  // Step 3: Force Enable Notifications
  const btnEnableNotif = document.getElementById('btnOnboardingEnableNotif');
  const btnNext3 = document.getElementById('btnOnboardingNext3');
  const notifStatus = document.getElementById('onboardingNotifStatus');
  const notifBtnTxt = document.getElementById('txtOnboardingNotifBtn');

  btnEnableNotif?.addEventListener('click', () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          if (notifBtnTxt) notifBtnTxt.textContent = '✅ Notifications Allowed';
          if (notifStatus) notifStatus.innerHTML = '<span style="color: var(--accent-mint); font-weight: 600;">✅ Notifications enabled! Live alerts active.</span>';
          if (btnNext3) { btnNext3.disabled = false; btnNext3.style.opacity = '1'; }
          showToast('Notifications enabled!', '🔔');
          setTimeout(() => goToStep(4), 600);
        } else {
          if (notifStatus) notifStatus.innerHTML = '<span style="color: var(--accent-coral);">Notifications blocked by browser. You may still continue.</span>';
          if (btnNext3) { btnNext3.disabled = false; btnNext3.style.opacity = '1'; }
        }
      }).catch(() => {
        if (btnNext3) { btnNext3.disabled = false; btnNext3.style.opacity = '1'; }
      });
    } else {
      if (notifStatus) notifStatus.textContent = 'Notifications not supported on this browser. You can continue.';
      if (btnNext3) { btnNext3.disabled = false; btnNext3.style.opacity = '1'; }
    }
  });

  btnNext3?.addEventListener('click', () => {
    goToStep(4);
  });

  document.getElementById('btnOnboardingSkip3')?.addEventListener('click', () => {
    goToStep(4);
  });

  // Step 4: Create or Join Group
  let selectedOnboardingColor = GROUP_ACCENT_COLORS[0].hex;
  function initOnboardingSwatches() {
    const container = document.getElementById('onboardingColorSwatches');
    if (!container || container.children.length > 0) return;
    GROUP_ACCENT_COLORS.forEach((c, idx) => {
      const sw = document.createElement('button');
      sw.className = `swatch-btn ${idx === 0 ? 'selected' : ''}`;
      sw.style.backgroundColor = c.hex;
      sw.onclick = () => {
        container.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('selected'));
        sw.classList.add('selected');
        selectedOnboardingColor = c.hex;
      };
      container.appendChild(sw);
    });
  }

  const tabCreate = document.getElementById('onboardingTabCreate');
  const tabJoin = document.getElementById('onboardingTabJoin');
  const paneCreate = document.getElementById('onboardingCreateGroupPane');
  const paneJoin = document.getElementById('onboardingJoinGroupPane');

  tabCreate?.addEventListener('click', () => {
    tabCreate.classList.add('active');
    tabJoin.classList.remove('active');
    if (paneCreate) paneCreate.style.display = 'block';
    if (paneJoin) paneJoin.style.display = 'none';
  });

  tabJoin?.addEventListener('click', () => {
    tabJoin.classList.add('active');
    tabCreate.classList.remove('active');
    if (paneCreate) paneCreate.style.display = 'none';
    if (paneJoin) paneJoin.style.display = 'block';
  });

  document.getElementById('btnOnboardingNext4')?.addEventListener('click', () => {
    const isCreating = tabCreate && tabCreate.classList.contains('active');
    if (isCreating) {
      const groupNameInput = document.getElementById('onboardingGroupNameInput');
      const groupName = groupNameInput?.value.trim();
      if (groupName) {
        const newGroup = {
          id: 'group_' + Date.now(),
          name: groupName,
          color: selectedOnboardingColor
        };
        STATE.groups.push(newGroup);
        persistGroups();
        updateGroupsUI();
        switchActiveChat({ type: 'group', id: newGroup.id, name: newGroup.name, color: newGroup.color });
      }
    } else {
      const joinInput = document.getElementById('onboardingJoinCodeInput');
      const code = sanitizeRoomCode(joinInput?.value);
      if (code) {
        initPeerSession(code, 0);
      }
    }
    goToStep(5);
  });

  document.getElementById('btnOnboardingSkip4')?.addEventListener('click', () => {
    goToStep(5);
  });

  // Step 5: Install WebApp & Finish
  const btnInstallApp = document.getElementById('btnOnboardingInstallApp');
  const installGuideText = document.getElementById('installGuideText');

  btnInstallApp?.addEventListener('click', () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      deferredPwaPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          showToast('DeskDrop App installed successfully!', '🚀');
        }
        deferredPwaPrompt = null;
      });
    } else {
      if (installGuideText) {
        installGuideText.style.display = 'block';
      }
      showToast('Install prompt opened or use Add to Home Screen', '📲');
    }
  });

  function completeOnboarding() {
    localStorage.setItem('deskdrop_onboarding_completed', 'true');
    modal.style.display = 'none';
    updateLocalProfileUI();
    updateGroupsUI();
    showToast(`Welcome to DeskDrop, ${STATE.username}!`, '🚀');
  }

  document.getElementById('btnOnboardingFinish')?.addEventListener('click', () => {
    completeOnboarding();
  });
}

// ==========================================
// 16. APPLICATION BOOTSTRAP
// ==========================================

function initApp() {
  updateLocalProfileUI();
  updateGroupsUI();
  applyWallpaperStyles();
  renderFluentEmojiGrid();
  renderEmojiGrid('all');
  setupEventHandlers();
  initOnboardingWizard();

  const sliderOpacity = document.getElementById('sliderWallpaperOpacity');
  const sliderBlur = document.getElementById('sliderWallpaperBlur');
  if (sliderOpacity) sliderOpacity.value = STATE.wallpaperOpacity;
  if (sliderBlur) sliderBlur.value = STATE.wallpaperBlur;

  const urlParams = new URLSearchParams(window.location.search);
  const paramRoom = sanitizeRoomCode(urlParams.get('room'));
  const activeRoom = paramRoom || STATE.roomCode || 'BWZ-98';

  switchActiveChat(STATE.activeChat);
  initPeerSession(activeRoom, 0);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
        .catch(err => console.debug('[PWA] SW error:', err));
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
