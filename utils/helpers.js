//consider different name

const helpers = {
    getArrowIcon: (latest, previous) => {
        if (latest > previous) {
            return '<i class="bi bi-arrow-up-right h3"></i>';
        } else if (latest < previous) {
            return '<i class="bi bi-arrow-down-right h3"></i>';
        } else if (latest == null){
            return '';
        } else {
            return '<i class="bi bi-arrow-right h3"></i>';
        }
    },
    getWeatherIcon: (weatherCode) => {
        if (weatherCode) {
            const icons = {
                200: '<i class="bi bi-cloud-lightning-rain h3"></i>',
                300: '<i class="bi bi-cloud-drizzle h3"></i>',
                500: '<i class="bi bi-cloud-rain h3"></i>',
                600: '<i class="bi bi-cloud-snow h3"></i>',
                700: '<i class="bi bi-cloud-haze h3"></i>',
                800: '<i class="bi bi-sun h3"></i>',
                801: '<i class="bi bi-cloud-sun h3"></i>'
            };
            return icons[weatherCode];
        }
    },
    getWindDirection: (windDirection) => {
        const directions = [
            "Norden", "Nordosten", "Osten", "Südosten",
            "Süden", "Südwesten", "Westen", "Nordwesten"
        ];
    
        const index = Math.round(((windDirection % 360) / 45)) % 8;
        const direction = directions[index];
    
        return `<span>${direction}</span>`;
    },
    getWeatherCondition: (weatherCode) =>{
        const conditions = {
            200: 'Gewitter',
            300: 'Niesel',
            500: 'Regen',
            600: 'Schnee',
            700: 'Nebel',
            800: 'Sonnenschein',
            801: 'Bewölkt'
        };
        return conditions[weatherCode];
    }
};
module.exports = helpers;