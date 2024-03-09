import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { LoginType } from "../misc/authType";
import { mockUsers } from "../data/mockUsers";

const loginUrl = "https://fakestoreapi.com/auth/login";
const getUser1 = "https://fakestoreapi.com/users/1";
const userDetails = mockUsers[0];

export const handler = [

  http.post(loginUrl, async ({ request }) => {
    const loginData = (await request.json()) as LoginType;
    console.log("Login data: ", loginData);
    // Assuming loginData contains userDetails

    return HttpResponse.json(userDetails, { status: 200 });
  }),
];

export const authMSW = setupServer(...handler);
