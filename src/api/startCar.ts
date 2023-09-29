type Res = {
    distance: number,
    velocity: number
}

export async function startCarEngin(carid: string, action: string): Promise<number> {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${carid}&status=${action}`, {
        method: "PATCH"
    });
    const data: Res = await response.json();
    const time = Number((data.distance / data.velocity / 1000).toFixed(2));
    return time;
}