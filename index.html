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

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 600,
        system: "Bạn là gia sư. Tìm đề bài trong nội dung trang, giải từng bước, ngắn gọn, bằng tiếng Việt.",
        messages: [{ role: "user", content: text }]
      })
    });
    const d = await r.json();
    return reply(d.content ? d.content[0].text : JSON.stringify(d));
  } catch (e) {
    return reply("Lỗi: " + e.message);
  }
};
