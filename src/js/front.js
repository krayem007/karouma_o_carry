 /* Colapse js */
 var coll = document.getElementsByClassName("collapsible");
 var i;
 
 for (i = 0; i < coll.length; i++) {
   coll[i].addEventListener("click", function() {
     this.classList.toggle("active");
     var content = this.nextElementSibling;
     if (content.style.maxHeight){
       content.style.maxHeight = null;
     } else {
       content.style.maxHeight = content.scrollHeight + "px";
     } 
   });
 }
/* Colapse factures */

document.getElementById('ajouterfacture').addEventListener('click', function() {
    const tableBody = document.getElementById('Factures');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>
        <input type="checkbox" class="factureCheckbox">
      </td>
      <td><input type="date" class="form-control" placeholder="Date"></td>
      <td><select class="form-control">
          <option value="">Sélectionner un type de facture</option>
          <option value="Type 1">Facture d'achat</option>
          <option value="Type 2">Facture de vente</option>
        </select></td>
      <td><input type="text" class="form-control" placeholder="Réf facture"></td>
      <td><input type="number" class="form-control" placeholder="Total HT"></td>
      <td><input type="number" class="form-control" placeholder="TVA"></td>
      <td><input type="number" class="form-control" placeholder="Timbre"></td>
      <td><input type="number" class="form-control" placeholder="Total TTC"></td>
    `;

    tableBody.appendChild(newRow);

   // Adjust the maxHeight of the content to accommodate the new row
   const collapsibleContent = tableBody.closest('.content');
   if (collapsibleContent.style.maxHeight) {
       collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
   }
});

  document.getElementById('supprimerfacture').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.factureCheckbox:checked');
    checkboxes.forEach(checkbox => {
      const row = checkbox.closest('tr');
      row.parentNode.removeChild(row);
    });
  });
  

  // Select/Deselect all checkboxes for Factures
  document.getElementById('selectAllFactures').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.factureCheckbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
    });
  });

  /* Colapse paie */


  document.getElementById('ajouterpaie').addEventListener('click', function() {
    const tableBody = document.getElementById('Paie');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>
        <input type="checkbox" class="paieCheckbox">
      </td>
      <td><select class="form-control">
          <option value="">Sélectionner le secteur d'activité</option>
          <option value="Type 1">Industriel</option>
          <option value="Type 2">Autre</option>
        </select></td>
      <td><input type="text" class="form-control" placeholder="Salarier"></td>
      <td><select class="form-control">
          <option value="">Chef de famille ou non ?</option>
          <option value="Type 1">Oui</option>
          <option value="Type 2">Non</option>
        </select></td>
      <td><input type="number" class="form-control" placeholder="Nombre d'enfants"></td>
      <td><input type="number" class="form-control" placeholder="Salaire Brut"></td>
      <td><input type="number" class="form-control" placeholder="Salaire Net"></td>
    `;

    tableBody.appendChild(newRow);
  // Adjust the maxHeight of the content to accommodate the new row
  const collapsibleContent = tableBody.closest('.content');
  if (collapsibleContent.style.maxHeight) {
      collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
  }
});

  document.getElementById('supprimerpaie').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.paieCheckbox:checked');
    checkboxes.forEach(checkbox => {
      const row = checkbox.closest('tr');
      row.parentNode.removeChild(row);
    });
  });

  // Select/Deselect all checkboxes for Paie
  document.getElementById('selectAllPaie').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.paieCheckbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
    });
  });

    /* Colapse retenue */


    document.getElementById('ajouterretenue').addEventListener('click', function() {
        const tableBody = document.getElementById('Retenue');
        const newRow = document.createElement('tr');
  
        newRow.innerHTML = `
          <td>
            <input type="checkbox" class="retenueCheckbox">
          </td>
          <td><select class="form-control">
              <option value="">Retenue à la source sur :</option>
              <option value="Type 1">Loyer</option>
              <option value="Type 2">Honoraires</option>
            </select></td>
          <td><input type="number" class="form-control" placeholder="Montant HT"></td>
          <td><input type="number" class="form-control" placeholder="TVA"></td>
          <td><input type="number" class="form-control" placeholder="Montant TTC"></td>
        `;
  
        tableBody.appendChild(newRow);
        // Adjust the maxHeight of the content to accommodate the new row
        const collapsibleContent = tableBody.closest('.content');
        if (collapsibleContent.style.maxHeight) {
            collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
        }
      });

      document.getElementById('supprimerretenue').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.retenueCheckbox:checked');
        checkboxes.forEach(checkbox => {
          const row = checkbox.closest('tr');
          row.parentNode.removeChild(row);
        });
      });

      // Select/Deselect all checkboxes for Retenue
      document.getElementById('selectAllRetenue').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.retenueCheckbox');
        checkboxes.forEach(checkbox => {
          checkbox.checked = this.checked;
        });
      });