import { NextResponse } from 'next/server'


export const resError = (message, data, status, isNextResponse = false) => {
  if(isNextResponse){
    return NextResponse.json({
      success: false,
      message,
      data
    }, {status}
  )
  }else {
    return {
      success: false,
      message,
      data
    }
  }
};

export const resSuccess = (data, status, isNextResponse = false) => {
  if(isNextResponse){
    return NextResponse.json({
        success: true,
        data
      }, {
        status
      })
  }else {
    return {
    success: true,
    data
  }
  }
};
