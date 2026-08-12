// ======================================
// ELEMENTS
// ======================================

const TEMPLATE_BASE_API = new URLSearchParams(window.location.search)
    .get("templateBaseApi")
    ?.replace(/\/+$/, "");

function getTemplateApiUrl(path) {

    if (!TEMPLATE_BASE_API) {

        throw new Error("VITE_TEMPLATE_BASE_API is not configured.");

    }

    return `${TEMPLATE_BASE_API}${path}`;

}

const addColumnButtons =
document.querySelectorAll(".add-column-btn");

const selectedColumnsList =
document.getElementById("selectedColumns");

const previewHeader =
document.getElementById("previewHeader");

const previewRow =
document.getElementById("previewRow");

const renameContainer =
document.getElementById("renameContainer");

const addRenameRowBtn =
document.getElementById("addRenameRow");

const saveTemplateBtn =
document.getElementById("saveTemplateBtn");

const templateName =
document.getElementById("templateName");

const templateDescription =
document.getElementById("templateDescription");

const saveModal =
document.getElementById("saveModal");

const cancelSaveBtn =
document.getElementById("cancelSaveBtn");

const confirmSaveBtn =
document.getElementById("confirmSaveBtn");

const templateNameWarning =
document.getElementById("templateNameWarning");



// ======================================
// MANDATORY COLUMNS
// ======================================

const mandatoryColumns = [
    "IMP ENTRY NO",
    "ENTRY LINE NO",
    "IMPORT MATERIAL NUMBER",
    "EXPORT MATERIAL NUMBER",
    "IMP DATE",
    "GOODS DESCRIPTION",
    "IMPORT QTY",
    "IMPORT UOM",
    "EXPORT QTY",
    "EXPORT UOM",
    "UNIQUE ID",
    "DEST COUNTRY",
    "TARIFF TYPE",
    "TARIFF",
    "DUTY RATE",
    "HTSUS NO"
];


// ======================================
// SAMPLE DATA
// ======================================

const sampleData = {

    "Tracking ID":"TRK001",
    "Import Entry No":"IMP-1001",
    "Entry Line No":"LINE-01",
    "Product Code":"PROD-001",
    "Unique ID":"UID-001",
    "Import Date":"01-Jun-2026",
    "Export Date":"15-Jun-2026",
    "HTSUS No":"847130",
    "Goods Description":"Laptop",
    "Export Qty":"50",
    "Line Duty":"1200",
    "Export Duty":"900",
    "99% Duty":"891",

    "Inv. Line#":"INV-100",
    "Destination Country":"USA",
    "Export UQ":"PCS",
    "Duty Rate":"5%",
    "Tariff Type":"General",
    "Tariff":"A",
    "Goods Value per Unit":"500",
    "Entered Value":"25000",
    "Port":"Houston",
    "UOM":"PCS",
    "Unit Of":"Pieces",
    "Description of Merchandise":"Electronic Device",
    "Description of Articles":"Finished Product",
    "Action":"Approved",
    "Name Of":"ABC Corp"

};

// ======================================
// COLUMN ORDER STORAGE
// ======================================

let columnOrder = [];
let selectedOptionalColumns = [];

// ======================================
// INIT
// ======================================

initialize();

function initialize(){

    addRenameRow();

    addColumnButtons.forEach(button => {

    button.addEventListener(
        "click",
        addColumn
    );

});

    addRenameRowBtn.addEventListener(
        "click",
        addRenameRow
    );

saveTemplateBtn.addEventListener("click", saveTemplate);

cancelSaveBtn.addEventListener(
    "click",
    closeSaveModal
);

confirmSaveBtn.addEventListener(
    "click",
    confirmSaveTemplate
);


templateName.addEventListener(
    "input",
    function(){

        const validPattern =
        /^[A-Za-z0-9 _-]*$/;

        if(
            validPattern.test(this.value)
        ){

            this.style.borderColor =
            "#d1d5db";

            templateNameWarning.style.display =
            "none";

        }
        else{

            this.style.borderColor =
            "red";

            templateNameWarning.style.display =
            "block";

        }

    }
);
    updateUI();

}


/// ======================================
// ADD RENAME ROW
// ======================================

