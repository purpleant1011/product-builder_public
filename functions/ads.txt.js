export async function onRequest(context) {
    // google.com, pub-6100551786781834, DIRECT, f08c47fec0942fa0
    const adsTxtContent = "google.com, pub-6100551786781834, DIRECT, f08c47fec0942fa0";

    return new Response(adsTxtContent, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*"
        }
    });
}
