// I can create a logic using the Database
// but I prefer this method

const ADMIN_EMAIL_LIST: string[] = ["yhagodev@gmail.com"];

const authAdmin = (userEmail: string): string | null => {
  for (let i = 0; i < ADMIN_EMAIL_LIST.length; i++) {
    if (userEmail === ADMIN_EMAIL_LIST[i]) return null;
  }

  return "Unathorized";
};

export default authAdmin;
