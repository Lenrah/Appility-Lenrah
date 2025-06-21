
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
                    "Authorization": "Bearer YOUR_OPENAI_API_KEY"
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
                    "Authorization": "Bearer YOUR_RUNWAY_API_KEY"
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
