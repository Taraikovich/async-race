export async function deleteCar(carID: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${carID}`, {
        method: "DELETE",
    });
}
