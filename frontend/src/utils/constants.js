export const STAFF = 0;
export const ADMIN = 1;
export const CASHIER = 2;
export const INVENTORY = 3;
export const STORE = 4;

export const roles = {
  [STAFF]: "is_staff",
  [ADMIN]: "is_admin",
  [CASHIER]: "is_cashierman",
  [STORE]: "is_storeman",
  [INVENTORY]: "is_inventory",
};

export const checkRoles = (allow = [], user) => {
  if (!user) return false;
  return allow.some((role) => {
    const field = roles[role];
    return user[field];
  });
};
