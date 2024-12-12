import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-responsive-dt";
import $ from "jquery";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "../../App.css";
const BASE_URL= import.meta.env.BASE_URL;
const CandidateDataTable = ({ data, isDarkMode, onEdit, onDelete }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (!tableRef.current) return;

    // Destroy existing DataTable if it exists
    const existingTable = $(tableRef.current).DataTable();
    if (existingTable) {
      existingTable.destroy();
    }

    // Initialize new DataTable
    const table = new DataTable(tableRef.current, {
      data: data,
      columns: [
        {
          title: "ID",
          data: "_id",
          render: (data) => data || "N/A",
        },
        {
          title: "Image",
          data: "image",
          render: (data) =>
            data
              ? `<img src="${BASE_URL}${data}" alt="Candidate" class="w-16 h-16 rounded-full object-cover"/>`
              : "No Image",
        },
        {
          title: "Name",
          data: "name",
          render: (data) => data || "N/A",
        },
        {
          title: "Description",
          data: "description",
          render: (data) => data || "N/A",
        },
        {
          title: "Actions",
          data: null,
          className: "text-center",
          render: () => `
            <div class="flex justify-center space-x-2">
              <button class="edit-btn text-blue-500 hover:text-blue-700 mr-2">
                <i class="fas fa-edit"></i> Edit
              </button>
            
            </div>
          `,
        },
      ],
      destroy: true,
      responsive: true,
      dom: "Bfrtip",
      buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5", "print"],
      language: {
        emptyTable: "No candidates found",
        zeroRecords: "No matching candidates found",
      },
      className: `stripe hover row-border order-column ${
        isDarkMode ? "dark-mode" : ""
      }`,
    });

    // Handle Edit button clicks
    $(tableRef.current).on("click", ".edit-btn", function () {
      const rowData = table.row($(this).closest("tr")).data();
      onEdit(rowData);
    });

    // Handle Delete button clicks
    $(tableRef.current).on("click", ".delete-btn", function () {
      const rowData = table.row($(this).closest("tr")).data();
      onDelete(rowData);
    });

    // Cleanup function
    return () => {
      $(tableRef.current).off("click", ".edit-btn");
      $(tableRef.current).off("click", ".delete-btn");
      table.destroy();
    };
  }, [data, onEdit, onDelete, isDarkMode]);

  return (
    <table
      ref={tableRef}
      className={`display w-full ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default CandidateDataTable;
