import React, {useState} from 'react';

import { Button, Container, Modal, Form, Spinner, Col } from 'react-bootstrap';
import {gql, useMutation} from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($email: String!) {
    createUser(data: {email: $email}) {
      email
      fib
      id
  }
}
`;

const ModalComponent: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [processResponse, setProcessResponse] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  let startTime = 0;
  const [email, setEmail] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleShowTime = () => setShowTime(true);
  const handleHideTime = () => setShowTime(false);

  const handleSetEmail = (event: any) => {
    handleHideTime();
    setEmail(event.target.value);
  }

  const onMutationCompleted = (data: any) => {
    console.log(data);
    responseEnded();
  }

  const onMutationError = (error: ApolloError) => {
    console.log(error);
    responseEnded();
  }

  const responseEnded = () => {
    setProcessResponse(false);
    setElapsedTime((performance.now() - startTime) / 1000);
    handleShowTime();
  }

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION, {onCompleted: onMutationCompleted, onError: onMutationError} );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    startTime = performance.now();
    setProcessResponse(true);
    createUserMutation({ variables: { email }, onCompleted: onMutationCompleted, onError: onMutationError });
  };

  return (
    <Container className="g-4">
      <Button variant="primary" onClick={handleShowModal}>
        Nouvel Utilisateur
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        centered
        animation={false}
      >
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton closeLabel={''}>
            <Modal.Title>Creation Utilisateur</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Adresse Mail</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Entrez une adresse mail"
                onChange={handleSetEmail}
                pattern=".+@zefir\.fr"
              />
              <Form.Control.Feedback type="invalid">Veuillez saisir une adresse mail de type `USERNAME@zefir.fr`</Form.Control.Feedback>
            </Form.Group>

            { showTime ?
              <p>Utilisateur créé en {elapsedTime} sec</p> :
              null
            }
          </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={processResponse} type="submit">
                  <Col>
                    {processResponse && (
                      <Spinner as="span" size="sm" animation="grow" variant="light" role="status"/>
                    )}
                    {processResponse && <span>Processing</span>}
                    {!processResponse && <span>Send Data to Server</span>}
                  </Col>
                </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
};

export default ModalComponent;
