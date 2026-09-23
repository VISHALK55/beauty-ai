const payload = {
    campaignType: "single",
    salonIds: ["pihu-makeover"],
    dailyBudget: 500,
    durationDays: 1,
    customPrompt: "Admission in parlour showing 50% discount"
};

fetch("https://api.beautyai.makeup/api/v1/salons/ads/launch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
