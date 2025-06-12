import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import {
  UserOutlined,
  BarcodeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const OptionsClient = () => {
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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('a')
    console.log(token)
    setIdToCall(token);
  },[])

  return (
    <div className={classes.options}>
      <div style={{fontWeight: "lighter"}}>
        <p>Prezado paciente, favor checar a <b>estabilidade da sua internet</b>, permitir o <b>uso de câmera</b>, <b>som</b>, <b>microfone</b> e estar em um <b>ambiente silencioso</b>.</p>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <div className={classes.field}>
          <h2>Nome</h2>
          <Input
            size="large"
            placeholder="Seu nome"
            prefix={<UserOutlined />}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              localStorage.setItem("name", e.target.value);
            }}
            className={classes.inputgroup}
          />
        </div>

        <div className={classes.field}>
          <h2>ID da chamada</h2>
          <Input
            placeholder="Id da chamada"
            size="large"
            className={classes.inputgroup}
            value={idToCall}
            prefix={<BarcodeOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Id da chamada">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </div>

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
            icon={<PhoneOutlined />}
            onClick={() => {
              if (name.length) callUser(idToCall);
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

export default OptionsClient;
