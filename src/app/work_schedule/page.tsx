"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { baseUrl } from "@/lib/fetchdata"
import { GetCalendarEvent, WordCalendar } from "@/JSON/wordcalendar"
import { Human } from "@/JSON/getAllHuman"
import TableDataWordCalender from "@/components/table/table_data_wordcalendar"
import { fetchAllWordcalendar } from "@/lib/wordcalendat/getallteamwordcanlendar"
import AddWordCalendarForm from "@/components/addForm/AddWordCalendarForm"
import { Shift } from "@/JSON/shift"
import { fetchAllShift } from "@/lib/shift/getalldatashift"
import { getWordCalendarById } from "@/lib/wordcalendat/getwordcalendarbyid"
import UpdateDataWordCalendar from "@/components/updateForm/update_data_wordcalendar"
import TableDataShift from "@/components/table/table_data_shift"
import { getShiftById } from "@/lib/shift/getshiftbyid"
import AddShiftForm from "@/components/addForm/addshiftform"
import UpdateDataShift from "@/components/updateForm/update_data_shift"
// import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"

const localizer = momentLocalizer(moment)

export default function CalendarClient() {
  // const {user} = useAuth()
  //   if (!user){
  //     redirect("/login");
  //   }
  const [events, setEvents] = useState<GetCalendarEvent[]>([]);
  const [WordCalendar, setWordCalendar] = useState<WordCalendar[]>([]);
  const [LoadCalendar, setLoadCalendar] = useState(true);
  const [updateWordCalendarExit, setUpdateWordCalendarExit] = useState(false);
  const [addWordCalendarExit, setaddWordCalendarExit] = useState(false);
  const [shifts, setShifts] = React.useState<Shift[]>([]);
  const [SelectedWordCalendar,setSelectedWordCalendar] = useState<WordCalendar | null>(null);
  const [loadShift, setLoadShift] = useState(true);
  const [addShiftExit, setaddShiftExit] = useState(false)
  const [updateShiftExit, setUpdateShiftExit] = useState(false)
  const [Selectedshift, setSelectedshift] = useState<Shift | null>(null)

  // ✅ Fetch sự kiện
  useEffect(() => {
    fetch(`${baseUrl}/work_calendar/events`)
      .then((res) => res.json())
      .then((data) => {
        const rawEvents = data.data
        if (Array.isArray(rawEvents)) {
          const parsedEvents = rawEvents.map((item: { title: Human[]; start: string; end: string }) => ({
            title: item.title.map((human) => `${human.ID} - ${human.name}`).join("\n"),
            start: new Date(item.start),
            end: new Date(item.end),
          }))
          setEvents(parsedEvents)
        } else {
          console.error("Dữ liệu không phải là mảng:", data)
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error)
      })
  }, [])

  // ✅ Fetch danh sách WordCalendar
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllWordcalendar()
        setWordCalendar(data)
        setLoadCalendar(false)
      } catch (error) {
        console.error('Failed to fetch WordCalendar:', error)
      }
    }

    fetchdata()
  }, [])

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllShift();
        setShifts(data);
        setLoadShift(false);
      } catch (error) {
        console.error('Failed to fetch shifts:', error);   
      }
    };

    fetchdata();
  }, []);

  const onclickUpdateWordCalendarExit = () => {
    setUpdateWordCalendarExit(!updateWordCalendarExit)
  }

  const onclickaddWordCalendarExit = () => {
    setaddWordCalendarExit(!addWordCalendarExit)
  }
  const onclickaddWordShiftExit = () => {
    setaddShiftExit(!addShiftExit)
  }
  const onclickUpdateWordShiftExit = () => {
    setUpdateShiftExit(!updateShiftExit)
  }

  const handleUpdateWordCalendarClick = async (WordCalendarid: WordCalendar) => {
    try {
      const WordCalendar = await getWordCalendarById(WordCalendarid.ID);
      setSelectedWordCalendar(WordCalendar);
      setUpdateWordCalendarExit(!updateWordCalendarExit)
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chức vụ:", error);
    }
  };

  const handleUpdateShiftClick = async (Shiftid: Shift) => {
    try {
      const shift = await getShiftById(Shiftid.id);
      setSelectedshift(shift);
      setUpdateShiftExit(!updateShiftExit)
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chức vụ:", error);
    }
  };

  return (
    <div className="p-[10px] relative">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">
        Lịch làm việc
      </h1>
        <div className="p-5 bg-white rounded-lg shadow-md mb-[20px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            style={{ height: 600 }}
            components={{
              event: ({ event }) => (
                <div style={{ whiteSpace: "pre-line", padding: "2px" }}>
                  {event.title}
                </div>
              ),
            }}
          />
        </div>
      {LoadCalendar ? (
        <div className="mx-auto h-full w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TableDataWordCalender data={WordCalendar} onClose={onclickaddWordCalendarExit} updateOnClick={handleUpdateWordCalendarClick}/>
      )}

      {addWordCalendarExit && (
        <AddWordCalendarForm onClose={onclickaddWordCalendarExit} shift={shifts}/>
      )}

      {
        updateWordCalendarExit && (
          <UpdateDataWordCalendar wordcalendar={SelectedWordCalendar} onClose={onclickUpdateWordCalendarExit} shift={shifts}/>
        )
      }
      {loadShift ? (
        <div className="mx-auto h-full w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TableDataShift data={shifts} onClick={onclickaddWordShiftExit} updateOnClick={handleUpdateShiftClick}/>
      )}
      {
        addShiftExit && (
          <AddShiftForm onClose={onclickaddWordShiftExit} />
        )
      }
      {
        updateShiftExit && (
          <UpdateDataShift onClose={onclickUpdateWordShiftExit} shift={Selectedshift}/>
        )
      }
    </div>
  )
}
