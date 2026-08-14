export let prevoiusHis = JSON.parse(localStorage.getItem("previousHis")) || [];

export function dateCalc() {
  const now = new Date();
  const dateOptions = { day: "numeric", month: "long" };
  const dateString = new Intl.DateTimeFormat("en-US", dateOptions).format(now);
  return dateString;
}

export function timeCalc() {
  const now = new Date();
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const timeString = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
  return timeString;
}

export function hisGenHTML() {
  let html = "";
  if (prevoiusHis.length === 0) {
    return html;
  } else {
    prevoiusHis.forEach((card) => {
      html += `
  <li>
      <p class="hissss">${card.result}</p>
    <div class="his-moves-container">
      Your Move
      <span class="small-img"
        ><img src="./Assests/${card.userMove}.png" alt=""
      /></span>

      CPU Move
      <span class="small-img"
        ><img src="./Assests/${card.computerMove}.png" alt=""
      /></span>
    </div>

    <div class="his-time">Date - ${card.date} | Time - ${card.time}</div>
  </li>
    `;
    });

    return html;
  }
}
