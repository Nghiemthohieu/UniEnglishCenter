"use client"

import * as React from "react"
import { Office } from "@/JSON/office"
import { fetchAllOffice } from "@/lib/office/getdataoffice"
import TableDataOffice from "@/components/table/table_data_office"
import { getOfficeById } from "@/lib/office/getofficebyid"
import AddOfficeForm from "@/components/addForm/addofficeform"
import UpdateDataOffice from "@/components/updateForm/update_data_office"
import { Bill, BillIMG, Courses, CustomerSource, getBill, PaymentForm } from "@/JSON/bill"
import { getBillById } from "@/lib/bill/getbillbyid"
import { deleteBillById } from "@/lib/bill/deletebill"
import TableDataBill from "@/components/table/table_data_bill"
import AddBillForm from "@/components/addForm/addBillform"
import UpdateDataBill from "@/components/updateForm/update_data_bill"
import { useAllBills } from "@/hook/bill/getallbill"
import { fetchAllCustomerSource } from "@/lib/customer_sources/getallcustomerSources"
import { fetchAllCourses } from "@/lib/courses/getallcourses"
import { fetchAllPaymentForm } from "@/lib/payment_forms/getallpaymentforms"
import { getCustomerSourcesById } from "@/lib/customer_sources/getcustomersourcesbyid"
import TableDataCustomerSources from "@/components/table/table_data_customer_sources"
import AddCustomerSourcesForm from "@/components/addForm/addcustomersources"
import UpdateDataCustomerSources from "@/components/updateForm/update_data_customer_sources"
import { getPaymentFormById } from "@/lib/payment_forms/getpaymentformbyid"
import TableDataPaymentForm from "@/components/table/table_data_payment_form"
import TableDataCourse from "@/components/table/table_data_course"
import { redirect } from "next/navigation"

