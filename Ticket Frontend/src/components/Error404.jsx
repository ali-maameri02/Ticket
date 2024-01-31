import React from 'react'
import  Box  from '@mui/joy/Box'
export default function Error404() {
  return (
    <Box
    component="img"
    src="../src/assets/illustration_404.svg"
    sx={{
      mx: 'auto',
      height: 260,
      my: { xs: 5, sm: 10 },
    }}
  />
  )
}
