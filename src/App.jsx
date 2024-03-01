import axios from 'axios'
import './App.css'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState([])
  const [data, setData] = useState(null)
  const [bgColor, setBgColor] = useState('#ffffff')

  const fetchAllUser = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      setUser(response.data.users)
      setData(getRandomUser(response.data.users))
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  }
  console.log(user);
  console.log(data);

  const getRandomUser = (users) => {
    const userIndex = Math.floor(Math.random() * users.length)
    return users[userIndex]
  }
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  const handleRefresh = () => {
    setData(getRandomUser(user));
    setBgColor(getRandomColor())
  }
  useEffect(() => {
    fetchAllUser()
    setBgColor(getRandomColor())
  }, [])

  return (
    <>
      <div className="app">
        <Container>
          <h1>Random User Generator</h1>
          {data && (
            <Row style={{ backgroundColor: bgColor, borderRadius: '20px' }}>
              <Col xs={6} md={6} className='d-flex justify-content-center align-items-center'>
                <Image src={data.image} roundedCircle className='border border-3 my-2 h-75' />
              </Col>
              <Col>
                <Card className='my-2'>
                  <Card.Body>
                    <Card.Title className='text-uppercase'>{`${data.firstName} ${data.lastName}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-capitalize">{data.gender}</Card.Subtitle>
                    <Card.Text className='fw-bold'>
                      <p>{`Height: ${data.height}cm || Weight: ${data.weight}kg`}</p>
                      <p>{`DOB: ${data.birthDate} || Age: ${data.age}`}</p>
                      <p>Address: {data.address.address}</p>
                      <p>Phone: {data.phone}</p>
                      <p>Company: {data.company.name}</p>
                      <p>Job Title: {data.company.title}</p>
                      <p>Email: {data.email}</p>
                    </Card.Text>
                    <Button className="justify-content-md-center" onClick={handleRefresh}>Refresh</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  )
}

export default App
