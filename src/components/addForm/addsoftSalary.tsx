"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateSoftSalary } from "@/JSON/softSalary"
import { Position } from "@/JSON/position"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { addSoftSalary } from "@/lib/softSalary/addsoftsalary"

type Props = {
  onClose: () => void;
  position: Position[] | null
}

export default function AddSoftForm({ onClose, position }: Props) {
  const [idposition, setidposition] = React.useState('');
  const [CarePart1, setCarePart1] = React.useState('');
  const [Target1, setTarget1] = React.useState('');
  const [CarePart2, setCarePart2] = React.useState('');
  const [Target2, setTarget2] = React.useState('');
  const [CarePart3, setCarePart3] = React.useState('');

  const handleSubmitUpdate = async () => {
  
    const salaryData: CreateSoftSalary = {
        ID:0,
        id_position: parseInt(idposition.toString()),
        care_part_1:  parseInt(CarePart1.toString()) ,
        target_1: parseInt(Target1.toString()),
        care_part_2:  parseInt(CarePart2.toString()),
        target_2: parseInt(Target2.toString()),
        care_part_3:  parseInt(CarePart3.toString()),
    };
  
    try {
      const response = await addSoftSalary(salaryData);
      alert("Thêm thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
        <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
        <div className="fixed z-999 min-w-[400px]">
            <Card>
            <CardHeader>
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm mốc phần trăm ds cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="position">Chức vụ</Label>
                    <Select value={idposition} onValueChange={setidposition}>
                        <SelectTrigger id="position" className="w-full">
                            <SelectValue placeholder="Chức vụ" />
                        </SelectTrigger>
                        <SelectContent className="z-9999 w-full">
                            {position?.map((position) => (
                            <SelectItem key={position.ID} value={position.ID.toString()}>
                                {position.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="acronym">Phần trăm 1</Label>
                    <Input id="acronym" value={CarePart1} onChange={e => setCarePart1(e.target.value)} placeholder="Nhập phần trăm 1..." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Mốc 1</Label>
                    <Input id="name" placeholder="Nhập mốc 1..." value={Target1} onChange={(e) => setTarget1(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="acronym">Mhần trăm 2</Label>
                    <Input id="acronym" value={CarePart2} onChange={e => setCarePart2(e.target.value)} placeholder="Nhập phần trăm 2..." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Mốc 2</Label>
                    <Input id="name" placeholder="Nhập mốc 2..." value={Target2} onChange={(e) => setTarget2(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="acronym">Phần trăm 3</Label>
                    <Input id="acronym" value={CarePart3} onChange={e => setCarePart3(e.target.value)} placeholder="Nhập phần trăm 3..." />
                </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitUpdate}>Submit</Button>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}
