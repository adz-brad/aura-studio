'use client'

import Studio from "@/app/components/studio/Studio"
import { RecoilRoot } from "recoil"

const Page = ({ params: { id } }) => {

  return (
    <RecoilRoot>
      <div className="w-full h-full">
        <Studio id={id} />
      </div>
    </RecoilRoot>
  )
}
export default Page