function addRenameRow(){

 const row =
 document.createElement("div");

 row.classList.add("rename-row");

 row.innerHTML = `


 <select class="original-name">
 </select>

<div class="display-name-container">

    <input
    type="text"
    class="display-name"
    placeholder="Display Name">

    <small
    class="displayNameWarning validation-warning">

        Only letters, numbers, spaces, "_" and "-" are allowed.

    </small>

</div>

<button
class="delete-rename-row">
✕
</button>

 `;

 renameContainer.appendChild(row);

const deleteBtn =
row.querySelector(
    ".delete-rename-row"
);

deleteBtn.addEventListener(
    "click",
    function(){

        const totalRows =
        document.querySelectorAll(
            ".rename-row"
        ).length;

        if(totalRows > 1){

            row.remove();

        }

    }
);

const originalInput =
row.querySelector(".original-name");

const displayInput =
row.querySelector(".display-name");

const displayNameWarning =
row.querySelector(".displayNameWarning");

originalInput.addEventListener(
    "change",
    updateUI
);

displayInput.addEventListener(
    "input",
    function(){

        updateUI();

        const validPattern =
        /^[A-Za-z0-9 _-]*$/;

        if(
            validPattern.test(this.value)
        ){

            this.style.borderColor =
            "#d1d5db";

            displayNameWarning.style.display =
            "none";

        }
        else{

            this.style.borderColor =
            "red";

            displayNameWarning.style.display =
            "block";

        }

    }
);

populateColumnDropdown(
    originalInput
);

}

// ======================================
// GET SELECTED COLUMNS
// ======================================
// ======================================
// CONFIRM COLUMN ORDER
// ======================================

function getSelectedColumns(){

    return [

        ...mandatoryColumns,

        ...selectedOptionalColumns

    ];

}
function addColumn(){

    const column =
    this.dataset.column;

    if(
        !selectedOptionalColumns.includes(column)
    ){

        selectedOptionalColumns.push(column);

        const row =
        this.closest(".column-item");

        row.style.display = "none";

        updateUI();
    }

}


// ======================================
// GET DISPLAY NAME
// ======================================

function getDisplayName(column){

 const rows =
 document.querySelectorAll(
 ".rename-row"
 );

 for(let row of rows){

  const original =
  row.querySelector(
  ".original-name"
  ).value.trim();

  const display =
  row.querySelector(
  ".display-name"
  ).value.trim();

  if(
   original.toLowerCase()
   ===
   column.toLowerCase()
   &&
   display !== ""
  ){

   return display;

  }

 }

 return column;

}
function populateColumnDropdown(dropdown){

    dropdown.innerHTML = "";

    const defaultOption =
    document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent =
    "Select Column";

    dropdown.appendChild(
        defaultOption
    );

    columnOrder.forEach(column => {

        const option =
        document.createElement("option");

        option.value =
        column;

        option.textContent =
        column;

        dropdown.appendChild(
            option
        );

    });

}

// ======================================
// UPDATE UI
// ======================================

function updateUI(){

 const selectedColumns =
 getSelectedColumns();

 if(
 columnOrder.length === 0
){

 columnOrder =
 [...selectedColumns];

}

 columnOrder =
 columnOrder.filter(col =>
 selectedColumns.includes(col)
 );

 selectedColumns.forEach(col => {

  if(
   !columnOrder.includes(col)
  ){

   columnOrder.push(col);

  }

 });

 updateSelectedColumns(
 columnOrder
);

 updatePreview(
 columnOrder
 );
 const dropdowns =
document.querySelectorAll(
    ".original-name"
);

dropdowns.forEach(dropdown => {

    const currentValue =
    dropdown.value;

    populateColumnDropdown(
        dropdown
    );

    dropdown.value =
    currentValue;

});
 

}

// ======================================
// OUTPUT COLUMNS
// ======================================

function updateSelectedColumns(columns){

 selectedColumnsList.innerHTML = "";

 columns.forEach((column,index)=>{

  const li =
  document.createElement("li");

  if(
    selectedOptionalColumns.includes(column)
){
    li.classList.add(
        "optional-column-output"
    );
}

 if(
    selectedOptionalColumns.includes(column)
){

    li.innerHTML = `

        <strong>
        ${index + 1}.
        </strong>

        ${getDisplayName(column)}

        <button
            class="remove-column-btn"
            data-column="${column}">
            ✕
        </button>

    `;

}
else{

    li.innerHTML = `

        <strong>
        ${index + 1}.
        </strong>

        ${getDisplayName(column)}

    `;

}

  selectedColumnsList.appendChild(li);

  const removeBtn =
li.querySelector(".remove-column-btn");

if(removeBtn){

    removeBtn.addEventListener(
        "click",
        function(){

            const column =
            this.dataset.column;

            selectedOptionalColumns =
            selectedOptionalColumns.filter(
                item => item !== column
            );

            const addButton =
            document.querySelector(
                `.add-column-btn[data-column="${column}"]`
            );

            if(addButton){

                addButton
                .closest(".column-item")
                .style.display =
                "flex";

            }

            updateUI();

        }
    );

}

 });

}

