const carBrands = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Koenigsegg",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Pagani",
    "Porsche",
    "Ram",
    "Rolls-Royce",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
];

const carModels = [
    "ILX", "MDX", "RDX", "TLX",
    "Giulia", "Stelvio",
    "DB11", "DBS Superleggera", "Vantage",
    "A3", "A4", "A6", "Q5", "Q7", "R8",
    "Bentayga", "Continental GT", "Flying Spur",
    "3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "Z4",
    "Chiron", "Divo",
    "Enclave", "Encore", "Envision",
    "Escalade", "XT5", "XT6",
    "Camaro", "Equinox", "Silverado", "Suburban", "Tahoe", "Traverse",
];

function getRandom(arr: string[]): string {
    const number = Math.floor(Math.random() * ((arr.length - 1) + 1));
    return arr[number];
}

export function getRandomCarName(): string {
    return `${getRandom(carBrands)} ${getRandom(carModels)}`;
}