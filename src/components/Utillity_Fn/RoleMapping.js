import React from 'react'

export default function RoleMapping(roleName) {
    const roleMapping = {
        "Super Admin": "SUPER_ADMIN",
        "HR Admin": "ADMIN",
        "Employee": "EMPLOYEE"
    }
    return (
        roleMapping[roleName]
    )
}
