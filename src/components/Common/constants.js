export const DELIVERY_STATUS = {
    PENDING: { type: "Pending", string: "Pending", color: "red-700" },
    CONFIRMED: { type: "Confirmed", string: "Confirmed", color: "green-600" },
    READYTODELIVER: { type: "Ready to deliver", string: "Ready to deliver", color: "green-600" },
    ONTHEWAY: { type: "On the way", string: "On the way", color: "green-600" },
    DELIVERED: { type: "Delivered", string: "Delivered", color: "green-600" },
};
export const APPROVAL_STATUS = {
    PENDING: { type: "Pending", string: 0, color: "red-700" },
    APPROVED: { type: "Approved", string: 1, color: "green-600" },
};
export const REPORTS = {
    SALES: { type: "Sales Report", string: "Sales Report", color: "green-600" },
    ITEM: { type: "Item Report", string: "Item Report", color: "green-500" },
}