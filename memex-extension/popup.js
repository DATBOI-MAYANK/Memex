const btn = document.getElementById("saveBtn");

btn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("inside addEventListener");
  const res = await fetch("http://localhost:3001/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: tab.title,
      url: tab.url,
      type: "article",
    }),
  });
  console.log("res", res);
});
