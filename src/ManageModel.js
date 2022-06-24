import { useEffect, useState } from 'react'
import { download } from './helpers'
function ManageModel() {
  const [theatreModelList, changeTheatreModelList] = useState(
    JSON.parse(localStorage.getItem('theatreModelList'))
  )
  useEffect(() => {
    if (theatreModelList !== null && theatreModelList !== undefined) {
      localStorage.setItem('theatreModelList', JSON.stringify(theatreModelList))
    }
  }, [theatreModelList])
  return (
    <div className="manage-model">
      <div className="title">Theatre Models List</div>
      <div className="theatres-container">
        {theatreModelList !== null &&
          theatreModelList !== undefined &&
          theatreModelList.map((theatreName, index) => {
            return (
              <div className="theatremodel">
                <div className="name">{theatreName}</div>
                {/* <button>edit</button> */}
                <button
                  onClick={() => {
                    changeTheatreModelList(() => {
                      return theatreModelList.filter((item) => {
                        return item !== theatreName
                      })
                    })
                    localStorage.removeItem(theatreName)
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    download(
                      theatreName + '.json',
                      localStorage.getItem(theatreName)
                    )
                  }}
                >
                  export
                </button>
              </div>
            )
          })}
        {(theatreModelList === null ||
          theatreModelList === undefined ||
          theatreModelList.length === 0) && (
          <div className="empty">No Saved model found</div>
        )}
        <div className="import">
          <p>Import Existing Model</p>
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              console.log(e.target.files.length)
              if (e.target.files.length === 0) return
              const fr = new FileReader()
              const name = e.target.files[0].name.split('.')[0]
              fr.onload = function () {
                changeTheatreModelList((prev) => {
                  if (prev === null) {
                    return [name]
                  }
                  const exist = prev.includes(name)
                  console.log('exists', exist)
                  if (exist === false) {
                    return [...prev, name]
                  }
                  return prev
                })

                localStorage.setItem(name, fr.result)
              }
              fr.readAsText(e.target.files[0])
              e.target.value = ''
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageModel
