"use client"

import { useFormStatus } from "react-dom"

const UpdateButton = () => {

    const {pending} = useFormStatus()

return (
<button disabled={pending} className="bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed p-2 mt-2 rounded-md text-white">
    {pending? "Updating..." : "Update"}
</button>
)
}

export default UpdateButton