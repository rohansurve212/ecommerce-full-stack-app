/** @format */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col>
          <Form.Control
            type='text'
            name='q'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Product'
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        </Col>
        <Col>
          <Button type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default SearchBox
