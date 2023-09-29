type Car = {
    name: string,
    color: string
};

type UpdatedCar = {
    id: number,
    name: string,
    color: string
};

export async function updateCar(carID: number, carObject: Car): Promise<UpdatedCar> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carObject),
    });
    return response.json();
}