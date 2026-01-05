/**
 * =====================================================
 * ФАЙЛ ДАННЫХ НЕДВИЖИМОСТИ - EstateAI
 * =====================================================
 * 
 * Чтобы добавить новый объект недвижимости:
 * 1. Скопируйте шаблон ниже
 * 2. Заполните все поля
 * 3. Добавьте в массив PROPERTIES
 * 
 * ШАБЛОН:
 * {
 *     id: 999,                          // Уникальный номер
 *     title: "Название объекта",
 *     type: "villa",                    // villa, apartment, house
 *     price: 500000,                    // Цена в евро (число без пробелов)
 *     region: "andalucia",              // Регион (см. список ниже)
 *     location: "Город, Провинция",
 *     
 *     bedrooms: 3,
 *     bathrooms: 2,
 *     area: 150,                        // Площадь в м²
 *     
 *     description: "Краткое описание для карточки",
 *     fullDescription: "Полное описание для страницы объекта...",
 *     
 *     // Главное фото (для карточки)
 *     image: "https://...",
 *     
 *     // Галерея фото (для страницы объекта)
 *     gallery: [
 *         "https://...",
 *         "https://...",
 *     ],
 *     
 *     // Теги для поиска
 *     tags: ["pool", "sea-view", "modern"],
 *     
 *     // Удобства
 *     features: ["Pool", "Garden", "Parking", "Air Conditioning"],
 *     
 *     // Год постройки (опционально)
 *     yearBuilt: 2020,
 *     
 *     // Контакт (опционально)
 *     contact: {
 *         phone: "+34 600 000 000",
 *         email: "agent@estateai.com"
 *     }
 * }
 * 
 * ДОСТУПНЫЕ РЕГИОНЫ:
 * - andalucia
 * - valencia  
 * - cataluna
 * - murcia
 * - baleares
 * - canarias
 * 
 * ДОСТУПНЫЕ ТИПЫ:
 * - villa
 * - apartment
 * - house
 * 
 * ПОПУЛЯРНЫЕ ТЕГИ:
 * pool, sea-view, beach, luxury, modern, garden, terrace, 
 * furnished, parking, investment, new, renovated, central,
 * quiet, golf, marina, mountain-view, balcony, security
 */

