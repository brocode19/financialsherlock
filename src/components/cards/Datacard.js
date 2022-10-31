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
        alignItems: 'center',
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
            boxShadow: 0,
            textAlign: 'center',
            color: props.color,
            bgcolor: props.bgcolor,}}>

                <div className='d-flex justify-content-center align-items-center'>
                    <div className='cardIcon d-flex justify-content-center align-items-center'
                    style={{  backgroundColor: props.iconCircle}}>
                    <IconContext.Provider
                    value={{ color: props.color, size:'1.5em' }}>
                    
                    {props.icon}
                    </IconContext.Provider>
                        

                    </div>

                </div>

      <Typography variant="h3">{props.figure}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.context}
      </Typography>

    </Card>
        

    


    </>
  )
}

export default Datacard