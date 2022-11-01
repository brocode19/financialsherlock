import { Box, Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { db } from "../components/firebase";

const Users = () => {
  useEffect(() => {

    const fetchData = async () =>{

      let list = [];
      try {        
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id,...doc.data()})
          setTeamMember(list)
        
        });
      
      } catch (error) {
        console.log(error);
        
      }
    }


    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fname',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lname',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
      editable: true,
    },
 
  ];
  
  const [teamMember, setTeamMember] = useState([]);




  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });

    console.log(newUser);
  }

  const submit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const person = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );

    await setDoc(doc(db, "users", person.user.uid), {
      fname: newUser.fname,
      lname: newUser.lname,
      email: newUser.email,
      password: newUser.password,
      timeStap: serverTimestamp(),
    });

    setNewUser({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="pages mt-5 vh-100" >
      <Container maxWidth="xl">
        <Grid sx={{ py: 3 }} container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
          <Box sx={{ py:2,height: 450,backgroundColor:'white' }}>
      <DataGrid
        rows={teamMember}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>


          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <Card
          sx={{
            py: 2,
            height:450,
            bgcolor: 'white'}}>
              <div className="m-2">
              <Typography variant="h6" sx={{ mb: 1 }}>
        Add User
      </Typography>
              <Form>

<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label></Form.Label>
  <Form.Control
    type="text"
    placeholder="first name"
    name="fname"
    value={newUser.fname}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Interest</Form.Label>
  <Form.Control
    type="text"
    placeholder="last name"
    name="lname"
    value={newUser.lname}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Term(months)</Form.Label>
  <Form.Control
    type="text"
    placeholder="email"
    name="email"
    value={newUser.email}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Term(months)</Form.Label>
  <Form.Control
    type="password"
    placeholder="password"
    name="password"
    value={newUser.password}
    onChange={handleChange}
  />
</Form.Group>

<div className="loan-buttons">
  <Button onClick={submit} variant="primary" type="submit">
    Submit
  </Button>
</div>
</Form>
              </div>

            </Card>


          </Grid>
        </Grid>
      </Container>


    </div>
  );
};

export default Users;
