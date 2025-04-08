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
              strings: ["@iehl", "u suck", "i love lil peep", "hi nistna"],
                typeSpeed: 35,
                backSpeed: 35,
                backDelay: 2000,
                startDelay: 500,
                loop: true,
                showCursor: false
              };
              var typed = new Typed(".description", options);
            });

          document.getElementById('copy-discord').addEventListener('click', function (e) {
            e.preventDefault();
        
            const discordTag = "iehl";
        
            navigator.clipboard.writeText(discordTag).then(() => {
              var hint = document.getElementById('hint')
              hint.style.opacity = 1
              setTimeout(() => {
                hint.style.opacity = 0
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });

          /*
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
  */

document.addEventListener('mousemove', function(e) {
  const tooltip = document.querySelector('.tooltip-1');
  
  // Update position to follow cursor
  tooltip.style.left = e.clientX + 'px';
  tooltip.style.top = e.clientY + 20 + 'px'; // Offset slightly below cursor
  
  // Remove the transform that was centering it
  tooltip.style.transform = 'none';
});

// To show/hide the tooltip when needed
function showTooltip() {
  const tooltip = document.querySelector('.tooltip');
  tooltip.style.opacity = '1';
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  tooltip.style.opacity = '0';
}

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const timelineContainer = document.getElementById('timelineContainer');
  const timelineProgress = document.getElementById('timelineProgress');
  const timeDisplay = document.getElementById('timeDisplay');
  
  let isDragging = false;
  
  // Format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  // Update timeline and time display
  function updateTimeline() {
    if (audio.duration) {
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      timelineProgress.style.width = `${progressPercentage}%`;
      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    }
  }
  
  // Handle position change based on mouse position
  function handlePositionChange(e) {
    const rect = timelineContainer.getBoundingClientRect();
    let clickPosition = (e.clientX - rect.left) / rect.width;
    
    // Clamp the value between 0 and 1
    clickPosition = Math.max(0, Math.min(1, clickPosition));
    
    audio.currentTime = clickPosition * audio.duration;
    updateTimeline();
  }
  
  // Handle play/pause
  playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '\u23F8';
    } else {
      audio.pause();
      playPauseBtn.textContent = '⏵';
    }
  });
  
  // Handle timeline click
  timelineContainer.addEventListener('click', function(e) {
    handlePositionChange(e);
  });
  
  // Handle mouse down on timeline
  timelineContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    handlePositionChange(e);
    
    // Prevent text selection during dragging
    e.preventDefault();
  });
  
  // Handle mouse movement while dragging
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      handlePositionChange(e);
    }
  });
  
  // Handle mouse up (end dragging)
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  
  // Update timeline during playback
  audio.addEventListener('timeupdate', updateTimeline);
  
  // Set initial state when metadata is loaded
  audio.addEventListener('loadedmetadata', function() {
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });
  
  // Handle audio end
  audio.addEventListener('ended', function() {
    playPauseBtn.textContent = '⏵';
    audio.currentTime = 0;
    updateTimeline();
  });
});