import { AnimationType, ASSETS_PATH_BASE, DefaultCharacter, heroCharacter, launchAnimation, learningGodAnimations, LearningGodCharacterStates } from "./challenge";

interface Window {
  openap: (event: Event) => void;
  hideSideBar: (event: Event) => void;
  displaySideBar: (event: Event) => void;
}

const openMap = (event: Event) => {
  window.location.replace("http://localhost:3001/new_world");
}

const learningGodContainer = document.getElementById("learning_god_container")!;
const learningGodImg = document.getElementById("learningGodImg")! as HTMLImageElement;
const learningGodCharacter = new DefaultCharacter(learningGodImg, LearningGodCharacterStates.idle, learningGodAnimations); 

const hideSideBar = (event: Event) => {
  document.getElementById("course_container_ab_back_left_button")!.style.display = "flex";
  document.getElementById("course_container_ab_wrapper")!.style.display = "none";
  document.getElementById("course_container_a")!.style.width = "0";
  document.getElementById("course_container_aa")!.style.display = "none";
}

const displaySideBar = (event: Event) => {
  document.getElementById("course_container_ab_back_left_button")!.style.display = "none";
  document.getElementById("course_container_ab_wrapper")!.style.display = "flex";
  document.getElementById("course_container_a")!.style.width = "50%";
  document.getElementById("course_container_aa")!.style.display = "flex";
}

window.openMap = openMap;
window.hideSideBar = hideSideBar;
window.displaySideBar = displaySideBar;

const getUser = async (userId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);

        // Check if the response is successful (status code in the 2xx range)
        if (!response.ok) {
            // The request was made, but the server responded with a status code that falls outside the 2xx range
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON from the response
        const user = await response.json();

        // Log the user or return it
        console.log(user);

        return user;  // Return user for further use if needed
    } catch (error) {
        // Handle any errors that occur during fetch or parsing
        console.error("Failed to fetch the user:", error);
    }
};


const getChapters = async () => {
    try {
        const courseContainer = document.getElementById("course_container_b")!;

        const response = await fetch('http://localhost:3000/api/chapters/677e814577322467895fd23e', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch chapters');
        }
        
        const knowledgeData = await response.json() as Array<any>;

        knowledgeData.forEach(
            data => {
                console.log(data);
                courseContainer.innerHTML = courseContainer?.innerHTML + data.data;
            }
        )
    
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("keydown", 
    (event) => {
        if(event.key === "g"){
            openCourse();
        }
    }
)

const openCourse = () => {
    launchAnimation(learningGodCharacter, AnimationType.open_course, false);

    setTimeout(
        () =>  {
            document.getElementById("interface_container")!.style.opacity = "1";
            
  const letterBoxTop = document.getElementById("letterBoxTop")!;
  const letterBoxBottom = document.getElementById("letterBoxBottom")!;

  letterBoxTop.style.display = "none";
  letterBoxBottom.style.display = "none";
        }, 900
    )
};

const diminishAudio = (audioElement: HTMLAudioElement) => {

    if(audioElement.volume > 0){
        audioElement.volume -= 0.01;
    }

  requestAnimationFrame( () => diminishAudio(audioElement));

}

const launchGodFootsteps = () => {
    const godStepsAudio = document.getElementById("god_steps")! as HTMLAudioElement;
    godStepsAudio.play();

    setTimeout(
        () => {
        
         const earthquakeAudio = document.getElementById("earthquake")! as HTMLAudioElement;
           earthquakeAudio.play();


           setTimeout(
            () => {
                launchMonsterAnimation();
                 moveLearningGod(Date.now()); 
                //diminishAudio(earthquakeAudio);
                const godStepsFast = document.getElementById("god_steps_fast")! as HTMLAudioElement;
                godStepsFast.volume = 0.45;
                godStepsFast.playbackRate = 1;
                godStepsFast.play();

            }, 6000
           );

           
    setTimeout(
        () => {
        
         const godSongAudio = document.getElementById("god_song")! as HTMLAudioElement;
           godSongAudio.play();
             
        }, 1000
    )



             
        }, 11500
    )



}



window.onload = () => {
    setTimeout(
        () => {
            launchAnimation(heroCharacter, AnimationType.death, false);

            setTimeout(
                () => {
                    heroCharacter.element.src = ASSETS_PATH_BASE + "/characters/hero/idle/1.png";
                }, 320);

        }, 1000
    )

    
    setTimeout(
        launchLearningGod
        , 6000
    );

}

const launchLearningGod = () => {
    
  const heroContainer = document.getElementById("hero_container")!;
  heroContainer.style.height = "7.5vh";

  const letterBoxTop = document.getElementById("letterBoxTop")!;
  const letterBoxBottom = document.getElementById("letterBoxBottom")!;

  letterBoxTop.style.display = "flex";
  letterBoxBottom.style.display = "flex";

   launchGodFootsteps();

}

const launchMonsterAnimation = () => {
  launchAnimation(learningGodCharacter, AnimationType.walk_left);
} 

document.addEventListener('keydown', (event) => {

    if(event.key === "l"){
        const response = confirm("voulez vous quitter le monde de Gor, le dieu des Lys?");

        if(response){
           window.location.replace("http://localhost:3001/world");
        }
    }
});

let songLaunched = false;

let initialTimeStamp = 0;

const moveLearningGod = (initialTS?: number) => {

    const learningGodLeft = learningGodContainer.getBoundingClientRect().left;

    if(initialTS){
        initialTimeStamp = initialTS;
    }

    if(learningGodLeft <= (window.innerWidth* 0.7)){
        launchAnimation(learningGodCharacter, AnimationType.idle);
        const godStepsFast = document.getElementById("god_steps_fast")! as HTMLAudioElement;
        godStepsFast.pause();


             
        setTimeout(
            () => {

           const godSongAudio2 = document.getElementById("learning_god")! as HTMLAudioElement;
           godSongAudio2.play();
                
              setTimeout(
                () => {
                    const godTalking = document.getElementById("god_talking")! as HTMLAudioElement;
                    godTalking.play();
                }, 3500
              )
            }, 3500
        )

         setTimeout(
            () => {
              //  launchAnimation(heroCharacter, AnimationType.teleportation);
                
               // setTimeout(
                  //  () => {
                      //  window.location.replace(
                        //    "http://localhost:3001/challenge"
                        //)
                    //},4000
                //)
                
            },3000)
        return;
    }

    learningGodContainer.style.left = `${learningGodLeft- 0.8}px`;
    requestAnimationFrame(moveLearningGod);
}
