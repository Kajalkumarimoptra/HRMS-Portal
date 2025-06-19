import React from 'react';

export default function ReverseRoleMapping(roleName) {
    const roleMapping = {
        "SUPER_ADMIN": "Super Admin",
        "ADMIN": "HR Admin",
        "EMPLOYEE": "Employee"
    }
  return roleMapping[roleName]
}
