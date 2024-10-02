import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Datacard from "./cards/Datacard";
// import * as AiIcons from "react-icons/ai";
// import * as MdIcons from "react-icons/md";
// import * as HiIcons from "react-icons/hi";
import { Box, Container, Grid, Typography } from "@mui/material";
import AreaLineChart from './charts/AreaLineChart';
import BarGraph from './charts/BarGraph';
import HorizontalBarChart from './charts/Financial_symbols';


function App() {
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState([]);

    console.log(items)

    const account_balance = items.length > 0 ? items[0].account_balance : 0;
    const profit_loss = items.length > 0 ? items[0].total_profit_from_closed_trades - items[0].total_loss_from_closed_trades : 0;
    const total_buy_trades = items.length > 0 ? items[1].total_buy_trades : 0;
    const total_sell_trades = items.length > 0 ? items[1].total_sell_trades : 0;
    const total_trades = items.length > 0 ? items[1].total_trades : 0;
    const trades_won = items.length > 0 ? items[1].trades_won : 0;
    const trades_lost = items.length > 0 ? items[1].trades_lost : 0;
    const win_rate = items.length > 0 ? items[1].win_rate : 0;
  
   
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/items');

                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:5000/api/stats');
              setStats(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

    // const addItem = async () => {
    //     const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    //     try {
    //         const response = await axios.post('http://127.0.0.1:5000/api/items', newItem);
    //         setItems([...items, response.data]);
    //     } catch (error) {
    //         console.error('Error adding item:', error);
    //     }
    // };



    return (
        <div className='pages mt-5 pt-5'>

            {/* <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}
            {/* <button onClick={addItem}>Add Item</button> */}
            <Container maxWidth="xl">
            <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <Datacard
              iconCircle={"#BDD7F1"}
              color={"#061B64"}
              context={"Account Balance"}
              second_context={"Profit&loss"}
              bgcolor={"#C0EBA6"}
              first_amount={`$${account_balance}`}
              second_amount={`$ ${profit_loss.toFixed(2)}`}
              // icon={<AiIcons.AiOutlineFundProjectionScreen />}  
              // [1,2,3,4,5,6,]
            ></Datacard>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <Datacard
              iconCircle={"#C1E6F9"}
              color={"#04297A"}
              context={"Total Trades"}
              second_context={"Win Rate"}
              bgcolor={"#D0F2FF"}
              first_amount={total_trades}
              second_amount={`${win_rate.toFixed(2)}%`}
              
              // icon={<MdIcons.MdPriorityHigh />}
            ></Datacard>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <Datacard
              iconCircle={"#F9EEBD"}
              color={"#7A4F01"}
              context={"Buy Trades"}
              second_context={"Sell Trades "}
              bgcolor={"#FFF7CD"}
              first_amount={total_buy_trades}
              second_amount={total_sell_trades}
              // icon={<HiIcons.HiOutlineTicket />}
            ></Datacard>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <Datacard
              iconCircle={"#F7D1C7"}
              color={"#7A0C2E"}
              context={`Trades Won`}
              second_context={"Trades Lost "}
              bgcolor={"#FFE7D9"}
              first_amount={trades_won}
              second_amount={trades_lost}
              // icon={<AiIcons.AiOutlineBug />}
            ></Datacard>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
      <Grid item md={6}>
        <div style={{ maxWidth: '600px', padding: '20px' }}>
          <h2>Daily Net Cummulative P&L </h2>
          <BarGraph />
        </div>
      </Grid>
      <Grid item md={6} sm={12}>
        <div style={{ maxWidth: '600px', paddingTop:"20px" }}>

            <HorizontalBarChart />

       
        </div>
      </Grid>
      <Grid item md={6}>
        <div style={{ padding: '20px' }}>
          <h2>Net Daily P&L</h2>
          <AreaLineChart />
       
        </div>
      </Grid>
    </Grid>
            </Container>

        </div>
    );
}

export default App;
