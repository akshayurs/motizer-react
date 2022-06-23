function SelectionPopup(args) {
  const {
    changeConfirm,
    param,
    start,
    end,
    maxChars,
    selectedText,
    changeOpenPopup,
  } = args.details
  return (
    <div className="popup ">
      <div className="container selection-container">
        <table>
          <tr>
            <th>Parameter : </th>
            <td>{param}</td>
          </tr>
          <tr>
            <th>Start :</th>
            <td>{start}</td>
          </tr>
          <tr>
            <th>End :</th>
            <td>{end}</td>
          </tr>
          <tr>
            <th>Max Chars :</th>
            <td>{maxChars}</td>
          </tr>
          <tr>
            <th>Selected Text :</th>
            <td>{selectedText}</td>
          </tr>
        </table>
        <div className="buttons">
          <button
            onClick={() => {
              changeOpenPopup(false)
              changeConfirm(false)
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              changeOpenPopup(false)
              changeConfirm(true)
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectionPopup
