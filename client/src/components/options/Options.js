import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Options = () => {
  const [idToCall, setIdToCall] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Nome</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />

        <div className={classes.share_options}>
          <CopyToClipboard text={`${window.location.origin}/client?a=${me}`}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex="0"
              onClick={() => message.success("Code copied successfully!")}
            >
              Copie o link
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>ID da chamada</h2>
        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={me}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Cole o id da chamada">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />

        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            onClick={leaveCall}
            className={classes.hang}
            tabIndex="0"
          >
            <img src={Hang} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Finalizar Chamada
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PhoneOutlined/>}
            onClick={() => {
              if (name.length && idToCall != me) callUser(idToCall);
              else message.error("Please enter your name to call!");
            }}
            className={classes.btn}
            tabIndex="0"
          >
            Chamar
          </Button>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} está chamando...:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Atender
              </Button>
              <Button
                variant="contained"
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Recusar
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;
