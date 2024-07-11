
const dogs = 
{"Corgi":"https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};



  // Creating the individual dogs links
export  const dogLinkCreator = (dogs) =>  {
  const dogLinks = [];
  const dogNames = Object.keys(dogs);

  // go through each of our dogs
  dogNames.forEach(dog => {

    // We want each link to be wrapped in an li so we create both
    const outerLi = document.createElement("li");
    const doglink = document.createElement("a");

    // set up our dog `a` tag with the name of the dog and the link 
    doglink.innerHTML = dog;
    doglink.href = dogs[dog];
    
    // add a class to the outer li so we can make it disappear
    outerLi.classList = 'dog-link';
  
    // put our `a` tag within our `li` tag
    outerLi.appendChild(doglink);

    // add the lis to an array which we'll use to append them each to the 'ul'
    dogLinks.push(outerLi);
  });
  return dogLinks;
};
  
// Attaching the dogs
export const attachDogLinks = () => {
  const dropDownList = document.querySelector(".drop-down-dog-list");
  const dogLinks = dogLinkCreator(dogs);
  dogLinks.forEach(link => dropDownList.appendChild(link));
};

attachDogLinks();

// add our open class
export const handleLeave = () => {
  const dogLinks = document.querySelectorAll(".dog-link");
  dogLinks.forEach(child => child.classList.remove('open'));
};

// add our close class
export const handleEnter = () => {
  const dogLinks = document.querySelectorAll(".dog-link");
  dogLinks.forEach(child => child.classList.add('open'));
};

// add the selector to the entire nav so that you can touch the dog links
// and the dropdown won't close 
const nav = document.querySelector(".drop-down-dog-nav");
nav.addEventListener('mouseenter', handleEnter);
nav.addEventListener('mouseleave', handleLeave);

