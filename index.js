// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-FTB-ET-WEB-AM";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    console.log(result);
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

//=== Components ===

function EventListItem(event) {
  const $li = document.createElement("li"); // Create li element
  $li.classList.add("name"); // Gave it class name "name"
  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
    `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);

  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = `Please select an event to learn more`;
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
  <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
  <h4>${selectedEvent.date}</h4>
  <h4 id="location">${selectedEvent.location}</h4>
  <p>${selectedEvent.description}</p>
  `;
  return $event;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
      <section>
        <h2>Events</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}
async function init() {
  await getEvents();
  render();
}

init();
