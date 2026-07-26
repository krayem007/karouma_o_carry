import i18n from "../i18n";

/* Collapse JS */
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* Utility function to clear row content */
function clearRowContent(row) {
  const inputs = row.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (input.tagName.toLowerCase() === 'select') {
      input.selectedIndex = 0;
    } else {
      input.value = '';
    }
  });
}

/* Factures */
document.getElementById('ajouterfacture').addEventListener('click', function() {
  const tableBody = document.getElementById('Factures');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>
      <input type="checkbox" class="factureCheckbox"/>
    </td>
    <td><input type="text" class="form-control" placeholder="Date"/></td>
    <td><select class="form-control">
        <option value="selection">{i18n.t("front.type_facture")}</option>
        <option value="Type 1">{i18n.t("front.facture_achat")}</option>
        <option value="Type 2">{i18n.t("front.facture_vente")}</option>
      </select></td>
    <td><input type="text" class="form-control" placeholder={i18n.t("front.ref_facture")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.total_ht")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.taux_tva")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.timbre")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.total_ttc")}/></td>
  `;

  tableBody.appendChild(newRow);

  const collapsibleContent = tableBody.closest('.content');
  if (collapsibleContent.style.maxHeight) {
    collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
  }
});

document.getElementById('supprimerfacture').addEventListener('click', function() {
  const tableBody = document.getElementById('Factures');
  const checkboxes = tableBody.querySelectorAll('.factureCheckbox:checked');
  
  checkboxes.forEach(checkbox => {
    const row = checkbox.closest('tr');
    if (row === tableBody.querySelector('tr:first-child')) {
      // Clear content of the first row instead of deleting
      clearRowContent(row);
    } else {
      row.parentNode.removeChild(row);
    }
  });
});

document.getElementById('selectAllFactures').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.factureCheckbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

/* Paie */
document.getElementById('ajouterpaie').addEventListener('click', function() {
  const tableBody = document.getElementById('Paie');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>
      <input type="checkbox" class="paieCheckbox"/>
    </td>
    <td><select class="form-control">
        <option value="">{i18n.t("front.select_secteur")}</option>
        <option value="Type 1">{i18n.t("front.industriel")}</option>
        <option value="Type 2">{i18n.t("front.autre")}</option>
      </select></td>
    <td><input type="text" class="form-control" placeholder={i18n.t("front.salarier")}/></td>
    <td><select class="form-control">
        <option value="">{i18n.t("front.chef_famille")}</option>
        <option value="Type 1">{i18n.t("common.oui")}</option>
        <option value="Type 2">{i18n.t("common.non")}</option>
      </select></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.nb_enfants")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.salaire_brut")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.salaire_net")}/></td>
  `;

  tableBody.appendChild(newRow);

  const collapsibleContent = tableBody.closest('.content');
  if (collapsibleContent.style.maxHeight) {
    collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
  }
});

document.getElementById('supprimerpaie').addEventListener('click', function() {
  const tableBody = document.getElementById('Paie');
  const checkboxes = tableBody.querySelectorAll('.paieCheckbox:checked');
  
  checkboxes.forEach(checkbox => {
    const row = checkbox.closest('tr');
    if (row === tableBody.querySelector('tr:first-child')) {
      // Clear content of the first row instead of deleting
      clearRowContent(row);
    } else {
      row.parentNode.removeChild(row);
    }
  });
});

document.getElementById('selectAllPaie').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.paieCheckbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

/* Retenue */
document.getElementById('ajouterretenue').addEventListener('click', function() {
  const tableBody = document.getElementById('Retenue');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>
      <input type="checkbox" class="retenueCheckbox">
    </td>
    <td><select class="form-control">
        <option value="">{i18n.t("front.retenue_source")}</option>
        <option value="Type 1">{i18n.t("front.loyer")}</option>
        <option value="Type 2">{i18n.t("front.honoraires")}</option>
      </select></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.montant_ht")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.taux_tva")}/></td>
    <td><input type="number" class="form-control" placeholder={i18n.t("front.montant_ttc")}/></td>
  `;

  tableBody.appendChild(newRow);

  const collapsibleContent = tableBody.closest('.content');
  if (collapsibleContent.style.maxHeight) {
    collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
  }
});

document.getElementById('supprimerretenue').addEventListener('click', function() {
  const tableBody = document.getElementById('Retenue');
  const checkboxes = tableBody.querySelectorAll('.retenueCheckbox:checked');
  
  checkboxes.forEach(checkbox => {
    const row = checkbox.closest('tr');
    if (row === tableBody.querySelector('tr:first-child')) {
      // Clear content of the first row instead of deleting
      clearRowContent(row);
    } else {
      row.parentNode.removeChild(row);
    }
  });
});

document.getElementById('selectAllRetenue').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.retenueCheckbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

document.getElementById('all').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.declaration');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});