// ==========================================
// KINSHIP CHARACTER ICON COMPONENT
// ==========================================

class CharacterIcon {
    /**
     * @param {string} containerId - The ID of the HTML element container where the character will be rendered.
     * @param {Object} initialData - Initial configuration data (name, activity, posX, posY, status).
     */
    constructor(containerId, initialData = {}) {
        this.container = document.getElementById(containerId);
        this.activity = initialData.activity || 'cycling';
        this.name = initialData.name || 'Daelin';
        this.status = initialData.status || 'Active Session';
        this.posX = initialData.posX || 35; // percentage or coordinate unit
        this.posY = initialData.posY || 40; // percentage or coordinate unit
        
        this.render();
    }

    /**
     * Returns the clean SVG vector graphic based on the active activity state.
     */
    getSvgContent(activity) {
        switch(activity) {
            case 'coding':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-cyan-400"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
            case 'coffee':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-amber-400"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`;
            case 'soccer':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-emerald-400"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`;
            case 'cycling':
            default:
                return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-orange-400"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M12 18V5l-3 2-2-2"/></svg>`;
        }
    }

    /**
     * Injects the DOM structure into the container.
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div id="characterElement" class="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-out flex flex-col items-center group cursor-pointer" style="left: ${this.posX}%; top: ${this.posY}%;">
                
                <!-- Floating Status Pill Badge -->
                <div class="px-3.5 py-1.5 rounded-2xl text-xs font-semibold text-white shadow-2xl mb-2.5 border border-white/20 flex items-center gap-2 whitespace-nowrap bg-neutral-900/95 backdrop-blur-xl">
                    <span class="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                    <span id="charStatusText" class="tracking-tight text-neutral-200">${this.name} <span class="text-orange-400 font-bold">•</span> ${this.status}</span>
                </div>
                
                <!-- Illustrated Sprite Avatar Marker with Glow Rings -->
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-16 h-16 rounded-full bg-orange-500/30 animate-ping pointer-events-none"></div>
                    <div class="relative w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 shadow-2xl shadow-orange-600/50">
                        <div class="w-full h-full rounded-[14px] bg-neutral-950 flex items-center justify-center shadow-inner overflow-hidden" id="charSpriteSvg">
                            ${this.getSvgContent(this.activity)}
                        </div>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-neutral-950 flex items-center justify-center text-[10px] shadow-md">
                        ⚡
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Updates the character's current activity icon sprite and status text.
     */
    setActivity(activity, statusText) {
        this.activity = activity;
        this.status = statusText;

        const svgContainer = document.getElementById('charSpriteSvg');
        const statusTextEl = document.getElementById('charStatusText');

        if (svgContainer) svgContainer.innerHTML = this.getSvgContent(activity);
        if (statusTextEl) statusTextEl.innerHTML = `${this.name} <span class="text-orange-400 font-bold">•</span> ${this.status}`;
    }

    /**
     * Smoothly updates the screen coordinates for real-time tracking simulations.
     */
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
