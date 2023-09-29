type Car = {
    name: string,
    color: string
};

type NewCar = {
    id: number
    name: string,
    color: string
};

export async function createCar(carObject: Car): Promise<NewCar> {
    const response = await fetch('http://127.0.0.1:3000/garage', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carObject),
    });
    return response.json();
}

