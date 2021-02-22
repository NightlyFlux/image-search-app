import { useEffect, useState } from 'react'
import Form from './components/Form'
import ImageList from './components/ImageList'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getImages = async () => {
    await fetch(
      `https://pixabay.com/api/?key=20377226-949b34f72cb65f541c8202704&q=${searchQuery}&per_page=30&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data.hits)
        setTotalPages(Math.ceil(data.totalHits / 30))
        setError(false)
      })
  }

  const searchImage = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === '') {
      setError(true)
      return
    }
    getImages()
    setCurrentPage(1)
  }

  useEffect(() => {
    if (searchQuery.trim() === '') return
    getImages()

    document.querySelector('.jumbotron').scrollIntoView({ behavior: 'smooth' })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const previousPage = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    if (currentPage === totalPages) return
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className='contaier'>
      <div className='jumbotron'>
        <p className='lead text-center'>Pixabay Image Search</p>
        <Form
          setSearchQuery={setSearchQuery}
          searchImage={searchImage}
          error={error}
        />
      </div>
      <div className='row justify-content-center'>
        <ImageList images={images} />
        {currentPage === 1 || (
          <button className='btn btn-info mr-2' onClick={previousPage}>
            Previous
          </button>
        )}
        {currentPage === totalPages || (
          <button className='btn btn-info align-middle' onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default App
