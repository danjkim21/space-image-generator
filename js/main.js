//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

// create event listener when clicking button
document.querySelector('button').addEventListener('click', getPictureOfTheDay);

function getPictureOfTheDay() {
  // set date to user selected
  let date = document.querySelector('input').value;

  // requesting data from a server via a URL API and specifying specific image date in the url
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=1a3gGVcYGA19BfITQHuUIjIz00FnSpe12dqV3EKh&date=${date}`
  )
    // parse response as JSON
    .then((res) => res.json())
    .then((data) => {
      // console log the object
      console.log(data);

      // Conditional if there is a image title
      if (!data.title) {
        document.querySelector('h1').innerHTML = '';
      } else {
        // change h2 to title of image
        document.querySelector('h1').innerHTML = data.title;
        // add image title to description title
        document.querySelector('.imgTitle').innerHTML = data.title;
      }

      // add date to explanation
      document.querySelector('.dateHere').innerHTML = data.date;
      // add description to explanation
      document.querySelector('.explanation').innerHTML = data.explanation;
      // add link to href of full image button
      document.querySelector('.getImgBtn').href = data.hdurl;

      document.querySelector('.description').classList.remove('hidden');
      document.querySelector('.teaser').classList.remove('hidden');

      // Conditional if there is a copyright person
      if (!data.copyright) {
        document.querySelector('.copyright').innerHTML = '';
      } else {
        // add copyright description to copyright
        document.querySelector('.copyright').innerHTML = data.copyright;
      }

      // Conditional for different media inputs (Images vs Videos)
      if (data.media_type === 'image') {
        // document.getElementById("myDiv").style.backgroundImage = "url('img_tree.png')";
        document.querySelector('main').style.backgroundImage = `url('${data.url}')`;
        // document.querySelector('img').src = data.hdurl;
        // document.querySelector('iframe').src = '';
        
      } else if (data.media_type === 'video') {
        document.querySelector('.videoContainer').classList.remove('hidden');
        // document.querySelector('iframe').src = data.url;
        document.querySelector('.videoContainer').innerHTML = `<iframe class="iframe" src="${data.url}" frameborder="0"></iframe>`;

        // document.querySelector('img').src = '';
      }
    })

    // promise
    .catch((err) => console.log(`error ${err}`));
}
