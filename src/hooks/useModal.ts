import React, { useState } from "react"

export const useModal = (initialModal: boolean) => {
    const [modalIsOpen, setModalIsOpen] = useState(initialModal);

    return {modalIsOpen, setModalIsOpen};
}

export default useModal