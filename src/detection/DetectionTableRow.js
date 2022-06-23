function DetectionTableRow({ args }) {
  const details = args
  return (
    <>
      <tr>
        {details.map((val, ind) => (
          <td key={ind}>{val}</td>
        ))}
      </tr>
    </>
  )
}

export default DetectionTableRow
