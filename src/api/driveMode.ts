export async function driveMode(carid: string): Promise<{string: string} | string> {
    try {
        const response = await fetch(`http://127.0.0.1:3000/engine?id=${carid}&status=drive`, {
            method: "PATCH"
        });

        if (!response.ok) {
            throw new Error('Ошибка при запросе: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return 'engine stopped'
    }
}

