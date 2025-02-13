import React, { useContext } from "react";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import { Listbox } from "./ListBox"; // Assuming Listbox is defined in another file

const AnimatedListbox = React.forwardRef((props, ref) => {
  const popupContext = useContext(PopupContext);

  if (!popupContext) {
    throw new Error("AnimatedListbox must be used within a Popup");
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...props} ref={ref} />
    </CssTransition>
  );
});

export default AnimatedListbox;
