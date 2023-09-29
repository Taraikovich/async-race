export type Winners = {
    id: number,
    wins: number,
    time: number
};

export async function getWinner(id: number): Promise<Winners> {
    const res = await fetch(`http://127.0.0.1:3000/winners/${id}`);
    const data = await res.json();
    return data
}