import React from 'react'

export const AdminLayout = () =>(Component)=> {



        return function (...props){

             return (
                <>
                <div className='grid h-screen grid-cols-12'>


                <div className='hidden sm:block sm:col-span-4 lg:col-span-3'>

                    {/* Sidebar */}

                    Sidebar
                </div>


                <div className='col-span-12 sm:col-span-8 lg:col-span-9  bg-[#f5f5f5]'>
                    <Component />
                </div>
                      
                </div>
                
                </>
             )


        }
}
