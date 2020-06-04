    import React from 'react'
    import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
    import web3Context from '../Context/web3Context';

    const ipfsClient = require('ipfs-http-client');
    const ipfs = ipfsClient({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https'
    });


    class User extends React.Component {

        constructor(props) {
            super(props);

            this.var = {
                Records: null,
            }

            this.state = {
                FirstName: "",
                LastName: "",
                Age: 0,
                Gender: "Male",
                DOB: "",
                Height: "",
                Weight: "",
                Allergies: "",
                DOA: "",
                TOA: "",
                Description: "",
                Status: "Active",
                Medication: "",
                Comments: "",
            }
        }


        handleChange = (event) => {

            const name = event.target.name;
            const value = event.target.value;

            this.setState({
                [name]: value
            });
        }

        handleClick = async (event) => {
            event.preventDefault()
            const web3Object = await this.context;
            const contract = web3Object.contract

            const data = JSON.stringify(this.state);
            console.log(data);

            let file;

            for await (file of ipfs.add(data)) {
                console.log(file)
            }

            const hashedRecord = file.path;

            await contract.methods.createRecord(hashedRecord).send({ from: web3Object.accounts[0] })

            console.log("Done")
        }

        loadRecords = async (event) => {

            const web3Object = await this.context;
            const contract = web3Object.contract;

            const recordsHash = await contract.methods.accessRecords(web3Object.accounts[0]).call();

            //console.log(recordsHash)

            let records = [];
            for (let i in recordsHash) {

                const url = `https://ipfs.infura.io/ipfs/${recordsHash[i]}`;
                var res = await fetch(url)
                var resJson = await res.json();
                records.push(resJson);
            }
            this.var.records = records;
            return records;
        }

        getRecords() {
            console.log(this.var.Records);
        }

        render() {
            var data;
            if(this.var.Records === null){
                data = <p>Data not loaded</p>
            }else{
                data = this.getRecords()
            }
            return (
                <Container>
                    <Row>
                        <Col md={5}>
                            <Container>
                                <Card>
                                    <Card.Header><b>Add Medical Records</b></Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Row className="justify-content-md-center">
                                                <Form.Group as={Col} controlId="FirstName" lg>
                                                    <Form.Label>First Name :</Form.Label>
                                                    <Form.Control type="text" placeholder="First Name" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="LastName" lg>
                                                    <Form.Label>Last Name :</Form.Label>
                                                    <Form.Control type="text" placeholder="Last Name" name="LastName" value={this.state.LastName} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className="justify-content-md-center">
                                                <Form.Group as={Col} controlId="Age" md={6} lg={4}>
                                                    <Form.Label>Age : </Form.Label>
                                                    <Form.Control type="number" placeholder='1' name="Age" value={this.state.Age} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="DOB" md={6} lg={4}>
                                                    <Form.Label>Gender : </Form.Label>
                                                    <Form.Control as="select" value={this.state.Gender} onChange={this.handleChange} name="Gender">
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Others">Others</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="DOB" md={12} lg={4}>
                                                    <Form.Label>Date of Birth : </Form.Label>
                                                    <Form.Control type="Date" name="DOB" value={this.state.DOB} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className="justify-content-md-center">
                                                <Form.Group as={Col} controlId="Height">
                                                    <Form.Label>Height(in cms) : </Form.Label>
                                                    <Form.Control type="number" name="Height" value={this.state.Height} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="Weight">
                                                    <Form.Label>Weight(in kg) : </Form.Label>
                                                    <Form.Control type="number" name="Weight" value={this.state.Weight} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="Allergies">
                                                    <Form.Label>Allergies(if any) : </Form.Label>
                                                    <Form.Control type="textarea" name="Allergies" value={this.state.Allergies} onChange={this.handleChange} placeholder="None"></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className="justify-content-md-center">
                                                <Form.Group as={Col} controlId="DateOfAppointment">
                                                    <Form.Label>Date of Appointment :  </Form.Label>
                                                    <Form.Control type="Date" name="DOA" value={this.state.DOA} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="TimeOfAppointment">
                                                    <Form.Label>Time Of Appointment : </Form.Label>
                                                    <Form.Control type="Time" name="TOA" value={this.state.TOA} onChange={this.handleChange} required></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="Description">
                                                    <Form.Label>Description : </Form.Label>
                                                    <Form.Control type="textarea" placeholder="None" value={this.state.Description} onChange={this.handleChange} name="Description"></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="Status" md={6} lg={4}>
                                                    <Form.Label>Status : </Form.Label>
                                                    <Form.Control as="select" value={this.state.Status} onChange={this.handleChange} name="Status">
                                                        <option value="Active">Active</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="Medication" md={6} lg={8}>
                                                    <Form.Label>Medication : </Form.Label>
                                                    <Form.Control type="textarea" name="Medication" value={this.state.Medication} onChange={this.handleChange} placeholder="None"></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="Comments">
                                                    <Form.Label>Comments : </Form.Label>
                                                    <Form.Control type="textarea" name="Comments" value={this.state.comments} onChange={this.handleChange} placeholder="Comment"></Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className="justify-content-md-center">
                                                <Button varient="primary" type="submit" size="lg" onClick={this.handleClick}>Add to Blockchain</Button>
                                                <Button varient="primary" type="reset" size="lg">Reset</Button>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </Col>
                        <Col md={5}>
                            <Container>
                                <Card>
                                    <Card.Header className="justify-content-md-center"><b>Your Medical History</b></Card.Header>
                                    <Card.Title>User Records</Card.Title>
                                    <Row className="justify-content-md-center">
                                        <Button variant="primary" type="button" size="lg" onClick={this.loadRecords}>Load Records</Button>
                                    </Row>
                                    <ul>
                                        {data}
                                    </ul>
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
    User.contextType = web3Context;
    export default User;