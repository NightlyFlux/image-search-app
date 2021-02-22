import Error from '../Error'

const Form = ({ setSearchQuery, searchImage, error }) => (
  <form onSubmit={searchImage}>
    <div className='row'>
      <div className='form-group col-md-8'>
        <input
          type='text'
          className='form-control form-control-lg'
          placeholder='Search an image...'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='form-group col-md-4'>
        <input
          type='submit'
          className='btn btn-lg btn-danger btn-block'
          value='Search'
        />
      </div>
    </div>
    {error && <Error message='The search input is empty' />}
  </form>
)

export default Form
