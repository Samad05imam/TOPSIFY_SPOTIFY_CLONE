console.log("Let's write Javascript");
let currentSong = new Audio();
let songs;
let songul;
let currfolder;

function convertSecondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currfolder = folder;
    try {
        // Fetch data from the local server
        let response = await fetch(`https://vd1k00hr-5500.inc1.devtunnels.ms/${folder}/`);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Get the text content of the response (HTML)
        let data = await response.text();

        // Create a div element and set its innerHTML to the fetched response
        let div = document.createElement("div");
        div.innerHTML = data;

        // Get all the 'a' tags from the response
        let as = div.getElementsByTagName("a");

        // Initialize an array to hold the song links
        let songs = [];

        // Loop through the 'a' tags and find the ones ending with '.mp3'
        for (let i = 0; i < as.length; i++) {
            const element = as[i];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href.split(`/${folder}/`)[1]); // Extract song names/links
            }
        }

        // Return the list of songs
        return songs;
    } catch (error) {
        // Handle any errors that occur during the fetch or processing
        console.error("Error:", error);
    }
}

const PlayMusic = (track, pause = false) => {
    
    play.src = "photo/pause.svg";
    currentSong.src = `https://vd1k00hr-5500.inc1.devtunnels.ms/${currfolder}/${track}`;
    
    if (!pause) {
        currentSong.play();
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main(item) {
    
    play.src = "photo/pause.svg";
    // Get the list of songs  
    songs = await getSongs(`songs/${item}`);
    PlayMusic(songs[0]);

    // Get the UL element where the songs will be listed
    songul = document.querySelector(".songList").getElementsByTagName("ul")[0];

    // Loop through the songs and append them to the list
    for (const song of songs) {
        // Replace all occurrences of '%20' with space in the song name
        let songName = song.replace(/%20/g, " ");

        songul.innerHTML += `
            <li>
                <img class="invert" src="photo/music.svg" alt="">
                <div class="info">
                    <div>${songName}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img  src="photo/play.svg" alt="">
                </div>
            </li>`;
    }

    // Add event listener to each song item
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            let songName = e.querySelector(".info").firstElementChild.innerHTML;
            console.log("Playing song:", songName);
            play.src = "photo/pause.svg";
            PlayMusic(songName);  // Pass the correct song name to PlayMusic function
        });
    });    
}

main("ncs");

// 1. play
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "photo/pause.svg";
    } else {
        currentSong.pause();
        play.src = "photo/play.svg";
    }
});

// 2. previous
previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) PlayMusic(songs[index - 1]);
    if(index-1<0) PlayMusic(songs[songs.length-1]);
});

// 3. next
next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) PlayMusic(songs[index + 1]);
    if(index+1===songs.length) PlayMusic(songs[0]);
});

if (currentSong.currentTime === currentSong.duration) {
    play.src = "photo/play.svg";
}

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutesSeconds(currentSong.currentTime)}/${convertSecondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
});

document.querySelector(".seekbar").addEventListener("click", e => {
    let perc = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = perc + "%";
    currentSong.currentTime = (currentSong.duration * perc) / 100;
});

document.querySelector(".hambuger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change" ,(e)=>{
    // console.log(e,e.target ,e.target.value);
    currentSong.volume = parseInt(e.target.value)/100;
})

// // load the playlist whenever Album-Aye_Dil_Hai_Mushkil is clicked
document.querySelector(".album-Pritam").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Aye Dil Hai Mushkil";
    songul.innerHTML="";
    main("Pritam1")
})
// // load the playlist whenever album-Glory is clicked
document.querySelector(".album-Glory").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Glory";
    songul.innerHTML="";
    main("Glory")
})
// // load the playlist whenever album-Best_of_Rahaman is clicked
document.querySelector(".album-Rahaman").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Rahaman's Best Songs";
    songul.innerHTML="";
    main("Rahaman1")
})
// // load the playlist whenever Album-tulsi is clicked
document.querySelector(".album-Tulsi").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Massakkali 2.O";
    songul.innerHTML="";
    main("Tulsi")
})
// load the playlist whenever album-Arijit is clicked
document.querySelector(".album-Arijit").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Arijit's best songs";
    songul.innerHTML="";
    main("Arijit1")
})
// load the playlist whenever album-Ghajani is clicked
document.querySelector(".album-Ghajani").addEventListener("click" ,()=>{
    document.querySelector(".Left-below-heading").innerText="Ghajani Playlist";
    songul.innerHTML="";
    main("Ghajani")
})

// Simplify the event listeners for artist buttons
const artistButtons = [
    { artist: "Pritam", element: ".artist-Pritam" },
    { artist: "Honey", element: ".artist-Honey" },
    { artist: "Rahaman", element: ".artist-Rahaman" },
    { artist: "Mohit", element: ".artist-Mohit" },
    { artist: "Arijit", element: ".artist-Arijit" },
    { artist: "Javed", element: ".artist-Javed" }
  ];
  
  // Loop through all artist buttons and add event listeners
  artistButtons.forEach(({ artist, element }) => {
    const artistElement = document.querySelector(element);
    
    if (artistElement) { // Check if the element exists before adding event listener
      artistElement.addEventListener("click", () => {
        document.querySelector(".Left-below-heading").innerText = `${artist}'s Playlist`;
        songul.innerHTML = ""; // Clear previous songs list before loading new songs
  
        // Fetch and display the songs for the clicked artist
        main(artist);
      });
    }
  });



// // Simplify the event listeners for album buttons
// const albumButtons = [
//     { album: "Pritam1", element: ".album-Pritam" },
//     { album: "Honey1", element: ".album-Honey" },
//     { album: "Rahaman1", element: ".album-Rahaman" },
//     { album: "Mohit1", element: ".album-Mohit" },
//     { album: "Arijit1", element: ".album-Arijit" },
//     { album: "Javed1", element: ".album-Javed" }
//   ];
  
//   // Loop through all album buttons and add event listeners
//   albumButtons.forEach(({ album, element }) => {
//     const albumElement = document.querySelector(element);
    
//     if (albumElement) { // Check if the element exists before adding event listener
//       albumElement.addEventListener("click", () => {
//         document.querySelector(".Left-below-heading").innerText = `${album}'s Aye Dil Hai Mushkil Album`;
//         songul.innerHTML = ""; // Clear previous songs list before loading new songs
  
//         // Fetch and display the songs for the clicked album
//         main(album);
//       });
//     }
//   });
document.querySelector(".volume>img").addEventListener("click" , e=>{
    if(e.target.src.includes("photo/volume.svg")){
        e.target.src=e.target.src.replace("photo/volume.svg","photo/mute.svg");
        currentSong.volume=0;
        document.querySelector(".range").getElementsByTagName("input")[0].value=0;
    }else{
        e.target.src=e.target.src.replace("photo/mute.svg","photo/volume.svg");
        currentSong.volume=.5;
        document.querySelector(".range").getElementsByTagName("input")[0].value=50;
    }
})