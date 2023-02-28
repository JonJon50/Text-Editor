import { postDb, getDb, deleteDb } from './database';
import { getOneDb } from './database';

const form = document.getElementById('contact-form');

// Delete the card
const deleteCard = async (e) => {
  // Grabs the id from the button element attached to the contact card.
  const id = parseInt(e.id);

  await deleteDb(id);

  // Reload the DOM
  await fetchCards();
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = form.elements['name'].value;
  const home = form.elements['home-phone'].value;
  const cell = form.elements['cell-phone'].value;
  const email = form.elements['email'].value;

  // Post form data to IndexedDB
  await postDb(name, home, cell, email);

  // Submit the form
  form.reset();

  // Reload the DOM
  await fetchCards();
});

const fetchCards = async () => {
  // Grab card data from IndexedDB
  const result = await getDb();

  let cardsHtml = '';

  // Loop through the data and create the contact cards
  for (const data of result) {
    console.log(data);
    const cardHtml = `
      <div class="card card-rounded col-md-3 m-2">
        <div class="card-header card-rounded">
          <h1>${data.name}</h1>
        </div>
        <div class="card-body">
          <p>Home Phone: ${data.home_phone}</p>
          <p>Cell Phone: ${data.cell_phone}</p>
          <p>Email: ${data.email}</p>
        </div>
        <div class="flex-row justify-flex-end p-1">
          <button class="btn btn-sm btn-danger" id="${data.id}" onclick="deleteCard(this)">Delete</button>
        </div>
      </div>
    `;

    cardsHtml += cardHtml;
  }

  // Set innerHTML of the card group
  document.getElementById('card-group').innerHTML = cardsHtml;
};

// Fetch cards upon being loaded.
document.addEventListener('DOMContentLoaded', async () => {
  await fetchCards();
});
