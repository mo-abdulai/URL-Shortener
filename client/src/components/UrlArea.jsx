import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios"
import Copy from "./Copy"

function UrlArea() {

    const [url, setUrl] = useState('');
    const [shortenUrl, setshortenUrl] = useState();
    const [result, setResult] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

           try{
            const response = await axios.post('http://localhost:8080/generateUrl', {url}, { responseType: 'json' });
            const json = response
            setshortenUrl(json.data.message)
            setResult(true)
           }
            catch(error){
            console.error("Error generating shorten URL:", error);
           }
            

        setUrl("")
      };

    return (
        <Container>
        <Row className="m-5 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase">URL SH.RTNE. </h2>
                  
                  <Form onSubmit={handleSubmit} className="mb-3">
                  <Form.Group className="mb-3">
                  <Form.Control
                  type="text" 
                  placeholder="Paste a link to shorten"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)} />
                  </Form.Group>

                  <div className="d-flex justify-content-center align-items-center" >
                    <div className="d-grid"  style={{ width: "150px"}}>
                      <Button variant="primary" type="submit" >
                        Go!
                      </Button>
                    </div>
                    </div>

                  </Form>
                 <div className="rounded mx-auto d-flex flex-column align-items-center justify-content-center">
                
                 {result && (<div style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center" }}>
                    <Copy text={shortenUrl}/> </div>)}
                
                 </div>
                 
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
    
}

export default UrlArea;