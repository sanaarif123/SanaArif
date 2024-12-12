import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-responsive-dt";
import $ from "jquery";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "../../App.css";

const UserDataTable = ({ data, isDarkMode, onEdit, onDelete }) => {
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
          visible: false  // Hide ID column
        },
        { 
          title: "Roll NO", 
          data: "rollno" 
        },
        { 
          title: "First Name", 
          data: "firstname" 
        },
        { 
          title: "Last Name", 
          data: "lastname" 
        },
        { 
          title: "Phone Number", 
          data: "phoneno" 
        },
        {
          title: "Actions",
          data: null,
          className: "text-center",
          orderable: false,
          render: () => `
            <div class="flex justify-center space-x-2">
              <button class="edit-btn text-blue-500 hover:text-blue-700 mr-2">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="delete-btn text-red-500 hover:text-red-700">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          `,
        },
      ],
      responsive: true,
      dom: "Bfrtip",
      buttons: [
        'copyHtml5', 
        'excelHtml5', 
        'csvHtml5', 
        'pdfHtml5', 
        'print'
      ],
      language: {
        emptyTable: "No data available in table"
      },
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
    });

    // Handle Edit button click
    $(tableRef.current).on('click', '.edit-btn', function() {
      const rowData = table.row($(this).closest('tr')).data();
      onEdit(rowData);
    });

    // Handle Delete button click
    $(tableRef.current).on('click', '.delete-btn', function() {
      const rowData = table.row($(this).closest('tr')).data();
      onDelete(rowData);
    });

    // Cleanup function
    return () => {
      $(tableRef.current).off('click', '.edit-btn');
      $(tableRef.current).off('click', '.delete-btn');
      table.destroy();
    };
  }, [data, onEdit, onDelete]);

  return (
    <table
      ref={tableRef}
      className={`display w-full ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Roll NO</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default UserDataTable;
