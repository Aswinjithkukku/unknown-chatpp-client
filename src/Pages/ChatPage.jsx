import { useEffect, useRef, useState } from "react";
import { SendIconPng } from "../Assets";
import AuthenticatedModal from "./AuthenticatedModal";
import { WaterDropletSound } from "../Assets";

function ChatPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [conn, setConn] = useState();
  const textRef = useRef(null);

  const audio = new Audio(WaterDropletSound);

  useEffect(() => {
    if (conn === null) {
      setIsAuthenticated(false);
    }

    if (conn !== null && conn !== undefined) {
      conn.onmessage = (message) => {
        console.log(message?.data);
        const msg = JSON.parse(message?.data);

        if (msg.content == "A user left") {
          setMessages([...messages, msg]);
        }

        if (msg?.username == username) {
          msg.type = "self";
        } else {
          msg.type = "recv";
        }

        if (msg.type == "recv") {
          audio.play();
        }

        setMessages([...messages, msg]);
      };

      conn.onclose = () => {
        setIsAuthenticated(false);
      };
      conn.onerror = () => {
        setIsAuthenticated(false);
      };
      conn.onopen = () => {
        console.log("Connected");
      };
    }
  }, [textRef, messages, conn, username]);

  console.log(conn);

  const submitAuthenticationHandler = () => {
    const ws = new WebSocket(`ws://127.0.0.1:8080/ws?username=${username}`);
    if (ws.OPEN) {
      setConn(ws);
      setIsAuthenticated(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (conn === null || conn === undefined) {
      setIsAuthenticated(false);
    }
    console.log(textRef.current?.value);
    conn.send(textRef.current?.value);
    textRef.current.value = "";
  };

  return (
    <>
      {!isAuthenticated && (
        <AuthenticatedModal
          submitAuthenticationHandler={submitAuthenticationHandler}
          setUsername={setUsername}
          username={username}
        />
      )}
      <div className="relative max-w-screen-lg mx-auto px-4 pb-14">
        <div className="py-2 space-y-2 w-full">
          {messages?.map((message, index) => {
            if (message?.type == "recv") {
              return (
                <div key={index} className=" w-full">
                  <div className="flex flex-col items-start">
                    <p className="text-xs pl-1 text-gray-100 font-bold font-mono">
                      {message?.username}
                    </p>
                    <div className="bg-gradient-to-br  from-gray-800/90 to-gray-900 px-3 py-2 rounded-md shadow-zero text-gray-300 font-medium tracking-wide text-lg  min-w-[100px] max-w-[80%]">
                      {message?.content}
                    </div>
                  </div>
                </div>
              );
            }
            if (message?.type == "self") {
              return (
                <div key={index} className=" w-full ">
                  <div className=" flex flex-col items-end">
                    <p className="text-xs text-right pl-1 text-gray-100 font-bold font-mono">
                      {message?.username}
                    </p>

                    <div className="bg-white  px-3 py-2 rounded-md shadow-zero text-gray-500 font-medium tracking-wide text-lg  min-w-[100px] max-w-[80%]">
                      {message?.content}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-14 bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 h-full">
          <form
            onSubmit={sendMessage}
            className="flex gap-3 justify-between items-center h-full"
          >
            <div className="w-full ">
              <input
                ref={textRef}
                className="w-full py-1 rounded  bg-gray-700 outline-none border-none px-2 text-gray-400 placeholder:text-gray-500 placeholder:text-sm "
                placeholder="Type here"
              />
            </div>
            <button type="button" className="">
              <img
                src={SendIconPng}
                alt="Send"
                className="object-contain w-10"
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
