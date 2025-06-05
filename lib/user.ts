import { Pricingplans } from "@/utils/Pricing-plans";
import { getData } from "./db";
import { getuploadcount } from "./summaries";
import { User } from "@clerk/nextjs/server";

export async function getPriceIdforactiveaccount(email : string) { 
const sql = await getData();
const query = await sql`SELECT price_id FROM users where email = ${email} AND status = 'active'`;
return query?.[0]?.price_id || null;

}
export async function haveactivePlan(email : string) { 
const sql = await getData();
const query = await sql`SELECT price_id , status FROM users where email = ${email} AND status = 'active'`;
return query && query.length >0;

}

export async function hasreacheduploadlimit(userId : string){
    const uploadcount = await getuploadcount(userId);
    const priceId = await getPriceIdforactiveaccount(userId);
    const isPro = Pricingplans.find((plan) => plan.priceId === priceId)?.id === 'pro';
    const uploadLimit  : number = isPro ? 1000 : 10; 
    return { hasReachedLimit : uploadcount >= uploadLimit , uploadLimit};
}

export async function getsubscriptionstatus(user : User) {
const hassubsription = await haveactivePlan(user.emailAddresses[0].emailAddress);
return hassubsription;
}