
document.getElementById("aiForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const desc = document.getElementById("description").value;
    const quality = document.getElementById("quality").value;
    const type = document.getElementById("type").value;
    const resultDiv = document.getElementById("result");
    const downloadDiv = document.getElementById("download");

    resultDiv.innerHTML = "<p>جارٍ إنشاء " + (type === "image" ? "الصورة" : "الفيديو") + "...</p>";
    downloadDiv.innerHTML = "";

    if (type === "image") {
        let size = "512x512";
        if (quality === "low") size = "256x256";
        if (quality === "high") size = "1024x1024";

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${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}`
                },
                body: JSON.stringify({
                    prompt: desc,
                    n: 1,
                    size: size
                })
            });

            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const imgUrl = data.data[0].url;
                resultDiv.innerHTML = "<img src='" + imgUrl + "' alt='نتيجة الذكاء الاصطناعي' style='max-width:100%;border-radius:8px;'>";
                downloadDiv.innerHTML = "<a href='" + imgUrl + "' download class='download-btn'>⬇️ تحميل الصورة</a>";
            } else {
                resultDiv.innerHTML = "<p>لم يتم استلام صورة.</p>";
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = "<p>حدث خطأ أثناء الاتصال بـ OpenAI.</p>";
        }
    } else if (type === "video") {
        try {
            const response = await fetch("https://api.runwayml.com/v1/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key_c2cfa3a288d294c1088cf2752dcc1184eeaae2d2d47a5cf2e93fa888d25e8aae424f4cb39c250f9a00691c76b81cbe82b65a9efff8ed2d7aaba27d15f2dcb55c}`
                },
                body: JSON.stringify({
                    prompt: desc,
                    quality: quality
                })
            });

            const data = await response.json();
            if (data.video_url) {
                resultDiv.innerHTML = "<video controls style='max-width:100%;border-radius:8px;'><source src='" + data.video_url + "' type='video/mp4'>فيديو غير مدعوم</video>";
                downloadDiv.innerHTML = "<a href='" + data.video_url + "' download class='download-btn'>⬇️ تحميل الفيديو</a>";
            } else {
                resultDiv.innerHTML = "<p>لم يتم استلام فيديو.</p>";
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = "<p>حدث خطأ أثناء الاتصال بـ RunwayML.</p>";
        }
    }
});
