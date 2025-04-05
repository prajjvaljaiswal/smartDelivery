
export async function apiRequest(url: string, method = "GET", body : any | null) {
    try {
        const options: RequestInit = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (body) {
            options.body = JSON.stringify(body);
            // console.log(body)
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error: Error | any) {
        console.error("API request failed:", error);
        return { success: false, message: error.message };
    }
}
