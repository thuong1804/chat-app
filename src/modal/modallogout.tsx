"use client";
import Loading from "@/app/component/login-loading";
import { auth } from "@/app/config/firebase";
import router from "next/router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSignOut } from "react-firebase-hooks/auth";
// eslint-disable-next-line react-hooks/rules-of-hooks

function LogOutModal() {
  const [show, setShow] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logOut = async () => {
    await signOut();
    if (loading) return <Loading></Loading>;
    handleClose();
    return router.push("/");
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={logOut}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogOutModal;
