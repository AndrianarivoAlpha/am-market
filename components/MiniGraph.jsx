import React from 'react'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const MiniGraph = ( { sparkline } ) =>
{
  return (
    <>
      <Sparklines data={ sparkline }>
        <SparklinesLine style={ { strokeWidth: 3, fill: "gray" } } />
        <SparklinesSpots />
      </Sparklines>
    </>
  )
}

export default MiniGraph