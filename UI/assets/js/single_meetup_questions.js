const question = document.getElementById('question');



const showOverlay = () => {
  document.querySelector('.loading').style.display = 'block';
};

const hideOverlay = () => {
  document.querySelector('.loading').style.display = 'none';
};

const getMeetupId = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const meetupId = url.searchParams.get('id');

  return meetupId;
};
const {
  body,
} = window.document;

const convertDate = (createdon) => {
  const dateObject = new Date(createdon);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  }).format(dateObject);

  return formattedDate;
};

const getSingleMeetup = async () => {
  const meetupId = getMeetupId();
  const singleMeetupApiUrl = `https://enigmatic-refuge-95413.herokuapp.com/api/v1/meetups/${meetupId}`;
  showOverlay();



  let userToken;
  if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    const {
      token,
    } = userData;

    userToken = token;
  }


  await fetch(singleMeetupApiUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })
    .then(res => res.json())
    .then((response) => {
      hideOverlay();

      // check for success status
      if (response.status === 200) {
        const meetup = response.data;

        console.log(meetup);


        const creationDate = convertDate(meetup.created_on);
        const happeningOn = convertDate(meetup.happening_on);
        output = `<div class="meetup">
            <div class="meetup--header">
              <img class="meetup--image" src="./assets/img/woman.png" />
              <h1 class="meetup--title">
                ${meetup.topic}
              </h1>
            </div>

            <div class="meetup--details">
              <div class="meetup--detail">
                <p class="meetup--detail__label">Location:</p>
                <p class="meetup--detail__information">
                  ${meetup.location}
                </p>
              </div>

              <div class="meetup--detail">
                <p class="meetup--detail__label">Date:</p>
                <p class="meetup--detail__information">${happeningOn}</p>
              </div>

              <div class="meetup--detail">
                <p class="meetup--detail__label">Location URL:</p>
                <p class="meetup--detail__information">www.google.com</p>
              </div>

              <div class="meetup--detail">
                <p class="meetup--detail__label">Created on:</p>
                <p class="meetup--detail__information">${creationDate}</p>
              </div>
            </div>
            <div class="tags">
              <div class="tag">technology</div>
              <div class="tag">technology</div>
            </div>
            <div>
              <span class="closeBtn"><i class="fas fa-trash"></i></span>
            </div>
          </div>`;


        const meetupContainer = document.getElementById('meetup--detail');


        meetupContainer.innerHTML = output;

      } else {
        console.log(response);
      }
    })
    .catch(err => err);
};

// Create new user account
const createQuestion = async (e) => {
  e.preventDefault();
  showOverlay();
  const meetupId = getMeetupId();
  const questionApiUrl = `https://enigmatic-refuge-95413.herokuapp.com/api/v1/questions`;
  // User input data object
  const formData = {
    meetupId,
    body: question.value,
  };


  let userToken;
  if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    const {
      token,
      first_name,
      last_name,
      id,
    } = userData;

    userToken = token;
  }

  // Make a post request to sign up endpoint
  await fetch(questionApiUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })
    .then(res => res.json())
    .then((response) => {
      // window.location.reload();
      console.log(response);
      hideOverlay();

      // check for success status
      if (response.status === 201) {

      } else {
        console.log(response);
      }
    })
    .catch(err => err);
};


body.addEventListener('load', getSingleMeetup());
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', createQuestion);