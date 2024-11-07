function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const overlay = document.getElementById('overlay');
      const audio = document.getElementById('myAudio');
      const overlay_text = document.getElementById('overlay_text');
      overlay.addEventListener('click', function() {
            overlay.style.backdropFilter = 'blur(0)';
            overlay.style.opacity = '0';
            overlay_text.style.opacity = '0'
            setTimeout(() => {
              overlay.style.display = 'none';
              audio.play();
            }, 300);
            var options = {
              strings: ["77 Legacy", "u suck", "lil peep <3", "its a trap"],
                typeSpeed: 35,
                backSpeed: 35,
                backDelay: 2000,
                startDelay: 500,
                loop: true,
                showCursor: false
              };
              var typed = new Typed(".description", options);
            });

          function copyDiscord() {
            const discordID = "99906";
            navigator.clipboard.writeText(discordID);
            var hint = document.getElementById('hint')
            hint.style.opacity = 1
            setTimeout(() => {
              hint.style.opacity = 0
            }, 2000);
          }
          const canvas = document.getElementById('canv');
          const ctx = canvas.getContext('2d');
          const w = canvas.width = document.body.offsetWidth;
          const h = canvas.height = document.body.offsetHeight;
          const cols = Math.floor(w / 20) + 1;
          const ypos = Array(cols).fill(0); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(0, 0, w, h);

          function matrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, .14)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#fff';
            ctx.font = '12pt monospace';
            ypos.forEach((y, ind) => {
              const randomOffset = Math.floor(Math.random() * 20902);
              const charCode = 0x4E00 + randomOffset;
              const text = String.fromCharCode(charCode);
              const x = ind * 20;
              ctx.shadowColor = 'rgba(255, 255, 255, 1)';
              ctx.shadowBlur = 32;
              ctx.fillText(text, x, y)
              ctx.shadowBlur = 0;
              if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
              else ypos[ind] = y + 20;
            });
          }
          setInterval(matrix, 50); 

async function getCryptoPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

addEventListener("DOMContentLoaded", (event) => {
  var audio = document.getElementById("myAudio");
  var btc = document.getElementById("text-bitcoin");
  var eth = document.getElementById("text-ethereum");
  audio.volume = 0.2;
  getCryptoPrices().then((data)=>{
    btc.textContent = `$${formatNumberWithCommas(data["bitcoin"]["usd"])}`
    eth.textContent = `$${formatNumberWithCommas(data["ethereum"]["usd"])}`
  })
  
})