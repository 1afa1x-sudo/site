/**
 * Property Detail Page
 */

let currentProperty = null;
let currentImageIndex = 0;
let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
    loadPropertyDetail();
    setupLanguageSelector();
    setupGalleryModal();
});

function loadPropertyDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        showError();
        return;
    }
    
    currentProperty = PROPERTIES.find(p => p.id === parseInt(id));
    
    if (!currentProperty) {
        showError();
        return;
    }
    
    renderProperty(currentProperty);
    document.title = `${currentProperty.title} - EstateAI`;
}

function showError() {
    document.getElementById('property-detail').innerHTML = `
        <div class="error-page">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist or has been removed.</p>
            <a href="index.html" class="btn-primary">
                <i class="fas fa-arrow-left"></i> Back to Properties
            </a>
        </div>
    `;
}

function renderProperty(p) {
    const region = REGIONS[p.region];
    const regionName = region ? (currentLanguage === 'es' ? region.nameEs : currentLanguage === 'sv' ? region.nameSv : region.name) : p.region;
    
    const galleryHtml = (p.gallery || [p.image]).map((img, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img src="${img}" alt="${p.title}" loading="lazy">
        </div>
    `).join('');
    
    const featuresHtml = (p.features || []).map(f => `
        <li><i class="fas fa-check"></i> ${f}</li>
    `).join('');
    
    const tagsHtml = (p.tags || []).map(t => `
        <a href="index.html?search=%23${t}" class="detail-tag">#${t}</a>
    `).join('');
    
    document.getElementById('property-detail').innerHTML = `
        <!-- Навигация -->
        <div class="detail-breadcrumb">
            <a href="index.html"><i class="fas fa-home"></i> Home</a>
            <span>/</span>
            <a href="index.html#properties">Properties</a>
            <span>/</span>
            <span>${p.title}</span>
        </div>
        
        <!-- Галерея -->
        <div class="detail-gallery">
            <div class="gallery-main" id="gallery-main">
                <img src="${p.gallery?.[0] || p.image}" alt="${p.title}" id="main-image">
                <button class="gallery-expand" id="gallery-expand">
                    <i class="fas fa-expand"></i> View Gallery
                </button>
                <span class="property-type-badge">${p.type}</span>
            </div>
            <div class="gallery-thumbs" id="gallery-thumbs">
                ${galleryHtml}
            </div>
        </div>
        
        <!-- Информация -->
        <div class="detail-content">
            <div class="detail-main">
                <h1 class="detail-title">${p.title}</h1>
                <div class="detail-location">
                    <i class="fas fa-map-marker-alt"></i> ${p.location}
                    <span class="detail-region">${regionName}</span>
                </div>
                
                <div class="detail-stats">
                    <div class="stat">
                        <i class="fas fa-bed"></i>
                        <span>${p.bedrooms}</span>
                        <label>Bedrooms</label>
                    </div>
                    <div class="stat">
                        <i class="fas fa-bath"></i>
                        <span>${p.bathrooms}</span>
                        <label>Bathrooms</label>
                    </div>
                    <div class="stat">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${p.area}</span>
                        <label>m²</label>
                    </div>
                    <div class="stat">
                        <i class="fas fa-calendar"></i>
                        <span>${p.yearBuilt || '-'}</span>
                        <label>Year Built</label>
                    </div>
                </div>
                
                <div class="detail-description">
                    <h2>Description</h2>
                    <p>${(p.fullDescription || p.description).replace(/\n/g, '</p><p>')}</p>
                </div>
                
                ${featuresHtml ? `
                <div class="detail-features">
                    <h2>Features & Amenities</h2>
                    <ul class="features-list">${featuresHtml}</ul>
                </div>
                ` : ''}
                
                <div class="detail-tags">
                    <h2>Tags</h2>
                    <div class="tags-list">${tagsHtml}</div>
                </div>
            </div>
            
            <!-- Сайдбар -->
            <aside class="detail-sidebar">
                <div class="price-card">
                    <div class="price-amount">€${p.price.toLocaleString()}</div>
                    <p class="price-note">Price in Euros</p>
                </div>
                
                <div class="contact-card">
                    <h3><i class="fas fa-phone"></i> Contact Agent</h3>
                    ${p.contact ? `
                        <p><strong>Phone:</strong> ${p.contact.phone}</p>
                        <p><strong>Email:</strong> ${p.contact.email}</p>
                    ` : `
                        <p><strong>Phone:</strong> +34 900 123 456</p>
                        <p><strong>Email:</strong> info@estateai.com</p>
                    `}
                    <button class="btn-primary btn-full">
                        <i class="fas fa-envelope"></i> Request Info
                    </button>
                    <button class="btn-secondary btn-full">
                        <i class="fas fa-calendar"></i> Schedule Visit
                    </button>
                </div>
                
                <div class="share-card">
                    <h3>Share Property</h3>
                    <div class="share-buttons">
                        <button class="share-btn" onclick="shareProperty('facebook')">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button class="share-btn" onclick="shareProperty('twitter')">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="share-btn" onclick="shareProperty('whatsapp')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="share-btn" onclick="shareProperty('copy')">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    `;
    
    setupGalleryThumbs();
}

function setupGalleryThumbs() {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const mainImg = document.getElementById('main-image');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = thumb.querySelector('img').src;
            currentImageIndex = parseInt(thumb.dataset.index);
        });
    });
    
    // Открыть модал
    document.getElementById('gallery-expand')?.addEventListener('click', openGalleryModal);
    document.getElementById('gallery-main')?.addEventListener('click', openGalleryModal);
}

function setupGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('gallery-close');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    closeBtn?.addEventListener('click', closeGalleryModal);
    prevBtn?.addEventListener('click', () => navigateGallery(-1));
    nextBtn?.addEventListener('click', () => navigateGallery(1));
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeGalleryModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!modal?.classList.contains('active')) return;
        if (e.key === 'Escape') closeGalleryModal();
        if (e.key === 'ArrowLeft') navigateGallery(-1);
        if (e.key === 'ArrowRight') navigateGallery(1);
    });
}

function openGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateGalleryImage();
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal?.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateGallery(direction) {
    if (!currentProperty?.gallery) return;
    const total = currentProperty.gallery.length;
    currentImageIndex = (currentImageIndex + direction + total) % total;
    updateGalleryImage();
}

function updateGalleryImage() {
    if (!currentProperty?.gallery) return;
    const img = document.getElementById('gallery-image');
    const counter = document.getElementById('gallery-counter');
    
    img.src = currentProperty.gallery[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${currentProperty.gallery.length}`;
}

function shareProperty(platform) {
    const url = window.location.href;
    const title = currentProperty?.title || 'Property';
    
    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        copy: null
    };
    
    if (platform === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    } else if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

function setupLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
            if (currentProperty) renderProperty(currentProperty);
        });
    });
}