import React, { useEffect } from 'react';

import {Row, Col, Container, Card, Spinner} from 'react-bootstrap';
import {gql, useQuery} from "@apollo/client";
import {UserDto} from "../api/models/user.dto";

const USERS_QUERY = gql`
query {
   users {
    email,
    fib,
    anagram_map {
      key,
      count
    }
  }
}
`;

const USER_SUB = gql`
subscription OnUserCreated {
    userCreated {
      email,
      fib,
      anagram_map {
        key,
        count
      }
    }
  }
`;

const UsersComponent: React.FunctionComponent = () => {
  const { data = { users: []}, loading, error, subscribeToMore } = useQuery<{users: UserDto[]}>(USERS_QUERY, {onError: error1 => console.log('!ERROR')});

  useEffect(() => {
    const unsubscribe = subscribeToMore<{ userCreated: UserDto }>({
      document: USER_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.userCreated;
        const users = { users: [...prev.users, newUser] };
        return users;
      }
    });
    return () => unsubscribe();
  }, [])

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (<div>Error! {error.message}</div>);
  }


  return (
    <Container>
      <Row xs={1} md={3} className="g-4">
        {data.users.map((user: UserDto, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Header>{user.email}</Card.Header>
              <Card.Body>
                <p><strong>Fibonacci:</strong> {user.fib}</p>
                <table className="pure-table pure-table-horizontal center">
                  <thead>
                  <tr>
                    <th>Key</th>
                    <th>Count</th>
                  </tr>
                  </thead>
                  <tbody>
                  {user.anagram_map.map(anagram => (
                    <tr key={anagram.key}>
                      <td>{anagram.key}</td>
                      <td>{anagram.count}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsersComponent;
