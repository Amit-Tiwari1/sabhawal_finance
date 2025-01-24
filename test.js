const defaultMenus = [
  {
    MenuId: 1,
    MenuName: "Dashboard",
    MenuParentId: null,
    MenuUrl: "/dashboard",
  },
  {
    MenuId: 2,
    MenuName: "Company",
    MenuParentId: null,
    MenuUrl: "/company",
  },
  {
    MenuId: 3,
    MenuName: "Profile",
    MenuParentId: 2,
    MenuUrl: "/company/profile",
  },
  {
    MenuId: 4,
    MenuName: "Branches",
    MenuParentId: 2,
    MenuUrl: "/company/branches",
  },
  {
    MenuId: 5,
    MenuName: "Promoters",
    MenuParentId: 2,
    MenuUrl: "/company/promoters",
  },
  {
    MenuId: 6,
    MenuName: "Promoters Share Holdings",
    MenuParentId: 2,
    MenuUrl: "/company/shareholdings",
  },
  {
    MenuId: 7,
    MenuName: "Directors",
    MenuParentId: 2,
    MenuUrl: "/company/directors",
  },
  {
    MenuId: 8,
    MenuName: "Bank Accounts",
    MenuParentId: 2,
    MenuUrl: "/company/accounts",
  },
  {
    MenuId: 9,
    MenuName: "Profile",
    MenuParentId: 2,
    MenuUrl: "/company/profile",
  },
  {
    MenuId: 10,
    MenuName: "Documents",
    MenuParentId: 2,
    MenuUrl: "/company/documents",
  },
  {
    MenuId: 11,
    MenuName: "Unencumbered Deposits",
    MenuParentId: 2,
    MenuUrl: "/company/Unencumbered",
  },

  {
    MenuId: 12,
    MenuName: "User Management",
    MenuParentId: null,
    MenuUrl: "/user",
  },
  {
    MenuId: 13,
    MenuName: "Role & Permissions",
    MenuParentId: 12,
    MenuUrl: "/user/role",
  },
  {
    MenuId: 14,
    MenuName: "Users",
    MenuParentId: 12,
    MenuUrl: "/user/all",
  },
  {
    MenuId: 15,
    MenuName: "Active Users",
    MenuParentId: 12,
    MenuUrl: "/user/active",
  },
  {
    MenuId: 16,
    MenuName: "Deactive Users",
    MenuParentId: 12,
    MenuUrl: "/user/deactive",
  },

  {
    MenuId: 17,
    MenuName: "HR Management",
    MenuParentId: null,
    MenuUrl: "/hrmanagement",
  },
  {
    MenuId: 18,
    MenuName: "Employee",
    MenuParentId: 17,
    MenuUrl: "/hrmanagement/employee",
  },
  {
    MenuId: 19,
    MenuName: "attendance",
    MenuParentId: 17,
    MenuUrl: "/hrmanagement/attendance",
  },
  {
    MenuId: 20,
    MenuName: "Salary Disbursement",
    MenuParentId: 17,
    MenuUrl: "/hrmanagement/salay",
  },
  {
    MenuId: 21,
    MenuName: "Employee",
    MenuParentId: 17,
    MenuUrl: "/hrmanagement/employee",
  },

  {
    MenuId: 22,
    MenuName: "Customer Management",
    MenuParentId: null,
    MenuUrl: "/customer",
  },
  {
    MenuId: 23,
    MenuName: "Customers",
    MenuParentId: 22,
    MenuUrl: "/customer/all",
  },
  {
    MenuId: 24,
    MenuName: "Minors",
    MenuParentId: 22,
    MenuUrl: "/customer/minors",
  },

  {
    MenuId: 25,
    MenuName: "Business Loan",
    MenuParentId: null,
    MenuUrl: "/business",
  },
  {
    MenuId: 26,
    MenuName: "Schemes",
    MenuParentId: 25,
    MenuUrl: "/business/schemes",
  },
  {
    MenuId: 27,
    MenuName: "Calculator",
    MenuParentId: 25,
    MenuUrl: "/business/calculator",
  },
  {
    MenuId: 28,
    MenuName: "Applications",
    MenuParentId: 25,
    MenuUrl: "/business/applications",
  },
  {
    MenuId: 29,
    MenuName: "Disbursements",
    MenuParentId: 25,
    MenuUrl: "/business/disbursement",
  },
  {
    MenuId: 30,
    MenuName: "Accounts",
    MenuParentId: 25,
    MenuUrl: "/business/accounts",
  },

  {
    MenuId: 31,
    MenuName: "Fixed Loan",
    MenuParentId: null,
    MenuUrl: "/fixed",
  },
  {
    MenuId: 32,
    MenuName: "Schemes",
    MenuParentId: 31,
    MenuUrl: "/fixed/schemes",
  },
  {
    MenuId: 33,
    MenuName: "Applications",
    MenuParentId: 31,
    MenuUrl: "/fixed/applications",
  },
  {
    MenuId: 34,
    MenuName: "Disbursements",
    MenuParentId: 31,
    MenuUrl: "/fixed/disbursement",
  },
  {
    MenuId: 35,
    MenuName: "Accounts",
    MenuParentId: 31,
    MenuUrl: "/fixed/accounts",
  },

  {
    MenuId: 36,
    MenuName: "Approvals",
    MenuParentId: null,
    MenuUrl: "/approvals",
  },
  {
    MenuId: 37,
    MenuName: "Accounting Vouchers",
    MenuParentId: 36,
    MenuUrl: "/approvals/vouchers",
  },
  {
    MenuId: 38,
    MenuName: "Loan Applications",
    MenuParentId: 36,
    MenuUrl: "/approvals/loanapplications",
  },
  {
    MenuId: 39,
    MenuName: "Pending Transications",
    MenuParentId: 36,
    MenuUrl: "/approvals/pendingtransications",
  },
  {
    MenuId: 40,
    MenuName: "Closer Requests",
    MenuParentId: 36,
    MenuUrl: "/approvals/closerrequest",
  },
  {
    MenuId: 41,
    MenuName: "Print Request Approvals",
    MenuParentId: 36,
    MenuUrl: "/approvals/printrequest",
  },
  {
    MenuId: 42,
    MenuName: "Loan Reschdule",
    MenuParentId: 36,
    MenuUrl: "/approvals/loanreschdule",
  },
  {
    MenuId: 43,
    MenuName: "Extention",
    MenuParentId: 36,
    MenuUrl: "/approvals/extention",
  },

  {
    MenuId: 44,
    MenuName: "Reports",
    MenuParentId: null,
    MenuUrl: "/report",
  },
  {
    MenuId: 45,
    MenuName: "Promoters | Customers",
    MenuParentId: 44,
    MenuUrl: "/report/promoters",
  },
  {
    MenuId: 46,
    MenuName: "Business Loan",
    MenuParentId: 44,
    MenuUrl: "/report/businessloan",
  },
  {
    MenuId: 47,
    MenuName: "Fixed Loan Accounts",
    MenuParentId: 44,
    MenuUrl: "/report/fixedloans",
  },
  {
    MenuId: 48,
    MenuName: "Loan EMIs",
    MenuParentId: 44,
    MenuUrl: "/report/loanemis",
  },
  {
    MenuId: 49,
    MenuName: "Loan Balance Report",
    MenuParentId: 44,
    MenuUrl: "/report/loanblancereport",
  },
  {
    MenuId: 50,
    MenuName: "Group Report",
    MenuParentId: 44,
    MenuUrl: "/report/groupby",
  },
  {
    MenuId: 50,
    MenuName: "TDS Report",
    MenuParentId: 44,
    MenuUrl: "/report/tds",
  },
  {
    MenuId: 50,
    MenuName: "Attendance Report",
    MenuParentId: 44,
    MenuUrl: "/report/Attendance",
  },

  {
    MenuId: 51,
    MenuName: "Download Reports",
    MenuParentId: null,
    MenuUrl: "/report/download",
  },
  {
    MenuId: 52,
    MenuName: "Report List",
    MenuParentId: 51,
    MenuUrl: "/report/download/reportlist",
  },
  {
    MenuId: 53,
    MenuName: "Report Future Demand",
    MenuParentId: 51,
    MenuUrl: "/report/download/futuredemand",
  },
  {
    MenuId: 54,
    MenuName: "Loan Payment Collections",
    MenuParentId: 51,
    MenuUrl: "/report/download/loancollection",
  },

  {
    MenuId: 55,
    MenuName: "CIBILE Reports",
    MenuParentId: null,
    MenuUrl: "/civil",
  },
  {
    MenuId: 56,
    MenuName: "Cibile Report History",
    MenuParentId: 55,
    MenuUrl: "/civil/history",
  },
  {
    MenuId: 57,
    MenuName: "Download Cibile Report",
    MenuParentId: 55,
    MenuUrl: "/civil/download",
  },
  {
    MenuId: 58,
    MenuName: "Convert XLS To TUDF",
    MenuParentId: 55,
    MenuUrl: "/civil/xlstotudf",
  },
  {
    MenuId: 59,
    MenuName: "Convert XLS To TUDF",
    MenuParentId: 55,
    MenuUrl: "/civil/xlstotudf",
  },

  {
    MenuId: 60,
    MenuName: "Software Settings",
    MenuParentId: null,
    MenuUrl: "/setting",
  },
  {
    MenuId: 61,
    MenuName: "SMS List",
    MenuParentId: 60,
    MenuUrl: "/setting/smslist",
  },
  {
    MenuId: 62,
    MenuName: "SMS History",
    MenuParentId: 60,
    MenuUrl: "/setting/smshistory",
  },
  {
    MenuId: 63,
    MenuName: "Mail History",
    MenuParentId: 60,
    MenuUrl: "/setting/mailhistory",
  },
  {
    MenuId: 64,
    MenuName: "Balance Alerts",
    MenuParentId: 60,
    MenuUrl: "/setting/balancealert",
  },
  {
    MenuId: 64,
    MenuName: "Event | Holidays Calender",
    MenuParentId: 60,
    MenuUrl: "/setting/calender",
  },
  {
    MenuId: 64,
    MenuName: "Deleted Entry Logs",
    MenuParentId: 60,
    MenuUrl: "/setting/deletedlogs",
  },
  {
    MenuId: 64,
    MenuName: "Login History",
    MenuParentId: 60,
    MenuUrl: "/setting/loginlogs",
  },
  {
    MenuId: 64,
    MenuName: "User Activity Tracking",
    MenuParentId: 60,
    MenuUrl: "/setting/logs",
  },
  {
    MenuId: 64,
    MenuName: "Balance Alerts",
    MenuParentId: 60,
    MenuUrl: "/setting/balancealert",
  },
  {
    MenuId: 65,
    MenuName: "Appointments",
    MenuParentId: null,
    MenuUrl: "/appointment",
  },
  {
    MenuId: 66,
    MenuName: "Notice Board",
    MenuParentId: null,
    MenuUrl: "/noticeboard",
  },
];

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const PUBLIC_PATHS = ['/login', '/signup', '/about', '/contact', '/services'];
    const token = request.cookies.get('token')?.value || '';
    

    const isPublicPath = PUBLIC_PATHS.includes(path);
    const isDashboardPath = path.startsWith('/dashboard');

    if (isPublicPath) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }
 

    if (isDashboardPath) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    if (!token && isDashboardPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  


    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/about',
        '/contact',
        '/services',
        '/dashboard/:path*',
    ],
};

