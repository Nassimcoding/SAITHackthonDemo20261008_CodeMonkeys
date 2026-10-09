// ==========================================
// KINSHIP CHARACTER ICON COMPONENT
// ==========================================

class CharacterIcon {
    constructor(containerId, initialData = {}) {
        this.container = document.getElementById(containerId);
        this.emoji = initialData.emoji || '🚲';
        this.name = initialData.name || 'Daelin';
        this.status = initialData.status || 'En route';
        this.activityTitle = initialData.activityTitle || 'Cycling Tour';
        
        this.posX = initialData.posX || 25;
        this.posY = initialData.posY || 30;
        
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div id="characterElement" class="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 flex flex-col items-center" style="left: ${this.posX}%; top: ${this.posY}%;">
                <div class="glass-panel px-3 py-1 rounded-xl text-[11px] font-bold text-orange-300 shadow-xl mb-2 border border-orange-500/30 flex items-center gap-1.5 whitespace-nowrap bg-gray-900/80 backdrop-blur-md">
                    <span id="charStatusEmoji">${this.emoji}</span> 
                    <span id="charStatusText">${this.name} • ${this.status}</span>
                </div>
                
                <div class="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-orange-600 to-amber-400 shadow-2xl character-glow">
                    <div class="w-full h-full rounded-full bg-gray-900 overflow-hidden border-2 border-white/80 flex items-center justify-center text-2xl" id="charMainEmoji">
                        ${this.emoji}
                    </div>
                </div>
            </div>
        `;
    }

    setActivity(emoji, activityTitle, statusText = 'En route') {
        this.emoji = emoji;
        this.activityTitle = activityTitle;
        this.status = statusText;

        const mainEmojiEl = document.getElementById('charMainEmoji');
        const statusEmojiEl = document.getElementById('charStatusEmoji');
        const statusTextEl = document.getElementById('charStatusText');

        if (mainEmojiEl) mainEmojiEl.innerText = emoji;
        if (statusEmojiEl) statusEmojiEl.innerText = emoji;
        if (statusTextEl) statusTextEl.innerText = `${this.name} • ${this.status}`;
    }

    moveTo(x, y) {
        this.posX = x;
        this.posY = y;
        const charEl = document.getElementById('characterElement');
        if (charEl) {
            charEl.style.left = `${x}%`;
            charEl.style.top = `${y}%`;
        }
    }
}

// Automatically initialize when the page loads
let myCharacter;
document.addEventListener('DOMContentLoaded', () => {
    myCharacter = new CharacterIcon('characterContainer', {
        name: 'Daelin',
        emoji: '🚲',
        posX: 25,
        posY: 30
    });
});
