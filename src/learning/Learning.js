import { useEffect, useState } from 'react'
import LearningTable from './LearningTable'
import SelectionPopup from './SelectionPopup'

function Learning() {
  const [openPopup, changeOpenPopup] = useState(false)
  const [openFileUpload, changeFileUpload] = useState(true)
  const [openTheatrePopup, changeOpenTheatrePopup] = useState(false)
  const [text, changeText] = useState('')
  const [selectedText, changeSelectedText] = useState('')
  const [theatre, changeTheatre] = useState('')
  const [confirm, changeConfirm] = useState(null)
  const [fields, changeField] = useState([])
  const [fieldNames, changeFieldNames] = useState([
    'Movie Name',
    'Screen Type',
    'Language',
    'Screen',
    'Seats',
    'Date',
    'Time',
  ])
  const [fieldIndex, changeFieldIndex] = useState(0)
  const [tempField, changeTempField] = useState({})
  function handleSelect(e) {
    let text = e.target.value
    text = text.substring(e.target.selectionStart, e.target.selectionEnd)
    const maxChars = e.target.selectionEnd - e.target.selectionStart
    if (maxChars === 0) {
      return
    }
    if (fields.length > 0 && text === fields.at(-1).selectedText) {
      return
    }
    changeSelectedText(text)
    const newField = {
      param: fieldNames[fieldIndex],
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
      maxChars,
      selectedText: text,
    }
    changeTempField(newField)
    changeOpenPopup(true)
  }
  useEffect(() => {
    if (confirm === true) {
      changeConfirm(false)
      changeField((prev) => [...prev, tempField])
      changeFieldIndex((prev) => prev + 1)
    }
  }, [confirm, tempField])

  return (
    <div className="learning">
      {openPopup && (
        <SelectionPopup
          details={{ changeOpenPopup, changeConfirm, ...tempField }}
        />
      )}
      {openTheatrePopup && (
        <div className="popup">
          <div className="container theatre-container">
            <p className="title">Enter Theatre Name:</p>
            <input
              type="text"
              value={theatre}
              onChange={(e) => changeTheatre(e.target.value)}
            />
            <button
              onClick={() => {
                changeOpenTheatrePopup(false)
                window.location.pathname = '/'
                if (localStorage.getItem(theatre) == null) {
                  let theatreModelList = JSON.parse(
                    localStorage.getItem('theatreModelList')
                  )
                  if (theatreModelList !== null) {
                    theatreModelList.append(theatre)
                  } else {
                    theatreModelList = [theatre]
                  }
                  localStorage.setItem(
                    'theatreModelList',
                    JSON.stringify(theatreModelList)
                  )
                }
                localStorage.setItem(theatre, JSON.stringify(fields))
              }}
            >
              Create Model
            </button>
          </div>
        </div>
      )}
      <div className="container">
        <p className="choose-field">Select {fieldNames[fieldIndex]}</p>
        <textarea
          placeholder="Paste Ticket Here"
          onSelect={handleSelect}
          value={text}
          onChange={(e) => changeText(e.target.value)}
        ></textarea>
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
              <button onClick={() => changeFileUpload(false)}>
                Copy & Paste
              </button>
            </div>
          </div>
        )}

        <LearningTable details={fields} fieldNames={fieldNames} />

        <button
          className="next"
          onClick={() => {
            changeOpenTheatrePopup(true)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Learning
