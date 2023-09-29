export type Winner = {
    id?: number,
    wins: number,
    time: number
};


export async function updateWinner(carID: number, winnerObject: Winner): Promise<Winner> {
    const response = await fetch(`http://127.0.0.1:3000/winners/${carID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(winnerObject),
    });
    return response.json();
}