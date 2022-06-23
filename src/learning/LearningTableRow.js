function TableRow(arg) {
  const { param, start, end, maxChars, selectedText } = arg.details
  return (
    <tr>
      <th>{param}</th>
      <td>{start}</td>
      <td>{end}</td>
      <td>{maxChars}</td>
      <td>{selectedText}</td>
    </tr>
  )
}

export default TableRow
