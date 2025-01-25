"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
  Spinner,
  Checkbox,
  Card,
} from "@nextui-org/react";

import { getAllMenus } from "@/services/menuService";

const allMenus = [
  {
    MenuId: 1,
    MenuName: "Dashboard",
    MenuParentId: null,
    MenuUrl: "/dashboard",
    icon: "AiFillDashboard",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [],
  },
  {
    MenuId: 2,
    MenuName: "Company",
    MenuParentId: null,
    MenuUrl: "/company/profile",
    icon: "BiSolidInstitution",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 3,
        MenuName: "Profile",
        MenuParentId: 2,
        MenuUrl: "/company/profile",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 4,
        MenuName: "Branches",
        MenuParentId: 2,
        MenuUrl: "/company/branches",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 5,
        MenuName: "Promoters",
        MenuParentId: 2,
        MenuUrl: "/company/promoters",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 6,
        MenuName: "Promoters Share Holdings",
        MenuParentId: 2,
        MenuUrl: "/company/shareholdings",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 7,
        MenuName: "Directors",
        MenuParentId: 2,
        MenuUrl: "/company/directors",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 8,
        MenuName: "Bank Accounts",
        MenuParentId: 2,
        MenuUrl: "/company/accounts",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 9,
        MenuName: "Profile",
        MenuParentId: 2,
        MenuUrl: "/company/profile",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 10,
        MenuName: "Documents",
        MenuParentId: 2,
        MenuUrl: "/company/documents",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 11,
        MenuName: "Unencumbered Deposits",
        MenuParentId: 2,
        MenuUrl: "/company/Unencumbered",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 12,
    MenuName: "User Management",
    MenuParentId: null,
    MenuUrl: "/user",
    icon: "FaUsers",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 13,
        MenuName: "Role & Permissions",
        MenuParentId: 12,
        MenuUrl: "/dashboard/users/role",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 14,
        MenuName: "Users",
        MenuParentId: 12,
        MenuUrl: "/user/all",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 15,
        MenuName: "Active Users",
        MenuParentId: 12,
        MenuUrl: "/user/active",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 16,
        MenuName: "Deactive Users",
        MenuParentId: 12,
        MenuUrl: "/user/deactive",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 17,
    MenuName: "HR Management",
    MenuParentId: null,
    MenuUrl: "/hrmanagement",
    icon: "MdManageAccounts",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 18,
        MenuName: "Employee",
        MenuParentId: 17,
        MenuUrl: "/hrmanagement/employee",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 19,
        MenuName: "attendance",
        MenuParentId: 17,
        MenuUrl: "/hrmanagement/attendance",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 20,
        MenuName: "Salary Disbursement",
        MenuParentId: 17,
        MenuUrl: "/hrmanagement/salay",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 21,
        MenuName: "Employee",
        MenuParentId: 17,
        MenuUrl: "/hrmanagement/employee",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 22,
    MenuName: "Customer Management",
    MenuParentId: null,
    MenuUrl: "/customer",
    icon: "RiCustomerService2Fill",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 23,
        MenuName: "Customers",
        MenuParentId: 22,
        MenuUrl: "/customer/all",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 24,
        MenuName: "Minors",
        MenuParentId: 22,
        MenuUrl: "/customer/minors",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 25,
    MenuName: "Business Loan",
    MenuParentId: null,
    MenuUrl: "/business",
    icon: "IoBusinessSharp",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 26,
        MenuName: "Schemes",
        MenuParentId: 25,
        MenuUrl: "/business/schemes",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 27,
        MenuName: "Calculator",
        MenuParentId: 25,
        MenuUrl: "/business/calculator",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 28,
        MenuName: "Applications",
        MenuParentId: 25,
        MenuUrl: "/business/applications",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 29,
        MenuName: "Disbursements",
        MenuParentId: 25,
        MenuUrl: "/business/disbursement",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 30,
        MenuName: "Accounts",
        MenuParentId: 25,
        MenuUrl: "/business/accounts",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 31,
    MenuName: "Fixed Loan",
    MenuParentId: null,
    MenuUrl: "/fixed",
    icon: "FaHandHoldingUsd",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 32,
        MenuName: "Schemes",
        MenuParentId: 31,
        MenuUrl: "/fixed/schemes",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 33,
        MenuName: "Applications",
        MenuParentId: 31,
        MenuUrl: "/fixed/applications",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 34,
        MenuName: "Disbursements",
        MenuParentId: 31,
        MenuUrl: "/fixed/disbursement",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 35,
        MenuName: "Accounts",
        MenuParentId: 31,
        MenuUrl: "/fixed/accounts",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 36,
    MenuName: "Approvals",
    MenuParentId: null,
    MenuUrl: "/approvals",
    icon: "FcApproval",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 37,
        MenuName: "Accounting Vouchers",
        MenuParentId: 36,
        MenuUrl: "/approvals/vouchers",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 38,
        MenuName: "Loan Applications",
        MenuParentId: 36,
        MenuUrl: "/approvals/loanapplications",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 39,
        MenuName: "Pending Transications",
        MenuParentId: 36,
        MenuUrl: "/approvals/pendingtransications",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 40,
        MenuName: "Closer Requests",
        MenuParentId: 36,
        MenuUrl: "/approvals/closerrequest",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 41,
        MenuName: "Print Request Approvals",
        MenuParentId: 36,
        MenuUrl: "/approvals/printrequest",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 42,
        MenuName: "Loan Reschdule",
        MenuParentId: 36,
        MenuUrl: "/approvals/loanreschdule",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 43,
        MenuName: "Extention",
        MenuParentId: 36,
        MenuUrl: "/approvals/extention",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 44,
    MenuName: "Reports",
    MenuParentId: null,
    MenuUrl: "/report",
    icon: "TbReportAnalytics",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 45,
        MenuName: "Promoters | Customers",
        MenuParentId: 44,
        MenuUrl: "/report/promoters",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 46,
        MenuName: "Business Loan",
        MenuParentId: 44,
        MenuUrl: "/report/businessloan",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 47,
        MenuName: "Fixed Loan Accounts",
        MenuParentId: 44,
        MenuUrl: "/report/fixedloans",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 48,
        MenuName: "Loan EMIs",
        MenuParentId: 44,
        MenuUrl: "/report/loanemis",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 49,
        MenuName: "Loan Balance Report",
        MenuParentId: 44,
        MenuUrl: "/report/loanblancereport",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 50,
        MenuName: "Group Report",
        MenuParentId: 44,
        MenuUrl: "/report/groupby",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 51,
        MenuName: "TDS Report",
        MenuParentId: 44,
        MenuUrl: "/report/tds",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
      {
        MenuId: 52,
        MenuName: "Attendance Report",
        MenuParentId: 44,
        MenuUrl: "/report/Attendance",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-12T11:32:41.000Z",
      },
    ],
  },
  {
    MenuId: 53,
    MenuName: "Download Reports",
    MenuParentId: null,
    MenuUrl: "/report/download",
    icon: "HiOutlineDocumentReport",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 54,
        MenuName: "Report List",
        MenuParentId: 53,
        MenuUrl: "/report/download/reportlist",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:03:23.000Z",
      },
      {
        MenuId: 55,
        MenuName: "Report Future Demand",
        MenuParentId: 53,
        MenuUrl: "/report/download/futuredemand",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:03:23.000Z",
      },
      {
        MenuId: 56,
        MenuName: "Loan Payment Collections",
        MenuParentId: 53,
        MenuUrl: "/report/download/loancollection",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
    ],
  },
  {
    MenuId: 57,
    MenuName: "CIBILE Reports",
    MenuParentId: null,
    MenuUrl: "/civil",
    icon: "MdOutlineCreditScore",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 58,
        MenuName: "Cibile Report History",
        MenuParentId: 57,
        MenuUrl: "/civil/history",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:07:37.000Z",
      },
      {
        MenuId: 59,
        MenuName: "Download Cibile Report",
        MenuParentId: 57,
        MenuUrl: "/civil/download",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:07:37.000Z",
      },
      {
        MenuId: 60,
        MenuName: "Convert XLS To TUDF",
        MenuParentId: 57,
        MenuUrl: "/civil/xlstotudf",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:07:37.000Z",
      },
      {
        MenuId: 61,
        MenuName: "Convert XLS To TUDF",
        MenuParentId: 57,
        MenuUrl: "/civil/xlstotudf",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:07:37.000Z",
      },
    ],
  },
  {
    MenuId: 62,
    MenuName: "Software Settings",
    MenuParentId: null,
    MenuUrl: "/setting",
    icon: "IoSettingsOutline",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [
      {
        MenuId: 63,
        MenuName: "SMS List",
        MenuParentId: 62,
        MenuUrl: "/setting/smslist",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 64,
        MenuName: "SMS History",
        MenuParentId: 62,
        MenuUrl: "/setting/smshistory",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 65,
        MenuName: "Mail History",
        MenuParentId: 62,
        MenuUrl: "/setting/mailhistory",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 66,
        MenuName: "Balance Alerts",
        MenuParentId: 62,
        MenuUrl: "/setting/balancealert",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 67,
        MenuName: "Event | Holidays Calender",
        MenuParentId: 62,
        MenuUrl: "/setting/calender",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 68,
        MenuName: "Deleted Entry Logs",
        MenuParentId: 62,
        MenuUrl: "/setting/deletedlogs",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 69,
        MenuName: "Login History",
        MenuParentId: 62,
        MenuUrl: "/setting/loginlogs",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 70,
        MenuName: "User Activity Tracking",
        MenuParentId: 62,
        MenuUrl: "/setting/logs",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
      {
        MenuId: 71,
        MenuName: "Balance Alerts",
        MenuParentId: 62,
        MenuUrl: "/setting/balancealert",
        icon: null,
        createdAt: "2025-01-12T11:32:41.000Z",
        updatedAt: "2025-01-13T13:05:21.000Z",
      },
    ],
  },
  {
    MenuId: 72,
    MenuName: "Appointments",
    MenuParentId: null,
    MenuUrl: "/appointment",
    icon: "PiPhoneIncomingLight",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [],
  },
  {
    MenuId: 73,
    MenuName: "Notice Board",
    MenuParentId: null,
    MenuUrl: "/noticeboard",
    icon: "TbScoreboard",
    createdAt: "2025-01-12T11:32:41.000Z",
    updatedAt: "2025-01-13T15:19:11.000Z",
    Submenus: [],
  },
];

