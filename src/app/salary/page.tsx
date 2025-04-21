"use client"

import * as React from "react"
import TableDataSalary from "@/components/table/table_data_salary"
import { fetchAllPositions } from "@/lib/position/getdataposition";
import { Position } from "@/JSON/position";
import { softSalary } from "@/JSON/softSalary";
import { fetchAllSoftSalary } from "@/lib/softSalary/getdatasoftsalary";
import { fetchAllBaseSalary } from "@/lib/baseSalary/getdatabasesalary";
import TableDataSoftSalary from "@/components/table/table_data_softsalary";
import { getSoftSalaryById } from "@/lib/softSalary/getsoftsalarybyid";
import { getBaseSalaryById } from "@/lib/baseSalary/getbasesalarybyid";
import TableDataBaseSalary from "@/components/table/table_data_basesalary";
import AddSoftForm from "@/components/addForm/addsoftSalary";
import UpdateDataSoftSalary from "@/components/updateForm/update_data_softsalary";
import AddBaseForm from "@/components/addForm/addbaseSalary";
import UpdateDataBaseSalary from "@/components/updateForm/update_data_basesalary";
import AddSalaryForm from "@/components/addForm/addSalary";
// import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Salary() {
    // const {user} = useAuth()
    // if (!user){
    //   redirect("/login");
    // }
    const [addExit, setAddExit] = React.useState(false)
    const [addSoftExit, setAddSoftExit] = React.useState(false)
    const [addBaseExit, setAddBaseExit] = React.useState(false)
    const [updatebaseExit, setUpdatebaseExit] = React.useState(false)
    const [updateSoftExit, setUpdateSoftExit] = React.useState(false)
    const [positions, setPositions] = React.useState<Position[]>([]);
    const [BaseSalary, setBaseSalary] = React.useState<softSalary[]>([]);
    const [SoftSalary, setSoftSalary] = React.useState<softSalary[]>([]);
    const [loadBaseSalary, setLoadBaseSalary] = React.useState(true);
    const [loadSoftSalary, setLoadSoftSalary] = React.useState(true);
    const [SelectedBase, setSelectedBase] = React.useState<softSalary | null>(null);
    const [SelectedSoft, setSelectedSoft] = React.useState<softSalary | null>(null);
    
    const onclickAddExit = () => {
        setAddExit(!addExit);
    };
    const onclickAddSoftExit = () => {
        setAddSoftExit(!addSoftExit);
    };
    const onclickAddBaseExit = () => {
        setAddBaseExit(!addBaseExit);
    };
    const onclickUpdateSoftExit = () => {
        setUpdateSoftExit(!updateSoftExit)
      };
    const onclickUpdatebaseExit = () => {
        setUpdatebaseExit(!updatebaseExit)
      };
    React.useEffect(() => {
        const fetchdata = async () => {
          try {
            const { data } = await fetchAllPositions();
            setPositions(data);
          } catch (error) {
            console.error('Failed to fetch positions:', error);   
          }
        };
    
        fetchdata();
      }, []);
      React.useEffect(() => {
        const fetchdata = async () => {
          try {
            const { data } = await fetchAllSoftSalary();
            setSoftSalary(data);
            setLoadSoftSalary(false);
          } catch (error) {
            console.error('Failed to fetch :', error);   
          }
        };
    
        fetchdata();
      }, []);
      React.useEffect(() => {
        const fetchdata = async () => {
          try {
            const { data } = await fetchAllBaseSalary();
            setBaseSalary(data);
            setLoadBaseSalary(false);
          } catch (error) {
            console.error('Failed to fetch :', error);   
          }
        };
    
        fetchdata();
      }, []);
      const handleUpdateSoftClick = async (id: softSalary) => {
          try {
            const data = await getSoftSalaryById(id.ID);
            setSelectedSoft(data);
            setUpdateSoftExit(!updateSoftExit);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin nhân sự:", error);
          }
        };
    const handleUpdateBaseClick = async (id: softSalary) => {
        try {
            const data = await getBaseSalaryById(id.ID);
            setSelectedBase(data);  // Lấy thông tin nic đầu tiên của nhân sự
            setUpdatebaseExit(!updatebaseExit);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin nhân sự:", error);
        }
        };
    return (
        <div className="p-[10px] relative h-full">
            <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Lương</h1>
            <div className="mb-[20px]">
                <TableDataSalary onClick={onclickAddExit}/>
                {
                  addExit && (
                    <AddSalaryForm onClose={onclickAddExit}/>
                  )
                }
            </div>
            <div className="mb-[20px]">
            {
                loadSoftSalary ? (
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
                    <TableDataSoftSalary data={SoftSalary} onClick={onclickAddSoftExit} updateOnClick={handleUpdateSoftClick}/>
                )
            }
            {
                addSoftExit && (
                    <AddSoftForm onClose={onclickAddSoftExit} position={positions}/>
                )
            }
            {
                updateSoftExit && (
                    <UpdateDataSoftSalary onClose={onclickUpdateSoftExit} position={positions} salary={SelectedSoft}/>
                )
            }
            </div>
            <div className="mb-[20px]">
            {
                loadBaseSalary ? (
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
                    <TableDataBaseSalary data={BaseSalary} onClick={onclickAddBaseExit} updateOnClick={handleUpdateBaseClick}/>
                )
            }
            {
                addBaseExit && (
                    <AddBaseForm onClose={onclickAddBaseExit} position={positions}/>
                )
            }
            {
                updatebaseExit && (
                    <UpdateDataBaseSalary onClose={onclickUpdatebaseExit} position={positions} salary={SelectedBase}/>
                )
            }
            </div>
        </div>
    )
}
