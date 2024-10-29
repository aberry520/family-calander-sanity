import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
// import './styles.css'

interface Event {
  id: number
  title: string
  date: Date
}

interface CalendarProps {
  events?: Event[]
}

const StyledCalendar = styled(Calendar)`
  width: 100%;
`

const StyledDiv = styled.div`
  max-width: 600px;
  margin: 0 auto;

  .event-marked {
    background-color: lightblue;
  }

  input[type='text'],
  button {
    margin-top: 10px;
    padding: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
  }
`

const MyCalendar: React.FC<CalendarProps> = ({ events = [] }) => {
  const [date, setDate] = useState(new Date())

  const onChange = (newDate: Date) => {
    setDate(newDate)
  }

  return (
    <StyledDiv>
      <StyledCalendar
        onChange={(value) => onChange(value as Date)}
        value={date}
        tileClassName={({ date }) =>
          events.some(
            (event) => event.date.toDateString() === date.toDateString(),
          )
            ? 'event-marked'
            : ''
        }
      />
      {events.filter(
        (event) => event.date.toDateString() === date.toDateString(),
      ).length > 0 && (
        <ul>
          Events on {date.toDateString()}:
          {events
            .filter(
              (event) => event.date.toDateString() === date.toDateString(),
            )
            .map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
        </ul>
      )}
    </StyledDiv>
  )
}

export default MyCalendar
