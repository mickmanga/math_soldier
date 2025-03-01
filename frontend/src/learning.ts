import { AnimationType, DefaultCharacter, launchAnimation, learningGodAnimations, LearningGodCharacterStates } from "./challenge";

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
        console.log('data:', knowledgeData); // Replace with your handling logic

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
        }, 900
    )
}

let diffBetweenFrames = 0;


const launchGodFootsteps = () => {
    const godStepsAudio = document.getElementById("god_steps")! as HTMLAudioElement;
    godStepsAudio.play();
}

window.onload = () => {
    setTimeout(
        launchLearningGod, 6000
    );
}

const launchLearningGod = () => {
    
  const heroContainer = document.getElementById("hero_container")!;
  heroContainer.style.height = "7.5vh";

    launchGodFootsteps();
   setTimeout(
    () => {  
      const godSongAudio = document.getElementById("god_song")! as HTMLAudioElement;
      godSongAudio.play();

      setTimeout(
        () => {

            setTimeout(
                () => {

                 const godTalking = document.getElementById("god_talking")! as HTMLAudioElement;
                 godTalking.play();

            
                }, 2000
            )
         
        }, 11500
      )

    }, 5000
   )

    setTimeout(
        () => { 
           launchMonsterAnimation();
           moveLearningGod();
        }, 10000
    )

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


const moveLearningGod = () => {

    const learningGodLeft = learningGodContainer.getBoundingClientRect().left;

    if(learningGodLeft <= (window.innerWidth* 0.74)){
        launchAnimation(learningGodCharacter, AnimationType.idle,  )
        return;
    }

    learningGodContainer.style.left = `${learningGodLeft- 1}px`;


    requestAnimationFrame(
        moveLearningGod
    )
}
