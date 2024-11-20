"use client";
import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import Header from '@/components/header';

const Calendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  useEffect(() => {
    axios.get('https://date.nageruapi.com/Api/v1/PublicHolidays/2024/BR')
      .then(response => {
        setHolidays(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar feriados:", error);
      });

    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  }

  const handleAddEvent = () => {
    if (newEventTitle && selectedDate) {
      const newEvent = { date: selectedDate, title: newEventTitle };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setNewEventTitle('');

      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day();
    const calendarDays = [];
    const today = dayjs().format('DD/MM/YYYY');

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = currentMonth.date(date).format('DD/MM/YYYY');
      const isHoliday = holidays.some(holiday => holiday.date === currentDate);
      const isEvent = events.some(event => event.date === currentDate);
      const isToday = currentDate === today;

      calendarDays.push(
        <div
          key={date}
          className={` rounded-full text-center p-5 ${isHoliday ? 'bg-red-400 text-white' : ''} ${isEvent ? 'bg-yellow-200' : ''} ${isToday ? 'bg-graciosa text-white' : ''} cursor-pointer`}
          onClick={() => handleDateClick(currentDate)}
        >
          {date}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEscKey = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal-overlay') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
        <div className="p-5 bg-white shadow-lg rounded-lg w-full max-w-4xl">
          <div className="flex items-center justify-between mb-5">
            <button onClick={handlePrevMonth} className="bg-graciosa text-white py-2 px-4 rounded">Anterior</button>
            <h1 className="text-2xl font-bold">{currentMonth.format('MMMM YYYY')}</h1>
            <button onClick={handleNextMonth} className="bg-graciosa text-white py-2 px-4 rounded">Próximo</button>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-5">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center font-bold">{day}</div>
            ))}
            
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="modal-overlay" className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Eventos no {selectedDate}</h2>
            
            <ul className="mb-5">
              {events
                .filter(event => event.date === selectedDate)
                .map((event, index) => (
                  <li key={index}>{event.title}</li>
                ))}
            </ul>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Adicionar Novo Evento</h3>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Título do evento"
              />
              <button
                onClick={handleAddEvent}
                className="w-full mt-4 bg-graciosa text-white py-2 px-4 rounded"
              >
                Adicionar
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="w-full bg-red-500 text-white py-2 px-4 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
