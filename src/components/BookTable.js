import React from 'react';
export default function BookTable({ filteredData }) {

  const columns = [
    { field: 'title', headerName: 'Book-Title' },
    { field: 'first_publish_year', headerName: 'Year' },
    { field: 'author_name', headerName: 'Author' }
  ]

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {
              columns && columns.map((column) => {
                return (
                  <th key={column}>{column.headerName}</th>
                )
              })
            }
          </tr>


          {
            filteredData.map((data, i) => {
              return (
                <tr key={i}>
                  <td> {data.title}</td>
                  <td> {data.first_publish_year}</td>
                  <td>
                    {
                      data?.author_name?.map((author) => {
                        return (
                          <button> {data.author_name}</button>
                        )
                      })
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
