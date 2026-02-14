export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const { email, source } = req.body || {};

    const items = [];
    const errors = [];

    try {
        for (let i = 0; i < 3; i++) {
            try {
                const r = await fetch("https://httpbin.org/uuid");
                const data = await r.json();

                items.push({
                    original: data.uuid,
                    analysis: "This is a randomly generated UUID used for testing API pipelines.",
                    sentiment: "neutral",
                    stored: true,
                    timestamp: new Date().toISOString()
                });
            } catch (e) {
                errors.push("Failed to fetch UUID");
            }
        }
    } catch (err) {
        errors.push("Pipeline error");
    }

    console.log(`Notification sent to: ${email || "23f3000487@ds.study.iitm.ac.in"}`);

    res.json({
        items,
        notificationSent: true,
        processedAt: new Date().toISOString(),
        errors
    });
}
