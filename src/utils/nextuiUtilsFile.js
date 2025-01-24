const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};



 const userTableColumns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "CONTACT", uid: "contact" },
  { name: "ACTIONS", uid: "actions" },
];

export  {statusColorMap, userTableColumns};