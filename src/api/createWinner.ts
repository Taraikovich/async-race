export type NewWinner = {
    id: number,
    wins: number,
    time: number
};


export async function createWinner(winnerObject: NewWinner): Promise<NewWinner> {
    const response = await fetch(`http://127.0.0.1:3000/winners/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(winnerObject),
    });
    return response.json();
}