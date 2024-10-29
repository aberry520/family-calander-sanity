import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
// import './styles.css'

interface Event {
  id: string
  title: string
  date: Date
}

interface CalendarProps {
  events?: Event[]
}

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
`

const StyledDiv = styled.div`
  max-width: 600px;
  margin: 0 auto;

  .event-marked {
    background-color: lightblue;
    min-height: 100px;
    text-align: left;
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
  }
  .tile {
    min-height: 100px;
    display: flex;
    font-size: 0.7rem;
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
  console.log(events.map((event) => event.date))
  return (
    <StyledDiv>
      <StyledCalendar
        onChange={(value) => onChange(value as Date)}
        value={date}
        showNeighboringMonth={false}
        calendarType="gregory"
        tileContent={({ date, view }) => {
          const matchingEvents = events.filter(
            (event) => event.date.toDateString() === date.toDateString(),
          )
          return (
            <>
              <ol
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  listStyle: 'square',
                  paddingLeft: 5,
                }}
              >
                {matchingEvents.map((event) => (
                  <li key={event.id}>{event.title}</li>
                ))}
              </ol>
            </>
          )
        }}
        tileClassName={({ date }) =>
          events.some(
            (event) => event.date.toDateString() === date.toDateString(),
          )
            ? 'event-marked'
            : 'tile'
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