// ======================================
// TEMPLATE PREVIEW
// ======================================

function updatePreview(columns){

 previewHeader.innerHTML = "";
 previewRow.innerHTML = "";

 columns.forEach((column,index)=>{

  const th =
  document.createElement("th");

  th.textContent =
  getDisplayName(column);

  th.draggable = true;

  th.dataset.index =
  index;

  previewHeader.appendChild(th);

 });

 columns.forEach(column => {

  const td =
  document.createElement("td");

  td.textContent =
  sampleData[column] || "N/A";

  previewRow.appendChild(td);

 });

 initializeDragDrop();

}

// ======================================
// DRAG & DROP
// ======================================

    function initializeDragDrop() {

    const headers =
    document.querySelectorAll("#previewHeader th");

    let dragIndex = null;

    headers.forEach((header, index) => {

        header.draggable = true;

        header.addEventListener(
            "dragstart",
            function () {

                dragIndex = index;

            }
        );

        header.addEventListener(
            "dragover",
            function (e) {

                e.preventDefault();

            }
        );

        header.addEventListener(
            "drop",
            function (e) {

                e.preventDefault();

                const dropIndex = index;

                if (
                    dragIndex === null ||
                    dragIndex === dropIndex
                ) {
                    return;
                }

                const movedColumn =
                columnOrder.splice(
                    dragIndex,
                    1
                )[0];

                columnOrder.splice(
                    dropIndex,
                    0,
                    movedColumn
                );

                // Refresh BOTH Output Columns and Preview
                updateUI();

            }
        );

    });

}
 
// closes headers.forEach

function initializeDropZones(){

    const zones =
    document.querySelectorAll(
        ".drop-zone"
    );

    zones.forEach(zone => {

        zone.addEventListener(
            "dragover",
            function(e){

                e.preventDefault();

                this.classList.add(
                    "drag-over"
                );

            }
        );

        zone.addEventListener(
            "dragleave",
            function(){

                this.classList.remove(
                    "drag-over"
                );

            }
        );

        zone.addEventListener(
            "drop",
            function(e){

                e.preventDefault();

                const column =
                e.dataTransfer.getData(
                    "text/plain"
                );

                this.textContent =
                column;

                this.classList.remove(
                    "drag-over"
                );

            }
        );

    });

}
// ======================================
// SAVE TEMPLATE
// ======================================

function saveTemplate() {

    const name =
    templateName.value.trim();

    const description =
    templateDescription.value.trim();

    if(name === ""){

        alert("Please enter a Template Name.");

        templateName.focus();

        return;

    }

    if(description === ""){

        alert("Please enter a Description.");

        templateDescription.focus();

        return;

    }

    const validPattern =
    /^[A-Za-z0-9 _-]+$/;

    if(!validPattern.test(name)){

    templateName.style.borderColor = "red";

    templateName.focus();

    return;

}

    const originalInputs =
document.querySelectorAll(".original-name");

const displayInputs =
document.querySelectorAll(".display-name");

for(let i = 0; i < originalInputs.length; i++){

    const original =
    originalInputs[i].value.trim();

    const display =
    displayInputs[i].value.trim();

  // User is not using this rename row
if (original === "" && display === "") {
    continue;
}

// User selected a column but didn't provide a display name
if (original !== "" && display === "") {

    alert("Please enter a Display Name.");

    displayInputs[i].focus();

    return;
}

// User entered a display name without selecting a column
if (original === "" && display !== "") {

    alert("Please select an Original Name.");

    originalInputs[i].focus();

    return;
}

// Validate only when a display name is provided
if (display !== "" && !validPattern.test(display)) {

    displayInputs[i].style.borderColor = "red";

    displayInputs[i].focus();

    return;
}

   if(!validPattern.test(display)){

    displayInputs[i].style.borderColor =
    "red";

    displayInputs[i].focus();

    return;

}

}

    saveModal.style.display = "flex";

}


function closeSaveModal() {

    saveModal.style.display = "none";

}

