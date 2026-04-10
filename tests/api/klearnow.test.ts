import { test, expect } from '@playwright/test';

test('Validate and fetch umUserRole JSON objects', async () => {
    const responseBody = {
        eventType: "GET_ENGINE_USER",
        eventMessage: {
            userUuid: "ffffffff-afad-686d-7cfc-93d5824643fe",
            email: "abhishekpal.singh43@klearnow.com",
            userName: "Abhishek Pal Singh",
            onboardStatus: "ONBOARDED",
            phone: {
                typeOfPhone: "WORK",
                isdCode: 1,
                phoneNo: 8750079543,
                countryCode: "US"
            },
            umUserRole: [
                { id: 199, roleName: "Entity Administrator" },
                { id: 1064, roleName: "entry_status_change" },
                { id: 1065, roleName: "Role map" },
                { id: 201, roleName: "Billing Administrator" },
                { id: 202, roleName: "Finance Administrator" },
                { id: 1067, roleName: "Role 825" },
                { id: 203, roleName: "System administrator" },
                { id: 75, roleName: "Customer Admin" },
                { id: 1068, roleName: "role 826" },
                { id: 204, roleName: "Transaction - View only" },
                { id: 205, roleName: "Transaction - Shipment Creator" },
                { id: 206, roleName: "Transaction mgmt Role" },
                { id: 1072, roleName: "Role 8.29 Dummy" },
                { id: 1079, roleName: "Neelima KT 123" },
                { id: 1176, roleName: "Regression Default Role " },
                { id: 346, roleName: "Klearhub Visibility 360" },
                { id: 1053, roleName: "complete" },
                { id: 733, roleName: "Customer KlearHub 360" },
                { id: 1054, roleName: "Regression 821" }
            ],
            typeOfUser: "CUSTOMER",
            workPhoneId: 25736,
            engineID: "CUS70999533",
            active: "TRUE",
            customerName: "Update New Automation",
            engineName: "Update New Automation",
            delegatedUserEmail: "abhishekpal.singh43@klearnow.com"
        },
        eventTime: 1775819060749
    };

    expect(responseBody).toHaveProperty('eventMessage.umUserRole');

    const umUserRoleObjects = responseBody.eventMessage.umUserRole;
    console.log("umUserRole JSON objects: ", umUserRoleObjects);

    const role825 = umUserRoleObjects.find(role => role.roleName === "Role 825");
    console.log("Role 825 umUserRole: ", role825);
    expect(role825).toBeTruthy();

    expect(Array.isArray(umUserRoleObjects)).toBeTruthy();

    const roleCount = umUserRoleObjects.length;
    console.log(`Total roles: ${roleCount}`);

    expect(roleCount).toBe(19);

    umUserRoleObjects.forEach(role => {
        expect(role).toHaveProperty('id');
        expect(role).toHaveProperty('roleName');
        expect(typeof role.id).toBe("number");
        expect(typeof role.roleName).toBe("string");
    });
    
});
    
