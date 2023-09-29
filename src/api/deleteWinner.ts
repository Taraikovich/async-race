export async function deleteWinner(carID: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${carID}`, {
        method: "DELETE",
    });
}