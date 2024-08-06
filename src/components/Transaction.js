import React from "react";

function Transaction(props) {
  console.log(props.transactions);

  if (props.loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );

  return (
    <>
      {props.transactions.map(({ id, date, description, category, amount }) => {
        return (
          <tr key={id}>
            <td>{date}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{amount}</td>
          </tr>
        );
      })}
    </>
  );
}
export default Transaction;