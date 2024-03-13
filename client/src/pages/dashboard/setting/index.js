import Broad from '@/Components/admin/dashboard/Broad/Broad'
import SeoSetting from '@/Components/admin/dashboard/Setting/SeoSetting'
import DashboardLayout from '@/Components/admin/dashboard/layout'
import React, { useEffect } from 'react'

function index() {

  return (
    <DashboardLayout>
      <Broad/>
      <div>
        <SeoSetting/>
        <SeoSetting/>

      </div>
      
    </DashboardLayout>
  )
}

export default index
