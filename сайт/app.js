/**
 * EstateAI - Main Application
 */

// Глобальные переменные
let currentLanguage = 'en';

// =====================================================
// ИНИЦИАЛИЗАЦИЯ
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadProperties();
    setupLanguageSelector();
    setupFilters();
    setupSearch();
    setupMap();
    updateTexts();
}

// =====================================================
// РАБОТА С ДАННЫМИ
// =====================================================
function getAllProperties() {
    return PROPERTIES;
}

function getPropertyById(id) {
    return PROPERTIES.find(p => p.id === parseInt(id));
}

function getPropertiesByRegion(regionId) {
    return PROPERTIES.filter(p => p.region === regionId);
}

function getPropertiesByType(type) {
    return PROPERTIES.filter(p => p.type === type);
}

function getPropertiesCountByRegion(regionId) {
    return getPropertiesByRegion(regionId).length;
}

function getAveragePriceByRegion(regionId) {
    const props = getPropertiesByRegion(regionId);
    if (props.length === 0) return 0;
    return Math.round(props.reduce((sum, p) => sum + p.price, 0) / props.length);
}

function getRegionInfo(regionId) {
    return REGIONS[regionId] || null;
}

function getRegionName(regionId) {
    const region = REGIONS[regionId];
    if (!region) return regionId;
    if (currentLanguage === 'es') return region.nameEs || region.name;
    if (currentLanguage === 'sv') return region.nameSv || region.name;
    return region.name;
}

function getRegionDescription(regionId) {
    const region = REGIONS[regionId];
    if (!region) return '';
    return region.description[currentLanguage] || region.description.en;
}

function getRegionsWithProperties() {
    const result = [];
    for (const [id, region] of Object.entries(REGIONS)) {
        const count = getPropertiesCountByRegion(id);
        if (count > 0) {
            result.push({ id, name: getRegionName(id), count });
        }
    }
    return result;
}

// =====================================================
// ПОИСК И ФИЛЬТРАЦИЯ
// =====================================================
function searchProperties(term) {
    const cleanTerm = term.toLowerCase().trim().replace(/^#/, '');
    if (!cleanTerm) return PROPERTIES;
    
    return PROPERTIES.filter(p => {
        if (p.title.toLowerCase().includes(cleanTerm)) return true;
        if (p.location.toLowerCase().includes(cleanTerm)) return true;
        if (p.description.toLowerCase().includes(cleanTerm)) return true;
        if (p.type.toLowerCase().includes(cleanTerm)) return true;
        if (getRegionName(p.region).toLowerCase().includes(cleanTerm)) return true;
        if (p.tags?.some(tag => tag.toLowerCase().includes(cleanTerm))) return true;
        return false;
    });
}

function filterProperties(filters) {
    return PROPERTIES.filter(p => {
        if (filters.region && p.region !== filters.region) return false;
        if (filters.type && p.type !== filters.type) return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
        return true;
    });
}

// =====================================================
// ОТОБРАЖЕНИЕ НЕДВИЖИМОСТИ
// =====================================================
function loadProperties() {
    displayProperties(PROPERTIES);
    loadPopularTags();
}

function displayProperties(properties, highlight = '') {
    const grid = document.getElementById('properties-grid');
    if (!grid) return;
    
    if (properties.length === 0) {
        grid.innerHTML = `
            <div class="no-properties">
                <i class="fas fa-search"></i>
                <p data-i18n="properties.noResults">No properties found</p>
            </div>
        `;
        updateTexts();
        return;
    }
    
    grid.innerHTML = properties.map(p => createPropertyCard(p, highlight)).join('');
    
    // Добавить обработчики кликов
    grid.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = `property.html?id=${card.dataset.id}`;
        });
    });
    
    // Обработчики для тегов
    grid.querySelectorAll('.property-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('search-input').value = '#' + tag.dataset.tag;
            performSearch();
        });
    });
}