export default function Invoices() {
  // const {user} = useAuth()
  //   if (!user){
  //     redirect("/login");
  //   }
  const [addExit, setAddExit] = React.useState(false)
  const [addOfficeExit, setAddOfficeExit] = React.useState(false)
  const [addCustomerSourcesExit, setAddCustomerSourcesExit] = React.useState(false)
  const [addPaymentFormExit, setAddPaymentFormExit] = React.useState(false)
  const [addCourseExit, setAddCourseExit] = React.useState(false)
  const [updateExit, setUpdateExit] = React.useState(false)
  const [updateOfficeExit, setUpdateOfficeExit] = React.useState(false)
  const [updateCustomerSourcesExit, setUpdateCustomerSourcesExit] = React.useState(false)
  const [updatePaymentFormExit, setUpdatePaymentFormExit] = React.useState(false)
  const [updateCourseExit, setUpdateCourseExit] = React.useState(false)
  const [triggerFetch, setTriggerFetch] = React.useState(false);
  const [loadcustomerSources, setLoadcustomerSources] = React.useState(true);
  const [loadCources, setLoadCources] = React.useState(true);
  const [loadPaymentForm, setLoadPaymentForm] = React.useState(true);
  const [loadOffice, setLoadOffice] = React.useState(true);
  const { allBill, loading } = useAllBills(triggerFetch);
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [office, setOffices] = React.useState<Office[]>([]);
  const [customerSources, setcustomerSources] = React.useState<CustomerSource[]>([]);
  const [cources, setCources] = React.useState<Courses[]>([]);
  const [paymentForm, setPaymentForm] = React.useState<PaymentForm[]>([]);
  const [selectedBill, setSelectedBill] = React.useState<getBill | null>(null);
  const [SelectedOffice, setSelectedOffice] = React.useState<Office | null>(null);
  const [SelectedCustomerSources, setSelectedCustomerSources] = React.useState<CustomerSource | null>(null);
  const [SelectedPaymentForm, setSelectedPaymentForm] = React.useState<PaymentForm | null>(null);
  const [SelectedCourse, setSelectedCourse] = React.useState<Courses | null>(null);
  const [selectedBillImg, setSelectedBillImg] = React.useState<BillIMG[]>([]);

  const handleUpdateClick = async (billid: getBill) => {
    try {
      const { bill, bill_img } = await getBillById(billid.ID);
      setSelectedBill(bill);
      setSelectedBillImg(bill_img);  // Lấy thông tin nic đầu tiên của nhân sự
      setUpdateExit(!updateExit);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin nhân sự:", error);
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

  const handleUpdateCustomerSourcesClick = async (customerSourcesId: CustomerSource) => {
    try {
      const customerSources = await getCustomerSourcesById(customerSourcesId.ID);
      setSelectedCustomerSources(customerSources);
      setUpdateCustomerSourcesExit(!updateCustomerSourcesExit)
    } catch (error) {
      console.error("lỗi khi lấy thông tin nguồn khách hàng");
    }
  }

  const handleUpdatePaymetnFormClick = async (paymentFormId: PaymentForm) => {
    try {
      const paymentform = await getPaymentFormById(paymentFormId.ID);
      setSelectedPaymentForm(paymentform);
      setUpdatePaymentFormExit(!updatePaymentFormExit)
    } catch (error) {
      console.error("lỗi khi lấy thông tin hình thức thanh toán");
    }
  }

  const handleUpdateCourseClick = async (CourseId: Courses) => {
    try {
      const course = await getCustomerSourcesById(CourseId.ID);
      setSelectedCourse(course);
      setUpdateCourseExit(!updateCourseExit)
    } catch (error) {
      console.error("lỗi khi lấy thông tin khóa học");
    }
  }

  const deleteOnClick = async (billid: Bill) => {
    // Hiển thị cảnh báo xác nhận trước khi xóa
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?");
    
    if (!confirmDelete) {
      console.log("Quá trình xóa đã bị hủy.");
      return; // Hủy bỏ quá trình xóa nếu người dùng chọn Cancel
    }
  
    try {
      const success = await deleteBillById(billid.ID);
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
        const { data } = await fetchAllOffice();
        setOffices(data);
        setLoadOffice(false);
      } catch (error) {
        console.error('Failed to fetch offices:', error);   
      }
    };

    fetchdata();
  }, []);
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const customerSource: any = await fetchAllCustomerSource(); // không khuyến khích nhưng hợp lệ
        const data = customerSource.data;
        setcustomerSources(data);
        setLoadcustomerSources(false);
      } catch (error) {
        console.error('Failed to fetch offices:', error);   
      }
    };

    fetchdata();
  }, []);
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const customerSource: any = await fetchAllCourses(); // không khuyến khích nhưng hợp lệ
        const data = customerSource.data;
        setCources(data);
        setLoadCources(false);
      } catch (error) {
        console.error('Failed to fetch offices:', error);   
      }
    };

    fetchdata();
  }, []);
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const customerSource: any = await fetchAllPaymentForm(); // không khuyến khích nhưng hợp lệ
        const data = customerSource.data;
        setPaymentForm(data);
        setLoadPaymentForm(false);
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
  const onclickAddOfficeExit = () => {
    setAddOfficeExit(!addOfficeExit)
  };
  const onclickUpdateOfficeExit = () => {
    setUpdateOfficeExit(!updateOfficeExit)
  };

  const onclickAddCustomerSourcesExit = () => {
    setAddCustomerSourcesExit(!addCustomerSourcesExit)
  }
  
  const onclickupdateCustomerSourcesExit = () => {
    setUpdateCustomerSourcesExit(!updateCustomerSourcesExit)
  }

  const onclickupdatePaymentFormExit = () => {
    setUpdatePaymentFormExit(!updatePaymentFormExit)
  }

  const onclickAddPaymentFormExit = () => {
    setAddPaymentFormExit(!addPaymentFormExit)
  }

  const onclickupdateCourseExit = () => {
    setUpdateCourseExit(!updateCourseExit)
  }

  const onclickAddCourseExit = () => {
    setAddCourseExit(!addCourseExit)
  }

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Hóa đơn</h1>
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
          <TableDataBill onClick={onclickAddExit} data={allBill} updateOnClick={handleUpdateClick} deleteOnClick={deleteOnClick}/>
        )}
        {addExit && (
          <AddBillForm
            onClose={onclickAddExit}
            customer_sources={customerSources}
            payment_forms={paymentForm}
            courseall={cources}
            offices={office}
            setTriggerFetch={setTriggerFetch}
          />
        )}
        {updateExit && (
          <UpdateDataBill
            bill={selectedBill}
            billimg={selectedBillImg}
            onClose={onclickUpdateExit}
            offices={office}
            customer_sources={customerSources}
            payment_forms={paymentForm}
            courseall={cources}
            setTriggerFetch={setTriggerFetch}
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
      <div className="mb-[20px]">
        {
          loadcustomerSources ? (
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
            <TableDataCustomerSources onClick={onclickAddCustomerSourcesExit} data={customerSources} updateOnClick={handleUpdateCustomerSourcesClick}/>
          )
        }
        {
          addCustomerSourcesExit && (
            <AddCustomerSourcesForm onClose={onclickAddCustomerSourcesExit}/>
          )
        }
        {
          updateCustomerSourcesExit && (
            <UpdateDataCustomerSources onClose={onclickupdateCustomerSourcesExit} customer_sources={SelectedCustomerSources}/>
          )
        }
      </div>
      <div className="mb-[20px]">
        {
          loadPaymentForm ? (
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
            <TableDataPaymentForm onClick={onclickAddPaymentFormExit} data={paymentForm} updateOnClick={handleUpdatePaymetnFormClick}/>
          )
        }
        {
          addCustomerSourcesExit && (
            <AddCustomerSourcesForm onClose={onclickAddPaymentFormExit}/>
          )
        }
        {
          updateCustomerSourcesExit && (
            <UpdateDataCustomerSources onClose={onclickupdatePaymentFormExit} customer_sources={SelectedPaymentForm}/>
          )
        }
      </div>
      <div className="mb-[20px]">
        {
          loadCources ? (
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
            <TableDataCourse onClick={onclickAddCourseExit} data={cources} updateOnClick={handleUpdateCourseClick}/>
          )
        }
        {
          addCustomerSourcesExit && (
            <AddCustomerSourcesForm onClose={onclickAddCourseExit}/>
          )
        }
        {
          updateCustomerSourcesExit && (
            <UpdateDataCustomerSources onClose={onclickupdateCourseExit} customer_sources={SelectedCourse}/>
          )
        }
      </div>
    </div>
  )
}
      