function confirmSaveTemplate() {

    saveModal.style.display = "none";

    // Template Details
    const name = templateName.value.trim();
    const description = templateDescription.value.trim();

    // Get Rename Columns
    const originalInputs = document.querySelectorAll(".original-name");
    const displayInputs = document.querySelectorAll(".display-name");

    // Build Columns Array
    const columns = [];

    for (let i = 0; i < originalInputs.length; i++) {

        columns.push({

            // Existing fields (Backend uses these)
            original_column: originalInputs[i].value,
            display_column: displayInputs[i].value,
            column_order: i + 1,
            is_mandatory: true,

            // New standardized JSON fields
            column_id: i + 1,
            column_name: originalInputs[i].value,
            display_name: displayInputs[i].value,
            type: "string",
            default_value: "",
            order: i + 1,
            mandatory: true,
            default: true

        });

    }

    const templateData = {
        template_name: name,
        description: description,
        created_by: "Tejal",
        modified_by: "Tejal",
        columns: columns
    };

    fetch(

    currentTemplateId
        ? getTemplateApiUrl(`/template/${currentTemplateId}`)
        : getTemplateApiUrl("/create-template"),

{
        method: currentTemplateId ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(templateData)
    })
    .then(response => response.json())
  .then(data => {

        if (data.error) {

            alert(data.error);

        } else {

            alert(data.message);

            currentTemplateId = null;

            document.getElementById("saveTemplateBtn").textContent =
                "Save Template";

            resetTemplateForm();

            loadTemplates();

        }

    })
    .catch(error => {

        console.error(error);

        alert("Something went wrong while saving the template.");

    });

}
  

const editBtn = document.getElementById("editTemplateBtn");
const deleteTemplateBtn = document.getElementById("deleteTemplateBtn");
const deleteModal = document.getElementById("deleteTemplateModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
confirmDeleteBtn.addEventListener("click", async () => {

    const id = document.getElementById("deleteTemplateDropdown").value;

    if (!id) {
        alert("Please select a template.");
        return;
    }

    if (!confirm("Are you sure you want to delete this template?")) {
        return;
    }

    const response = await fetch(getTemplateApiUrl(`/template/${id}`), {
        method: "DELETE"
    });

    const result = await response.json();

    alert(result.message || "Template deleted successfully.");

    deleteTemplateModal.style.display = "none";

    loadTemplates();

    resetTemplateForm();

});
const addTemplateBtn = document.getElementById("addTemplateBtn");
const editModal = document.getElementById("editTemplateModal");
const cancelEditBtn = document.getElementById("cancelEditBtn");

editBtn.addEventListener("click", async () => {

    editModal.style.display = "flex";

    await loadTemplates();

});

addTemplateBtn.addEventListener("click", () => {

    resetTemplateForm();

    selectedOptionalColumns = [];

    columnOrder = [];

    renameContainer.innerHTML = "";

    addRenameRow();

    updateUI();

});

cancelEditBtn.addEventListener("click", () => {
    editModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
});
let currentTemplateId = null;
async function loadTemplates() {

    try {

        const response = await fetch(getTemplateApiUrl("/templates"));

        const templates = await response.json();

        const dropdown = document.getElementById("editTemplateDropdown");

        dropdown.innerHTML = `<option value="">Choose Template</option>`;

        templates.forEach(template => {

            dropdown.innerHTML += `
                <option value="${template.template_id}">
                    ${template.template_name}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load templates.");

    }

}
async function loadDeleteTemplates() {

    try {

        const response = await fetch(getTemplateApiUrl("/templates"));

        const templates = await response.json();

        const dropdown = document.getElementById("deleteTemplateDropdown");

        dropdown.innerHTML = `<option value="">Choose Template</option>`;

        templates.forEach(template => {

            dropdown.innerHTML += `
                <option value="${template.template_id}">
                    ${template.template_name}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load templates.");

    }

}
const openEditBtn = document.getElementById("openEditBtn");

openEditBtn.addEventListener("click", async () => {

    const id = document.getElementById("editTemplateDropdown").value;

    if (!id) {
        alert("Please select a template.");
        return;
    }

    const response = await fetch(getTemplateApiUrl(`/template/${id}`));
    const template = await response.json();

    currentTemplateId = template.template_id;

document.getElementById("templateName").value =
    template.template_name || "";

document.getElementById("templateDescription").value =
    template.description || "";

document.getElementById("saveTemplateBtn").textContent =
    "Update Template";

editModal.style.display = "none";
});
function resetTemplateForm() {

    currentTemplateId = null;

    document.getElementById("templateName").value = "";

    document.getElementById("templateDescription").value = "";

    document.getElementById("saveTemplateBtn").textContent =
        "Save Template";

}

cancelDeleteBtn.addEventListener("click", () => {

    deleteModal.style.display = "none";

});

window.addEventListener("click", (event) => {

    if (event.target === deleteModal) {

        deleteModal.style.display = "none";

    }

});

        deleteTemplateBtn.addEventListener("click", async () => {

    deleteModal.style.display = "flex";

    await loadDeleteTemplates();

});
cancelDeleteBtn.addEventListener("click", () => {

    deleteModal.style.display = "none";

});

window.addEventListener("click", (event) => {

    if (event.target === deleteModal) {

        deleteModal.style.display = "none";

    }

});
