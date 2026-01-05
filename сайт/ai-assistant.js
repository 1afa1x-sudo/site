/**
 * EstateAI - AI Assistant
 */

class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.preferences = {
            budget: null,
            region: null,
            type: null,
            bedrooms: null
        };
        this.init();
    }

    init() {
        this.setupEvents();
        setTimeout(() => this.showWelcome(), 500);
    }

    setupEvents() {
        document.getElementById('ai-toggle')?.addEventListener('click', () => this.toggle());
        document.getElementById('ai-close')?.addEventListener('click', () => this.close());
        document.getElementById('hero-cta')?.addEventListener('click', () => this.open());
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        document.getElementById('ai-assistant')?.classList.add('active');
        this.isOpen = true;
    }

    close() {
        document.getElementById('ai-assistant')?.classList.remove('active');
        this.isOpen = false;
    }

    addMessage(text, isUser = false, properties = null) {
        const chat = document.getElementById('ai-chat');
        if (!chat) return;

        const div = document.createElement('div');
        div.className = `ai-message ${isUser ? 'user' : ''}`;

        let propsHtml = '';
        if (properties?.length) {
            propsHtml = properties.slice(0, 3).map(p => `
                <div class="chat-property-card" onclick="window.location.href='property.html?id=${p.id}'">
                    <img src="${p.image}" alt="${p.title}">
                    <div class="chat-property-info">
                        <h4>${p.title}</h4>
                        <div class="price">€${p.price.toLocaleString()}</div>
                        <div class="details">
                            <i class="fas fa-bed"></i> ${p.bedrooms} •
                            <i class="fas fa-bath"></i> ${p.bathrooms} •
                            ${p.area}m²
                        </div>
                    </div>
                </div>
            `).join('');
        }

        div.innerHTML = `
            <div class="message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}">
                <p>${text}</p>
                ${propsHtml}
            </div>
        `;

        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    showTyping() {
        const chat = document.getElementById('ai-chat');
        const div = document.createElement('div');
        div.className = 'ai-message typing';
        div.innerHTML = `
            <div class="message-bubble ai-bubble">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    removeTyping() {
        document.querySelector('.ai-message.typing')?.remove();
    }

    showChoices(title, choices, onSelect) {
        const container = document.getElementById('ai-choices');
        if (!container) return;

        container.innerHTML = `
            <div class="choices-title">${title}</div>
            <div class="choices-grid">
                ${choices.map(c => `
                    <button class="choice-btn ${c.primary ? 'primary' : ''}" data-id="${c.id}">
                        ${c.icon ? `<i class="fas ${c.icon}"></i>` : ''} ${c.label}
                    </button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const choice = choices.find(c => c.id === btn.dataset.id) || choices.find(c => String(c.id) === btn.dataset.id);
                this.addMessage(btn.textContent.trim(), true);
                onSelect(choice);
            });
        });
    }

    getPreferencesSummary() {
        const p = this.preferences;
        const items = [];
        
        if (p.region) {
            const name = REGIONS[p.region]?.name || p.region;
            items.push(`<li><i class="fas fa-map-marker-alt"></i> ${name}</li>`);
        }
        if (p.budget) {
            items.push(`<li><i class="fas fa-euro-sign"></i> ${p.budget.label}</li>`);
        }
        if (p.type) {
            items.push(`<li><i class="fas fa-home"></i> ${p.type}</li>`);
        }
        if (p.bedrooms) {
            items.push(`<li><i class="fas fa-bed"></i> ${p.bedrooms}+ bedrooms</li>`);
        }

        if (!items.length) return '';
        
        return `
            <div class="preferences-summary">
                <h5>📋 Your preferences:</h5>
                <ul>${items.join('')}</ul>
            </div>
        `;
    }

    // === ДИАЛОГ ===

    showWelcome() {
        this.addMessage("👋 Hello! I'm your EstateAI assistant. I'll help you find the perfect property in Spain!");
        this.showMainMenu();
    }

    showMainMenu() {
        this.showChoices("What would you like to do?", [
            { id: 'search', label: 'Find a property', icon: 'fa-search', primary: true },
            { id: 'region', label: 'Browse by region', icon: 'fa-map' },
            { id: 'budget', label: 'Set budget first', icon: 'fa-euro-sign' },
            { id: 'all', label: 'Show all properties', icon: 'fa-th' }
        ], choice => {
            switch (choice.id) {
                case 'search':
                case 'region':
                    this.askRegion();
                    break;
                case 'budget':
                    this.askBudget();
                    break;
                case 'all':
                    this.showAllProperties();
                    break;
            }
        });
    }

    askRegion() {
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage("🗺️ Which region of Spain interests you?");

            const regions = [];
            for (const [id, r] of Object.entries(REGIONS)) {
                const count = PROPERTIES.filter(p => p.region === id).length;
                if (count > 0) {
                    regions.push({ id, label: `${r.name} (${count})`, icon: 'fa-map-marker-alt' });
                }
            }
            regions.push({ id: 'any', label: 'Any region', icon: 'fa-globe', primary: true });

            this.showChoices("Choose a region:", regions, choice => {
                if (choice.id !== 'any') this.preferences.region = choice.id;
                this.askPropertyType();
            });
        }, 600);
    }

    askPropertyType() {
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage(`🏠 What type of property?${this.getPreferencesSummary()}`);

            const types = PROPERTY_TYPES.map(t => ({
                id: t.id,
                label: t.label,
                icon: t.icon
            }));
            types.push({ id: 'any', label: 'Any type', icon: 'fa-check-circle', primary: true });

            this.showChoices("Property type:", types, choice => {
                if (choice.id !== 'any') this.preferences.type = choice.id;
                this.askBudget();
            });
        }, 600);
    }

    askBudget() {
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage(`💰 What's your budget?${this.getPreferencesSummary()}`);

            const budgets = BUDGET_OPTIONS.map(b => ({
                id: b.id,
                budget: b,
                label: b.label,
                icon: 'fa-euro-sign'
            }));
            budgets.push({ id: 'any', label: 'No limit', icon: 'fa-infinity', primary: true });

            this.showChoices("Budget range:", budgets, choice => {
                if (choice.id !== 'any' && choice.budget) {
                    this.preferences.budget = choice.budget;
                }
                this.askBedrooms();
            });
        }, 600);
    }

    askBedrooms() {
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage(`🛏️ How many bedrooms?${this.getPreferencesSummary()}`);

            const bedrooms = BEDROOM_OPTIONS.map(b => ({
                id: b.value,
                value: b.value,
                label: b.label,
                icon: 'fa-bed'
            }));
            bedrooms.push({ id: 'any', label: "Doesn't matter", icon: 'fa-check-circle', primary: true });

            this.showChoices("Bedrooms:", bedrooms, choice => {
                if (choice.id !== 'any' && choice.value) {
                    this.preferences.bedrooms = choice.value;
                }
                this.showResults();
            });
        }, 600);
    }

    showResults() {
        const p = this.preferences;
        
        let results = PROPERTIES.filter(prop => {
            if (p.region && prop.region !== p.region) return false;
            if (p.type && prop.type !== p.type) return false;
            if (p.budget) {
                if (prop.price < p.budget.min || prop.price > p.budget.max) return false;
            }
            if (p.bedrooms && prop.bedrooms < p.bedrooms) return false;
            return true;
        });

        this.showTyping();
        setTimeout(() => {
            this.removeTyping();

            if (results.length > 0) {
                this.addMessage(
                    `🎉 Found ${results.length} properties for you!${this.getPreferencesSummary()}`,
                    false,
                    results
                );
                if (typeof displayProperties === 'function') {
                    displayProperties(results);
                }
            } else {
                // Показать похожие
                let similar = PROPERTIES;
                if (p.region) similar = similar.filter(prop => prop.region === p.region);
                if (similar.length === 0) similar = PROPERTIES.slice(0, 5);
                
                this.addMessage(
                    `😕 No exact matches. Here are some similar options:${this.getPreferencesSummary()}`,
                    false,
                    similar.slice(0, 3)
                );
            }

            this.showEndMenu();
        }, 800);
    }

    showAllProperties() {
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage(`📋 Here are all ${PROPERTIES.length} properties:`, false, PROPERTIES);
            if (typeof displayProperties === 'function') {
                displayProperties(PROPERTIES);
            }
            this.showEndMenu();
        }, 600);
    }

    showEndMenu() {
        setTimeout(() => {
            this.showChoices("What's next?", [
                { id: 'restart', label: 'New search', icon: 'fa-redo', primary: true },
                { id: 'modify', label: 'Modify criteria', icon: 'fa-edit' },
                { id: 'all', label: 'Show all', icon: 'fa-th' }
            ], choice => {
                switch (choice.id) {
                    case 'restart':
                        this.reset();
                        break;
                    case 'modify':
                        this.askRegion();
                        break;
                    case 'all':
                        this.showAllProperties();
                        break;
                }
            });
        }, 500);
    }

    reset() {
        this.preferences = { budget: null, region: null, type: null, bedrooms: null };
        this.addMessage("🔄 Let's start fresh!");
        this.showMainMenu();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});