export const baseUrl = "http://localhost:8080/api"
export async function fetchData(url: string) {
    if (typeof window === "undefined") {
        // SSR (Server-side Fetching)
        const res = await fetch(url,
            {
                method: 'GET',
                headers: { 
                    // 'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!res.ok) throw new Error(`Failed to fetch: ${url}`)
        return res.json()
    } else {
        // CSR (Client-side Fetching)
        return fetch(url,
            {
                method: 'GET',
                headers: { 
                    // 'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        ).then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${url}`)
        return res.json()
        })
    }
}