import LearningTableRow from './LearningTableRow'

function LearningTable({ details, fieldNames }) {
  return (
    <table border="1px" cellPadding="8px">
      <tr>
        <th>Parameter</th>
        <th>Start Position</th>
        <th>End Position</th>
        <th>Max Chars</th>
        <th>Sample Selected</th>
      </tr>
      {fieldNames.map((row, index) => {
        if (details.length > index) {
          return <LearningTableRow details={details[index]} key={index} />
        } else {
          return <LearningTableRow details={{ param: row }} key={index} />
        }
      })}
    </table>
  )
}

export default LearningTable
