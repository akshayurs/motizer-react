import { useEffect, useState } from 'react'
import DetectionTableRow from './DetectionTableRow'
import { download } from '../helpers'
function gernerateJSON(text, fields) {
  let json = []
  json = text.split('\n').map((line) => {
    if (line.length === 0) return ''
    let obj = {}
    fields.forEach((field, index) => {
      obj[field.param] = line.substring(field.start, field.end).trim()
    })
    return obj
  })

  download('tickets.json', JSON.stringify(json))
}
function maxIndex(fields) {
  let maxInd = 0
  if (fields === null || fields === undefined) return 0
  fields.forEach((field) => {
    maxInd = Math.max(maxInd, field.end)
  })
  return maxInd
}
function mergeLines(textLines, field) {
  if (field === null || field === undefined) return []
  let newText = []
  let ind = 0
  // console.log({ textLines })
  let maxind = Math.ceil(maxIndex(field) / textLines[0].length)
  console.log({ maxind, fun: maxIndex(field), len: textLines[0].lengt })
  let templine = ''
  textLines = textLines.filter(
    (line) => line.trim().replace('\r', '').length !== 0
  )

  if (maxind <= 1) {
    return textLines
  }

  textLines.forEach((line, index) => {
    console.log(line)
    console.log(templine)
    if (index % maxind !== 0) {
      templine += line
      console.log('concat')
    } else {
      console.log('push ')
      newText.push(templine)
      templine = line
    }
  })
  newText.push(templine)
  // console.log({ newText })
  return newText
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
    console.log('stored', storedobj)
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
            {theatreModelList === null || theatreModelList === undefined ? (
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
      <table border="1px" align="center" cellPadding="10px" cellSpacing="0px">
        <tr>
          {fields !== null &&
            fields !== undefined &&
            fields.length !== 0 &&
            fields.map((field, index) => {
              return <th>{field.param}</th>
            })}
        </tr>
        {text.length !== 0 &&
          mergeLines(text.split('\n'), fields).map((line) => {
            if (line.length === 0) return ''
            let details = []
            // console.log('down  foreach', fields)
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