export default function App() {
  const [openAddNewUser, setAddNewUser] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [roleName, setRoleName] = useState("");
  const [positionName, setPositionName] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenus, setActiveSubMenus] = useState("");

  const handleParentClick = (menuId) => {
    setActiveMenu((prevActive) => (prevActive === menuId ? null : menuId));
  };

  useEffect(() => {
    const fetchAllMenus = async () => {
      setLoading(true);
      try {
        const response = await getAllMenus();
        setMenus(response.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMenus();
  }, []);

  const handleSaveRole = () => {
    console.log("Role Name:", roleName);
    console.log("Position Name:", positionName);
    console.log("Selected Menus:", [...selectedMenus]);
    setAddNewUser(false);
  };

  return (
    <>
      <div className="mb-5">
        <Button color="primary" onPress={() => setAddNewUser(true)}>
          Add New Role
        </Button>
      </div>
      <h1 className="text-xl font-bold mb-4">All Roles</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="success" label="Loading..." size="lg" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <Table aria-label="Example table with custom cells">
          <TableHeader>
            <TableColumn>Menu Name</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody items={menus}>
            {(item) => (
              <TableRow key={item.MenuId}>
                <TableCell>{item.MenuName}</TableCell>
                <TableCell>Actions here</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal
        isOpen={openAddNewUser}
        onOpenChange={setAddNewUser}
        scrollBehavior="inside"
        size="full"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="max-w-full max-h-screen">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold mb-4">
                Add New Role/Permissions
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Role Name"
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    size="sm"
                  />
                  <Input
                    label="Position Name"
                    placeholder="Position name (e.g., Section Officer)"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    size="sm"
                  />
                  <Checkbox required>Active</Checkbox>
                  <Checkbox>Deactivate</Checkbox>
                </div>

                <div className="menu-container flex flex-wrap gap-4 p-4 bg-gray-800 rounded-sm">
                  {allMenus.map((menu) => (
                    <div key={menu.MenuId} className="menu-item mb-4 w-auto bg-red-300">
                      <div
                        className="flex items-center p-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handleParentClick(menu.MenuId)}
                      >
                        <span>{menu.MenuName}</span>
                        <div className="ml-2 bg-[#f29d13] text-white w-6 h-6 text-center rounded-full">
                          0
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 flex-wrap justify-center submenu-container mt-6 p-4 bg-gray-50 rounded-md">
                  {activeMenu &&
                    allMenus
                      .find((menu) => menu.MenuId === activeMenu)
                      ?.Submenus.map((submenu) => (
                        <div
                          key={submenu.MenuId}
                          className="relative group w-full md:w-1/3"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                          <div className="relative px-2 py-1 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-md leading-none space-y-4">
                            <h2 className="text-lg font-semibold text-white bg-[#192538] p-1 rounded">
                              {submenu.MenuName}
                            </h2>

                            {/* Submenu Options */}
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center gap-2">
                                <Checkbox />
                                <span>Can View</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox />
                                <span>Can Edit</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox />
                                <span>Can Delete</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox />
                                <span>Can Read</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSaveRole}>
                  Save
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
