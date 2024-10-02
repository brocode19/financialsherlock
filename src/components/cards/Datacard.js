import React from 'react'
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';


function Datacard(props) {
    const StyledIcon = styled('div')(({ theme }) => ({
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'start',
        width: theme.spacing(8),
        height: theme.spacing(8),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
      }));
  return (
    <>

    <Card
          sx={{
            py: 5,
            paddingLeft: 3,
            boxShadow: 0,
            textAlign: 'start',
            color: props.color,
            bgcolor: props.bgcolor,}}>

                {/* <div className='d-flex justify-content-center align-items-center'>
                    <div className='cardIcon d-flex justify-content-center align-items-center'
                    style={{  backgroundColor: props.iconCircle}}>
                    <IconContext.Provider
                    value={{ color: props.color, size:'1.5em' }}>
                    
                    {props.icon}
                    </IconContext.Provider>
                        

                    </div>

                </div> */}

      <Typography variant="subtitle2">{props.context}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.first_amount}
      </Typography>
      <Typography variant="subtitle2" >
        <Typography variant='subtle2'>{props.second_context} </Typography>{props.second_amount}
      </Typography>

    </Card>
        

    


    </>
  )
}

export default Datacard