const PROPERTIES = [
    // ==================== ANDALUCÍA ====================
    {
        id: 1,
        title: "Luxury Villa Costa del Sol",
        type: "villa",
        price: 895000,
        region: "andalucia",
        location: "Marbella, Málaga",
        
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        
        description: "Stunning villa with private pool and sea views",
        fullDescription: `This magnificent luxury villa is located in one of the most prestigious areas of Marbella, offering breathtaking panoramic views of the Mediterranean Sea and the African coast.

The property features 5 spacious bedrooms, 4 modern bathrooms, a gourmet kitchen with top-of-the-line appliances, and an expansive living area that opens onto a beautiful terrace.

The outdoor area includes a stunning infinity pool, landscaped gardens, and a covered outdoor dining area perfect for entertaining. The villa also includes a private garage for 3 cars, smart home system, and underfloor heating throughout.`,
        
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        
        tags: ["luxury", "pool", "sea-view", "modern", "garden", "parking", "terrace", "new"],
        features: ["Infinity Pool", "Sea View", "Garden", "Garage", "Smart Home", "Air Conditioning", "Underfloor Heating", "Security System"],
        
        yearBuilt: 2022,
        contact: {
            phone: "+34 951 123 456",
            email: "marbella@estateai.com"
        }
    },
    
    {
        id: 2,
        title: "Modern Beach Apartment",
        type: "apartment",
        price: 285000,
        region: "andalucia",
        location: "Málaga City",
        
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        
        description: "Contemporary apartment steps from the beach",
        fullDescription: `Beautiful modern apartment located just 100 meters from the famous Malagueta beach. This recently renovated property offers the perfect combination of city life and beach lifestyle.

The apartment features an open-plan living area with a fully equipped modern kitchen, two comfortable bedrooms with built-in wardrobes, and two bathrooms with quality finishes.

The highlight is the spacious terrace with stunning sea views, perfect for enjoying the Mediterranean sunsets. The building offers a communal pool, gym, and 24-hour security.`,
        
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
        ],
        
        tags: ["beach", "modern", "city", "balcony", "furnished", "gym", "security"],
        features: ["Communal Pool", "Gym", "Terrace", "Sea View", "Furnished", "Air Conditioning", "24h Security"],
        
        yearBuilt: 2019,
        contact: {
            phone: "+34 951 234 567",
            email: "malaga@estateai.com"
        }
    },
    
    {
        id: 3,
        title: "Traditional Andalusian House",
        type: "house",
        price: 425000,
        region: "andalucia",
        location: "Sevilla",
        
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        
        description: "Charming house with patio in historic center",
        fullDescription: `A beautifully restored traditional Andalusian townhouse located in the heart of Seville's historic Santa Cruz neighborhood. This property combines authentic charm with modern comforts.

The house features a stunning central patio with a fountain, typical of Andalusian architecture. Four bedrooms are distributed over two floors, each with its own character. The rooftop terrace offers views of the Giralda tower.

Recently renovated with high-quality materials while preserving original features like decorative tiles, wooden beams, and wrought iron details.`,
        
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200"
        ],
        
        tags: ["traditional", "patio", "historic", "renovated", "central", "quiet", "character"],
        features: ["Patio", "Rooftop Terrace", "Renovated", "Central Location", "Original Features", "Air Conditioning"],
        
        yearBuilt: 1920,
        contact: {
            phone: "+34 954 123 456",
            email: "sevilla@estateai.com"
        }
    },
    
    // ==================== VALENCIA ====================
    {
        id: 4,
        title: "Costa Blanca Apartment",
        type: "apartment",
        price: 195000,
        region: "valencia",
        location: "Alicante",
        
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        
        description: "Bright apartment with balcony and sea views",
        fullDescription: `Lovely apartment in the popular Playa de San Juan area of Alicante, just 200 meters from the beach. Perfect as a holiday home or investment property.

The apartment has been recently painted and features a bright living room, fully equipped kitchen, two bedrooms, and a bathroom. The balcony offers partial sea views and is perfect for morning coffee.

The area has excellent amenities including restaurants, supermarkets, and public transport. The property comes with a parking space and storage room.`,
        
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
        ],
        
        tags: ["sea-view", "balcony", "bright", "beach", "affordable", "investment"],
        features: ["Balcony", "Sea View", "Parking", "Storage", "Near Beach", "Air Conditioning"],
        
        yearBuilt: 2005,
        contact: {
            phone: "+34 965 123 456",
            email: "alicante@estateai.com"
        }
    },
    
    {
        id: 5,
        title: "Golf Resort Villa",
        type: "villa",
        price: 650000,
        region: "valencia",
        location: "Benidorm",
        
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        
        description: "Elegant villa in exclusive golf community",
        fullDescription: `Exceptional villa located in the prestigious Las Rejas Golf Resort in Benidorm. This property offers the perfect lifestyle for golf enthusiasts and families alike.

The villa features 4 en-suite bedrooms, a spacious living-dining area with fireplace, modern kitchen, and a large basement that could be converted into additional living space or entertainment area.

Outside, enjoy the private pool, landscaped garden with automatic irrigation, and covered terrace overlooking the golf course. The community offers 24-hour security, tennis courts, and clubhouse access.`,
        
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        
        tags: ["golf", "luxury", "pool", "garden", "security", "community", "parking"],
        features: ["Private Pool", "Golf Course View", "Garden", "Garage", "Security", "Tennis Courts", "Clubhouse"],
        
        yearBuilt: 2018,
        contact: {
            phone: "+34 965 234 567",
            email: "benidorm@estateai.com"
        }
    },
    
    {
        id: 6,
        title: "Valencia City Center Loft",
        type: "apartment",
        price: 320000,
        region: "valencia",
        location: "Valencia City",
        
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        
        description: "Designer loft in the heart of Valencia",
        fullDescription: `Stunning designer loft in a beautifully renovated historic building in Valencia's trendy Ruzafa neighborhood. This unique property combines industrial chic with modern luxury.

High ceilings (4 meters), exposed brick walls, and large windows create a spectacular living space. The open-plan design includes a chef's kitchen with island, spacious living area, and dining space.

Three bedrooms, including a master suite with walk-in closet and en-suite bathroom. Private rooftop terrace with city views. Walking distance to restaurants, boutiques, and cultural attractions.`,
        
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560185127-6a8c7f1c1a0d?w=1200",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200"
        ],
        
        tags: ["loft", "designer", "central", "modern", "terrace", "renovated", "city"],
        features: ["Rooftop Terrace", "High Ceilings", "Designer Kitchen", "Walk-in Closet", "Central Location"],
        
        yearBuilt: 2021,
        contact: {
            phone: "+34 963 123 456",
            email: "valencia@estateai.com"
        }
    },
    
    // ==================== CATALUÑA ====================
    {
        id: 7,
        title: "Barcelona Eixample Apartment",
        type: "apartment",
        price: 485000,
        region: "cataluna",
        location: "Barcelona",
        
        bedrooms: 3,
        bathrooms: 2,
        area: 130,
        
        description: "Elegant apartment in modernist building",
        fullDescription: `Magnificent apartment in a stunning modernist building in Barcelona's prestigious Eixample district. This property showcases the best of Catalan architecture with original features preserved.

The apartment features high decorated ceilings, original mosaic floors, and large windows with traditional shutters. Three double bedrooms, two bathrooms, separate kitchen, and a formal living room.

Located on a quiet street just minutes from Passeig de Gràcia, surrounded by Gaudí's masterpieces, boutiques, and gourmet restaurants. The building has an elevator and communal terrace.`,
        
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
        ],
        
        tags: ["modernist", "elegant", "central", "historic", "high-ceilings", "balcony", "city"],
        features: ["Modernist Building", "Original Features", "Elevator", "Communal Terrace", "Central Location"],
        
        yearBuilt: 1905,
        contact: {
            phone: "+34 932 123 456",
            email: "barcelona@estateai.com"
        }
    },
    
    {
        id: 8,
        title: "Costa Brava Beach House",
        type: "house",
        price: 550000,
        region: "cataluna",
        location: "Girona",
        
        bedrooms: 4,
        bathrooms: 2,
        area: 180,
        
        description: "Beautiful house near crystal-clear coves",
        fullDescription: `Charming Mediterranean house located in a quiet residential area just 5 minutes walk from some of Costa Brava's most beautiful coves. Perfect for families seeking the authentic coastal lifestyle.

The house offers 4 bedrooms, 2 bathrooms, a bright living room with fireplace, and a traditional kitchen. The garden features mature trees, a BBQ area, and space for a pool.

The location is ideal - close to Begur and Palafrugell villages with their restaurants and shops, yet peaceful and private. Crystal-clear waters of the Mediterranean are just steps away.`,
        
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
        ],
        
        tags: ["beach", "coves", "garden", "sea-view", "family", "quiet", "nature"],
        features: ["Garden", "Near Beach", "Fireplace", "BBQ Area", "Quiet Location", "Parking"],
        
        yearBuilt: 1990,
        contact: {
            phone: "+34 972 123 456",
            email: "girona@estateai.com"
        }
    },
    
    // ==================== MURCIA ====================
    {
        id: 9,
        title: "La Manga Beach Studio",
        type: "apartment",
        price: 145000,
        region: "murcia",
        location: "La Manga, Murcia",
        
        bedrooms: 1,
        bathrooms: 1,
        area: 55,
        
        description: "Cozy studio with direct beach access",
        fullDescription: `Perfect investment opportunity or holiday retreat in the unique La Manga del Mar Menor. This cozy studio apartment offers direct access to both the Mediterranean Sea and the Mar Menor lagoon.

The studio is fully furnished and includes a living/sleeping area, kitchenette, bathroom, and a balcony with sea views. The complex has a communal pool, gardens, and beach access.

La Manga offers a unique microclimate with over 300 days of sunshine per year. Ideal for water sports enthusiasts with sailing, windsurfing, and diving available nearby.`,
        
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
        ],
        
        tags: ["studio", "beach", "affordable", "investment", "rental", "sea-view", "furnished"],
        features: ["Furnished", "Sea View", "Communal Pool", "Beach Access", "Balcony"],
        
        yearBuilt: 2000,
        contact: {
            phone: "+34 968 123 456",
            email: "murcia@estateai.com"
        }
    },
    
    {
        id: 10,
        title: "Cartagena Countryside Villa",
        type: "villa",
        price: 385000,
        region: "murcia",
        location: "Cartagena",
        
        bedrooms: 3,
        bathrooms: 2,
        area: 200,
        
        description: "Peaceful villa with pool and mountain views",
        fullDescription: `Beautiful country villa located in the hills above Cartagena, offering peace and privacy while being just 15 minutes from the coast. Perfect for those seeking a tranquil lifestyle.

The villa features 3 bedrooms, 2 bathrooms, a spacious living room with high ceilings, and a fully equipped kitchen. The property sits on a 5,000m² plot with fruit trees and natural vegetation.

Highlights include a private pool, covered terrace, outdoor kitchen/BBQ, and stunning views of the mountains and glimpses of the sea. Solar panels provide energy efficiency.`,
        
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        
        tags: ["countryside", "pool", "mountain-view", "quiet", "garden", "nature", "peaceful"],
        features: ["Private Pool", "Large Plot", "Mountain Views", "Solar Panels", "BBQ", "Fruit Trees"],
        
        yearBuilt: 2015,
        contact: {
            phone: "+34 968 234 567",
            email: "cartagena@estateai.com"
        }
    },
    
    // ==================== BALEARES ====================
    {
        id: 11,
        title: "Mallorca Luxury Estate",
        type: "villa",
        price: 1250000,
        region: "baleares",
        location: "Mallorca",
        
        bedrooms: 6,
        bathrooms: 5,
        area: 450,
        
        description: "Spectacular estate with infinity pool",
        fullDescription: `Exceptional luxury estate in the sought-after southwest of Mallorca, offering unparalleled views of the Mediterranean and total privacy on a 15,000m² plot.

This stunning property features 6 bedrooms (all en-suite), multiple living areas, a professional kitchen, wine cellar, home cinema, and gym. The master suite includes a private terrace and spa bathroom.

Outside, enjoy the spectacular infinity pool, manicured gardens, outdoor dining pavilion, and a guest house. The property includes smart home technology, underfloor heating/cooling, and a 4-car garage.`,
        
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200"
        ],
        
        tags: ["luxury", "estate", "infinity-pool", "sea-view", "garden", "exclusive", "new"],
        features: ["Infinity Pool", "Sea View", "Wine Cellar", "Home Cinema", "Gym", "Guest House", "Smart Home"],
        
        yearBuilt: 2023,
        contact: {
            phone: "+34 971 123 456",
            email: "mallorca@estateai.com"
        }
    },
    
    {
        id: 12,
        title: "Ibiza Marina Apartment",
        type: "apartment",
        price: 395000,
        region: "baleares",
        location: "Ibiza",
        
        bedrooms: 2,
        bathrooms: 2,
        area: 90,
        
        description: "Modern apartment overlooking the marina",
        fullDescription: `Stylish contemporary apartment in the prestigious Marina Botafoch area of Ibiza, with stunning views over the marina and Dalt Vila (UNESCO World Heritage Site).

The apartment features a modern open-plan design with floor-to-ceiling windows, designer kitchen, and high-quality finishes throughout. Two bedrooms with en-suite bathrooms and built-in wardrobes.

The large terrace is perfect for entertaining with views of the superyachts and the famous Ibiza sunsets. The complex offers a communal pool, gym, and underground parking.`,
        
        image: "https://images.unsplash.com/photo-1560185127-6a8c7f1c1a0d?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1560185127-6a8c7f1c1a0d?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
        ],
        
        tags: ["marina", "modern", "sea-view", "nightlife", "terrace", "furnished", "investment"],
        features: ["Marina View", "Terrace", "Communal Pool", "Gym", "Parking", "Modern Design"],
        
        yearBuilt: 2020,
        contact: {
            phone: "+34 971 234 567",
            email: "ibiza@estateai.com"
        }
    },
    
    // ==================== CANARIAS ====================
    {
        id: 13,
        title: "Tenerife Ocean View",
        type: "apartment",
        price: 225000,
        region: "canarias",
        location: "Tenerife",
        
        bedrooms: 2,
        bathrooms: 1,
        area: 80,
        
        description: "Sunny apartment with Atlantic views",
        fullDescription: `Wonderful apartment in the popular Costa Adeje area of Tenerife, offering stunning views of the Atlantic Ocean and the neighboring island of La Gomera.

The apartment is bright and airy with a spacious living room, fully equipped kitchen, two comfortable bedrooms, and a bathroom. The highlight is the large terrace perfect for enjoying the year-round sunshine.

Located in a well-maintained complex with a large communal pool, tropical gardens, and 24-hour security. Close to beaches, restaurants, and the famous Siam Park water park.`,
        
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
        ],
        
        tags: ["ocean-view", "sunny", "balcony", "pool", "community", "furnished", "rental"],
        features: ["Ocean View", "Communal Pool", "Terrace", "Furnished", "Security", "Tropical Gardens"],
        
        yearBuilt: 2008,
        contact: {
            phone: "+34 922 123 456",
            email: "tenerife@estateai.com"
        }
    },
    
    {
        id: 14,
        title: "Gran Canaria Hillside Villa",
        type: "villa",
        price: 575000,
        region: "canarias",
        location: "Gran Canaria",
        
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        
        description: "Stunning villa with panoramic ocean views",
        fullDescription: `Spectacular villa positioned on the hillside of Monte León, offering 180-degree panoramic views of the Atlantic Ocean. This property represents the ultimate in island living.

The villa features 4 bedrooms, 3 bathrooms, a large open-plan living area, and a modern kitchen. The design maximizes the incredible views from every room. Master suite with private terrace.

The outdoor area includes an infinity pool that seems to merge with the ocean, landscaped gardens with native plants, and multiple terraces for outdoor living. Garage and storage included.`,
        
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
        ],
        
        tags: ["panoramic", "ocean-view", "pool", "modern", "garden", "quiet", "exclusive"],
        features: ["Infinity Pool", "Panoramic Ocean View", "Garden", "Garage", "Multiple Terraces"],
        
        yearBuilt: 2019,
        contact: {
            phone: "+34 928 123 456",
            email: "grancanaria@estateai.com"
        }
    },
    
    {
        id: 15,
        title: "Lanzarote Modern Home",
        type: "house",
        price: 320000,
        region: "canarias",
        location: "Lanzarote",
        
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        
        description: "Contemporary home with volcanic landscape views",
        fullDescription: `Unique contemporary home that perfectly complements Lanzarote's dramatic volcanic landscape. Designed in harmony with the island's architectural heritage established by César Manrique.

The house features 3 bedrooms, 2 bathrooms, an open-plan living area with large windows framing the volcanic views, and a modern kitchen. White walls and natural materials create a serene atmosphere.

Outside, the property includes a garden with native plants, a terrace with outdoor dining area, and a plunge pool. Located in a quiet area yet close to the charming village of Yaiza.`,
        
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
        ],
        
        tags: ["modern", "volcanic", "nature", "unique", "terrace", "garden", "quiet"],
        features: ["Volcanic Views", "Plunge Pool", "Garden", "Terrace", "Modern Design", "Quiet Location"],
        
        yearBuilt: 2017,
        contact: {
            phone: "+34 928 234 567",
            email: "lanzarote@estateai.com"
        }
    }
];


