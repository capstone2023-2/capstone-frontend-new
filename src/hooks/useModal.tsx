import { RefObject, useEffect, useState } from "react";

export default function useModal(
  wrapperRef: RefObject<HTMLElement>,
  event: "click" | "contextmenu" = "click",
) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }

    const currentRef = wrapperRef.current;
    document.addEventListener("click", handleClickOutside);
    currentRef?.addEventListener(event, () => setModalOpen(true));


    return () => {
      document.removeEventListener("click", handleClickOutside);
      currentRef?.removeEventListener(event, () => setModalOpen(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return modalOpen;
}
