// ======================================
// TEMPLATE MANAGEMENT - CLEAN SCRIPT.JS
// ======================================

(function () {

    function startTemplateManagement() {
    // ======================================
    // TEMPLATE MANAGEMENT - SCRIPT.JS
    // ======================================

    // ======================================
    // ELEMENTS
    // ======================================

    const API_BASE = new URLSearchParams(window.location.search)
    .get("templateBaseApi")
    ?.replace(/\/+$/, "");

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

    const ViewTemplateBtn =
        document.getElementById("ViewTemplateBtn") ||
        document.getElementById("viewTemplateBtn");

    const templateViewModal =
        document.getElementById("templateViewModal") ||
        document.getElementById("templateViewModalContainer");

    const closeTemplateViewBtn =
        document.getElementById("closeTemplateViewBtn");

    const templateList =
        document.getElementById("templateList");

    const editModal =
        document.getElementById("editTemplateModal");

    const deleteModal =
        document.getElementById("deleteTemplateModal");

    const editTemplateDropdown =
        document.getElementById("editTemplateDropdown");

    const deleteTemplateDropdown =
        document.getElementById("deleteTemplateDropdown");

    const openEditBtn =
        document.getElementById("openEditBtn");

    const cancelEditBtn =
        document.getElementById("cancelEditBtn");

    const confirmDeleteBtn =
        document.getElementById("confirmDeleteBtn");

    const cancelDeleteBtn =
        document.getElementById("cancelDeleteBtn");


    // ======================================
    // STATE
    // ======================================

    let columnOrder = [];

    let selectedOptionalColumns = [];

    let currentTemplateId = null;
    const validPattern =
        /^[A-Za-z0-9 _-]+$/;


    // ======================================
    // 16 COMPULSORY COLUMNS
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
    // OPTIONAL COLUMNS
    // ======================================

    const optionalColumns = [

        "LINE DUTY",
        "CONV. FACTOR",
        "EXPORT DTE",
        "STANDARD DUTY AMOUNT",
        "TARIFF # 1",
        "DUTY RATE 1",
        "TARIFF VALUE 1",
        "TARIFF # 2",
        "DUTY RATE 2",
        "TARIFF VALUE 2",
        "NET DUTY RATE",
        "GOODS VALUE PER UNIT",
        "ENTERED VALUE",
        "EXPORT DUTY",
        "99% DUTY",
        "REFUND AMOUNT",
        "APPROVE DATE"

    ];


    // ======================================
    // SAMPLE DATA
    // ======================================

    const sampleData = {

        "IMP ENTRY NO": "IMP-1001",

        "ENTRY LINE NO": "LINE-01",

        "IMPORT MATERIAL NUMBER": "MAT-001",

        "EXPORT MATERIAL NUMBER": "MAT-002",

        "IMP DATE": "01-Jun-2026",

        "GOODS DESCRIPTION": "Laptop",

        "IMPORT QTY": "50",

        "IMPORT UOM": "PCS",

        "EXPORT QTY": "50",

        "EXPORT UOM": "PCS",

        "UNIQUE ID": "UID-001",

        "DEST COUNTRY": "USA",

        "TARIFF TYPE": "General",

        "TARIFF": "A",

        "DUTY RATE": "5%",

        "HTSUS NO": "847130",

        "LINE DUTY": "1200",

        "CONV. FACTOR": "1",

        "EXPORT DTE": "15-Jun-2026",

        "STANDARD DUTY AMOUNT": "1200",

        "TARIFF # 1": "847130",

        "DUTY RATE 1": "5%",

        "TARIFF VALUE 1": "25000",

        "TARIFF # 2": "847130",

        "DUTY RATE 2": "2%",

        "TARIFF VALUE 2": "10000",

        "NET DUTY RATE": "3%",

        "GOODS VALUE PER UNIT": "500",

        "ENTERED VALUE": "25000",

        "EXPORT DUTY": "900",

        "99% DUTY": "891",

        "REFUND AMOUNT": "309",

        "APPROVE DATE": "20-Jun-2026"

    };


    // ======================================
    // INITIALIZE
    // ======================================

    function initialize() {

        // Add first rename row
        if (renameContainer) {
            addRenameRow();
        }

        // Optional column buttons
        addColumnButtons.forEach(button => {
            button.addEventListener("click", addColumn);
        });

        // Add rename row
        if (addRenameRowBtn) {
            addRenameRowBtn.addEventListener("click", () => {
                addRenameRow();
            });
        }

        // Save template
        if (saveTemplateBtn) {
            saveTemplateBtn.addEventListener("click", saveTemplate);
        }

        // Save modal - Cancel
        if (cancelSaveBtn) {
            cancelSaveBtn.addEventListener("click", closeSaveModal);
        }

        // Save modal - Confirm
        if (confirmSaveBtn) {
            confirmSaveBtn.addEventListener("click", confirmSaveTemplate);
        }

        // Template name validation
        if (templateName) {
            templateName.addEventListener("input", validateTemplateName);
        }

        // ==============================
        // TEMPLATE VIEW
        // ==============================

        if (ViewTemplateBtn) {
            ViewTemplateBtn.addEventListener("click", openTemplateView);
        }

        if (closeTemplateViewBtn) {
            closeTemplateViewBtn.addEventListener("click", closeTemplateView);
        }

        // ==============================
        // EDIT MODAL
        // ==============================

        if (cancelEditBtn) {
            cancelEditBtn.addEventListener("click", closeEditModal);
        }

        if (openEditBtn) {
            openEditBtn.addEventListener("click", openSelectedTemplate);
        }

        // ==============================
        // DELETE MODAL
        // ==============================

        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener("click", closeDeleteModal);
        }

        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener("click", deleteSelectedTemplate);
        }

        // ==============================
        // CLOSE MODALS WHEN CLICKING OUTSIDE
        // ==============================

        window.addEventListener("click", function (event) {

            if (
                editModal &&
                event.target === editModal
            ) {
                closeEditModal();
            }

            if (
                deleteModal &&
                event.target === deleteModal
            ) {
                closeDeleteModal();
            }

            if (
                saveModal &&
                event.target === saveModal
            ) {
                closeSaveModal();
            }

            if (
                templateViewModal &&
                event.target === templateViewModal
            ) {
                closeTemplateView();
            }

        });

        // Initial UI
        updateUI();
    }


    // Run initialization
    initialize();

    console.log("Template Management JS loaded successfully.");
    // ======================================
    // TEMPLATE VIEW
    // ======================================

    async function editTemplateById(id) {

        if (!id) {
            return;
        }

        try {

            const response =
                await fetch(
                    `${API_BASE}/template/${id}`
                );

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            const template =
                await response.json();

            currentTemplateId =
                template.template_id;

            templateName.value =
                template.template_name || "";

            templateDescription.value =
                template.description || "";

            if (saveTemplateBtn) {

                saveTemplateBtn.textContent =
                    "Update Template";

            }

            loadTemplateColumns(
                template
            );

        } catch (error) {

            console.error(
                "Edit error:",
                error
            );

            alert(
                "Unable to open the selected template."
            );

        }

    }
    async function deleteTemplateById(id) {

        if (!id) {
            return;
        }

        try {

            const response =
                await fetch(
                    `${API_BASE}/template/${id}`,
                    {
                        method: "DELETE"
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {

                alert(
                    result.error ||
                    "Unable to delete the template."
                );

                return;

            }

            alert(
                result.message ||
                "Template deleted successfully."
            );

            await loadTemplateViewList();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                "Something went wrong while deleting the template."
            );

        }

    }

    async function openTemplateView() {

        if (!templateViewModal) {
            return;
        }

        templateViewModal.style.display = "flex";

        await loadTemplateViewList();

    }


// ======================================
// CLOSE TEMPLATE VIEW
// ======================================

function closeTemplateView() {

    const modal =
        document.getElementById("templateViewModal");

    if (modal) {
        modal.style.display = "none";
    }

}


    // ======================================
    // LOAD TEMPLATE VIEW LIST
    // ======================================

    async function loadTemplateViewList() {

        if (!templateList) {
            console.error("templateList element not found.");
            return;
        }

        templateList.innerHTML = `
            <p class="template-loading">
                Loading templates...
            </p>
        `;

        try {

            const response = await fetch(
                `${API_BASE}/templates`
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            const templates =
                Array.isArray(data)
                    ? data
                    : data.templates || [];

            templateList.innerHTML = "";

            // No templates
            if (templates.length === 0) {

                templateList.innerHTML = `
                    <p class="no-templates">
                        No templates available.
                    </p>
                `;

                return;
            }

            // Create template cards
            templates.forEach(template => {

                const item = document.createElement("div");

                item.classList.add(
                    "template-view-item"
                );

                item.innerHTML = `

                    <div class="template-view-info">

                        <div class="template-view-name">
                            ${escapeHtml(
                                template.template_name || ""
                            )}
                        </div>

                        <div class="template-view-description">
                            ${escapeHtml(
                                template.description || ""
                            )}
                        </div>

                    </div>

                    <div class="template-menu-container">

                        <button
                            type="button"
                            class="template-menu-btn"
                            title="More options">
                            ⋮
                        </button>

                        <div class="template-action-menu">

                            <button
                                type="button"
                                class="template-edit-action">
                                Edit
                            </button>

                            <button
                                type="button"
                                class="template-delete-action">
                                Delete
                            </button>

                        </div>

                    </div>
                `;
item.dataset.templateId =
    template.template_id;

item.dataset.templateName =
    template.template_name || "";
                templateList.appendChild(item);

                // ==============================
                // THREE DOT BUTTON
                // ==============================

                const menuBtn =
                    item.querySelector(
                        ".template-menu-btn"
                    );

                const actionMenu =
                    item.querySelector(
                        ".template-action-menu"
                    );

                if (menuBtn && actionMenu) {

                    menuBtn.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();

                            // Close other menus
                            document
                                .querySelectorAll(
                                    ".template-action-menu"
                                )
                                .forEach(menu => {

                                    if (menu !== actionMenu) {

                                        menu.classList.remove(
                                            "show"
                                        );

                                    }

                                });

                            // Toggle current menu
                            actionMenu.classList.toggle(
                                "show"
                            );

                        }
                    );

                }


                // ==============================
                // EDIT
                // ==============================

                const editBtn =
                    item.querySelector(
                        ".template-edit-action"
                    );

                if (editBtn) {

                    editBtn.addEventListener(
                        "click",
                        async function () {

                            const id =
                                template.template_id;

                            if (!id) {
                                alert(
                                    "Template ID not found."
                                );
                                return;
                            }

                            closeTemplateView();

                            await editTemplateById(id);

                        }
                    );

                }


                // ==============================
                // DELETE
                // ==============================

                const deleteBtn =
                    item.querySelector(
                        ".template-delete-action"
                    );

                if (deleteBtn) {

                    deleteBtn.addEventListener(
                        "click",
                        async function () {

                            const id =
                                template.template_id;

                            if (!id) {
                                alert(
                                    "Template ID not found."
                                );
                                return;
                            }

                            const confirmed =
                                confirm(
                                    `Are you sure you want to delete "${template.template_name}"?`
                                );

                            if (!confirmed) {
                                return;
                            }

                            await deleteTemplateById(id);

                        }
                    );

                }

            });

        } catch (error) {

            console.error(
                "Template View error:",
                error
            );

            templateList.innerHTML = `
                <p class="no-templates">
                    Unable to load templates.
                </p>
            `;

        }

    }

    // ======================================
    // TEMPLATE NAME VALIDATION
    // ======================================

    function validateTemplateName() {

        if (!templateName) {
            return;
        }

        if (
            this.value === "" ||
            validPattern.test(this.value)
        ) {

            this.style.borderColor =
                "#d1d5db";

            if (templateNameWarning) {

                templateNameWarning.style.display =
                    "none";

            }

        } else {

            this.style.borderColor =
                "#dc2626";

            if (templateNameWarning) {

                templateNameWarning.style.display =
                    "block";

            }

        }

    }


    // ======================================
    // ADD OPTIONAL COLUMN
    // ======================================

    function addColumn() {

        const column =
            this.dataset.column;

        if (!column) {
            return;
        }


        if (
            !selectedOptionalColumns.includes(column)
        ) {

            selectedOptionalColumns.push(column);

        }


        // Hide from available columns
        const item =
            this.closest(".column-item");

        if (item) {

            item.style.display = "none";

        }


        // Add to output order
        if (
            !columnOrder.includes(column)
        ) {

            columnOrder.push(column);

        }


        updateUI();

    }


    // ======================================
    // GET SELECTED COLUMNS
    // ======================================

    function getSelectedColumns() {

        return [

            ...mandatoryColumns,

            ...selectedOptionalColumns

        ];

    }


    // ======================================
    // GET DISPLAY NAME
    // ======================================

    function getDisplayName(column) {

        const rows =
            document.querySelectorAll(
                ".rename-row"
            );


        for (const row of rows) {

            const original =
                row.querySelector(
                    ".original-name"
                )?.value.trim();


            const confirmedDisplay =
                row.dataset.confirmedDisplayName ||
                "";


            if (
                original &&
                original.toLowerCase() ===
                column.toLowerCase() &&
                confirmedDisplay !== ""
            ) {

                return confirmedDisplay;

            }

        }


        return column;

    }


    function addRenameRow(existingData = null) {

        const row = document.createElement("div");

        row.classList.add("rename-row");

        row.innerHTML = `

            <select class="original-name">
                <option value="">Select Column</option>
            </select>

            <div class="display-name-container">

                <input
                    type="text"
                    class="display-name"
                    placeholder="Display Name">

                <small class="displayNameWarning validation-warning">
                    Only letters, numbers, spaces, "_" and "-" are allowed.
                </small>

            </div>

            <div class="rename-actions-row">

                <button
                    type="button"
                    class="confirm-rename-row"
                    title="Confirm Rename">
                    ✓
                </button>

                <button
                    type="button"
                    class="delete-rename-row"
                    title="Remove Row">
                    ✕
                </button>

            </div>
        `;

        if (!renameContainer) {
            console.error("renameContainer element not found.");
            return;
        }

        renameContainer.appendChild(row);


        // ======================================
        // ELEMENTS
        // ======================================

        const originalInput =
            row.querySelector(".original-name");

        const displayInput =
            row.querySelector(".display-name");

        const displayNameWarning =
            row.querySelector(".displayNameWarning");

        const confirmBtn =
            row.querySelector(".confirm-rename-row");

        const deleteBtn =
            row.querySelector(".delete-rename-row");


        // ======================================
        // LOAD EXISTING DATA
        // ======================================

        if (existingData) {

            originalInput.value =
                existingData.original_column || "";

            displayInput.value =
                existingData.display_column || "";

            if (existingData.display_column) {

                row.dataset.confirmedDisplayName =
                    existingData.display_column;

                row.dataset.confirmed =
                    "true";

                displayInput.dataset.confirmedName =
                    existingData.display_column;
            }
        }


        // ======================================
        // DELETE / REMOVE ROW
        // ======================================

        if (deleteBtn) {

            deleteBtn.addEventListener(
                "click",
                function () {

                    const totalRows =
                        document.querySelectorAll(
                            ".rename-row"
                        ).length;

                    if (totalRows > 1) {

                        row.remove();

                        updateUI();

                    } else {

                        originalInput.value = "";

                        displayInput.value = "";

                        row.dataset.confirmedDisplayName = "";

                        row.dataset.confirmed = "false";

                        displayInput.dataset.confirmedName = "";

                        updateUI();
                    }

                }
            );
        }


        // ======================================
        // CONFIRM RENAME
        // ======================================

        if (confirmBtn) {

            confirmBtn.addEventListener(
                "click",
                function () {

                    const original =
                        originalInput.value.trim();

                    const display =
                        displayInput.value.trim();


                    if (original === "") {

                        alert(
                            "Please select an Original Name."
                        );

                        originalInput.focus();

                        return;
                    }


                    if (display === "") {

                        alert(
                            "Please enter a Display Name."
                        );

                        displayInput.focus();

                        return;
                    }


                   const renamePattern =
                        /^[A-Za-z0-9 _-]+$/;


                    if (!renamePattern.test(display)) {

                        alert(
                            'Display Name can contain only letters, numbers, spaces, "_" and "-".'
                        );

                        displayInput.focus();

                        return;
                    }


                    // Store confirmed display name

                    row.dataset.confirmedDisplayName =
                        display;

                    row.dataset.confirmed =
                        "true";

                    displayInput.dataset.confirmedName =
                        display;


                    updateUI();


                    // Small confirmation animation

                    confirmBtn.style.transform =
                        "scale(0.9)";

                    setTimeout(() => {

                        confirmBtn.style.transform =
                            "scale(1)";

                    }, 120);

                }
            );
        }


        // ======================================
        // ORIGINAL COLUMN CHANGE
        // ======================================

        if (originalInput) {

            originalInput.addEventListener(
                "change",
                updateUI
            );
        }


        // ======================================
        // DISPLAY NAME VALIDATION
        // ======================================

        if (displayInput) {

            displayInput.addEventListener(
                "input",
                function () {

                   const renamePattern =
    /^[A-Za-z0-9 _-]+$/;


                    if (
                        renamePattern.test(
                            this.value
                        )
                    ) {

                        this.style.borderColor =
                            "#d1d5db";

                        if (displayNameWarning) {

                            displayNameWarning.style.display =
                                "none";
                        }

                    } else {

                        this.style.borderColor =
                            "#ef4444";

                        if (displayNameWarning) {

                            displayNameWarning.style.display =
                                "block";
                        }
                    }

                }
            );
        }


        // ======================================
        // POPULATE DROPDOWN
        // ======================================

        populateColumnDropdown(
            originalInput
        );

    }
    // ======================================
    // POPULATE RENAME DROPDOWN
    // ======================================

    function populateColumnDropdown(
        dropdown
    ) {

        if (!dropdown) {
            return;
        }


        const currentValue =
            dropdown.value;


        dropdown.innerHTML =
            "";


        const defaultOption =
            document.createElement("option");


        defaultOption.value =
            "";


        defaultOption.textContent =
            "Select Column";


        dropdown.appendChild(
            defaultOption
        );


        const allColumns =
            getSelectedColumns();


        allColumns.forEach(column => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                column;


            option.textContent =
                column;


            dropdown.appendChild(
                option
            );

        });


        if (
            allColumns.includes(
                currentValue
            )
        ) {

            dropdown.value =
                currentValue;

        }

    }


    // ======================================
    // UPDATE UI
    // ======================================

    function updateUI() {

        const selectedColumns =
            getSelectedColumns();

        // Keep only currently selected columns
        columnOrder =
            columnOrder.filter(
                column =>
                    selectedColumns.includes(column)
            );

        // Add any newly selected columns
        selectedColumns.forEach(column => {

            if (!columnOrder.includes(column)) {

                columnOrder.push(column);

            }

        });

        updateSelectedColumns(
            columnOrder
        );

        updatePreview(
            columnOrder
        );

        // Refresh rename dropdowns
        document
            .querySelectorAll(".original-name")
            .forEach(dropdown => {

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

    function updateSelectedColumns(
        columns
    ) {

        if (!selectedColumnsList) {
            return;
        }


        selectedColumnsList.innerHTML =
            "";


        columns.forEach(
            (column, index) => {

                const li =
                    document.createElement(
                        "li"
                    );


                li.draggable = true;

                li.dataset.column =
                    column;
                    
                    li.classList.add("output-column-item");


                const isOptional =
                    selectedOptionalColumns.includes(
                        column
                    );


                if (isOptional) {

                    li.classList.add(
                        "optional-column-output"
                    );

                }


                li.innerHTML = `

                    <span
                        class="drag-handle"
                        title="Drag to reorder">

                        ☰

                    </span>


                    <strong>
                        ${index + 1}.
                    </strong>


                    <span class="output-column-name">
                        ${escapeHtml(
                            getDisplayName(column)
                        )}
                    </span>


                    ${
                        isOptional
                            ? `
                            <button
                                type="button"
                                class="remove-column-btn"
                                data-column="${escapeAttribute(column)}"
                                title="Remove column">

                                ✕

                            </button>
                            `
                            : ""
                    }

                `;


                selectedColumnsList.appendChild(
                    li
                );


                // Remove optional column
                const removeBtn =
                    li.querySelector(
                        ".remove-column-btn"
                    );


                if (removeBtn) {

                    removeBtn.addEventListener(
                        "click",
                        function () {

                            const columnName =
                                this.dataset.column;


                            selectedOptionalColumns =
                                selectedOptionalColumns.filter(
                                    item =>
                                        item !==
                                        columnName
                                );


                            columnOrder =
                                columnOrder.filter(
                                    item =>
                                        item !==
                                        columnName
                                );


                            const addButton =
                                document.querySelector(
                                    `.add-column-btn[data-column="${CSS.escape(columnName)}"]`
                                );


                            if (addButton) {

                                const item =
                                    addButton.closest(
                                        ".column-item"
                                    );


                                if (item) {

                                    item.style.display =
                                        "flex";

                                }

                            }


                            updateUI();

                        }
                    );

                }


                // Drag start
                li.addEventListener(
                    "dragstart",
                    function (event) {

                        li.classList.add(
                            "dragging"
                        );


                        event.dataTransfer.effectAllowed =
                            "move";


                        event.dataTransfer.setData(
                            "text/plain",
                            column
                        );

                    }
                );


                // Drag end
                li.addEventListener(
                    "dragend",
                    function () {

                        li.classList.remove(
                            "dragging"
                        );

                    }
                );


                // Drag over
                li.addEventListener(
                    "dragover",
                    function (event) {

                        event.preventDefault();

                        event.dataTransfer.dropEffect =
                            "move";

                    }
                );


                // Drop
                li.addEventListener(
                    "drop",
                    function (event) {

                        event.preventDefault();


                        const draggedColumn =
                            event.dataTransfer.getData(
                                "text/plain"
                            );


                        if (
                            !draggedColumn ||
                            draggedColumn === column
                        ) {

                            return;

                        }


                        const fromIndex =
                            columnOrder.indexOf(
                                draggedColumn
                            );


                        const toIndex =
                            columnOrder.indexOf(
                                column
                            );


                        if (
                            fromIndex === -1 ||
                            toIndex === -1
                        ) {

                            return;

                        }


           columnOrder.splice(
        fromIndex,
        1
    );

    columnOrder.splice(
        toIndex,
        0,
        draggedColumn
    );

    updateUI();


                        updateUI();

                    }
                );

            }
        );

    }


    // ======================================
    // PREVIEW
    // ======================================

    function updatePreview(
        columns
    ) {

        if (
            !previewHeader ||
            !previewRow
        ) {

            return;

        }


        previewHeader.innerHTML =
            "";


        previewRow.innerHTML =
            "";


        columns.forEach(
            column => {

                const th =
                    document.createElement(
                        "th"
                    );


                th.textContent =
                    getDisplayName(
                        column
                    );


                previewHeader.appendChild(
                    th
                );


                const td =
                    document.createElement(
                        "td"
                    );


                td.textContent =
                    sampleData[column] ||
                    "N/A";


                previewRow.appendChild(
                    td
                );

            }
        );

    }


    // ======================================
    // SAVE TEMPLATE
    // ======================================

    async function saveTemplate() {

        const name =
            templateName?.value.trim();


        const description =
            templateDescription?.value.trim();


        if (!name) {

            alert(
                "Please enter a Template Name."
            );

            templateName?.focus();

            return;

        }


        if (!description) {

            alert(
                "Please enter a Description."
            );

            templateDescription?.focus();

            return;

        }


        if (
            !validPattern.test(name)
        ) {

            alert(
                "Only letters, numbers, spaces, '_' and '-' are allowed."
            );

            templateName.focus();

            return;

        }


        // Validate rename rows
        const renameRows =
            document.querySelectorAll(
                ".rename-row"
            );


        for (
            const row of renameRows
        ) {

            const original =
                row.querySelector(
                    ".original-name"
                )?.value.trim();


            const display =
                row.querySelector(
                    ".display-name"
                )?.value.trim();


            if (
                original === "" &&
                display === ""
            ) {

                continue;

            }


            if (
                original !== "" &&
                display === ""
            ) {

                alert(
                    "Please enter a Display Name."
                );

                row.querySelector(
                    ".display-name"
                ).focus();

                return;

            }


            if (
                original === "" &&
                display !== ""
            ) {

                alert(
                    "Please select an Original Name."
                );

                row.querySelector(
                    ".original-name"
                ).focus();

                return;

            }


            if (
                !validPattern.test(display)
            ) {

                alert(
                    "Display Name contains invalid characters."
                );

                row.querySelector(
                    ".display-name"
                ).focus();

                return;

            }

        }


        // Check duplicate name
        try {

            const response =
                await fetch(
                    `${API_BASE}/templates`
                );


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            const templates =
                Array.isArray(data)
                    ? data
                    : data.templates || [];


            const duplicate =
                templates.find(
                    template => {

                        const sameName =
                            String(
                                template.template_name ||
                                ""
                            )
                            .trim()
                            .toLowerCase()
                            ===
                            name.toLowerCase();


                        const differentTemplate =
                            String(
                                template.template_id
                            )
                            !==
                            String(
                                currentTemplateId
                            );


                        return (
                            sameName &&
                            (
                                currentTemplateId ===
                                null ||
                                differentTemplate
                            )
                        );

                    }
                );


            if (duplicate) {

                alert(
                    "A template with this name already exists."
                );

                return;

            }


            if (saveModal) {

                saveModal.style.display =
                    "flex";

            }

        } catch (error) {

            console.error(
                "Duplicate check error:",
                error
            );


            alert(
                "Unable to check existing templates."
            );

        }

    }


    // ======================================
    // CLOSE SAVE MODAL
    // ======================================

    function closeSaveModal() {

        if (saveModal) {

            saveModal.style.display =
                "none";

        }

    }


    // ======================================
    // CONFIRM SAVE
    // ======================================

    async function confirmSaveTemplate() {

        if (saveModal) {

            saveModal.style.display =
                "none";

        }


        const name =
            templateName.value.trim();


        const description =
            templateDescription.value.trim();


        const columns =
            columnOrder.map(
                (column, index) => {

                    const displayName =
                        getDisplayName(
                            column
                        );


                    return {

                        original_column:
                            column,

                        display_column:
                            displayName,

                        column_order:
                            index + 1,

                        is_mandatory:
                            mandatoryColumns.includes(
                                column
                            ),

                        column_id:
                            index + 1,

                        column_name:
                            column,

                        display_name:
                            displayName,

                        type:
                            "string",

                        default_value:
                            "",

                        order:
                            index + 1,

                        mandatory:
                            mandatoryColumns.includes(
                                column
                            ),

                        default:
                            mandatoryColumns.includes(
                                column
                            )

                    };

                }
            );


        const templateData = {

            template_name:
                name,

            description:
                description,

            created_by:
                "Tejal",

            modified_by:
                "Tejal",

            columns:
                columns

        };


        try {

            const url =
                currentTemplateId
                    ? `${API_BASE}/template/${currentTemplateId}`
                    : `${API_BASE}/create-template`;


            const method =
                currentTemplateId
                    ? "PUT"
                    : "POST";


            const response =
                await fetch(
                    url,
                    {

                        method:
                            method,

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                templateData
                            )

                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                data.error
            ) {

                alert(
                    data.error ||
                    "Unable to save the template."
                );

                return;

            }


            alert(
                data.message ||
                (
                    currentTemplateId
                        ? "Template updated successfully."
                        : "Template saved successfully."
                )
            );


            currentTemplateId =
                null;


            resetTemplateForm();


            await loadTemplates();

        } catch (error) {

            console.error(
                "Save error:",
                error
            );


            alert(
                "Something went wrong while saving the template."
            );

        }

    }


    // ======================================
    // RESET FORM
    // ======================================

    function resetTemplateForm() {

        currentTemplateId =
            null;


        if (templateName) {

            templateName.value =
                "";

            templateName.style.borderColor =
                "#d1d5db";

        }


        if (templateDescription) {

            templateDescription.value =
                "";

        }


        if (saveTemplateBtn) {

            saveTemplateBtn.textContent =
                "Save Template";

        }


        selectedOptionalColumns =
            [];


        columnOrder =
            [];


        document
            .querySelectorAll(
                ".column-item"
            )
            .forEach(item => {

                item.style.display =
                    "flex";

            });


        if (renameContainer) {

            renameContainer.innerHTML =
                "";

            addRenameRow();

        }


        updateUI();

    }


    // ======================================
    // EDIT MODAL
    // ======================================

    async function openEditModal() {

        if (!editModal) {
            return;
        }


        editModal.style.display =
            "flex";


        await loadTemplates();

    }


    function closeEditModal() {

        if (editModal) {

            editModal.style.display =
                "none";

        }

    }


    // ======================================
    // LOAD TEMPLATES
    // ======================================

    async function loadTemplates() {

        try {

            const response =
                await fetch(
                    `${API_BASE}/templates`
                );


            if (!response.ok) {

                throw new Error(
                    `HTTP error: ${response.status}`
                );

            }


            const data =
                await response.json();


            console.log(
                "Templates received:",
                data
            );


            const templates =
                Array.isArray(data)
                    ? data
                    : data.templates || [];


            populateTemplateDropdown(
                editTemplateDropdown,
                templates
            );


            populateTemplateDropdown(
                deleteTemplateDropdown,
                templates
            );


            return templates;

        } catch (error) {

            console.error(
                "Error loading templates:",
                error
            );


            alert(
                "Unable to load templates. Make sure the Flask backend is running."
            );


            return [];

        }

    }


    // ======================================
    // POPULATE TEMPLATE DROPDOWN
    // ======================================

    function populateTemplateDropdown(
        dropdown,
        templates
    ) {

        if (!dropdown) {
            return;
        }


        dropdown.innerHTML =
            `<option value="">Choose Template</option>`;


        templates.forEach(
            template => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    template.template_id;


                option.textContent =
                    template.template_name;


                dropdown.appendChild(
                    option
                );

            }
        );

    }


    // ======================================
    // OPEN SELECTED TEMPLATE
    // ======================================

    async function openSelectedTemplate() {

        const id =
            editTemplateDropdown?.value;


        if (!id) {

            alert(
                "Please select a template."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE}/template/${id}`
                );


            if (!response.ok) {

                throw new Error(
                    `HTTP error: ${response.status}`
                );

            }


            const template =
                await response.json();


            currentTemplateId =
                template.template_id;


            templateName.value =
                template.template_name ||
                "";


            templateDescription.value =
                template.description ||
                "";


            if (saveTemplateBtn) {

                saveTemplateBtn.textContent =
                    "Update Template";

            }


            loadTemplateColumns(
                template
            );


            closeEditModal();

        } catch (error) {

            console.error(
                "Edit error:",
                error
            );


            alert(
                "Unable to open the selected template."
            );

        }

    }


    // ======================================
    // LOAD TEMPLATE COLUMNS
    // ======================================

    function loadTemplateColumns(
        template
    ) {

        selectedOptionalColumns =
            [];


        columnOrder =
            [];


        document
            .querySelectorAll(
                ".column-item"
            )
            .forEach(item => {

                item.style.display =
                    "flex";

            });


        if (renameContainer) {

            renameContainer.innerHTML =
                "";

        }


        let columns =
            template.columns;


        // Backend may return JSON string
        if (
            !columns &&
            template.column_configuration
        ) {

            try {

                columns =
                    typeof template.column_configuration ===
                    "string"

                        ? JSON.parse(
                            template.column_configuration
                        )

                        : template.column_configuration;

            } catch (error) {

                console.error(
                    "Column JSON error:",
                    error
                );

            }

        }


        if (
            !Array.isArray(columns)
        ) {

            columns = [];

        }


        columns.sort(
            (a, b) => {

                const orderA =
                    Number(
                        a.order ??
                        a.column_order ??
                        9999
                    );


                const orderB =
                    Number(
                        b.order ??
                        b.column_order ??
                        9999
                    );


                return orderA - orderB;

            }
        );


        columns.forEach(
            columnData => {

                const column =
                    columnData.column_name ||
                    columnData.original_column ||
                    columnData.column ||
                    "";


                if (!column) {
                    return;
                }


                columnOrder.push(
                    column
                );


                // Optional column
                if (
                    optionalColumns.includes(
                        column
                    )
                ) {

                    if (
                        !selectedOptionalColumns.includes(
                            column
                        )
                    ) {

                        selectedOptionalColumns.push(
                            column
                        );

                    }


                    const addButton =
                        document.querySelector(
                            `.add-column-btn[data-column="${CSS.escape(column)}"]`
                        );


                    if (addButton) {

                        const item =
                            addButton.closest(
                                ".column-item"
                            );


                        if (item) {

                            item.style.display =
                                "none";

                        }

                    }

                }


                // Rename
                const display =
                    columnData.display_name ||
                    columnData.display_column ||
                    "";


                if (
                    display &&
                    display.trim() !== "" &&
                    display.trim() !== column
                ) {

                    addRenameRow({

                        original_column:
                            column,

                        display_column:
                            display

                    });

                }

            }
        );


        if (
            document.querySelectorAll(
                ".rename-row"
            ).length === 0
        ) {

            addRenameRow();

        }


        updateUI();

    }


    // ======================================
    // DELETE MODAL
    // ======================================

    async function openDeleteModal() {

        if (!deleteModal) {
            return;
        }


        deleteModal.style.display =
            "flex";


        await loadTemplates();

    }


    function closeDeleteModal() {

        if (deleteModal) {

            deleteModal.style.display =
                "none";

        }

    }


    // ======================================
    // DELETE TEMPLATE
    // ======================================

    async function deleteSelectedTemplate() {

        const id =
            deleteTemplateDropdown?.value;


        if (!id) {

            alert(
                "Please select a template."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete this template?"
            );


        if (!confirmed) {

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE}/template/${id}`,
                    {
                        method:
                            "DELETE"
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                alert(
                    result.error ||
                    "Unable to delete the template."
                );

                return;

            }


            alert(
                result.message ||
                "Template deleted successfully."
            );


            closeDeleteModal();


            await loadTemplates();


            if (
                String(currentTemplateId) ===
                String(id)
            ) {

                resetTemplateForm();

            }

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );


            alert(
                "Something went wrong while deleting the template."
            );

        }

    }


    // ======================================
    // ESCAPE HTML
    // ======================================

    function escapeHtml(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ======================================
    // ESCAPE ATTRIBUTE
    // ======================================

    function escapeAttribute(value) {

        return String(value)
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startTemplateManagement);
    } else {
        startTemplateManagement();
    }

})();