// =====================================================
// РЕГИОНЫ ИСПАНИИ (можете добавлять новые)
// =====================================================
const REGIONS = {
    'andalucia': {
        name: 'Andalucía',
        nameEs: 'Andalucía',
        nameSv: 'Andalusien',
        cities: ['Málaga', 'Sevilla', 'Granada', 'Marbella', 'Cádiz'],
        description: {
            en: 'Sunny beaches, flamenco, and historic cities',
            es: 'Playas soleadas, flamenco y ciudades históricas',
            sv: 'Soliga stränder, flamenco och historiska städer'
        }
    },
    'valencia': {
        name: 'Valencia',
        nameEs: 'Valencia',
        nameSv: 'Valencia',
        cities: ['Valencia', 'Alicante', 'Benidorm', 'Torrevieja'],
        description: {
            en: 'Beautiful Costa Blanca and vibrant cities',
            es: 'Hermosa Costa Blanca y ciudades vibrantes',
            sv: 'Vackra Costa Blanca och livliga städer'
        }
    },
    'cataluna': {
        name: 'Cataluña',
        nameEs: 'Cataluña',
        nameSv: 'Katalonien',
        cities: ['Barcelona', 'Girona', 'Tarragona', 'Sitges'],
        description: {
            en: 'Costa Brava, culture, and Mediterranean lifestyle',
            es: 'Costa Brava, cultura y estilo de vida mediterráneo',
            sv: 'Costa Brava, kultur och medelhavsliv'
        }
    },
    'murcia': {
        name: 'Murcia',
        nameEs: 'Murcia',
        nameSv: 'Murcia',
        cities: ['Murcia', 'Cartagena', 'La Manga'],
        description: {
            en: 'Costa Cálida with warm weather year-round',
            es: 'Costa Cálida con clima cálido todo el año',
            sv: 'Costa Cálida med varmt väder året runt'
        }
    },
    'baleares': {
        name: 'Balearic Islands',
        nameEs: 'Islas Baleares',
        nameSv: 'Balearerna',
        cities: ['Mallorca', 'Ibiza', 'Menorca', 'Formentera'],
        description: {
            en: 'Paradise islands with crystal-clear waters',
            es: 'Islas paradisíacas con aguas cristalinas',
            sv: 'Paradisöar med kristallklart vatten'
        }
    },
    'canarias': {
        name: 'Canary Islands',
        nameEs: 'Islas Canarias',
        nameSv: 'Kanarieöarna',
        cities: ['Tenerife', 'Gran Canaria', 'Lanzarote', 'Fuerteventura'],
        description: {
            en: 'Eternal spring with volcanic landscapes',
            es: 'Primavera eterna con paisajes volcánicos',
            sv: 'Evig vår med vulkaniska landskap'
        }
    }
};


