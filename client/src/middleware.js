  import { NextResponse } from "next/server";
import  { NextRequest } from 'next/server'
import Axios from "./leb/Axios";

const secret = process.env.SECRET;
export function middleware(request) {
  const nextUrl  = request.nextUrl;
 
  const url  = request.url;
  var token = request.cookies.get('access_token');
  var refreshToken = request.cookies.get('refreshToken');
  

  var permission = request.cookies.get('permission');
  if(token && nextUrl.pathname.startsWith('/register')){
    return NextResponse.redirect(new URL('/', request.url))

  }
  else if(token && nextUrl.pathname.startsWith('/login')){
    return NextResponse.redirect(new URL('/', request.url))

  }
  else if(!token  && nextUrl.pathname.startsWith('/add-house')){ 
 
    return NextResponse.rewrite(new URL('/login',request.url))
  }else if(!token  && nextUrl.pathname.startsWith('/dashboard')){
    return NextResponse.rewrite(new URL('/login',request.url))
  }
   
  else{
    return NextResponse.next();

  } 
   
}
 