"use client"

import * as React from "react"
import { getInterview } from "@/JSON/interview"
import { getInterViewById } from "@/lib/interview/getInterViewbyid"
import { fetchAllInterViews } from "@/lib/interview/getallinterviewbyoffice"
import TableDataInterView from "@/components/table/table_data_inter_view"
import AddInterViewForm from "@/components/addForm/addinterview"
import UpdateDataInterView from "@/components/updateForm/update_data_inter_view"
import ChatResultInterview from "@/components/chart/chart_result_interview"
import { ChatInterview } from "@/components/chart/chart_data_interview"

import { redirect } from "next/navigation"

export default function InterView() {
  // const {user} = useAuth()
  //   if (!user){
  //     redirect("/login");
  //   }
  const [addExit, setAddExit] = React.useState(false)
  const [updateExit, setUpdateExit] = React.useState(false)
  const [loadInterView, setLoadInterView] = React.useState(true);
  const [interview, setInterView] = React.useState<getInterview[]>([]);
  const [selectedInterView, setSelectedInterView] = React.useState<getInterview | null>(null);
  console.log(interview)

  const handleUpdateClick = async (interview_id: getInterview) => {
    try {
      const interview = await getInterViewById(interview_id.ID);
      setSelectedInterView(interview);
      setUpdateExit(!updateExit);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phỏng vấn:", error);
    }
  };  

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const interview: any = await fetchAllInterViews();
        const data = interview
        setInterView(data);
        setLoadInterView(false);
      } catch (error) {
        console.error('Failed to fetch positions:', error);   
      }
    };

    fetchdata();
  }, []);

  const onclickAddExit = () => {
    setAddExit(!addExit);
  };
  const onclickUpdateExit = () => {
    setUpdateExit(!updateExit);
  };

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Phỏng vấn</h1>
      <div className="mb-[20px]">
        {loadInterView ? (
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
          <TableDataInterView onClick={onclickAddExit} data={interview} updateOnClick={handleUpdateClick}/>
        )}
        {addExit && (
          <AddInterViewForm
            onClose={onclickAddExit}
          />
        )}
        {updateExit && (
          <UpdateDataInterView
            onClose={onclickUpdateExit}
            inter_view={selectedInterView}
          />
        )}
      </div>
      <div className="mb-[20px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <ChatInterview/>
          <ChatResultInterview/>
        </div>
      </div>
    </div>
  )
}
