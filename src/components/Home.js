import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import { Button, Form, Modal } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import Datacard from "./cards/Datacard";
import { DataGrid } from "@mui/x-data-grid";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setTickets(list);
        });

        const docRef = doc(db, "balance", "ayo");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const balance = docSnap.data();
          setBankBalance(parseInt(balance.money));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [bankBalance, setBankBalance] = useState(0)

  console.log(bankBalance);


  const [tickets, setTickets] = useState([]);
  const expenses = tickets.filter((item) => item.type === "expense").length;
  const deposits = tickets.filter((item) => item.type === "deposit").length;
  const all = tickets.length;

  function formatNumberWithDollar(number) {
    let formatting_options = {
       style: 'currency',
       currency: 'USD',
       minimumFractionDigits: 2,
    }
    // users can see how locale passed as a parameter.
    let dollarString = new Intl.NumberFormat("en-US", formatting_options);
    let finalString = dollarString.format(number);

    return(finalString)

 }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const [ticketInput, setTicketInput] = useState({
    amount: "",
    to: "",
    type: "",
    details: "",
    timestamp: serverTimestamp(),
    time: year + "-" + month + "-" + hour + ":" + minutes,
  });


  function handleChange(event) {
    const { name, value } = event.target;

    setTicketInput({
      ...ticketInput,
      [name]: value,
    });
  }

  const handleSubmit = async () => {

    const docRe = doc(db, "balance", "ayo");
    const docSnap = await getDoc(docRe);

    let value = 0;
    

    if (docSnap.exists()) {
      const balance = docSnap.data();
      value = parseInt((balance.money)*100)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    if(ticketInput.type === 'expense'){

      const amount = parseInt((ticketInput.amount) * 100)

      const x = (value - amount)

      console.log(amount,'amount',value,'value');

      await setDoc(doc(db, "balance", "ayo"), {
        money: (x/100),  
      });

      setBankBalance(x/100)

    }
    if(ticketInput.type === 'deposit' || ticketInput.type === 'income'){

      const amount = parseInt((ticketInput.amount) * 100)

      const x = ((value + amount))

      await setDoc(doc(db, "balance", "ayo"), {
        money: (x/100),  
      });

      setBankBalance(x/100)

    }


    const docRef = await addDoc(collection(db, "tickets"), ticketInput);

    let list = [];

    const querySnapshot = await getDocs(collection(db, "tickets"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
      setTickets(list);
    });

    setTicketInput({
      amount: "",
      to: "",
      type: "",
      details: "",
      timestamp: serverTimestamp(),
      time: year + "-" + month + "-" + hour + ":" + minutes,
    })


  
  };

  




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "tickets", id));
    setTickets((prev) => {
      return prev.filter((user, index) => {
        return user.id !== id;
      });
    });
  };

  const handleEdit = async (id) => {
    setShow(true);
    setTickets((prev) => {
      return prev.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });

    const item = tickets.find((noteItem, index) => {
      return noteItem.id === id;
    });

    setTicketInput({
      timestamp: item.timestamp,
      to: item.to,
      amount: item.amount,
      type: item.type,
      details: item.details,
      time: item.time,
    });

    const docRe = doc(db, "balance", "ayo");
    const docSnap = await getDoc(docRe);

    let value = 0;
    

    if (docSnap.exists()) {
      const balance = docSnap.data();
      value = parseInt((balance.money)*100)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    if(item.type === 'expense'){

      const amount = parseInt((item.amount) * 100)

      const x = (value + amount)

      console.log(amount,'amount',value,'value');

      await setDoc(doc(db, "balance", "ayo"), {
        money: (x/100),  
      });

      setBankBalance(x/100)

    }
    if(item.type === 'deposit' || ticketInput.type === 'income'){

      const amount = parseInt((item.amount) * 100)

      const x = ((value - amount))

      await setDoc(doc(db, "balance", "ayo"), {
        money: (x/100),  
      });

      setBankBalance(x/100)

    }
    if(item.type === 'income' || ticketInput.type === 'income'){

      const amount = parseInt((item.amount) * 100)

      const x = ((value - amount))

      await setDoc(doc(db, "balance", "ayo"), {
        money: (x/100),  
      });

      setBankBalance(x/100)

    }

    await deleteDoc(doc(db, "tickets", id));
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: "time",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      editable: true,
    },
    {
      field: "to",
      headerName: "To",
      width: 100,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: true,
    },
    {
      field: "details",
      headerName: "Detail",
      width: 350,
      editable: true,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            {/* <Button
              variant="secondary"
              onClick={() => handleClick(params.row.id)}
              size="sm"
            >
              <MdIcons.MdDelete />
            </Button> */}

            <Button
              variant="secondary"
              style={{ marginLeft: 10 }}
              onClick={() => handleEdit(params.row.id)}
              size="sm"
            >
              <AiIcons.AiFillEdit />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className="pages mt-5">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Jackie
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#BDD7F1"}
              color={"#061B64"}
              context={"Total Entries"}
              bgcolor={"#D1E9FC"}
              figure={all}
              icon={<AiIcons.AiOutlineFundProjectionScreen />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#C1E6F9"}
              color={"#04297A"}
              context={"Deposit(s)"}
              bgcolor={"#D0F2FF"}
              figure={deposits}
              icon={<MdIcons.MdPriorityHigh />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F9EEBD"}
              color={"#7A4F01"}
              context={"Balance"}
              bgcolor={"#FFF7CD"}
              figure={formatNumberWithDollar(bankBalance)}
              icon={<HiIcons.HiOutlineTicket />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F7D1C7"}
              color={"#7A0C2E"}
              context={"Expenses"}
              bgcolor={"#FFE7D9"}
              figure={expenses}
              icon={<AiIcons.AiOutlineBug />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Button
              className="m-1"
              variant="primary"
              size="sm"
              onClick={handleShow}
            >
              {" "}
              Add Ticket
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Transaction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Transaction name</Form.Label>
              <Form.Control
                type="text"
                placeholder='Ticket Name'
                onChange={handleChange}
                value={ticketInput.name}
                name="name"
                autoFocus
              />
            </Form.Group> */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="$"
                      onChange={handleChange}
                      value={ticketInput.amount}
                      name="amount"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>For</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="bread/fuel/chicken Inn"
                      onChange={handleChange}
                      value={ticketInput.to}
                      name="to"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="expense/deposit"
                      onChange={handleChange}
                      value={ticketInput.type}
                      name="type"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={handleChange}
                      value={ticketInput.details}
                      name="details"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  submit
                </Button>
              </Modal.Footer>
            </Modal>
            <Box sx={{ py: 2, height: 450, backgroundColor: "white" }}>
              <DataGrid
                rows={tickets}
                columns={columns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