function createPropertyCard(property, highlight = '') {
    const regionName = getRegionName(property.region);
    let title = property.title;
    let location = property.location;
    
    if (highlight) {
        title = highlightText(title, highlight);
        location = highlightText(location, highlight);
    }
    
    const tagsHtml = (property.tags || []).slice(0, 4)
        .map(tag => `<span class="property-tag" data-tag="${tag}">#${tag}</span>`)
        .join('');
    
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image-wrapper">
                <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy">
                <span class="property-type-badge">${property.type}</span>
            </div>
            <div class="property-info">
                <div class="property-price">€${property.price.toLocaleString()}</div>
                <h3 class="property-title">${title}</h3>
                <div class="property-details">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.area}m²</span>
                </div>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${location}
                </div>
                <div class="property-tags">${tagsHtml}</div>
                <span class="property-region">${regionName}</span>
            </div>
        </div>
    `;
}

function highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// =====================================================
// ПОИСК
// =====================================================
function setupSearch() {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');
    
    if (!input || !btn) return;
    
    btn.addEventListener('click', performSearch);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });
    
    let timeout;
    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(performSearch, 300);
    });
}

function performSearch() {
    const input = document.getElementById('search-input');
    const info = document.getElementById('search-results-info');
    const term = input.value.trim();
    
    resetMapSelection();
    resetFilters();
    
    if (!term) {
        displayProperties(PROPERTIES);
        if (info) info.innerHTML = '';
        document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        return;
    }
    
    const results = searchProperties(term);
    displayProperties(results, term.replace(/^#/, ''));
    
    if (info) {
        const msg = results.length > 0
            ? `<i class="fas fa-check-circle"></i> Found ${results.length} properties`
            : `<i class="fas fa-times-circle"></i> No properties found`;
        info.innerHTML = msg;
        info.className = 'search-results-info' + (results.length > 0 ? ' has-results' : '');
    }
}

function loadPopularTags() {
    const container = document.getElementById('popular-tags');
    if (!container) return;
    
    container.innerHTML = POPULAR_TAGS.map(t => `
        <button class="tag-btn" data-tag="${t.tag}">
            <i class="fas ${t.icon}"></i> ${t.tag}
        </button>
    `).join('');
    
    container.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('search-input').value = '#' + btn.dataset.tag;
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            performSearch();
        });
    });
}

// =====================================================
// ФИЛЬТРЫ
// =====================================================
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            document.getElementById('search-results-info').innerHTML = '';
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            resetMapSelection();
            
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const props = filter === 'all' ? PROPERTIES : getPropertiesByType(filter);
            displayProperties(props);
        });
    });
}

function resetFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
}

// =====================================================
// КАРТА
// =====================================================
function setupMap() {
    document.querySelectorAll('.spain-svg .region').forEach(region => {
        const id = region.dataset.region;
        const count = getPropertiesCountByRegion(id);
        
        if (count > 0) region.classList.add('has-properties');
        
        region.addEventListener('click', () => selectRegion(id));
    });
    
    const viewBtn = document.getElementById('view-region-properties');
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            const selected = document.querySelector('.region.selected');
            if (selected) {
                const props = getPropertiesByRegion(selected.dataset.region);
                displayProperties(props);
                document.getElementById('search-input').value = '';
                document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
                resetFilters();
            }
        });
    }
}

function selectRegion(regionId) {
    document.querySelectorAll('.region').forEach(r => r.classList.remove('selected'));
    document.querySelector(`[data-region="${regionId}"]`)?.classList.add('selected');
    
    const info = getRegionInfo(regionId);
    const count = getPropertiesCountByRegion(regionId);
    const avg = getAveragePriceByRegion(regionId);
    
    document.getElementById('region-placeholder').style.display = 'none';
    document.getElementById('region-info-content').style.display = 'block';
    
    document.getElementById('selected-region-name').textContent = getRegionName(regionId);
    document.getElementById('selected-region-desc').textContent = getRegionDescription(regionId);
    document.getElementById('region-property-count').textContent = count;
    document.getElementById('region-avg-price').textContent = avg > 0 ? `€${Math.round(avg/1000)}k` : '-';
    
    const cities = document.getElementById('region-cities');
    if (cities && info?.cities) {
        cities.innerHTML = info.cities.map(c => `<span class="city-tag"><i class="fas fa-map-pin"></i> ${c}</span>`).join('');
    }
    
    const viewBtn = document.getElementById('view-region-properties');
    if (viewBtn) {
        viewBtn.style.display = count > 0 ? 'flex' : 'none';
        viewBtn.innerHTML = `<i class="fas fa-search"></i> View ${count} Properties`;
    }
}

function resetMapSelection() {
    document.querySelectorAll('.region').forEach(r => r.classList.remove('selected'));
    const placeholder = document.getElementById('region-placeholder');
    const content = document.getElementById('region-info-content');
    if (placeholder) placeholder.style.display = 'block';
    if (content) content.style.display = 'none';
}

// =====================================================
// ЯЗЫК
// =====================================================
function setupLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
            updateTexts();
            loadPopularTags();
            
            const selected = document.querySelector('.region.selected');
            if (selected) selectRegion(selected.dataset.region);
        });
    });
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[currentLanguage]?.[key]) {
            el.textContent = TRANSLATIONS[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (TRANSLATIONS[currentLanguage]?.[key]) {
            el.placeholder = TRANSLATIONS[currentLanguage][key];
        }
    });
}

// Экспорт для использования в других скриптах
window.EstateAI = {
    getAllProperties,
    getPropertyById,
    getPropertiesByRegion,
    filterProperties,
    searchProperties,
    displayProperties,
    getRegionName,
    getRegionsWithProperties,
    currentLanguage: () => currentLanguage
};