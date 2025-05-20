   
    const baseUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events';
   
    const partyListDiv = document.getElementById('party-list');
    const partyForm = document.getElementById('party-form');

    const state = {
      events: [],
    }
  
    
    async function getParties() {
      try {
        const response = await fetch(`${baseUrl}`);
        const parties = await response.json();
        console.log(parties)
        renderParties(parties.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    }
  
 
    function renderParties(parties) {
      partyListDiv.innerHTML = ''
      if(Array.isArray(parties)){
      parties.forEach((party) => {
        const partyDiv = document.createElement('div');
        partyDiv.classList.add('party');
  
        const partyContent = document.createElement('p');
        partyContent.innerHTML = `<strong>${party.name}</strong><br>
          Date: ${party.date}<br>
          Time: ${party.time}<br>
          Location: ${party.location}<br>
          Description: ${party.description}`;
        partyDiv.appendChild(partyContent);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => {
          deleteParty(party._id);
        });
        partyDiv.appendChild(deleteBtn);
  
        partyListDiv.appendChild(partyDiv);
      });
    }
  

    async function addParty(newParty) {
      try {
        await fetch(`${baseUrl}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newParty)
        });
      
        getParties();
      } catch (error) {
        console.error('Error adding party:', error);
      }
    }
  

    async function deleteParty(id) {
      try {
        await fetch(`${baseUrl}/${id}`, {
          method: 'DELETE'
        });
     
        getParties();
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    }
  

    partyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(partyForm);
      const newParty = {
        name: formData.get('name'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        description: formData.get('description')
      };
      addParty(newParty);
      partyForm.reset();
    });
  
  
    getParties();
  };
  async function init(){
    const parties= await getParties()
    renderParties(parties.data)
  }

  init()

