import styled from "styled-components";

 const TableContainer = styled.div`
  padding: 1rem;
  text-align-last: center;
  text-align: -webkit-center;
  margin-top: 2rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
   
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    tfoot {
      tr:first-child {
        td {
          border-top: 2px solid black;
        }
      }
      font-weight: bolder;
    }
  }
  input{
    margin-bottom: 2rem;
  }
`;

export default TableContainer
