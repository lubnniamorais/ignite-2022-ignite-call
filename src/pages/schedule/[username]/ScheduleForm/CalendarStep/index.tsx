import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { api } from '@/src/lib/axios'

import { Calendar } from '@/src/components/Calendar'

import { useState } from 'react'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimePickerItem,
} from './styles'

interface Availability {
  // horários possíveis
  possibleTimes: number[]
  // horários disponíveis
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  // const { possibleTimes, blockedTimes } = availability || {}

  // const availableTimes = possibleTimes?.filter((time) => {
  //   const isTimedBlocked = blockedTimes?.some(
  //     (blockedTime) => dayjs(blockedTime.date).hour() === time,
  //   )

  //   const isTimeInPast = dayjs(selectedDate).set('hour', time).isBefore(dayjs())

  //   return !isTimedBlocked && !isTimeInPast
  // })

  // Aqui estamos pegando a data selecionada e a hora selecionada e pegando o início da hora,
  // ou seja, a data vêm zerada, por exemplo: 08:00:00.
  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                  onClick={() => {
                    handleSelectTime(hour)
                  }}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
