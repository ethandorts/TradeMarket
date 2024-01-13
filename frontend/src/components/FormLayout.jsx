import { Container, Col, Row } from 'react-bootstrap';

const FormLayout = ({children}) => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={10} md={4}>
                { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormLayout