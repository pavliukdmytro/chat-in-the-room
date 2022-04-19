import { io } from "socket.io-client";

export default (roomId) => {
  return io('', {
    query: `roomId=${ roomId }`,
  });
}