export async function GET(req) {
    const {
        searchParams
    } = new URL(req.url);
    const barcode = searchParams.get("barcode");

    try {
        const res = await fetch(`https://products-test-aci.onrender.com/product/${barcode}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        return Response.json(data, {
            status: 200
        });
    } catch (error) {
        return Response.json({
            error: error.message
        }, {
            status: 500
        });
    }
}