import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div>
          <Link to={'/learning'}>Learning Mode</Link>
        </div>
        <div>
          <Link to={'/detection'}>Detection Mode</Link>
        </div>
        <div>
          <Link to={'/managemodel'}>Manage Model</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
