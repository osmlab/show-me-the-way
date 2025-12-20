export const cities = [
    // North America
    { name: 'New York', landmark: 'Times Square', center: [-73.9855, 40.7580] },
    { name: 'San Francisco', landmark: 'Golden Gate Bridge', center: [-122.4783, 37.8199] },
    { name: 'Mexico City', landmark: 'Zócalo', center: [-99.1332, 19.4326] },
    { name: 'Toronto', landmark: 'CN Tower', center: [-79.3871, 43.6426] },
    { name: 'Vancouver', landmark: 'Canada Place', center: [-123.1139, 49.2888] },

    // South America
    { name: 'Rio de Janeiro', landmark: 'Christ the Redeemer', center: [-43.2105, -22.9519] },
    { name: 'Buenos Aires', landmark: 'Obelisco', center: [-58.3816, -34.6037] },
    { name: 'Lima', landmark: 'Plaza Mayor', center: [-77.0282, -12.0464] },

    // Europe
    { name: 'London', landmark: 'Big Ben', center: [-0.1246, 51.5007] },
    { name: 'Paris', landmark: 'Eiffel Tower', center: [2.2945, 48.8584] },
    { name: 'Rome', landmark: 'Colosseum', center: [12.4924, 41.8902] },
    { name: 'Berlin', landmark: 'Brandenburg Gate', center: [13.3777, 52.5163] },
    { name: 'Barcelona', landmark: 'Sagrada Família', center: [2.1744, 41.4036] },
    { name: 'Amsterdam', landmark: 'Dam Square', center: [4.8952, 52.3676] },

    // Eastern Europe & Russia
    { name: 'Moscow', landmark: 'Red Square', center: [37.6173, 55.7539] },
    { name: 'Istanbul', landmark: 'Hagia Sophia', center: [28.9784, 41.0082] },

    // Africa
    { name: 'Cairo', landmark: 'Great Pyramid of Giza', center: [31.1342, 29.9792] },
    { name: 'Cape Town', landmark: 'Table Mountain', center: [18.4241, -33.9628] },
    { name: 'Marrakech', landmark: 'Jemaa el-Fnaa', center: [-7.9811, 31.6295] },

    // Middle East & Asia
    { name: 'Dubai', landmark: 'Burj Khalifa', center: [55.2744, 25.1972] },
    { name: 'Mumbai', landmark: 'Gateway of India', center: [72.8347, 18.9220] },
    { name: 'Bangkok', landmark: 'Grand Palace', center: [100.4913, 13.7500] },
    { name: 'Singapore', landmark: 'Marina Bay Sands', center: [103.8610, 1.2834] },
    { name: 'Tokyo', landmark: 'Shibuya Crossing', center: [139.7016, 35.6595] },
    { name: 'Beijing', landmark: 'Forbidden City', center: [116.3972, 39.9169] },
    { name: 'Seoul', landmark: 'Gyeongbokgung Palace', center: [126.9770, 37.5796] },

    // Oceania
    { name: 'Sydney', landmark: 'Sydney Opera House', center: [151.2153, -33.8568] },
    { name: 'Auckland', landmark: 'Sky Tower', center: [174.7633, -36.8485] }
];

export function getRandomCity() {
    return cities[Math.floor(Math.random() * cities.length)];
}
