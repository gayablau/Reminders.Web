import React, { useState } from "react"

export const useUserInput = (initialValue: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    return [value, handleChange];
}

export default useUserInput