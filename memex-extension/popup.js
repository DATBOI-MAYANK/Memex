import "dotenv/config";
const btn = document.getElementById("saveBtn");
btn.addEventListener("click", async () => {
  const type =
    document.querySelector('input[name="type"]:checked')?.value || "article";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("inside addEventListener");
  const res = await fetch(`${process.env.API_URL}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: tab.title,
      url: tab.url,
      type: type,
    }),
  });
  console.log("res", res);
});
