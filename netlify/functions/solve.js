exports.handler = async (event) => {
  const reply = (answer) => ({
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ answer })
  });

  try {
    const { url } = JSON.parse(event.body || "{}");
    if (!url) return reply("Hãy dán link bài tập.");

    const html = await (await fetch(url)).text();
    const text = html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 12000);

    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "Bạn là gia sư. Tìm đề bài trong nội dung trang, giải từng bước, ngắn gọn, bằng tiếng Việt." }]
          },
          contents: [{ parts: [{ text }] }]
        })
      }
    );
    const d = await r.json();
    const out = d.candidates && d.candidates[0].content.parts[0].text;
    return reply(out || JSON.stringify(d));
  } catch (e) {
    return reply("Lỗi: " + e.message);
  }
};