// =====================================================
// ПОПУЛЯРНЫЕ ТЕГИ
// =====================================================
const POPULAR_TAGS = [
    { tag: "pool", icon: "fa-swimming-pool" },
    { tag: "sea-view", icon: "fa-water" },
    { tag: "beach", icon: "fa-umbrella-beach" },
    { tag: "luxury", icon: "fa-gem" },
    { tag: "modern", icon: "fa-cube" },
    { tag: "garden", icon: "fa-tree" },
    { tag: "terrace", icon: "fa-border-all" },
    { tag: "furnished", icon: "fa-couch" },
    { tag: "parking", icon: "fa-car" },
    { tag: "investment", icon: "fa-chart-line" }
];


// =====================================================
// ОПЦИИ ФИЛЬТРОВ
// =====================================================
const BUDGET_OPTIONS = [
    { id: 'budget-1', min: 0, max: 200000, label: 'Up to €200,000', labelEs: 'Hasta €200.000', labelSv: 'Upp till €200 000' },
    { id: 'budget-2', min: 200000, max: 400000, label: '€200,000 - €400,000', labelEs: '€200.000 - €400.000', labelSv: '€200 000 - €400 000' },
    { id: 'budget-3', min: 400000, max: 700000, label: '€400,000 - €700,000', labelEs: '€400.000 - €700.000', labelSv: '€400 000 - €700 000' },
    { id: 'budget-4', min: 700000, max: 1000000, label: '€700,000 - €1M', labelEs: '€700.000 - €1M', labelSv: '€700 000 - €1M' },
    { id: 'budget-5', min: 1000000, max: Infinity, label: 'Over €1 Million', labelEs: 'Más de €1 millón', labelSv: 'Över €1 miljon' }
];

const BEDROOM_OPTIONS = [
    { value: 1, label: '1 bedroom', labelEs: '1 habitación', labelSv: '1 sovrum' },
    { value: 2, label: '2 bedrooms', labelEs: '2 habitaciones', labelSv: '2 sovrum' },
    { value: 3, label: '3 bedrooms', labelEs: '3 habitaciones', labelSv: '3 sovrum' },
    { value: 4, label: '4+ bedrooms', labelEs: '4+ habitaciones', labelSv: '4+ sovrum' }
];

const PROPERTY_TYPES = [
    { id: 'apartment', icon: 'fa-building', label: 'Apartment', labelEs: 'Apartamento', labelSv: 'Lägenhet' },
    { id: 'house', icon: 'fa-home', label: 'House', labelEs: 'Casa', labelSv: 'Hus' },
    { id: 'villa', icon: 'fa-landmark', label: 'Villa', labelEs: 'Villa', labelSv: 'Villa' }
];