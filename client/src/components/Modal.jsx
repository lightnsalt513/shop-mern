import React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const Modal = ({ setOpen, children }) => {
  return createPortal(
    <ModalWrap>
      <ModalInner onClick={() => setOpen(false)}>
        <Layer onClick={(e) => e.stopPropagation()}>{children}</Layer>
      </ModalInner>
    </ModalWrap>,
    document.getElementById("modal-root")
  );
};

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
`;

const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Layer = styled.div`
  position: relative;
  min-height: 100px;
  min-width: 400px;
  max-width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: white;
`;

export default Modal;
