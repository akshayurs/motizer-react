import { useEffect, useState } from 'react'
import DetectionTableRow from './DetectionTableRow'
function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
function gernerateJSON(text, fields) {
  let csv = ''
}
function gernerateCSV(text, fields) {
  let csv = ''
  fields.forEach((field, index) => {
    if (index !== 0) csv += ','
    csv += field.param
  })
  csv += '\n'
  csv += text
    .split('\n')
    .map((line) => {
      if (line.length === 0) return ''
      let details = ''
      fields.forEach((field, index) => {
        if (index !== 0) details += ','
        details += line.substring(field.start, field.end).trim()
      })
      details += '\n'
      return details
    })
    .join('')

  download('tickets.csv', csv)
}
function Detection() {
  const [openTheatrePopup, changeTheatrePopup] = useState(true)
  const [openFileUpload, changeFileUpload] = useState(false)
  const [text, changeText] = useState('')
  const [fields, changeFields] = useState([])
  const theatreModelList = JSON.parse(localStorage.getItem('theatreModelList'))

  const openTheatre = (theatre) => {
    if (theatre === '') return
    const storedobj = localStorage.getItem(theatre)
    changeFields(JSON.parse(storedobj))
    changeTheatrePopup(false)
    changeFileUpload(true)
  }
  return (
    <div className="detection">
      {openTheatrePopup && (
        <div className="popup">
          <div className="container">
            <div className="title">Choose Theatre Model</div>
            {theatreModelList === null ? (
              <div className="no-models">No models saved</div>
            ) : (
              <>
                <ol>
                  {theatreModelList.map((item, index) => (
                    <li
                      onClick={() => {
                        openTheatre(item)
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
      )}
      {openFileUpload && (
        <div className="popup">
          <div className="file-upload-container">
            <div className="title">Open Movie Tickets</div>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => {
                const fr = new FileReader()
                fr.onload = function () {
                  changeText(fr.result)
                  changeFileUpload(false)
                }
                fr.readAsText(e.target.files[0])
              }}
            />
            <div className="or">or</div>
            <textarea
              placeholder="Copy Paste Tickets Here"
              cols="30"
              rows="10"
              onChange={(e) => {
                changeText(e.target.value)
                changeFileUpload(false)
              }}
            ></textarea>
          </div>
        </div>
      )}
      <div className="exports">
        <button
          onClick={() => {
            gernerateCSV(text, fields)
          }}
        >
          Export CSV
        </button>
        <button
          onClick={() => {
            gernerateJSON(text, fields)
          }}
        >
          Export JSON
        </button>
      </div>
      <table border="1px" align="center" cellPadding="6px" cellSpacing="1px">
        <tr>
          <th>Movie Name</th>
          <th>Screen Type</th>
          <th>Language</th>
          <th>Screen</th>
          <th>Date</th>
          <th>Seats</th>
          <th>Time</th>
        </tr>
        {text.split('\n').map((line) => {
          if (line.length === 0) return ''
          let details = []
          fields.forEach((field) => {
            details.push(line.substring(field.start, field.end))
          })
          return <DetectionTableRow args={details} />
        })}
      </table>
    </div>
  )
}

export default Detection
