"use client"

import * as React from "react"
import TableDataHuman from "@/components/table/table_data_human"
import { useAllHumans } from "@/hook/human/getallhuman"
import { Position } from "@/JSON/position"
import { fetchAllPositions } from "@/lib/position/getdataposition"
import { Office } from "@/JSON/office"
import { fetchAllOffice } from "@/lib/office/getdataoffice"
import AddHumanForm from "@/components/addForm/AddHumanForm"
import UpdateDataHuman from "@/components/updateForm/update_data_human"
import { Human } from "@/JSON/getAllHuman"
import { getHumanById } from "@/lib/human/getbyidHuman"
import { HumanNICCreate } from "@/JSON/createHuman"
import { deleteHumanById } from "@/lib/human/deleteHuman"
import TableDataPosition from "@/components/table/table_data_positon"
import TableDataOffice from "@/components/table/table_data_office"
import AddPositonForm from "@/components/addForm/addpositionform"
import { getPositionById } from "@/lib/position/getpositionbyid"
import UpdateDataPosition from "@/components/updateForm/update_data_position"
import { off } from "node:process"
import { getOfficeById } from "@/lib/office/getofficebyid"
import AddOfficeForm from "@/components/addForm/addofficeform"
import UpdateDataOffice from "@/components/updateForm/update_data_office"
// import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"

export default function HummanResources() {
  // const {user} = useAuth()
  //   if (!user){
  //     redirect("/login");
  //   }
  const [addExit, setAddExit] = React.useState(false)
  const [addPositonExit, setAddPositionExit] = React.useState(false)
  const [addOfficeExit, setAddOfficeExit] = React.useState(false)
  const [updateExit, setUpdateExit] = React.useState(false)
  const [updatePositionExit, setUpdatePositionExit] = React.useState(false)
  const [updateOfficeExit, setUpdateOfficeExit] = React.useState(false)
  const [triggerFetch, setTriggerFetch] = React.useState(false);
  const [loadPosition, setLoadPosition] = React.useState(true);
  const [loadOffice, setLoadOffice] = React.useState(true);
  const { allHumans, loading } = useAllHumans(triggerFetch);
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [office, setOffices] = React.useState<Office[]>([]);
  const [selectedHuman, setSelectedHuman] = React.useState<Human | null>(null);
  const [SelectedPositon, setSelectedPositon] = React.useState<Position | null>(null);
  const [SelectedOffice, setSelectedOffice] = React.useState<Office | null>(null);
  const [selectedHumanNIC, setSelectedHumanNIC] = React.useState<HumanNICCreate[]>([]);

  const handleUpdateClick = async (humanid: Human) => {
    try {
      const { human, human_nic } = await getHumanById(humanid.ID);
      setSelectedHuman(human);
      setSelectedHumanNIC(human_nic);  // Lấy thông tin nic đầu tiên của nhân sự
      setUpdateExit(!updateExit);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin nhân sự:", error);
    }
  };

  const handleUpdatePositionClick = async (Positionid: Position) => {
    try {
      const position = await getPositionById(Positionid.ID);
      setSelectedPositon(position);
      setUpdatePositionExit(!updatePositionExit)
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chức vụ:", error);
    }
  };

  const handleUpdateOfficeClick = async (officeid: Office) => {
    try {
      const office = await getOfficeById(officeid.ID);
      setSelectedOffice(office);
      setUpdateOfficeExit(!updateOfficeExit)
    } catch (error) {
      console.error("Lỗi khi lấy thông tin văn phòng:", error);
    }
  };

  const deleteOnClick = async (humanid: Human) => {
    // Hiển thị cảnh báo xác nhận trước khi xóa
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhân sự này không?");
    
    if (!confirmDelete) {
      console.log("Quá trình xóa đã bị hủy.");
      return; // Hủy bỏ quá trình xóa nếu người dùng chọn Cancel
    }
  
    try {
      const success = await deleteHumanById(humanid.ID);
      if (success) {
        console.log("Nhân sự đã được xóa thành công.");
        // Cập nhật lại dữ liệu sau khi xóa thành công
        setTriggerFetch(!triggerFetch);
      } else {
        console.log("Xóa nhân sự không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa nhân sự:", error);
    }
  };  


  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllPositions();
        setPositions(data);
        setLoadPosition(false);
      } catch (error) {
        console.error('Failed to fetch positions:', error);   
      }
    };

    fetchdata();
  }, []);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllOffice();
        setOffices(data);
        setLoadOffice(false);
      } catch (error) {
        console.error('Failed to fetch offices:', error);   
      }
    };

    fetchdata();
  }, []);

  const onclickAddExit = () => {
    setAddExit(!addExit);
    setSelectedImages([]);
  };
  const onclickUpdateExit = () => {
    setUpdateExit(!updateExit);
    setSelectedImages([]);
  };
  const onclickAddPositionExit = () => {
    setAddPositionExit(!addPositonExit)
  };
  const onclickUpdatePositionExit = () => {
    setUpdatePositionExit(!updatePositionExit)
  };
  const onclickAddOfficeExit = () => {
    setAddOfficeExit(!addOfficeExit)
  };
  const onclickUpdateOfficeExit = () => {
    setUpdateOfficeExit(!updateOfficeExit)
  };

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Nhân sự</h1>
      <div className="mb-[20px]">
        {loading ? (
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
          <TableDataHuman onClick={onclickAddExit} data={allHumans} updateOnClick={handleUpdateClick} deleteOnClick={deleteOnClick}/>
        )}
        {addExit && (
          <AddHumanForm
            onClose={onclickAddExit}
            positions={positions}
            offices={office}
            setTriggerFetch={setTriggerFetch}
          />
        )}
        {updateExit && (
          <UpdateDataHuman
            human={selectedHuman}
            humannic={selectedHumanNIC}
            onClose={onclickUpdateExit}
            positions={positions}
            offices={office}
            setTriggerFetch={setTriggerFetch}
          />
        )}
      </div>
      <div className="mb-[20px]">
        {loadPosition ? (
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
          <TableDataPosition onClick={onclickAddPositionExit} data={positions} updateOnClick={handleUpdatePositionClick}/>
        )}
        {addPositonExit && (
          <AddPositonForm
            onClose={onclickAddPositionExit}
          />
        )}
        {updatePositionExit && (
          <UpdateDataPosition
            onClose={onclickUpdatePositionExit}
            position={SelectedPositon}
          />
        )}
      </div>
      <div className="mb-[20px]">
        {loadOffice ? (
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
          <TableDataOffice onClick={onclickAddOfficeExit} data={office} updateOnClick={handleUpdateOfficeClick} />
        )}
        {addOfficeExit && (
          <AddOfficeForm
            onClose={onclickAddOfficeExit}
          />
        )}
        {updateOfficeExit && (
          <UpdateDataOffice
            onClose={onclickUpdateOfficeExit}
            office={SelectedOffice}
          />
        )}
      </div>
    </div>
  )
}
