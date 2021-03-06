import React from "react";
const columns = (unit, divideValue) => [
  {
    title: "Order",
    dataIndex: "key",
    // fixed: "left",
    width: 50,
    render: (value, record) => {
      return value + 1;
    },
  },
  {
    title: "Order Intensity Concentration",
    dataIndex: "2",
    ellipsis: true,
    width: 80,
    sorter: (a, b) => a[2]?.value - b[2]?.value,
    render: (value, record) => {
      return 255 - (record[2]?.value || 0);
    },
  },
  {
    title: "Concentration(" + unit + ")",
    dataIndex: "2",
    ellipsis: true,
    width: 80,
    sorter: (a, b) => a[2]?.["10^X"] - b[2]?.["10^X"],
    defaultSortOrder: "descend",
    render: (value, record) => {
      return record[2]?.["10^X"] / divideValue;
    },
  },
  // {
  //   title: "B_X",
  //   dataIndex: "2",
  //   sorter: (a, b) => a[2]?.["X"] - b[2]?.["X"],
  //   render: (value, record) => {
  //     return record[2]?.["X"];
  //   },
  // },
  // {
  //   title: "R_value",
  //   dataIndex: "0",
  //   sorter: (a, b) => a[0]?.value - b[0]?.value,
  //   render: (value, record) => {
  //     return record[0]?.value;
  //   },
  // },
  // {
  //   title: "G_value",
  //   sorter: (a, b) => a[1]?.value - b[1]?.value,
  //   render: (value, record) => {
  //     return record[1]?.value;
  //   },
  // },
  // {
  //   title: "R_X",
  //   dataIndex: "0",
  //   sorter: (a, b) => a[0]?.["X"] - b[0]?.["X"],
  //   render: (value, record) => {
  //     return record[0]?.["X"];
  //   },
  // },
  // {
  //   title: "G_X",
  //   dataIndex: "1",
  //   sorter: (a, b) => a[1]?.["X"] - b[1]?.["X"],
  //   render: (value, record) => {
  //     return record[1]?.["X"];
  //   },
  // },
  // {
  //   title: "R_10^X",
  //   dataIndex: "0",
  //   sorter: (a, b) => a[0]?.["10^X"] - b[0]?.["10^X"],
  //   render: (value, record) => {
  //     return record[0]?.["10^X"];
  //   },
  // },
  // {
  //   title: "G_10^X",
  //   dataIndex: "1",
  //   sorter: (a, b) => a[1]?.["10^X"] - b[1]?.["10^X"],
  //   render: (value, record) => {
  //     return record[1]?.["10^X"];
  //   },
  // },
];
export default columns;
