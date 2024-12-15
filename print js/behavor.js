//import "./style.css"

 document.write(
      unescape("%3Cscript src='https://printjs-4de6.kxcdn.com/print.min.js' type='text/javascript'%3E%3C/script%3E")
    );

 document.write(
      unescape("%3Cscript src='https://printjs-4de6.kxcdn.com/print.min.css' type='text/javascript'%3E%3C/script%3E")
    );

function addData() {
    // Get input values
    let blabla = "money recived from selling products";
    let amount = document.getElementById("received_money").value;
    let ratio_add = document.getElementById("ratio").value;
    let result_add = parseFloat(amount) * parseFloat(ratio_add) / 100;

    // Get the table and insert a new row at the end
    let table = document.getElementById("outputTable");
    let newRow = table.insertRow(table.rows.length);

    // Insert data into cells of the new row
    newRow.insertCell(0).innerHTML = blabla;
    newRow.insertCell(1).innerHTML = amount;
    newRow.insertCell(2).innerHTML = ratio_add;
    newRow.insertCell(3).innerHTML = result_add;
    newRow.insertCell(4).innerHTML =
        '<button onclick="editData(this)">Edit</button>' +
        '<button onclick="deleteData(this)">Delete</button>';

    // Clear input fields
    clearInputs();
}

function editData(button) {

    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;

    // Get the cells within the row
    let amount_edit = row.cells[1];
    let ratio_edit = row.cells[2];
    let result_edit = row.cells[3];

    // Prompt the user to enter updated values
    let nameInput =
        prompt("Enter the received money:",
            amount_edit.innerHTML);
    let emailInput =
        prompt("Enter the ratio:",
            ratio_edit.innerHTML);

    // Update the cell contents with the new values
    amount_edit.innerHTML = nameInput;
    ratio_edit.innerHTML = emailInput;
    result_edit.innerHTML = parseFloat(nameInput) * parseFloat(emailInput) / 100;
}

function deleteData(button) {

    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;

    // Remove the row from the table
    row.parentNode.removeChild(row);
}

function clearInputs() {

    // Clear input fields
    document.getElementById("received_money").value = "";
    document.getElementById("ratio").value = "";
}

function prrrint(id) {
  printJS({
    printable: id,
    type: "html",
    css: "./printjs.css",
    targetStyles: ["*"]
  });
}


//<button onclick="printJS({printable: "outputTable", type: "html", css: "./style.css", targetStyles: ["*"]})">print</button>
