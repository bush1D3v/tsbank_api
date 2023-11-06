import db from "../../data/connection";

type PhoneData = {
  phone: string;
};

export default async function refreshUserPhone(phone: string, new_phone: string) {
  const returnedPhone: PhoneData[] = await db("users").update({ "phone": new_phone })
    .where({
      phone
    }).returning([ "phone" ]);
  return returnedPhone[ 0 ];
};
